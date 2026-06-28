import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { AppState, DEFAULT_STATE, saveState } from './hooks/useStorage';
import { SPHERE_ORDER, LEVELS, ARCHETYPES, PATHS, DIFFICULTY, SIDE_QUEST_POOL, DAILY_CHALLENGE_POOL, CHALLENGES } from './data/constants';

interface AppContextType {
  state: AppState;
  setState: (s: AppState) => void;
  screen: string;
  setScreen: (s: string) => void;
  toast: string;
  showToast: (msg: string) => void;
  // Actions
  startSurvey: () => void;
  answerQuestion: (opt: any) => void;
  calculateArchetype: () => void;
  startPath: (pathId: string, difficulty: string) => void;
  completeMainStep: () => void;
  toggleSideQuest: (idx: number) => void;
  completeDailyChallenge: () => void;
  buyChallenge: (chId: string) => void;
  checkChallengeDay: (chId: string) => void;
  saveJournal: (text: string) => void;
  resetAll: () => void;
  importData: (json: string) => boolean;
  exportData: () => string;
  // Helpers
  getTodayStr: () => string;
  daysBetween: (d1: string, d2: string) => number;
  calculateXpMultiplier: (sphere: string) => number;
  addXp: (amount: number, sphere?: string) => number;
  checkLevelUp: () => void;
  checkSphereLevelUp: (sphere: string) => void;
  checkMissedDays: () => void;
  generateSideQuests: () => void;
  generateDailyChallenge: () => void;
  checkCombo: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setStateRaw] = useState<AppState>(DEFAULT_STATE);
  const [screen, setScreen] = useState('start');
  const [toast, setToast] = useState('');

  const setState = useCallback((s: AppState) => {
    setStateRaw(s);
    saveState(s);
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  }, []);

  const getTodayStr = useCallback(() => new Date().toISOString().slice(0, 10), []);

  const daysBetween = useCallback((d1: string, d2: string) => {
    const a = new Date(d1 + 'T00:00:00');
    const b = new Date(d2 + 'T00:00:00');
    return Math.round((b.getTime() - a.getTime()) / 864e5);
  }, []);

  const calculateXpMultiplier = useCallback((sphere: string) => {
    let mult = 1.0;
    if (state.archetype && ARCHETYPES[state.archetype]) {
      const arch = ARCHETYPES[state.archetype];
      if (arch.dominant.includes(sphere)) mult *= 1.3;
      if (state.archetype === 'rebel') {
        if (sphere === 'routine' || sphere === 'awareness') mult *= 0.7;
        else mult *= 1.2;
      }
      if (state.archetype === 'recluse') {
        if (sphere === 'routine' || sphere === 'spirituality') mult *= 1.15;
        if (sphere === 'career') mult *= 0.7;
      }
      if (state.archetype === 'nomad') mult *= 1.1;
    }
    if (state.streak >= 7) mult *= 1.2;
    else if (state.streak >= 3) mult *= 1.1;
    if (state.activePath?.difficulty) {
      const diff = DIFFICULTY[state.activePath.difficulty];
      if (diff) mult *= diff.xpMultiplier;
    }
    return mult;
  }, [state.archetype, state.streak, state.activePath]);

  const addXp = useCallback((amount: number, sphere?: string) => {
    const mult = calculateXpMultiplier(sphere || 'awareness');
    const earned = Math.round(amount * mult);
    const newState = { ...state, xp: state.xp + earned };
    if (sphere) {
      newState.sphereProgress = { ...newState.sphereProgress, [sphere]: (newState.sphereProgress[sphere] || 0) + earned };
    }
    setState(newState);
    return earned;
  }, [state, calculateXpMultiplier, setState]);

  const checkLevelUp = useCallback(() => {
    const lvl = LEVELS.find(l => l.num === state.level);
    if (!lvl) return;
    if (state.xp >= lvl.xpTo) {
      if (state.level < 7) {
        const newXp = state.xp - lvl.xpTo;
        const newLevel = state.level + 1;
        const newXpTo = LEVELS[newLevel - 1].xpTo;
        setState({ ...state, xp: newXp, level: newLevel, xpToLevel: newXpTo });
        showToast(`🎉 Уровень ${newLevel}! ${LEVELS[newLevel - 1].name}`);
      } else {
        setState({ ...state, xp: lvl.xpTo });
      }
    }
  }, [state, setState, showToast]);

  const checkSphereLevelUp = useCallback((sphere: string) => {
    const sp = state.sphereProgress[sphere] || 0;
    const sl = state.sphereLevels[sphere] || 1;
    const needed = sl * 100;
    if (sp >= needed) {
      setState({
        ...state,
        sphereProgress: { ...state.sphereProgress, [sphere]: sp - needed },
        sphereLevels: { ...state.sphereLevels, [sphere]: sl + 1 }
      });
      showToast(`⭐ ${sphere} — уровень ${sl + 1}!`);
    }
  }, [state, setState, showToast]);

  const checkMissedDays = useCallback(() => {
    if (!state.lastQuestDate) return;
    const today = getTodayStr();
    const diff = daysBetween(state.lastQuestDate, today);
    if (diff > 1) {
      let totalPenalty = 0;
      const newQuestHistory = [...state.questHistory];
      for (let i = 1; i < diff; i++) {
        const penalty = Math.max(0, Math.round(state.xp * 0.05));
        totalPenalty += penalty;
        const md = new Date(state.lastQuestDate);
        md.setDate(md.getDate() + i);
        newQuestHistory.push({ date: md.toISOString().slice(0, 10), missed: true });
      }
      setState({
        ...state,
        xp: Math.max(0, state.xp - totalPenalty),
        streak: 0,
        questHistory: newQuestHistory,
        sideQuestStreak: 0,
        lastSideQuestStreakDate: null,
        dailyChallengeStreak: 0,
        lastDailyChallengeDate: null,
        comboData: { ...state.comboData, perfectDaysStreak: 0 }
      });
      if (totalPenalty > 0) showToast(`⚠️ Пропущено ${diff - 1} дн. Штраф: -${totalPenalty} XP`);
    }
  }, [state, setState, showToast, getTodayStr, daysBetween]);

  const generateSideQuests = useCallback(() => {
    const today = getTodayStr();
    if (state.sideQuests && state.sideQuests.date === today) return;
    const pool = [...SIDE_QUEST_POOL];
    const quests = [];
    for (let i = 0; i < 3; i++) {
      if (pool.length === 0) break;
      const idx = Math.floor(Math.random() * pool.length);
      const q = pool.splice(idx, 1)[0];
      quests.push({ ...q, done: false, note: '' });
    }
    setState({ ...state, sideQuests: { date: today, quests } });
  }, [state, setState, getTodayStr]);

  const generateDailyChallenge = useCallback(() => {
    const today = getTodayStr();
    if (state.dailyChallenge && state.dailyChallenge.date === today) return;
    const pool = [...DAILY_CHALLENGE_POOL];
    const idx = Math.floor(Math.random() * pool.length);
    const q = pool[idx];
    setState({
      ...state,
      dailyChallenge: { date: today, id: q.id, title: q.title, desc: q.desc, spheres: q.spheres, xp: q.xp, progress: q.progress, done: false }
    });
  }, [state, setState, getTodayStr]);

  const checkCombo = useCallback(() => {
    const today = getTodayStr();
    const mainDone = state.activePath && state.activePath.stepDoneToday;
    const sideDone = state.sideQuests?.quests?.every(q => q.done);
    if (mainDone && sideDone) {
      if (state.comboData.lastComboDate !== today) {
        const newStreak = state.comboData.perfectDaysStreak + 1;
        const newTotal = state.comboData.totalPerfectDays + 1;
        if (newStreak >= 3) {
          setState({
            ...state,
            xp: state.xp + 15,
            comboData: {
              ...state.comboData,
              perfectDaysStreak: 0,
              totalPerfectDays: newTotal,
              lastComboDate: today,
              comboBonusesEarned: [...state.comboData.comboBonusesEarned, { date: today, bonus: 15 }]
            }
          });
          showToast('🔥 Комбо! +15 XP за 3 идеальных дня');
        } else {
          setState({
            ...state,
            comboData: {
              ...state.comboData,
              perfectDaysStreak: newStreak,
              totalPerfectDays: newTotal,
              lastComboDate: today
            }
          });
        }
      }
    } else {
      setState({
        ...state,
        comboData: { ...state.comboData, perfectDaysStreak: 0 }
      });
    }
  }, [state, setState, showToast, getTodayStr]);

  const startSurvey = useCallback(() => {
    setState(DEFAULT_STATE);
    setScreen('survey');
  }, [setState]);

  const answerQuestion = useCallback((opt: any) => {
    const newAnswers = [...state.answers, { question: state.answers.length, label: opt.label }];
    const newSpheres = { ...state.spheres };
    for (const sp in opt.spheres) {
      if (newSpheres[sp] !== undefined) newSpheres[sp] += opt.spheres[sp];
    }
    setState({ ...state, answers: newAnswers, spheres: newSpheres });
    if (newAnswers.length >= 15) {
      setScreen('archetype');
    }
  }, [state, setState]);

  const calculateArchetype = useCallback(() => {
    const sp = state.spheres;
    let rebelFlags = 0;
    for (let i = 0; i < Math.min(5, state.answers.length); i++) {
      const ans = state.answers[i];
      // simplified - in real app would look up QUESTIONS
    }
    // Simplified archetype calc
    let maxVal = -999;
    let maxSpheres: string[] = [];
    SPHERE_ORDER.forEach(s => {
      if (sp[s] > maxVal) { maxVal = sp[s]; maxSpheres = [s]; }
      else if (sp[s] === maxVal) maxSpheres.push(s);
    });
    const allLow = SPHERE_ORDER.every(s => sp[s] < 0);
    if (allLow) {
      const totalNeg = SPHERE_ORDER.reduce((sum, s) => sum + Math.abs(Math.min(0, sp[s])), 0);
      setState({ ...state, archetype: totalNeg > 15 ? 'rebel' : 'recluse' });
      return;
    }
    const minVal = Math.min(...SPHERE_ORDER.map(s => sp[s]));
    if (maxVal - minVal < 3) {
      setState({ ...state, archetype: 'nomad' });
      return;
    }
    let archMatch: string | null = null;
    let bestMatch = -999;
    for (const aid in ARCHETYPES) {
      const arch = ARCHETYPES[aid];
      if (arch.dominant.length === 0) continue;
      const match = arch.dominant.reduce((sum, ds) => sum + sp[ds], 0);
      if (match > bestMatch) { bestMatch = match; archMatch = aid; }
    }
    if (!archMatch || bestMatch <= 2) {
      setState({ ...state, archetype: 'nomad' });
    } else {
      setState({ ...state, archetype: archMatch });
    }
  }, [state, setState]);

  const startPath = useCallback((pathId: string, difficulty: string) => {
    const today = getTodayStr();
    setState({
      ...state,
      activePath: {
        id: pathId,
        difficulty,
        day: 1,
        startedAt: today,
        lastActiveDate: today,
        stepDoneToday: false,
        completed: false
      }
    });
    setScreen('quests');
  }, [state, setState, getTodayStr]);

  const completeMainStep = useCallback(() => {
    if (!state.activePath || state.activePath.completed || state.activePath.stepDoneToday) return;
    const p = PATHS[state.activePath.id];
    const step = p.steps[state.activePath.day - 1];
    if (!step) return;
    const earned = addXp(step.xp, p.sphere);
    const today = getTodayStr();
    let newStreak = state.streak;
    let newLastQuestDate = state.lastQuestDate;
    if (state.lastQuestDate !== today) {
      if (state.lastQuestDate && daysBetween(state.lastQuestDate, today) === 1) newStreak++;
      else newStreak = 1;
      newLastQuestDate = today;
    }
    const newDay = state.activePath.day + 1;
    if (newDay > 30) {
      const rew = p.rewards[state.activePath.difficulty];
      setState({
        ...state,
        stars: state.stars + rew.stars,
        xp: state.xp + earned,
        completedPaths: [...state.completedPaths, { id: p.id, difficulty: state.activePath.difficulty, completedAt: today }],
        activePath: { ...state.activePath, completed: true, stepDoneToday: true },
        streak: newStreak,
        lastQuestDate: newLastQuestDate
      });
      showToast(`🎉 Путь завершён! +${rew.stars}★ +${rew.xp} XP`);
    } else {
      setState({
        ...state,
        activePath: { ...state.activePath, day: newDay, stepDoneToday: true },
        streak: newStreak,
        lastQuestDate: newLastQuestDate
      });
      showToast(`+${earned} XP`);
    }
    checkCombo();
  }, [state, setState, addXp, showToast, getTodayStr, daysBetween, checkCombo]);

  const toggleSideQuest = useCallback((idx: number) => {
    if (!state.sideQuests?.quests[idx]) return;
    const q = state.sideQuests.quests[idx];
    const newDone = !q.done;
    const newQuests = [...state.sideQuests.quests];
    newQuests[idx] = { ...q, done: newDone };
    const today = getTodayStr();
    let newXp = state.xp;
    let newSphereProgress = { ...state.sphereProgress };
    let newStars = state.stars;
    let newSideQuestStreak = state.sideQuestStreak;
    let newLastAllSideQuestsDate = state.lastAllSideQuestsDate;
    let newLastSideQuestStreakDate = state.lastSideQuestStreakDate;

    if (newDone) {
      const earned = Math.round(q.xp * calculateXpMultiplier(q.sphere));
      newXp += earned;
      newSphereProgress[q.sphere] = (newSphereProgress[q.sphere] || 0) + q.progress;
      showToast(`+${earned} XP • +${q.progress} ${q.sphere}`);
    } else {
      newXp = Math.max(0, newXp - q.xp);
      newSphereProgress[q.sphere] = Math.max(0, (newSphereProgress[q.sphere] || 0) - q.progress);
      showToast('Отменено');
    }

    const allDone = newQuests.every(q => q.done);
    const wasAllDone = state.lastAllSideQuestsDate === today;
    if (allDone && !wasAllDone) {
      newStars += 1;
      newLastAllSideQuestsDate = today;
      if (state.lastSideQuestStreakDate && daysBetween(state.lastSideQuestStreakDate, today) === 1) {
        newSideQuestStreak++;
      } else {
        newSideQuestStreak = 1;
      }
      newLastSideQuestStreakDate = today;
      if (newSideQuestStreak % 3 === 0) {
        newStars += 3;
        showToast(`🔥 Все побочки! +1★ +3★ бонус за 3-дневную серию!`);
      } else {
        showToast(`Все побочки выполнены! +1★ (серия: ${newSideQuestStreak})`);
      }
    } else if (!allDone && wasAllDone) {
      newStars = Math.max(0, newStars - 1);
      newLastAllSideQuestsDate = null;
      newSideQuestStreak = 0;
      newLastSideQuestStreakDate = null;
      showToast('Серия побочек прервана. -1★');
    }

    setState({
      ...state,
      xp: newXp,
      sphereProgress: newSphereProgress,
      stars: newStars,
      sideQuests: { ...state.sideQuests, quests: newQuests },
      sideQuestStreak: newSideQuestStreak,
      lastAllSideQuestsDate: newLastAllSideQuestsDate,
      lastSideQuestStreakDate: newLastSideQuestStreakDate
    });
    checkCombo();
  }, [state, setState, showToast, getTodayStr, daysBetween, calculateXpMultiplier, checkCombo]);

  const completeDailyChallenge = useCallback(() => {
    if (!state.dailyChallenge || state.dailyChallenge.done) return;
    const today = getTodayStr();
    let newStreak = 1;
    if (state.lastDailyChallengeDate && daysBetween(state.lastDailyChallengeDate, today) === 1) {
      newStreak = state.dailyChallengeStreak + 1;
    }
    let bonusMsg = '';
    let newStars = state.stars + 1;
    if (newStreak >= 30) {
      newStars += 100;
      newStreak = 0;
      bonusMsg = ' +100★ за 30-дневную серию!';
    }
    const dc = state.dailyChallenge;
    let newXp = state.xp;
    let newSphereProgress = { ...state.sphereProgress };
    dc.spheres.forEach(sphere => {
      const earned = Math.round(dc.xp * calculateXpMultiplier(sphere));
      newXp += earned;
      newSphereProgress[sphere] = (newSphereProgress[sphere] || 0) + dc.progress;
    });
    setState({
      ...state,
      dailyChallenge: { ...dc, done: true },
      dailyChallengeStreak: newStreak,
      lastDailyChallengeDate: today,
      stars: newStars,
      xp: newXp,
      sphereProgress: newSphereProgress
    });
    showToast(`+1★${bonusMsg} • Ежедневный челлендж выполнен`);
  }, [state, setState, showToast, getTodayStr, daysBetween, calculateXpMultiplier]);

  const buyChallenge = useCallback((chId: string) => {
    const ch = CHALLENGES.find(c => c.id === chId);
    if (!ch) return;
    if (state.stars < ch.cost) { showToast('Недостаточно звёздочек'); return; }
    if (state.activeChallenges.length >= 2) { showToast('Максимум 2 челленджа'); return; }
    const today = getTodayStr();
    setState({
      ...state,
      stars: state.stars - ch.cost,
      activeChallenges: [...state.activeChallenges, { id: ch.id, startedAt: today, current: 0, lastCheck: null, invested: ch.cost }]
    });
    showToast(`🏁 Челлендж «${ch.name}» запущен!`);
  }, [state, setState, showToast, getTodayStr]);

  const checkChallengeDay = useCallback((chId: string) => {
    const ac = state.activeChallenges.find(a => a.id === chId);
    if (!ac) return;
    const today = getTodayStr();
    if (ac.lastCheck === today) { showToast('Уже отмечено сегодня'); return; }
    const ch = CHALLENGES.find(c => c.id === chId);
    if (!ch) return;
    const newCurrent = ac.current + 1;
    if (newCurrent >= ch.duration) {
      const newXp = state.xp + ch.rewardXp;
      const newStars = state.stars + ch.rewardStars;
      const newSphereProgress = { ...state.sphereProgress, [ch.sphere]: (state.sphereProgress[ch.sphere] || 0) + ch.progressReward };
      setState({
        ...state,
        xp: newXp,
        stars: newStars,
        sphereProgress: newSphereProgress,
        completedChallenges: [...state.completedChallenges, { id: ch.id, completedAt: today }],
        activeChallenges: state.activeChallenges.filter(a => a.id !== chId)
      });
      showToast(`🏆 Челлендж «${ch.name}» завершён! +${ch.rewardStars}★ +${ch.rewardXp} XP`);
    } else {
      setState({
        ...state,
        activeChallenges: state.activeChallenges.map(a => a.id === chId ? { ...a, current: newCurrent, lastCheck: today } : a)
      });
      showToast(`Прогресс: ${newCurrent}/${ch.duration}`);
    }
  }, [state, setState, showToast, getTodayStr]);

  const saveJournal = useCallback((text: string) => {
    if (!text.trim()) return;
    const today = getTodayStr();
    const existingIdx = state.journal.findIndex(e => e.date === today);
    const newEntry = { date: today, time: new Date().toLocaleTimeString(), text: text.trim(), tags: [state.activePath?.id || 'general'] };
    let newJournal;
    if (existingIdx >= 0) {
      newJournal = [...state.journal];
      newJournal[existingIdx] = newEntry;
    } else {
      newJournal = [...state.journal, newEntry];
    }
    setState({ ...state, journal: newJournal });
    showToast('📝 Запись сохранена');
  }, [state, setState, showToast, getTodayStr]);

  const resetAll = useCallback(() => {
    setState(DEFAULT_STATE);
    setScreen('start');
    showToast('🗑 Данные сброшены');
  }, [setState, setScreen, showToast]);

  const importData = useCallback((json: string) => {
    try {
      const d = JSON.parse(json);
      if (!d.archetype && !d.spheres) throw new Error('Неверный формат');
      const newState = { ...DEFAULT_STATE, ...d, version: 5 };
      setState(newState);
      showToast('✅ Данные импортированы');
      return true;
    } catch (e) {
      showToast('❌ Ошибка импорта');
      return false;
    }
  }, [setState, showToast]);

  const exportData = useCallback(() => {
    return JSON.stringify({
      version: 5,
      archetype: state.archetype,
      spheres: state.spheres,
      level: state.level,
      xp: state.xp,
      xpToLevel: state.xpToLevel,
      stars: state.stars,
      activePath: state.activePath,
      completedPaths: state.completedPaths,
      sphereLevels: state.sphereLevels,
      sphereProgress: state.sphereProgress,
      exportedAt: new Date().toISOString()
    }, null, 2);
  }, [state]);

  const value = useMemo(() => ({
    state, setState, screen, setScreen, toast, showToast,
    startSurvey, answerQuestion, calculateArchetype, startPath,
    completeMainStep, toggleSideQuest, completeDailyChallenge,
    buyChallenge, checkChallengeDay, saveJournal, resetAll,
    importData, exportData,
    getTodayStr, daysBetween, calculateXpMultiplier, addXp,
    checkLevelUp, checkSphereLevelUp, checkMissedDays,
    generateSideQuests, generateDailyChallenge, checkCombo
  }), [state, setState, screen, toast, showToast, startSurvey, answerQuestion, calculateArchetype, startPath,
    completeMainStep, toggleSideQuest, completeDailyChallenge, buyChallenge, checkChallengeDay, saveJournal, resetAll,
    importData, exportData, getTodayStr, daysBetween, calculateXpMultiplier, addXp, checkLevelUp, checkSphereLevelUp,
    checkMissedDays, generateSideQuests, generateDailyChallenge, checkCombo]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

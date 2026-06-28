import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'life_system_v5';

export interface AppState {
  version: number;
  answers: { question: number; label: string }[];
  spheres: Record<string, number>;
  archetype: string | null;
  activePath: {
    id: string;
    difficulty: string;
    day: number;
    startedAt: string;
    lastActiveDate: string;
    stepDoneToday: boolean;
    completed: boolean;
  } | null;
  level: number;
  xp: number;
  xpToLevel: number;
  stars: number;
  sideQuests: {
    date: string;
    quests: {
      id: string;
      title: string;
      desc: string;
      sphere: string;
      xp: number;
      progress: number;
      done: boolean;
      note: string;
    }[];
  } | null;
  sideQuestStreak: number;
  lastAllSideQuestsDate: string | null;
  lastSideQuestStreakDate: string | null;
  dailyChallenge: {
    date: string;
    id: string;
    title: string;
    desc: string;
    spheres: string[];
    xp: number;
    progress: number;
    done: boolean;
  } | null;
  dailyChallengeStreak: number;
  lastDailyChallengeDate: string | null;
  activeChallenges: {
    id: string;
    startedAt: string;
    current: number;
    lastCheck: string | null;
    invested: number;
    completed?: boolean;
  }[];
  completedChallenges: { id: string; completedAt: string }[];
  completedPaths: { id: string; difficulty: string; completedAt: string }[];
  questHistory: { date: string; missed?: boolean }[];
  streak: number;
  lastQuestDate: string | null;
  environmentFlags: number;
  sphereProgress: Record<string, number>;
  sphereLevels: Record<string, number>;
  comboData: {
    perfectDaysStreak: number;
    totalPerfectDays: number;
    lastComboDate: string | null;
    comboBonusesEarned: { date: string; bonus: number }[];
  };
  journal: { date: string; time: string; text: string; tags: string[] }[];
}

export const DEFAULT_STATE: AppState = {
  version: 5,
  answers: [],
  spheres: { health: 0, routine: 0, finance: 0, career: 0, awareness: 0, relations: 0, spirituality: 0 },
  archetype: null,
  activePath: null,
  level: 1,
  xp: 0,
  xpToLevel: 100,
  stars: 0,
  sideQuests: null,
  sideQuestStreak: 0,
  lastAllSideQuestsDate: null,
  lastSideQuestStreakDate: null,
  dailyChallenge: null,
  dailyChallengeStreak: 0,
  lastDailyChallengeDate: null,
  activeChallenges: [],
  completedChallenges: [],
  completedPaths: [],
  questHistory: [],
  streak: 0,
  lastQuestDate: null,
  environmentFlags: 0,
  sphereProgress: { health: 0, routine: 0, finance: 0, career: 0, awareness: 0, relations: 0, spirituality: 0 },
  sphereLevels: { health: 1, routine: 1, finance: 1, career: 1, awareness: 1, relations: 1, spirituality: 1 },
  comboData: { perfectDaysStreak: 0, totalPerfectDays: 0, lastComboDate: null, comboBonusesEarned: [] },
  journal: []
};

function migrateV4toV5(p: any): AppState {
  return {
    ...DEFAULT_STATE,
    answers: p.answers || [],
    spheres: p.spheres || DEFAULT_STATE.spheres,
    archetype: p.archetype || null,
    activePath: null,
    level: p.level || 1,
    xp: p.xp || 0,
    xpToLevel: p.xpToLevel || 100,
    stars: 0,
    questHistory: p.questHistory || [],
    streak: p.streak || 0,
    lastQuestDate: p.lastQuestDate || null,
    environmentFlags: p.environmentFlags || 0,
    sphereProgress: p.sphereProgress || DEFAULT_STATE.sphereProgress,
    sphereLevels: p.sphereLevels || DEFAULT_STATE.sphereLevels,
    comboData: p.comboData || DEFAULT_STATE.comboData,
    journal: []
  };
}

export function loadState(): AppState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw);
    if (!p.version || p.version < 5) {
      return migrateV4toV5(p);
    }
    return { ...DEFAULT_STATE, ...p };
  } catch (e) {
    localStorage.removeItem('life_system_v4');
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function saveState(state: AppState) {
  try {
    const toSave = {
      ...state,
      exportedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (e) {
    console.error('saveState error:', e);
  }
}

export function useStorage(): [AppState, (s: AppState) => void] {
  const [state, setState] = useState<AppState>(() => {
    const loaded = loadState();
    return loaded || DEFAULT_STATE;
  });

  const setAndSave = useCallback((newState: AppState) => {
    setState(newState);
    saveState(newState);
  }, []);

  return [state, setAndSave];
}

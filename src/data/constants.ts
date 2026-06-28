export interface SphereDef {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export const SPHERES: Record<string, SphereDef> = {
  health: { id: 'health', name: 'Здоровье', icon: '💪', color: '#e05a5a' },
  routine: { id: 'routine', name: 'Режим', icon: '⏰', color: '#4f8cff' },
  finance: { id: 'finance', name: 'Финансы', icon: '💰', color: '#7ec850' },
  career: { id: 'career', name: 'Карьера', icon: '🎯', color: '#c8a86e' },
  awareness: { id: 'awareness', name: 'Осознанность', icon: '🧠', color: '#a855f7' },
  relations: { id: 'relations', name: 'Отношения', icon: '🤝', color: '#ec4899' },
  spirituality: { id: 'spirituality', name: 'Духовность', icon: '✨', color: '#f59e0b' }
};

export const SPHERE_ORDER = ['health','routine','finance','career','awareness','relations','spirituality'];

export interface OptionDef {
  label: string;
  text: string;
  spheres: Record<string, number>;
}

export interface QuestionDef {
  text: string;
  options: OptionDef[];
}

export const QUESTIONS: QuestionDef[] = [
  {
    text: "Утро. Будильник звонит. Что происходит?",
    options: [
      { label: "A", text: "Встаю сразу, делаю утренние практики", spheres: { health: 2, routine: 2, awareness: 1 } },
      { label: "B", text: "Лежу ещё 30 мин, листаю ленту", spheres: { routine: -2, awareness: -1, spirituality: -1 } },
      { label: "C", text: "Встаю, но без энергии, кофе спасает", spheres: { health: -1, routine: 1, awareness: -1 } },
      { label: "D", text: "Откладываю до последнего, бегу на дела", spheres: { routine: -2, career: -1, awareness: -1 } }
    ]
  },
  {
    text: "Рабочий день. Как перекусываешь?",
    options: [
      { label: "A", text: "Готовлю еду с собой, ем по режиму", spheres: { health: 2, routine: 2, finance: 1 } },
      { label: "B", text: "Беру что есть: фастфуд, сладкое, газировка", spheres: { health: -2, finance: -1, awareness: -1 } },
      { label: "C", text: "Пропускаю приёмы пищи, не до этого", spheres: { health: -2, career: 1, awareness: -1 } },
      { label: "D", text: "Стараюсь выбирать здоровое, но не всегда получается", spheres: { health: 1, routine: 1, awareness: 1 } }
    ]
  },
  {
    text: "Есть привычка, которую хочешь изменить. Как к этому относишься?",
    options: [
      { label: "A", text: "Хочу бросить, пробовал — не получилось", spheres: { health: -2, routine: -1, awareness: -1 } },
      { label: "B", text: "Пока продолжаю, но ищу способ замены", spheres: { health: -1, finance: -1, awareness: 1 } },
      { label: "C", text: "Это мой способ снять стресс", spheres: { health: -1, career: 1, awareness: -2, spirituality: -1 } },
      { label: "D", text: "Не считаю проблемой, контролирую", spheres: { health: -1, relations: 1, awareness: -1 } }
    ]
  },
  {
    text: "Доход и расходы. Что с деньгами?",
    options: [
      { label: "A", text: "Всё уходит на текущие расходы, не откладываю", spheres: { finance: -2, routine: -1, awareness: -1 } },
      { label: "B", text: "Пытаюсь вести учёт, но постоянно срываюсь", spheres: { finance: -1, routine: 1, awareness: 1 } },
      { label: "C", text: "Есть план накопления, но не хватает дисциплины", spheres: { finance: 1, routine: -1, awareness: 1 } },
      { label: "D", text: "Ищу дополнительные источники дохода", spheres: { finance: 1, career: 2, awareness: 1 } }
    ]
  },
  {
    text: "Большая цель (квартира, машина, путешествие). Какой план?",
    options: [
      { label: "A", text: "Нет конкретного плана, просто мечта", spheres: { finance: -2, routine: -2, awareness: -1, spirituality: -1 } },
      { label: "B", text: "Считал варианты, но цифры пугают", spheres: { finance: 1, career: -1, awareness: 1 } },
      { label: "C", text: "Есть цель по накоплениям, работаю над ростом дохода", spheres: { finance: 2, career: 2, awareness: 1 } },
      { label: "D", text: "Рассматриваю разные варианты: кредит, совместная покупка, накопления", spheres: { finance: 2, relations: 1, awareness: 1 } }
    ]
  },
  {
    text: "Как видишь свою карьеру через 3 года?",
    options: [
      { label: "A", text: "Хочу расти в текущей сфере — управление, экспертиза", spheres: { career: 2, routine: 1, awareness: 1 } },
      { label: "B", text: "Это временно, ищу выход в другое направление", spheres: { career: -1, finance: -1, awareness: 1 } },
      { label: "C", text: "Хочу совмещать с творческой или социальной деятельностью", spheres: { career: 1, awareness: 2, relations: 1 } },
      { label: "D", text: "Меня устраивает стабильность, не гонюсь за карьерой", spheres: { career: -1, relations: 2, spirituality: 1 } }
    ]
  },
  {
    text: "Хочешь делиться знаниями, опытом, мыслями с миром. Что мешает?",
    options: [
      { label: "A", text: "Не знаю, с чего начать — информационный хаос", spheres: { awareness: -2, career: 1, spirituality: -1 } },
      { label: "B", text: "Нет времени после работы, устаю", spheres: { health: -1, career: -1, routine: -1, awareness: -1 } },
      { label: "C", text: "Боюсь осуждения, неуверенность в себе", spheres: { awareness: -1, relations: -1, spirituality: -1 } },
      { label: "D", text: "Начинал, но бросал — нет системности", spheres: { awareness: -1, routine: -2, spirituality: -1 } }
    ]
  },
  {
    text: "Физическая активность. Какая реальность?",
    options: [
      { label: "A", text: "Тренируюсь регулярно, 2–3 раза в неделю", spheres: { health: 2, routine: 2, awareness: 1 } },
      { label: "B", text: "Начинал много раз, каждый раз срываюсь", spheres: { health: -1, routine: -2, awareness: -1 } },
      { label: "C", text: "Хочу, но график/мотивация не позволяют", spheres: { health: -1, career: -1, awareness: -1 } },
      { label: "D", text: "Иногда двигаюсь, но без системы", spheres: { health: 1, routine: -1, awareness: -1 } }
    ]
  },
  {
    text: "Близкие люди. Как проводишь время с семьёй/партнёром?",
    options: [
      { label: "A", text: "Качественное время вместе — приоритет", spheres: { relations: 2, routine: 1, spirituality: 1 } },
      { label: "B", text: "Видимся мало, работа выжимает", spheres: { relations: -2, career: -1, awareness: -1 } },
      { label: "C", text: "Бытовуха: готовка, уборка, сериалы", spheres: { relations: 1, routine: -1, spirituality: -1 } },
      { label: "D", text: "Каждый живёт своей жизнью под одной крышей", spheres: { relations: -1, health: -1, spirituality: -1 } }
    ]
  },
  {
    text: "Медитация, рефлексия, зарядка — в планах или в жизни?",
    options: [
      { label: "A", text: "Делаю ежедневно, это моя опора", spheres: { health: 2, routine: 2, awareness: 2, spirituality: 2 } },
      { label: "B", text: "Пробовал, не зашло, бросил", spheres: { health: -1, routine: -1, awareness: -1, spirituality: -1 } },
      { label: "C", text: "Хочу начать, но «потом»", spheres: { routine: -2, health: -1, awareness: -2, spirituality: -1 } },
      { label: "D", text: "Считаю это баловством, не для меня", spheres: { health: -1, awareness: -2, spirituality: -2, relations: -1 } }
    ]
  },
  {
    text: "Выходной после рабочей недели. Что делаешь?",
    options: [
      { label: "A", text: "Восстанавливаюсь: сон, еда, ничегонеделание", spheres: { health: 1, routine: -1, spirituality: 1 } },
      { label: "B", text: "Подрабатываю, ищу дополнительный доход", spheres: { finance: 2, career: 1, health: -1, awareness: -1 } },
      { label: "C", text: "Работаю над личным проектом, обучением, творчеством", spheres: { awareness: 2, career: 1, spirituality: 1, health: -1 } },
      { label: "D", text: "Время с близкими, друзьями, природой", spheres: { relations: 2, health: 1, spirituality: 1 } }
    ]
  },
  {
    text: "Информационная среда. Как потребляешь контент?",
    options: [
      { label: "A", text: "Читаю книги, статьи, смотрю обучающие материалы", spheres: { awareness: 2, career: 1, spirituality: 1 } },
      { label: "B", text: "Листаю ленту, смотрю шоу, реакции", spheres: { awareness: -2, routine: -1, spirituality: -1 } },
      { label: "C", text: "Слежу за новостями, политикой, скандалами", spheres: { awareness: -1, relations: -1, spirituality: -1, health: -1 } },
      { label: "D", text: "Минимум контента, предпочитаю тишину", spheres: { awareness: 1, spirituality: 2, relations: 1 } }
    ]
  },
  {
    text: "Смыслы и ценности. Как относишься к вопросу «зачем»?",
    options: [
      { label: "A", text: "Регулярно задумываюсь, ищу ответы", spheres: { awareness: 2, spirituality: 2, career: 1 } },
      { label: "B", text: "Пока не до этого, жизнь требует действий", spheres: { awareness: -1, spirituality: -1, career: 1, finance: 1 } },
      { label: "C", text: "Нашёл свои ответы, живу по ним", spheres: { spirituality: 2, awareness: 1, relations: 1, health: 1 } },
      { label: "D", text: "Считаю это философией для лентяев", spheres: { spirituality: -2, awareness: -2, career: 1, relations: -1 } }
    ]
  },
  {
    text: "Стресс и тревога. Как справляешься?",
    options: [
      { label: "A", text: "Дышу, медитирую, говорю с близкими", spheres: { health: 2, awareness: 2, spirituality: 1, relations: 1 } },
      { label: "B", text: "Заглушаю: еда, алкоголь, сериалы, игры", spheres: { health: -2, awareness: -2, spirituality: -2, routine: -1 } },
      { label: "C", text: "Работаю больше, чтобы не думать", spheres: { career: 1, health: -1, awareness: -2, relations: -1 } },
      { label: "D", text: "Просто переживаю, со временем проходит", spheres: { health: -1, awareness: -1, spirituality: -1, relations: -1 } }
    ]
  },
  {
    text: "Если бы изменил одно в жизни через 6 месяцев — что?",
    options: [
      { label: "A", text: "Физическая форма: режим, спорт, отказ от вредного", spheres: { health: 3, routine: 2, awareness: 1 } },
      { label: "B", text: "Финансовая подушка и план на большую цель", spheres: { finance: 3, career: 1, awareness: 1 } },
      { label: "C", text: "Свой проект, аудитория, влияние", spheres: { awareness: 3, career: 1, spirituality: 1 } },
      { label: "D", text: "Гармония: работа не крадёт всё время, близкие рядом", spheres: { relations: 2, routine: 2, spirituality: 2, career: -1 } }
    ]
  }
];

export interface ArchetypeDef {
  id: string;
  name: string;
  tagline: string;
  desc: string;
  dominant: string[];
  bonus: string;
  color: string;
  icon: string;
  penalty?: string[];
}

export const ARCHETYPES: Record<string, ArchetypeDef> = {
  warrior: { id: 'warrior', name: 'Воин', tagline: 'Тело как фундамент', desc: 'Ты строишь реальность через дисциплину и физическую базу. Здоровье и режим — твоя архитектура.', dominant: ['health','routine'], bonus: 'Квесты Здоровья и Режима дают +30% XP', color: '#e05a5a', icon: '⚔️' },
  architect: { id: 'architect', name: 'Архитектор', tagline: 'Системы как рычаг', desc: 'Ты видишь паттерны в хаосе. Финансы, процессы, масштаб — твой язык.', dominant: ['finance','career'], bonus: 'Квесты Финансов и Карьеры дают +30% XP', color: '#7ec850', icon: '🏗️' },
  guide: { id: 'guide', name: 'Проводник', tagline: 'Свет через осознанность', desc: 'Ты передаёшь смыслы и помогаешь другим видеть. Осознанность и духовность — твои инструменты.', dominant: ['awareness','spirituality'], bonus: 'Квесты Осознанности и Духовности дают +30% XP', color: '#a855f7', icon: '🔮' },
  sentinel: { id: 'sentinel', name: 'Страж', tagline: 'Связи как структура', desc: 'Ты читаешь социальные графы и находишь точки входа. Отношения и репутация — твой актив.', dominant: ['relations','career'], bonus: 'Квесты Отношений и Карьеры дают +30% XP', color: '#ec4899', icon: '🛡️' },
  monk: { id: 'monk', name: 'Монах', tagline: 'Внутренний путь', desc: 'Ты ищешь глубину через практику. Здоровье и духовность — твоя опора.', dominant: ['health','spirituality'], bonus: 'Квесты Здоровья и Духовности дают +30% XP', color: '#f59e0b', icon: '☸️' },
  rebel: { id: 'rebel', name: 'Бунтарь', tagline: 'Против системы — к себе', desc: 'Ты не вписываешься в рамки. Любая сфера — твоя арена, но рутина и осознанность даются тяжело.', dominant: [], bonus: '+20% XP к любой сфере, но штраф к Режиму и Осознанности', color: '#e05a5a', icon: '🔥', penalty: ['routine','awareness'] },
  nomad: { id: 'nomad', name: 'Кочевник', tagline: 'Баланс как путь', desc: 'Ты на перепутье. Силы распылены, вектор не зафиксирован. Это точка отсчёта перед выбором.', dominant: [], bonus: 'Все квесты дают +10% XP, но прокачка медленнее', color: '#c8a86e', icon: '🧭' },
  recluse: { id: 'recluse', name: 'Затворник', tagline: 'Тихая сила', desc: 'Ты в состоянии затишья. Все сферы на низком старте, но внутри есть потенциал.', dominant: ['routine','spirituality'], bonus: '+15% XP к Режиму и Духовности, штраф к Карьере', color: '#5a6a80', icon: '🌑', penalty: ['career'] }
};

export interface LevelDef {
  num: number;
  name: string;
  xpTo: number;
}

export const LEVELS: LevelDef[] = [
  { num: 1, name: 'Пробуждение', xpTo: 100 },
  { num: 2, name: 'Первый шаг', xpTo: 250 },
  { num: 3, name: 'Устойчивость', xpTo: 500 },
  { num: 4, name: 'Расширение', xpTo: 800 },
  { num: 5, name: 'Мастерство', xpTo: 1200 },
  { num: 6, name: 'Гармония', xpTo: 1700 },
  { num: 7, name: 'Легенда', xpTo: 2500 }
];

export interface DifficultyDef {
  id: string;
  name: string;
  desc: string;
  xpMultiplier: number;
}

export const DIFFICULTY: Record<string, DifficultyDef> = {
  newbie: { id: 'newbie', name: 'Newbie', desc: 'Разжёванные шаги, прощение пропусков', xpMultiplier: 0.8 },
  pro: { id: 'pro', name: 'Pro', desc: 'Чёткие шаги, стандартная награда', xpMultiplier: 1.0 },
  hardcore: { id: 'hardcore', name: 'Hardcore', desc: 'Сжатые сроки, двойная награда', xpMultiplier: 1.5 }
};

export interface PathStepDef {
  day: number;
  title: string;
  desc: string;
  xp: number;
  time: string;
}

export interface PathRewardsDef {
  stars: number;
  xp: number;
  sphereProgress: number;
}

export interface PathDef {
  id: string;
  name: string;
  sphere: string;
  icon: string;
  color: string;
  desc: string;
  steps: PathStepDef[];
  rewards: Record<string, PathRewardsDef>;
}

export const PATHS: Record<string, PathDef> = {
  blogger: {
    id: 'blogger', name: 'Блогер', sphere: 'awareness', icon: '📱', color: '#a855f7',
    desc: 'Видеоблог и соцсети: VK, Instagram, YouTube. От нуля до системного контента за 30 дней.',
    steps: [
      { day: 1, title: 'Платформа и профиль', desc: 'Выбери платформу (VK/IG/YT). Оформи аватар, шапку, био до 50 слов.', xp: 15, time: '30 мин' },
      { day: 2, title: '10 тем', desc: 'Запиши 10 идей для постов в заметки телефона.', xp: 10, time: '20 мин' },
      { day: 3, title: 'Пост-знакомство', desc: 'Напиши и опубликуй пост о себе (300-500 слов) или 60-сек видео.', xp: 20, time: '45 мин' },
      { day: 4, title: 'Вовлечение', desc: 'Ответь на 5 комментариев в чужих блогах. Подпишись на 10 аккаунтов в нише.', xp: 15, time: '30 мин' },
      { day: 5, title: 'Stories', desc: 'Сделай 3 stories с повседневности. Без фильтров.', xp: 15, time: '20 мин' },
      { day: 6, title: 'Мифы', desc: 'Напиши пост "5 мифов о [твоя тема]". Опубликуй.', xp: 20, time: '45 мин' },
      { day: 7, title: 'Опрос', desc: 'Сделай опрос в stories (2 варианта). Зафиксируй ответы.', xp: 10, time: '15 мин' },
      { day: 8, title: 'Био 2.0', desc: 'Перепиши био на основе первой недели.', xp: 10, time: '20 мин' },
      { day: 9, title: 'Первое видео', desc: 'Сними 1-минутное видео на телефон. Залей Reels/Shorts/Stories.', xp: 25, time: '60 мин' },
      { day: 10, title: 'Личная история', desc: 'Напиши пост с личной историей (провал/урок).', xp: 20, time: '40 мин' },
      { day: 11, title: 'Цепляющие stories', desc: '5 stories с цепляющими заголовками (текст поверх).', xp: 15, time: '25 мин' },
      { day: 12, title: 'Аудит конкурентов', desc: 'Проанализируй 3 поста конкурентов. Запиши вывод.', xp: 15, time: '30 мин' },
      { day: 13, title: 'Повтори успех', desc: 'Повтори формат самого успешного поста. Улучши.', xp: 20, time: '40 мин' },
      { day: 14, title: 'AMA', desc: 'Stories "Спроси меня что угодно". Ответь на 3 вопроса.', xp: 15, time: '30 мин' },
      { day: 15, title: 'Итог 2 недель', desc: 'Пост-итог: что изменилось за 2 недели.', xp: 20, time: '35 мин' },
      { day: 16, title: '3 совета', desc: 'Сними видео "3 совета новичкам" (60 сек).', xp: 25, time: '60 мин' },
      { day: 17, title: 'Карусель', desc: 'Сделай коллаж/карусель из 3-5 слайдов. Пост.', xp: 20, time: '40 мин' },
      { day: 18, title: 'Мягкая контрверсия', desc: 'Пост "Почему [общее мнение] не работает".', xp: 20, time: '40 мин' },
      { day: 19, title: 'День из жизни', desc: '7 stories за день (каждый час по 1).', xp: 20, time: '30 мин' },
      { day: 20, title: 'Пиар', desc: 'Найди 1 аккаунт для взаимного пиара. Напиши в директ.', xp: 15, time: '25 мин' },
      { day: 21, title: 'Топ-5', desc: 'Пост "Мой топ-5 инструментов/книг".', xp: 20, time: '40 мин' },
      { day: 22, title: 'Диалог', desc: 'Сними видео с подписчиком/другом (60 сек).', xp: 25, time: '60 мин' },
      { day: 23, title: 'Таймлапс', desc: 'Stories с таймлапсом процесса (работа, хобби, утро).', xp: 15, time: '20 мин' },
      { day: 24, title: 'Уязвимость', desc: 'Пост "Честно о моих страхах/сомнениях".', xp: 20, time: '35 мин' },
      { day: 25, title: 'Призыв к действию', desc: 'Пост с розыгрышем или чётким призывом к действию.', xp: 20, time: '30 мин' },
      { day: 26, title: 'Бэкстейдж', desc: 'Сними "бэкстейдж" создания контента (45 сек).', xp: 20, time: '40 мин' },
      { day: 27, title: 'Советы себе', desc: 'Пост "Если бы я начинал сейчас, я бы..."', xp: 20, time: '35 мин' },
      { day: 28, title: 'Миф vs Реальность', desc: '10 stories "Миф vs Реальность" в нише.', xp: 20, time: '30 мин' },
      { day: 29, title: 'Благодарность', desc: 'Пост благодарности аудитории. Планы на месяц.', xp: 15, time: '25 мин' },
      { day: 30, title: 'Финал', desc: 'Итоговый пост/видео "30 дней блога: что произошло".', xp: 30, time: '60 мин' }
    ],
    rewards: {
      newbie: { stars: 15, xp: 100, sphereProgress: 50 },
      pro: { stars: 20, xp: 150, sphereProgress: 75 },
      hardcore: { stars: 30, xp: 250, sphereProgress: 100 }
    }
  }
};

export interface SideQuestDef {
  id: string;
  title: string;
  desc: string;
  sphere: string;
  xp: number;
  progress: number;
}

export const SIDE_QUEST_POOL: SideQuestDef[] = [
  { id: 'sq_walk', title: 'Прогулка', desc: '15 мин ходьбы на свежем воздухе', sphere: 'health', xp: 5, progress: 10 },
  { id: 'sq_water', title: 'Вода', desc: 'Выпить стакан воды сразу после пробуждения', sphere: 'health', xp: 3, progress: 5 },
  { id: 'sq_stretch', title: 'Растяжка', desc: '10 мин растяжки на коврике', sphere: 'health', xp: 5, progress: 10 },
  { id: 'sq_sleep', title: 'Ранний сон', desc: 'Лечь спать до 23:00', sphere: 'health', xp: 5, progress: 10 },
  { id: 'sq_nophone', title: 'Без телефона', desc: 'Встать и первые 30 мин не трогать телефон', sphere: 'routine', xp: 5, progress: 10 },
  { id: 'sq_prior', title: '3 приоритета', desc: 'Записать 3 главных дела на день', sphere: 'routine', xp: 3, progress: 5 },
  { id: 'sq_evening', title: 'Цифровой закат', desc: 'Убрать телефон за 30 мин до сна', sphere: 'routine', xp: 5, progress: 10 },
  { id: 'sq_money', title: 'Учёт расходов', desc: 'Зафиксировать все расходы за сегодня', sphere: 'finance', xp: 3, progress: 5 },
  { id: 'sq_sub', title: 'Аудит подписок', desc: 'Проверить 1 подписку: нужна ли?', sphere: 'finance', xp: 5, progress: 10 },
  { id: 'sq_call', title: 'Звонок близкому', desc: '5-минутный разговор с родным/другом', sphere: 'relations', xp: 5, progress: 10 },
  { id: 'sq_thanks', title: 'Благодарность', desc: 'Написать сообщение благодарности другу', sphere: 'relations', xp: 3, progress: 5 },
  { id: 'sq_read', title: 'Чтение', desc: 'Прочитать 10 страниц книги', sphere: 'awareness', xp: 5, progress: 10 },
  { id: 'sq_window', title: 'Тишина', desc: '10 мин без телефона, смотреть в окно', sphere: 'awareness', xp: 3, progress: 5 },
  { id: 'sq_breath', title: 'Дыхание', desc: '5 мин тишины, фокус на дыхании', sphere: 'spirituality', xp: 3, progress: 5 },
  { id: 'sq_gratitude', title: '3 строки', desc: 'Записать 3 вещи, за которые благодарен', sphere: 'spirituality', xp: 3, progress: 5 }
];

export interface ChallengeDef {
  id: string;
  name: string;
  desc: string;
  duration: number;
  cost: number;
  rewardXp: number;
  rewardStars: number;
  sphere: string;
  progressReward: number;
}

export const CHALLENGES: ChallengeDef[] = [
  { id: 'ch_content_7', name: 'Неделя контента', desc: '7 дней подряд: минимум 3 stories в день', duration: 7, cost: 3, rewardXp: 50, rewardStars: 6, sphere: 'awareness', progressReward: 20 },
  { id: 'ch_streak_14', name: '14 дней без пропусков', desc: 'Выполнять основной квест 14 дней подряд', duration: 14, cost: 5, rewardXp: 100, rewardStars: 10, sphere: 'awareness', progressReward: 30 },
  { id: 'ch_video_7', name: 'Видео-марафон', desc: '7 видео за 7 дней (Reels/Shorts/Stories)', duration: 7, cost: 4, rewardXp: 80, rewardStars: 8, sphere: 'awareness', progressReward: 25 },
  { id: 'ch_early_7', name: 'Неделя жаворонка', desc: 'Вставать до 7:00 7 дней подряд', duration: 7, cost: 3, rewardXp: 50, rewardStars: 6, sphere: 'routine', progressReward: 20 },
  { id: 'ch_dry_7', name: 'Сухая неделя', desc: 'Без алкоголя 7 дней', duration: 7, cost: 2, rewardXp: 40, rewardStars: 4, sphere: 'health', progressReward: 20 }
];

export interface DailyChallengeDef {
  id: string;
  title: string;
  desc: string;
  spheres: string[];
  xp: number;
  progress: number;
}

export const DAILY_CHALLENGE_POOL: DailyChallengeDef[] = [
  { id: 'dc_sugar', title: 'Без сахара', desc: 'Ни грамма рафинированного сахара за день', spheres: ['health', 'awareness'], xp: 8, progress: 15 },
  { id: 'dc_early', title: 'Жаворонок', desc: 'Встать до 6:30 и не ложиться обратно', spheres: ['routine', 'health'], xp: 8, progress: 15 },
  { id: 'dc_read', title: '20 страниц', desc: 'Прочитать 20 страниц полезной книги', spheres: ['awareness'], xp: 8, progress: 15 },
  { id: 'dc_pushups', title: '100 отжиманий', desc: '100 отжиманий за день (можно подходами)', spheres: ['health'], xp: 10, progress: 20 },
  { id: 'dc_gratitude', title: '5 благодарностей', desc: 'Записать 5 конкретных вещей, за которые благодарен', spheres: ['spirituality', 'awareness'], xp: 8, progress: 15 },
  { id: 'dc_call', title: 'Важный звонок', desc: 'Позвонить человеку, с которым давно не общался', spheres: ['relations'], xp: 8, progress: 15 },
  { id: 'dc_money', title: 'Нулевые траты', desc: 'Не потратить ни копейки на импульсивные покупки', spheres: ['finance', 'awareness'], xp: 8, progress: 15 },
  { id: 'dc_career', title: 'Карьерный шаг', desc: 'Сделать 1 действие для роста в работе (письмо, резюме, навык)', spheres: ['career'], xp: 8, progress: 15 },
  { id: 'dc_walk', title: '10 000 шагов', desc: 'Пройти 10 000 шагов за день', spheres: ['health'], xp: 10, progress: 20 },
  { id: 'dc_meditate', title: 'Медитация', desc: '15 минут осознанной практики (медитация/молитва/тишина)', spheres: ['spirituality', 'health'], xp: 8, progress: 15 },
  { id: 'dc_noscreen', title: 'Цифровой детокс', desc: 'Ни одного часа подряд в соцсетях/видео', spheres: ['awareness', 'routine'], xp: 8, progress: 15 },
  { id: 'dc_water', title: '2 литра воды', desc: 'Выпить 2 литра чистой воды за день', spheres: ['health'], xp: 8, progress: 15 }
];

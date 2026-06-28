# ЖИЗНЬ — Система развития v5

React + TypeScript + Capacitor приложение для Android.

## Быстрый старт (без Android Studio)

### 1. Загрузи на GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/ТВОЙ_НИК/life-system-app.git
git push -u origin main
```

### 2. Запусти сборку
- Открой репозиторий на GitHub
- Перейди в раздел **Actions** → **Build Android APK**
- Нажми **Run workflow** → выбери **debug** → **Run workflow**
- Через 5-10 минут APK будет в разделе **Artifacts**

### 3. Скачай APK
- В Actions открой последний успешный запуск
- Внизу найди **Artifacts** → **app-debug**
- Скачай ZIP, распакуй, установи `app-debug.apk` на телефон

## Локальная разработка

```bash
npm install
npm start          # dev server
npm run build      # production build
npm run build:apk  # сборка APK (нужен Android SDK)
```

## Структура

- `src/screens/` — экраны приложения
- `src/components/` — переиспользуемые компоненты
- `src/data/constants.ts` — вопросы, архетипы, пути, челленджи
- `src/hooks/useStorage.ts` — localStorage + миграции
- `src/AppContext.tsx` — глобальное состояние + логика

## Лицензия

MIT

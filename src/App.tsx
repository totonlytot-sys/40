import React from 'react';
import { AppProvider, useApp } from './AppContext';
import { StartScreen } from './screens/StartScreen';
import { SurveyScreen } from './screens/SurveyScreen';
import { ArchetypeScreen } from './screens/ArchetypeScreen';
import { PathChoiceScreen } from './screens/PathChoiceScreen';
import { PathStartScreen } from './screens/PathStartScreen';
import { QuestsScreen } from './screens/QuestsScreen';
import { ChallengesScreen } from './screens/ChallengesScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { ImportScreen } from './screens/ImportScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { Toast } from './components/Toast';

const ScreenRouter: React.FC = () => {
  const { screen } = useApp();

  switch (screen) {
    case 'start': return <StartScreen />;
    case 'survey': return <SurveyScreen />;
    case 'archetype': return <ArchetypeScreen />;
    case 'path-choice': return <PathChoiceScreen />;
    case 'path-start': return <PathStartScreen />;
    case 'quests': return <QuestsScreen />;
    case 'challenges': return <ChallengesScreen />;
    case 'profile': return <ProfileScreen />;
    case 'import': return <ImportScreen />;
    case 'settings': return <SettingsScreen />;
    default: return <StartScreen />;
  }
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <div style={{
        maxWidth: 640, margin: '0 auto', padding: '20px 16px', minHeight: '100vh'
      }}>
        <ScreenRouter />
        <Toast />
      </div>
    </AppProvider>
  );
};

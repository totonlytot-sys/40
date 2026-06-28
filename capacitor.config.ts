import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ru.lifesystem.app',
  appName: 'ЖИЗНЬ — Система развития',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#4f8cff",
      sound: "beep.wav"
    }
  }
};

export default config;

import { useCallback } from 'react';

export function useNotifications() {
  const requestPermission = useCallback(async () => {
    if ('Notification' in window) {
      return await Notification.requestPermission();
    }
    return 'denied';
  }, []);

  const scheduleLocal = useCallback(async (title: string, body: string, delayMs: number) => {
    if (!('Notification' in window)) return;
    const perm = await Notification.requestPermission();
    if (perm === 'granted') {
      setTimeout(() => {
        new Notification(title, { body, icon: '/icon-192.png' });
      }, delayMs);
    }
  }, []);

  const scheduleDaily = useCallback(async (hour: number, minute: number, title: string, body: string) => {
    const now = new Date();
    const target = new Date();
    target.setHours(hour, minute, 0, 0);
    if (target <= now) target.setDate(target.getDate() + 1);
    const delayMs = target.getTime() - now.getTime();
    scheduleLocal(title, body, delayMs);
  }, [scheduleLocal]);

  return { requestPermission, scheduleLocal, scheduleDaily };
}

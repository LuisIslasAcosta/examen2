import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { ref, set, onValue, off } from 'firebase/database';
import { database } from '../config/firebase';

class NotificationService {
  constructor() {
    this.userId = null;
    this.notificationListener = null;
    this.responseListener = null;
    this.isInitialized = false;
  }

  // Inicializar servicio
  async initialize(userId) {
    try {
      this.userId = userId;
      
      // Configurar comportamiento de notificaciones solo una vez
      if (!this.isInitialized) {
        Notifications.setNotificationHandler({
          handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
          }),
        });
        this.isInitialized = true;
      }
      
      // Configurar listeners solo si no están configurados
      if (!this.notificationListener) {
        this.setupNotificationListeners();
      }
    } catch (error) {
      console.error('Error al inicializar NotificationService:', error);
    }
  }

  // Configurar listeners de notificaciones
  setupNotificationListeners() {
    // Listener para notificaciones recibidas
    this.notificationListener = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notificación recibida:', notification);
    });

    // Listener para respuesta del usuario
    this.responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Respuesta a notificación:', response);
    });
  }

  // Solicitar permisos de notificaciones
  async requestPermissions() {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        throw new Error('Permiso de notificaciones denegado');
      }

      // Configurar canal de notificaciones para Android
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'Notificaciones Deportivas',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#2563eb',
        });
      }

      return true;
    } catch (error) {
      console.error('Error al solicitar permisos:', error);
      return false;
    }
  }

  // Enviar notificación local
  async sendLocalNotification(title, body, data = {}) {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data,
          sound: true,
        },
        trigger: null, // Inmediata
      });
    } catch (error) {
      console.error('Error al enviar notificación:', error);
    }
  }

  // Enviar notificación de meta alcanzada
  async sendGoalNotification(goalType, currentValue, goalValue) {
    const title = '¡Meta Alcanzada! 🎉';
    const body = `Has completado tu meta de ${goalType}: ${currentValue} / ${goalValue}`;
    
    await this.sendLocalNotification(title, body, {
      type: 'goal_achieved',
      goalType,
      currentValue,
      goalValue
    });
  }

  // Enviar notificación de recordatorio
  async sendReminderNotification(message) {
    const title = 'Recordatorio de Actividad';
    
    await this.sendLocalNotification(title, message, {
      type: 'reminder'
    });
  }

  // Escuchar notificaciones desde Firebase
  listenForNotifications(callback) {
    if (!this.userId || !database) return;

    const notificationsRef = ref(database, `notifications/${this.userId}`);
    
    onValue(notificationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const notifications = Object.values(data);
        callback(notifications);
      }
    });

    return () => off(notificationsRef);
  }

  // Guardar notificación en Firebase
  async saveNotificationToFirebase(notification) {
    if (!this.userId || !database) return;

    try {
      const notificationData = {
        userId: this.userId,
        title: notification.title,
        body: notification.body,
        type: notification.type || 'info',
        timestamp: Date.now(),
        read: false
      };

      const notificationRef = ref(database, `notifications/${this.userId}/${Date.now()}`);
      await set(notificationRef, notificationData);
    } catch (error) {
      console.error('Error al guardar notificación:', error);
    }
  }

  // Limpiar listeners
  cleanup() {
    if (this.notificationListener) {
      Notifications.removeNotificationSubscription(this.notificationListener);
    }
    if (this.responseListener) {
      Notifications.removeNotificationSubscription(this.responseListener);
    }
  }
}

// Singleton instance
const notificationService = new NotificationService();
export default notificationService;
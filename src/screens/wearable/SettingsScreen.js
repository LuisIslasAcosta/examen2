import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import sensorService from '../../services/sensorService';
import notificationService from '../../services/notificationService';

export const SettingsScreen = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoSync, setAutoSync] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

  const stepGoal = 10000;
  const [currentGoal, setCurrentGoal] = useState(stepGoal);

  const toggleNotifications = async (value) => {
    setNotificationsEnabled(value);
    if (value) {
      await notificationService.requestPermissions();
    }
  };

  const SettingItem = ({ iconName, title, subtitle, rightComponent, iconColor = '#2563eb' }) => (
    <View style={styles.settingItem}>
      <View style={styles.settingLeft}>
        <View style={[styles.settingIcon, { backgroundColor: iconColor + '20' }]}>
          <Ionicons name={iconName} size={24} color={iconColor} />
        </View>
        <View>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {rightComponent}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Configuración</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Perfil */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Perfil</Text>
          <View style={styles.profileCard}>
            <View style={[styles.avatar, { backgroundColor: '#dbeafe' }]}>
              <Ionicons name="person" size={28} color="#2563eb" />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Usuario Demo</Text>
              <Text style={styles.profileEmail}>user@demo.com</Text>
            </View>
          </View>
        </View>

        {/* Metas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Metas Diarias</Text>
          <View style={styles.goalCard}>
            <View style={styles.goalItem}>
              <View style={[styles.goalIcon, { backgroundColor: '#dbeafe' }]}>
                <Ionicons name="footsteps" size={24} color="#2563eb" />
              </View>
              <View style={styles.goalInfo}>
                <Text style={styles.goalLabel}>Pasos</Text>
                <Text style={styles.goalValue}>{currentGoal.toLocaleString()}</Text>
              </View>
            </View>
            <View style={styles.goalItem}>
              <View style={[styles.goalIcon, { backgroundColor: '#fee2e2' }]}>
                <Ionicons name="flame" size={24} color="#ef4444" />
              </View>
              <View style={styles.goalInfo}>
                <Text style={styles.goalLabel}>Calorías</Text>
                <Text style={styles.goalValue}>500 kcal</Text>
              </View>
            </View>
            <View style={styles.goalItem}>
              <View style={[styles.goalIcon, { backgroundColor: '#dcfce7' }]}>
                <Ionicons name="map" size={24} color="#22c55e" />
              </View>
              <View style={styles.goalInfo}>
                <Text style={styles.goalLabel}>Distancia</Text>
                <Text style={styles.goalValue}>5 km</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Notificaciones */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notificaciones</Text>
          <View style={styles.settingsCard}>
            <SettingItem
              iconName="notifications"
              title="Notificaciones"
              subtitle="Recibir alertas y recordatorios"
              rightComponent={
                <Switch
                  value={notificationsEnabled}
                  onValueChange={toggleNotifications}
                  trackColor={{ false: '#374151', true: '#2563eb' }}
                  thumbColor="#ffffff"
                />
              }
            />
            <View style={styles.divider} />
            <SettingItem
              iconName="volume-high"
              title="Sonido"
              subtitle="Sonido de notificaciones"
              rightComponent={
                <Switch
                  value={soundEnabled}
                  onValueChange={setSoundEnabled}
                  trackColor={{ false: '#374151', true: '#2563eb' }}
                  thumbColor="#ffffff"
                />
              }
            />
            <View style={styles.divider} />
            <SettingItem
              iconName="phone-portrait"
              title="Vibración"
              subtitle="Vibración al recibir notificaciones"
              rightComponent={
                <Switch
                  value={vibrationEnabled}
                  onValueChange={setVibrationEnabled}
                  trackColor={{ false: '#374151', true: '#2563eb' }}
                  thumbColor="#ffffff"
                />
              }
            />
          </View>
        </View>

        {/* Sincronización */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sincronización</Text>
          <View style={styles.settingsCard}>
            <SettingItem
              iconName="sync"
              title="Sincronización Automática"
              subtitle="Sincronizar datos automáticamente"
              rightComponent={
                <Switch
                  value={autoSync}
                  onValueChange={setAutoSync}
                  trackColor={{ false: '#374151', true: '#2563eb' }}
                  thumbColor="#ffffff"
                />
              }
            />
          </View>
        </View>

        {/* Información */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información</Text>
          <View style={styles.settingsCard}>
            <SettingItem
              iconName="information-circle"
              title="Versión"
              subtitle="1.0.0"
              iconColor="#2563eb"
            />
            <View style={styles.divider} />
            <SettingItem
              iconName="battery-full"
              title="Batería"
              subtitle="Optimizado para wearables"
              iconColor="#22c55e"
            />
            <View style={styles.divider} />
            <SettingItem
              iconName="cloud-upload"
              title="Almacenamiento"
              subtitle="Datos guardados en Firebase"
              iconColor="#8b5cf6"
            />
          </View>
        </View>

        {/* Botón de cerrar sesión */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.navigation}>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Ionicons name="home" size={24} color="#94a3b8" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('Sensors')}
        >
          <Ionicons name="analytics" size={24} color="#94a3b8" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('Notifications')}
        >
          <Ionicons name="notifications" size={24} color="#94a3b8" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  profileCard: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 28,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#94a3b8',
  },
  goalCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  goalIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  goalInfo: {
    flex: 1,
  },
  goalLabel: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 2,
  },
  goalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  settingsCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 12,
    color: '#94a3b8',
  },
  divider: {
    height: 1,
    backgroundColor: '#374151',
    marginLeft: 52,
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginVertical: 20,
    marginBottom: 40,
  },
  logoutText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 20,
    paddingBottom: 40,
    backgroundColor: '#0f172a',
  },
  navButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1e293b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 24,
  },
});

export default SettingsScreen;
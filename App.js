import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { WearableNavigator } from './src/navigation/WearableNavigator';
import { WebNavigator } from './src/navigation/WebNavigator';

export default function App() {
  // Detectar plataforma y establecer modo por defecto
  const [mode, setMode] = useState(Platform.OS === 'web' ? 'web' : 'wearable');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      
      {/* Selector de modo (solo para desarrollo) */}
      <View style={styles.modeSelector}>
        <TouchableOpacity
          style={[styles.modeButton, mode === 'wearable' && styles.modeButtonActive]}
          onPress={() => setMode('wearable')}
        >
          <Text style={[styles.modeText, mode === 'wearable' && styles.modeTextActive]}>
            ⌚ Wearable
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modeButton, mode === 'web' && styles.modeButtonActive]}
          onPress={() => setMode('web')}
        >
          <Text style={[styles.modeText, mode === 'web' && styles.modeTextActive]}>
            🌐 Web
          </Text>
        </TouchableOpacity>
      </View>

      {/* Contenido según el modo */}
      {mode === 'wearable' ? <WearableNavigator /> : <WebNavigator />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  modeSelector: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    margin: 16,
    borderRadius: 12,
    padding: 4,
  },
  modeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modeButtonActive: {
    backgroundColor: '#2563eb',
  },
  modeText: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '600',
  },
  modeTextActive: {
    color: '#ffffff',
  },
});

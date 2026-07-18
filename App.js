import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Platform, TextInput, Button, Alert } from 'react-native';
import { WearableNavigator } from './src/navigation/WearableNavigator';
import { WebNavigator } from './src/navigation/WebNavigator';

// Almacenamiento en memoria para los pasos (simula una base de datos)
let stepsDatabase = {};

export default function App() {
  // Detectar plataforma y establecer modo por defecto
  const [mode, setMode] = useState(Platform.OS === 'web' ? 'web' : 'wearable');

  // API endpoint para recibir datos de pasos desde el wearable
  useEffect(() => {
    if (Platform.OS === 'web') {
      // Exponer una función global para que el wearable pueda enviar datos
      window.receiveStepsData = (data) => {
        console.log('Datos recibidos del wearable:', data);
        
        // Guardar en la "base de datos"
        const userId = data.userId || 'default';
        if (!stepsDatabase[userId]) {
          stepsDatabase[userId] = [];
        }
        
        // Agregar nuevo registro
        stepsDatabase[userId].push({
          ...data,
          timestamp: Date.now(),
          synced: true
        });
        
        // Mantener solo los últimos 100 registros
        if (stepsDatabase[userId].length > 100) {
          stepsDatabase[userId] = stepsDatabase[userId].slice(-100);
        }
        
        console.log('Datos guardados:', stepsDatabase);
        
        // Disparar evento personalizado para actualizar la UI
        window.dispatchEvent(new CustomEvent('stepsUpdated', { detail: data }));
        
        return { success: true, message: 'Datos recibidos correctamente' };
      };

      // Función para obtener todos los pasos
      window.getAllSteps = () => {
        return stepsDatabase;
      };

      console.log('API de sincronización lista en http://localhost:8081');
    }
  }, []);

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

import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';

const { width } = Dimensions.get('window');
const size = Math.min(width, 350);
const center = size / 2;
const radius = (size / 2) - 20;
const strokeWidth = 12;

export const WatchFace = ({ 
  title, 
  value, 
  unit, 
  iconName, 
  progress = 0,
  color = '#2563eb',
  size: customSize 
}) => {
  const actualSize = customSize || size;
  const actualCenter = actualSize / 2;
  const actualRadius = (actualSize / 2) - 20;
  
  // Calcular circunferencia
  const circumference = 2 * Math.PI * actualRadius;
  const strokeDashoffset = circumference - (progress * circumference);

  return (
    <View style={[styles.container, { width: actualSize, height: actualSize }]}>
      <Svg width={actualSize} height={actualSize} style={styles.svg}>
        {/* Círculo de fondo */}
        <Circle
          cx={actualCenter}
          cy={actualCenter}
          r={actualRadius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />
        
        {/* Círculo de progreso */}
        <Circle
          cx={actualCenter}
          cy={actualCenter}
          r={actualRadius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${actualCenter}, ${actualCenter}`}
        />
      </Svg>

      <View style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
          <Ionicons name={iconName} size={40} color={color} />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.value, { color }]}>
          {value}
          <Text style={styles.unit}> {unit}</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  svg: {
    position: 'absolute',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  value: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  unit: {
    fontSize: 16,
    fontWeight: 'normal',
  },
});

export default WatchFace;
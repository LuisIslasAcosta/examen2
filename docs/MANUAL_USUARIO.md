# Manual de Usuario
## Sistema de Monitoreo Deportivo

---

## 📋 Información General

**Aplicación**: Sistema de Monitoreo Deportivo  
**Versión**: 1.0.0  
**Fecha**: 08 de julio de 2026  
**Dirigido a**: Usuarios finales y administradores

---

## 🎯 ¿Qué es el Sistema de Monitoreo Deportivo?

El Sistema de Monitoreo Deportivo es una aplicación compuesta por dos partes:

1. **Aplicación Wearable**: Instalada en tu smartwatch o celular, registra tu actividad física (pasos, calorías, distancia) usando los sensores del dispositivo.

2. **Aplicación Web**: Panel de control desde donde puedes visualizar toda tu información deportiva, gestionar dispositivos y enviar notificaciones.

### Beneficios
- ✅ Registro automático de actividad física
- ✅ Visualización en tiempo real de tus métricas
- ✅ Notificaciones inteligentes
- ✅ Seguimiento de metas deportivas
- ✅ Historial completo de actividad
- ✅ Sincronización entre dispositivos

---

## 📱 Aplicación Wearable (Smartwatch)

### 1.1. Pantalla Principal - Dashboard

**Descripción**: Es la pantalla principal donde puedes ver tu progreso diario.

#### Elementos de la Pantalla

```
┌─────────────────────────────┐
│      10:30                  │  ← Hora actual
│      Lun, 7 Jul             │  ← Fecha actual
│                             │
│    ╭─────────────────╮      │
│   │   👟             │      │
│   │   Pasos          │      │
│   │   2,450          │      │  ← WatchFace circular
│   │   pasos          │      │     con barra de progreso
│    ╰─────────────────╯      │
│                             │
│   🔥 156 kcal    📏 1.8 km  │  ← Estadísticas adicionales
│                             │
│   [ ▶ Iniciar ]             │  ← Botón de control
│                             │
│   🏠  📊  🔔  ⚙️            │  ← Navegación inferior
└─────────────────────────────┘
```

#### Funcionalidades

**Iniciar/Detener Seguimiento**
1. Presiona el botón verde "▶ Iniciar" para comenzar a registrar pasos
2. La aplicación comenzará a contar tus pasos automáticamente
3. Presiona "⏸ Detener" para pausar el seguimiento

**Ver Progreso**
- El círculo principal muestra tus pasos actuales
- La barra de progreso azul indica qué tan cerca estás de tu meta (10,000 pasos)
- Debajo verás las calorías quemadas y distancia recorrida

**Navegar entre Pantallas**
- 🏠 **Dashboard**: Pantalla principal
- 📊 **Sensores**: Información de sensores
- 🔔 **Notificaciones**: Tus notificaciones
- ⚙️ **Configuración**: Ajustes de la app

---

### 1.2. Pantalla de Sensores

**Descripción**: Muestra información detallada de todos los sensores del dispositivo.

#### Elementos de la Pantalla

```
┌─────────────────────────────┐
│  Sensores                   │
├─────────────────────────────┤
│                             │
│    ╭─────────────────╮      │
│   │   ❤️             │      │
│   │   Ritmo Cardíaco │      │
│   │   72             │      │
│   │   bpm            │      │
│    ╰─────────────────╯      │
│                             │
│    ╭─────────────────╮      │
│   │   🔋             │      │
│   │   Batería        │      │
│   │   85             │      │
│   │   %              │      │
│    ╰─────────────────╯      │
│                             │
│  📍 Ubicación GPS           │
│  Lat: 19.1234               │
│  Lon: -99.5678              │
│                             │
│  📱 Acelerómetro            │
│  Estado: Activo              │
│  Detección de movimiento     │
│                             │
│  🔄 Giroscopio               │
│  Estado: Activo              │
│  Orientación del dispositivo │
└─────────────────────────────┘
```

#### Funcionalidades

**Ver Ritmo Cardíaco**
- El watchFace circular muestra tu frecuencia cardíaca actual
- El rango normal es 60-100 bpm
- Los colores indican: Verde (normal), Amarillo (elevado), Rojo (muy elevado)

**Ver Batería**
- Porcentaje de batería del dispositivo
- Color indicador: Verde (>50%), Amarillo (20-50%), Rojo (<20%)

**Obtener Ubicación**
1. Presiona el botón "📍 Ubicación GPS"
2. La app solicitará permiso de ubicación (solo la primera vez)
3. Se mostrarán tus coordenadas actuales

**Ver Sensores Adicionales**
- Acelerómetro: Detecta movimiento
- Giroscopio: Detecta orientación

---

### 1.3. Pantalla de Notificaciones

**Descripción**: Muestra todas las notificaciones recibidas en el dispositivo.

#### Elementos de la Pantalla

```
┌─────────────────────────────┐
│  Notificaciones             │
│  3 nuevas                   │
├─────────────────────────────┤
│                             │
│  🎉 Meta Alcanzada!         │
│  Has completado tu meta...  │
│  Hace 2 minutos    ●         │
│  ─────────────────────────  │
│                             │
│  ⏰ Recordatorio             │
│  Es hora de moverse!        │
│  Hace 1 hora                │
│  ─────────────────────────  │
│                             │
│  ⚠️ Batería baja            │
│  El dispositivo tiene 15%   │
│  Hace 3 horas               │
└─────────────────────────────┘
```

#### Tipos de Notificaciones

| Icono | Tipo | Descripción |
|-------|------|-------------|
| 🎉 | Meta | Has alcanzado una meta deportiva |
| ⏰ | Recordatorio | Recordatorio de actividad |
| ⚠️ | Alerta | Advertencia (batería baja, etc.) |
| 📢 | Informativa | Información general |

#### Funcionalidades

**Ver Notificaciones**
- Las notificaciones no leídas tienen un punto azul ●
- Se muestran en orden cronológico (más recientes primero)
- Incluyen título, mensaje y tiempo transcurrido

**Tipos de Notificación**
- **Meta**: Cuando alcanzas tu objetivo diario
- **Recordatorio**: Para motivarte a estar activo
- **Alerta**: Advertencias importantes
- **Informativa**: Información del sistema

---

### 1.4. Pantalla de Configuración

**Descripción**: Ajustes y preferencias de la aplicación.

#### Elementos de la Pantalla

```
┌─────────────────────────────┐
│  Configuración              │
├─────────────────────────────┤
│                             │
│  👤 Usuario Demo            │
│  user@demo.com              │
│                             │
│  Metas Diarias              │
│  👟 Pasos: 10,000           │
│  🔥 Calorías: 500 kcal      │
│  📏 Distancia: 5 km         │
│                             │
│  Notificaciones             │
│  🔔 Notificaciones    [✓]   │
│  🔊 Sonido            [✓]   │
│  📳 Vibración         [✓]   │
│                             │
│  Sincronización             │
│  🔄 Auto Sync         [✓]   │
│                             │
│  Información                │
│  📱 Versión: 1.0.0          │
│  🔋 Batería: Optimizado     │
│  💾 Almacenamiento: Firebase │
│                             │
│  [ Cerrar Sesión ]          │
└─────────────────────────────┘
```

#### Funcionalidades

**Ver Perfil**
- Nombre de usuario
- Correo electrónico

**Metas Diarias**
- Pasos: 10,000 pasos por día
- Calorías: 500 kcal por día
- Distancia: 5 km por día

**Configurar Notificaciones**
- **Notificaciones**: Recibir alertas y recordatorios
- **Sonido**: Activar/desactivar sonido
- **Vibración**: Activar/desactivar vibración

**Sincronización**
- **Auto Sync**: Sincronizar datos automáticamente con Firebase

**Información de la App**
- Versión de la aplicación
- Optimización de batería
- Almacenamiento en Firebase

**Cerrar Sesión**
- Presiona para cerrar tu cuenta

---

## 🌐 Aplicación Web (Panel de Control)

### 2.1. Dashboard Principal

**Descripción**: Vista general con estadísticas y actividad reciente.

#### Elementos de la Pantalla

```
┌──────────────────────────────────────────┐
│ Dashboard Principal                      │
│ Monitoreo en tiempo real                 │
├──────────────────────────────────────────┤
│                                          │
│  ┌──────────┐ ┌──────────┐              │
│  │ 👟       │ │ 🔥       │              │
│  │ 2,450    │ │ 156      │              │
│  │ pasos    │ │ kcal     │              │
│  └──────────┘ └──────────┘              │
│                                          │
│  ┌──────────┐ ┌──────────┐              │
│  │ 📏       │ │ 👥       │              │
│  │ 1.8      │ │ 1        │              │
│  │ km       │ │ activo   │              │
│  └──────────┘ └──────────┘              │
│                                          │
│  Actividad Reciente                      │
│  • Nuevos pasos registrados - 2 seg      │
│  • Meta actualizada - 1 min              │
│  • Calorías quemadas - 3 min             │
│                                          │
│  Rendimiento del Sistema                 │
│  API: ████████████░░ 95%                 │
│  Firebase: ██████████░░░ 88%             │
│  Sensores: ████████████ 100%             │
└──────────────────────────────────────────┘
```

#### Funcionalidades

**Ver Estadísticas**
- Pasos totales del día
- Calorías quemadas
- Distancia recorrida
- Usuarios activos

**Actividad Reciente**
- Lista de eventos recientes
- Tiempo transcurrido desde cada evento
- Iconos representativos

**Rendimiento del Sistema**
- Estado de la API
- Conexión a Firebase
- Estado de sensores

---

### 2.2. Dispositivos

**Descripción**: Gestión y administración de dispositivos wearables.

#### Elementos de la Pantalla

```
┌──────────────────────────────────────────┐
│ Dispositivos Wearables                   │
│ Registro y administración                │
├──────────────────────────────────────────┤
│                                          │
│  ┌──────┐ ┌──────┐ ┌──────┐             │
│  │  2   │ │  1   │ │  3   │             │
│  │En línea│ │Descon│ │Total │             │
│  └──────┘ └──────┘ └──────┘             │
│                                          │
│  Dispositivos Registrados                │
│                                          │
│  ┌────────────────────────────────┐      │
│  │ ⌚ Smartwatch Deportivo Pro    │      │
│  │    SW-2024-X1                  │      │
│  │    ● En línea    Batería: 85% │      │
│  │    Usuario: usuario_demo       │      │
│  │    Última sync: Hace 2 min     │      │
│  │    Sensores: [Podómetro]       │      │
│  │    [Ver] [Sync] [Desconectar]  │      │
│  └────────────────────────────────┘      │
│                                          │
│  [+ Agregar Nuevo Dispositivo]           │
└──────────────────────────────────────────┘
```

#### Funcionalidades

**Ver Estadísticas**
- Dispositivos en línea
- Dispositivos desconectados
- Total de dispositivos

**Gestionar Dispositivos**
- Ver detalles del dispositivo
- Sincronizar manualmente
- Desconectar dispositivo
- Agregar nuevo dispositivo

**Información del Dispositivo**
- Nombre y modelo
- Estado de conexión
- Nivel de batería
- Última sincronización
- Sensores disponibles

---

### 2.3. Visualización de Datos

**Descripción**: Gráficos y estadísticas deportivas detalladas.

#### Elementos de la Pantalla

```
┌──────────────────────────────────────────┐
│ Visualización de Datos                   │
│ Análisis y estadísticas deportivas       │
├──────────────────────────────────────────┤
│                                          │
│  [Día] [Semana] [Mes] [Año]             │
│                                          │
│  Promedios                               │
│  ┌──────────┐ ┌──────────┐              │
│  │ 8,234    │ │ 412      │              │
│  │ pasos    │ │ kcal     │              │
│  └──────────┘ └──────────┘              │
│                                          │
│  Pasos por Día                           │
│  ████ █████ █████ ██████ █████ ███ ████ │
│  Lun  Mar  Mié  Jue  Vie  Sáb  Dom       │
│                                          │
│  Calorías Quemadas                       │
│  ███ █████ ████ ██████ █████ ██ ████     │
│  Lun  Mar  Mié  Jue  Vie  Sáb  Dom       │
│                                          │
│  Estadísticas Adicionales                │
│  🎯 Días Activos: 7/7                    │
│  ⭐ Mejor Día: Jueves                    │
│  📈 Tendencia: +12% ↑                    │
│  🏆 Récord: 12,450 pasos                │
└──────────────────────────────────────────┘
```

#### Funcionalidades

**Seleccionar Período**
- Día: Datos del día actual
- Semana: Últimos 7 días
- Mes: Último mes
- Año: Último año

**Ver Promedios**
- Pasos promedio por día
- Calorías promedio por día
- Distancia promedio por día

**Gráficos**
- Pasos por día (barras azules)
- Calorías quemadas (barras rojas)
- Distancia recorrida (barras verdes)

**Estadísticas Adicionales**
- Días activos
- Mejor día de la semana
- Tendencia de actividad
- Récord personal

---

### 2.4. Envío de Notificaciones

**Descripción**: Crear y enviar notificaciones a usuarios.

#### Elementos de la Pantalla

```
┌──────────────────────────────────────────┐
│ Envío de Notificaciones                  │
│ Gestiona y envía notificaciones          │
├──────────────────────────────────────────┤
│                                          │
│  Nueva Notificación                      │
│                                          │
│  Tipo de Notificación:                   │
│  [📢 Informativa] [⏰ Recordatorio]       │
│  [🎉 Meta] [⚠️ Alerta]                   │
│                                          │
│  Título:                                 │
│  [Meta alcanzada                    ]    │
│                                          │
│  Mensaje:                                │
│  [Has completado tu meta de pasos   ]    │
│                                          │
│  [📤 Enviar Notificación]                │
│                                          │
│  Notificaciones Recientes                │
│  ┌────────────────────────────────┐      │
│  │ 🎉 Meta de pasos alcanzada     │      │
│  │    Hace 1 hora        [Enviada]│      │
│  └────────────────────────────────┘      │
│                                          │
│  Estadísticas:                           │
│  Enviadas Hoy: 156                       │
│  Tasa de Entrega: 98%                    │
│  Leídas: 45                              │
└──────────────────────────────────────────┘
```

#### Tipos de Notificación

| Tipo | Icono | Uso |
|------|-------|-----|
| Informativa | 📢 | Información general |
| Recordatorio | ⏰ | Motivar actividad |
| Meta | 🎉 | Celebrar logros |
| Alerta | ⚠️ | Advertencias importantes |

#### Funcionalidades

**Crear Notificación**
1. Selecciona el tipo de notificación
2. Escribe un título (máx. 100 caracteres)
3. Escribe el mensaje (máx. 500 caracteres)
4. Presiona "Enviar Notificación"

**Ver Historial**
- Notificaciones enviadas recientemente
- Estado (Enviada/Pendiente)
- Tiempo transcurrido

**Estadísticas**
- Notificaciones enviadas hoy
- Tasa de entrega
- Notificaciones leídas

---

### 2.5. Historial de Eventos

**Descripción**: Registro completo de todas las actividades del sistema.

#### Elementos de la Pantalla

```
┌──────────────────────────────────────────┐
│ Historial de Eventos                     │
│ Registro completo de actividades         │
├──────────────────────────────────────────┤
│                                          │
│  [📋 Todos] [ℹ️ Info] [✅ Éxito]         │
│  [⚠️ Alertas] [❌ Errores]               │
│                                          │
│  Total: 8  Éxitos: 3  Alertas: 2        │
│                                          │
│  Eventos (8)                             │
│  ┌────────────────────────────────┐      │
│  │ 👟 Hito de pasos alcanzado     │      │
│  │    usuario_demo - 5,000 pasos  │      │
│  │    Hace 30 minutos      ●       │      │
│  └────────────────────────────────┘      │
│                                          │
│  ┌────────────────────────────────┐      │
│  │ 🎯 Meta diaria completada       │      │
│  │    10,000 pasos - usuario_demo │      │
│  │    Hace 1 hora                 │      │
│  └────────────────────────────────┘      │
│                                          │
│  [Cargar más eventos]                    │
└──────────────────────────────────────────┘
```

#### Tipos de Eventos

| Icono | Evento | Descripción |
|-------|--------|-------------|
| 👟 | Hito de pasos | Se alcanzó un número significativo de pasos |
| 🎯 | Meta completada | Se cumplió una meta diaria |
| 🔋 | Batería baja | El dispositivo tiene poca batería |
| 🔗 | Conectado | Dispositivo se conectó |
| 🔌 | Desconectado | Dispositivo se desconectó |
| 📢 | Notificación | Se envió una notificación |
| 🔥 | Calorías | Hito de calorías quemadas |
| 🔄 | Sincronización | Se completó una sincronización |

#### Niveles de Severidad

| Color | Nivel | Descripción |
|-------|-------|-------------|
| Azul | Info | Informativo |
| Verde | Éxito | Operación exitosa |
| Amarillo | Alerta | Advertencia |
| Rojo | Error | Error crítico |

#### Funcionalidades

**Filtrar Eventos**
- Todos: Muestra todos los eventos
- Info: Solo eventos informativos
- Éxito: Solo eventos exitosos
- Alertas: Solo advertencias
- Errores: Solo errores

**Ver Detalles**
- Título del evento
- Descripción completa
- Usuario relacionado
- Dispositivo relacionado
- Tiempo transcurrido

**Cargar Más**
- Presiona para ver eventos más antiguos

---

### 2.6. Consulta en Tiempo Real

**Descripción**: Monitoreo live de datos de sensores.

#### Elementos de la Pantalla

```
┌──────────────────────────────────────────┐
│ Consulta en Tiempo Real                  │
│ Monitoreo live de datos                  │
├──────────────────────────────────────────┤
│                                          │
│  [▶ Iniciar Monitoreo] [🗑️ Limpiar]     │
│                                          │
│  Métrica: [👟 Pasos] [🔥 Calorías]       │
│           [📏 Distancia] [❤️ Ritmo]      │
│                                          │
│  Estadísticas Acumuladas                 │
│  ┌──────────┐ ┌──────────┐              │
│  │ 12,450   │ │ 623.5    │              │
│  │ pasos    │ │ kcal     │              │
│  └──────────┘ └──────────┘              │
│  ┌──────────┐ ┌──────────┐              │
│  │ 9.5      │ │ 3        │              │
│  │ km       │ │ disp.    │              │
│  └──────────┘ └──────────┘              │
│                                          │
│  Datos en Vivo - Pasos    [EN VIVO ●]   │
│  ███ ████ ███ █████ ████ ██ ███         │
│  10:30 10:32 10:34 10:36 10:38...       │
│                                          │
│  Registros Recientes (15)                │
│  ┌────────────────────────────────┐      │
│  │ 👟 Pasos: 75    10:30:15       │      │
│  │    Usuario: usuario_demo       │      │
│  │    Dispositivo: SW-2024-X1     │      │
│  └────────────────────────────────┘      │
└──────────────────────────────────────────┘
```

#### Funcionalidades

**Iniciar Monitoreo**
1. Presiona "▶ Iniciar Monitoreo"
2. Los datos comenzarán a actualizarse cada 2 segundos
3. El indicador mostrará "EN VIVO ●" en verde

**Seleccionar Métrica**
- **Pasos**: Número de pasos
- **Calorías**: Calorías quemadas
- **Distancia**: Kilómetros recorridos
- **Ritmo Cardíaco**: Frecuencia cardíaca

**Ver Estadísticas**
- Total de pasos acumulados
- Total de calorías
- Distancia total
- Dispositivos activos

**Gráfico en Tiempo Real**
- Barras que se actualizan cada 2 segundos
- Muestra los últimos 10 registros
- Altura de barra proporcional al valor

**Ver Registros**
- Lista de registros recientes
- Valor de la métrica seleccionada
- Usuario y dispositivo
- Hora del registro

**Limpiar Datos**
- Presiona "🗑️ Limpiar" para reiniciar

---

## 🔔 Sistema de Notificaciones

### 3.1. Tipos de Notificaciones

#### Notificación de Meta Alcanzada 🎉
**Cuándo**: Cuando completas tu meta diaria de pasos, calorías o distancia.

**Ejemplo**:
```
Título: ¡Meta Alcanzada! 🎉
Mensaje: Has completado tu meta de pasos: 10,000 / 10,000
```

#### Notificación de Recordatorio ⏰
**Cuándo**: Cuando llevas mucho tiempo inactivo.

**Ejemplo**:
```
Título: Recordatorio de Actividad
Mensaje: Es hora de moverse! Llevas 2 horas inactivo
```

#### Notificación de Alerta ⚠️
**Cuándo**: Cuando hay problemas (batería baja, error de sincronización).

**Ejemplo**:
```
Título: Batería Baja
Mensaje: Tu dispositivo tiene 15% de batería
```

#### Notificación Informativa 📢
**Cuándo**: Información general del sistema.

**Ejemplo**:
```
Título: Sincronización Completada
Mensaje: Tus datos se han sincronizado correctamente
```

---

## ⚙️ Configuración y Personalización

### 4.1. Metas Diarias

Puedes configurar tus metas desde la pantalla de Configuración:

- **Pasos**: Meta predeterminada 10,000 pasos
- **Calorías**: Meta predeterminada 500 kcal
- **Distancia**: Meta predeterminada 5 km

### 4.2. Preferencias de Notificaciones

- **Notificaciones**: Activar/desactivar todas las notificaciones
- **Sonido**: Activar/desactivar sonido
- **Vibración**: Activar/desactivar vibración

### 4.3. Sincronización

- **Auto Sync**: Sincronización automática cada 2 segundos
- **Manual**: Sincronizar desde la app web

---

## 🆘 Solución de Problemas

### 5.1. La app no cuenta pasos

**Solución**:
1. Verifica que los permisos de actividad física estén otorgados
2. Asegúrate de que el sensor de pasos esté disponible en tu dispositivo
3. Reinicia la aplicación

### 5.2. No recibo notificaciones

**Solución**:
1. Verifica que las notificaciones estén activadas en Configuración
2. Asegúrate de que el dispositivo tenga conexión a internet
3. Verifica que los permisos de notificaciones estén otorgados

### 5.3. No se sincronizan los datos

**Solución**:
1. Verifica tu conexión a internet
2. Asegúrate de que Firebase esté configurado correctamente
3. Intenta sincronizar manualmente desde la app web

### 5.4. La batería se agota rápido

**Solución**:
1. Reduce el intervalo de actualización
2. Desactiva la sincronización automática
3. Cierra la aplicación cuando no la uses

---

## 📞 Soporte Técnico

Si tienes problemas o preguntas:

- **Email**: soporte@monitoreodeportivo.com
- **Documentación**: Ver README.md del proyecto
- **Issues**: Reportar en el repositorio del proyecto

---

## 📝 Glosario

**Pasos**: Número de pasos caminados  
**Calorías**: Energía quemada durante la actividad  
**Distancia**: Espacio recorrido en kilómetros  
**Ritmo Cardíaco**: Latidos por minuto (bpm)  
**Sincronización**: Transferencia de datos entre dispositivos  
**Wearable**: Dispositivo electrónico que se lleva puesto  
**Firebase**: Plataforma de backend como servicio  
**WatchFace**: Interfaz de visualización de un reloj inteligente

---

## 🎓 Créditos

**Desarrollado para**: Universidad Tecnológica del Valle de Toluca  
**Materia**: Desarrollo para Dispositivos Inteligentes  
**Docente**: ITIC Roberto Vinicio Camacho Mendoza  
**Fecha**: 08 de julio de 2026

---

**Versión del Manual**: 1.0.0  
**Última Actualización**: 08 de julio de 2026
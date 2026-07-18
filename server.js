const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Almacenamiento en memoria
let stepsDatabase = {};

// API endpoint para recibir pasos desde el wearable
app.post('/api/steps', (req, res) => {
  try {
    const { userId, totalSteps, newSteps, timestamp, date } = req.body;
    
    console.log('Datos recibidos del wearable:', req.body);
    
    // Guardar en la "base de datos"
    if (!stepsDatabase[userId]) {
      stepsDatabase[userId] = [];
    }
    
    // Agregar nuevo registro
    stepsDatabase[userId].push({
      totalSteps,
      newSteps,
      timestamp: timestamp || Date.now(),
      date: date || new Date().toISOString().split('T')[0],
      synced: true
    });
    
    // Mantener solo los últimos 100 registros
    if (stepsDatabase[userId].length > 100) {
      stepsDatabase[userId] = stepsDatabase[userId].slice(-100);
    }
    
    console.log('Base de datos actualizada:', stepsDatabase);
    
    res.json({ 
      success: true, 
      message: 'Datos recibidos correctamente',
      totalSteps 
    });
  } catch (error) {
    console.error('Error al procesar datos:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// API endpoint para obtener todos los pasos
app.get('/api/steps', (req, res) => {
  try {
    const userId = req.query.userId || 'default';
    const data = stepsDatabase[userId] || [];
    
    res.json({
      success: true,
      data: data,
      totalSteps: data.length > 0 ? data[data.length - 1].totalSteps : 0
    });
  } catch (error) {
    console.error('Error al obtener datos:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor de sincronización corriendo en http://localhost:${PORT}`);
  console.log(`API disponible en http://localhost:${PORT}/api/steps`);
});
import { db } from '../db/database.js';

// Marcar asistencia (confirmar pase de lista)
export const marcarAsistencia = async (req, res) => {
  try {
    const { id } = req.params;
    
    await db.execute({
      sql: 'UPDATE participantes SET asistio = 1 WHERE id = ?',
      args: [id]
    });
    
    const result = await db.execute({
      sql: 'SELECT id, nombre, institucion, grupo, asistio FROM participantes WHERE id = ?',
      args: [id]
    });
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Participante no encontrado' });
    }
    
    res.json({ 
      message: 'Asistencia confirmada',
      participante: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Quitar asistencia
export const quitarAsistencia = async (req, res) => {
  try {
    const { id } = req.params;
    
    await db.execute({
      sql: 'UPDATE participantes SET asistio = 0 WHERE id = ?',
      args: [id]
    });
    
    const result = await db.execute({
      sql: 'SELECT id, nombre, institucion, grupo, asistio FROM participantes WHERE id = ?',
      args: [id]
    });
    
    res.json({ 
      message: 'Asistencia removida',
      participante: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mover de lista de espera a participantes
export const moverAParticipantes = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Obtener datos de lista de espera
    const persona = await db.execute({
      sql: 'SELECT nombre, institucion, grupo, asistio FROM lista_espera WHERE id = ?',
      args: [id]
    });
    
    if (persona.rows.length === 0) {
      return res.status(404).json({ error: 'Persona no encontrada en lista de espera' });
    }
    
    const { nombre, institucion, grupo, asistio } = persona.rows[0];
    
    // Insertar en participantes
    const result = await db.execute({
      sql: 'INSERT INTO participantes (nombre, institucion, grupo, asistio) VALUES (?, ?, ?, ?)',
      args: [nombre, institucion, grupo, asistio]
    });
    
    // Eliminar de lista de espera
    await db.execute({
      sql: 'DELETE FROM lista_espera WHERE id = ?',
      args: [id]
    });
    
    res.json({ 
      message: 'Movido a participantes exitosamente',
      nuevoParticipante: {
        id: Number(result.lastInsertRowid),
        nombre,
        institucion,
        grupo,
        asistio
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mover de participantes a lista de espera
export const moverAListaEspera = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Obtener datos del participante
    const persona = await db.execute({
      sql: 'SELECT nombre, institucion, grupo, asistio FROM participantes WHERE id = ?',
      args: [id]
    });
    
    if (persona.rows.length === 0) {
      return res.status(404).json({ error: 'Participante no encontrado' });
    }
    
    const { nombre, institucion, grupo, asistio } = persona.rows[0];
    
    // Insertar en lista de espera
    const result = await db.execute({
      sql: 'INSERT INTO lista_espera (nombre, institucion, grupo, asistio) VALUES (?, ?, ?, ?)',
      args: [nombre, institucion, grupo, asistio]
    });
    
    // Eliminar de participantes
    await db.execute({
      sql: 'DELETE FROM participantes WHERE id = ?',
      args: [id]
    });
    
    res.json({ 
      message: 'Movido a lista de espera exitosamente',
      nuevaListaEspera: {
        id: Number(result.lastInsertRowid),
        nombre,
        institucion,
        grupo,
        asistio
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener estadísticas de asistencia
export const getEstadisticas = async (req, res) => {
  try {
    const totalParticipantes = await db.execute('SELECT COUNT(*) as total FROM participantes');
    const asistieron = await db.execute('SELECT COUNT(*) as total FROM participantes WHERE asistio = 1');
    const noAsistieron = await db.execute('SELECT COUNT(*) as total FROM participantes WHERE asistio = 0');
    const enEspera = await db.execute('SELECT COUNT(*) as total FROM lista_espera');
    
    res.json({
      participantes: {
        total: totalParticipantes.rows[0].total,
        asistieron: asistieron.rows[0].total,
        noAsistieron: noAsistieron.rows[0].total
      },
      listaEspera: enEspera.rows[0].total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

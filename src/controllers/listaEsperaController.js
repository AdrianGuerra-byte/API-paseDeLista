import { db } from '../db/database.js';

// GET todos en lista de espera
export const getListaEspera = async (req, res) => {
  try {
    const result = await db.execute('SELECT id, nombre, institucion, grupo, asistio FROM lista_espera');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET por ID en lista de espera
export const getListaEsperaById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.execute({
      sql: 'SELECT id, nombre, institucion, grupo, asistio FROM lista_espera WHERE id = ?',
      args: [id]
    });
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST crear en lista de espera
export const createListaEspera = async (req, res) => {
  try {
    const { nombre, institucion, grupo } = req.body;
    
    if (!nombre || !institucion || !grupo) {
      return res.status(400).json({ error: 'Nombre, institución y grupo son requeridos' });
    }
    
    const result = await db.execute({
      sql: 'INSERT INTO lista_espera (nombre, institucion, grupo, asistio) VALUES (?, ?, ?, 0)',
      args: [nombre, institucion, grupo]
    });
    
    res.status(201).json({ 
      id: Number(result.lastInsertRowid),
      nombre,
      institucion,
      grupo,
      asistio: 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT actualizar completo en lista de espera
export const updateListaEspera = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, institucion, grupo, asistio } = req.body;
    
    if (!nombre || !institucion || !grupo || asistio === undefined) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }
    
    await db.execute({
      sql: 'UPDATE lista_espera SET nombre = ?, institucion = ?, grupo = ?, asistio = ? WHERE id = ?',
      args: [nombre, institucion, grupo, asistio ? 1 : 0, id]
    });
    
    res.json({ id, nombre, institucion, grupo, asistio: asistio ? 1 : 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PATCH actualizar parcial en lista de espera
export const patchListaEspera = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const fields = [];
    const values = [];
    
    if (updates.nombre !== undefined) {
      fields.push('nombre = ?');
      values.push(updates.nombre);
    }
    if (updates.institucion !== undefined) {
      fields.push('institucion = ?');
      values.push(updates.institucion);
    }
    if (updates.grupo !== undefined) {
      fields.push('grupo = ?');
      values.push(updates.grupo);
    }
    if (updates.asistio !== undefined) {
      fields.push('asistio = ?');
      values.push(updates.asistio ? 1 : 0);
    }
    
    if (fields.length === 0) {
      return res.status(400).json({ error: 'No hay campos para actualizar' });
    }
    
    values.push(id);
    
    await db.execute({
      sql: `UPDATE lista_espera SET ${fields.join(', ')} WHERE id = ?`,
      args: values
    });
    
    const result = await db.execute({
      sql: 'SELECT id, nombre, institucion, grupo, asistio FROM lista_espera WHERE id = ?',
      args: [id]
    });
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE eliminar de lista de espera
export const deleteListaEspera = async (req, res) => {
  try {
    const { id } = req.params;
    
    await db.execute({
      sql: 'DELETE FROM lista_espera WHERE id = ?',
      args: [id]
    });
    
    res.json({ message: 'Registro eliminado de lista de espera', id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

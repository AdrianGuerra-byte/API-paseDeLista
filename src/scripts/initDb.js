import { db, initDatabase } from '../db/database.js';
import dotenv from 'dotenv';

dotenv.config();

// Datos del CSV - participantes confirmados
const participantesCSV = [
  { nombre: "Pablo Tellez Vite", institucion: "CUH", grupo: "23A" },
  { nombre: "Josue jahir santiago sanchez", institucion: "CUH", grupo: "22A" },
  { nombre: "Abraham Emiliano López Cruz", institucion: "CUH", grupo: "24" },
  { nombre: "Guillermo Jesus Hernandez Sanchez", institucion: "CUH", grupo: "204" },
  { nombre: "Jesús Eduardo Islas Ordaz", institucion: "CUH", grupo: "22" },
  { nombre: "Aldair Ramirez", institucion: "CUH", grupo: "23 B" },
  { nombre: "Carlos Martínez Herrera", institucion: "CUH", grupo: "25 A" },
  { nombre: "Jose Ángel Zamora Rivas", institucion: "CUH", grupo: "22" },
  { nombre: "Luis Roberto Flores Islas", institucion: "CUH", grupo: "Docente" },
  { nombre: "Olaf Zamora Velázquez", institucion: "CUH", grupo: "22B" },
  { nombre: "Kevin Alonso Ávalos Sánchez", institucion: "CUH", grupo: "22 b" },
  { nombre: "Oscar Mera Gonzalez", institucion: "CUH", grupo: "Grupo 22" },
  { nombre: "Gustavo Peña Ortiz", institucion: "CUH", grupo: "25" },
  { nombre: "Alejandra Verenice Moreno Jurado", institucion: "CUH", grupo: "25" },
  { nombre: "José Manuel Rangel Cortés", institucion: "CUH", grupo: "22" },
  { nombre: "Manuel Sánchez López", institucion: "CUH", grupo: "25B" },
  { nombre: "Christian Isael Benitez Hernández", institucion: "CUH", grupo: "23-b" },
  { nombre: "René Said Barragán Candelaria", institucion: "CUH", grupo: "25A" },
  { nombre: "Yahir Acosta Gonzalez", institucion: "CUH", grupo: "22- C" },
  { nombre: "Bryan Ignacio Rivera Ruiz", institucion: "CUH", grupo: "24" },
  { nombre: "José Ángel Blas Canales", institucion: "CUH", grupo: "Profesor" },
  { nombre: "Jesús Hernández Briones", institucion: "CUH", grupo: "25" },
  { nombre: "José Maria Rodríguez García", institucion: "CUH", grupo: "23" },
  { nombre: "Roberto Elied Olvera Rosas", institucion: "CUH", grupo: "23" },
  { nombre: "Emmanuel Hernández Ruiz", institucion: "CUH", grupo: "23" },
  { nombre: "Aldo Franco Chavez", institucion: "CUH", grupo: "24A" },
  { nombre: "Erick Ivan Cano Hernández", institucion: "CUH", grupo: "24-A" },
  { nombre: "Tadeo Alejandro Rubiales Rojas", institucion: "CUH", grupo: "24" },
  { nombre: "Andrei Hugo Salomón Romero Hernández", institucion: "CUH", grupo: "24a" },
  { nombre: "Leonardo Alexander Rodríguez Valencia", institucion: "CUH", grupo: "25A" },
  { nombre: "Luis Aaron Victorico Lorenzo", institucion: "CUH", grupo: "25-A" },
  { nombre: "Luis Alberto Cruz Juarez", institucion: "CUH", grupo: "24" },
];

// Personas en lista de espera
const listaEsperaData = [
  { nombre: "Bryan Yair Olvera Villegas", institucion: "CUH", grupo: "22" },
  { nombre: "Kristian Ivan Pacheco Vazquez", institucion: "CUH", grupo: "24" },
  { nombre: "Tristan Alejandro Martinez Cervantes", institucion: "CUH", grupo: "25" },
  { nombre: "Jaime Alfonso Ubilla León", institucion: "CUH", grupo: "24-A" },
];

async function initData() {
  try {
    console.log('🔄 Inicializando base de datos...');
    
    // Crear tablas
    await initDatabase();
    
    // Limpiar datos existentes
    await db.execute('DELETE FROM participantes');
    await db.execute('DELETE FROM lista_espera');
    console.log('🗑️  Datos previos eliminados');
    
    // Insertar participantes
    console.log('📝 Insertando participantes...');
    for (const p of participantesCSV) {
      await db.execute({
        sql: 'INSERT INTO participantes (nombre, institucion, grupo, asistio) VALUES (?, ?, ?, 0)',
        args: [p.nombre, p.institucion, p.grupo]
      });
    }
    console.log(`✅ ${participantesCSV.length} participantes insertados`);
    
    // Insertar lista de espera
    console.log('📝 Insertando lista de espera...');
    for (const p of listaEsperaData) {
      await db.execute({
        sql: 'INSERT INTO lista_espera (nombre, institucion, grupo, asistio) VALUES (?, ?, ?, 0)',
        args: [p.nombre, p.institucion, p.grupo]
      });
    }
    console.log(`✅ ${listaEsperaData.length} personas en lista de espera insertadas`);
    
    console.log('\n🎉 Base de datos inicializada exitosamente!');
    console.log(`📊 Total participantes: ${participantesCSV.length}`);
    console.log(`⏳ Total lista de espera: ${listaEsperaData.length}`);
    
  } catch (error) {
    console.error('❌ Error al inicializar datos:', error);
    process.exit(1);
  }
}

initData();

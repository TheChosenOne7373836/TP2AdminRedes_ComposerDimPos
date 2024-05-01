import { IConductor } from "@src/models/Conductor";
import MockOrm from "./MockOrm";

// **** Functions **** //

/**
 * Get one conductor.
 */

async function getOne(dni: number): Promise<IConductor | null> {
  const db = await MockOrm.openDb();
  for (const conductor of db.conductores) {
    if (conductor.dni === dni) {
      return conductor;
    }
  }
  return null;
}

/**
 * See if a conductor with the given id exists.
 */

async function persists(dni: number): Promise<boolean> {
  const db = await MockOrm.openDb();
  for (const conductor of db.conductores) {
    if (conductor.dni === dni) {
      return true;
    }
  }
  return false;
}

/**
 * Get all conductores.
 */

async function getAll(): Promise<IConductor[]> {
  const db = await MockOrm.openDb();
  return db.conductores;
}

/**
 * Add a conductor.
 */

async function add(conductor: IConductor): Promise<void> {
  const db = await MockOrm.openDb();
  db.conductores.push(conductor);
  await MockOrm.saveDb(db);
}

/**
 * Update a conductor.
 */

async function update(conductor: IConductor): Promise<void> {
  const db = await MockOrm.openDb();
  for (let i = 0; i < db.conductores.length; i++) {
    if (db.conductores[i].dni === conductor.dni) {
      db.conductores[i] = conductor;
      await MockOrm.saveDb(db);
      return;
    }
  }
  throw new Error('Conductor not found');
}

/**
 * Delete a conductor.
 */

async function delete_(dni: number): Promise<void> {
  const db = await MockOrm.openDb();
  for (let i = 0; i < db.conductores.length; i++) {
    if (db.conductores[i].dni === dni) {
      db.conductores.splice(i, 1);
      await MockOrm.saveDb(db);
      return;
    }
  }
  throw new Error('Conductor not found');
}

// **** Export default **** //

export default {
  getOne,
  persists,
  getAll,
  add,
  update,
  delete: delete_,
} as const;


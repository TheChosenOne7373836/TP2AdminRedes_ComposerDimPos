import {IPrograma} from '@src/models/Programa';
import MockOrm from './MockOrm';

async function getAll(): Promise<IPrograma[]> {
    const db = await MockOrm.openDb();
    return db.programas;
}

async function getOne(id : number): Promise<IPrograma | null> {
    const db = await MockOrm.openDb();
    for (const programa of db.programas) {
      if (programa.id === id) {
        console.log(programa);
        return programa;
      }
    }
    return null;
  }

  async function persists(id: number): Promise<boolean> {
    const db = await MockOrm.openDb();
    for (const programa of db.programas) {
      if (programa.id === id) {
        return true;
      }
    }
    return false;
  }

  async function add(programa: IPrograma): Promise<void> {
    const db = await MockOrm.openDb();
    db.programas.push(programa);
    await MockOrm.saveDb(db);
  }

  async function update(programa: IPrograma): Promise<void> {
    const db = await MockOrm.openDb();
    for (let i = 0; i < db.programas.length; i++) {
      if (db.programas[i].id === programa.id) {
        db.programas[i] = programa;
        await MockOrm.saveDb(db);
        return;
      }
    }
    throw new Error('Programa not found');
  }


async function delete_(id2: number): Promise<void> {
    const db = await MockOrm.openDb();
    for (let i = 0; i < db.programas.length; i++) {
      if (db.programas[i].id === id2) {
        db.programas.splice(i, 1);
        await MockOrm.saveDb(db);
        return;
      }
    }
    throw new Error('Programa not found');
  }

  export default {
    getOne,
    persists,
    getAll,
    add,
    update,
    delete: delete_,
  } as const;
  
  
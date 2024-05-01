import ProgramaRepo from '@src/repos/ProgramaRepo';
import { IPrograma } from '@src/models/Programa';
import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';

export const USER_NOT_FOUND_ERR = 'User not found';

function getAll(): Promise<IPrograma[]> {
    return ProgramaRepo.getAll();
}

function getOne (id: number): Promise<IPrograma | null> {
    return ProgramaRepo.getOne(id);
}

function addOne(programa: IPrograma): Promise<void> {
    return ProgramaRepo.add(programa);
}

async function updateOne(programa: IPrograma): Promise<void> {
    const persists = await ProgramaRepo.persists(programa.id);
    if (!persists) {
        throw new RouteError(
            HttpStatusCodes.NOT_FOUND,
            USER_NOT_FOUND_ERR,
        );
    }
    // Return user
    return ProgramaRepo.update(programa);
}

async function _delete(id: number): Promise<void> {
    const persists = await ProgramaRepo.persists(id);
    if (!persists) {
        throw new RouteError(
            HttpStatusCodes.NOT_FOUND,
            USER_NOT_FOUND_ERR,
        );
    }
    // Delete user
    return ProgramaRepo.delete(id);
}

export default {
    getAll,
    getOne,
    addOne,
    updateOne,
    delete: _delete,
  } as const;
  
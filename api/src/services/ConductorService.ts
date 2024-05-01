import ConductorRepo from '@src/repos/ConductorRepo';
import { IConductor } from '@src/models/Conductor';
import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';

// **** Variables **** //

export const USER_NOT_FOUND_ERR = 'User not found';

// **** Functions **** //

/**
 * Get all users.
 */
function getAll(): Promise<IConductor[]> {
    return ConductorRepo.getAll();
}

/**
 * Get one user.
 */
function getOne(dni: number): Promise<IConductor | null> {
    return ConductorRepo.getOne(dni);
}

/**
 * Add one user.
 */
function addOne(conductor: IConductor): Promise<void> {
    return ConductorRepo.add(conductor);
}

/**
 * Update one user.
 */
async function updateOne(conductor: IConductor): Promise<void> {
    const persists = await ConductorRepo.persists(conductor.dni);
    if (!persists) {
        throw new RouteError(
            HttpStatusCodes.NOT_FOUND,
            USER_NOT_FOUND_ERR,
        );
    }
    // Return user
    return ConductorRepo.update(conductor);
}

/**
 * Delete a user by their id.
 */
async function _delete(dni: number): Promise<void> {
    const persists = await ConductorRepo.persists(dni);
    if (!persists) {
        throw new RouteError(
            HttpStatusCodes.NOT_FOUND,
            USER_NOT_FOUND_ERR,
        );
    }
    // Delete user
    return ConductorRepo.delete(dni);
}

export default {
    getAll,
    getOne,
    addOne,
    updateOne,
    delete: _delete,
  } as const;
  
  
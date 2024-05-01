import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { IPrograma } from '@src/models/Programa';
import ProgramaService from '@src/services/ProgramaService';
import { IReq, IRes } from './types/express/misc';

async function getAll(_: IReq, res: IRes) {
    const programas = await ProgramaService.getAll();
    return res.status(HttpStatusCodes.OK).json({programas});
}

async function getOne(req: IReq, res: IRes) {
    const  id  = +req.params.id;
    const programa = await ProgramaService.getOne(id);
    if (!programa) {
      return res.status(HttpStatusCodes.NOT_FOUND).end();
   }
   return res.status(HttpStatusCodes.OK).json(programa);
}

/**
 * Add one conductor.
 */
async function add(req: IReq<{programa: IPrograma}>, res: IRes) {
    const { programa } = req.body;
    await ProgramaService.addOne(programa);
    return res.status(HttpStatusCodes.CREATED).end();
  }
  
  /**
   * Update one conductor.
   */
  async function update(req: IReq<{programa: IPrograma}>, res: IRes) {
    const { programa } = req.body;
    await ProgramaService.updateOne(programa);
    return res.status(HttpStatusCodes.OK).end();
  }
  
  /**
   * Delete one conductor.
   */
  async function delete_(req: IReq, res: IRes) {
    const id = +req.params.id;
    await ProgramaService.delete(id);
    return res.status(HttpStatusCodes.OK).end();
  }
  
  
  // **** Export default **** //
  export default {
      getAll,
      getOne,
      add,
      update,
      delete: delete_,
  } as const;
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { IConductor } from '@src/models/Conductor';
import ConductorService from '@src/services/ConductorService';
import { IReq, IRes } from './types/express/misc';
//impoert cors

// **** Functions **** //

/**
 * Get all conductores.
 */
async function getAll(_: IReq, res: IRes) {
  const conductores = await ConductorService.getAll();


 /*
  app.get('/products/:id', function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
  })
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  
  res.app.use(cors({ origin: "http//:127.0.0.1:3000/api", credentials: true }));
  */
  return res.status(HttpStatusCodes.OK).json({ conductores });
}

// get one conductor
 async function getOne(req: IReq, res: IRes) {
   const dni = +req.params.dni;
   const conductor = await ConductorService.getOne(dni);
   if (!conductor) {
     return res.status(HttpStatusCodes.NOT_FOUND).end();
  }
  return res.status(HttpStatusCodes.OK).json( conductor );
}


/**
 * Add one conductor.
 */
async function add(req: IReq<{conductor: IConductor}>, res: IRes) {
  const { conductor } = req.body;
  await ConductorService.addOne(conductor);
  return res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update one conductor.
 */
async function update(req: IReq<{conductor: IConductor}>, res: IRes) {
  const { conductor } = req.body;
  await ConductorService.updateOne(conductor);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one conductor.
 */
async function delete_(req: IReq, res: IRes) {
  const dni = +req.params.dni;
  await ConductorService.delete(dni);
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
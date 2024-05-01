import { Router } from 'express';
import jetValidator from 'jet-validator';

import Paths from '../constants/Paths';
import User from '@src/models/User';
import Conductor from '@src/models/Conductor';
import ConductorRoutes from './ConductorRoutes';
import UserRoutes from './UserRoutes';
import Programa from '@src/models/Programa';
import ProgramaRoutes from './ProgramaRoutes';




// **** Variables **** //

const apiRouter = Router(),
  validate = jetValidator();


// ** Add UserRouter ** //

const userRouter = Router();
const conductorRouter = Router();
const programaRouter = Router();


// Get all users
userRouter.get(
  Paths.Users.Get,
  UserRoutes.getAll,
);

// Add one user
userRouter.post(
  Paths.Users.Add,
  validate(['user', User.isUser]),
  UserRoutes.add,
);

// Update one user
userRouter.put(
  Paths.Users.Update,
  validate(['user', User.isUser]),
  UserRoutes.update,
);

// Delete one user
userRouter.delete(
  Paths.Users.Delete,
  validate(['id', 'number', 'params']),
  UserRoutes.delete,
);

// Get all conductores
conductorRouter.get(
  Paths.Conductores.Get,
  ConductorRoutes.getAll,
);

// Add one conductor
conductorRouter.post(
  Paths.Conductores.Add,
  validate(['conductor', Conductor.isConductor]),
  ConductorRoutes.add,
);

// Get one conductor
conductorRouter.get(
  Paths.Conductores.GetOne,
  validate(['dni', 'number', 'params']),
  ConductorRoutes.getOne,
);

// Update one conductor
conductorRouter.put(
  Paths.Conductores.Update,
  validate(['conductor', Conductor.isConductor]),
  ConductorRoutes.update,
);

// Delete one conductor
conductorRouter.delete(
  Paths.Conductores.Delete,
  validate(['dni', 'number', 'params']),
  ConductorRoutes.delete,
);

programaRouter.get(
  Paths.Programas.Get,
  ProgramaRoutes.getAll,
);

programaRouter.post(
  Paths.Programas.Add,
  validate(['programa', Programa.isPrograma]),
  ProgramaRoutes.add,
);

programaRouter.get(
  Paths.Programas.GetOne,
  validate(['id', 'number', 'params']),
  ProgramaRoutes.getOne,
);

programaRouter.put(
  Paths.Programas.Update,
  validate(['programa', Programa.isPrograma]),
  ProgramaRoutes.update,
);

programaRouter.delete(
  Paths.Programas.Delete,
  validate(['id', 'number', 'params']),
  ProgramaRoutes.delete,
);


// Add UserRouter
apiRouter.use(Paths.Users.Base, userRouter);
apiRouter.use(Paths.Conductores.Base, conductorRouter);
apiRouter.use(Paths.Programas.Base, programaRouter);

// **** Export default **** //

export default apiRouter;

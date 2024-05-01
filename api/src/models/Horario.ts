import moment from 'moment';
import { Dias } from './Dias';

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' + 
  'with the appropriate user keys.';

export interface IHorario {
  dia: Dias;
  hora: string;
}

function new_ (
    dia? : Dias,
    hora? : string,
): IHorario {
  return {
    dia: (dia ?? Dias.LUNES),
    hora: (hora ?? '00:00')};
}

function from(param: object): IHorario {
  if (!isHorario(param)) {
    throw new Error(INVALID_CONSTRUCTOR_PARAM);
  }
  const p = param as IHorario;
  return new_(p.dia, p.hora);
}

function isHorario(param: any): param is IHorario {
  return (
    typeof param === 'object' &&
    typeof param.hora === 'string'
  );
}

export default {
  new: new_,
  from: from,
  isHorario: isHorario
};
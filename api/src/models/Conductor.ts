import moment from 'moment';

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' + 
  'with the appropriate user keys.';


export interface IConductor {
    dni: number;
    nombre: string;
    apellido: string;
    fechaNacimiento: Date;
}

function new_(
    nombre?: string,
    apellido?: string,
    fechaNacimiento?: Date,
    dni?: number, // id last cause usually set by db
): IConductor {
    return {
        dni: (dni ?? -1),
        nombre: (nombre ?? ''),
        apellido: (apellido ?? ''),
        fechaNacimiento: (fechaNacimiento ? new Date(fechaNacimiento) : new Date()),
    };
}

function from(param: object): IConductor {
    if (!isConductor(param)) {
        throw new Error(INVALID_CONSTRUCTOR_PARAM);
    }
    const p = param as IConductor;
    return new_(p.nombre, p.apellido, p.fechaNacimiento, p.dni);
}

function isConductor(arg: unknown): boolean {
    return (
        !!arg &&
        typeof arg === 'object' &&
        'dni' in arg && typeof arg.dni === 'number' &&
        'nombre' in arg && typeof arg.nombre === 'string' &&
        'apellido' in arg && typeof arg.apellido === 'string' &&
        'fechaNacimiento' in arg && moment(arg.fechaNacimiento as string | Date).isValid()
    );
}

export default {
    new_,
    from,
    isConductor
};

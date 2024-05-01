import Horario from "./Horario";
import Conductor from "./Conductor";

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' +
    'with the appropriate user keys.';
 
export interface IPrograma {
    id: number;
    nombre : String;
    descripcion : String;
    horarios : Array<typeof Horario>;
    conductores : Array<typeof Conductor>;
}

function new_ (
    horarios? : Array<typeof Horario>,
    conductores? : Array<typeof Conductor>,
    id? : number,
    nombre? : String,
    descripcion? : String
): IPrograma {
    return {
        id: (id ?? -1),
        horarios: (horarios ?? []),
        nombre: (nombre ?? ''),
        descripcion: (descripcion ?? ''),
        conductores: (conductores ?? [])
    };
}

function from(param: object): IPrograma {
    if (!isPrograma(param)) {
        throw new Error(INVALID_CONSTRUCTOR_PARAM);
    }
    const p = param as IPrograma;
    return new_(p.horarios, p.conductores, p.id);
}

function isPrograma(arg: unknown): boolean {
    console.log(arg);
    return (
        !!arg &&
        typeof arg === 'object' &&
        'id' in arg && typeof arg.id === 'number' &&
        'nombre' in arg && typeof arg.nombre === 'string' &&
        'descripcion' in arg && typeof arg.descripcion === 'string' &&
        'horarios' in arg && Array.isArray(arg.horarios) &&
        'conductores' in arg && Array.isArray(arg.conductores)
    );
}

export default {
    new: new_,
    from: from,
    isPrograma: isPrograma
};

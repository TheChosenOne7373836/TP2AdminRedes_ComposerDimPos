

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' +
    'with the appropriate user keys.';
 
export interface IPrograma {
    id: number;
    nombre : String;
    descripcion : String;
    horarios : [];
    conductores : [];
}

function new_ (
    horarios? : [],
    conductores? : [],
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


function isPrograma(arg: unknown): boolean {
    console.log(arg);
    return (
        !!arg &&
        typeof arg === 'object' &&
        'id' in arg && typeof arg.id === 'number' &&
        'nombre' in arg && typeof arg.nombre === 'string' &&
        'descripcion' in arg && typeof arg.descripcion === 'string' 
    );
}

export default {
    new: new_,
    isPrograma: isPrograma
};

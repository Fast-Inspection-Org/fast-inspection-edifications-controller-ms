import { InspeccionSerializable } from 'src/inspecciones/serializable/inspeccion.serializable';
import { EdificacionSerializable } from './edificacion.serializable';

export class EdificacionDetailsSerializable extends EdificacionSerializable {
  inspecciones: InspeccionSerializable[];

  constructor(
    id: number,
    nombre: string,
    direccion: string,
    coordX: number,
    coordY: number,
    criticidad: number,
    cantDeterioros: number,
    inspecciones: InspeccionSerializable[],
  ) {
    super(id, nombre, direccion, coordX, coordY, criticidad, cantDeterioros);
    this.inspecciones = inspecciones;
  }
}

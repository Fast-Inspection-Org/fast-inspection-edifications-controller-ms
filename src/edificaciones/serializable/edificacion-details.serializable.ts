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
    inspecciones: InspeccionSerializable[],
  ) {
    super(id, nombre, direccion, coordX, coordY);
    this.inspecciones = inspecciones;
  }
}

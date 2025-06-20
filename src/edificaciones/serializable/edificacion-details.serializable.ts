import { Inspeccion } from 'src/inspecciones/serializable/inspeccion.serializable';
import { EdificacionSerializable } from './edificacion.serializable';

export class EdificacionDetailsSerializable extends EdificacionSerializable {
  inspecciones: Inspeccion[];

  constructor(
    id: number,
    nombre: string,
    direccion: string,
    coordX: number,
    coordY: number,
    inspecciones: Inspeccion[],
  ) {
    super(id, nombre, direccion, coordX, coordY);
    this.inspecciones = inspecciones;
  }
}

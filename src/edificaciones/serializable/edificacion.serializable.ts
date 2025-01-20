

export class EdificacionSerializable {
  id: number;
  nombre: string;
  direccion: string;
  coordX: number;
  coordY: number;

  constructor(
    id: number,
    nombre: string,
    direccion: string,
    coordX: number,
    coordY: number,
  ) {
    this.id = id;
    this.nombre = nombre;
    this.direccion = direccion;
    this.coordX = coordX;
    this.coordY = coordY;
  }
}

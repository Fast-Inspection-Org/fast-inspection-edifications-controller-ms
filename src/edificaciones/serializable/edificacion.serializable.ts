export class EdificacionSerializable {
  id: number;
  nombre: string;
  direccion: string;
  coordX: number;
  coordY: number;
  criticidad: number;
  cantDeterioros: number;

  constructor(
    id: number,
    nombre: string,
    direccion: string,
    coordX: number,
    coordY: number,
    criticidad: number,
    cantDeterioros: number,
  ) {
    this.id = id;
    this.nombre = nombre;
    this.direccion = direccion;
    this.coordX = coordX;
    this.coordY = coordY;
    this.criticidad = criticidad;
    this.cantDeterioros = cantDeterioros;
  }
}

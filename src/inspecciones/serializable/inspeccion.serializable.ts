export class Inspeccion {
  id: number;
  fechaInicio: string;
  configVersion: number;
  indiceCriticidad: number;
  cantDeterioros: number;

  constructor(
    id: number,
    fechaInicio: string,
    configVersion: number,
    indiceCriticidad: number,
    cantDeterioros: number,
  ) {
    this.id = id;
    this.fechaInicio = fechaInicio;
    this.configVersion = configVersion;
    this.indiceCriticidad = indiceCriticidad;
    this.cantDeterioros = cantDeterioros;
  }
}

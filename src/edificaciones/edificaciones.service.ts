import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Edificacion } from './entities/edificacione.entity';
import { Like, Repository } from 'typeorm';
import { EdificacionSerializable } from './serializable/edificacion.serializable';
import { CreateEdificacionDto } from './dto/create-edificacione.dto';
import { EdificacionesFiltersDto } from './dto/filters/edificaciones-filters.dto';
import { UpdateEdificacionDto } from './dto/update-edificacione.dto';

@Injectable()
export class EdificacionesService {
  constructor(
    @InjectRepository(Edificacion)
    private edificacionRepository: Repository<Edificacion>,
  ) {}
  async create(createEdificacioneDto: CreateEdificacionDto) {
    const edificacionEntity = this.edificacionRepository.create(
      createEdificacioneDto,
    );

    return await this.edificacionRepository.save(edificacionEntity);
  }

  async findAll({
    nombre,
    direccion,
  }: EdificacionesFiltersDto): Promise<EdificacionSerializable[]> {
    const edificacionesSerializable: EdificacionSerializable[] = [];
    // se obtiene la lista de configuraciones según los filtros
    const edifacionesEntity: Array<Edificacion> =
      await this.edificacionRepository.find({
        where: {
          nombre: nombre ? Like(`%${nombre}%`) : nombre,
          direccion: direccion ? Like(`%${direccion}%`) : direccion,
        },
      });

    edifacionesEntity.forEach((edificacionEntity) => {
      edificacionesSerializable.push(
        new EdificacionSerializable(
          edificacionEntity.id,
          edificacionEntity.nombre,
          edificacionEntity.direccion,
          edificacionEntity.coordX,
          edificacionEntity.coordY,
        ),
      );
    });

    return edificacionesSerializable;
  }

  async findOne(id: number) {
    const edificacionEntity = await this.edificacionRepository.findOne({
      where: {
        id,
      },
    });

    if (edificacionEntity)
      return new EdificacionSerializable(
        edificacionEntity.id,
        edificacionEntity.nombre,
        edificacionEntity.direccion,
        edificacionEntity.coordX,
        edificacionEntity.coordY,
      );
    else
      throw new BadRequestException('No existe una edificación con dicho id');
  }

  async update(id: number, updateEdificacioneDto: UpdateEdificacionDto) {
    await this.edificacionRepository.update({ id: id }, updateEdificacioneDto);
  }

  async remove(id: number) {
    await this.edificacionRepository.delete({ id: id });
  }
}

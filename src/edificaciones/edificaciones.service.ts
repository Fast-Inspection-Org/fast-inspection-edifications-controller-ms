import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Edificacion } from './entities/edificacione.entity';
import { Like, Repository } from 'typeorm';
import { EdificacionSerializable } from './serializable/edificacion.serializable';
import { CreateEdificacionDto } from './dto/create-edificacione.dto';
import { EdificacionesFiltersDto } from './dto/filters/edificaciones-filters.dto';
import { UpdateEdificacionDto } from './dto/update-edificacione.dto';
import { ApiPaginatedResponse } from 'src/utils/api-response';
import { NameInspectionsService } from 'src/utils/globals';
import { ClientProxy } from '@nestjs/microservices';
import { EdificacionDetailsSerializable } from './serializable/edificacion-details.serializable';
import { firstValueFrom } from 'rxjs';
import { InspeccionSerializable } from 'src/inspecciones/serializable/inspeccion.serializable';

@Injectable()
export class EdificacionesService {
  constructor(
    @InjectRepository(Edificacion)
    private edificacionRepository: Repository<Edificacion>,
    @Inject(NameInspectionsService)
    private readonly inspectionsClient: ClientProxy,
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
  }: EdificacionesFiltersDto): Promise<
    ApiPaginatedResponse<EdificacionSerializable[]>
  > {
    const edificacionesSerializable: EdificacionSerializable[] = [];
    // se obtiene la lista de configuraciones según los filtros
    const edifacionesEntity: Array<Edificacion> =
      await this.edificacionRepository.find({
        where: {
          nombre: nombre ? Like(`%${nombre}%`) : nombre,
          direccion: direccion ? Like(`%${direccion}%`) : direccion,
        },
      });

    await Promise.all(
      edifacionesEntity.map(async (edificacionEntity) => {
        let inspection: InspeccionSerializable = null;

        try {
          inspection = await firstValueFrom(
            this.inspectionsClient.send(
              'find-edification-last-inspection',
              edificacionEntity.id.toString(),
            ),
          );
        } catch (error) {
          inspection = null;
        }
        edificacionesSerializable.push(
          new EdificacionSerializable(
            edificacionEntity.id,
            edificacionEntity.nombre,
            edificacionEntity.direccion,
            edificacionEntity.coordX,
            edificacionEntity.coordY,
            inspection ? inspection.indiceCriticidad : 0,
            inspection ? inspection.cantDeterioros : 0,
          ),
        );
      }),
    );

    return { data: edificacionesSerializable };
  }

  async findOne(id: number) {
    const edificacionEntity = await this.edificacionRepository.findOne({
      where: {
        id,
      },
    });

    if (edificacionEntity) {
      let inspection: InspeccionSerializable = null;

      try {
        inspection = await firstValueFrom(
          this.inspectionsClient.send(
            'find-edification-last-inspection',
            edificacionEntity.id.toString(),
          ),
        );
      } catch (error) {
        inspection = null;
      }

      return new EdificacionDetailsSerializable(
        edificacionEntity.id,
        edificacionEntity.nombre,
        edificacionEntity.direccion,
        edificacionEntity.coordX,
        edificacionEntity.coordY,
        inspection ? inspection.indiceCriticidad : 0,
        inspection ? inspection.cantDeterioros : 0,
        await firstValueFrom(
          this.inspectionsClient.send('find-inspections', {
            edificacionId: edificacionEntity.id,
          }),
        ),
      );
    } else
      throw new BadRequestException('No existe una edificación con dicho id');
  }

  async update(id: number, updateEdificacionDto: UpdateEdificacionDto) {
    await this.edificacionRepository.update({ id: id }, updateEdificacionDto);
  }

  async remove(id: number) {
    await this.edificacionRepository.delete({ id: id });
  }
}

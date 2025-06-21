import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { EdificacionesService } from './edificaciones.service';
import { CreateEdificacionDto } from './dto/create-edificacione.dto';
import { EdificacionesFiltersDto } from './dto/filters/edificaciones-filters.dto';
import { UpdateEdificacionDto } from './dto/update-edificacione.dto';

@Controller()
export class EdificacionesController {
  constructor(private readonly edificacionesService: EdificacionesService) {}

  @MessagePattern('createEdificacion')
  async create(@Payload() createEdificacioneDto: CreateEdificacionDto) {
    try {
      await this.edificacionesService.create(createEdificacioneDto);
      return { success: true };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: error.status,
      });
    }
  }

  @MessagePattern('findAllEdificaciones')
  async findAll(filters: EdificacionesFiltersDto) {
    console.log(filters);
    try {
      return await this.edificacionesService.findAll(filters);
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: error.status,
      });
    }
  }

  @MessagePattern('findOneEdificacion')
  async findOne(@Payload() id: number) {
    try {
      return await this.edificacionesService.findOne(id);
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: error.status,
      });
    }
  }

  @MessagePattern('updateEdificacion')
  async update(@Payload() updateEdificacionDto: UpdateEdificacionDto) {
    try {
      await this.edificacionesService.update(
        updateEdificacionDto.id,
        updateEdificacionDto,
      );
      return { success: true };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: error.status,
      });
    }
  }

  @MessagePattern('removeEdificacion')
  async remove(@Payload() id: number) {
    try {
      await this.edificacionesService.remove(id);
      return { success: true };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: error.status,
      });
    }
  }
}

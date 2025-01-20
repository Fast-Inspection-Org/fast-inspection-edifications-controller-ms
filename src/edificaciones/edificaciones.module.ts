import { Module } from '@nestjs/common';
import { EdificacionesService } from './edificaciones.service';
import { EdificacionesController } from './edificaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Edificacion } from './entities/edificacione.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Edificacion])],
  controllers: [EdificacionesController],
  providers: [EdificacionesService],
})
export class EdificacionesModule {}

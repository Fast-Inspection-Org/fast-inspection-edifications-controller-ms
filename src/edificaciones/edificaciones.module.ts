import { Module } from '@nestjs/common';
import { EdificacionesService } from './edificaciones.service';
import { EdificacionesController } from './edificaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Edificacion } from './entities/edificacione.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NameInspectionsService } from 'src/utils/globals';

@Module({
  imports: [
    TypeOrmModule.forFeature([Edificacion]),
    ClientsModule.register([
      {
        name: NameInspectionsService,
        transport: Transport.TCP,
        options: {
          host: process.env.INSPECTIONS_SERVICE_HOST,
          port: parseInt(process.env.INSPECTIONS_SERVICE_PORT),
        },
      },
    ]),
  ],
  controllers: [EdificacionesController],
  providers: [EdificacionesService],
})
export class EdificacionesModule {}

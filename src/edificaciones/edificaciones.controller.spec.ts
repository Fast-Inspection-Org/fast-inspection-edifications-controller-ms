import { Test, TestingModule } from '@nestjs/testing';
import { EdificacionesController } from './edificaciones.controller';
import { EdificacionesService } from './edificaciones.service';

describe('EdificacionesController', () => {
  let controller: EdificacionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EdificacionesController],
      providers: [EdificacionesService],
    }).compile();

    controller = module.get<EdificacionesController>(EdificacionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

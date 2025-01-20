import { Test, TestingModule } from '@nestjs/testing';
import { EdificacionesService } from './edificaciones.service';

describe('EdificacionesService', () => {
  let service: EdificacionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EdificacionesService],
    }).compile();

    service = module.get<EdificacionesService>(EdificacionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

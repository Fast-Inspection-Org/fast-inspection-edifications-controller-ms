import { PartialType } from '@nestjs/mapped-types';
import { CreateEdificacionDto } from './create-edificacione.dto';

export class UpdateEdificacionDto extends PartialType(CreateEdificacionDto) {
  id: number;
}

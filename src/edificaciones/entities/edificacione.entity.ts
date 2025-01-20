import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('edificacion')
export class Edificacion {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nombre: string;
  @Column()
  direccion: string;
  @Column({type: "double precision"})
  coordX: number;
  @Column({type: "double precision"})
  coordY: number;
}

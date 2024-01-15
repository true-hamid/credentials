import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Encrypt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  randomId: string;

  @Column({length: 5000})
  privateKey: 'longtext' | string;

  @Column({length: 5000})
  publicKey: 'longtext' | string;
}
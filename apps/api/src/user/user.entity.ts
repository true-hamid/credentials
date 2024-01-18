import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ default: null })
  pushNotificationId?: string;

  @Column()
  phoneNumber: string;

  @Column()
  country: string;
}

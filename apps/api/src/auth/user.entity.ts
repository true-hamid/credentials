import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from './profile.entity';

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

  @Column({default: null})
  pushNotificationId?: string;

  @Column()
  phoneNumber: string;

  @Column()
  country: string;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;
}

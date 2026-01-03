import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

@Entity()
export class Cronjob {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column({ default: '*/30 * * * * *' })
  schedule: string;

  @Column({ name: 'timeout_ms', default: 30000 })
  timeoutMs: number;

  @Column({ default: true })
  enabled: boolean;

  @Column({ type: 'enum', enum: HttpMethod, default: HttpMethod.GET })
  method: HttpMethod;

  @Column({ nullable: true })
  httpUsername: string;

  @Column({ nullable: true })
  httpPassword: string;

  @Column({ type: 'jsonb', nullable: true })
  httpHeaders: Record<string, string>;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.cronjobs)
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

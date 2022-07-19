import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

export enum UserRoles {
  ADMIN = 'Administrator',
  BOSS = 'Boss',
  USER = 'Regular user',
}

@Entity({ name: 'users' })
@Tree('materialized-path')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.USER,
  })
  role: UserRoles;

  @Column({ unique: true })
  email: string;

  @TreeChildren()
  subordinates: User[];

  @TreeParent()
  boss: User;

  // @ManyToOne(() => User, (user) => user.subordinates)
  // boss: User;

  // @OneToMany(() => User, (user) => user.boss, { eager: true })
  // subordinates: User[];

  @Column()
  password: string;
}

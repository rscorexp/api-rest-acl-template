import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import {Permission} from './Permission';

import {User} from './User';
@Entity('roles')
export class Role {

  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column()
  name: string;

  @ManyToMany(type => Permission)
  @JoinTable()
  permissions: Permission[];

  @Column("timestamp")
  created_at: Date;

  @Column("timestamp")
  updated_at: Date;

  @ManyToMany(() => User, user => user.roles)
  users: User[];

  @BeforeInsert()
  createdAt(){
    this.created_at = new Date;
    this.updated_at = new Date;
  }

}

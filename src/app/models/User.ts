import { JoinColumn, JoinTable, ManyToMany } from 'typeorm';
import {Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate} from 'typeorm';

import bcrypt from 'bcryptjs';

import {Role} from './Role';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column("timestamp")
  created_at: Date;

  @Column("timestamp")
  updated_at: Date;
  
  @ManyToMany(type => Role, {eager: true})
  @JoinTable()
  roles: Role[];

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword(){
    this.password = bcrypt.hashSync(this.password, 8)
  }

  @BeforeInsert()
  createdAt(){
    this.created_at = new Date;
    this.updated_at = new Date;
  }
}
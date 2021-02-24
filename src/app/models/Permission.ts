import { BeforeInsert, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity('permissions')
export class Permission {

  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column()
  name: string;

  @Column("timestamp")
  created_at: Date;

  @Column("timestamp")
  updated_at: Date;

  @BeforeInsert()
  createdAt(){
    this.created_at = new Date;
    this.updated_at = new Date;
  }

}
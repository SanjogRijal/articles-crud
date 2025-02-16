import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export default class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  middlename: string;

  @Column()
  lastname: string;

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  facebookProfileLink: string;

  @Column({ nullable: true })
  instagramProfileLink: string;

  @Column({ nullable: true })
  linkedInProfileLink: string;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}

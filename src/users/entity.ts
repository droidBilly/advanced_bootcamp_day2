import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, Length, MinLength, IsEmail } from 'class-validator'
import { Exclude } from 'class-transformer'
import * as bcrypt from 'bcrypt'

@Entity()
export default class User extends BaseEntity {

  async setPassword(rawPassword: string) {
      const hash = await bcrypt.hash(rawPassword, 10)
      this.password = hash
    }

    checkPassword(rawPassword: string): Promise<boolean> {
      return bcrypt.compare(rawPassword, this.password)
    }

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', {nullable:false})
  @MinLength(2)
  @Column('text')
  firstName: string

  @Column('text', {nullable:false})
  @MinLength(2)
  @Column('text')
  lastName: string

  @Column('text', {nullable:false})
  @IsEmail()
  email: string

  @Column('text')
  @MinLength(3)
  @Column('text')
  city: string

  @IsString()
  @MinLength(8)
  @Column('text', { nullable:true })
  @Exclude({toPlainOnly:true})
  password: string

}

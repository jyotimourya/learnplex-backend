import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'

import { Section } from './Section.entity'
import { User } from './User.entity'
import { Topic } from './Topic.entity'
import { slug } from '../utils/slug'

@ObjectType()
@Entity()
export class Resource extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  title: string

  @Field(() => [Section])
  @OneToMany(
    () => Section,
    (section) => section.resource
  )
  sections: Promise<Section[]>

  @Field(() => User)
  @ManyToOne(
    () => User,
    (user) => user.resources
  )
  user: Promise<User>

  @Field(() => Topic)
  @ManyToOne(
    () => Topic,
    (topic) => topic.resources
  )
  topic: Promise<Topic>

  @Field()
  @Column('bool', { default: false })
  verified: boolean

  @Field()
  slug(): string {
    return slug(this.title)
  }
}
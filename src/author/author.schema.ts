import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Mongoose, Schema as MongooseSchema, Types } from 'mongoose';

export type AuthorDocument = Author & Document & { _id: Types.ObjectId };

@Schema({ timestamps: true, strict: false })
export class Author {
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.String, required: true })
  name: string;

  @Prop({ type: MongooseSchema.Types.String, default: null })
  alias?: string;

  @Prop({ type: MongooseSchema.Types.Number })
  birthYear: number;
}
export const AuthorSchema = SchemaFactory.createForClass(Author);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type BookDocument = Book & Document & { _id: Types.ObjectId };

@Schema({ timestamps: true, strict: false })
export class Book {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Author' })
  authorId: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.String, required: true })
  title: string;

  @Prop({ type: MongooseSchema.Types.Number, required: true })
  year: number;
}
export const BookSchema = SchemaFactory.createForClass(Book);

import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

@Schema({ timestamps: true, strict: false })
export class Category {
  @Prop({ type: MongooseSchema.Types.String })
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

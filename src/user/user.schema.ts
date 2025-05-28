import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type UserDocument = User & Document & { _id: Types.ObjectId };

@Schema({ timestamps: true, strict: false })
export class User {
  @Prop({ type: MongooseSchema.Types.String, required: true, unique: true })
  userName: string;

  @Prop({ type: MongooseSchema.Types.String, required: true })
  firstName: string;

  @Prop({ type: MongooseSchema.Types.String, required: true })
  lastName: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
    unique: true,
    lowercase: true,
  })
  email: string;

  @Prop({ type: MongooseSchema.Types.String, required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

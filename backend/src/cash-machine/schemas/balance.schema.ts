import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class CashMachine extends Document {
  @Prop()
  public userId?: string;
  @Prop()
  public amount?: number;
}

export const CashMachineSchema = SchemaFactory.createForClass(CashMachine);

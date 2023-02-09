import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class DepositCashMachine extends Document {
  @Prop()
  public value?: string;
  @Prop()
  public notes?: number;
}

export const DepositCashMachineSchema =
  SchemaFactory.createForClass(DepositCashMachine);

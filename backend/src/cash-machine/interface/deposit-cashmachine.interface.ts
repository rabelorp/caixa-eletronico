import { Document } from 'mongoose';

export interface IDepositCashMachine extends Document {
  readonly value: number;
  readonly notes: number;
}

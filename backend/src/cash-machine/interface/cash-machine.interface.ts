import { Document } from 'mongoose';

export interface ICashMachine extends Document {
  readonly userId: string;
  readonly amount: number;
}

import { IsNotEmpty } from 'class-validator';

export class DepositDto {
  @IsNotEmpty({ message: `O userId não pode estar vazio!` })
  userId: string;
  @IsNotEmpty({ message: `O valor não pode estar vazio!` })
  amount: number;
}

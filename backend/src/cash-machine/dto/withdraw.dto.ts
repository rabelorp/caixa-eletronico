import { IsNotEmpty } from 'class-validator';

export class WithdrawDto {
  id: string;
  @IsNotEmpty({ message: `O valor não pode estar vazio!` })
  amount: number;
}

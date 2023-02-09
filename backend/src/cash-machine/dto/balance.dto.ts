import { IsNotEmpty } from 'class-validator';

export class BalanceDto {
  @IsNotEmpty({ message: `O userId não pode estar vazio!` })
  userId: string;
}

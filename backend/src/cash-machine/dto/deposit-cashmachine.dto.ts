import { IsNotEmpty } from 'class-validator';

export class DepositCashMachineDto {
  @IsNotEmpty({ message: `O valor da nota não pode estar vazio!` })
  value: number;
  @IsNotEmpty({ message: `A quantidade de notas não pode estar vazio!` })
  notes: number;
}

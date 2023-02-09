import { Injectable, NotFoundException } from '@nestjs/common';
import { WithdrawDto } from './dto/widthdraw.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICashMachine } from './interface/cash-machine.interface';
import { DepositDto } from './dto/deposit.dto';
import { BalanceDto } from './dto/balance.dto';
// import { DepositCashMachineDto } from './dto/deposit-cashmachine.dto';
import { IDepositCashMachine } from './interface/deposit-cashmachine.interface';

@Injectable()
export class CashMachineService {
  constructor(
    @InjectModel('Balance') private balanceModel: Model<ICashMachine>,
    @InjectModel('Note') private notesModel: Model<IDepositCashMachine>,
  ) {}

  async balance(balanceDto: BalanceDto) {
    const { userId } = balanceDto;
    const balance = await this.balanceModel.find({ userId: userId });
    const sum = balance.reduce(function (accumulator, object) {
      return accumulator + object.amount;
    }, 0);

    return sum;
  }

  private searchNotes(
    amount,
    notesAvailableArray,
    minNominal,
    availableAmount,
  ) {
    if (notesAvailableArray.length === 0) {
      throw new NotFoundException(
        `O valor mínimo para saque é: ${minNominal} e a quantia máxima é: ${availableAmount}`,
      );
    }

    const result = {};
    const initialAmount = amount;

    // Iteração com as notas disponiveis
    for (let i = 0; i < notesAvailableArray.length; i++) {
      const [value, note] = notesAvailableArray[i];
      let availableAmount = value * note;

      // Verifique o valor disponível, reduzindo o valor e escrevendo notas no resultado
      while (availableAmount && amount >= value) {
        amount -= value;
        availableAmount -= value;

        if (result[value]) {
          result[value] += 1;
        } else {
          result[value] = 1;
        }
      }
    }

    // Se não obtivermos o valor necessário, busca notas menores
    if (amount > 0) {
      return this.searchNotes(
        initialAmount,
        notesAvailableArray.slice(1),
        minNominal,
        availableAmount,
      );
    }

    return result;
  }
  private async notesAvailable(amount): Promise<ICashMachine[]> {
    const notesAvailable = { 100: 1, 50: 2, 20: 1, 10: 1 };
    // const notesAvailable = await this.notesModel.find();
    // if (!notesAvailable) {
    //   throw new NotFoundException('Não há notas disponivéis neste caixa!');
    // }
    // return notesAvailable;

    // Converte objeto para array ordenado
    const notesAvailableArray = Object.entries(notesAvailable)
      .map(([value, note]) => [Number(value), note])
      .sort((a, b) => b[0] - a[0]);
    let minNominal = +Infinity;

    //Montante disponivel
    const availableAmount = notesAvailableArray.reduce(
      (prevSum, [value, note]) => {
        minNominal = Math.min(minNominal, value);
        return (prevSum += value * note);
      },
      0,
    );

    // Verifique o valor do pedido na emissão disponível
    if (amount > availableAmount) {
      throw new NotFoundException(
        `Não há dinheiro suficiente no caixa eletrônico. O valor máximo é: R$ ${availableAmount}`,
      );
    }

    return this.searchNotes(
      amount,
      notesAvailableArray,
      minNominal,
      availableAmount,
    );
  }

  async withdraw(withdrawDto: WithdrawDto) {
    const { amount } = withdrawDto;
    const balance = await this.balance(withdrawDto);

    if (amount > balance) {
      throw new NotFoundException('Você não tem limite');
    }

    return this.notesAvailable(amount);
  }

  async depositForUser(depositDto: DepositDto): Promise<ICashMachine> {
    const newDeposit = await new this.balanceModel(depositDto);
    return newDeposit.save();
  }

  // async depositForCashMachine(
  //   depositCashMachineDto: DepositCashMachineDto,
  // ): Promise<IDepositCashMachine> {
  //   const newDeposit = await new this.notesModel(depositCashMachineDto);
  //   console.log(newDeposit);
  //   return newDeposit.save();
  // }
}

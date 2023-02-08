import { Injectable } from '@nestjs/common';
import { WithdrawDto } from './dto/withdraw.dto';

@Injectable()
export class CashMachineService {
  balance(id: string): number {
    id;
    return 100;
  }

  searchNotes(amount, notesAvailableArray, minNominal, availableAmount) {
    if (notesAvailableArray.length === 0) {
      return `O valor mínimo para saque é: ${minNominal} e a quantia máxima é: ${availableAmount}`;
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
  private notesAvailable(amount): any {
    const notesAvailable = { 100: 1, 50: 2, 20: 1, 10: 1 };

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
      return `Não há dinheiro suficiente no caixa eletrônico. O valor máximo é: ${availableAmount}`;
    }

    return this.searchNotes(
      amount,
      notesAvailableArray,
      minNominal,
      availableAmount,
    );
  }

  withdraw(withdrawDto: WithdrawDto) {
    const { id, amount } = withdrawDto;
    const balance = this.balance(id);
    if (amount > balance) {
      return 'você não tem limite';
    }
    return this.notesAvailable(amount);
  }
}

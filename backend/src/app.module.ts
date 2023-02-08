import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CashMachineModule } from './cash-machine/cash-machine.module';

@Module({
  imports: [CashMachineModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

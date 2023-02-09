import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CashMachineModule } from './cash-machine/cash-machine.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    CashMachineModule,
    MongooseModule.forRoot('mongodb://root:root@localhost', {
      dbName: 'cash-machine',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

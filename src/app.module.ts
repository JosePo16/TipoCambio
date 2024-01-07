import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExchangeModule } from './modules/currencyExchange/exchange.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [ExchangeModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ExchangeController } from './controllers/exchange.controller';
import { AxiosModule } from 'src/shared/axios/axios.module';
import { ExchangeService } from './services/exchange.service';

@Module({
  imports: [AxiosModule],
  controllers: [ExchangeController],
  providers: [ExchangeService],
})
export class ExchangeModule {}

import { Controller, Get, Param } from '@nestjs/common';
import { ExchangeService } from '../services/exchange.service';

@Controller('api/reto/currencyExchange')
export class ExchangeController {
  constructor(protected exchangeService: ExchangeService) {}

  @Get(':amount/:originCurrency/:outputCurrency')
  async getCurrencyExchange(
    @Param('amount') amount: string,
    @Param('originCurrency') originCurrency: string,
    @Param('outputCurrency') outputCurrency: string,
  ) {
    try {
      //   const data: any = event;

      //   this.logger.log(
      //     { function: 'payload', data },
      //     'Message Recived from PUBSUB',
      //   );
      return await this.exchangeService.getChange(
        originCurrency,
        outputCurrency,
        amount,
      );
    } catch (error) {
      //   this.logger.error(error);
    }
  }

  @Get('exchangeRates/:originCurrency')
  async getAllChangeByCurrency(
    @Param('originCurrency') originCurrency: string,
  ) {
    try {
      return await this.exchangeService.getAllChangesByCurrency(originCurrency);
    } catch (error) {
      //   this.logger.error(error);
    }
  }
}

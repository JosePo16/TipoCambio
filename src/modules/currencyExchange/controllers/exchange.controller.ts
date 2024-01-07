import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ExchangeService } from '../services/exchange.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { Public } from 'src/modules/auth/decorators/public.decorator';

@UseGuards(JwtAuthGuard)
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

  @Public()
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

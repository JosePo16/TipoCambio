import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Controller, Get, Inject, Param, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { Public } from 'src/modules/auth/decorators/public.decorator';
import { Cache } from 'cache-manager';
import { ExchangeRateService } from '../services/exchange-rate.service';
import { ExchangeRateinterface } from '../interfaces/exchangeRate.interface';
import { PinoLogger } from 'nestjs-pino';

@UseGuards(JwtAuthGuard)
@Controller('api/exchange')
export class ExchangeRateController {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private exchangeRateService: ExchangeRateService,
    private readonly logger: PinoLogger,
  ) {}

  @Get('get/amount')
  async getExchangeRate(@Req() req: Request) {
    try {
      const value = req.body as ExchangeRateinterface;
      this.logger.info(
        `PROCESSING REQUEST - petition for: ${JSON.stringify(value)}`,
      );
      return await this.exchangeRateService.getExchangeRateByAmount(
        value.source,
        value.target,
        value.amount,
      );
    } catch (error) {
      //   this.logger.error(error);
    }
  }

  @Public()
  @Get('getAll/amount/:originCurrency')
  async getAllChangeByCurrency(
    @Param('originCurrency') originCurrency: string,
  ) {
    try {
      const resp =
        await this.exchangeRateService.getAllExchangeRate(originCurrency);
      await this.cacheManager.set('cached_item', resp);
    } catch (error) {
      //   this.logger.error(error);
    }
  }
}

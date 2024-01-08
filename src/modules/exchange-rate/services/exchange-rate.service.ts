import { Injectable } from '@nestjs/common';
import { AxiosService } from 'src/shared/axios/axios.service';
import {
  ResponseData,
  ResponseExchangeRateInterface,
} from '../interfaces/responseExchangeRate.interface';

@Injectable()
export class ExchangeRateService {
  constructor(protected axiosService: AxiosService) {}

  getExchangeRateByAmount = async (
    source: string,
    target: string,
    amount: number,
  ) => {
    const { result } = await this.axiosService.getExchangeRate(
      source,
      target,
      amount,
    );

    const data: ResponseData = {
      amount: result.quantity,
      amountExchangeRate: result.amount,
      originCurrency: result.source,
      targetCurrency: result.target,
      valueExchangeRate: result.value,
    };

    const response: ResponseExchangeRateInterface = {
      data: data,
      status: 'OK',
    };

    return response;
  };

  getAllExchangeRate = async (source: string) => {
    const response = await this.axiosService.getAllChangesByCurrency(source);
    return response;
  };
}

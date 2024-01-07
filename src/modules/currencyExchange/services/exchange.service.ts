import { Injectable } from '@nestjs/common';
import { AxiosService } from 'src/shared/axios/axios.service';

@Injectable()
export class ExchangeService {
  constructor(protected axiosService: AxiosService) {}

  getChange = async (source: string, target: string, amount: string) => {
    const response = await this.axiosService.getExchangeRate(
      source,
      target,
      amount,
    );
    return response;
  };

  getAllChangesByCurrency = async (source: string) => {
    const response = await this.axiosService.getAllChangesByCurrency(source);
    return response;
  };
}

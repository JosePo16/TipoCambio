import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ExchangeRateInterface } from './interfaces/exchangeRate.Interface';
import { AxiosResponse } from 'axios';

@Injectable()
export class AxiosService {
  constructor(private readonly httpService: HttpService) {}

  getExchangeRate(
    source: string,
    target: string,
    amount: string,
  ): Observable<ExchangeRateInterface> {
    try {
      return this.httpService
        .get(
          `https://api.cambio.today/v1/quotes/${source}/${target}/json?quantity=${amount}&key=45934|ZbSD26bkCVBufbj21Gx5`,
        )
        .pipe(map((response: AxiosResponse) => response.data));
    } catch (error) {
      throw console.log('Error al obtener el tipo de cambio');
    }
  }

  getAllChangesByCurrency(source: string) {
    try {
      return this.httpService
        .get(
          `https://api.cambio.today/v1/full/${source}/json?key=45934|ZbSD26bkCVBufbj21Gx5`,
        )
        .pipe(map((response: AxiosResponse) => response.data));
    } catch (error) {
      throw console.log(
        'Error al obtener todos los tipos de cambio por moneda',
      );
    }
  }
}

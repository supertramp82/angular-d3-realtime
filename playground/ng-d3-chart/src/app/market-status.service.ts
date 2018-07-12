import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MarketPrice } from './market-price';
import { Subject, from } from 'rxjs';
import * as siocketio from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class MarketStatusService {
  private baseUrl = 'http://localhost:3000';

  constructor(private httpCllient: HttpClient) {}

  getInitialMarketStatus() {
    console.log('service');
    return this.httpCllient.get<MarketPrice[]>(`${this.baseUrl}/api/market`);
  }

  getUpdates() {
    const socket = siocketio(this.baseUrl);
    const marketSub = new Subject<MarketPrice>();
    const marketSubObservable = from(marketSub);

    socket.on('market', (marketStatus: MarketPrice) => {
      marketSub.next(marketStatus);
    });

    return marketSubObservable;
  }
}

import { Component } from '@angular/core';
import { MarketPrice } from './market-price';
import { MarketStatusService } from './market-status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  marketStatus: MarketPrice[];
  marketStatusToPlot: MarketPrice[];

  set MarketStatus(status: MarketPrice[]) {
    this.marketStatus = status;
    this.marketStatusToPlot = this.marketStatus.slice(0, 20);
  }

  constructor(private marketStatusSvc: MarketStatusService) {
    this.marketStatusSvc.getInitialMarketStatus().subscribe(prices => {
      this.MarketStatus = prices;

      const marketUpdateObservable = this.marketStatusSvc.getUpdates(); // 1

      marketUpdateObservable.subscribe((latestStatus: MarketPrice) => {
        this.MarketStatus = [latestStatus].concat(this.marketStatus);
      });
      console.log(this.MarketStatus);
    });
  }
}

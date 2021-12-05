import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TravelOptions } from 'src/app/core/interfaces/travel-options.interface';
import { TravelOptionsService } from 'src/app/core/services/travel-options.service';
import { Listing } from '../../core/interfaces/travel-options.interface';

@Component({
  selector: 'app-travel-options',
  templateUrl: './travel-options.component.html',
  styleUrls: ['./travel-options.component.css']
})
export class TravelOptionsComponent implements OnInit, OnDestroy {

  private travelSubscription: Subscription;
  data: TravelOptions | null = null;
  listings: Listing[] = [];
  listingsNumber = 3;
  listingsSize = 0;
  min = 0;
  max = 0;
  average = 0;

  constructor(private travelOptionsService: TravelOptionsService) {
    this.travelSubscription = this.travelOptionsService.getOptions()
    .subscribe(data => {
      this.data = data;
    });
  }

  ngOnInit(): void {
    if (!this.data) {
      this.getData();
    }
  }

  getData(): void {
    this.travelSubscription = this.travelOptionsService.getDataFromJson()
      .subscribe(data => {
        this.data = data;
        this.countAdditionalData(data.listings);
      });
  }

  round(num: number, digitsAfterPoint: number = 2): number {
    const numberString = `${num}e+${digitsAfterPoint}`;
    const numberAfterRound =  Math.round(+numberString);
    const roundString = `${numberAfterRound}e-${digitsAfterPoint}`;

    return +roundString;
  }

  countAdditionalData(array: Listing[]): void {
    let total = 0;

    this.min = array[0].pricePerPassenger;
    this.max = array[0].pricePerPassenger;
    this.listings = array.slice(0, this.listingsNumber)
      .sort((a, b) => a.pricePerPassenger - b.pricePerPassenger);
    this.listingsSize = array.length;

    array.forEach( (element, i) => {
      if (element.pricePerPassenger < this.min) {
        this.min = element.pricePerPassenger;
      }
      if (element.pricePerPassenger > this.max) {
        this.max = element.pricePerPassenger;
      }
      total += element.pricePerPassenger;
    });
    this.average = this.round(total / this.listingsSize);
  }

  ngOnDestroy(): void {
    if (this.travelSubscription) {
      this.travelSubscription.unsubscribe();
    }
  }
}

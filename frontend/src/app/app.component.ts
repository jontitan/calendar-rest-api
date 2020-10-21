import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CalEvent } from './cal-event';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  date = new Date();
  events = [];
  startDate: string;
  endDate: string;

  private readonly datePipe = new DatePipe("en-US");

  constructor(private httpClient: HttpClient) {
    this.startDate = this.datePipe.transform(new Date(this.date.getFullYear(), this.date.getMonth(), 1), "yyyy-MM-dd");
    this.endDate = this.datePipe.transform(new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0), "yyyy-MM-dd");
  }

  ngOnInit(): void {
    this.httpClient
      .get<CalEvent[]>(`http://localhost:4000/events?start=${this.startDate}&end=${this.endDate}`)
      .subscribe(events =>
        this.events = events.map(e => {
          const startTime = new Date(e.startTime);
          return {
            start: startTime,
            title: `${this.datePipe.transform(startTime, "shortTime")} ${e.title}`
          }
        }));
  }
}

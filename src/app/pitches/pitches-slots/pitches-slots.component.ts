import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { pluck, map, tap } from 'rxjs/operators';

import { DayPilotCalendarComponent } from 'daypilot-pro-angular';
import { Pitch } from '../../models/pitch';
import { PitchesService } from '../../services/pitches.service';
import { PitchSlot } from '../../models/pitch-slot';

@Component({
  selector: 'pf-pitches-slots',
  templateUrl: './pitches-slots.component.html',
  styleUrls: ['./pitches-slots.component.scss'],
  providers: [CurrencyPipe]
})
export class PitchesSlotsComponent implements OnInit {

  @ViewChild('timetable', {static: false}) timetable: DayPilotCalendarComponent;
  @Input() pitch: Pitch;
  slots: PitchSlot[];
  events: any[] = [];
  minDate = new Date(2010, 0, 1); // changed from today as couldn't find any slots in future
  maxDate = new Date(2020, 0, 1);
  startDate = new FormControl(new Date(2018, 0, 7)); // temp date set
  endDate = new FormControl(new Date(2018, 0, 14)); // temp date set

  config: any = {
    startDate: '2018-01-07',
    viewType: 'Week',
    dayBeginsHour: 4,
    dayEndsHour: 24,
    businessBeginsHour: 6,
    businessEndsHour: 22,
    headerHeight: 30,
    hourWidth: 100,
    cellDuration: 60,
    cellHeight: 60,
    durationBarVisible: false,
    headerDateFormat: 'dddd M/d/yyyy',
    onBeforeEventRender: args => {
      if (args.data.additional && args.data.additional.available) {
        if (args.data.additional.available > 0) {
          args.data.backColor = '#69f0ae';
          args.data.borderColor = '#449a70';
        } else {
          args.data.backColor = '#dc3545';
          args.data.borderColor = '#fda5ad';
        }
      }
    },
    onEventClick: event => {
      const slot = event.e.data;
      if (slot.additional.available) {
        alert(`Booking slot ${slot.id} for ${this.currencyPipe.transform(slot.additional.price, slot.additional.currency)} now!`);
      }
    }
  };

  constructor(public pitchService: PitchesService, private currencyPipe: CurrencyPipe) { }

  ngOnInit() {
    this.startDate.valueChanges
      .subscribe(value => {
        this.config.startDate = this.pitchService.formattedDate(value);
        this.loadSlots();
      });
    this.endDate.valueChanges
      .subscribe(value => {
        this.loadSlots();
      });
  }

  /**
   * Maps a Slot to an Event (Dayplot-pro plugin)
   */
  mapSlotToEvent = (slot: PitchSlot) => {
    const start = new Date(slot.attributes.starts);
    const event = {
      // tslint:disable-next-line: radix
      id: parseInt(slot.id),
      text: `<strong>${start.getHours()}:${start.getMinutes()}</strong><br>
        ${this.currencyPipe.transform(slot.attributes.price, slot.attributes.currency)}<br>
        ${slot.attributes.availabilities} Available`,
      start: slot.attributes.starts,
      end: slot.attributes.ends,
      additional: {
        available: slot.attributes.availabilities,
        price: slot.attributes.price,
        currency: slot.attributes.currency
      }
    };
    return event;
  }

  /**
   * Load slots from API, store slots and then map to events for display
   */
  loadSlots() {
    this.pitchService.getSlots(this.pitch.id, this.startDate.value, this.endDate.value)
      .pipe(
        pluck('data'),
        tap(slots => this.slots = slots),
        map(slots => slots.map(this.mapSlotToEvent))
      )
      .subscribe(events => {
        this.events = events;
      });
  }

}

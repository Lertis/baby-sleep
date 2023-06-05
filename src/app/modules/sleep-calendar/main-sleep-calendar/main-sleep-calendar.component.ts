import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core'
import { MatCalendar } from '@angular/material/datepicker'
import { Subject, filter, takeUntil } from 'rxjs'

@Component({
  selector: 'app-main-sleep-calendar',
  templateUrl: './main-sleep-calendar.component.html',
  styleUrls: ['./main-sleep-calendar.component.scss']
})
export class MainSleepCalendarComponent implements AfterViewInit, OnDestroy {
  private readonly destroy$ = new Subject<void>()

  selected!: Date | null

  @ViewChild(MatCalendar) calendar!: MatCalendar<Date>

  ngAfterViewInit (): void {
    this.calendar.selectedChange.pipe(
      takeUntil(this.destroy$),
      filter(v => Boolean(v))
    ).subscribe((date: Date | null) => {
      console.log(date)
    })
  }

  ngOnDestroy (): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}

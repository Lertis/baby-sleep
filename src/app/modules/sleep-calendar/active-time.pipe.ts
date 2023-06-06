import { Pipe, PipeTransform } from '@angular/core'

import { SleepPeriod } from '@model'
import { convertTimeToHours, convertTimeToMinutes } from '@util'

@Pipe({
  name: 'activeTime',
  pure: true
})
export class ActiveTimePipe implements PipeTransform {
  transform (item: SleepPeriod, i: number, sleepStatisticByDay: SleepPeriod[]): string {
    const wakeUpTime = item.end
    const nextIndex = i + 1
    if (nextIndex === sleepStatisticByDay.length) {
      return ''
    } else {
      const nextSleepTime = sleepStatisticByDay[i + 1].start
      const totalWakeM = (convertTimeToHours(wakeUpTime) * 60) + convertTimeToMinutes(wakeUpTime)
      const totalSleepM = (convertTimeToHours(nextSleepTime) * 60) + convertTimeToMinutes(nextSleepTime)
      const diffInMinutes = totalSleepM - totalWakeM
      const hours = diffInMinutes / 60
      return hours < 1
        ? `${diffInMinutes} хв`
        : this.calculateHoursAndMinutes(hours, diffInMinutes)
    }
  }

  private calculateHoursAndMinutes (hours: number, diffInMinutes: number): string {
    const diffLeft = diffInMinutes % 60
    if (diffLeft === 0) {
      return hours === 1 ? '1 г' : `${hours} г`
    } else {
      const h = Math.floor(hours) === 1 ? '1 г' : `${Math.floor(hours)} г`
      const m = diffLeft > 1 ? `${diffLeft} хв` : '1 хв'
      return `${h} ${m}`.trim()
    }
  }
}

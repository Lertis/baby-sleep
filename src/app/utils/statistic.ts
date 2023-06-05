import { SleepHourProbability, SleepPeriod } from '../models'

function convertTimeToHours (time: string): number {
  const [hours] = time.split(':').map(Number)
  return hours
}


export function calculateMostFrequentSleepHours (sleepPeriods: SleepPeriod[]): SleepHourProbability[] {
  if (sleepPeriods.length === 0) {
    throw new Error('The sleepPeriods array is empty.')
  }

  const sleepHourMap: Map<number, number> = new Map()

  // Знаходимо кількість сонних періодів для кожної години
  for (const sleepPeriod of sleepPeriods) {
    const { start, end } = sleepPeriod
    const startTime = convertTimeToHours(start)
    const endTime = convertTimeToHours(end)

    for (let hour = startTime; hour <= endTime; hour++) {
      const count = sleepHourMap.get(hour) || 0
      sleepHourMap.set(hour, count + 1)
    }
  }

  if (sleepHourMap.size === 0) {
    throw new Error('No sleep periods found in the specified range.')
  }

  const totalSleepPeriods = sleepPeriods.length
  const sleepHourProbabilities: SleepHourProbability[] = []

  // Обчислюємо ймовірність сну для кожної години
  for (const [hour, count] of sleepHourMap) {
    const probability = (count / totalSleepPeriods) * 100
    sleepHourProbabilities.push({ hour, probability })
  }

  // Сортуємо години за спаданням ймовірності
  sleepHourProbabilities.sort((a, b) => b.probability - a.probability)

  return sleepHourProbabilities
}

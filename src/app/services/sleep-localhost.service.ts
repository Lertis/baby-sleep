import { DOCUMENT } from '@angular/common'
import { Inject, Injectable } from '@angular/core'

import { LOCAL_STORAGE_TOKEN } from '@token'
import { ILocalStorage, SleepPeriod } from '@model'

@Injectable()
export class SleepLocalStorageService implements ILocalStorage {
  private get windowRef (): Window & typeof globalThis {
    return this.document.defaultView
  }

  private get localStorage (): Storage {
    return this.windowRef.localStorage
  }

  constructor (
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(LOCAL_STORAGE_TOKEN) private readonly key: string
  ) {
    if (!this.getParsedItems()) {
      this.setItem([])
    }

  }

  getItems (): string {
    return this.localStorage.getItem(this.key)
  }

  getParsedItems (): SleepPeriod[] {
    return JSON.parse(this.getItems())
  }

  setItem (v: unknown): void {
    this.localStorage.setItem(this.key, JSON.stringify(v))
  }

  updateItem (id: string, payload: SleepPeriod): void {
    const all: SleepPeriod[] = this.getParsedItems()
    const i = all.findIndex(({ uuid }) => uuid === id)
    all[i] = payload
    this.setItem(all)
  }

  removeItem (id: string): void {
    const all: SleepPeriod[] = this.getParsedItems() || []
    this.setItem(all.filter(({ uuid }) => uuid !== id))
  }

  clearStore (): void {
    this.localStorage.removeItem(this.key)
  }
}

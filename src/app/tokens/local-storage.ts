import { InjectionToken } from '@angular/core'

import { ILocalStorage } from '@model'

export const LOCAL_STORAGE_TOKEN = new InjectionToken<string>('LOCAL_STORAGE_KEY')

export const LOCAL_STORAGE_SERVICE = new InjectionToken<ILocalStorage>('LOCAL_STORAGE_KEY')

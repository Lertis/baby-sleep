import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core'
import { MediaMatcher } from '@angular/cdk/layout'

import { RoutePath } from './const'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  private _mobileQueryListener: () => void

  mobileQuery: MediaQueryList
  path = RoutePath

  constructor (changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)')
    this._mobileQueryListener = () => changeDetectorRef.detectChanges()
    this.mobileQuery.addEventListener('change', this._mobileQueryListener)
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
}

import { Component } from '@angular/core';
import {RoutePath} from './const'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  path = RoutePath
}

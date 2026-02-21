import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SimpleMouseDirective } from '../directives/chgstucturebehavior.directive';

@Component({
  selector: 'app-test-componen',
  imports: [],
  templateUrl: './test-componen.html',
  styleUrl: './test-componen.css',
})
export class TestComponen {
  constructor() {}
  abcll() {
    alert(555);
  }
}

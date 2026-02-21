import {
  AfterContentInit,
  Component,
  computed,
  ContentChild,
  effect,
  ElementRef,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-signal-example',
  imports: [],
  templateUrl: './signal-example.html',
  styleUrl: './signal-example.css',
})
export class SignalExample implements AfterContentInit {
  @ContentChild('desc') projected!: ElementRef;

  constructor() {
    effect(() => console.log('Count is now:', this.counter()));
  }
  counter = signal<number>(0);
  doubleCount = computed(() => this.counter() * 2);

  onReset() {
    this.counter.set(0);
  }
  onAdd() {
    this.counter.update((value) => value + 1);
  }
  onMinus() {
    if (this.counter() > 0) {
      this.counter.update((value) => value - 1);
    }
  }
  ngAfterContentInit() {
    this.projected.nativeElement.textContent = 'hello i m changed';
  }
}

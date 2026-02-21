import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-confimlogin',
  imports: [RouterLink],
  templateUrl: './confimlogin.html',
  styleUrl: './confimlogin.css',
})
export class Confimlogin {
  @Output() closed = new EventEmitter<void>();
  close() {
    this.closed.emit(); // notify parent to hide modal

    // logic to hide modal (e.g., set a flag or emit event)
  }
}

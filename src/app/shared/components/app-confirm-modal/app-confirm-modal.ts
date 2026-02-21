import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-app-confirm-modal',
  imports: [],
  templateUrl: './app-confirm-modal.html',
  styleUrl: './app-confirm-modal.css',
})
export class AppConfirmModal {
  @Output() confirmed = new EventEmitter<boolean>();

  onYes() {
    this.confirmed.emit(true);
  }

  onNo() {
    this.confirmed.emit(false);
  }
}

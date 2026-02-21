import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShareDataToComponentsService {
  constructor() {}
  private data = new BehaviorSubject<string>('');
  dataObservable$ = this.data.asObservable();

  updateData(value: string) {
    this.data.next(value);
  }

  signalData = signal<string>('');

  //   updateSignalData(inputData: string) {
  //     this.signalData.set(inputData);
  //   }
}

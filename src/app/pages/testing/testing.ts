import { CommonModule } from '@angular/common';
import { Component, effect, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChangeInputControlColor } from '../../shared/directives/chginputcolor.directive';
import { ShareDataToComponentsService } from '../../core/services/sharedata.service';

@Component({
  selector: 'app-testing',
  imports: [CommonModule, ReactiveFormsModule, ChangeInputControlColor],
  templateUrl: './testing.html',
  styleUrl: './testing.css',
})
export class Testing implements OnInit {
  dataEmail: string = '';
  userForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private shareService: ShareDataToComponentsService,
  ) {
    this.userForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['initialVal', [Validators.required]],
    });
    // effect(() => {
    //   console.log('Username changed via signal:', this.shareService.signalData());
    // });
  }
  ngOnInit(): void {
    this.userForm.get('email')?.valueChanges.subscribe((value) => {
      console.log('Username changed:', value);
      this.shareService.updateData(value);
      //  this.shareService.signalData.set(value);
    });
    // React to signal changes (like on-change event)
  }
  onBtnClick() {
    if (!this.userForm.invalid) {
      alert(2);
      console.log(this.userForm.value.email);
    }
  }
}

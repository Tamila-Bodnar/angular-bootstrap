import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

function dateTimeValidator(control: AbstractControl): {[key: string]: boolean} | null {
  const start = new Date(control.value.dateTimeStart);
  const end = new Date(control.value.dateTimeEnd);

  if (start && end && start >= end) {

    return { dateTimeValidator: true};
  }

  return null;
}

@Component({
  selector: 'app-search-transfer',
  templateUrl: './search-transfer.component.html',
  styleUrls: ['./search-transfer.component.css']
})
export class SearchTransferComponent implements OnInit {

  public form!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      channel: ['', Validators.required],
      meetGreet: [false, Validators.required],
      dateTimeStart: ['', [Validators.required]],
      dateTimeEnd: ['', [Validators.required]],
      price: ['', Validators.required],
    }, {validators: dateTimeValidator});
  }

  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get channel(): FormControl {
    return this.form.get('channel') as FormControl;
  }

  get dateTimeStart(): FormControl {
    return this.form.get('dateTimeStart') as FormControl;
  }

  get dateTimeEnd(): FormControl {
    return this.form.get('dateTimeEnd') as FormControl;
  }

  get price(): FormControl {
    return this.form.get('price') as FormControl;
  }

  save(): void {
    const dateTimeStartUTC = new Date(this.form.value.dateTimeStart).toUTCString();
    const dateTimeEndUTC = new Date(this.form.value.dateTimeEnd).toUTCString();

    const formValue = {
      ...this.form.value,
      dateTimeStart: dateTimeStartUTC,
      dateTimeEnd: dateTimeEndUTC,
    };

    console.log(formValue);
  }

}

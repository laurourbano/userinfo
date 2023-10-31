import { Component } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {

  form: FormGroup = new FormGroup({});

  constructor(private _fb: UntypedFormBuilder) {
    this.form! = this._fb.group({
      name: '',
      email: '',
    });
  }

}

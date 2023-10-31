import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: [ './user-form.component.scss' ]
})
export class UserFormComponent {
  user: User = {
    name: '',
    email: ''
  }

  form: FormGroup = new FormGroup({});

  constructor(private _fb: NonNullableFormBuilder, private _service: UserService) {
    const { name, email } = this.user;
    this.form = this._fb.group({
      name: [ name, Validators.required ],
      email: [ email, [ Validators.required, Validators.email ] ]
    });

  }

  onSubmit() {
    console.log(this.form.value);
    return this.form.value;
  }


}

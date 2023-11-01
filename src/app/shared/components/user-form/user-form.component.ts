import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: [ './user-form.component.scss' ]
})
export class UserFormComponent {
  user!: User

  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [ Validators.required, Validators.email ])
  });

  constructor(private _fb: NonNullableFormBuilder, private _service: UserService, private route: ActivatedRoute, private router: Router) {
  }

  onSubmit() {
    console.log(this.form.value, '4');
    return this.form.value;
  }

}

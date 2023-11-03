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

  //popular o form com dados do usuario
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params[ 'id' ];
      if (id) {
        this._service.getUserById(id).subscribe((user: User) => {
          this.user = user;
          this.form.patchValue(user);
        });
      }
    });
  }

  //salvar o novo valor do usuario com update
  onSubmit() {
    if (this.form.valid) {
      const user = this.form.value;
      if (this.user?.id) {
        this._service.update(this.user.id, user).subscribe(() => {
          this.router.navigate([ '' ], { relativeTo: this.route });
        });
      } else {
        this._service.post(user).subscribe(() => {
          this.router.navigate([ '' ], { relativeTo: this.route });
        });
      }
    }
  }
  
  onCancel() {
    this.router.navigate([ '' ], { relativeTo: this.route });
  }

}

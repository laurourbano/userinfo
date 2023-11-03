import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: [ './user-edit.component.scss' ]
})
export class UserEditComponent {

  @Input() users!: User[];
  @Input() user!: User;

  constructor(private _service: UserService) {
    this.users = [];
    this.user = { name: '', email: '' };

  }

  getUserEdit(id: number) {
    this._service.getUserById(id).subscribe((user: User) => {
      this.user = user;
    });
  }

  onSubmit() {
    console.log(this.user);
  }

  onEdit(userId: number, user: User) {
    const index: number = this.users.findIndex((u) => u.id === userId);
    console.log('edit', index);
    if (index !== -1) {
      this._service.update(userId, user).subscribe(() => {
        this.users[ index ] = user;
      });
    }
  }

}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  styleUrls: [ './user-list.component.scss' ],
  templateUrl: './user-list.component.html',
})
export class UserListComponent {
  users: User[] = [];
  user!: User;

  displayedColumns: string[] = [ 'id', 'name', 'email', 'acoes' ];
  dataSource: User[] = [];
  index!: number;

  constructor(private _service: UserService, private route: ActivatedRoute, private router: Router) {
    this.getUsers();
  }

  getUsers() {
    this._service.getUsers().subscribe((users: User[]) => {
      this.users = users;
      this.dataSource = this.users; // add this line to update dataSource
    });
  }

  getUserById(id: number) {
    this._service.getUserById(id).subscribe((user: User) => {
      this.user = user;
    }
    );
  }

  onDelete(user: User) {
    this._service.delete(user.id!).subscribe(() => {
      return this.getUsers();
    }
    );
  }

  onEdit(userId: number) {
    const user = this.users.find((u) => u.id === userId);
    console.log('list', user)
    this.router.navigate([ `edit/${ user?.id }` ], { relativeTo: this.route });
  }

  onCreate() {
    console.log(this.router, this.route)
    this.router.navigate([ `create` ], { relativeTo: this.route });
  }
}

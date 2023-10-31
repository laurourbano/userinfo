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

  displayedColumns: string[] = [ 'id', 'name', 'email', 'acoes' ];
  dataSource: User[] = [];
  index!: number;

  constructor(private _service: UserService, private route: ActivatedRoute, private router: Router) {
    this.getUsers();
  }

  getUsers() {
    this._service.getUsers().subscribe((users) => {
      this.users = users as User[];
      this.dataSource = this.users; // add this line to update dataSource
    });
  }

  onDelete(user: User) {
    this._service.delete(user.id!).subscribe(() => {
      return this.getUsers();
    }
    );
  }

  onEdit(id: number, user: User) {
    const index = this.users.findIndex((u) => u.id === id);
    this._service.update(index, user).subscribe(() => {
      return this.getUsers();
    }
    );
  }

  editar(userId: number) {
    const user = this.users.find((u) => u.id === userId);
    console.log(user)
    this.router.navigate([ `edit/${ user?.id}` ], { relativeTo: this.route });
  }
}

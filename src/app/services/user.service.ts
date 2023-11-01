import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { endWith } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly Url: string = 'http://localhost:3000/users';

  constructor(private _http: HttpClient) { }

  getUsers() {
    return this._http.get<User[]>(this.Url);
  }

  getUser(id: number) {
    return this._http.get<User>(`${ this.Url }/${ id }`);
  }

  post(user: User) {
    return this._http.post<User>(this.Url, user);
  }

  update(id: number, user: User ) {
    return this._http.patch<User>(`${ this.Url }/${ id }`, user);
  }

  delete(id: number) {
    return this._http.delete<User>(`${ this.Url }/${ id }`);
  }
}

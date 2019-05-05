import { Component, Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  http: HttpClient;
  baseUrl: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl;
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'api/Users/GetUsers');
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'api/Users/GetUser/' + id);
  }

  postUser(user: User): Observable<User[]> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.post<User[]>(this.baseUrl + 'api/Users/PostUser', user, { headers });
  }

  putUser(user: User): Observable<User[]> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.put<User[]>(this.baseUrl + 'api/Users/PutUser/' + user.id, user, { headers });
  }
}

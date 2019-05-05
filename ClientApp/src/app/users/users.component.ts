import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {

  userForm: FormGroup;
  public users: User[];
  user: User = null;
  details: boolean = false;
  create: boolean = false;
  edit: boolean = false;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private service: UserService) {}

  ngOnInit(): void {
    this.initForm();
    this.getUsers();
  }

  initForm(): void {
    this.userForm = this.formBuilder.group({
      'id': ['', Validators.nullValidator],
      'name': ['', [Validators.required, Validators.maxLength(50)]],
      'age': ['', [Validators.required, Validators.min(0)]],
      'address': ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  getUsers(): void {
    this.service.getUsers().subscribe(result => {
      this.users = result;
    }, error => console.error(error));
  }

  getUser(id: number): void {
    this.service.getUser(id).subscribe(result => {
      this.user = result;
      this.updateUserToForm();
      this.details = true;
    }, error => {
      this.details = false;
      console.error(error)
    });
  }

  get f() { return this.userForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.userForm.invalid){
      return;
    }

    if (this.create){
      this.postUser();
    } else {
      this.putUser();
    }
  }

  postUser(): void {
    this.updateUserFromForm();
    this.service.postUser(this.user).subscribe(result => {
      this.users = result;
      this.create = false;
    }, error => console.error(error));
  }

  putUser(): void {
    this.updateUserFromForm();
    this.service.putUser(this.user).subscribe(result => {
      this.users = result;
      this.edit = false;
    }, error => console.error(error));
  }

  updateUserFromForm() {
    this.user.address = this.userForm.get('address').value;
    this.user.age = this.userForm.get('age').value;
    this.user.id = this.userForm.get('id').value;
    this.user.name = this.userForm.get('name').value;
  }

  updateUserToForm() {
    this.userForm.setValue({
      id: this.user.id,
      name: this.user.name,
      age: this.user.age,
      address: this.user.address
    });
  }

  closeModal() {
    this.details = false;
    this.edit = false;
    this.create = false;
    this.submitted = false;
  }

  newUser() {
    this.create = true;
    this.user = {} as User;
    this.user.id = 0;
    this.user.address = '';
    this.user.age = 0;
    this.user.name = '';  
    this.updateUserToForm();
  }

  editUser(user: User) {
    this.user = user;
    this.updateUserToForm();
    this.edit = true;
  }
}
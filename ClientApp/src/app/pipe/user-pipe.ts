import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'userSearch' })

export class UserPipe implements PipeTransform {
  transform(users: User[], searchText: string): User[] {
    
    if (searchText == null) return users;

    return users.filter(function(user){
      return user.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1 || user.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    })
  }
}
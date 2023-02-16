import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  initialInput: any = {};

  @Input() updateUser = {
    username: "",
    password: "",
    email: "",
    birthday: "",
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo():void {
    // this.updateUser.username = localStorage.getItem('user');
    console.log('esto es el this.updateuser');
    console.log(this.updateUser);
    console.log('esto es el local.storage(user)');
    console.log(localStorage.getItem('user'));

    
    // this.updateUser.email = mail != null ? mail: ''; 
  }

  updateUserInfo(): void {
    this.fetchApiData.editUser(this.updateUser).subscribe((result) => {
      console.log(result);
      this.snackBar.open("User profile has been succesfully updated", "OK", {
        duration: 2000,
      });
      if(this.user.username !== result.username) {
        localStorage.clear();
        this.router.navigate(["welcome"]);
        this.snackBar.open(
          "Please login using your new credentials",
          'OK',
          { duration: 2000, }
        );

      }
    })
  }

  deleteAccount(): void {
    if(confirm ("All your data will be deleted, are you sure?")) {
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
        localStorage.clear();

        this.router.navigate(["welcome"]).then(() => {
          this.snackBar.open(
            "You have succesfully deleted your account",
            "OK",
            {duration: 2000,}
          );
        });
      });
    };
  }

}

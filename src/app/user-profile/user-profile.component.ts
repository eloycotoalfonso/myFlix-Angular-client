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

  /**
   * This function gets the user info
   * @function getUserInfo
   * @returns an Object with user information
   */
  getUserInfo(): void {
    // this.updateUser.username = localStorage.getItem('user');
    
    this.fetchApiData.getUser().subscribe((result: any) => {
      this.user = result[0];
      // console.log(result[0]);
      this.updateUser.username = this.user.username;
      this.updateUser.email = this.user.email;
      this.updateUser.birthday = this.user.birth;
    });
  }

  /**
   * This function send the information currently in the state of the component to the backend to update the info
   * @function updateUserInfo
   * @retunrs Object with new information
   */

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

  /**
   * This function will delete all the user info
   * @function deleteAccount
   * @returns Confirmation message and a complete message
   */

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

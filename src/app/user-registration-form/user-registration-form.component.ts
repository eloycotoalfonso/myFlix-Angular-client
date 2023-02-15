import { Component, OnInit, Input } from '@angular/core';

//This import will close the dialog
import { MatDialogRef } from '@angular/material/dialog';

//This import brings in the API calls we have previously created
import { FetchApiDataService } from '../fetch-api-data.service';

//THis is used to display notifications to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { username: '', password: '', email: '', birthday: ''};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}
  
  ngOnInit(): void {}

  //This function is responsible for sending the form inputs to the backend

  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      //Logic for a successful user registration goes here
      this.dialogRef.close(); //this will close the modal
      console.log(result);
      this.snackBar.open(result,'OK',{
        duration: 2000
      });
    }, (result) =>{
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
  
}

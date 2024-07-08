import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  constructor(public snackBar: MatSnackBar) {
  }

  getErrorMessage(error: HttpErrorResponse) {
    console.log(error);
    let result: string = "Unkonwn error";
    if (error.message) {
      result = error.message;
    }
    switch (error.status) {
      case 0:
        result = "Could not connect to the server. Please try again later";
    }
    return result;
  }

  showError(error: HttpErrorResponse): void {
    let message: string = this.getErrorMessage(error);
    this.showMessage(message);
  }

  showMessage(message: string): void {
    this.snackBar.open(message, "dismiss", {
      duration: 5000,
    });
  }
}

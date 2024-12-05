import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ResponseHandlerService {

  constructor(private snackBar: MatSnackBar) { }

  handleSuccessForComicAdded(response: HttpResponse<any>): void {
    if (response.status >= 200 && response.status < 300) {
      const title = response.body?.title || 'the item';
      this.snackBar.open(`Comic ${response.body?.title} successfully added`, "Close",
      {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
    }
  }

  handleErrorForComicAdded(error: HttpErrorResponse): void {
    let errorMessage = 'An error occurred.';
    if (error.status === 400 && error.error?.errors) {
      const errorMessages = Object.values(error.error.errors).flat().join(' ');
      errorMessage = `Validation errors: ${errorMessages}`;
    } else if (error.status === 409) {
      errorMessage = 'Conflict: Resource already exists.';
    } else if (error.status === 404) {
      errorMessage = 'Resource not found.';
    } else if (error.status === 500) {
      errorMessage = 'Server error. Please try again later.';
    }
    this.snackBar.open(errorMessage, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}

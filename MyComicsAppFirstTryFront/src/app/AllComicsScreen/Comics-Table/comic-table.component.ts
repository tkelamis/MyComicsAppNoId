  import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComicService } from '../../Services/comic.service';
import { Comic } from '../../Shared/Models/Comic';
import { UserService } from '../../Services/user.service';
import { NavigationService } from '../../Services/navigation.service';

@Component({
  selector: 'app-comic-table',
  templateUrl: './comic-table.component.html',
  styleUrl: './comic-table.component.css'
})
export class ComicTableComponent {
  [x: string]: any;
  comics: Comic[] = [];
  userObserve: string = "";
  existingUserInLocalStorage: string | null = null;

  constructor(private comicService: ComicService,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private navigationService: NavigationService
  ) { }

  ngOnInit(): void {
    this.getAllComicsFromAPI();
    
    //add the user to the URL
    if (typeof window !== 'undefined') {
      if (!this.userService.userInLocalStorageExists()) {
        console.log("There is no logged in user registered in local storage ")
      }
      else {
        this.existingUserInLocalStorage = this.userService.retrieveSignedUpUserFromLocalStorage();
        if (this.existingUserInLocalStorage) {
          this.navigationService.addLoggedInUserToURL(this.existingUserInLocalStorage);
        }
        else {
          console.log("No value returned from the key in local storage")
        }
      }
    }
    
  }


  getAllComicsFromAPI(): void {
    this.comicService.getComics().subscribe((data: Comic[]) => {
      this.comics = data;
    });
  }

  onRefreshRequestedAfterAdd(event: { flag?: boolean, comic?: Comic }) {
    if (event.flag) {
      this.snackBarMessageAddSuccess(event.comic?.title);
      this.getAllComicsFromAPI();
    }
    else {
      this.snackBarMessageAddFailed(event.comic?.title);
    }
  }

  onRefreshRequestedAfterDelete(event: { flag?: boolean, comic?: Comic }) {
    if (event.flag) {
      this.snackBarMessageDeletionSuccess(event.comic?.title);
      this.getAllComicsFromAPI();
    }
    else {
      this.snackBarMessageDeletionFailed(event.comic?.title);
    }
  }



  snackBarMessageDeletionSuccess(textToAdd: any): void {
    const title = String(textToAdd);
    this.snackBar.open(`Comic "${title}" deleted successfully!`, undefined, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }

  snackBarMessageDeletionFailed(textToAdd: any): void {
    const title = String(textToAdd);
    this.snackBar.open(`Comic "${title}" deletion failed!`, undefined, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }

  snackBarMessageAddSuccess(textToAdd: any): void {
    const title = String(textToAdd);
    this.snackBar.open(`Comic "${title}" added successfully!`, undefined, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }

  snackBarMessageAddFailed(textToAdd: any): void {
    const title = String(textToAdd);
    this.snackBar.open(`Comic "${title}" added failed!`, undefined, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }



}

import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComicService } from '../../Services/comic.service';
import { Comic } from '../../Shared/Models/Comic';

@Component({
  selector: 'app-comic-table',
  templateUrl: './comic-table.component.html',
  styleUrl: './comic-table.component.css'
})
export class ComicTableComponent {
  comics: Comic[] = [];

  constructor(private comicService: ComicService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllComicsFromAPI();
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

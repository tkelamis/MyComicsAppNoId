import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Comic } from '../../../Shared/Models/Comic';
import { ComicService } from '../../../Services/comic.service';

@Component({
  selector: 'app-delete-comic',
  templateUrl: './delete-comic.component.html',
  styleUrl: './delete-comic.component.css'
})
export class DeleteComicComponent {
  @Input() comic: any;
  @Output() refreshRequested = new EventEmitter<{ flag: boolean, comic?: Comic }>();
  comics: Comic[] = [];

  showConfirm: boolean = false;

  constructor(private comicService: ComicService, private router: Router) { }

  ngOnInit(): void {
    this.getAllComicsFromAPI();
  }

  getAllComicsFromAPI(): void {
    this.comicService.getComics().subscribe((data: Comic[]) => {
      this.comics = data;
    });
  }

  toggleConfirm() {
    this.showConfirm = !this.showConfirm;
  }

  confirmDelete() {
    this.deleteComic(this.comic);
    this.showConfirm = false;
  }

  cancelDelete() {
    console.log('Delete action was canceled');
    this.showConfirm = false;
  }

  deleteComic(comic: Comic) {
    if (comic && comic.id) {
      this.comicService.deleteComicFromDatabase(comic.id.toString()).subscribe(
        () => {
          console.log("Comic deleted successfully");
          this.refreshRequested.emit({ flag: true, comic });
        },
        (error) => {
          console.error('Error deleting comic:', error);
          this.refreshRequested.emit({ flag: false, comic });
        }
      );
    } else {
      console.error('Invalid comic or comic ID.');
    }
  }
}

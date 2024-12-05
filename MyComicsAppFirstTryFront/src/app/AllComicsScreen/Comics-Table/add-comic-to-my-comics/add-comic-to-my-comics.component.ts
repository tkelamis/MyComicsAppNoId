import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comic } from '../../../Shared/Models/Comic';
import { ComicService } from '../../../Services/comic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-comic-to-my-comics',
  templateUrl: './add-comic-to-my-comics.component.html',
  styleUrl: './add-comic-to-my-comics.component.css'
})
export class AddComicToMyComicsComponent {
  @Input() comic: any;
  @Output() refreshRequested = new EventEmitter<{ flag: boolean, comic?: Comic }>();
  comics: Comic[] = [];

  showAddConfirm: boolean = false;

  constructor(private comicService: ComicService, private router: Router) { }

  ngOnInit(): void {
  }

  toggleAddConfirm() {
    this.showAddConfirm = !this.showAddConfirm;
  }

  confirmAdd() {
    this.AddComic(this.comic);
    this.showAddConfirm = false;
  }

  cancelAdd() {
    console.log('Delete action was canceled');
    this.showAddConfirm = false;
  }

  AddComic(comic: Comic) {
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

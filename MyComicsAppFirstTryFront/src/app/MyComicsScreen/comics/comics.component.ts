import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Comic } from '../../Shared/Models/Comic';
import { ComicService } from '../../Services/comic.service';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css']
})
export class ComicsComponent implements OnInit {
  comics: Comic[] = [];
  selectedComic?: Comic;

  constructor(private comicService: ComicService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getComicByIdFromAPI();
  }

  getComicByIdFromAPI(): void {
    this.comicService.getComics().subscribe((data: Comic[]) => {
      this.comics = data;
    });
  }

  navigateToDetails(comic: Comic): void {
    this.router.navigate(['/comic', comic.id], { queryParams: { action: "details" } });
  }

  navigateToInformations(comic: Comic): void {
    this.router.navigate(['/comic', comic.id], { queryParams: { action: "edit" } });
  }
}

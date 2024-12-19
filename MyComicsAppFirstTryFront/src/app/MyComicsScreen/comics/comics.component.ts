import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Comic } from '../../Shared/Models/Comic';
import { ComicService } from '../../Services/comic.service';
import { UserService } from '../../Services/user.service';
import { NavigationService } from '../../Services/navigation.service';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css']
})
export class ComicsComponent implements OnInit {
  comics: Comic[] = [];
  selectedComic?: Comic;
  userObserve: string = '';

  constructor(private comicService: ComicService,
    private router: Router,
    private userService: UserService,
    private navigationService: NavigationService
  ) { }

  ngOnInit(): void {
    this.getComicByIdFromAPI();

    /*//get the user from the observable
    this.userService.user$.subscribe((user => {
      this.userObserve = user;
    }))
      
    //add the user to the URL
    this.navigationService.addLoggedInUserToURL(this.userObserve);*/

    if (typeof window !== 'undefined') {
      this.navigationService.addLoggedInUserFromStorageIfExistsToURL();
    }
  }

  getComicByIdFromAPI(): void {
    this.comicService.getComics().subscribe((data: Comic[]) => {
      this.comics = data;
    });
  }

  navigateToDetails(comic: Comic): void {
    this.router.navigate(['/home', comic.id], { queryParams: { action: "details" } });
  }

  navigateToInformations(comic: Comic): void {
    this.router.navigate(['/comic', comic.id], { queryParams: { action: "edit" } });
  }
}

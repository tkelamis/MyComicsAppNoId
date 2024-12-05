import { Component, Input, OnInit } from '@angular/core';
import { Comic } from '../Shared/Models/Comic';
import { ActivatedRoute, Router } from '@angular/router';
import { ComicService } from '../Services/comic.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comic-details',
  templateUrl: './comic-details.component.html',
  styleUrls: ['./comic-details.component.css']
})
export class ComicDetailsComponent implements OnInit {
  action: string = '';
  disabledInputs: boolean = true;

  myReactiveForm = this.formBuilder.group({
    Title: ['',[Validators.required]],
    Pages:[0]
  });

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private comicService: ComicService
  ) { }


  ngOnInit(): void {

    this.action = this.getActionValueFromUrl();

    const comicId = this.getComicIdFromUrl();

    this.getComicFromApiAndRenderIt(comicId);
  }



  getActionValueFromUrl(): string {
    let action = '';
    this.route.queryParams.subscribe(params => {
      action = params['action'];
    });
    return action;
  }
  
  getComicIdFromUrl(): string {
    return this.route.snapshot.paramMap.get('Id')!;
  }
  

  getComicFromApiAndRenderIt(id: string) {
    let comicFromAPI = {};
    this.comicService.getComicById(id).subscribe((data: Comic) => {
      comicFromAPI = data;
      this.fillComicForm(comicFromAPI);
    });
  }

  fillComicForm(comic: Comic): void {
    if (comic) {
      this.myReactiveForm.patchValue({
        Title: comic.title,
        Pages: comic.pages
      });
    }
  }
}

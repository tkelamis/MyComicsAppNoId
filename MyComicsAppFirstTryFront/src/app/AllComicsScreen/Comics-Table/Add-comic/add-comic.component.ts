import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { url } from 'inspector';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Comic } from '../../../Shared/Models/Comic';
import { ComicService } from '../../../Services/comic.service';



@Component({
  selector: 'app-add-comic',
  templateUrl: './add-comic.component.html',
  styleUrl: './add-comic.component.css'
})
export class AddComicComponent implements OnInit {
  comic: Comic = {};

  constructor(private formBuilder: FormBuilder,
    private comicService: ComicService,
    private snackBar: MatSnackBar
  ) { }

  myReactiveForm = this.formBuilder.group({
    Title: [null, [Validators.required]],
    Pages: [0],
  })


  ngOnInit() {
  }


  registerComicToBackEnd(): void {
    
    const comicToAdd = this.setComicFromFormValues();

    this.sendComicToBackEnd(comicToAdd);
    
  }

  sendComicToBackEnd(comicToSend: Comic): void {
    this.comicService.postComicToBackEnd(comicToSend).subscribe(
      (response: HttpResponse<Comic>) => {
        if (response.status === 201) {
          this.snackBar.open(`Comic "${response.body?.title}" added successfully!`, 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        }
      },
      error => {
        this.snackBar.open('Failed to add comic.', 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    );
  }

  setComicFromFormValues(): Comic {
    if (this.myReactiveForm.value) {
      const valuesPassedFromFields = this.myReactiveForm.value;
      this.comic.title = valuesPassedFromFields.Title;
      this.comic.pages = valuesPassedFromFields.Pages;
    }
    return this.comic;
  }
}

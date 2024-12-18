import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ComicsComponent } from './MyComicsScreen/comics/comics.component';
import { ComicDetailsComponent } from './comic-details/comic-details.component';
import { SignUpComponent } from './home-page/sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './home-page/home-page.component';
import { LayoutComponent } from './layout/layout.component';
import { AddComicComponent } from './AllComicsScreen/Comics-Table/Add-comic/add-comic.component';
import { ComicTableComponent } from './AllComicsScreen/Comics-Table/comic-table.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeleteComicComponent } from './AllComicsScreen/Comics-Table/Delete-comic/delete-comic.component';
import { AddComicToMyComicsComponent } from './AllComicsScreen/Comics-Table/add-comic-to-my-comics/add-comic-to-my-comics.component';
import { LogInComponent } from './home-page/log-in/log-in.component';


@NgModule({
  declarations: [
    AppComponent,
    ComicsComponent,
    ComicDetailsComponent,
    HomePageComponent,
    LayoutComponent,
    AddComicComponent,
    ComicTableComponent,
    DeleteComicComponent,
    AddComicToMyComicsComponent,
    SignUpComponent,
    LogInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [

    provideClientHydration(),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

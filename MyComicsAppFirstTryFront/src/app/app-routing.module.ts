import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComicDetailsComponent } from './comic-details/comic-details.component';
import { ComicsComponent } from './MyComicsScreen/comics/comics.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LayoutComponent } from './layout/layout.component';
import { AddComicComponent } from './AllComicsScreen/Comics-Table/Add-comic/add-comic.component';
import { ComicTableComponent } from './AllComicsScreen/Comics-Table/comic-table.component';
import { DeleteComicComponent } from './AllComicsScreen/Comics-Table/Delete-comic/delete-comic.component'

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: 'home', component: HomePageComponent },
      { path: 'home/addComic', component: AddComicComponent },
      { path: 'comic', component: ComicsComponent },
      { path: 'comic/:Id', component: ComicDetailsComponent },
      { path: 'comic_list', component: ComicTableComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

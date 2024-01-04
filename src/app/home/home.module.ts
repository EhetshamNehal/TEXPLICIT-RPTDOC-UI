import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SubtopicComponent } from '../shared/components/subtopic/subtopic.component';
import { SharedModule } from '../shared/shared.module';
import { environment } from 'src/environments/environment';
import { HomeFilterDialogComponent } from './modal-dialog/home-filter-dialog/home-filter-dialog.component';
import { HomeCardComponent } from './home-card/home-card.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      seo: environment.seoData.home
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    SharedModule
  ],
  declarations: [
    HomeComponent,
    SubtopicComponent,
    HomeFilterDialogComponent,
    HomeCardComponent,
  ]
})
export class HomeModule { }

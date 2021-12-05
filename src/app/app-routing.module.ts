import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { SearchTransferComponent } from './features/search-transfer/search-transfer.component';
import { TravelOptionsComponent } from './features/travel-options/travel-options.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'search-transfer',
        component: SearchTransferComponent,
      },
      {
        path: 'travel-options',
        component: TravelOptionsComponent,
      },
    ],
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

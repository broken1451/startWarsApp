import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { SearchComponent } from './search/search.component';
import { PlanetsComponent } from './planets/planets.component';
import { SpeciesComponent } from './species/species.component';
import { VehiclesComponent } from './vehicles/vehicles.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'planets',
        component: PlanetsComponent,
      },
      {
        path: 'species',
        component: SpeciesComponent,
      },
      {
        path: 'vehicles',
        component: VehiclesComponent,
      },
      {
        path: 'details/:id',
        component: DetailsComponent,
      },
      {
        path: 'search/:termino',
        component: SearchComponent,
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

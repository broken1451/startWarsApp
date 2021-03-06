import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DetailsComponent } from './details/details.component';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { PlanetsComponent } from './planets/planets.component';
import { SpeciesComponent } from './species/species.component';
import { VehiclesComponent } from './vehicles/vehicles.component';


@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    DetailsComponent,
    SearchComponent,
    PlanetsComponent,
    SpeciesComponent,
    VehiclesComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule, FormsModule
  ]
})
export class PagesModule { }

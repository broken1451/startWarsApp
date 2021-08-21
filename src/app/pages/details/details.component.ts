import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { StarWarsService } from '../services/star-wars.service';
import { Observable, of } from 'rxjs';
import {Location} from '@angular/common';
import { People } from '../models/response.intefaces';
import { PlanetsService } from '../services/planets.service';
import { SpeciesService } from '../services/species.service';
import { VehiclesService } from '../services/vehicles.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public imgCharacter!: string;
  public character!: any;
  public loading = true;

  constructor( private activateRoute: ActivatedRoute,
               private starWarsService: StarWarsService,
               private location: Location,
               private planetsService: PlanetsService,
               private specieService: SpeciesService,
               private vehicleService: VehiclesService) { }

  ngOnInit(): void {

    this.activateRoute.params.pipe(
      switchMap(({id}) => {
        const idLocalstorage = JSON.parse(localStorage.getItem('character') || localStorage.getItem('planet') ||  localStorage.getItem('vehicle') || localStorage.getItem('species') || id);
        this.imgCharacter = idLocalstorage.img;
        if (localStorage.getItem('character')) {
          return this.getCharacterById(idLocalstorage.id);
        } else if (localStorage.getItem('planet')) {
          return this.getPlanetById(idLocalstorage.id);
        } else if ( localStorage.getItem('species') ) {
          return this.getSpecieById(idLocalstorage.id);
        } else {
          return this.getVehicleById(idLocalstorage.id);
        }
      
      })
    ).subscribe((character) => {
      this.character = character;
      this.loading = false;
    });
  }

  getCharacterById(id: string): Observable<People>{
    return this.starWarsService.getCharacterById(id);
  }

  getPlanetById(id: string): Observable<any>{
    return this.planetsService.getPlanetById(id);
  }

  getSpecieById(id: string): Observable<any>{
    return this.specieService.getSpecieById(id);
  }

  getVehicleById(id: string): Observable<any>{
    return this.vehicleService.getVehicleById(id);
  }

  back(): void{
    localStorage.removeItem('character');
    localStorage.removeItem('planet');
    localStorage.removeItem('vehicle');
    localStorage.removeItem('species');
    this.character = null;
    this.location.back();
  }

}

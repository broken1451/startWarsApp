import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlanetsService } from '../services/planets.service';
import { Planets } from '../models/response.intefaces';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss']
})
export class PlanetsComponent implements OnInit {

  public planets: Planets[] = []

  constructor(private planetService: PlanetsService, private router: Router) { }

  ngOnInit(): void {
    this.getAllPlanets();
  }


  async getAllPlanets( page = '1'): Promise<void>{
    try {
      const resp = await this.planetService.getAllCharacter()?.toPromise();
      resp[0].img = 'https://starwars-visualguide.com/assets/img/placeholder.jpg'
      this.planets = resp;
      // this.characters = resp;
      // this.loading = false;
    } catch (error) {
      console.log(error);
    }
  }

}

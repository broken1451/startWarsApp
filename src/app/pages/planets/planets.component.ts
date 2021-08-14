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
  public page = 1;
  public loading = true;
  public showBtn = 'https://starwars-visualguide.com/assets/img/planets/';

  constructor(private planetService: PlanetsService, private router: Router) { }

  ngOnInit(): void {
    this.getAllPlanets();
  }


  async getAllPlanets( page = '1'): Promise<void>{
    try {
      const resp = await this.planetService.getAllPlanets(String(page))?.toPromise();
      resp.map((planet: any) =>{
        const url = planet?.img?.split('/');
        const id = url![6].split('.');
        const idImg = id![0];
      
        if (idImg == '1' || idImg == '20'|| idImg == '22' || idImg == '23'  || idImg == '24'  || idImg == '25'  || idImg == '26'  || idImg == '27'
        || idImg == '28'  || idImg == '29' || idImg == '30' || idImg == '31' || idImg == '32' || idImg == '33' || idImg == '34' || idImg == '35' || idImg == '36'
        || idImg == '37' || idImg == '38' || idImg == '39' || idImg == '40' || idImg == '41' || idImg == '42' || idImg == '43' || idImg == '44' || idImg == '45'
        || idImg == '46' || idImg == '47' || idImg == '48' || idImg == '49' || idImg == '50' || idImg == '51' || idImg == '52' || idImg == '53' || idImg == '54'
        || idImg == '55' || idImg == '56' || idImg == '57' || idImg == '58' || idImg == '59' || idImg == '60') {
          planet.img = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';
        }
      })
      this.planets = resp;
      this.loading = false;
      console.log(this.planets);
      // this.characters = resp;
      // this.loading = false;
    } catch (error) {
      console.log(error);
    }
  }


  next(num: number): void{
    this.loading = true;
    this.page = this.page + num;
    console.log(this.page);
    if (this.page >= 7) {
      this.page = 6;
      this.getAllPlanets(String(this.page));
      return;
    }
    this.getAllPlanets(String(this.page));
  }

  previous(num: number): void{
    this.loading = true;
    this.page =  this.page - (-num);
    if (  this.page === 0) {
      this.page = 1;
      this.loading = false;
      return;
    }
    this.getAllPlanets(String(this.page));
  }

}

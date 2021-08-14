import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Planets, PlanetsResponse } from '../models/response.intefaces';


@Injectable({
  providedIn: 'root'
})
export class PlanetsService {

  constructor(private httClient: HttpClient) { }



  public getAllPlanets(page?: string): any{
    try {
      const params = new HttpParams().set('page', String(page));
      return this.httClient.get<PlanetsResponse>(`${environment.baseUrl}/planets`, {params}).pipe(
        map(planets => {
          console.log(planets);
          // return planets
          return this.planetSmall(planets);
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  private planetSmall(res: PlanetsResponse): Planets[] {
    const planets: any[] = res.results.map((planets: any) => {
      const url = planets?.url?.split('/');
      // tslint:disable-next-line: no-non-null-assertion
      const id = url![5];
      const picPlanets = `https://starwars-visualguide.com/assets/img/planets/${id}.jpg`;
      return {
       id,
       name: planets.name,
       img: picPlanets,
       climate: planets.climate,
       orbital_period: planets.orbital_period,
       gravity: planets.gravity,
       terrain: planets.terrain,
      };
    });
    return planets;
  }



}

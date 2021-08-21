import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SpeciesService {

  constructor(private httClient: HttpClient) {}


  public getAllSpecies(page?: string): any{
    try {
      const params = new HttpParams().set('page', String(page));
      return this.httClient.get<any>(`${environment.baseUrl}/species`,
       {params}
      ).pipe(
        map(species => {
          return this.planetSpecies(species);
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  private planetSpecies(res: any): any[] {
    // tslint:disable-next-line: no-shadowed-variable
    const species: any[] = res.results.map((species: any) => {
      const url = species?.url?.split('/');
      // tslint:disable-next-line: no-non-null-assertion
      const id = url![5];
      const picSpecies = `https://starwars-visualguide.com/assets/img/species/${id}.jpg`;
      return {
       id,
       name: species.name,
       average_height: species.average_height,
       average_lifespan: species.average_lifespan,
       img: picSpecies,
       designation: species.designation,
       eye_colors: species.eye_colors,
       language: species.language,
      };
    });
    return species;
  }



  public getSpecieById(id: string): any{
    try {
      return this.httClient.get<any>(`${environment.baseUrl}/species/${id}`).pipe(
        map(specie => {
          return specie;
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

}

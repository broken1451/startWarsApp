import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StartWarPeopleResponse, People } from '../models/response.intefaces';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StarWarsService {

  constructor(private httClient: HttpClient) { }

 public getAllCharacter(page: string): any{
    try {
      const params = new HttpParams().set('page', page);
      return this.httClient.get<StartWarPeopleResponse>(`${environment.baseUrl}/people`, {params}).pipe(
        map(people => {
          return this.peopleSmall(people);
        })
      );
    } catch (error) {
      console.log(error);
    }
}

  public getCharacterById(id: string): any{
    try {
      return this.httClient.get<People>(`${environment.baseUrl}/people/${id}`).pipe(
        map(people => {
          return people;
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  public searchCharacter(termino: string): any{
    try {
      const params = new HttpParams().set('search', termino);
      return this.httClient.get<any>(`${environment.baseUrl}/people`, {params}).pipe(
        map(people => {
          return this.peopleSearch(people);
        })
      );
    } catch (error) {
      console.log(error);
    }
  }


  private peopleSmall(res: StartWarPeopleResponse): People[] {
    const character: People[] = res.results.map((people) => {
      const url = people?.url?.split('/');
      // tslint:disable-next-line: no-non-null-assertion
      const id = url![5];
      const pic = `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
      return {
       id,
       name: people.name,
       birth_year: people.birth_year,
       gender: people.gender,
       img: pic
      };
    });
    return character;
  }

  private peopleSearch(res: StartWarPeopleResponse): People[] {
    const character: People[] = res.results.map((people) => {
      const url = people?.url?.split('/');
      // tslint:disable-next-line: no-non-null-assertion
      const id = url![5];
      const pic = `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
      return {
       id,
       name: people.name,
       birth_year: people.birth_year,
       gender: people.gender,
       img: pic
      };
    });
    return character;
  }
}

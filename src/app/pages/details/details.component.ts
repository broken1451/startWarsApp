import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { StarWarsService } from '../services/star-wars.service';
import { Observable } from 'rxjs';
import {Location} from '@angular/common';
import { People } from '../models/response.intefaces';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public imgCharacter!: string;
  public character!: People;

  constructor(private activateRoute: ActivatedRoute, private starWarsService: StarWarsService, private location: Location) { }

  ngOnInit(): void {

    this.activateRoute.params.pipe(
      switchMap(({id}) => {
        const idLocalstorage = JSON.parse(localStorage.getItem('character') || id);
        this.imgCharacter = idLocalstorage.img;
        return this.getCharacterById(idLocalstorage.id);
      })
    ).subscribe((character) => {
      this.character = character;
      console.log({character});
    });
  }

  getCharacterById(id: string): Observable<People>{
    return this.starWarsService.getCharacterById(id);
  }

  back(): void{
    this.location.back();
  }

}

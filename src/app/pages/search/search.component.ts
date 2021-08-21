import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { People } from '../models/response.intefaces';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { StarWarsService } from '../services/star-wars.service';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public characters: People[] = [];
  public termino!: string;
  public loading = false;

  constructor(private location: Location, private activatedRoute: ActivatedRoute,
              private router: Router, private starwarService: StarWarsService) {
                router.events.pipe(
                  filter(event => {
                    // console.log({event})
                    return event instanceof NavigationEnd;
                  })
              )
                  .subscribe(event => {
                      // console.log(event);
                  });

  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap(({termino}) => {
        setTimeout(() => {
          this.termino = termino;
        }, 200);
        return this.buscar(termino);
      })
    ).subscribe((res) => {
      if (res.length === 0) {
        this.loading = false;
        this.characters = [];
      }else {
        this.loading = true;
        this.characters = res;
      }
    });
  }

  back(): void{
    this.location.back();
  }


  buscar(termino: string): Observable<People[]>{
   return this.starwarService.searchCharacter(termino);
  }
}

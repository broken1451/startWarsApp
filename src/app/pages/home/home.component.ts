import { Component, OnInit } from '@angular/core';
import { StarWarsService } from '../services/star-wars.service';
import { People } from '../models/response.intefaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public page = 1;
  public characters: People[] = [];
  public loading = true;

  constructor(private starWarService: StarWarsService, private router: Router) { }

  ngOnInit(): void {
    this.getAllCharacter();
  }

  async getAllCharacter( page = '1'): Promise<void>{
    try {
      const resp = await this.starWarService.getAllCharacter(String(page))?.toPromise();
      this.characters = resp;
      this.loading = false;
    } catch (error) {
      console.log(error);
    }
  }

  next(num: number): void{
    this.loading = true;
    this.page = this.page + num;
    if (this.page >= 10) {
      return;
    }
    this.getAllCharacter(String(this.page));
  }

  previous(num: number): void{
    this.loading = true;
    this.page =  this.page - (-num);
    if (  this.page === 0) {
      this.page = 1;
      this.loading = false;
      return;
    }
    this.getAllCharacter(String(this.page));
  }

  goToDetails(character: People): void{
    localStorage.setItem('character',JSON.stringify(character))
    this.router.navigate(['/homeStar/details/', character.id ]);
  }

}

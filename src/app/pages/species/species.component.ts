import { Component, OnInit } from '@angular/core';
import { SpeciesService } from '../services/species.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.scss']
})
export class SpeciesComponent implements OnInit {

  public species: any[] = [];
  public page = 1;
  public loading = true;

  constructor(private speciesService: SpeciesService, private router: Router) { }

  ngOnInit(): void {
    this.getAllSpecies();
  }

  async getAllSpecies(page = '1'): Promise<void>{
     try {
      const resp = await this.speciesService.getAllSpecies(String(page))?.toPromise();
      this.species = resp;
      this.loading = false;
     } catch (error) {
       console.log(error);
     }
  }

  next(num: number): void{
    this.loading = true;
    this.page = this.page + num;
    console.log(this.page);
    if (this.page >= 5) {
      this.page = 4;
      this.loading = false;
      return;
    }
    this.getAllSpecies(String(this.page));
  }

  previous(num: number): void{
    this.loading = true;
    this.page =  this.page - (-num);
    if (  this.page === 0) {
      this.page = 1;
      this.loading = false;
      return;
    }
    this.getAllSpecies(String(this.page));
  }

  goToDetails(specie: any): void{
    console.log(specie)
    localStorage.setItem('species', JSON.stringify(specie))
    this.router.navigate(['/homeStar/details/', specie.id ]);
  }

}

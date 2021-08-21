import { Component, OnInit } from '@angular/core';
import { VehiclesService } from '../services/vehicles.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {

  public vehicles: any[] = [];
  public page = 1;
  public loading = true;
  public showBtn = 'https://starwars-visualguide.com/assets/img/vehicles/'

  constructor(private vehicleService: VehiclesService, private router: Router) { }

  ngOnInit(): void {
    this.getAllVehicles();
  }


  async getAllVehicles(page = '1'): Promise<void>{
    try {
     const resp = await this.vehicleService.getAllVehicles(String(page))?.toPromise();
     resp.map((vehicle: any)=>{
      const url = vehicle?.img?.split('/');
      const id = url![6].split('.');
      const idImg = id![0];
      if (idImg == '44' || idImg == '45'|| idImg == '46' || idImg == '50'  || idImg == '51' || idImg == '53'  || idImg == '54'  || idImg == '55'
      || idImg == '56'  || idImg == '57' || idImg == '60' || idImg == '62' || idImg == '67' || idImg == '69' || idImg == '70' || idImg == '71' || idImg == '72'
      || idImg == '73' || idImg == '76') {
        vehicle.img = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';
      }
     });
     this.vehicles = resp;
     this.loading = false;
    } catch (error) {
      console.log(error);
    }
 }

 next(num: number): void{
   this.loading = true;
   this.page = this.page + num;
   console.log(this.page)
   console.log(this.page);
   if (this.page >= 5) {
     this.page = 4;
     this.loading = false;
     return;
   }
   this.getAllVehicles(String(this.page));
 }

 previous(num: number): void{
   this.loading = true;
   this.page =  this.page - (-num);
   if (  this.page === 0) {
     this.page = 1;
     this.loading = false;
     return;
   }
   this.getAllVehicles(String(this.page));
 }

 goToDetails(vehicle: any): void{
   console.log(vehicle)
   localStorage.setItem('vehicle', JSON.stringify(vehicle))
   this.router.navigate(['/homeStar/details/', vehicle.id ]);
 }

}

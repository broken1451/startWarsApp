import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  constructor(private httClient: HttpClient) {}


  public getAllVehicles(page?: string): any{
    try {
      const params = new HttpParams().set('page', String(page));
      return this.httClient.get<any>(`${environment.baseUrl}/vehicles`,
       {params}
      ).pipe(
        map(vehicles => {
          return this.smallVehicles(vehicles);
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  private smallVehicles(res: any): any[] {
    // tslint:disable-next-line: no-shadowed-variable
    const vehicles: any[] = res.results.map((vehicles: any) => {
      const url = vehicles?.url?.split('/');
      // tslint:disable-next-line: no-non-null-assertion
      const id = url![5];
      const picVehicle = `https://starwars-visualguide.com/assets/img/vehicles/${id}.jpg`;
      return {
       id,
       name: vehicles.name,
       cargo_capacity: vehicles.cargo_capacity,
       consumables: vehicles.consumables,
       img: picVehicle,
       cost_in_credits: vehicles.cost_in_credits,
       crew: vehicles.crew,
       manufacturer: vehicles.manufacturer,
       model: vehicles.model,
       passengers: vehicles.passengers,
      };
    });
    return vehicles;
  }



  public getVehicleById(id: string): any{
    try {
      return this.httClient.get<any>(`${environment.baseUrl}/vehicles/${id}`).pipe(
        map(vehicle => {
          return vehicle;
        })
      );
    } catch (error) {
      console.log(error);
    }
  }
}

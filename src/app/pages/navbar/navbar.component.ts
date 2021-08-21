import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public termino = '';
  @ViewChild('txtSearch') txtSearch!: ElementRef<HTMLInputElement>;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  async search(){
    const valor = this.txtSearch.nativeElement.value;
    if (valor.trim().length === 0) {
      return;
    }
    this.router.navigate(['/homeStar/search', valor]);
    // this.termino = '';
    // this.txtSearch.nativeElement.value = '';
  }




}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Nationalite } from '../../models/nationalite.model';
import { NationaliteService } from '../../_services/nationaliteService/nationalite.service';

@Component({
  templateUrl: 'forms.component.html'
})
export class FormsComponent implements OnInit{

  constructor(private nationaliteService: NationaliteService,
    private router: Router) {}

  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }

  nationalites:any;
  nationalite: Nationalite = new Nationalite();



  ngOnInit() {
    this.getNationalites();
  }

  getNationalites(){
    this.nationaliteService.getNationalites().subscribe(res => {
      this.nationalites = res;
    });
  }

  onSubmit() {
    console.log(this.nationalite)
    this.nationaliteService.createNationalite(this.nationalite).subscribe(data => {
      this.nationalite = new Nationalite();
      this.getNationalites();
      this.gotoList();
    }, 
    error => console.log(error));
  }

  insertNationalite(): void {
    const data = {
      libelle: this.nationalite.libelle,
    };
    this.nationaliteService.createNationalite(data).subscribe(res => {
      console.log(res);
      this.getNationalites();
      this.gotoList();
    });
  }

  gotoList() {
    this.router.navigate(['/nationalite/tables']);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Nationalite } from '../../models/nationalite.model';
import { NationaliteService } from '../../_services/nationaliteService/nationalite.service';


@Component({
  templateUrl: 'tables.component.html'
})
export class TablesComponent implements OnInit {
  nationalites:any;
  nationalite: Nationalite = new Nationalite();

  constructor(private nationaliteService: NationaliteService,
    private router: Router) {}

  ngOnInit() {
    this.getNationalites();
  }

  getNationalites(){
    this.nationaliteService.getNationalites().subscribe(res => {
      this.nationalites = res;
      console.log(res);
    });
  }

  deleteNationalite(id: number) {
    this.nationaliteService.deleteNationalite(id)
      .subscribe(
        data => {
          console.log(data);
          this.getNationalites();
        },
        error => console.log(error));
        alert(" this nationalite is already used ");
  }

  onSubmit() {
    this.nationaliteService.createNationalite(this.nationalite).subscribe(data => {
      console.log(data)
      this.nationalite = new Nationalite();
      this.getNationalites();
    }, 
    error => console.log(error));
  }

}

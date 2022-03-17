import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { Router } from '@angular/router';
import { RecettesService } from 'src/app/services/recettes.service';
import { Recette } from 'src/app/models/recette';

@Component({
  selector: 'app-home-light',
  templateUrl: './home-light.component.html',
  styleUrls: ['../../../assets/css/home-light.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class HomeLightComponent implements OnInit {

  @ViewChild('example') example!: ElementRef;


  recettes: Recette[] = [];
  recettesCarroussel: Recette[] = [];


  constructor(private router: Router, private elementRef: ElementRef, private recetteService: RecettesService) {
  }

  ngOnInit(): void {
    this.recetteService.findAll().subscribe(response => {
      let counter = 0;
      response.forEach((value, index) => {


        if (index > 2) {
          return;
        }

        if (counter < 2) {
          this.recettes.push(value);
        }
        counter++;
      });
    })

    this.recetteService.recettesCarrousel().subscribe(response => {
      this.recettesCarroussel = response;
    })
  }

  getImage(file: string): string {
    return this.recetteService.getImage(file);
  }

  btnClickHome() {
    this.router.navigate(['']);
  }

  btnClickDisney() {
    this.router.navigate(['/disney']);
  }
  btnClickNaruto() {
    this.router.navigate(['/naruto']);
  }
  btnClickMarvel() {
    this.router.navigate(['/marvel']);
  }
  btnClickHarryPotter() {
    this.router.navigate(['/harrypotter']);
  }
  btnClickWowCraft() {
    this.router.navigate(['/wowcraft']);
  }

}

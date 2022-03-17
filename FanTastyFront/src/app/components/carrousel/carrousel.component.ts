import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {RecettesService} from "../../services/recettes.service";
import {Recette} from "../../models/recette";

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CarrouselComponent implements OnInit, AfterViewChecked {

  recettes: Recette[] = [];

  @ViewChildren('children') children!: QueryList<ElementRef>;

  constructor(private recetteService: RecettesService) {
  }

  ngAfterViewChecked(): void {
    this.children.forEach((element, index, children) => {
      element.nativeElement.childNodes.forEach((value: Element, index: number, childrenNodes: Element[]) => {
        if (value.nodeType != 8) {
          value.addEventListener("click", function (event) {//add a click event

            childrenNodes.forEach((elementT: Element) => {
              if (elementT.nodeType != 8) {
                elementT.classList.remove('panel_active')
              }
            });
            value.classList.add("panel_active");
          });
        }
      })//
    })
  }

  ngOnInit(): void {
    this.recetteService.recettesCarrousel().subscribe(response => this.recettes = response);
  }

  getImage(file: string): string {
    return this.recetteService.getImage(file);
  }

}

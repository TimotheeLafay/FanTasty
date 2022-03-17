import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Recette } from 'src/app/models/recette';
import { SearchedTag } from 'src/app/models/searchedTag';
import { RecettesService } from 'src/app/services/recettes.service';
import { Utils } from "../../core/Utils";

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['../../../assets/css/home-light.component.css']
})
export class SearchFormComponent implements OnInit {

  searchForm: FormGroup
  search: boolean = false;
  searched: boolean = false;

  lstDifficulte: Array<any> = [
    { name: 'Très facile', value: '1' },
    { name: 'Facile', value: '2' },
    { name: 'Moyen', value: '3' },
    { name: 'Difficile', value: '4' }
  ];

  lstTypePlat: Array<any> = [
    { name: 'Entree', value: 'Entrée' },
    { name: 'Plat', value: 'Plat' },
    { name: 'Dessert', value: 'Dessert' }
  ];

  lstCout: Array<any> = [
    { name: 'Bon marché', value: '1' },
    { name: 'Faible', value: '2' },
    { name: 'Modéré', value: '3' },
    { name: 'Assez cher', value: '4' }
  ];

  lstSaison: Array<any> = [
    { name: 'Printemps', value: 'Printemps' },
    { name: 'Ete', value: 'Ete' },
    { name: 'Automne', value: 'Automne' },
    { name: 'Hiver', value: 'Hiver' },
    { name: 'Toutes', value: 'Toutes' }
  ];

  recettes: Recette[] = [];

  constructor(private fb: FormBuilder, private recetteService: RecettesService) {

    this.searchForm = this.fb.group({
      checkSaison: this.fb.array([]),
      checkDifficulte: this.fb.array([]),
      checkCout: this.fb.array([]),
      checkTypePlat: this.fb.array([])
    });
  }

  ngOnInit(): void {
  }

  disable(): void {
    document.querySelector('body')?.classList.remove('disable-scroll');
    document.querySelector('#search-box-model-container')?.classList.remove('active')
    document.querySelector('.search-box-modal-over')?.classList.remove('active')
    document.querySelector('.search-box-modal-over')?.classList.add('disable')
    document.querySelector('#search-box-model-container')?.classList.add('disable')
    document.querySelector('.search-input')?.classList.remove('search-input-prop');

    if (Utils.isInDarkMode()) {
      document.querySelector('#search-box-model-container')?.classList.remove('bg-light_search-modal')
      document.querySelector('.search-input')?.classList.remove('bg-light_search-modal')
    } else {
      document.querySelector('#search-box-model-container')?.classList.remove('bg-dark_search-modal')
      document.querySelector('.search-input')?.classList.remove('bg-dark_search-modal')
    }

  }

  displayModal(): void {
    document.querySelector('body')?.classList.add('disable-scroll');
    document.querySelector('.search-input')?.classList.add('search-input-prop');
    document.querySelector('#search-box-model-container')?.classList.remove('disable')
    document.querySelector('.search-box-modal-over')?.classList.remove('disable')
    document.querySelector('.search-box-modal-over')?.classList.add('active')
    document.querySelector('#search-box-model-container')?.classList.add('active')

    if (!Utils.isInDarkMode()) {
      document.querySelector('#search-box-model-container')?.classList.add('bg-light_search-modal')
      document.querySelector('.search-input')?.classList.add('bg-light_search-modal')
    } else {
      document.querySelector('#search-box-model-container')?.classList.add('bg-dark_search-modal')
      document.querySelector('.search-input')?.classList.add('bg-dark_search-modal')
    }

    this.search = true;

  }

  btnClickSearch() {
    let val = this.searchForm.value;
    // console.log(val);
    let tag: SearchedTag = new SearchedTag(
      val.checkTypePlat,
      val.checkDifficulte,
      val.checkCout,
      val.checkSaison)
    this.recetteService.findByTags(tag).subscribe(
      response => {
        this.recettes = response;
        console.log(this.recettes.length);
      }
    );
  }

  btnClickReset() {
    this.searchForm = this.fb.group({
      nom: "",
      difficulte: 0,
      saison: "",
      cout: 0,
      typePlat: ""
    })
  }

  onCheckboxChange(e: any, categorie: number) {
    if (categorie == 1) {
      this.updateCheckArray(e, this.searchForm.get('checkTypePlat') as FormArray);
    }
    else if (categorie == 2) {
      this.updateCheckArray(e, this.searchForm.get('checkSaison') as FormArray);
    }
    else if (categorie == 3) {
      this.updateCheckArray(e, this.searchForm.get('checkCout') as FormArray);
    }
    else if (categorie == 4) {
      this.updateCheckArray(e, this.searchForm.get('checkDifficulte') as FormArray);
    }
    else {
      return;
    }
  }

  updateCheckArray(e: any, checkArray: FormArray) {
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: AbstractControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

}

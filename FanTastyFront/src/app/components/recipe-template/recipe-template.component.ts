import { AfterViewChecked, Component, OnInit, Output, Renderer2, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Ingredient } from '../../models/ingredient';
import { Recette } from '../../models/recette';
import { RecettesService } from '../../services/recettes.service';
import { AuthService } from "../../services/auth.service";
import { Utils } from "../../core/Utils";



@Component({
  selector: 'app-recipe-template',
  templateUrl: './recipe-template.component.html',
  //styleUrls: ['../../../assets/css/recipe-template.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class RecipeTemplateComponent implements OnInit, AfterViewChecked {

  ingredients: Ingredient[] = [new Ingredient()]


  personneVoulu: number = 1;

  saisonIcon: string = "";

  difficulteIcon: string = "";

  budgetIcon: string = "";

  plusIcon: string = "";

  moinsIcon: string = "";


  recette: Recette = new Recette();
  urlImage: string = "";


  href: string = '';
  hrefComponent: string = '';

  display: boolean = true;
  userLogged: boolean = false;


  isFromUniverse = true;
  loading: boolean = true;

  optionalClassSpanUtensil: string = '';
  optionalClassSpanToggle: string = '';

  constructor(private render: Renderer2, private router: Router,
    private recettesService: RecettesService, private authService: AuthService) {
  }


  ngOnInit(): void {
    //utensils-light
    this.optionalClassSpanToggle = Utils.isInDarkMode() ? 'toggle-dark' : 'toggle-light';
    this.optionalClassSpanUtensil = Utils.isInDarkMode() ? 'utensils-dark' : 'utensils-light';

    //this.isDarkMode = Utils.isInDarkMode() ? 'Y' : 'N';
    let id = this.router.url.split('/')[3];

    this.recettesService.findById(id).subscribe((response: Recette) => {
      this.recette = response;
      this.urlImage = this.recettesService.getImage(this.recette.photo)
    });

    this.userLogged = this.authService.isUserLogged();

    //add init to remove the light color when entering in the component
    let card = document.querySelector('.recipe-card');
    let body = document.querySelector('body');

    let colorBodyIsDark = body?.classList.contains('dark');

    if (colorBodyIsDark) {
      card?.classList.remove('card-bg');
    } else {
      card?.classList.add('card-bg');
    }

    Utils.loadStyle(this.render, this.router);

    this.recettesService.findById(id).subscribe(response => {

      this.recette = response;
      this.urlImage = this.recettesService.getImage(this.recette.photo)


      this.personneVoulu = this.recette.nombrePersonnes;

      console.log(response);

    });
  }

  btnClickHome() {
    this.router.navigate(['']);
  }

  getStyleHeader(): string {
    let urlUniverse: String = this.router.url;

    if (urlUniverse.startsWith('/naruto')) {
      this.href = '/assets/css/naruto.component.css';
    } else if (urlUniverse.startsWith('/disney')) {
      this.href = '/assets/css/disney.component.css';
    } else if (urlUniverse.startsWith('/harrypotter')) {
      this.href = '/assets/css/harrypotter.component.css';
    } else if (urlUniverse === '') {
      this.href = '/assets/css/home-light.component.css';
    } else if (urlUniverse.startsWith('/marvel')) {
      this.href = '/assets/css/marvel.component.css';
    }

    return this.href;
  }



  btnIncrementationNbrIngredient() {
    this.personneVoulu++;
    if (this.personneVoulu >= 50) {
      this.personneVoulu = 50;
    }
    return this.personneVoulu;
  }

  btnDecrementationNbrIngredient() {
    if (this.personneVoulu <= 1) {
      this.personneVoulu = 1;
    } else {
      this.personneVoulu--;
    }

    return this.personneVoulu;
  }

  iconTableau(i: number) {
    return new Array(i);
  }

  iconDifficulte(): string {

    let urlUniverse: String = this.router.url;

    if (urlUniverse.startsWith('/naruto')) {
      this.difficulteIcon = "../../assets/img/chef-naruto.png";
    } else if (urlUniverse.startsWith('/disney')) {
      this.difficulteIcon = "../../assets/img/chef-disney.png";
    } else if (urlUniverse.startsWith('/harrypotter')) {
      this.difficulteIcon = "../../assets/img/chef-harry.png";
    } else if (urlUniverse === '') {
      this.href = '/assets/css/home-light.component.css';
    } else if (urlUniverse.startsWith('/marvel')) {
      this.difficulteIcon = "../../assets/img/chef-marvel.png";
    }

    return this.difficulteIcon;
  }

  iconBudget(): string {

    let urlUniverse: String = this.router.url;

    if (urlUniverse.startsWith('/naruto')) {
      this.budgetIcon = "../../assets/img/piece-naruto.png";
    } else if (urlUniverse.startsWith('/disney')) {
      this.budgetIcon = "../../assets/img/piece-disney.png";
    } else if (urlUniverse.startsWith('/harrypotter')) {
      this.budgetIcon = "../../assets/img/piece-harry.png";
    } else if (urlUniverse === '') {
      this.href = '/assets/css/home-light.component.css';
    } else if (urlUniverse.startsWith('/marvel')) {
      this.budgetIcon = "../../assets/img/piece-marvel.png";
    }

    return this.budgetIcon;
  }

  iconSaison(): string {

    let urlUniverse: String = this.router.url;


    if (urlUniverse.startsWith('/naruto')) {
      if (this.recette.tags.saison === "Printemps") {
        this.saisonIcon = '../../assets/img/printemps-naruto.png';
      } else if (this.recette.tags.saison === "Été") {
        this.saisonIcon = '../../assets/img/ete-naruto.png'
      } else if (this.recette.tags.saison === "Hiver") {
        this.saisonIcon = '../../assets/img/hiver-naruto.png';
      } else if (this.recette.tags.saison === "Automne") {
        this.saisonIcon = '../../assets/img/automne-naruto.png';
      } else {
        this.saisonIcon = '../../assets/img/saison-naruto.png';
      }
    } else if (urlUniverse.startsWith('/disney')) {
      if (this.recette.tags.saison === "Printemps") {
        this.saisonIcon = '../../assets/img/printemps-disney.png';
      } else if (this.recette.tags.saison === "Été") {
        this.saisonIcon = '../../assets/img/ete-disney.png'
      } else if (this.recette.tags.saison === "Hiver") {
        this.saisonIcon = '../../assets/img/hiver-disney.png';
      } else if (this.recette.tags.saison === "Automne") {
        this.saisonIcon = '../../assets/img/automne-disney.png';
      } else {
        this.saisonIcon = '../../assets/img/saison-disney.png';
      }
    } else if (urlUniverse.startsWith('/harrypotter')) {
      if (this.recette.tags.saison === "Printemps") {
        this.saisonIcon = '../../assets/img/printemps-harry.png';
      } else if (this.recette.tags.saison === "Été") {
        this.saisonIcon = '../../assets/img/ete-harry.png'
      } else if (this.recette.tags.saison === "Hiver") {
        this.saisonIcon = '../../assets/img/hiver-harry.png';
      } else if (this.recette.tags.saison === "Automne") {
        this.saisonIcon = '../../assets/img/automne-harry.png';
      } else {
        this.saisonIcon = '../../assets/img/saison-harry.png';
      }
    } else if (urlUniverse === '') {
      this.href = '/assets/css/home-light.component.css';
    } else if (urlUniverse.startsWith('/marvel')) {
      if (this.recette.tags.saison === "Printemps") {
        this.saisonIcon = '../../assets/img/printemps-marvel.png';
      } else if (this.recette.tags.saison === "Été") {
        this.saisonIcon = '../../assets/img/ete-marvel.png'
      } else if (this.recette.tags.saison === "Hiver") {
        this.saisonIcon = '../../assets/img/hiver-marvel.png';
      } else if (this.recette.tags.saison === "Automne") {
        this.saisonIcon = '../../assets/img/automne-marvel.png';
      } else {
        this.saisonIcon = '../../assets/img/saison-marvel.png';
      }
    }

    return this.saisonIcon;
  }

  iconMoins() {
    let urlUniverse: String = this.router.url;

    if (urlUniverse.startsWith('/naruto')) {
      this.moinsIcon = "../../assets/img/moins-naruto.png";
    } else if (urlUniverse.startsWith('/disney')) {
      this.moinsIcon = "../../assets/img/moins-disney.png";
    } else if (urlUniverse.startsWith('/harrypotter')) {
      this.moinsIcon = "../../assets/img/moins-harry.png";
    } else if (urlUniverse === '') {
      this.moinsIcon = '/assets/css/home-light.component.css';
    } else if (urlUniverse.startsWith('/marvel')) {
      this.moinsIcon = "../../assets/img/moins-marvel.png";
    }

    return this.moinsIcon;
  }

  iconPlus() {
    let urlUniverse: String = this.router.url;

    if (urlUniverse.startsWith('/naruto')) {
      this.plusIcon = "../../assets/img/plus-naruto.png";
    } else if (urlUniverse.startsWith('/disney')) {
      this.plusIcon = "../../assets/img/plus-disney.png";
    } else if (urlUniverse.startsWith('/harrypotter')) {
      this.plusIcon = "../../assets/img/plus-harry.png";
    } else if (urlUniverse === '') {
      this.plusIcon = '/assets/css/home-light.component.css';
    } else if (urlUniverse.startsWith('/marvel')) {
      this.plusIcon = "../../assets/img/plus-marvel.png";
    }

    return this.plusIcon;
  }

  showIngredientsUtensils(event: Event): void {
    this.display = !this.display;
    event.stopPropagation();
  }

  ngAfterViewChecked(): void {
    setTimeout(() => {
      this.loading = false;
      //this.isDarkMode = Utils.isInDarkMode();
    }, 1500)


  }

}

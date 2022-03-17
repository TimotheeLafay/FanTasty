import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../../../assets/css/header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  burger: string = '../../assets/img/hamburger.png';
  pathColor: string = '#7B61F8';
  iconTop: string = '../assets/img/recipe-book.png';
  iconTopDice: string = '../assets/img/dice.png';
  iconTopContest: string = '../assets/img/concours.png';
  iconHome: string = '../../assets/img/home.png';
  iconLogin: string = '../../assets/img/login.png';
  iconDisney: string = '../../assets/img/home-disney-light.png';
  iconNaruto: string = '../../assets/img/home-naruto-light.png';
  iconMarvel: string = '../../assets/img/home-marvel-light.png';
  iconHarryPotter: string = '../../assets/img/home-harry-potter-light.png';
  borderColorSideBar: string = 'borderColorLight';

  titleStyle = {
    position: 'relative',
    margin: 0,
    padding: 0,
    'font-family': '\'Bebas Neue\', cursive',
    'font-weight': 100,
    'font-size': '50px',
    'color': 'var(--main-color-light)'
  };

  constructor(private router: Router) { }

  ngOnInit(): void {

    console.log(this.router.url);
    if (this.router.url == '/marvel') {
      console.log('in')
      this.titleStyle.color = 'var(--main-color-marvel)'
    }

  }

  reloadStyle(): object {
    if (this.router.url == '/marvel') {
      console.log('in')
      this.titleStyle = {
        position: 'relative',
        margin: 0,
        padding: 0,
        'font-family': '\'Bebas Neue\', cursive',
        'font-weight': 100,
        'font-size': '50px',
        'color': 'var(--main-color-marvel)'
      };
    }

    return this.titleStyle;
  }

  btnClickHome() {
    this.router.navigate(['']);
  }


  darkOnOff(event: Event) {
    let darkMode = <any>event;
    let element: Element = document.querySelector('body')!;
    let recipeCard: Element = document.querySelector('.recipe-card')!;
    let sideBarBg: Element = document.querySelector('.sidebar')!;
    let modal: Element = document.querySelector('.container')!;
    let toggleOnBg: Element = document.querySelector('.toggle')!;
    let toggleOffBg: Element = document.querySelector('.utensils-back')!;
    let searchModal: Element = document.querySelector('#search-box-model-container')!;
    let searchModalInput: Element = document.querySelector('.search-input')!;

    console.log(toggleOffBg)
    console.log(recipeCard)

    if (darkMode === 'dark') {
      element.classList.add('dark');
      modal.classList.remove('bg-light-modal');
      modal.classList.add('bg-dark-modal');
      sideBarBg.classList.remove('sd-light');
      sideBarBg.classList.add('sd-dark');
      searchModal.classList.add('bg-dark_search-modal');
      searchModal.classList.remove('bg-light_search-modal');

      searchModalInput.classList.remove('bg-light_search-modal')
      searchModalInput.classList.add('bg-dark_search-modal')


      if (recipeCard != null) {
        recipeCard.classList.remove('card-bg');
      }

      if (toggleOnBg != null) {
        console.log(toggleOffBg)
        toggleOnBg.classList.remove('toggle-light');
        toggleOnBg.classList.add('toggle-dark');
      }

      if (toggleOffBg != null) {
        toggleOffBg.classList.remove('utensils-light');
        toggleOffBg.classList.add('utensils-dark');
      }

    } else {
      element.classList.remove('dark');

      if (recipeCard != null) {
        recipeCard.classList.add('card-bg');
      }

      if (toggleOnBg != null) {
        toggleOnBg.classList.add('toggle-light');
        toggleOnBg.classList.remove('toggle-dark');

      }

      if (toggleOffBg != null) {
        toggleOffBg.classList.add('utensils-light');
        toggleOffBg.classList.remove('utensils-dark');
      }

      modal.classList.add('bg-light-modal');
      modal.classList.remove('bg-dark-modal')
      sideBarBg.classList.remove('sd-dark');
      sideBarBg.classList.add('sd-light');

      searchModal.classList.remove('bg-dark_search-modal');
      searchModal.classList.add('bg-light_search-modal');

      searchModalInput.classList.add('bg-light_search-modal')
      searchModalInput.classList.remove('bg-dark_search-modal')

    }
  }

  getCloseModalPathColor(): string {
    let urlUniverse: String = this.router.url;
    if (urlUniverse.startsWith('/naruto')) {
      this.pathColor = '#F85125';
    } else if (urlUniverse.startsWith('/disney')) {
      this.pathColor = '#12c4e3';
    } else if (urlUniverse.startsWith('/harrypotter')) {
      this.pathColor = '#c30046';
    } else if (urlUniverse.startsWith('/marvel')) {
      this.pathColor = '#e53935';
    } else if (urlUniverse.startsWith('')) {
      this.pathColor = '#7B61F8';
    }

    return this.pathColor;
  }

  getBurgerMenu(): string {
    let urlUniverse: String = this.router.url;

    if (urlUniverse.startsWith('/naruto')) {
      this.burger = '../../assets/img/burger-naruto.png';
    } else if (urlUniverse.startsWith('/disney')) {
      this.burger = '../../assets/img/burger-disney.png';
    } else if (urlUniverse.startsWith('/harrypotter')) {
      this.burger = '../../assets/img/burger-harry-potter.png';
    } else if (urlUniverse === '') {
      this.burger = '../../assets/img/hamburger.png';
    } else if (urlUniverse.startsWith('/marvel')) {
      this.burger = '../../assets/img/burger-marvel.png';
    } else if (urlUniverse === '/login') {
      this.burger = '../../assets/img/hamburger.png';
    }

    return this.burger;
  }

  getIconTopSeason(): string {
    let urlUniverse: String = this.router.url;

    if (urlUniverse.startsWith('/naruto')) {
      this.iconTop = '../../assets/img/recipe-book-orange.png';
    } else if (urlUniverse.startsWith('/disney')) {
      this.iconTop = '../../assets/img/recipe-book-blue.png';
    } else if (urlUniverse.startsWith('/harrypotter')) {
      this.iconTop = '../../assets/img/recipe-book-red-bordeaux.png';
    } else if (urlUniverse === '') {
      this.iconTop = '../../assets/img/recipe-book.png';
    } else if (urlUniverse.startsWith('/marvel')) {
      this.iconTop = '../../assets/img/recipe-book-red-marvel.png';
    } else if (urlUniverse.startsWith('/login')) {
      this.iconTop = '../../assets/img/recipe-book.png';
    }

    return this.iconTop;
  }

  getIconTopDice(): string {
    let urlUniverse: String = this.router.url;

    if (urlUniverse.startsWith('/naruto')) {
      this.iconTopDice = '../../assets/img/dice-orange.png';
    } else if (urlUniverse.startsWith('/disney')) {
      this.iconTopDice = '../../assets/img/dice-blue.png';
    } else if (urlUniverse.startsWith('/harrypotter')) {
      this.iconTopDice = '../../assets/img/dice-red-bordeaux.png';
    } else if (urlUniverse === '') {
      this.iconTopDice = '../../assets/img/dice.png';
    } else if (urlUniverse.startsWith('/marvel')) {
      this.iconTopDice = '../../assets/img/dice-red-marvel.png';
    } else if (urlUniverse === '/login') {
      this.iconTopDice = '../../assets/img/dice.png';
    }

    return this.iconTopDice;
  }

  getIconTopContest(): string {
    let urlUniverse: String = this.router.url;

    if (urlUniverse.startsWith('/naruto')) {
      this.iconTopContest = '../../assets/img/concours-orange.png';
    } else if (urlUniverse.startsWith('/disney')) {
      this.iconTopContest = '../../assets/img/concours-blue.png';
    } else if (urlUniverse.startsWith('/harrypotter')) {
      this.iconTopContest = '../../assets/img/concours-red-bordeaux.png';
    } else if (urlUniverse === '') {
      this.iconTopContest = '../../assets/img/concours.png';
    } else if (urlUniverse.startsWith('/marvel')) {
      this.iconTopContest = '../../assets/img/concours-red-marvel.png';
    } else if (urlUniverse === '/login') {
      this.iconTopContest = '../../assets/img/concours.png';
    }

    return this.iconTopContest;
  }

  getIconHome(): string {
    let urlUniverse: String = this.router.url;

    if (urlUniverse.startsWith('/naruto')) {
      this.iconHome = '../../assets/img/home-orange.png';
    } else if (urlUniverse.startsWith('/disney')) {
      this.iconHome = '../../assets/img/home-blue.png';
    } else if (urlUniverse.startsWith('/harrypotter')) {
      this.iconHome = '../../assets/img/home-red-bordeaux.png';
    } else if (urlUniverse === '') {
      this.iconHome = '../../assets/img/home.png';
    } else if (urlUniverse.startsWith('/marvel')) {
      this.iconHome = '../../assets/img/home-red-marvel.png';
    } else if (urlUniverse === '/login') {
      this.iconHome = '../../assets/img/home.png';
    }

    return this.iconHome;
  }

  getIconLogin(): string {
    let urlUniverse: string = this.router.url;

    if (urlUniverse.startsWith('/naruto')) {
      this.iconLogin = '../../assets/img/home-login-orange.png';
    } else if (urlUniverse.startsWith('/disney')) {
      this.iconLogin = '../../assets/img/home-login-blue.png';
    } else if (urlUniverse.startsWith('/harrypotter')) {
      this.iconLogin = '../../assets/img/home-login-red-bordeaux.png';
    } else if (urlUniverse === '') {
      this.iconLogin = '../../assets/img/login.png';
    } else if (urlUniverse.startsWith('/marvel')) {
      this.iconLogin = '../../assets/img/home-login-red-marvel.png';
    } else if (urlUniverse === '/login') {
      this.iconLogin = '../../assets/img/login.png';
    }

    return this.iconLogin;
  }

  getIconDisney(): string {
    let urlUniverse: string = this.router.url;

    if (urlUniverse.startsWith('/naruto')) {
      this.iconDisney = '../../assets/img/home-disney-orange.png';
    } else if (urlUniverse.startsWith('/disney')) {
      this.iconDisney = '../../assets/img/home-disney-blue.png';
    } else if (urlUniverse.startsWith('/harrypotter')) {
      this.iconDisney = '../../assets/img/home-harrypotter-red-bordeaux.png';
    } else if (urlUniverse === '') {
      this.iconDisney = '../../assets/img/home-disney-light.png';
    } else if (urlUniverse.startsWith('/marvel')) {
      this.iconDisney = '../../assets/img/home-disney-red-marvel.png';
    } else if (urlUniverse === '/login') {
      this.iconDisney = '../../assets/img/home-disney-light.png';
    }

    return this.iconDisney;
  }

  getIconNaruto(): string {
    let urlUniverse: string = this.router.url;

    if (urlUniverse.startsWith('/naruto')) {
      this.iconNaruto = '../../assets/img/home-naruto-orange.png';
    } else if (urlUniverse.startsWith('/disney')) {
      this.iconNaruto = '../../assets/img/home-naruto-blue.png';
    } else if (urlUniverse.startsWith('/harrypotter')) {
      this.iconNaruto = '../../assets/img/home-naruto-red-bordeaux.png';
    } else if (urlUniverse === '') {
      this.iconNaruto = '../../assets/img/home-naruto-light.png';
    } else if (urlUniverse.startsWith('/marvel')) {
      this.iconNaruto = '../../assets/img/home-naruto-red-marvel.png';
    } else if (urlUniverse === '/login') {
      this.iconNaruto = '../../assets/img/home-naruto-light.png';
    }

    return this.iconNaruto;
  }

  getIconMarvel(): string {
    let urlUniverse: string = this.router.url;

    if (urlUniverse.startsWith('/naruto')) {
      this.iconMarvel = '../../assets/img/home-marvel-orange.png';
    } else if (urlUniverse.startsWith('/disney')) {
      this.iconMarvel = '../../assets/img/home-marvel-blue.png';
    } else if (urlUniverse.startsWith('/harrypotter')) {
      this.iconMarvel = '../../assets/img/home-marvel-red-bordeaux.png';
    } else if (urlUniverse === '') {
      this.iconMarvel = '../../assets/img/home-marvel-light.png';
    } else if (urlUniverse.startsWith('/marvel')) {
      this.iconMarvel = '../../assets/img/home-marvel-red-marvel.png';
    } else if (urlUniverse === '/login') {
      this.iconMarvel = '../../assets/img/home-marvel-light.png';
    }

    return this.iconMarvel;
  }

  getIconHarryPotter(): string {
    let urlUniverse: string = this.router.url;

    if (urlUniverse.startsWith('/naruto')) {
      this.iconHarryPotter = '../../assets/img/home-harry-potter-orange.png';
    } else if (urlUniverse.startsWith('/disney')) {
      this.iconHarryPotter = '../../assets/img/home-harry-potter-blue.png';
    } else if (urlUniverse.startsWith('/harrypotter')) {
      this.iconHarryPotter = '../../assets/img/home-harry-potter-red-bordeaux.png';
    } else if (urlUniverse === '') {
      this.iconHarryPotter = '../../assets/img/home-harry-potter-light.png';
    } else if (urlUniverse.startsWith('/marvel')) {
      this.iconHarryPotter = '../../assets/img/home-harry-potter-red-marvel.png';
    } else if (urlUniverse === '/login') {
      this.iconHarryPotter = '../../assets/img/home-harry-potter-light.png';
    }

    return this.iconHarryPotter;
  }



}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['../../../assets/css/footer.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FooterComponent implements OnInit {
  color: string = 'bgColorLight';


  constructor(private router: Router) { }


  ngOnInit(): void {
    this.color = this.getBgColorFooter();
  }



  getBgColorFooter(): string {
    let urlUniverse: String = this.router.url;
    let element: Element = document.querySelector('footer')!;

    if (urlUniverse.startsWith('/naruto')) {
      element.classList.add('bgColorNaruto');
      return 'bgColorNaruto';
    } else if (urlUniverse.startsWith('/disney')) {
      element.classList.add('bgColorDisney');
      return 'bgColorDisney';
    } else if (urlUniverse.startsWith('/harrypotter')) {
      element.classList.add('bgColorHarryPotter');
      return 'bgColorHarryPotter';
    } else if (urlUniverse.startsWith('/marvel')) {
      element.classList.add('bgColorMarvel');
      return 'bgColorMarvel';
    }

    return 'bgColorLight'


  }
}

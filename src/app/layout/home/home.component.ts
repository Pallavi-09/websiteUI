import { Component, OnInit } from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const options = {
      strings: ['I am Web Developer.', 'and also Angular Developer.'],
      typeSpeed: 40,
      backSpeed: 40,
      showCursor: true,
      cursorChar: '|',
      loop: true
    }

    const typed = new Typed('.typed-element', options);
  }


}

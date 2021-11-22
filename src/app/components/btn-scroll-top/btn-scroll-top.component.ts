import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'btn-scroll-top',
  templateUrl: './btn-scroll-top.component.html',
  styleUrls: ['./btn-scroll-top.component.css']
})
export class BtnScrollTopComponent implements OnInit {
    windowScrolled: boolean = false;
    constructor(@Inject(DOCUMENT) private document: Document) {}

    @HostListener("window:scroll", [])
    onWindowScroll() {
        if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
            this.windowScrolled = true;
        } 
       else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
            this.windowScrolled = false;
        }
    }
    scrollToTop() {
      (function smoothscroll() {
        var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll);
          window.scrollTo(0, currentScroll - (currentScroll / 1));
        }
      })();
    }
    ngOnInit() {}
}
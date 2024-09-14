import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchButtonComponent } from './search-button/search-button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchButtonComponent, NgClass, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isSearchClicked = false;

  handleOpenSearch() {
    this.isSearchClicked = true;
  }

  onCancleSearch() {
    this.isSearchClicked = false;
  }
}

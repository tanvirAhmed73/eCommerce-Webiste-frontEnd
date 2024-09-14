import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-button',
  standalone: true,
  imports: [],
  templateUrl: './search-button.component.html',
  styleUrl: './search-button.component.css',
})
export class SearchButtonComponent {
  @Output() cancleSearch = new EventEmitter();
  onCancleSearch() {
    this.cancleSearch.emit();
  }
}

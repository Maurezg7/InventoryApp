import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListProduct } from "./list-product/list-product";

@Component({
  selector: 'app-root',
  imports: [ListProduct],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('inventory-app');
}

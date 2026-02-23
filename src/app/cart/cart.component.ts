import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  isOpen = false;
  showThankYou = false;
  lastOrderCount = 0;
  lastOrderTotal = 0;

  constructor(protected cart: CartService) {}

  toggle() {
    this.isOpen = !this.isOpen;
  }

  removeItem(name: string) {
    this.cart.remove(name);
  }

  increase(name: string) {
    this.cart.updateQuantity(name, 1);
  }

  decrease(name: string) {
    this.cart.updateQuantity(name, -1);
  }

  clearCart() {
    this.cart.clear();
    this.isOpen = false;
  }

  checkout() {
    const total = this.cart.total();
    const count = this.cart.count();
    if (count === 0) return;
    this.lastOrderCount = count;
    this.lastOrderTotal = total;
    this.cart.clear();
    this.isOpen = false;
    this.showThankYou = true;
  }

  closeThankYou() {
    this.showThankYou = false;
  }
}

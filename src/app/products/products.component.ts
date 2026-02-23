import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products = [
    { name: 'Classic 3×3 Speedcube', price: 728, image: '/Images/Classic 3×3 Speedcube.jpg', available: true },
    { name: 'Pocket 2×2 Cube', price: 504, image: '/Images/Pocket 2×2 Cube.jpg', available: true },
    { name: '4×4 Rubik\'s Revenge', price: 1064, image: '/Images/4×4 Rubik\'s Revenge.jpg', available: true },
    { name: '5×5 Professor\'s Cube', price: 1399, image: '/Images/5×5 Professor\'s Cube.jpg', available: false },
    { name: 'Pyramid Cube', price: 840, image: '/Images/Pyramid Cube.png', available: true },
    { name: 'Megaminx', price: 1119, image: '/Images/Megaminx.jpg', available: true }
  ];

  constructor(private cart: CartService) {}

  addToCart(product: { name: string; price: number; image: string; available: boolean }) {
    if (!product.available) return;
    this.cart.add(product);
  }
}

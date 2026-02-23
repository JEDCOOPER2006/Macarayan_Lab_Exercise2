import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {
  name: string;
  price: number;
  image: string;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private items = signal<CartItem[]>([]);

  cartItems = this.items.asReadonly();
  count = computed(() => this.items().reduce((sum, i) => sum + i.quantity, 0));
  total = computed(() => this.items().reduce((sum, i) => sum + i.price * i.quantity, 0));

  add(product: { name: string; price: number; image: string }) {
    const current = this.items();
    const idx = current.findIndex((i) => i.name === product.name);
    if (idx >= 0) {
      this.items.update((list) =>
        list.map((item, i) =>
          i === idx ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      this.items.update((list) => [...list, { ...product, quantity: 1 }]);
    }
  }

  remove(name: string) {
    this.items.update((list) => list.filter((i) => i.name !== name));
  }

  updateQuantity(name: string, delta: number) {
    this.items.update((list) =>
      list
        .map((item) =>
          item.name === name
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  clear() {
    this.items.set([]);
  }
}

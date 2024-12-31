import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import shuffleArray from 'shuffle-array';
import { NgClass, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgOptimizedImage, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'XmasXchange';
  selected: number | undefined = undefined;

  get correct(): number {
    return this.currentOrder.reduce((acc, current, ndx) => {
      return acc + (current === this.correctOrder[ndx] ? 1 : 0);
    }, 0);
  }

  receivers = ['Aaron', 'Jess', 'Ben', 'Katie', 'Cory', 'Allie'];
  correctOrder = shuffleArray([0, 1, 2, 3, 4, 5]);
  currentOrder = [0, 1, 2, 3, 4, 5];
  swaps: number = 0;

  clickGift(ndx: number) {
    if (typeof this.selected !== 'undefined') {
      if (ndx === this.selected) {
        delete this.selected;
      } else {
        const tmp = this.currentOrder[ndx];
        this.currentOrder[ndx] = this.currentOrder[this.selected];
        this.currentOrder[this.selected] = tmp;
        delete this.selected;
        this.swaps++;
      }
    } else {
      this.selected = ndx;
    }
  }
}

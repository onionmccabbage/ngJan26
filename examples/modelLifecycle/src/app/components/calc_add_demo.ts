import { Component, inject } from '@angular/core';
import { CalcAdd } from '../services/calc_add';

@Component({
  selector: 'app-receipt',
  template: `<h1>The total is {{ totalCost }}</h1>`,
})

export class CalcAddDemo {
  private calculator = inject(CalcAdd);
  totalCost = this.calculator.add(50, 25);
}

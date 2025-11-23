import { Component } from '@angular/core';
import { TngButton } from 'tecnualng';

@Component({
  selector: 'app-empty',
  imports: [TngButton],
  templateUrl: './empty.html',
  styleUrl: './empty.scss',
})
export class Empty {
  i: number = 0;

  onClick(value: string) {
    console.log(value);
    this.i++;
  }
}

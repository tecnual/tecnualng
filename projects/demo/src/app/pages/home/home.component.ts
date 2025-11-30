import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TngButton } from 'tecnualng';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, TngButton],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {}

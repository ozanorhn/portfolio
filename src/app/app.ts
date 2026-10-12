import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConsentComponent } from './ui/consent';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, ConsentComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}

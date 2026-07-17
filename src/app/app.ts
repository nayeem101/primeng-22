import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ObjectsColumn } from '@primeicons/angular/objects-column';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, ObjectsColumn],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}

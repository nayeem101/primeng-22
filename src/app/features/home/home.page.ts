import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FileEdit } from '@primeicons/angular/file-edit';
import { Sparkles } from '@primeicons/angular/sparkles';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { Tag } from 'primeng/tag';

import { EXAMPLE_CATALOG, ExampleCard } from './example-catalog';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, Card, Tag, Button, Sparkles, FileEdit],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
})
export class HomePage {
  protected readonly examples = EXAMPLE_CATALOG;

  protected isReady(example: ExampleCard): boolean {
    return example.status === 'ready';
  }
}

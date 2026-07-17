import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArrowRight } from '@primeicons/angular/arrow-right';
import { Clock } from '@primeicons/angular/clock';
import { FileEdit } from '@primeicons/angular/file-edit';
import { Sparkles } from '@primeicons/angular/sparkles';
import { ButtonDirective } from 'primeng/button';
import { Card } from 'primeng/card';
import { Tag } from 'primeng/tag';

import { EXAMPLE_CATALOG, ExampleCard } from './example-catalog';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, Card, Tag, ButtonDirective, Sparkles, FileEdit, ArrowRight, Clock],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
})
export class HomePage {
  protected readonly examples = EXAMPLE_CATALOG;

  protected isReady(example: ExampleCard): boolean {
    return example.status === 'ready';
  }
}

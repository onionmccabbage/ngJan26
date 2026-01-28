import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowerService } from './services/flower.service';
import { AnimalService } from './services/animal.service';
import { ChildComponent } from "./components/child.component";
import { InspectorComponent } from "./components/inspector.component";
import { ExampleComponent } from "./components/example.component";
import { HeaderComponent } from './components/header.component';
import { DashboardComponent } from "./components/api-dashboard.component";
// see https://v19.angular.dev/guide/di/hierarchical-dependency-injection

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ChildComponent, InspectorComponent, ExampleComponent, HeaderComponent, DashboardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  //
  viewProviders: [
    { provide: AnimalService, useValue: { emoji: '🦔' } },
  ],
})
export class App {
  flower = inject(FlowerService);
  public animal = inject(AnimalService);

}

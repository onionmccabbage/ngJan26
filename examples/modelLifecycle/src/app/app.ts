import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignalDemoComponent } from "./components/signal_demo";
import { CalcAddDemo } from "./components/calc_add_demo";
import { CustomCard } from "./components/projection_demo";
import { HostBindingDemo } from "./components/host_binding_demo";
import { DomApiDemo } from "./components/dom_api_demo";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SignalDemoComponent, CalcAddDemo, CustomCard, HostBindingDemo, DomApiDemo],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('app01');
  dt = new Date()
  appValue = 2
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from './Material/material.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MaterialModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'employeeapp';
}

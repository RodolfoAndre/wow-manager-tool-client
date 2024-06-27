import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-reputation',
  standalone: true,
  imports: [],
  templateUrl: './reputation.component.html',
  styleUrl: './reputation.component.scss'
})
export class ReputationComponent {
  constructor(private route: ActivatedRoute) {

  }
}

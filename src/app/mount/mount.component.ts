import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-mount',
  standalone: true,
  imports: [],
  templateUrl: './mount.component.html',
  styleUrl: './mount.component.scss'
})
export class MountComponent {
  constructor(private route: ActivatedRoute) {

  }
}

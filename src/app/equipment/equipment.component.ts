import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-equipment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './equipment.component.html',
  styleUrl: './equipment.component.scss'
})
export class EquipmentComponent {


  constructor(private route: ActivatedRoute) {

  }

}

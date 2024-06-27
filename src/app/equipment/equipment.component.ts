import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-equipment',
  standalone: true,
  imports: [],
  templateUrl: './equipment.component.html',
  styleUrl: './equipment.component.scss'
})
export class EquipmentComponent {


  constructor(private route: ActivatedRoute) {

  }

}

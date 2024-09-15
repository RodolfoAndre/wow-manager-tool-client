import {Component, Input} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatListItem} from "@angular/material/list";
import {RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-character-list-item',
  standalone: true,
  imports: [
    MatIcon,
    MatListItem,
    RouterLink,
    MatButton
  ],
  templateUrl: './character-list-item.component.html',
  styleUrl: './character-list-item.component.scss'
})
export class CharacterListItemComponent {
  @Input("name") name!: string;
  @Input("onDelete") onDelete!: Function;
  @Input("path") path!: (string | undefined)[];
}

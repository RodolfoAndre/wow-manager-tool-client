import { Routes } from '@angular/router';
import { EquipmentComponent } from './equipment/equipment.component';
import { MountComponent } from './mount/mount.component';
import { ReputationComponent } from './reputation/reputation.component';
import {MountDropComponent} from "./mount-drop/mount-drop.component";
import {BestInSlotManagerComponent} from "./best-in-slot-manager/best-in-slot-manager.component";

export const routes: Routes = [
  {path: 'equipment/list',  children: [{path: ':id', component: EquipmentComponent}]},
  {path: 'mount/list',  children: [{path: ':id', component: MountComponent}]},
  {path: 'mount/drop',  children: [{path: ':id', component: MountDropComponent}]},
  {path: 'reputation/list', children: [{path: ':id', component: ReputationComponent}]},
  {path: 'management/bis', component: BestInSlotManagerComponent}
];

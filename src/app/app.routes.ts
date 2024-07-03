import { Routes } from '@angular/router';
import { EquipmentComponent } from './equipment/equipment.component';
import { MountComponent } from './mount/mount.component';
import { ReputationComponent } from './reputation/reputation.component';

export const routes: Routes = [
  {path: 'equipment/list',  children: [{path: ':id', component: EquipmentComponent}]},
  {path: 'mount/list',  children: [{path: ':id', component: MountComponent}]},
  {path: 'reputation/list', children: [{path: ':id', component: ReputationComponent}]}
];

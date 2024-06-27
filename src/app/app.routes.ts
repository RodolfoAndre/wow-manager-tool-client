import { Routes } from '@angular/router';
import { EquipmentComponent } from './equipment/equipment.component';
import { MountComponent } from './mount/mount.component';
import { ReputationComponent } from './reputation/reputation.component';

export const routes: Routes = [
  { path: 'equipment/list', component: EquipmentComponent },
  { path: 'mount/list', component: MountComponent },
  { path: 'reputation/list', component: ReputationComponent }
];

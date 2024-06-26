import {Routes} from '@angular/router';
import {EquipmentComponent} from './equipment/equipment.component'
import {MountComponent} from './mount/mount.component'
import {ReputationComponent} from './reputation/reputation.component'

export const routes: Routes = [
  {path: 'equipment', component: EquipmentComponent},
  {path: 'mount', component: MountComponent},
  {path: 'reputation', component: ReputationComponent}
];

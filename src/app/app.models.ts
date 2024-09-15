import {ExpansionItem} from "./shared/expansion-list/expansion.list.models";

export interface AppComponentConfig {
  title: string,
  rightSideNavItems: Array<ExpansionItem>;
  leftSideNavItems : Array<ExpansionItem>;
  showPreLoader: boolean;
}

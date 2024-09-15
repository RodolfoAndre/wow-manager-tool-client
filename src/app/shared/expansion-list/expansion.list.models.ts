export interface ExpansionItem {
  customParams?: Array<any>;
  model?: string;
  name: string;
  icon?: string;
  path?: string;
  children?: Array<ExpansionItem>,
  onClick?: () => void
}

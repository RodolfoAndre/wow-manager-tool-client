export interface ExpansionItem {
  name: string;
  icon?: string;
  path?: string;
  children?: Array<ExpansionItem>,
  onClick?: () => void
}

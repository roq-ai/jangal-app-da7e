interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Account Owner'],
  customerRoles: ['Guest'],
  tenantRoles: ['Account Owner', 'End Customer'],
  tenantName: 'Bank',
  applicationName: 'Jangal app',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: ['View transaction history', 'View account details', 'View user profiles', 'View bank details'],
  ownerAbilities: ['Manage transaction history', 'Manage accounts', 'Manage users', 'Manage banks'],
  getQuoteUrl: 'https://app.roq.ai/proposal/4ec1c6bf-901a-420a-a157-e322ab1b1df5',
};

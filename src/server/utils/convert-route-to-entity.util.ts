const mapping: Record<string, string> = {
  accounts: 'account',
  banks: 'bank',
  'transaction-histories': 'transaction_history',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}

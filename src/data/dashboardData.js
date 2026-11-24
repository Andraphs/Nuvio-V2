export const PERIOD_DATA = {
  '2026-11': {
    label: 'Nov 2026',
    balance: 16420.5,
    balanceCompare: { pct: '+4.2%', vs: 'vs Oct 2026', positive: true },
    income: 6250.0,
    incomeCompare: { pct: '+6.8%', vs: 'vs Oct 2026', positive: true },
    expense: 2840.0,
    expenseCompare: { pct: '-3.1%', vs: 'vs Oct 2026', positive: true },
  },
  '2026-10': {
    label: 'Oct 2026',
    balance: 15758.0,
    balanceCompare: { pct: '+2.1%', vs: 'vs Sep 2026', positive: true },
    income: 5850.0,
    incomeCompare: { pct: '0.0%', vs: 'vs Sep 2026', positive: true },
    expense: 2930.0,
    expenseCompare: { pct: '+5.4%', vs: 'vs Sep 2026', positive: false },
  },
  '2026-09': {
    label: 'Sep 2026',
    balance: 15434.0,
    balanceCompare: { pct: '+1.8%', vs: 'vs Aug 2026', positive: true },
    income: 5850.0,
    incomeCompare: { pct: '+3.2%', vs: 'vs Aug 2026', positive: true },
    expense: 2780.0,
    expenseCompare: { pct: '-1.5%', vs: 'vs Aug 2026', positive: true },
  },
  '2026-01': {
    label: 'Jan 2026',
    balance: 12100.0,
    balanceCompare: null,
    income: 5200.0,
    incomeCompare: null,
    expense: 2490.0,
    expenseCompare: null,
  },
};

export const CHART_DATASETS = {
  2026: [
    { m: 'Jan', balance: 9240.0, income: 4320.0, expense: 2180.0 },
    { m: 'Feb', balance: 11850.0, income: 3480.0, expense: 3290.0 },
    { m: 'Mar', balance: 10420.0, income: 5940.0, expense: 1960.0 },
    { m: 'Apr', balance: 14180.0, income: 4120.0, expense: 3840.0 },
    { m: 'May', balance: 12350.0, income: 6180.0, expense: 2290.0 },
    { m: 'Jun', balance: 13640.0, income: 4860.0, expense: 3510.0 },
    { m: 'Jul', balance: 15890.0, income: 6840.0, expense: 2460.0 },
    { m: 'Aug', balance: 12940.0, income: 4450.0, expense: 3720.0 },
    { m: 'Sep', balance: 15110.0, income: 5600.0, expense: 3120.0 },
    { m: 'Oct', balance: 15760.0, income: 5850.0, expense: 2930.0 },
    { m: 'Nov', balance: 16420.5, income: 6250.0, expense: 2840.0 },
    { m: 'Dec', balance: 14820.0, income: 4920.0, expense: 2150.0 },
  ],
  2025: [
    { m: 'Jan', balance: 6840.0, income: 3820.0, expense: 2180.0 },
    { m: 'Feb', balance: 8920.0, income: 3240.0, expense: 2910.0 },
    { m: 'Mar', balance: 7940.0, income: 5120.0, expense: 1890.0 },
    { m: 'Apr', balance: 10680.0, income: 3940.0, expense: 3140.0 },
    { m: 'May', balance: 9120.0, income: 5480.0, expense: 2240.0 },
    { m: 'Jun', balance: 10140.0, income: 4280.0, expense: 2980.0 },
    { m: 'Jul', balance: 12280.0, income: 5910.0, expense: 2340.0 },
    { m: 'Aug', balance: 9890.0, income: 4190.0, expense: 3180.0 },
    { m: 'Sep', balance: 11360.0, income: 5020.0, expense: 2690.0 },
    { m: 'Oct', balance: 10540.0, income: 5150.0, expense: 2610.0 },
    { m: 'Nov', balance: 11710.0, income: 5280.0, expense: 2590.0 },
    { m: 'Dec', balance: 10980.0, income: 4490.0, expense: 2290.0 },
  ],
  empty: [],
};

export const INITIAL_ACCOUNTS = [
  {
    id: 'chase',
    name: 'Chase Checking',
    mask: '•••• 4821',
    status: 'Synced',
    balance: '$12,180.50',
    icon: 'account_balance',
    iconWrapClass: 'bg-primary-container border border-primary/40 text-secondary',
  },
  {
    id: 'apple-cash',
    name: 'Apple Cash',
    mask: '•••• 1094',
    status: 'Synced',
    balance: '$940.00',
    icon: 'smartphone',
    iconWrapClass: 'bg-surface-container-high border border-outline-variant text-on-surface',
  },
  {
    id: 'citi',
    name: 'Citibank',
    mask: '•••• 7732',
    status: 'Failed',
    balance: '$3,300.00',
    errorText: 'Session expired. Refresh access.',
    icon: 'credit_card',
    iconWrapClass: 'bg-surface-container-high border border-outline-variant text-error',
  },
];

export const INITIAL_SUBSCRIPTIONS = [
  {
    id: 1,
    service: 'Netflix',
    plan: 'Premium',
    billing: 'Monthly',
    nextBilling: 'Apr 5, 2026',
    amount: 19.99,
    status: 'Active',
    icon: 'movie',
    iconBg: 'bg-surface-container-high text-error',
  },
  {
    id: 2,
    service: 'Spotify',
    plan: 'Individual',
    billing: 'Monthly',
    nextBilling: 'Apr 11, 2026',
    amount: 9.99,
    status: 'Active',
    icon: 'graphic_eq',
    iconBg: 'bg-surface-container-high text-success',
  },
  {
    id: 3,
    service: 'Adobe CC',
    plan: 'Pro',
    billing: 'Yearly',
    nextBilling: 'Dec 14, 2027',
    amount: 659.88,
    status: 'Unpaid',
    icon: 'palette',
    iconBg: 'bg-surface-container-high text-error',
  },
  {
    id: 4,
    service: 'iCloud',
    plan: '50GB',
    billing: 'Yearly',
    nextBilling: 'Nov 20, 2027',
    amount: 11.88,
    status: 'Active',
    icon: 'cloud',
    iconBg: 'bg-primary-container text-secondary',
  },
  {
    id: 5,
    service: 'Amazon Prime',
    plan: 'Standard',
    billing: 'Monthly',
    nextBilling: 'Apr 18, 2026',
    amount: 11.58,
    status: 'Unpaid',
    icon: 'play_circle',
    iconBg: 'bg-primary-container text-secondary',
  },
];

export const TRANSACTION_GROUPS_BY_PERIOD = {
  'this-month': [
    {
      label: 'Today',
      items: [
        {
          id: 'tx-netflix-nov',
          title: 'Netflix Monthly',
          meta: 'Paid · Account Balance',
          directionIcon: 'north_east',
          icon: 'movie',
          iconWrapClass: 'bg-surface-container-high border border-outline-variant text-error',
          amount: '-$19.99',
          amountClass: 'text-error',
        },
        {
          id: 'tx-topup-nov',
          title: 'Top Up',
          meta: 'Received · Visa •••• 494',
          directionIcon: 'south_west',
          icon: 'account_balance_wallet',
          iconWrapClass: 'bg-surface-container-high border border-outline-variant text-on-surface',
          amount: '+$30.00',
          amountClass: 'text-success',
        },
      ],
    },
    {
      label: 'Yesterday',
      items: [
        {
          id: 'tx-icloud-nov',
          title: 'iCloud Yearly',
          meta: 'Paid · Account Balance',
          directionIcon: 'north_east',
          icon: 'cloud',
          iconWrapClass: 'bg-primary-container border border-primary/40 text-secondary',
          amount: '-$11.88',
          amountClass: 'text-error',
        },
        {
          id: 'tx-spotify-nov',
          title: 'Spotify Monthly',
          meta: 'Paid · Account Balance',
          directionIcon: 'north_east',
          icon: 'graphic_eq',
          iconWrapClass: 'bg-surface-container-high border border-outline-variant text-success',
          amount: '-$9.99',
          amountClass: 'text-error',
        },
      ],
    },
  ],
  'last-month': [
    {
      label: 'Oct 28',
      items: [
        {
          id: 'tx-salary-oct',
          title: 'Client Retainer',
          meta: 'Received · Chase •••• 4821',
          directionIcon: 'south_west',
          icon: 'payments',
          iconWrapClass: 'bg-primary-container border border-primary/40 text-secondary',
          amount: '+$1,450.00',
          amountClass: 'text-success',
        },
        {
          id: 'tx-prime-oct',
          title: 'Amazon Prime',
          meta: 'Paid · Chase •••• 4821',
          directionIcon: 'north_east',
          icon: 'play_circle',
          iconWrapClass: 'bg-primary-container border border-primary/40 text-secondary',
          amount: '-$11.58',
          amountClass: 'text-error',
        },
      ],
    },
    {
      label: 'Oct 14',
      items: [
        {
          id: 'tx-figma-oct',
          title: 'Figma Pro',
          meta: 'Paid · Apple Cash •••• 1094',
          directionIcon: 'north_east',
          icon: 'design_services',
          iconWrapClass: 'bg-surface-container-high border border-outline-variant text-on-surface',
          amount: '-$15.00',
          amountClass: 'text-error',
        },
        {
          id: 'tx-coffee-oct',
          title: 'Blue Bottle Coffee',
          meta: 'Paid · Apple Cash •••• 1094',
          directionIcon: 'north_east',
          icon: 'local_cafe',
          iconWrapClass: 'bg-surface-container-high border border-outline-variant text-warning',
          amount: '-$8.40',
          amountClass: 'text-error',
        },
      ],
    },
  ],
};

export const TRANSACTION_GROUPS = TRANSACTION_GROUPS_BY_PERIOD['this-month'];

export function formatUSD(amount, withSign = false) {
  const formatted = Math.abs(amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  if (!withSign) return '$' + formatted;
  return (amount >= 0 ? '+$' : '-$') + formatted;
}

export function formatWholeUSD(amount) {
  return '$' + Math.round(amount).toLocaleString('en-US');
}

export function formatPctDelta(curr, prev, invertPositive) {
  if (!prev) return null;
  const delta = ((curr - prev) / prev) * 100;
  const sign = delta >= 0 ? '+' : '';
  return {
    pct: `${sign}${delta.toFixed(1)}%`,
    positive: invertPositive ? delta <= 0 : delta >= 0,
  };
}

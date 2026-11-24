export const NAV_LINKS = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'features', label: 'Features', href: '#features' },
  { id: 'advantage', label: 'Cash Flow', href: '#advantage' },
  { id: 'pricing', label: 'Pricing', href: '#pricing' },
  { id: 'faq', label: 'FAQ', href: '#faq' },
];

export const TRUSTED_INSTITUTIONS = [
  { icon: 'account_balance', name: 'VaultBank', opacityClass: 'opacity-75' },
  { icon: 'north_east', name: 'Northstar', opacityClass: 'opacity-85' },
  { icon: 'bolt', name: 'ClearPay', opacityClass: 'opacity-85' },
  { icon: 'layers', name: 'ArcLedger', opacityClass: 'opacity-85' },
  { icon: 'waves', name: 'MintFlow', opacityClass: 'opacity-85' },
  { icon: 'credit_card', name: 'SummitCard', opacityClass: 'opacity-75' },
];

export const FEATURE_QUADRANTS = [
  {
    icon: 'insights',
    title: 'Real-Time Cash Flow',
    description:
      'Compare Total Balance, Income, and Expenses on a synchronized 12-month dual-scale curve.',
    cardClass:
      'border-b md:border-r border-outline-variant bg-gradient-to-br from-[#9312ff]/10 to-transparent hover:bg-[#9312ff]/[0.09]',
    iconWrapClass: 'bg-primary/20 border border-primary/40 text-secondary',
  },
  {
    icon: 'sync',
    title: 'Instant Account Sync',
    description:
      'Live balance updates across checking, digital wallets, and cards with one-click session refresh.',
    cardClass:
      'border-b border-outline-variant hover:bg-[#9312ff]/[0.06]',
    iconWrapClass:
      'bg-surface-container-high border border-outline-variant text-warning group-hover:border-primary/40',
  },
  {
    icon: 'receipt_long',
    title: 'Subscription Radar',
    description:
      'Spot unpaid renewals, sort billing cycles, and settle recurring charges before they surprise you.',
    cardClass:
      'border-b md:border-b-0 md:border-r border-outline-variant hover:bg-[#9312ff]/[0.06]',
    iconWrapClass:
      'bg-surface-container-high border border-outline-variant text-success group-hover:border-primary/40',
  },
  {
    icon: 'verified_user',
    title: 'Read-Only Bank Security',
    description:
      'Encrypted, read-only connections mean Nuvio can analyze your cash flow without ever moving funds.',
    cardClass:
      'bg-gradient-to-tl from-[#9312ff]/10 to-transparent hover:bg-[#9312ff]/[0.09]',
    iconWrapClass: 'bg-primary/20 border border-primary/40 text-[#d6adff]',
  },
];

export const TESTIMONIALS = [
  {
    quote:
      '“Clicking through the Annual Cash Flow months made it effortless to spot where my recurring software bills were creeping up.”',
    initial: 'M',
    name: 'Maya Lin',
    role: 'Product Designer',
    featured: false,
    badge: 'Saved $420/yr',
    avatarClass:
      'bg-gradient-to-br from-[#9312ff]/35 to-[#261147] border border-primary/45 text-[#e0b3ff]',
    roleClass: 'text-on-surface-variant',
    quoteClass: 'text-on-surface-variant',
    verified: true,
  },
  {
    quote:
      '“The dark obsidian interface is the first finance dashboard I actually enjoy opening every morning. Everything fits cleanly on one screen.”',
    initial: 'D',
    name: 'Daniel Hartono',
    role: 'Independent Consultant',
    featured: true,
    badge: 'Daily Clarity',
    avatarClass: 'obsidian-violet-btn',
    roleClass: 'text-[#c2b4d4]',
    quoteClass: 'text-on-surface',
    verified: true,
  },
  {
    quote:
      '“Read-only bank sync plus instant unpaid subscription alerts saved me from two forgotten annual renewals in the first week.”',
    initial: 'S',
    name: 'Sarah Wijaya',
    role: 'Operations Lead',
    featured: false,
    badge: '2 Renewals Caught',
    avatarClass: 'bg-surface-container-high border border-outline-variant text-success',
    roleClass: 'text-on-surface-variant',
    quoteClass: 'text-on-surface-variant',
    verified: true,
  },
];

export const FAQ_ITEMS = [
  {
    num: '01',
    question: 'Is Nuvio bank access read-only?',
    answer:
      'Yes. Nuvio only requests read-only tokens to display balances, transactions, and recurring charges. We can never initiate transfers or modify your accounts.',
    defaultOpen: true,
  },
  {
    num: '02',
    question: 'Can I export my annual cash flow data?',
    answer:
      'Pro and Family plans include one-click CSV and JSON exports for any reporting period.',
    defaultOpen: false,
  },
  {
    num: '03',
    question: 'How does Nuvio detect unpaid or upcoming subscriptions?',
    answer:
      'Nuvio automatically scans recurring charges across your synced accounts, flags unpaid or overdue renewals in your Subscription List, and lets you mark or settle them in one click.',
    defaultOpen: false,
  },
];

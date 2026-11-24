export function NuvioLogoMark({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5.5 17.5V6.5L13 14.5V6.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 14.5L18.5 8.5V17.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.7"
      />
      <circle cx="18.5" cy="6.5" r="1.5" fill="currentColor" />
    </svg>
  );
}

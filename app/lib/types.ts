// Shared UI types
export interface FilterTab {
  key: string;
  label: string;
}

// Shared domain types used across multiple sections
export interface SocialMedia {
  key: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}


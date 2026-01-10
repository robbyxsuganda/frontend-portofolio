export interface Profile {
  name: string;
  title?: string;
  jobTitle: string[];
  summary: string;
  email: string;
  phone?: string;
  location: string;
  availability?: string;
  cvUrl?: string;
  profileImage?: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  location: string;
  achievement?: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface SocialMedia {
  key: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

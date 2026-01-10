export type CertificateCategory = "all" | "bootcamp" | "course" | "achievement";

export interface Certificate {
  title: string;
  issuer: string;
  issuedDate: string;
  expirationDate?: string;
  image: string;
  certificateUrl: string;
  category: CertificateCategory[];
}

export interface CertificateCategoryTab {
  key: CertificateCategory;
  label: string;
}

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "accent";
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const variants = {
    default:
      "bg-[var(--surface)] text-[var(--foreground-secondary)] border border-[var(--border)]",
    success:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    accent:
      "bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

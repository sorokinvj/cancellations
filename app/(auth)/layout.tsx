export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex w-full h-full">{children}</div>;
}

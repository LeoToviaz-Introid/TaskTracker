export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-green-200 flex-1">
      {children}
    </div>
  );
}

export default function FOIALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">FOIA Request Center</h1>
          <p className="text-gray-600 mt-2">
            File, track, and manage Freedom of Information Act requests
          </p>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}

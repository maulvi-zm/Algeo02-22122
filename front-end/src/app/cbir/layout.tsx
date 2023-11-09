import CbirBG from "@/components/background/cbir";

export default function CbirLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24 relative gap-10'>
      <div className='absolute -z-10 top-0 left-0 w-full h-full object-cover'>
        <CbirBG />
      </div>

      {children}
    </main>
  );
}

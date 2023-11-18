import AboutBG from "@/components/background/about";

export default function CbirLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='flex w-full min-h-screen flex-col items-center justify-between p-24 overflow-hidden'>
      <div className='absolute -z-10 top-0 left-0 -translate-x-[10%]'>
        <AboutBG />
      </div>
      {children}
    </main>
  );
}

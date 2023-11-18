import CameraBG from "@/components/background/camera";

export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='flex w-full min-h-screen flex-col items-center justify-between p-24 relative gap-10 overflow-hidden'>
      <div className='absolute -z-10 top-0 left-0 w-full h-full object-cover -translate-x-[10%]'>
        <CameraBG />
      </div>

      {children}
    </main>
  );
}

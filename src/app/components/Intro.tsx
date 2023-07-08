import Image from "next/image";

export default function Intro() {
  return (
    <div className="w-full mx-auto py-4 px-6 sm:px-8 lg:px-10">
      <div className="flex-shrink-0">
        <Image src="/text-logo.png" alt="Logo" width={500} height={167} />
      </div>
    </div>
  );
}

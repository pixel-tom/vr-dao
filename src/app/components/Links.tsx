import Image from "next/image";

export default function Links() {
  return (
    <div className="mx-auto py-4 px-6 sm:px-8 lg:px-10">
      <div className="flex justify-between space-x-12">
        <div className="hover:animate-bounce">
          <ButtonWithImage
            src="/magic-eden.png"
            alt="Magic Eden"
            url="https://magiceden.io/marketplace/doge_capital?attributes=%7B%22Eyes%22%3A%5B%22%7B%5C%22value%5C%22%3A%5C%22VR%5C%22%7D%22%5D%7D"
            width={40}
            height={40}
          />
        </div>
        <div className="hover:animate-bounce">
        <ButtonWithImage
          src="/discord.png"
          alt="Discord"
          url="https://discord.gg/wWzVUpVEy9"
          width={40}
          height={40}
        />
        </div>
        <div className="hover:animate-bounce">
        <ButtonWithImage
          src="/twitter.png"
          alt="Twitter"
          url="https://twitter.com/VRSubDAO?s=20"
          width={40}
          height={40}
        />
        </div>
      </div>
    </div>
  );
}

interface ButtonWithImageProps {
  src: string;
  alt: string;
  url: string;
  width: number;
  height: number;
}

function ButtonWithImage({
  src,
  alt,
  url,
  width,
  height,
}: ButtonWithImageProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="h-auto w-auto"
    >
      <Image src={src} alt={alt} width={width} height={height} />
    </a>
  );
}

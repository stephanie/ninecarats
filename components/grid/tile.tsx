import { formatPrice } from "lib/utils";
import Image from "next/image";

export function GridTileImage({
  src,
  alt,
  isInteractive = true,
  active,
  label,
  ...props
}: {
  src: string;
  alt: string;
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
  };
  key?: string;
} & React.ComponentProps<typeof Image>) {
  return (
    <div className="flex-shrink-0 w-full flex flex-col mb-8">
      <div className="flex flex-col items-center p-2">
        <div className="w-full aspect-[3/4] max-h-[60vh] relative mb-6">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain bg-neutral-100"
          />
        </div>
      </div>
      <div className="text-center flex flex-col">
        <div className="text-sm md:text-base mb-1 text-black">
          {label?.title}
        </div>
        {label?.amount && (
          <div className="text-sm md:text-base text-neutral-400">
            {formatPrice(Number(label?.amount), label?.currencyCode)}
          </div>
        )}
      </div>
    </div>
  );
}

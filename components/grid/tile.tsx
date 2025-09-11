import { AnimatedText } from "components/animations";
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
    <div className="flex-shrink-0 w-full flex flex-col mb-4">
      <div className="flex flex-col items-center p-2">
        <div className="w-full aspect-square max-h-[60vh] relative mb-2">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain bg-neutral-100"
          />
        </div>
      </div>
      <div className="text-center flex flex-col pl-1 pr-1">
        <div className="text-lg text-black font-header">
          <AnimatedText direction="up" staggerDelay={200}>
            {label?.title}
          </AnimatedText>
        </div>
        {label?.amount && (
          <div className="text-sm text-neutral-500">
            <AnimatedText direction="up" staggerDelay={300}>
              {formatPrice(Number(label?.amount), label?.currencyCode)}
            </AnimatedText>
          </div>
        )}
      </div>
    </div>
  );
}

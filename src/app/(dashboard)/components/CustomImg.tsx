import Image, { ImageProps } from "next/image";

// Define the props for our custom MyImage component
type MyImageProps = Omit<ImageProps, "src"> & {
  src: string;
};

export function MyImage({ src, alt, width, height, ...props }: MyImageProps) {
  const encodedSrc = encodeURI(src.replace(/\\/g, "/"));

  return (
    <Image
      src={encodedSrc}
      alt={alt}
      width={width}
      height={height}
      {...props}
    />
  );
}

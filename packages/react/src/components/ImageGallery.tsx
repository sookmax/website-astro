import { ChevronLeft, ChevronRight, Maximize } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@website/shared/utils";
import { useCallback, useState } from "react";

export function ImageGallery({
  images,
}: {
  images: React.ImgHTMLAttributes<HTMLImageElement>[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  const nextImage = useCallback(() => {
    setActiveIndex((prevIndex) => {
      if (prevIndex === images.length - 1) {
        return 0;
      }
      return prevIndex + 1;
    });
  }, [images.length]);

  const prevImage = useCallback(() => {
    setActiveIndex((prevIndex) => {
      if (prevIndex === 0) {
        return images.length - 1;
      }
      return prevIndex - 1;
    });
  }, [images.length]);

  return (
    <div className="not-prose flex flex-col items-center rounded-md bg-black shadow-md shadow-slate-200">
      <div className="relative aspect-[6/4] w-full flex items-center justify-center">
        <img {...activeImage} />

        {/* Navigation buttons */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-3 top-1/2 -translate-y-1/2"
          aria-label="Previous image"
          onClick={prevImage}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-3 top-1/2 -translate-y-1/2"
          aria-label="Next image"
          onClick={nextImage}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Fullscreen button */}
        <Button
          variant="outline"
          size="icon"
          className="absolute top-3 right-3"
          aria-label="Toggle fullscreen"
        >
          <Maximize className="h-5 w-5" />
        </Button>
      </div>
      <div className="w-full px-3 flex space-x-2 overflow-x-auto">
        {images.map((image, idx) => {
          return (
            <button
              key={image.src}
              className={cn(
                "cursor-pointer w-28 aspect-[5/4] flex-shrink-0",
                idx === activeIndex ? "brightness-100" : "brightness-50",
              )}
              onClick={() => {
                setActiveIndex(idx);
              }}
            >
              <img className="rounded-sm" {...image} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

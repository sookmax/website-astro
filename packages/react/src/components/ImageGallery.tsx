import { ChevronLeft, ChevronRight, Maximize } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@website/shared/utils";

export function ImageGallery({
  images,
}: {
  images: {
    src: string;
    attributes: Record<string, string | number>;
  }[];
}) {
  return (
    <div className="not-prose bg-black flex flex-col items-center rounded-md">
      <div className="relative aspect-[6/4] w-full flex items-center justify-center">
        <img src={images[0].src} {...images[0].attributes} />

        {/* Overlay for image caption */}

        {/* Navigation buttons */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Fullscreen button */}
        <Button
          variant="outline"
          size="icon"
          className="absolute top-4 right-4"
          aria-label="Toggle fullscreen"
        >
          <Maximize className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex space-x-2 overflow-x-auto">
        {images.map((image) => {
          return (
            <button
              key={image.src}
              className={cn("w-28 aspect-[5/4] flex-shrink-0")}
            >
              <img src={image.src} {...image.attributes} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

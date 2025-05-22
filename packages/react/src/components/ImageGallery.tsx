import { ChevronLeft, ChevronRight, Maximize, XIcon } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@website/shared/utils";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Spinner } from "./Spinner";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "./Dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function ImageGallery({
  images,
}: Pick<React.ComponentPropsWithoutRef<typeof ImageGalleryInline>, "images">) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const prevImage = useCallback(() => {
    setActiveIndex((prevIndex) => {
      if (prevIndex === 0) {
        return images.length - 1;
      }
      return prevIndex - 1;
    });
  }, [images.length]);

  const nextImage = useCallback(() => {
    setActiveIndex((prevIndex) => {
      if (prevIndex === images.length - 1) {
        return 0;
      }
      return prevIndex + 1;
    });
  }, [images.length]);

  const onThumbnailClick = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const onFullScreenClick = useCallback(() => {
    setIsFullscreen((value) => !value);
  }, []);

  return (
    <>
      <ImageGalleryInline
        images={images}
        activeIndex={activeIndex}
        prevImage={prevImage}
        nextImage={nextImage}
        onThumbnailClick={onThumbnailClick}
        onFullScreenClick={onFullScreenClick}
      />
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-none p-0 border-0" closeButton={false}>
          <VisuallyHidden>
            <DialogTitle>Image gallery in full screen mode</DialogTitle>
          </VisuallyHidden>
          <ImageGalleryFullscreen
            images={images}
            activeIndex={activeIndex}
            prevImage={prevImage}
            nextImage={nextImage}
            onThumbnailClick={onThumbnailClick}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

type ImageGalleryInlineProps = {
  images: React.ImgHTMLAttributes<HTMLImageElement>[];
  activeIndex: number;
  nextImage: () => void;
  prevImage: () => void;
  onThumbnailClick: (index: number) => void;
  onFullScreenClick: () => void;
};
function ImageGalleryInline({
  images,
  activeIndex,
  nextImage,
  prevImage,
  onThumbnailClick,
  onFullScreenClick,
}: ImageGalleryInlineProps) {
  const activeImage = images[activeIndex];

  const thumbnailsElRef = useTrackThumbnailScroll(activeIndex);

  return (
    <div className="not-prose flex flex-col items-center bg-black rounded-md shadow-md shadow-slate-200 border border-input overflow-hidden">
      <div className="relative w-full flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner color="var(--color-gray-100)" />
        </div>

        <img className="relative" key={activeImage.src} {...activeImage} />

        {/* Navigation buttons */}
        {images.length > 1 && (
          <Button
            variant="outline"
            size="icon"
            className="absolute left-3 top-1/2 -translate-y-1/2 shadow-md"
            aria-label="Previous image"
            onClick={prevImage}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        )}

        {images.length > 1 && (
          <Button
            variant="outline"
            size="icon"
            className="absolute right-3 top-1/2 -translate-y-1/2 shadow-md"
            aria-label="Next image"
            onClick={nextImage}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        )}

        {/* Fullscreen button */}
        <Button
          variant="outline"
          size="icon"
          className="hidden md:inline-flex absolute top-3 right-3 shadow-md"
          aria-label="Toggle fullscreen"
          onClick={onFullScreenClick}
        >
          <Maximize className="h-5 w-5" />
        </Button>
      </div>
      <div
        ref={thumbnailsElRef}
        className="w-full p-2 flex space-x-2 overflow-x-auto"
      >
        {images.map((image, idx) => {
          return (
            <button
              key={image.src}
              className={cn(
                "relative cursor-pointer w-28 flex-shrink-0",
                idx === activeIndex ? "brightness-100" : "brightness-50",
              )}
              onClick={() => {
                onThumbnailClick?.(idx);
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Spinner color="var(--color-gray-100)" />
              </div>
              <img className="relative rounded-sm" {...image} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

type ImageGalleryFullscreenProps = Omit<
  ImageGalleryInlineProps,
  "onFullScreenClick"
>;

function ImageGalleryFullscreen({
  images,
  activeIndex,
  nextImage,
  prevImage,
  onThumbnailClick,
}: ImageGalleryFullscreenProps) {
  const activeImage = images[activeIndex];

  const thumbnailsElRef = useTrackThumbnailScroll(activeIndex);

  const [mainContainerMaxHeight, setMainContainerMaxHeight] = useState<
    string | undefined
  >(undefined);

  useLayoutEffect(() => {
    if (thumbnailsElRef.current) {
      const thumbnailsEl = thumbnailsElRef.current;
      setMainContainerMaxHeight(`calc(100% - ${thumbnailsEl.clientHeight}px)`);
    }
  }, [thumbnailsElRef]);

  return (
    <div
      className={cn(
        "not-prose w-screen h-screen flex flex-col items-center bg-black",
      )}
    >
      <div
        className="grow relative w-full flex items-center justify-center"
        style={{ maxHeight: mainContainerMaxHeight }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner color="var(--color-gray-100)" />
        </div>

        <img
          className="relative h-full object-contain"
          key={activeImage.src}
          {...activeImage}
        />

        {/* Navigation buttons */}
        {images.length > 1 && (
          <Button
            variant="outline"
            size="icon"
            className="absolute left-3 top-1/2 -translate-y-1/2"
            aria-label="Previous image"
            onClick={prevImage}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        )}

        {images.length > 1 && (
          <Button
            variant="outline"
            size="icon"
            className="absolute right-3 top-1/2 -translate-y-1/2"
            aria-label="Next image"
            onClick={nextImage}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        )}

        {/* Dialog clolse button */}
        <DialogClose asChild>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-3 top-3"
          >
            <XIcon className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogClose>
      </div>
      <div
        ref={thumbnailsElRef}
        className="shrink-0 w-full p-2 flex space-x-2 overflow-x-auto"
      >
        {images.map((image, idx) => {
          return (
            <button
              key={image.src}
              className={cn(
                "relative cursor-pointer w-36 flex-shrink-0",
                idx === activeIndex ? "brightness-100" : "brightness-50",
              )}
              onClick={() => {
                onThumbnailClick?.(idx);
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Spinner color="var(--color-gray-100)" />
              </div>
              <img className="relative rounded-sm object-contain" {...image} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function useTrackThumbnailScroll(activeIndex: number) {
  const thumbnailsElRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeThumbnailImage =
      thumbnailsElRef.current?.children.item(activeIndex);

    if (activeThumbnailImage) {
      activeThumbnailImage.scrollIntoView({
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeIndex]);

  return thumbnailsElRef;
}

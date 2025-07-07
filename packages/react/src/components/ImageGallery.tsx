import {
  ChevronLeft,
  ChevronRight,
  Maximize,
  SquareArrowOutUpRightIcon,
  XIcon,
} from "lucide-react";
import { Button } from "./Button";
import { cn } from "@website/shared/utils";
import React, { useCallback, useRef, useState } from "react";
import { Spinner } from "./Spinner";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "./Dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function ImageGallery({
  images,
}: Pick<React.ComponentPropsWithoutRef<typeof ImageGalleryImpl>, "images">) {
  const [activeImageIndex, _setActiveImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [inlineThumbnailsElRef, scrollToActiveInlineThumbnail] =
    useTrackThumbnailScroll();
  const [fullscreenThumbnailsElRef, scrollToActiveFullscreenThumbnail] =
    useTrackThumbnailScroll();

  const scrollToActiveThumbnail = useCallback(
    (index: number) => {
      scrollToActiveInlineThumbnail(index);
      scrollToActiveFullscreenThumbnail(index);
    },
    [scrollToActiveInlineThumbnail, scrollToActiveFullscreenThumbnail],
  );

  const setActiveImageIndex = useCallback(
    (index: number) => {
      _setActiveImageIndex(index);
      scrollToActiveThumbnail(index);
    },
    [_setActiveImageIndex, scrollToActiveThumbnail],
  );

  const prevImage = useCallback(() => {
    const nextIndex =
      activeImageIndex === 0 ? images.length - 1 : activeImageIndex - 1;
    setActiveImageIndex(nextIndex);
  }, [images.length, activeImageIndex, setActiveImageIndex]);

  const nextImage = useCallback(() => {
    const nextIndex =
      activeImageIndex === images.length - 1 ? 0 : activeImageIndex + 1;
    setActiveImageIndex(nextIndex);
  }, [images.length, activeImageIndex, setActiveImageIndex]);

  const onThumbnailClick = useCallback(
    (index: number) => {
      setActiveImageIndex(index);
    },
    [setActiveImageIndex],
  );

  const onFullScreenClick = useCallback(() => {
    setIsFullscreen(true);
    queueMicrotask(() => {
      // Putting this in the microtask queue to avoid timing issues with the dialog mounting
      scrollToActiveFullscreenThumbnail(activeImageIndex);
    });
  }, [activeImageIndex, scrollToActiveFullscreenThumbnail]);

  return (
    <>
      <ImageGalleryImpl
        images={images}
        activeImageIndex={activeImageIndex}
        prevImage={prevImage}
        nextImage={nextImage}
        onThumbnailClick={onThumbnailClick}
        onFullScreenClick={onFullScreenClick}
        thumbnailsElRef={inlineThumbnailsElRef}
      />
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-none p-0 border-0" closeButton={false}>
          <VisuallyHidden>
            <DialogTitle>Image gallery in full screen mode</DialogTitle>
          </VisuallyHidden>
          <ImageGalleryImpl
            images={images}
            activeImageIndex={activeImageIndex}
            prevImage={prevImage}
            nextImage={nextImage}
            onThumbnailClick={onThumbnailClick}
            thumbnailsElRef={fullscreenThumbnailsElRef}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

type ImageGalleryImplProps = {
  images: React.ImgHTMLAttributes<HTMLImageElement>[];
  activeImageIndex: number;
  nextImage: () => void;
  prevImage: () => void;
  onThumbnailClick: (index: number) => void;
  onFullScreenClick?: () => void;
  thumbnailsElRef: React.RefObject<HTMLDivElement | null>;
};
function ImageGalleryImpl({
  images,
  activeImageIndex,
  nextImage,
  prevImage,
  onThumbnailClick,
  onFullScreenClick,
  thumbnailsElRef,
}: ImageGalleryImplProps) {
  const activeImage = images[activeImageIndex];
  const galleryType = onFullScreenClick ? "inline" : "fullscreen";

  return (
    <div
      className={cn(
        "not-prose flex flex-col bg-black overflow-hidden",
        galleryType === "inline" &&
          "w-full aspect-5/4 sm:aspect-4/3 rounded-md shadow-md shadow-slate-200 border border-gray-100",
        galleryType === "fullscreen" && "w-screen h-screen",
      )}
    >
      <div className="flex-1 min-h-0 relative w-full flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner color="var(--color-gray-100)" />
        </div>

        {galleryType === "inline" ? (
          <img
            className="relative max-h-full object-contain"
            key={activeImage.src}
            {...activeImage}
          />
        ) : (
          <a
            className="block relative max-h-full"
            href={activeImage.src}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="max-h-full object-contain"
              key={activeImage.src}
              {...activeImage}
            />
          </a>
        )}

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

        {galleryType === "inline" ? (
          <>
            <Button
              asChild
              variant="outline"
              size="icon"
              className="inline-flex md:hidden absolute top-3 right-3 shadow-md"
              aria-label="Open the original image in a new tab"
            >
              <a
                href={activeImage.src}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SquareArrowOutUpRightIcon className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="hidden md:inline-flex absolute top-3 right-3 shadow-md"
              aria-label="Toggle fullscreen"
              onClick={onFullScreenClick}
            >
              <Maximize className="h-5 w-5" />
            </Button>
          </>
        ) : (
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
        )}
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
                "relative cursor-pointer aspect-5/3 flex-shrink-0 border border-gray-500 rounded-sm",
                galleryType === "inline" && "w-24 sm:w-28",
                galleryType === "fullscreen" && "w-36",
                idx === activeImageIndex ? "brightness-100" : "brightness-50",
              )}
              onClick={() => {
                onThumbnailClick?.(idx);
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Spinner color="var(--color-gray-100)" />
              </div>
              <img
                className="w-full h-full object-cover relative rounded-sm"
                {...image}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function useTrackThumbnailScroll() {
  const thumbnailsElRef = useRef<HTMLDivElement>(null);

  const scrollToActiveThumbnail = useCallback((index: number) => {
    const activeThumbnailImage = thumbnailsElRef.current?.children.item(index);

    if (activeThumbnailImage) {
      activeThumbnailImage.scrollIntoView({
        inline: "center",
        block: "nearest",
      });
    }
  }, []);

  return [thumbnailsElRef, scrollToActiveThumbnail] as const;
}

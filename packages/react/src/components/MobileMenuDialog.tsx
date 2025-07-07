import { XIcon } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "./Dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function MobileMenuDialog({
  triggerIcon,
  content,
}: {
  [key: string]: string | string[] | boolean;
}) {
  return (
    <Dialog>
      <DialogTrigger className="focus:outline-none">
        {triggerIcon}
      </DialogTrigger>
      <DialogContent
        className="border-0 p-0 w-full max-w-none sm:max-w-xl md:max-w-2xl overflow-hidden bg-slate-50"
        closeButton={false}
        aria-describedby={undefined}
      >
        <VisuallyHidden asChild>
          <DialogTitle>Mobile menu dialog content</DialogTitle>
        </VisuallyHidden>
        <DialogClose className="z-10 absolute right-3 top-3 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none">
          <XIcon className="size-6 text-gray-400/80" />
          <span className="sr-only">Close</span>
        </DialogClose>
        <div className="max-h-[88dvh] overflow-y-auto px-4 sm:px-10 md:px-24">
          {content}
        </div>
      </DialogContent>
    </Dialog>
  );
}

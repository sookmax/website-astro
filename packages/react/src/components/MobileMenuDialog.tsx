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
        className="border-0 p-0 w-full max-w-xl overflow-auto"
        closeButton={false}
        aria-describedby={undefined}
      >
        <VisuallyHidden asChild>
          <DialogTitle>Mobile menu dialog content</DialogTitle>
        </VisuallyHidden>
        <DialogClose className="z-10 absolute right-3 top-3 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none">
          <XIcon className="size-6 text-gray-500/50" />
          <span className="sr-only">Close</span>
        </DialogClose>
        <div className="max-h-[88vh] overflow-auto">{content}</div>
      </DialogContent>
    </Dialog>
  );
}

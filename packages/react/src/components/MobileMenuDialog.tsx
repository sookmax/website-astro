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
        className="border-0 p-0 w-full max-w-none sm:max-w-xl md:max-w-2xl overflow-hidden bg-slate-50 dark:bg-slate-950"
        closeButton={false}
        aria-describedby={undefined}
      >
        <VisuallyHidden asChild>
          <DialogTitle>Mobile menu dialog content</DialogTitle>
        </VisuallyHidden>
        <DialogClose className="z-10 absolute right-1 top-1 p-2 focus:outline-none">
          <XIcon className="size-5 text-gray-400/80 dark:text-slate-300/80" />
          <span className="sr-only">Close</span>
        </DialogClose>
        <div className="max-h-[85dvh] overflow-y-auto">{content}</div>
      </DialogContent>
    </Dialog>
  );
}

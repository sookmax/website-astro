// https://github.com/withastro/starlight/blob/main/packages/starlight/components/TableOfContents/starlight-toc.ts
import { PAGE_TITLE_ID } from "@/consts";

export class StarlightTOC extends HTMLElement {
  private _current = this.querySelector<HTMLAnchorElement>(
    'a[aria-current="true"]',
  );
  private minH = parseInt(this.dataset.minH || "2", 10);
  private maxH = parseInt(this.dataset.maxH || "3", 10);

  protected set current(link: HTMLAnchorElement) {
    if (link === this._current) return;
    if (this._current) this._current.removeAttribute("aria-current");
    link?.setAttribute("aria-current", "true");
    this._current = link;
  }

  private onIdle = (cb: IdleRequestCallback) =>
    (window.requestIdleCallback || ((cb) => setTimeout(cb, 1)))(cb);

  constructor() {
    super();
    this.onIdle(() => this.init());
  }

  private init = (): void => {
    /** All the links in the table of contents. */
    const links = [...this.querySelectorAll("a")];

    /** Test if an element is a table-of-contents heading. */
    const isHeading = (el: Element): el is HTMLHeadingElement => {
      if (el instanceof HTMLHeadingElement) {
        // Special case for page title h1
        if (el.id === PAGE_TITLE_ID) return true;
        // Check the heading level is within the user-configured limits for the ToC
        const level = el.tagName[1];
        if (level) {
          const int = parseInt(level, 10);
          if (int >= this.minH && int <= this.maxH) return true;
        }
      }
      return false;
    };

    /** Walk up the DOM to find the nearest heading. */
    const getElementHeading = (
      el: Element | null,
    ): HTMLHeadingElement | null => {
      if (!el) return null;
      const origin = el;
      while (el) {
        if (isHeading(el)) return el;
        // Assign the previous sibling’s last, most deeply nested child to el.
        el = el.previousElementSibling;
        while (el?.lastElementChild) {
          el = el.lastElementChild;
        }
        // Look for headings amongst siblings.
        const h = getElementHeading(el);
        if (h) return h;
      }
      // Walk back up the parent.
      return getElementHeading(origin.parentElement);
    };

    /** Handle intersections and set the current link to the heading for the current intersection. */
    const setCurrent: IntersectionObserverCallback = (entries) => {
      for (const { isIntersecting, target } of entries) {
        if (!isIntersecting) continue;
        const heading = getElementHeading(target);
        if (!heading) continue;
        const link = links.find(
          (link) => link.hash === "#" + encodeURIComponent(heading.id),
        );
        if (link) {
          this.current = link;
          return;
        }
      }
    };

    // Observe elements with an `id` (most likely headings) and their siblings.
    // Also observe direct children of `.content` to include elements before
    // the first heading.
    const toObserve = document.querySelectorAll(
      "main article header > *, main article [id], main article [id] ~ *",
    );

    let observer: IntersectionObserver | undefined;
    const observe = () => {
      if (observer) return;
      observer = new IntersectionObserver(setCurrent, {
        rootMargin: this.getRootMargin(),
      });
      toObserve.forEach((h) => observer!.observe(h));
    };
    observe();

    let timeout: NodeJS.Timeout;
    window.addEventListener("resize", () => {
      // Disable intersection observer while window is resizing.
      if (observer) {
        observer.disconnect();
        observer = undefined;
      }
      clearTimeout(timeout);
      timeout = setTimeout(() => this.onIdle(observe), 100);
    });
  };

  private getRootMargin(): `-${number}px 0% ${number}px` {
    // const navBarHeight =
    //   document.querySelector("header")?.getBoundingClientRect().height || 0;
    const navBarHeight =
      document.getElementById("main-breadcrumbs")?.getBoundingClientRect()
        .height || 0;
    // `<summary>` only exists in mobile ToC, so will fall back to 0 in large viewport component.
    // const mobileTocHeight =
    // this.querySelector("summary")?.getBoundingClientRect().height || 0;
    const mobileTocHeight =
      document.getElementById("starlight__mobile-toc")?.getBoundingClientRect()
        .height || 0;
    const top = navBarHeight + mobileTocHeight;
    /** End intersections `53px` later. This is slightly more than the maximum `margin-top` in Markdown content. */
    const bottom = top + 50;
    const height =
      window.visualViewport?.height || document.documentElement.clientHeight;
    return `-${top}px 0% ${bottom - height}px`;
  }
}

customElements.define("starlight-toc", StarlightTOC);

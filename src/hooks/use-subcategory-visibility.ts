import { useEffect, useRef, useState, type RefObject } from "react";
import { nativeStorage } from "zmp-sdk";

const storageKeysToClear = new Set<string>();
let hasRegisteredExitHandler = false;

interface UseSubcategoryVisibilityProps {
  containerRef: RefObject<HTMLElement>;
  subcategoryIds: string[];
  storageKey?: string;
}

export function useSubcategoryVisibility({
  containerRef,
  subcategoryIds,
  storageKey = "visible_subcategory_id",
}: UseSubcategoryVisibilityProps) {
  const [activeSubcategoryId, setActiveSubcategoryId] = useState<string>("");
  const hasRestoredRef = useRef(false);
  const scrollSaveFrame = useRef<number>();

  useEffect(() => {
    storageKeysToClear.add(storageKey);

    if (hasRegisteredExitHandler) return;
    const handleAppExit = () => {
      storageKeysToClear.forEach((key) => {
        try {
          nativeStorage.removeItem(key);
        } catch (error) {
          console.error("Failed to clear subcategory storage", error);
        }
      });
    };

    window.addEventListener("beforeunload", handleAppExit);
    hasRegisteredExitHandler = true;
  }, [storageKey]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !subcategoryIds.length || hasRestoredRef.current) return;

    try {
      const savedPosition = Number(nativeStorage.getItem(storageKey));
      if (Number.isFinite(savedPosition) && savedPosition >= 0) {
        requestAnimationFrame(() => {
          container.scrollTo({ top: savedPosition, behavior: "auto" });
        });
      }
    } catch (error) {
      console.error("Failed to restore subcategory position", error);
    } finally {
      hasRestoredRef.current = true;
    }
  }, [containerRef, storageKey, subcategoryIds]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !subcategoryIds.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        const firstVisibleId = visibleEntries[0]?.target.id;
        if (firstVisibleId) {
          setActiveSubcategoryId((prev) =>
            prev === firstVisibleId ? prev : firstVisibleId,
          );
        }
      },
      {
        root: container,
        threshold: 0.15,
      },
    );

    subcategoryIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [containerRef, subcategoryIds]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (scrollSaveFrame.current) {
        cancelAnimationFrame(scrollSaveFrame.current);
      }
      scrollSaveFrame.current = requestAnimationFrame(() => {
        try {
          nativeStorage.setItem(storageKey, container.scrollTop.toString());
        } catch (error) {
          console.error("Failed to persist scroll position", error);
        }
      });
    };

    container.addEventListener("scroll", handleScroll);
    return () => {
      if (scrollSaveFrame.current) {
        cancelAnimationFrame(scrollSaveFrame.current);
      }
      container.removeEventListener("scroll", handleScroll);
    };
  }, [containerRef, storageKey]);

  return { activeSubcategoryId, setActiveSubcategoryId };
}

import { useRef, useCallback, useEffect, useState } from "react";

export const useInfiniteScroll = (page: number, hasMore: boolean) => {
  const [scrollPage, setScrollPage] = useState(page);
  const loader = useRef(null);
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !hasMore) {
        setScrollPage((prevPage) => prevPage + 1);
        console.log(scrollPage);
      }
    },
    [hasMore]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  return { loader, scrollPage };
};

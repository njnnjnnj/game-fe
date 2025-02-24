import { useCallback, useEffect, useState } from "react";

import { UseEmblaCarouselType } from "embla-carousel-react";

type UsePrevNextButtonsType = {
  isPrevBtnDisabled: boolean;
  isNextBtnDisabled: boolean;
  onPrevButtonClick?: () => void;
  onNextButtonClick?: () => void;
};

type EmblaCarouselType = UseEmblaCarouselType[1];

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
): UsePrevNextButtonsType => {
  const [isPrevBtnDisabled, setIsPrevBtnDisabled] = useState(true);
  const [isNextBtnDisabled, setIsNextBtnDisabled] = useState(true);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setIsPrevBtnDisabled(!emblaApi?.canScrollPrev());
    setIsNextBtnDisabled(!emblaApi?.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);

    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    isPrevBtnDisabled,
    isNextBtnDisabled,
    onPrevButtonClick: emblaApi?.scrollPrev,
    onNextButtonClick: emblaApi?.scrollNext,
  };
};

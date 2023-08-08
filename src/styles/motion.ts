let easing = [0.175, 0.85, 0.42, 0.96];

export const mainPageTitleVariants = {
  exit: { y: -15, opacity: 0, transition: { duration: 0.2, ease: easing } },
  enter: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.2, duration: 1, ease: easing },
  },
};

export const detailSearchModalVariants = {
  exit: { y: -15, opacity: 0, transition: { duration: 0.2, ease: easing } },
  show: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.2, duration: 1, ease: easing },
  },
};

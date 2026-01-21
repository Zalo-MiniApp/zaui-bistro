type ScrollToOptions = ScrollIntoViewOptions & { behavior?: ScrollBehavior };

export const scrollToId = (id: string, options?: ScrollToOptions) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: options?.behavior ?? "smooth",
    block: "start",
    ...options,
  });
};

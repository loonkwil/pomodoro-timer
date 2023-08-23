export const isCSSNestingSupported = () => CSS.supports("selector(&)");

export const isCSSContainerQueriesSupported = () =>
  CSS.supports("container-type: inline-size");

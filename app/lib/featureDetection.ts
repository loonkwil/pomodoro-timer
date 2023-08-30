export function isCSSNestingSupported(): boolean {
  return CSS.supports("selector(&)");
}

export function isCSSContainerQueriesSupported(): boolean {
  return CSS.supports("container-type: inline-size");
}

/**
 * Right now CSS.supports does not have a reliable way to detect styled container queries.
 * https://github.com/w3c/csswg-drafts/issues/2463#issuecomment-1016720310
 * https://bugs.chromium.org/p/chromium/issues/detail?id=1355774
 */
export function isCSSContainerStyleQueriesSupported(): boolean {
  const containerId = `__wrapper-id-${Math.round(Math.random() * 1e9)}`;

  const $wrapper = document.createElement("div");
  $wrapper.setAttribute("hidden", "");
  $wrapper.innerHTML = `
    <style>
      #${containerId} {
        container: container-name;
        --is-supported: false;
      }

      @container container-name style(--is-supported: false) {
        #${containerId} > * { --is-supported: true; }
      }
    </style>
    <div id="${containerId}">
      <div></div>
    </div>
  `;

  document.body.appendChild($wrapper);

  let isSupported = false;

  const $child = $wrapper.querySelector(`#${containerId} > *`);
  if ($child) {
    isSupported =
      getComputedStyle($child).getPropertyValue("--is-supported") === "true";
  }

  $wrapper.remove();
  return isSupported;
}

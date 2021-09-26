import LinkPreview from "./LinkPreview.wc.svelte";
import Interior from "./Interior.svelte";
import Wrapper from "./Wrapper.svelte";

import { btoa } from "abab";
import { nanoid } from "nanoid";

const defaultLinkGetter = () => {
  return document.getElementsByTagName("a");
};

window.setPagePreviews = function (
  styles = null,
  linkGetter = defaultLinkGetter
) {
  const pageATags = [...linkGetter()];

  let styleRules = "";

  // copy the relevant styles over
  for (const rule of styles.rules) {
    if (rule.selectorText.indexOf(".hyperfov") !== -1) {
      styleRules += rule.cssText + "\n";
    }
  }

  // get the positions of all the links
  for (const a of pageATags) {
    const aPos = a.getBoundingClientRect();

    const shadowId = nanoid();

    // add preview component to the element
    a.innerHTML += `<link-preview id="${shadowId}" position="${btoa(
      JSON.stringify(aPos)
    )}" href="${a.href}"></link-preview>`;

    const shadow = document.getElementById(shadowId).shadowRoot;

    // add the relevant styles to the shadow dom
    const shadowStyle = document.createElement("style");
    shadowStyle.innerHTML = styleRules;
    shadow.appendChild(shadowStyle);
  }
};

export { LinkPreview, Interior, Wrapper };

/* Every place worth stopping: each section, and each step of the two sticky stories. */
const STOPS = "section[data-screen-label], [data-scbefore], [data-scstep]";

/**
 * Smooth-scroll to the next stop below the fold. When the next stop is more
 * than a screen away (inside a long section), move one screen instead, so
 * every click visibly advances the story.
 */
export function scrollNext() {
  const y = window.scrollY;
  const vh = window.innerHeight;
  const next = Array.from(document.querySelectorAll(STOPS))
    .map((el) => el.getBoundingClientRect().top + y)
    // Skip anything already near the top of the screen (the hero under the nav).
    .filter((top) => top > y + vh * 0.2)
    .sort((a, b) => a - b)[0];
  const to = next === undefined || next - y > vh * 1.2 ? y + vh * 0.85 : next;
  window.scrollTo({ top: to, behavior: "smooth" });
}

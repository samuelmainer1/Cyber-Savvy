import DOMPurify from "isomorphic-dompurify";

/**
 * Shared blog-HTML sanitizer — used client-side (editor) AND server-side
 * (admin content API) so stored XSS can't be bypassed with curl.
 *
 * Allowlist covers everything the rich editor produces plus the tables,
 * code blocks and embeds your existing posts use.
 */
const ALLOWED_TAGS = [
  "p", "br",
  "h1", "h2", "h3", "h4", "h5", "h6",
  "strong", "b", "em", "i", "u", "s", "sub", "sup", "mark",
  "ul", "ol", "li",
  "blockquote", "pre", "code",
  "a", "img",
  "table", "thead", "tbody", "tfoot", "tr", "th", "td",
  "hr", "span", "div",
];

const ALLOWED_ATTR = [
  "href", "title", "target", "rel",
  "src", "alt", "width", "height", "loading",
  "colspan", "rowspan",
  "class",
];

export function sanitizeBlogHtml(input: string): string {
  return DOMPurify.sanitize(input || "", {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOW_DATA_ATTR: false,
    // Never allow script execution vectors, even if pasted in.
    FORBID_TAGS: ["script", "style", "iframe", "form", "input", "button", "object", "embed", "link", "meta"],
    FORBID_ATTR: ["onerror", "onload", "onclick", "onmouseover", "style"],
  });
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { sanitizeBlogHtml } from "@/lib/sanitize";

type Command = never;

function sanitizeHtml(input: string) {
  return sanitizeBlogHtml(input);
}

function safeExec(command: string, value?: string) {
  try {
    document.execCommand(command, false, value);
  } catch {
    // ignore
  }
}

function stripFormatting(node: HTMLElement) {
  const tags = ["B", "STRONG", "I", "EM", "U", "S", "SUB", "SUP", "FONT", "SPAN", "A", "H1", "H2", "H3", "H4", "H5", "H6", "BLOCKQUOTE"];

  tags.forEach((tag) => {
    node.querySelectorAll(tag).forEach((element) => {
      const parentNode = element.parentNode;
      if (!parentNode) return;

      while (element.firstChild) {
        parentNode.insertBefore(element.firstChild, element);
      }
      parentNode.removeChild(element);
    });
  });

  node.querySelectorAll("UL, OL").forEach((list) => {
    const parent = list.parentNode;
    if (!parent) return;

    const items = Array.from(list.children) as HTMLElement[];
    items.forEach((item) => {
      const paragraph = document.createElement("p");
      paragraph.innerHTML = item.innerHTML.trim();
      parent.insertBefore(paragraph, list);
    });
    parent.removeChild(list);
  });
}

function getSelectionRange() {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return null;
  return sel.getRangeAt(0);
}

export default function RichBlogEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const el = ref.current;
    if (!el) return;
    if (el.innerHTML !== value) {
      el.innerHTML = value || "";
    }
  }, [value, hydrated]);



  const syncEditor = () => {
    const html = ref.current?.innerHTML ?? "";
    onChange(sanitizeHtml(html));
  };

  const elFocus = () => {
    const editor = ref.current;
    if (!editor) return;

    editor.focus();

    const selection = window.getSelection();
    if (!selection) return;

    const isInsideEditor =
      selection.rangeCount > 0 && editor.contains(selection.anchorNode) && editor.contains(selection.focusNode);

    if (!isInsideEditor) {
      const range = document.createRange();
      range.selectNodeContents(editor);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  const apply = (action: string, payload?: string) => {
    const editor = ref.current;
    if (!editor) return;

    elFocus();

    setTimeout(() => {
      if (action === "createLink") {
        const url = window.prompt("Link URL (https://...)");
        if (!url) return;
        safeExec("createLink", url);
        syncEditor();
        return;
      }

      if (action === "bold") {
        safeExec("bold");
        syncEditor();
        return;
      }

      if (action === "italic") {
        safeExec("italic");
        syncEditor();
        return;
      }

      if (action === "underline") {
        safeExec("underline");
        syncEditor();
        return;
      }

      if (action === "formatBlock") {
        const block = payload?.toLowerCase() ?? "p";
        safeExec("formatBlock", block);
        syncEditor();
        return;
      }

      if (action === "removeFormat") {
        const editor = ref.current;
        if (!editor) return;
        safeExec("removeFormat");
        stripFormatting(editor);
        syncEditor();
        return;
      }

      if (action === "insertUnorderedList") {
        safeExec("insertUnorderedList");
        syncEditor();
        return;
      }

      if (action === "insertOrderedList") {
        safeExec("insertOrderedList");
        syncEditor();
        return;
      }

      if (payload) safeExec(action, payload);
      else safeExec(action);
      syncEditor();
    }, 0);
  };

  const toolbarItems = useMemo(
    () => [
      { label: "P", action: "formatBlock", payload: "p" },
      { label: "H1", action: "formatBlock", payload: "h1" },
      { label: "H2", action: "formatBlock", payload: "h2" },
      { label: "H3", action: "formatBlock", payload: "h3" },
      { label: "H4", action: "formatBlock", payload: "h4" },
      { label: "H5", action: "formatBlock", payload: "h5" },
      { label: "H6", action: "formatBlock", payload: "h6" },
      { label: "B", action: "bold" },
      { label: "I", action: "italic" },
      { label: "U", action: "underline" },
      { label: "• List", action: "insertUnorderedList" },
      { label: "1. List", action: "insertOrderedList" },
      { label: "Quote", action: "formatBlock", payload: "blockquote" },
      { label: "Link", action: "createLink" },
      { label: "Clear", action: "removeFormat" },
    ],
    []
  );

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
        {toolbarItems.map((item) => (
          <button
            key={item.label}
            type="button"
            aria-label={item.label}
            title={item.label}
            className="rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-[11px] font-black text-gray-700 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => apply(item.action, (item as any).payload)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={syncEditor}
        onBlur={syncEditor}
        className="min-h-[260px] w-full rounded-3xl border border-gray-200 bg-white px-5 py-4 text-sm leading-relaxed shadow-inner outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
      />

      <div className="text-xs text-gray-500">Tip: Highlight text then click Bold/Italic/Headings to format the selection.</div>
    </div>
  );
}

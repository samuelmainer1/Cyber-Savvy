"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type FeedMessage = {
  id: string;
  name: string;
  email: string;
  service: string;
  status: "unread" | "read" | "replied";
  createdAt: string;
  preview: string;
};

type FeedSubscriber = { id: string; email: string; createdAt: string };

type Feed = { messages: FeedMessage[]; subscribers: FeedSubscriber[]; unreadMessages: number };

const SEEN_KEY = "cs-admin-notif-seen";

function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  if (!Number.isFinite(then)) return "";
  const seconds = Math.max(0, Math.floor((Date.now() - then) / 1000));
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

/**
 * Header bell for new contact/booking messages + newsletter subscribers.
 * Badge = unread messages + subscribers added since last "Mark all as read".
 */
export default function NotificationBell({
  refreshSignal,
  onOpenTab,
  onChanged,
  notify,
}: {
  refreshSignal: number;
  onOpenTab: (tab: "messages" | "subscribers") => void;
  onChanged: () => Promise<void>;
  notify: (text: string) => void;
}) {
  const [feed, setFeed] = useState<Feed>({ messages: [], subscribers: [], unreadMessages: 0 });
  const [open, setOpen] = useState(false);
  const [seenAt, setSeenAt] = useState(0);
  const seenAtRef = useRef(0);
  const prevTotalRef = useRef<number | null>(null);
  const notifyRef = useRef(notify);

  useEffect(() => {
    notifyRef.current = notify;
  }, [notify]);

  const newSubscriberCount = (items: FeedSubscriber[], since: number) =>
    since ? items.filter((item) => new Date(item.createdAt || 0).getTime() > since).length : 0;

  const fetchFeed = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/notifications");
      if (!response.ok) return;
      const json: Feed = await response.json();
      setFeed(json);

      const total = json.unreadMessages + newSubscriberCount(json.subscribers, seenAtRef.current);
      if (prevTotalRef.current !== null && total > prevTotalRef.current) {
        const delta = total - prevTotalRef.current;
        notifyRef.current(`🔔 ${delta} new notification${delta === 1 ? "" : "s"}`);
      }
      prevTotalRef.current = total;
    } catch {
      // Polling is best-effort; the next tick retries.
    }
  }, []);

  // Initial load + 30s polling + refresh when the window regains focus.
  useEffect(() => {
    const stored = Number(localStorage.getItem(SEEN_KEY) || 0);
    const initial = Number.isFinite(stored) && stored > 0 ? stored : Date.now();
    seenAtRef.current = initial;
    setSeenAt(initial);
    if (!stored) localStorage.setItem(SEEN_KEY, String(initial));

    fetchFeed();
    const interval = setInterval(fetchFeed, 30_000);
    const onFocus = () => fetchFeed();
    window.addEventListener("focus", onFocus);
    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", onFocus);
    };
  }, [fetchFeed]);

  // Re-sync after admin actions (reply, delete, status change) mutate the data.
  useEffect(() => {
    fetchFeed();
  }, [refreshSignal, fetchFeed]);

  const markAllSeen = async () => {
    const unread = feed.messages.filter((item) => item.status === "unread");
    await Promise.all(
      unread.map((item) =>
        fetch("/api/admin/content", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "message", id: item.id, status: "read" }),
        })
      )
    );
    const now = Date.now();
    localStorage.setItem(SEEN_KEY, String(now));
    seenAtRef.current = now;
    setSeenAt(now);
    await fetchFeed();
    await onChanged();
    notify("Notifications cleared.");
  };

  const badge = feed.unreadMessages + newSubscriberCount(feed.subscribers, seenAt);
  const shownMessages = feed.messages.slice(0, 8);
  const shownSubscribers = feed.subscribers.slice(0, 8);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={badge > 0 ? `Notifications (${badge} new)` : "Notifications"}
        className="relative rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-300"
      >
        🔔
        {badge > 0 ? (
          <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-[1.25rem] animate-pulse items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-black text-white ring-2 ring-slate-900">
            {badge > 99 ? "99+" : badge}
          </span>
        ) : null}
      </button>

      {open ? (
        <>
          <div className="fixed inset-0 z-40" aria-hidden onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full z-50 mt-2 w-[23rem] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-800 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                  Notifications
                </p>
                <p className="mt-0.5 text-sm font-bold">
                  {badge > 0 ? (
                    <span className="text-slate-800">{badge} new</span>
                  ) : (
                    <span className="text-slate-400">All caught up 🎉</span>
                  )}
                </p>
              </div>
              <button
                type="button"
                onClick={markAllSeen}
                disabled={badge === 0}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-black text-slate-600 transition hover:bg-slate-50 disabled:opacity-40"
              >
                Mark all as read
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto">
              <p className="px-4 pb-1 pt-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Messages
              </p>
              {shownMessages.length === 0 ? (
                <p className="px-4 py-2 text-xs text-slate-400">No messages yet.</p>
              ) : (
                shownMessages.map((item) => (
                  <button
                    key={`m-${item.id}`}
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      onOpenTab("messages");
                    }}
                    className={`flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-slate-50 ${
                      item.status === "unread" ? "bg-amber-50/60" : ""
                    }`}
                  >
                    <span
                      className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                        item.status === "unread"
                          ? "bg-amber-400"
                          : item.status === "replied"
                            ? "bg-emerald-400"
                            : "bg-slate-300"
                      }`}
                      aria-hidden
                    />
                    <span className="min-w-0">
                      <span className="flex items-center gap-2">
                        <span className="truncate text-sm font-bold text-slate-900">{item.name}</span>
                        {item.status === "unread" ? (
                          <span className="shrink-0 rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide text-amber-700">
                            new
                          </span>
                        ) : null}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-slate-500">
                        {item.service}
                        {item.createdAt ? ` · ${timeAgo(item.createdAt)}` : ""}
                      </span>
                      {item.preview ? (
                        <span className="mt-0.5 block truncate text-xs text-slate-600">
                          {item.preview}
                        </span>
                      ) : null}
                    </span>
                  </button>
                ))
              )}

              <div className="mx-4 my-2 border-t border-slate-100" />

              <p className="px-4 pb-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Subscribers
              </p>
              {shownSubscribers.length === 0 ? (
                <p className="px-4 py-2 text-xs text-slate-400">No subscribers yet.</p>
              ) : (
                shownSubscribers.map((item) => {
                  const isNew = seenAt ? new Date(item.createdAt || 0).getTime() > seenAt : false;
                  return (
                    <button
                      key={`s-${item.id}`}
                      type="button"
                      onClick={() => {
                        setOpen(false);
                        onOpenTab("subscribers");
                      }}
                      className={`flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-slate-50 ${
                        isNew ? "bg-emerald-50/60" : ""
                      }`}
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-black text-indigo-600">
                        ✉
                      </span>
                      <span className="min-w-0">
                        <span className="flex items-center gap-2">
                          <span className="truncate text-sm font-bold text-slate-900">
                            {item.email}
                          </span>
                          {isNew ? (
                            <span className="shrink-0 rounded-full bg-emerald-100 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide text-emerald-700">
                              new
                            </span>
                          ) : null}
                        </span>
                        <span className="mt-0.5 block text-xs text-slate-500">
                          {timeAgo(item.createdAt)}
                        </span>
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-2.5">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onOpenTab("messages");
                }}
                className="text-xs font-black text-indigo-600 hover:underline"
              >
                Open messages →
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onOpenTab("subscribers");
                }}
                className="text-xs font-black text-indigo-600 hover:underline"
              >
                Open subscribers →
              </button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}


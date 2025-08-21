// src/pages/BlogWritePage.tsx
import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import { AlertTriangle, Info } from "lucide-react";
import {
  Bold, Italic, Heading2, Strikethrough, Code, Link as LinkIcon,
  List, ListOrdered, Quote, Image as ImageIcon, Minus, Eye, PencilLine,
  Sun, Moon, FileUp, Link as Chain, PlayCircle, Redo, Undo, Highlighter, AlignJustify,
} from "lucide-react";

// ---------- Types ----------
export type BlogStatus = "draft" | "published";
export type BlogDraft = {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  coverUrl?: string | null;
  contentHtml: string;
  status: BlogStatus;
  updatedAt: number;
};

export type BlogWritePageProps = {
  storageKey?: string;
  initial?: Partial<BlogDraft>;
  onSave?: (draft: BlogDraft) => Promise<void> | void;
  onPublish?: (draft: BlogDraft) => Promise<{ ok?: boolean; url?: string } | void> | void;
  onUpload?: (file: File) => Promise<string>;
};

// ---------- Env ----------
const STORAGE_KEY_DEFAULT = "blog:editor:tiptap:luxe";
const API_BASE = import.meta.env.VITE_API_CONTENT ?? "http://localhost:3000";
const PUBLIC_BASE = import.meta.env.VITE_PUBLIC_BASE ?? "http://localhost:3000";

// ---------- Utils ----------
function normalizeStr(input: string) {
  return input.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
}
function slugify(input: string) {
  const cleaned = normalizeStr(input)
    .toLowerCase()
    .replace(/[^a-z0-9\u0E00-\u0E7F\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return cleaned;
}
function thaiCharCount(text?: string) {
  const safe = text ?? "";
  return safe.replace(/[\s\n\r\t]+/g, "").length;
}

export default function BlogWritePage({
  storageKey = STORAGE_KEY_DEFAULT,
  initial,
  onSave: onSaveProp,
  onPublish: onPublishProp,
  onUpload,
}: BlogWritePageProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [title, setTitle] = useState(initial?.title ?? "บทความใหม่ของฉัน");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [lockSlug, setLockSlug] = useState(false);
  const [description, setDescription] = useState(initial?.description ?? "สรุปใจความของบทความนี้ไม่เกิน 160 อักขระ");
  const [tags, setTags] = useState<string[]>(initial?.tags ?? ["guson", "howto"]);
  const [tagInput, setTagInput] = useState("");
  const [coverUrl, setCoverUrl] = useState<string | null>(initial?.coverUrl ?? null);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<number | null>(initial?.updatedAt ?? null);
  const [status, setStatus] = useState<BlogStatus>(initial?.status ?? "draft");
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [warning, setWarning] = useState<string | null>(null);
  const [toast, setToast] = useState<{ kind: "success" | "warn" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  // ---------- Editor ----------
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3, 4] } }),
      Placeholder.configure({ placeholder: "พิมพ์เนื้อหา... ใช้ / เพื่อเรียกคำสั่งเร็ว (เช่น /ภาพ, /ยูทูบ)" }),
      Link.configure({ openOnClick: true, autolink: true, defaultProtocol: "https" }),
      Image,
      Youtube.configure({ controls: false, nocookie: true, modestBranding: true }),
    ],
    content: initial?.contentHtml ?? "<h2>สวัสดี 👋</h2><p>นี่คือ <b>Luxe Tiptap Editor</b> — เขียนสบาย ดูดี และพร้อมเผยแพร่</p>",
    editorProps: { attributes: { class: "min-h-[62vh] focus:outline-none" } },
    onCreate: ({ editor }) => {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        try {
          const d = JSON.parse(saved) as BlogDraft;
          setTitle(d.title ?? title);
          setSlug(d.slug ?? slug);
          setDescription(d.description ?? description);
          setTags(d.tags ?? tags);
          setCoverUrl(d.coverUrl ?? coverUrl);
          editor.commands.setContent(d.contentHtml ?? "");
          setStatus(d.status ?? "draft");
          setLastSaved(d.updatedAt ?? null);
        } catch {}
      }
      // try to send outbox when online
      try {
        const key = `${storageKey}:outbox`;
        const raw = localStorage.getItem(key);
        if (raw && typeof navigator !== "undefined" && navigator.onLine !== false) {
          const box: Array<{ when: number; draft: BlogDraft }> = JSON.parse(raw);
          if (box.length) {
            (async () => {
              const rest: typeof box = [];
              for (const item of box) {
                try {
                  await (onSaveProp ?? apiSaveDraft)(item.draft);
                } catch {
                  rest.push(item);
                }
              }
              if (rest.length === 0) localStorage.removeItem(key);
              else localStorage.setItem(key, JSON.stringify(rest));
            })();
          }
        }
      } catch {}
    },
    onUpdate: () => scheduleAutosave(),
  });

  // auto-slug
  useEffect(() => {
    if (!lockSlug) setSlug(slugify(title));
  }, [title, lockSlug]);

  // ---------- Draft helpers ----------
  const currentDraft = useCallback((): BlogDraft => ({
    title,
    slug,
    description,
    tags,
    coverUrl,
    contentHtml: editor?.getHTML() ?? "",
    status,
    updatedAt: Date.now(),
  }), [title, slug, description, tags, coverUrl, status, editor]);

  function clearLocalDrafts() {
    try {
      localStorage.removeItem(storageKey);
      localStorage.removeItem(`${storageKey}:outbox`);
      localStorage.removeItem(`${storageKey}:serverMeta`);
    } catch {}
  }
  function resetEditorAfterPublish() {
    clearLocalDrafts();
    setTitle("บทความใหม่ของฉัน");
    setSlug("");
    setLockSlug(false);
    setDescription("สรุปใจความของบทความนี้ไม่เกิน 160 อักขระ");
    setTags(["guson", "howto"]);
    setTagInput("");
    setCoverUrl(null);
    setStatus("draft");
    setLastSaved(null);
    setTab("write");
    setWarning(null);
    editor?.commands.clearContent(true);
    editor?.commands.setContent("");
    try { window.scrollTo({ top: 0, behavior: "smooth" }); } catch {}
  }

  // ---------- Autosave ----------
  const autosaveTimer = useRef<number | null>(null);
  const scheduleAutosave = () => {
    if (autosaveTimer.current) window.clearTimeout(autosaveTimer.current);
    setSaving(true);
    autosaveTimer.current = window.setTimeout(async () => {
      const draft = currentDraft();
      try {
        localStorage.setItem(storageKey, JSON.stringify(draft));
        setLastSaved(draft.updatedAt);
        await onSave(draft);
        setSaving(false);
      } catch {
        setSaving(false);
      }
    }, 600);
  };

  // ---------- Backend (default) ----------
  async function apiSaveDraft(draft: BlogDraft) {
    const res = await fetch(`${API_BASE}/api/blogs/draft`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft),
    });
    if (!res.ok) throw new Error(`Draft save failed: ${res.status}`);
    const data = await res.json().catch(() => ({}));
    if (data && (data.id || data.version)) {
      const key = `${storageKey}:serverMeta`;
      localStorage.setItem(key, JSON.stringify({ id: data.id, version: data.version, at: Date.now() }));
    }
  }
  async function apiPublish(draft: BlogDraft) {
    const res = await fetch(`${API_BASE}/api/blogs/publish`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft),
    });
    if (!res.ok) throw new Error(`Publish failed: ${res.status} ${await res.text().catch(()=>"")}`);
    return (await res.json().catch(() => ({}))) as { ok?: boolean; url?: string };
  }

  const onSave = onSaveProp ?? apiSaveDraft;
  const onPublish = onPublishProp ?? apiPublish;

  // ---------- Actions ----------
  const [isSavingManual, setIsSavingManual] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const manualSave = async () => {
    if (isSavingManual) return;
    setIsSavingManual(true);
    const draft = currentDraft();
    try {
      localStorage.setItem(storageKey, JSON.stringify(draft));
      setLastSaved(draft.updatedAt);

      if (typeof navigator !== "undefined" && navigator && navigator.onLine === false) {
        const key = `${storageKey}:outbox`;
        const box = JSON.parse(localStorage.getItem(key) || "[]");
        box.push({ when: Date.now(), draft });
        localStorage.setItem(key, JSON.stringify(box));
        setToast({ kind: "warn", text: "ออฟไลน์: เก็บลงคิว ส่งให้อัตโนมัติเมื่อออนไลน์" });
        return;
      }

      await onSave(draft);
      setToast({ kind: "success", text: "บันทึกแล้ว" });
    } catch (e) {
      try {
        const key = `${storageKey}:outbox`;
        const box = JSON.parse(localStorage.getItem(key) || "[]");
        box.push({ when: Date.now(), draft });
        localStorage.setItem(key, JSON.stringify(box));
      } catch {}
      setToast({ kind: "error", text: "บันทึกไม่สำเร็จ: จะลองส่งใหม่อัตโนมัติ" });
    } finally {
      setIsSavingManual(false);
    }
  };

  const handlePublish = async () => {
    if (isPublishing) return;

    setIsPublishing(true);
    // basic validations
    if (!title || title.trim().length < 5) { setWarning("ตั้งชื่อบทความอย่างน้อย 5 อักขระ"); setIsPublishing(false); return; }
    if (!slug) { setWarning("Slug ว่างไม่ได้"); setIsPublishing(false); return; }
    if ((editor?.getText() ?? "").trim().length < 100) { setWarning("เนื้อหาควรยาวอย่างน้อย ~100 อักขระ"); setIsPublishing(false); return; }
    if (description.length > 160) { setWarning("Meta description ไม่ควรเกิน 160 อักขระ"); setIsPublishing(false); return; }
    setWarning(null);

    // build final draft & publish
    const draft = { ...currentDraft(), status: "published" as BlogStatus };
    try {
      const res = await onPublish(draft); // <-- สำคัญ! ยิง /api/blogs/publish
      setToast({ kind: "success", text: "เผยแพร่เรียบร้อย!" });

      // clear UI & redirect
      resetEditorAfterPublish();

      const url = (res as any)?.url || `${PUBLIC_BASE}/post/${encodeURIComponent(draft.slug)}`;
      window.location.href = url; // ไปหน้าอ่าน static หรือ SPA redirect
    } catch (e: any) {
      setToast({ kind: "error", text: `เผยแพร่ไม่สำเร็จ: ${e?.message || "unknown error"}` });
    } finally {
      setIsPublishing(false);
    }
  };

  // ---------- Shortcuts ----------
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        manualSave();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // ---------- Derived UI ----------
  const contentText = editor?.getText() ?? "";
  const charCount = useMemo(() => thaiCharCount(contentText), [contentText]);
  const descLeft = 160 - description.length;
  const descPct = Math.min(100, Math.max(0, Math.round((description.length / 160) * 100)));

  // ---------- Dialog states ----------
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [imageTab, setImageTab] = useState<"upload" | "url">("upload");
  const [imageUrlInput, setImageUrlInput] = useState("https://");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState("https://");

  const [showYTDialog, setShowYTDialog] = useState(false);
  const [ytInput, setYTInput] = useState("");

  const insertImage = (url: string, alt = "") => {
    editor?.chain().focus().setImage({ src: url, alt }).run();
  };
  const doUpload = async (file: File) => {
    if (onUpload) return await onUpload(file);
    // fallback: base64 (dev only)
    const reader = new FileReader();
    return await new Promise<string>((res) => {
      reader.onload = () => res(reader.result as string);
      reader.readAsDataURL(file);
    });
  };

  // ---------- UI ----------
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-indigo-50/40 text-neutral-900 dark:from-neutral-950 dark:via-neutral-950 dark:to-indigo-950/30 dark:text-neutral-100">
      {/* Topbar */}
      <div className="sticky top-0 z-50 border-b border-white/20 bg-white/60 backdrop-blur-xl dark:border-white/10 dark:bg-neutral-950/50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-sm">✍️</div>
            <div>
              <div className="text-sm font-semibold leading-5">Guson • Luxe Tiptap Editor</div>
              <div className="text-xs opacity-70">
                {saving ? "กำลังบันทึก…" : lastSaved ? `บันทึกล่าสุด: ${new Date(lastSaved).toLocaleString()}` : "ยังไม่เคยบันทึก"}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
              className="rounded-xl border border-white/20 bg-white/30 px-3 py-2 text-xs backdrop-blur hover:bg-white/60 dark:bg-neutral-900/40 dark:hover:bg-neutral-800"
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>
            <button
              onClick={manualSave}
              disabled={isSavingManual}
              aria-busy={isSavingManual}
              className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-3 py-2 text-xs font-medium text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
            >
              บันทึก
            </button>
            <button
              onClick={handlePublish}
              disabled={isPublishing}
              aria-busy={isPublishing}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
            >
              เผยแพร่
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-3">
        {/* Meta */}
        <aside className="order-2 space-y-4 lg:order-1">
          {/* Title/Slug */}
          <div className="rounded-3xl border border-neutral-200/70 bg-white/70 p-4 shadow-lg backdrop-blur dark:border-white/10 dark:bg-neutral-900/60">
            <div className="flex items-center gap-2 text-sm font-medium"><PencilLine className="h-4 w-4" /> ชื่อบทความ</div>
            <input
              className="mt-2 w-full rounded-2xl border border-neutral-300/80 bg-white/60 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-white/10 dark:bg-neutral-950/60"
              value={title} onChange={(e) => setTitle(e.target.value)} placeholder="เช่น 10 เทคนิคการเขียนข่าวให้น่าอ่าน"
            />
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1">
                <label className="block text-xs opacity-70">Slug</label>
                <input
                  className="mt-1 w-full rounded-2xl border border-neutral-300/80 bg-white/60 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-white/10 dark:bg-neutral-950/60"
                  value={slug} onChange={(e) => setSlug(e.target.value)} disabled={!lockSlug}
                />
              </div>
              <button
                onClick={() => setLockSlug((s) => !s)}
                className="mt-6 h-9 shrink-0 rounded-2xl border border-neutral-300/80 px-3 text-xs hover:bg-white/70 dark:border-white/10 dark:hover:bg-neutral-800"
              >
                {lockSlug ? "🔒" : "🔓"}
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="rounded-3xl border border-neutral-200/70 bg-white/70 p-4 shadow-lg backdrop-blur dark:border-white/10 dark:bg-neutral-900/60">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm font-medium">Meta Description</span>
              <span className={`text-xs ${descLeft < 0 ? "text-rose-500" : "opacity-60"}`}>{160 - description.length}</span>
            </div>
            <textarea
              rows={3}
              className="w-full rounded-2xl border border-neutral-300/80 bg-white/60 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-white/10 dark:bg-neutral-950/60"
              value={description} onChange={(e) => setDescription(e.target.value)} placeholder="สรุปเนื้อหาภายใน 160 อักขระ"
            />
            <div className="mt-3 flex items-center justify-between">
              <div className="relative h-10 w-10">
                <div className="absolute inset-0 rounded-full" style={{ background: `conic-gradient(#6366f1 ${descPct * 3.6}deg, #e5e7eb 0)` }} />
                <div className="absolute inset-[4px] grid place-items-center rounded-full bg-white/80 text-[10px] dark:bg-neutral-900/80">{descPct}%</div>
              </div>
              <div className="text-xs opacity-70">แนะนำ: 120–160 อักขระ</div>
            </div>
          </div>

          {/* Tags */}
          <div className="rounded-3xl border border-neutral-200/70 bg-white/70 p-4 shadow-lg backdrop-blur dark:border-white/10 dark:bg-neutral-900/60">
            <div className="text-sm font-medium">ป้ายกำกับ (Tags)</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((t) => (
                <span key={t} className="inline-flex items-center gap-2 rounded-full bg-indigo-50/80 px-3 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-200 dark:bg-indigo-900/40 dark:text-indigo-100 dark:ring-indigo-800">
                  #{t}
                  <button className="opacity-70 hover:opacity-100" onClick={() => setTags((p) => p.filter((x) => x !== t))}>×</button>
                </span>
              ))}
            </div>
            <input
              className="mt-2 w-full rounded-2xl border border-neutral-300/80 bg-white/60 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-white/10 dark:bg-neutral-950/60"
              placeholder="พิมพ์แล้วกด Enter หรือ Comma"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === ",") {
                  e.preventDefault();
                  const t = tagInput.trim().replace(/\s+/g, "-").toLowerCase();
                  if (t) setTags((p) => (p.includes(t) ? p : [...p, t]));
                  setTagInput("");
                }
              }}
            />
          </div>

          {/* Cover */}
          <CoverCard
            coverUrl={coverUrl}
            setCoverUrl={setCoverUrl}
            setWarning={setWarning}
            onUpload={onUpload}
            fileInputRef={fileInputRef}
            imageTab={imageTab}
            setImageTab={setImageTab}
            imageUrlInput={imageUrlInput}
            setImageUrlInput={setImageUrlInput}
            setShowImageDialog={setShowImageDialog}
          />
        </aside>

        {/* Editor */}
        <section className="order-1 lg:order-2 lg:col-span-2">
          <div className="mt-4">
            {warning ? (
              <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800 shadow-sm">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                <div>
                  <div className="font-semibold">เกิดข้อผิดพลาด</div>
                  <div>{warning}</div>
                  <div className="mt-1 text-xs opacity-70">โปรดตรวจสอบการเชื่อมต่อ หรือรีเฟรชหน้าใหม่อีกครั้ง</div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 p-2 text-xs text-blue-700 shadow-sm">
                <Info className="h-3 w-3 shrink-0 text-blue-500" />
                <span>กด Ctrl/Cmd + S เพื่อบันทึก • ลิงก์จะเปิดแท็บใหม่อัตโนมัติ</span>
              </div>
            )}
          </div>

          {/* Toolbar */}
          <div className="sticky top-[68px] z-40 mb-2 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-neutral-200/70 bg-white/70 px-2 py-1 shadow-lg backdrop-blur dark:border-white/10 dark:bg-neutral-900/60">
            <div className="flex flex-wrap items-center gap-1">
              <IconWrap onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} tooltip="หัวข้อ H2"><Heading2 className="h-4 w-4" /></IconWrap>
              <IconWrap onClick={() => editor?.chain().focus().toggleBold().run()} tooltip="หนา"><Bold className="h-4 w-4" /></IconWrap>
              <IconWrap onClick={() => editor?.chain().focus().toggleItalic().run()} tooltip="เอียง"><Italic className="h-4 w-4" /></IconWrap>
              <IconWrap onClick={() => editor?.chain().focus().toggleStrike().run()} tooltip="ขีดทับ"><Strikethrough className="h-4 w-4" /></IconWrap>
              <IconWrap onClick={() => editor?.chain().focus().toggleCode().run()} tooltip="อินไลน์โค้ด"><Code className="h-4 w-4" /></IconWrap>
              <IconWrap onClick={() => editor?.chain().focus().toggleBlockquote().run()} tooltip="อ้างอิง"><Quote className="h-4 w-4" /></IconWrap>
              <IconWrap onClick={() => editor?.chain().focus().toggleBulletList().run()} tooltip="รายการจุด"><List className="h-4 w-4" /></IconWrap>
              <IconWrap onClick={() => editor?.chain().focus().toggleOrderedList().run()} tooltip="รายการเลข"><ListOrdered className="h-4 w-4" /></IconWrap>
              <IconWrap onClick={() => editor?.chain().focus().setHorizontalRule().run()} tooltip="เส้นคั่น"><Minus className="h-4 w-4" /></IconWrap>
              <IconWrap onClick={() => setShowImageDialog(true)} tooltip="แทรกรูป (อัปโหลด/URL)"><ImageIcon className="h-4 w-4" /></IconWrap>
              <IconWrap onClick={() => setShowYTDialog(true)} tooltip="แทรก YouTube"><PlayCircle className="h-4 w-4" /></IconWrap>
              <IconWrap onClick={() => setShowLinkDialog(true)} tooltip="แทรกลิงก์"><LinkIcon className="h-4 w-4" /></IconWrap>
              <div className="mx-1 h-5 w-px bg-neutral-200 dark:bg-white/20" />
              <IconWrap onClick={() => editor?.chain().focus().undo().run()} tooltip="Undo"><Undo className="h-4 w-4" /></IconWrap>
              <IconWrap onClick={() => editor?.chain().focus().redo().run()} tooltip="Redo"><Redo className="h-4 w-4" /></IconWrap>
              <IconWrap onClick={() => editor?.chain().focus().unsetAllMarks().clearNodes().run()} tooltip="ล้างฟอร์แมต"><Highlighter className="h-4 w-4" /></IconWrap>
            </div>
            <div className="flex items-center gap-2 text-xs opacity-70">
              <AlignJustify className="h-4 w-4" />
              <span>{charCount.toLocaleString()} อักขระ</span>
              <button
                onClick={() => setTab("write")}
                className={`rounded-lg px-2 py-1 ${tab === "write" ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900" : "hover:bg-neutral-100 dark:hover:bg-neutral-800"}`}
              >
                <PencilLine className="mr-1 inline h-3 w-3" /> เขียน
              </button>
              <button
                onClick={() => setTab("preview")}
                className={`rounded-lg px-2 py-1 ${tab === "preview" ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900" : "hover:bg-neutral-100 dark:hover:bg-neutral-800"}`}
              >
                <Eye className="mr-1 inline h-3 w-3" /> ดูตัวอย่าง
              </button>
            </div>
          </div>

          {/* Editor / Preview */}
          <div className="overflow-hidden rounded-3xl border border-neutral-200/70 bg-white/80 shadow-xl ring-1 ring-black/5 backdrop-blur dark:border-white/10 dark:bg-neutral-900/70">
            {tab === "write" ? (
              <div className="prose prose-neutral max-w-none p-6 dark:prose-invert">
                <EditorContent editor={editor} />
              </div>
            ) : (
              <div className="prose prose-neutral max-w-none p-6 dark:prose-invert" dangerouslySetInnerHTML={{ __html: editor?.getHTML() ?? "" }} />
            )}
          </div>
        </section>
      </div>

      {/* Image Dialog */}
      {showImageDialog && (
        <Dialog onClose={() => setShowImageDialog(false)} title="แทรกรูปภาพ">
          <div className="flex items-center gap-2">
            <button onClick={() => setImageTab("upload")} className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs ${imageTab === "upload" ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900" : "hover:bg-black/5 dark:hover:bg-white/10"}`}>
              <FileUp className="h-3.5 w-3.5" /> อัปโหลด
            </button>
            <button onClick={() => setImageTab("url")} className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs ${imageTab === "url" ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900" : "hover:bg-black/5 dark:hover:bg-white/10"}`}>
              <Chain className="h-3.5 w-3.5" /> ใส่ URL
            </button>
          </div>
          <div className="mt-3">
            {imageTab === "upload" ? (
              <input
                ref={fileInputRef}
                type="file" accept="image/*"
                onChange={async (e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  const url = await doUpload(f);
                  insertImage(url);
                  setShowImageDialog(false);
                }}
              />
            ) : (
              <div className="space-y-2">
                <input
                  className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-white/10 dark:bg-neutral-800"
                  value={imageUrlInput} onChange={(e) => setImageUrlInput(e.target.value)} placeholder="https://example.com/pic.jpg"
                />
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      if (!imageUrlInput) return;
                      insertImage(imageUrlInput);
                      setShowImageDialog(false);
                    }}
                    className="rounded-lg bg-neutral-900 px-3 py-1 text-xs text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
                  >
                    แทรก
                  </button>
                </div>
              </div>
            )}
          </div>
        </Dialog>
      )}

      {/* Link Dialog */}
      {showLinkDialog && (
        <Dialog onClose={() => setShowLinkDialog(false)} title="แทรกลิงก์">
          <div className="space-y-3">
            <input
              className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-white/10 dark:bg-neutral-800"
              value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} placeholder="https://example.com"
            />
            <div className="flex justify-end">
              <button
                onClick={() => {
                  if (!linkUrl) return;
                  editor?.chain().focus().setLink({ href: linkUrl }).run();
                  setShowLinkDialog(false);
                }}
                className="rounded-lg bg-neutral-900 px-3 py-1 text-xs text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
              >
                แทรก
              </button>
            </div>
          </div>
        </Dialog>
      )}

      {/* YouTube Dialog */}
      {showYTDialog && (
        <Dialog onClose={() => setShowYTDialog(false)} title="แทรก YouTube">
          <div className="space-y-3">
            <input
              className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-white/10 dark:bg-neutral-800"
              value={ytInput} onChange={(e) => setYTInput(e.target.value)}
              placeholder="วางลิงก์หรือใส่ VIDEO_ID เช่น https://youtu.be/dQw4w9WgXcQ?t=43"
            />
            <div className="flex justify-end">
              <button
                onClick={() => {
                  if (!ytInput.trim()) return;
                  const url = toYoutubeUrl(ytInput.trim());
                  editor?.chain().focus().setYoutubeVideo({ src: url }).run();
                  setShowYTDialog(false);
                }}
                className="rounded-lg bg-neutral-900 px-3 py-1 text-xs text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
              >
                แทรก
              </button>
            </div>
          </div>
        </Dialog>
      )}

      {toast && (
        <div
          className="fixed bottom-4 right-4 z-[70] rounded-xl px-3 py-2 text-sm text-white shadow-lg"
          style={{ background: toast.kind === "success" ? "#10b981" : toast.kind === "warn" ? "#f59e0b" : "#ef4444" }}
        >
          {toast.text}
        </div>
      )}
    </div>
  );
}

// ---------- Small components ----------
function IconWrap({ children, onClick, tooltip }: { children: React.ReactNode; onClick: () => void; tooltip: string; }) {
  return (
    <button onClick={onClick} className="group relative rounded-xl p-2 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/70">
      {children}
      <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 scale-90 rounded-md bg-black/80 px-2 py-1 text-[10px] text-white opacity-0 transition group-hover:opacity-100 dark:bg-white/20">
        {tooltip}
      </span>
    </button>
  );
}
function Dialog({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void; }) {
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-black/40 p-4" onClick={onClose}>
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-white/95 shadow-2xl backdrop-blur dark:bg-neutral-900/95" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-white/20 px-4 py-2 text-sm font-medium dark:border-white/10">{title}</div>
        <div className="p-4 text-sm">{children}</div>
      </div>
    </div>
  );
}

function toYoutubeUrl(input: string) {
  try {
    if (/^[a-zA-Z0-9_-]{6,}$/.test(input) && !/\//.test(input)) return `https://www.youtube.com/watch?v=${input}`;
    const u = new URL(input);
    if (u.hostname === "youtu.be") {
      const id = u.pathname.slice(1);
      const t = u.searchParams.get("t") || u.searchParams.get("start") || "0";
      return `https://www.youtube.com/watch?v=${id}${t && Number(t) ? `&t=${t}` : ""}`;
    }
    return input;
  } catch { return `https://www.youtube.com/watch?v=${input}`; }
}

function CoverCard(props: {
  coverUrl: string | null;
  setCoverUrl: (v: string | null) => void;
  setWarning: (v: string | null) => void;
  onUpload?: (file: File) => Promise<string>;
  fileInputRef: React.RefObject<HTMLInputElement>;
  imageTab: "upload" | "url";
  setImageTab: (v: "upload" | "url") => void;
  imageUrlInput: string;
  setImageUrlInput: (v: string) => void;
  setShowImageDialog: (v: boolean) => void;
}) {
  const {
    coverUrl, setCoverUrl, setWarning, onUpload, fileInputRef,
  } = props;
  const doUpload = async (file: File) => {
    if (onUpload) return await onUpload(file);
    const reader = new FileReader();
    return await new Promise<string>((res) => {
      reader.onload = () => res(reader.result as string);
      reader.readAsDataURL(file);
    });
  };
  return (
    <div className="rounded-3xl border border-neutral-200/70 bg-white/70 p-4 shadow-lg backdrop-blur dark:border-white/10 dark:bg-neutral-900/60">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium">ภาพปก (Cover)</span>
        <span className="text-xs opacity-60">ลากวาง/อัปโหลด/URL</span>
      </div>
      {coverUrl ? (
        <div className="overflow-hidden rounded-2xl ring-1 ring-black/5 dark:ring-white/10">
          {/* eslint-disable-next-line */}
          <img src={coverUrl} alt="cover" className="h-40 w-full object-cover"
            onError={(e) => { (e.currentTarget as HTMLImageElement).alt = "(โหลดรูปปกไม่สำเร็จ)"; }} />
        </div>
      ) : (
        <div className="grid place-items-center rounded-2xl border border-dashed border-neutral-300/80 p-8 text-center text-sm opacity-70 dark:border-white/10">
          ยังไม่มีภาพปก
        </div>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          onClick={() => {
            const u = window.prompt("URL รูปปก (https://)", coverUrl ?? "https://");
            if (!u) return;
            if (/^http:\/\//i.test(u)) setWarning("http:// จะไม่แสดงบน https (Mixed Content)");
            else setWarning(null);
            setCoverUrl(u);
          }}
          className="rounded-xl border border-neutral-300/80 bg-white/60 px-3 py-2 text-sm hover:bg-white/80 dark:border-white/10 dark:bg-neutral-950/50 dark:hover:bg-neutral-800"
        >
          ใช้ URL
        </button>
        <input
          ref={fileInputRef} type="file" accept="image/*" className="hidden"
          onChange={async (e) => { const f = e.target.files?.[0]; if (!f) return; const url = await doUpload(f); setCoverUrl(url); }}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="rounded-xl border border-neutral-300/80 bg-white/60 px-3 py-2 text-sm hover:bg-white/80 dark:border-white/10 dark:bg-neutral-950/50 dark:hover:bg-neutral-800"
        >
          อัปโหลด
        </button>
        {coverUrl && (
          <button
            onClick={() => setCoverUrl(null)}
            className="rounded-xl border border-neutral-300/80 bg-white/60 px-3 py-2 text-sm hover:bg-white/80 dark:border-white/10 dark:bg-neutral-950/50 dark:hover:bg-neutral-800"
          >
            ลบรูป
          </button>
        )}
      </div>
    </div>
  );
}

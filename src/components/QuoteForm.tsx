"use client";

import { useState } from "react";
import { MessageCircle, Paperclip } from "lucide-react";
import { site } from "@/lib/site";
import type { Dictionary } from "@/lib/i18n";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-line bg-card px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-sky";

export function QuoteForm({
  q,
  products,
}: {
  q: Dictionary["quote"];
  products: string[];
}) {
  const [product, setProduct] = useState(products[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState("");
  const [details, setDetails] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const lines = [
      `*${q.waHeader}*`,
      "",
      `${q.waName}: ${name || "—"}`,
      `${q.waPhone}: ${phone || "—"}`,
      `${q.waProduct}: ${product}`,
      `${q.waQuantity}: ${quantity || "—"}`,
      "",
      `${q.waDetails}:`,
      details || "—",
    ];
    const text = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${site.whatsapp}?text=${text}`, "_blank");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-line bg-card p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium text-ink">
          {q.name}
          <input
            className={inputClass}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={q.namePlaceholder}
          />
        </label>
        <label className="block text-sm font-medium text-ink">
          {q.phone}
          <input
            className={inputClass}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={q.phonePlaceholder}
            inputMode="tel"
          />
        </label>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium text-ink">
          {q.product}
          <select
            className={inputClass}
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          >
            {products.map((p) => (
              <option key={p}>{p}</option>
            ))}
            <option>{q.somethingElse}</option>
          </select>
        </label>
        <label className="block text-sm font-medium text-ink">
          {q.quantity}
          <input
            className={inputClass}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder={q.quantityPlaceholder}
          />
        </label>
      </div>

      <label className="mt-5 block text-sm font-medium text-ink">
        {q.details}
        <textarea
          className={`${inputClass} min-h-28 resize-y`}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder={q.detailsPlaceholder}
        />
      </label>

      <p className="mt-4 flex items-start gap-2 rounded-xl bg-paper-dim px-4 py-3 text-xs text-ink-muted">
        <Paperclip size={15} className="mt-0.5 shrink-0" />
        {q.attachNote}
      </p>

      <button
        type="submit"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.01]"
      >
        <MessageCircle size={17} /> {q.submit}
      </button>

      <p className="mt-3 text-center text-xs text-ink-muted">
        {q.preferCall}{" "}
        <a href={`tel:+${site.phones[0].raw}`} className="text-sky">
          {site.phones[0].label}
        </a>
      </p>
    </form>
  );
}

"use client";

import { useState } from "react";
import { MessageCircle, Paperclip } from "lucide-react";
import { site, services } from "@/lib/site";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-sky";

export function QuoteForm() {
  const [product, setProduct] = useState(services[0].title);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState("");
  const [details, setDetails] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const lines = [
      "*New quote request — Goenka Graphics*",
      "",
      `Name: ${name || "—"}`,
      `Phone: ${phone || "—"}`,
      `Product: ${product}`,
      `Quantity: ${quantity || "—"}`,
      "",
      "Details:",
      details || "—",
    ];
    const text = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${site.whatsapp}?text=${text}`, "_blank");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-line bg-white p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium text-ink">
          Your name
          <input
            className={inputClass}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Rahul Sharma"
          />
        </label>
        <label className="block text-sm font-medium text-ink">
          Phone / WhatsApp
          <input
            className={inputClass}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="10-digit number"
            inputMode="tel"
          />
        </label>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium text-ink">
          What do you need printed?
          <select
            className={inputClass}
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          >
            {services.map((s) => (
              <option key={s.slug}>{s.title}</option>
            ))}
            <option>Something else</option>
          </select>
        </label>
        <label className="block text-sm font-medium text-ink">
          Quantity
          <input
            className={inputClass}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="e.g. 250 cards"
          />
        </label>
      </div>

      <label className="mt-5 block text-sm font-medium text-ink">
        Details
        <textarea
          className={`${inputClass} min-h-28 resize-y`}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Size, paper, colours, finishing, delivery date, or anything else we should know."
        />
      </label>

      <p className="mt-4 flex items-start gap-2 rounded-xl bg-paper-dim px-4 py-3 text-xs text-ink-muted">
        <Paperclip size={15} className="mt-0.5 shrink-0" />
        Have artwork ready? Send this request, then attach your PDF or image
        directly in the WhatsApp chat that opens.
      </p>

      <button
        type="submit"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.01]"
      >
        <MessageCircle size={17} /> Send request on WhatsApp
      </button>

      <p className="mt-3 text-center text-xs text-ink-muted">
        Prefer to call? Dial{" "}
        <a href={`tel:+${site.phones[0].raw}`} className="text-sky">
          {site.phones[0].label}
        </a>
      </p>
    </form>
  );
}

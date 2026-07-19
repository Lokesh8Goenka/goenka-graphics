"use client";

import { useState } from "react";
import { MessageCircle, Paperclip, Check } from "lucide-react";
import { site } from "@/lib/site";
import type { Dictionary } from "@/lib/i18n";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-line bg-card px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-sky";
const errorInputClass = "border-magenta focus:border-magenta";

/** Accepts 10 local digits, optionally prefixed with +91 / 91 / 0. */
function isValidPhone(value: string): boolean {
  const digits = value.replace(/[\s\-()]/g, "");
  return /^(?:\+?91|0)?[6-9]\d{9}$/.test(digits);
}

export function QuoteForm({
  q,
  products,
  initialProduct,
}: {
  q: Dictionary["quote"];
  products: string[];
  /** Pre-selects the product, e.g. when arriving from a product card. */
  initialProduct?: string;
}) {
  const allProducts =
    initialProduct && !products.includes(initialProduct)
      ? [initialProduct, ...products]
      : products;
  const [product, setProduct] = useState(initialProduct ?? products[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState("");
  const [details, setDetails] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const nextErrors: typeof errors = {};
    if (!name.trim()) nextErrors.name = q.errName;
    if (!isValidPhone(phone)) nextErrors.phone = q.errPhone;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const lines = [
      `*${q.waHeader}*`,
      "",
      `${q.waName}: ${name.trim()}`,
      `${q.waPhone}: ${phone.trim()}`,
      `${q.waProduct}: ${product}`,
      `${q.waQuantity}: ${quantity || "—"}`,
      "",
      `${q.waDetails}:`,
      details || "—",
    ];
    const text = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${site.whatsapp}?text=${text}`, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-line bg-card p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium text-ink">
          {q.name}
          <input
            className={`${inputClass} ${errors.name ? errorInputClass : ""}`}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
            }}
            placeholder={q.namePlaceholder}
            autoComplete="name"
            required
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <span role="alert" className="mt-1.5 block text-xs font-normal text-magenta">
              {errors.name}
            </span>
          )}
        </label>
        <label className="block text-sm font-medium text-ink">
          {q.phone}
          <input
            className={`${inputClass} ${errors.phone ? errorInputClass : ""}`}
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
            }}
            placeholder={q.phonePlaceholder}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            aria-invalid={!!errors.phone}
          />
          {errors.phone && (
            <span role="alert" className="mt-1.5 block text-xs font-normal text-magenta">
              {errors.phone}
            </span>
          )}
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
            {allProducts.map((p) => (
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
        disabled={sent}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.01] disabled:opacity-80 disabled:hover:scale-100"
      >
        {sent ? (
          <>
            <Check size={17} /> {q.opening}
          </>
        ) : (
          <>
            <MessageCircle size={17} /> {q.submit}
          </>
        )}
      </button>

      <p className="mt-3 text-center text-xs text-ink-muted">
        {q.preferCall}{" "}
        {site.phones.map((p, i) => (
          <span key={p.raw}>
            {i > 0 && " / "}
            <a href={`tel:+${p.raw}`} className="text-sky">
              {p.label}
            </a>
          </span>
        ))}
      </p>
    </form>
  );
}

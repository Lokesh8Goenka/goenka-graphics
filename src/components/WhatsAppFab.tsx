import { MessageCircle } from "lucide-react";
import { site } from "@/lib/site";
import type { Dictionary, Locale } from "@/lib/i18n";

export function WhatsAppFab({ dict }: { lang: Locale; dict: Dictionary }) {
  const msg = encodeURIComponent(
    dict.langName === "हिंदी"
      ? "नमस्ते Goenka Graphics, मुझे एक प्रिंटिंग काम के बारे में पूछना है।"
      : "Hello Goenka Graphics, I'd like to enquire about a printing job.",
  );
  return (
    <a
      href={`https://wa.me/${site.whatsapp}?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={dict.common.whatsappUs}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-medium text-white shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle size={20} />
      <span className="hidden sm:inline">{dict.common.whatsappUs}</span>
    </a>
  );
}

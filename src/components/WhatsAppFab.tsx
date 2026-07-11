import { MessageCircle } from "lucide-react";
import { site } from "@/lib/site";

export function WhatsAppFab() {
  const msg = encodeURIComponent(
    "Hello Goenka Graphics, I'd like to enquire about a printing job.",
  );
  return (
    <a
      href={`https://wa.me/${site.whatsapp}?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-medium text-white shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle size={20} />
      <span className="hidden sm:inline">WhatsApp us</span>
    </a>
  );
}

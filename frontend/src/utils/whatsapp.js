const DEFAULT_WHATSAPP = '252610317264';

export const toWhatsAppUrl = (phone, message) => {
  const digits = String(phone || DEFAULT_WHATSAPP).replace(/\D/g, '');
  const base = `https://wa.me/${digits}`;
  if (message) return `${base}?text=${encodeURIComponent(message)}`;
  return base;
};

export const DEFAULT_WHATSAPP_URL = toWhatsAppUrl(DEFAULT_WHATSAPP);

export { DEFAULT_WHATSAPP };

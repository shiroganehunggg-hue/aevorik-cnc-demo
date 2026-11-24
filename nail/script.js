const config = window.SALON_CONFIG || {};
const fallbackName = "Your Nail Studio";
const textValue = (value, fallback = "") =>
  typeof value === "string" && value.trim() ? value.trim() : fallback;
const salonName = textValue(config.name, fallbackName);
const salonTitle = textValue(config.title, "Nail Studio");
const description = textValue(config.description, "A welcoming neighborhood nail studio.");

function setText(selector, value) {
  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = value;
  });
}

function setSafeLink(element, value, protocols) {
  if (!element || typeof value !== "string" || !value.trim()) return false;
  const href = safeUrl(value, protocols);
  if (!href) return false;
  element.href = href;
  element.hidden = false;
  return true;
}

function safeUrl(value, protocols) {
  if (typeof value !== "string" || !value.trim()) return "";
  try {
    const url = new URL(value.trim(), window.location.href);
    return protocols.includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

document.title = `${salonName} | ${salonTitle}`;
document.querySelector('meta[name="description"]')?.setAttribute("content", description);
document.querySelector('meta[property="og:title"]')?.setAttribute("content", document.title);
document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
document.querySelector('meta[name="theme-color"]')?.setAttribute("content", textValue(config.theme?.background, "#f8f5f0"));
setText(".brand-name", salonName);
document.querySelectorAll(".brand[aria-label]").forEach((element) => {
  element.setAttribute("aria-label", `${salonName} home`);
});
setText("[data-brand-name]", salonName);
setText("[data-about-copy]", textValue(config.about, "A friendly neighborhood studio for nails and a little time to yourself."));
setText("[data-image-caption]", textValue(config.heroCaption, "A moment at the studio"));

const announcement = textValue(config.announcement);
if (announcement) setText(".announcement > span:first-child", announcement);
else document.querySelector("[data-demo-notice]")?.remove();

const themeProperties = {
  background: "--paper",
  ink: "--ink",
  accent: "--accent",
  accentDark: "--accent-dark",
  surface: "--surface"
};
Object.entries(themeProperties).forEach(([key, property]) => {
  const value = config.theme?.[key];
  if (typeof value === "string" && /^#[\da-f]{6}$/i.test(value)) {
    document.documentElement.style.setProperty(property, value);
  }
});

const heroImage = document.querySelector("[data-hero-image]");
if (heroImage) {
  const configuredImage = textValue(config.heroImage);
  const configuredAlt = textValue(config.heroImageAlt);
  const imageUrl = safeUrl(configuredImage, ["https:", "http:", "file:"]);
  if (imageUrl) heroImage.src = imageUrl;
  if (configuredAlt) heroImage.alt = configuredAlt;
}

const serviceList = document.querySelector("#service-list");
(Array.isArray(config.services) ? config.services : []).forEach((service, index) => {
  if (!service || !textValue(service.name) || !textValue(service.description)) return;
  const card = document.createElement("article");
  card.className = "service-card";

  const number = document.createElement("span");
  number.className = "service-number";
  number.textContent = String(index + 1).padStart(2, "0");

  const title = document.createElement("h3");
  title.textContent = service.name.trim();

  const detail = document.createElement("p");
  detail.textContent = service.description.trim();

  const price = document.createElement("span");
  price.className = "service-price";
  price.textContent = textValue(service.price, "Ask us");
  card.append(number, title, detail, price);
  serviceList?.append(card);
});

const galleryList = document.querySelector("#gallery-list");
(Array.isArray(config.gallery) ? config.gallery : []).forEach((item, index) => {
  const imageUrl = item && safeUrl(item.src, ["https:", "http:", "file:"]);
  if (!imageUrl) return;
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = textValue(item.alt, `Nail studio gallery photo ${index + 1}`);
  image.loading = "lazy";
  image.decoding = "async";
  const figure = document.createElement("figure");
  figure.className = `gallery-item gallery-item-${index + 1}`;
  figure.append(image);
  galleryList?.append(figure);
});

const hoursList = document.querySelector("#hours-list");
(Array.isArray(config.hours) ? config.hours : []).forEach((item) => {
  if (!item || !textValue(item.day) || !textValue(item.time)) return;
  const row = document.createElement("li");
  const day = document.createElement("span");
  const time = document.createElement("span");
  day.textContent = item.day.trim();
  time.textContent = item.time.trim();
  row.append(day, time);
  hoursList?.append(row);
});

const mapLink = document.querySelector("[data-map-link]");
const mapSet = setSafeLink(mapLink, config.mapUrl, ["https:"]);
const address = textValue(config.address);
if (address) {
  const addressElement = document.querySelector("[data-address]");
  addressElement.textContent = address;
  if (!mapSet && mapLink) mapLink.hidden = true;
} else if (mapLink) {
  mapLink.hidden = true;
}

const phoneLink = document.querySelector("[data-phone-link]");
const emailLink = document.querySelector("[data-email-link]");
const hasPhone = setSafeLink(phoneLink, config.phone ? `tel:${config.phone.replace(/[^\d+]/g, "")}` : "", ["tel:"]);
const hasEmail = setSafeLink(emailLink, config.email ? `mailto:${config.email.trim()}` : "", ["mailto:"]);
if (hasPhone) phoneLink.textContent = textValue(config.phone);
if (hasEmail) emailLink.textContent = textValue(config.email);
document.querySelector("[data-contact-placeholder]")?.toggleAttribute("hidden", hasPhone || hasEmail);

const bookingUrl = textValue(config.bookingUrl);
document.querySelectorAll("[data-booking-link]").forEach((link) => {
  if (bookingUrl && setSafeLink(link, bookingUrl, ["https:"])) {
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
    link.setAttribute("aria-label", `Book an appointment with ${salonName} (opens in a new tab)`);
  } else if (hasPhone) {
    link.href = phoneLink.href;
    link.textContent = "";
    const arrow = document.createElement("span");
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "↗";
    link.append("Call to book ", arrow);
    link.setAttribute("aria-label", `Call ${salonName} to book an appointment`);
  } else {
    link.href = "#visit";
  }
});

document.querySelector("[data-hours-placeholder]")?.toggleAttribute("hidden", Boolean(hoursList?.children.length));

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

function setMenuOpen(isOpen) {
  if (!menuToggle || !nav) return;
  nav.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
}

menuToggle?.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});
nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle?.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuToggle.focus();
  }
});
window.matchMedia("(max-width: 720px)").addEventListener("change", () => setMenuOpen(false));

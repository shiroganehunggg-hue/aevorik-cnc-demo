const fallbackConfig = {
  demoBrandName: "Cobalt Ridge Machining",
  websiteProviderName: "Aevorik",
  demoMode: true,
  contactEmail: "",
  services: [],
  verifiedCapabilities: {}
};
const config = window.AEVORIK_CONFIG || fallbackConfig;
const demoBrandName = typeof config.demoBrandName === "string" && config.demoBrandName.trim()
  ? config.demoBrandName.trim()
  : fallbackConfig.demoBrandName;
const websiteProviderName = typeof config.websiteProviderName === "string" && config.websiteProviderName.trim()
  ? config.websiteProviderName.trim()
  : fallbackConfig.websiteProviderName;

document.querySelectorAll(".brand-name").forEach((brand) => {
  brand.textContent = demoBrandName.toUpperCase();
});
document.querySelectorAll(".brand[aria-label]").forEach((brand) => {
  brand.setAttribute("aria-label", `${demoBrandName} home`);
});
document.querySelectorAll("[data-brand-name]").forEach((element) => {
  element.textContent = demoBrandName;
});
document.querySelectorAll("[data-website-provider-name]").forEach((element) => {
  element.textContent = websiteProviderName;
});
document.title = `${demoBrandName} | Fictional CNC Website Concept`;
const siteDescription = `Explore a fictional CNC machining website concept designed by ${websiteProviderName}, demonstrating how a supplier can present capabilities, materials, sample parts and a quote-request experience.`;
document.querySelector('meta[name="description"]')?.setAttribute("content", siteDescription);
const openGraphTitle = document.querySelector('meta[property="og:title"]');
if (openGraphTitle) openGraphTitle.setAttribute("content", document.title);
document.querySelector('meta[property="og:description"]')?.setAttribute("content", siteDescription);

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
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  setMenuOpen(!isOpen);
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", (event) => {
    setMenuOpen(false);
    if (window.matchMedia("(max-width: 650px)").matches && event.detail === 0) {
      window.setTimeout(() => menuToggle?.focus({ preventScroll: true }), 0);
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle?.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

window.matchMedia("(max-width: 650px)").addEventListener("change", () => setMenuOpen(false));

const processSelect = document.querySelector("#rfq-process");
document.querySelectorAll(".capability-card > a[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    if (!(processSelect instanceof HTMLSelectElement)) return;
    const requestedProcess = link.dataset.service;
    if ([...processSelect.options].some((option) => option.value === requestedProcess)) {
      processSelect.value = requestedProcess;
    }
  });
});

const capabilityList = document.querySelector("#verified-capabilities-list");
const capabilityPanel = document.querySelector("#verified-capabilities");
const capabilityLabels = [
  ["materials", "Materials"],
  ["processes", "Processes"],
  ["maxPartDimensions", "Maximum part dimensions"],
  ["tolerances", "Tolerances"],
  ["orderQuantities", "Order quantities"],
  ["inspectionMethods", "Inspection methods"],
  ["finishingOptions", "Finishing options"],
  ["fileFormats", "Accepted file formats"],
  ["leadTime", "Lead-time information"]
];

if (capabilityList && capabilityPanel) {
  capabilityLabels.forEach(([key, label]) => {
    const value = config.verifiedCapabilities?.[key];
    const displayValue = Array.isArray(value)
      ? value.filter((item) => typeof item === "string" && item.trim()).join(", ")
      : typeof value === "string" ? value.trim() : "";

    if (displayValue) {
      const item = document.createElement("li");
      const term = document.createElement("strong");
      term.textContent = `${label}: `;
      item.append(term, document.createTextNode(displayValue));
      capabilityList.append(item);
    }
  });

  capabilityPanel.hidden = capabilityList.children.length === 0;
}

const quoteForm = document.querySelector("#quote-form");
const rfqStatus = document.querySelector("#rfq-status");
const reviewStage = document.querySelector("#rfq-review");
const previewStage = document.querySelector("#rfq-preview");
const reviewSummary = document.querySelector("#rfq-review-summary");
const previewSummary = document.querySelector("#rfq-preview-summary");
const rfqFields = [
  ["part", "Part category", "rfq-part"],
  ["process", "Process preference", "rfq-process"],
  ["material", "Material category", "rfq-material"],
  ["quantity", "Quantity range", "rfq-quantity"],
  ["timing", "Timing preference", "rfq-timing"],
  ["notes", "Additional notes", "rfq-notes"]
];

function getFieldError(field) {
  if (field.required && !field.value) return "Choose an option to continue.";
  if (field.name === "notes" && field.value.length > field.maxLength) {
    return `Use no more than ${field.maxLength} characters.`;
  }
  return "";
}

function validateField(field) {
  const message = getFieldError(field);
  const errorElement = document.getElementById(`${field.id}-error`);
  if (errorElement) errorElement.textContent = message;
  if (message) field.setAttribute("aria-invalid", "true");
  else field.removeAttribute("aria-invalid");
  return !message;
}

function getRfqValues() {
  return rfqFields.map(([name, label, id]) => {
    const field = document.getElementById(id);
    return { name, label, value: field.value.trim() };
  });
}

function renderSummary(container) {
  if (!container) return;
  container.replaceChildren();
  getRfqValues().forEach(({ label, value }) => {
    const term = document.createElement("dt");
    term.textContent = label;
    const description = document.createElement("dd");
    description.textContent = value || "Not provided";
    container.append(term, description);
  });
}

function setRfqStage(stage) {
  if (!(quoteForm instanceof HTMLFormElement) || !reviewStage || !previewStage) return;
  quoteForm.hidden = stage !== "input";
  reviewStage.hidden = stage !== "review";
  previewStage.hidden = stage !== "preview";

  const heading = stage === "review"
    ? document.querySelector("#rfq-review-title")
    : stage === "preview" ? document.querySelector("#rfq-preview-title") : null;
  if (heading instanceof HTMLElement) heading.focus();

  if (rfqStatus) {
    rfqStatus.textContent = stage === "review"
      ? "Review your details, then choose Generate RFQ Preview to continue."
      : stage === "preview" ? "RFQ preview generated. It has not been sent or stored."
        : "";
    delete rfqStatus.dataset.state;
    rfqStatus.setAttribute("aria-live", "polite");
  }
}

if (quoteForm instanceof HTMLFormElement) {
  const fields = rfqFields.map(([, , id]) => document.getElementById(id));

  function reviewDetails() {
    const invalidFields = fields.filter((field) => !validateField(field));

    if (invalidFields.length > 0) {
      if (rfqStatus) {
        rfqStatus.dataset.state = "validation-error";
        rfqStatus.setAttribute("aria-live", "assertive");
        rfqStatus.textContent = "Please correct the highlighted fields.";
      }
      invalidFields[0].focus();
      return;
    }

    if (rfqStatus) {
      delete rfqStatus.dataset.state;
      rfqStatus.setAttribute("aria-live", "polite");
    }
    renderSummary(reviewSummary);
    setRfqStage("review");
  }

  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    reviewDetails();
  });
  document.querySelector("#review-demo")?.addEventListener("click", reviewDetails);

  fields.forEach((field) => {
    field.addEventListener("input", () => {
      if (field.hasAttribute("aria-invalid")) validateField(field);
    });
    field.addEventListener("change", () => {
      if (field.hasAttribute("aria-invalid")) validateField(field);
    });
  });

  document.querySelector("#generate-preview")?.addEventListener("click", () => {
    renderSummary(previewSummary);
    setRfqStage("preview");
  });

  document.querySelector("#edit-review")?.addEventListener("click", () => {
    setRfqStage("input");
    if (rfqStatus) rfqStatus.textContent = "Your demo details are ready to edit.";
    document.querySelector("#rfq-part")?.focus();
  });

  document.querySelector("#edit-preview")?.addEventListener("click", () => {
    setRfqStage("input");
    if (rfqStatus) rfqStatus.textContent = "Your demo details are ready to edit.";
    document.querySelector("#rfq-part")?.focus();
  });

  document.querySelector("#start-over")?.addEventListener("click", () => {
    quoteForm.reset();
    fields.forEach((field) => {
      field.removeAttribute("aria-invalid");
      const errorElement = document.getElementById(`${field.id}-error`);
      if (errorElement) errorElement.textContent = "";
    });
    reviewSummary?.replaceChildren();
    previewSummary?.replaceChildren();
    setRfqStage("input");
    if (rfqStatus) rfqStatus.textContent = "Demo form reset. Enter example categories to begin again.";
    document.querySelector("#rfq-part")?.focus();
  });
}

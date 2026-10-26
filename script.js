const fallbackConfig = {
  brandName: "Aevorik",
  demoMode: true,
  contactEmail: "",
  formSubmissionEndpoint: "",
  services: [],
  verifiedCapabilities: {}
};
const config = window.AEVORIK_CONFIG || fallbackConfig;
const brandName = typeof config.brandName === "string" && config.brandName.trim()
  ? config.brandName.trim()
  : fallbackConfig.brandName;
const configuredEndpoint = typeof config.formSubmissionEndpoint === "string"
  ? config.formSubmissionEndpoint.trim()
  : "";
const endpointNeedsProviderIntegration = config.demoMode === false && Boolean(configuredEndpoint);

document.querySelectorAll(".brand-name").forEach((brand) => {
  brand.textContent = brandName.toUpperCase();
});
document.querySelectorAll(".brand[aria-label]").forEach((brand) => {
  brand.setAttribute("aria-label", `${brandName} home`);
});
document.querySelectorAll("[data-brand-name]").forEach((element) => {
  element.textContent = brandName;
});
document.title = `${brandName} | Precision Manufacturing`;
const openGraphTitle = document.querySelector('meta[property="og:title"]');
if (openGraphTitle) openGraphTitle.setAttribute("content", document.title);

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
  link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle?.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

window.matchMedia("(max-width: 650px)").addEventListener("change", () => setMenuOpen(false));

const serviceSelect = document.querySelector("#service-required");
if (serviceSelect instanceof HTMLSelectElement && Array.isArray(config.services)) {
  const serviceNames = [...new Set(
    config.services.filter((service) => typeof service === "string" && service.trim())
      .map((service) => service.trim())
  )];
  if (serviceNames.length > 0) {
    serviceSelect.replaceChildren(new Option("Select a service", "", true, true));
    serviceSelect.options[0].disabled = true;
    serviceNames.forEach((service) => serviceSelect.add(new Option(service, service)));
  }
}

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

const contactFallback = document.querySelector("#contact-fallback");
const contactEmail = typeof config.contactEmail === "string" ? config.contactEmail.trim() : "";
const emailValidator = document.createElement("input");
emailValidator.type = "email";
emailValidator.value = contactEmail;

if (contactFallback && contactEmail && emailValidator.checkValidity()) {
  contactFallback.replaceChildren(document.createTextNode("Configured contact email: "));
  const emailLink = document.createElement("a");
  emailLink.href = `mailto:${contactEmail}`;
  emailLink.textContent = contactEmail;
  contactFallback.append(emailLink);
  contactFallback.hidden = false;
}

const quoteForm = document.querySelector("#quote-form");
const formMessage = document.querySelector("#form-message");
const submitButton = quoteForm?.querySelector('button[type="submit"]');
const fieldMessages = {
  name: "name-error",
  email: "email-error",
  company: "company-error",
  service: "service-error",
  project: "project-error"
};

function getFieldError(field) {
  const value = field.value.trim();

  if (field.name === "name" && !value) return "Enter your full name.";
  if (field.name === "email" && !value) return "Enter your email address.";
  if (field.name === "company" && !value) return "Enter your company name.";
  if (field.name === "service" && !value) return "Choose the service you need.";
  if (field.name === "project" && !value) return "Describe your project.";
  if (field.name === "project" && value.length < 10) {
    return "Describe your project in at least 10 non-space characters.";
  }
  if (field.type === "email" && !field.validity.valid) return "Enter a valid email address.";
  if (field.validity.tooLong) return `Use no more than ${field.maxLength} characters.`;
  return "";
}

function validateField(field) {
  field.setCustomValidity("");
  const message = getFieldError(field);
  field.setCustomValidity(message);

  const errorElement = document.getElementById(fieldMessages[field.name]);
  if (errorElement) errorElement.textContent = message;
  if (message) {
    field.setAttribute("aria-invalid", "true");
  } else {
    field.removeAttribute("aria-invalid");
  }
  return !message && field.validity.valid;
}

if (quoteForm instanceof HTMLFormElement && submitButton instanceof HTMLButtonElement) {
  quoteForm.noValidate = true;
  submitButton.disabled = false;

  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const fields = [...quoteForm.querySelectorAll("input, select, textarea")];
    fields.forEach((field) => {
      field.value = field.value.trim();
    });
    const invalidFields = fields.filter((field) => !validateField(field));

    if (invalidFields.length > 0) {
      if (formMessage) {
        formMessage.dataset.state = "validation-error";
        formMessage.setAttribute("aria-live", "assertive");
        formMessage.textContent = "Please correct the highlighted fields.";
      }
      invalidFields[0].focus();
      return;
    }

    if (formMessage) {
      formMessage.dataset.state = "demo";
      formMessage.setAttribute("aria-live", "polite");
      formMessage.textContent = endpointNeedsProviderIntegration
        ? "A form endpoint is listed, but no provider integration is implemented. Nothing was sent or saved; keep demo mode enabled until the provider is configured and tested."
        : "Validation passed. This is a demo: no information was sent or saved. Do not include confidential details.";
    }
  });

  quoteForm.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener("input", () => {
      if (field.hasAttribute("aria-invalid")) validateField(field);
    });
    field.addEventListener("change", () => {
      if (field.hasAttribute("aria-invalid")) validateField(field);
    });
  });
}

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

document.querySelectorAll(".capability-card > a[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    if (!(serviceSelect instanceof HTMLSelectElement)) return;

    const requestedService = link.dataset.service;
    const requestedOption = [...serviceSelect.options].find(
      (option) => option.value === requestedService
    );
    const otherOption = [...serviceSelect.options].find(
      (option) => option.value === "Other / Not Sure Yet"
    );

    if (requestedOption) {
      serviceSelect.value = requestedService;
    } else if (otherOption) {
      serviceSelect.value = otherOption.value;
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
const confirmation = document.querySelector("#quote-confirmation");
const requestSummary = document.querySelector("#request-summary");
const editRequestButton = document.querySelector("#edit-request");
const clearRequestButton = document.querySelector("#clear-request");
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

function addSummaryRow(label, value) {
  if (!requestSummary) return;

  const term = document.createElement("dt");
  term.textContent = label;
  const description = document.createElement("dd");
  description.textContent = value || "Not provided";
  requestSummary.append(term, description);
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

    if (requestSummary && confirmation) {
      if (formMessage) {
        formMessage.textContent = "";
        delete formMessage.dataset.state;
        formMessage.setAttribute("aria-live", "polite");
      }
      requestSummary.replaceChildren();
      const values = new FormData(quoteForm);
      const serviceLabel = serviceSelect?.selectedOptions[0]?.textContent?.trim() || "";
      [
        ["Name", values.get("name")],
        ["Email", values.get("email")],
        ["Company", values.get("company")],
        ["Service", serviceLabel],
        ["Material or technical details", values.get("material")],
        ["Estimated quantity", values.get("quantity")],
        ["Desired deadline", values.get("deadline")],
        ["Project details", values.get("project")]
      ].forEach(([label, value]) => addSummaryRow(label, String(value || "").trim()));

      quoteForm.hidden = true;
      confirmation.hidden = false;
      confirmation.focus();
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

  editRequestButton?.addEventListener("click", () => {
    if (!confirmation) return;
    confirmation.hidden = true;
    quoteForm.hidden = false;
    quoteForm.querySelector("input, select, textarea")?.focus();
  });

  clearRequestButton?.addEventListener("click", () => {
    if (!confirmation || !requestSummary) return;
    quoteForm.reset();
    quoteForm.querySelectorAll("input, select, textarea").forEach((field) => {
      field.setCustomValidity("");
      field.removeAttribute("aria-invalid");
    });
    Object.values(fieldMessages).forEach((id) => {
      const errorElement = document.getElementById(id);
      if (errorElement) errorElement.textContent = "";
    });
    if (formMessage) {
      formMessage.textContent = "";
      delete formMessage.dataset.state;
      formMessage.setAttribute("aria-live", "polite");
    }
    requestSummary.replaceChildren();
    confirmation.hidden = true;
    quoteForm.hidden = false;
    quoteForm.querySelector("input, select, textarea")?.focus();
  });
}

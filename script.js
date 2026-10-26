// Mobile navigation and demo quote form.
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
  link.addEventListener("click", () => {
    setMenuOpen(false);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle?.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

const mobileNavigation = window.matchMedia("(max-width: 650px)");
mobileNavigation.addEventListener("change", () => setMenuOpen(false));

const quoteForm = document.querySelector("#quote-form");
const formMessage = document.querySelector("#form-message");
let isPreparingEmail = false;

quoteForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (isPreparingEmail || !(quoteForm instanceof HTMLFormElement)) return;

  const nameInput = quoteForm.elements.namedItem("name");
  const emailInput = quoteForm.elements.namedItem("email");
  const companyInput = quoteForm.elements.namedItem("company");
  const serviceInput = quoteForm.elements.namedItem("service");
  const projectInput = quoteForm.elements.namedItem("project");

  if (
    !(nameInput instanceof HTMLInputElement) ||
    !(emailInput instanceof HTMLInputElement) ||
    !(companyInput instanceof HTMLInputElement) ||
    !(serviceInput instanceof HTMLSelectElement) ||
    !(projectInput instanceof HTMLTextAreaElement)
  ) {
    return;
  }

  emailInput.value = emailInput.value.trim();
  nameInput.setCustomValidity(nameInput.value.trim() ? "" : "Enter your full name.");
  companyInput.setCustomValidity(companyInput.value.trim() ? "" : "Enter your company name.");
  projectInput.setCustomValidity(
    projectInput.value.trim().length >= 10 ? "" : "Enter at least 10 non-space characters."
  );

  if (!quoteForm.checkValidity()) {
    if (formMessage) formMessage.textContent = "Please check the required fields and correct any invalid entries.";
    quoteForm.reportValidity();
    return;
  }

  const name = nameInput.value.trim();
  const email = emailInput.value;
  const company = companyInput.value.trim();
  const service = serviceInput.value;
  const project = projectInput.value.trim();
  const subject = encodeURIComponent(`${service} inquiry from ${company}`);
  const body = encodeURIComponent(
    `Hello Aevorik,\n\nName: ${name}\nEmail: ${email}\nCompany: ${company}\nService required: ${service}\n\nProject details:\n${project}\n\nPlease let me know the next steps.\n`
  );

  // Demo only: replace this address with the real client's approved business email.
  const businessEmail = "hello@example.com";
  const submitButton = quoteForm.querySelector('button[type="submit"]');
  isPreparingEmail = true;
  if (submitButton instanceof HTMLButtonElement) {
    submitButton.disabled = true;
    submitButton.textContent = "Preparing email…";
  }
  if (formMessage) {
    formMessage.textContent = `Your email app may open with a draft to ${businessEmail}. This site cannot confirm that it opened or that the message was sent. If it does not open, create an email to this address and copy in your details.`;
  }
  window.location.href = `mailto:${businessEmail}?subject=${subject}&body=${body}`;

  window.setTimeout(() => {
    isPreparingEmail = false;
    if (submitButton instanceof HTMLButtonElement) {
      submitButton.disabled = false;
      submitButton.innerHTML = 'Prepare email inquiry <span aria-hidden="true">↗</span>';
    }
  }, 2000);
});

quoteForm?.querySelectorAll("input, select, textarea").forEach((field) => {
  field.addEventListener("input", () => field.setCustomValidity(""));
  field.addEventListener("change", () => field.setCustomValidity(""));
});

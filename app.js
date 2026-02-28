const form = document.getElementById("appForm");
const statusEl = document.getElementById("status");
const saveDraftBtn = document.getElementById("saveDraftBtn");

const DRAFT_KEY = "application_form_draft_v1";

function setStatus(message, kind) {
  statusEl.textContent = message;
  statusEl.className = `status ${kind}`;
  statusEl.style.display = "block";
}

function clearStatus() {
  statusEl.textContent = "";
  statusEl.className = "status";
  statusEl.style.display = "none";
}

function showError(fieldName, message) {
  const el = document.querySelector(`.error[data-for="${fieldName}"]`);
  if (el) el.textContent = message || "";
}

function clearAllErrors() {
  document.querySelectorAll(".error").forEach(e => (e.textContent = ""));
}

function isValidPhone(value) {
  // Simple, lenient check: digits count 8–15 after stripping symbols/spaces
  const digits = (value || "").replace(/[^\d]/g, "");
  return digits.length >= 8 && digits.length <= 15;
}

function validate() {
  clearAllErrors();
  clearStatus();

  const data = new FormData(form);

  const fullName = (data.get("fullName") || "").toString().trim();
  const email = (data.get("email") || "").toString().trim();
  const phone = (data.get("phone") || "").toString().trim();
  const role = (data.get("role") || "").toString().trim();
  const experience = (data.get("experience") || "").toString().trim();
  const portfolio = (data.get("portfolio") || "").toString().trim();
  const resume = data.get("resume");
  const message = (data.get("message") || "").toString().trim();
  const consent = form.elements["consent"].checked;

  let ok = true;

  if (fullName.length < 2) {
    showError("fullName", "Please enter your full name.");
    ok = false;
  }

  if (!email) {
    showError("email", "Please enter an email address.");
    ok = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showError("email", "Please enter a valid email address.");
    ok = false;
  }

  if (!phone) {
    showError("phone", "Please enter your phone number.");
    ok = false;
  } else if (!isValidPhone(phone)) {
    showError("phone", "Please enter a valid phone number.");
    ok = false;
  }

  if (!role) {
    showError("role", "Please select a role.");
    ok = false;
  }

  if (experience === "") {
    showError("experience", "Please enter your years of experience.");
    ok = false;
  } else {
    const years = Number(experience);
    if (Number.isNaN(years) || years < 0 || years > 50) {
      showError("experience", "Experience must be between 0 and 50.");
      ok = false;
    }
  }

  if (portfolio) {
    try {
      new URL(portfolio);
    } catch {
      showError("portfolio", "Please enter a valid URL (including https://).");
      ok = false;
    }
  }

  if (!(resume instanceof File) || resume.size === 0) {
    showError("resume", "Please upload your resume.");
    ok = false;
  } else if (resume.size > 5 * 1024 * 1024) {
    showError("resume", "File size must be under 5 MB.");
    ok = false;
  }

  if (message.length < 20) {
    showError("message", "Please write at least 20 characters.");
    ok = false;
  }

  if (!consent) {
    showError("consent", "Please confirm before submitting.");
    ok = false;
  }

  return ok;
}

function saveDraft() {
  const draft = {
    fullName: form.fullName.value,
    email: form.email.value,
    phone: form.phone.value,
    role: form.role.value,
    experience: form.experience.value,
    portfolio: form.portfolio.value,
    message: form.message.value,
    consent: form.consent.checked
  };
  localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  setStatus("Draft saved on this device.", "ok");
}

function loadDraft() {
  const raw = localStorage.getItem(DRAFT_KEY);
  if (!raw) return;
  try {
    const d = JSON.parse(raw);
    form.fullName.value = d.fullName || "";
    form.email.value = d.email || "";
    form.phone.value = d.phone || "";
    form.role.value = d.role || "";
    form.experience.value = d.experience || "";
    form.portfolio.value = d.portfolio || "";
    form.message.value = d.message || "";
    form.consent.checked = !!d.consent;
    setStatus("Draft restored.", "ok");
  } catch {
    // ignore bad draft
  }
}

saveDraftBtn.addEventListener("click", saveDraft);

form.addEventListener("reset", () => {
  clearAllErrors();
  clearStatus();
  // Keep draft unless you want to clear it:
  // localStorage.removeItem(DRAFT_KEY);
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const valid = validate();
  if (!valid) {
    setStatus("Please fix the highlighted fields and try again.", "bad");
    return;
  }

  // Simulate a submit
  const submitBtn = document.getElementById("submitBtn");
  submitBtn.disabled = true;
  setStatus("Submitting your application...", "ok");

  try {
    // Example payload (file upload needs FormData if you call a real API)
    const payload = new FormData(form);

    // Replace with your API endpoint:
    // const res = await fetch("/api/apply", { method: "POST", body: payload });
    // if (!res.ok) throw new Error("Request failed");

    await new Promise(r => setTimeout(r, 800));

    localStorage.removeItem(DRAFT_KEY);
    form.reset();
    setStatus("Application submitted successfully.", "ok");
  } catch (err) {
    setStatus("Something went wrong. Please try again.", "bad");
  } finally {
    submitBtn.disabled = false;
  }
});

// Auto-save draft while typing (optional)
let t;
form.addEventListener("input", () => {
  window.clearTimeout(t);
  t = window.setTimeout(() => {
    const hasAny =
      form.fullName.value || form.email.value || form.phone.value ||
      form.role.value || form.experience.value || form.portfolio.value || form.message.value;
    if (hasAny) saveDraft();
  }, 700);
});

// Load draft on page open
loadDraft();
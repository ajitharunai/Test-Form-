# Simple Application Form (HTML5 + CSS + JavaScript)

![Application Form Screenshot](https://webstatic.chargebee.com/assets/web/20260227171133/images/hero-animation/new/growth-main.svg)

A clean, responsive application form built with **HTML5**, **CSS**, and **Vanilla JavaScript**.  
Includes client-side validation, inline error messages, and draft save/restore using LocalStorage.

---

## Demo

- Live demo: (add link if deployed)
- Screenshot: (add image path like `./assets/screenshot.png`)

---

## Features

- Responsive UI (desktop + mobile)
- HTML5 validations + custom JS validations
- Inline error messages per field
- Resume upload validation (type + max size)
- Draft auto-save (LocalStorage) + restore on reload
- Simple submit simulation (replace with your API endpoint)

---

## Tech Stack

- HTML5
- CSS3
- JavaScript (ES6)

---

## Project Structure

```text
.
├─ index.html
├─ styles.css
├─ app.js
└─ README.md
````

---

## Getting Started

### 1) Clone the repository

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

### 2) Run locally

You can run this project in two easy ways:

#### Option A: Open directly (quick)

* Just open `index.html` in your browser.

#### Option B: Run with a local server (recommended)

Using VS Code extension **Live Server**, or:

```bash
# if you have Python installed
python -m http.server 5500
```

Then open:

* [http://localhost:5500](http://localhost:5500)

---

## Form Fields

* Full name (required)
* Email (required)
* Phone (required)
* Role (required)
* Years of experience (required)
* Portfolio / LinkedIn (optional)
* Resume upload (required)
* Message (required)
* Consent checkbox (required)

---

## Validation Rules

* **Email:** must be a valid email format
* **Phone:** digits length must be between 8 and 15 (after cleaning symbols)
* **Experience:** 0 to 50
* **Message:** minimum 20 characters
* **Resume file:** required and must be under **5 MB**
* **Consent:** must be checked before submit

---

## How Draft Save Works

* Draft is saved in the browser via `localStorage`
* Restores automatically when you reload the page
* Draft is cleared after successful submission

Key used:

* `application_form_draft_v1`

---

## Customization

### Change roles

Edit the `<select>` options in `index.html`:

```html
<select id="role" name="role" required>
  <option value="">Select a role</option>
  <option>Frontend Developer</option>
  <option>Backend Developer</option>
</select>
```

### Change file size limit

In `app.js`, update:

```js
if (resume.size > 5 * 1024 * 1024) { ... }
```

### Connect to a backend API

Replace the submit simulation in `app.js` with:

```js
const payload = new FormData(form);

const res = await fetch("/api/apply", {
  method: "POST",
  body: payload
});

if (!res.ok) throw new Error("Request failed");
```

---

## Deployment

You can deploy easily on:

* GitHub Pages
* Netlify
* Vercel

### GitHub Pages (quick)

1. Push the project to GitHub
2. Go to **Settings → Pages**
3. Select branch: `main` and folder: `/root`
4. Save and open the generated URL

---

## Roadmap (Optional)

* Add success page / submission ID
* Add spam protection (honeypot / reCAPTCHA)
* Add server-side validation and email notifications
* Store applications in a database
* Add TypeScript version + build tooling (Vite)

---

## License

MIT License (or update as needed)

---

## Author

Your Name

* LinkedIn: (link)
* Website: (link)


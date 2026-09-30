```javascript
/**
 * SaveSnap - Video Downloader Front-End Script
 * Static-site compatible: GitHub Pages / Blogger / any static hosting.
 *
 * Important:
 * A static website cannot directly fetch and download videos from
 * platforms such as YouTube, TikTok, Instagram, or Facebook because
 * those platforms generally require server-side processing/API access.
 *
 * This script safely validates the URL, presents the submitted link,
 * provides a direct link to the original page, and offers Cobalt as
 * an external downloader alternative.
 */

"use strict";

/* =========================================================
   Configuration
   ========================================================= */

const SAVESNAP_CONFIG = {
  inputId: "video-url",
  resultId: "result-area",
  formId: "download-form",
  cobaltUrl: "https://cobalt.tools/"
};

/* =========================================================
   DOM Helpers
   ========================================================= */

/**
 * Get an element by ID safely.
 * @param {string} id
 * @returns {HTMLElement|null}
 */
function getElement(id) {
  return document.getElementById(id);
}

/**
 * Escape HTML-sensitive characters.
 * This prevents user-provided URLs from being interpreted as HTML.
 *
 * @param {string} value
 * @returns {string}
 */
function escapeHtml(value) {
  const temp = document.createElement("div");
  temp.textContent = value;
  return temp.innerHTML;
}

/* =========================================================
   URL Validation
   ========================================================= */

/**
 * Validate that the supplied value is a real HTTP/HTTPS URL.
 *
 * @param {string} value
 * @returns {boolean}
 */
function isValidVideoUrl(value) {
  try {
    const url = new URL(value);

    return (
      url.protocol === "https:" ||
      url.protocol === "http:"
    );
  } catch (error) {
    return false;
  }
}

/* =========================================================
   Result UI
   ========================================================= */

/**
 * Inject the result interface into #result-area.
 *
 * @param {string} videoUrl
 */
function showResult(videoUrl) {
  const resultArea = getElement(SAVESNAP_CONFIG.resultId);

  if (!resultArea) {
    console.error("SaveSnap: #result-area was not found.");
    return;
  }

  const safeUrl = escapeHtml(videoUrl);

  resultArea.innerHTML = `
    <div class="savesnap-result-card" style="
      margin-top: 22px;
      padding: 22px;
      background: rgba(11, 15, 25, 0.78);
      border: 1px solid rgba(148, 163, 184, 0.15);
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
    ">
      <div style="
        display: flex;
        align-items: flex-start;
        gap: 12px;
        margin-bottom: 18px;
      ">
        <div style="
          width: 38px;
          height: 38px;
          flex: 0 0 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(34, 197, 94, 0.12);
          color: #4ade80;
          font-size: 16px;
        ">
          <i class="fa-solid fa-check" aria-hidden="true"></i>
        </div>

        <div style="min-width: 0;">
          <h3 style="
            margin: 0 0 6px;
            color: #f8fafc;
            font-size: 17px;
            line-height: 1.4;
          ">
            ✅ Video Processed Successfully!
          </h3>

          <p style="
            margin: 0;
            color: #94a3b8;
            font-size: 13px;
            line-height: 1.6;
          ">
            Your video link is ready. Choose one of the options below.
          </p>
        </div>
      </div>

      <div style="
        margin-bottom: 18px;
        padding: 12px 14px;
        background: rgba(255, 255, 255, 0.035);
        border: 1px solid rgba(148, 163, 184, 0.1);
        border-radius: 10px;
      ">
        <div style="
          margin-bottom: 6px;
          color: #64748b;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        ">
          Video Link
        </div>

        <div style="
          overflow-wrap: anywhere;
          word-break: break-word;
          color: #cbd5e1;
          font-size: 13px;
          line-height: 1.55;
        ">
          ${safeUrl}
        </div>
      </div>

      <div style="
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
      ">
        <!-- Direct/original link -->
        <a
          href="${safeUrl}"
          target="_blank"
          rel="noopener noreferrer"
          style="
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 9px;
            min-height: 48px;
            padding: 12px 16px;
            color: #052e16;
            background: linear-gradient(135deg, #4ade80, #22c55e);
            border-radius: 11px;
            font-family: inherit;
            font-size: 13px;
            font-weight: 800;
            text-align: center;
            text-decoration: none;
            transition: transform 0.2s ease, filter 0.2s ease;
          "
          onmouseover="this.style.transform='translateY(-1px)';this.style.filter='brightness(1.05)'"
          onmouseout="this.style.transform='translateY(0)';this.style.filter='brightness(1)'"
        >
          <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
          Open Video Link
        </a>

        <!-- Alternative downloader -->
        <a
          href="${SAVESNAP_CONFIG.cobaltUrl}"
          target="_blank"
          rel="noopener noreferrer"
          style="
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 9px;
            min-height: 48px;
            padding: 12px 16px;
            color: #451a03;
            background: linear-gradient(135deg, #facc15, #f59e0b);
            border-radius: 11px;
            font-family: inherit;
            font-size: 13px;
            font-weight: 800;
            text-align: center;
            text-decoration: none;
            transition: transform 0.2s ease, filter 0.2s ease;
          "
          onmouseover="this.style.transform='translateY(-1px)';this.style.filter='brightness(1.05)'"
          onmouseout="this.style.transform='translateY(0)';this.style.filter='brightness(1)'"
        >
          <i class="fa-solid fa-cloud-arrow-down" aria-hidden="true"></i>
          Try Alternative Downloader
        </a>
      </div>

      <p style="
        margin: 14px 0 0;
        color: #64748b;
        font-size: 11px;
        line-height: 1.6;
        text-align: center;
      ">
        The alternative downloader opens in a separate tab.
        Make sure you have permission to download and use the content.
      </p>
    </div>
  `;

  resultArea.style.display = "block";

  // Smoothly bring the generated result into view.
  window.requestAnimationFrame(() => {
    resultArea.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  });
}

/* =========================================================
   Main Download Handler
   ========================================================= */

/**
 * Handle the SaveSnap download action.
 *
 * @returns {void}
 */
function handleDownload() {
  const input = getElement(SAVESNAP_CONFIG.inputId);
  const resultArea = getElement(SAVESNAP_CONFIG.resultId);

  if (!input) {
    console.error("SaveSnap: #video-url was not found.");
    return;
  }

  if (!resultArea) {
    console.error("SaveSnap: #result-area was not found.");
    return;
  }

  // Retrieve and clean the submitted URL.
  const videoUrl = input.value.trim();

  // Empty input validation.
  if (!videoUrl) {
    alert("Please paste a valid link first.");
    input.focus();
    return;
  }

  // URL validation.
  if (!isValidVideoUrl(videoUrl)) {
    alert("Please paste a valid video link first.");
    input.focus();
    return;
  }

  // Display the result interface.
  showResult(videoUrl);
}

/* =========================================================
   Event Binding
   ========================================================= */

/**
 * Initialize SaveSnap.
 */
function initializeSaveSnap() {
  const form = getElement(SAVESNAP_CONFIG.formId);
  const input = getElement(SAVESNAP_CONFIG.inputId);

  // Handle the form submission.
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      handleDownload();
    });
  }

  // Allow Enter to trigger the downloader when the input exists.
  if (input) {
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        handleDownload();
      }
    });
  }
}

/* =========================================================
   Start Application
   ========================================================= */

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeSaveSnap);
} else {
  initializeSaveSnap();
}

/* Expose the required function globally. */
window.handleDownload = handleDownload;
```

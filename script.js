"use strict";

/**
 * SaveSnap - Static Video Downloader
 * Compatible with GitHub Pages and other static hosting.
 *
 * This script:
 * - Prevents form submission/page refresh.
 * - Prevents URL query parameters from being added.
 * - Handles both button clicks and Enter key submission.
 * - Validates the entered URL.
 * - Dynamically displays the result area.
 */

(function () {
  const CONFIG = {
    formId: "download-form",
    inputId: "video-url",
    resultId: "result-area"
  };

  /**
   * Safely get an element by ID.
   * @param {string} id
   * @returns {HTMLElement|null}
   */
  function getElement(id) {
    return document.getElementById(id);
  }

  /**
   * Escape user-provided text before inserting it into HTML.
   * @param {string} value
   * @returns {string}
   */
  function escapeHtml(value) {
    const div = document.createElement("div");
    div.textContent = value;
    return div.innerHTML;
  }

  /**
   * Validate a basic HTTP/HTTPS URL.
   * @param {string} value
   * @returns {boolean}
   */
  function isValidUrl(value) {
    try {
      const url = new URL(value);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  }

  /**
   * Display the result area without refreshing the page.
   * @param {string} videoUrl
   */
  function displayResult(videoUrl) {
    const resultArea = getElement(CONFIG.resultId);

    if (!resultArea) {
      console.error("SaveSnap: result-area element was not found.");
      return;
    }

    const safeUrl = escapeHtml(videoUrl);

    resultArea.innerHTML = `
      <div class="savesnap-result-card">
        <div class="savesnap-result-header">
          <div class="savesnap-success-icon">
            <i class="fa-solid fa-check" aria-hidden="true"></i>
          </div>

          <div>
            <h3>✅ Video Processed Successfully!</h3>
            <p>Your video link has been received successfully.</p>
          </div>
        </div>

        <div class="savesnap-url-box">
          <span>Video Link</span>
          <div class="savesnap-url">${safeUrl}</div>
        </div>

        <div class="savesnap-actions">
          <a
            class="savesnap-action savesnap-direct"
            href="${safeUrl}"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
            Open Video
          </a>

          <a
            class="savesnap-action savesnap-alternative"
            href="https://cobalt.tools/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fa-solid fa-cloud-arrow-down" aria-hidden="true"></i>
            Alternative Downloader
          </a>
        </div>

        <p class="savesnap-note">
          The alternative downloader opens in a new tab. Only download content
          you are authorized to download.
        </p>
      </div>
    `;

    resultArea.style.display = "block";

    // Add the component styles once.
    addResultStyles();

    // Scroll the result into view smoothly.
    requestAnimationFrame(() => {
      resultArea.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    });
  }

  /**
   * Add styles required by the dynamically generated result box.
   * Styles are scoped to SaveSnap classes.
   */
  function addResultStyles() {
    if (document.getElementById("savesnap-result-styles")) {
      return;
    }

    const style = document.createElement("style");
    style.id = "savesnap-result-styles";

    style.textContent = `
      .savesnap-result-card {
        margin-top: 22px;
        padding: 22px;
        background: rgba(11, 15, 25, 0.82);
        border: 1px solid rgba(148, 163, 184, 0.15);
        border-radius: 16px;
        box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
      }

      .savesnap-result-header {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        margin-bottom: 18px;
      }

      .savesnap-success-icon {
        width: 40px;
        height: 40px;
        flex: 0 0 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(34, 197, 94, 0.12);
        color: #4ade80;
        border-radius: 50%;
      }

      .savesnap-result-header h3 {
        margin: 0 0 5px;
        color: #f8fafc;
        font-size: 17px;
        line-height: 1.4;
      }

      .savesnap-result-header p {
        margin: 0;
        color: #94a3b8;
        font-size: 13px;
        line-height: 1.5;
      }

      .savesnap-url-box {
        margin-bottom: 18px;
        padding: 13px 14px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(148, 163, 184, 0.1);
        border-radius: 11px;
      }

      .savesnap-url-box > span {
        display: block;
        margin-bottom: 6px;
        color: #64748b;
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .savesnap-url {
        overflow-wrap: anywhere;
        word-break: break-word;
        color: #cbd5e1;
        font-size: 13px;
        line-height: 1.6;
      }

      .savesnap-actions {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
      }

      .savesnap-action {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 9px;
        min-height: 48px;
        padding: 12px 16px;
        border-radius: 11px;
        font-size: 13px;
        font-weight: 800;
        text-decoration: none !important;
        transition:
          transform 0.2s ease,
          filter 0.2s ease,
          box-shadow 0.2s ease;
      }

      .savesnap-action:hover {
        transform: translateY(-1px);
        filter: brightness(1.05);
      }

      .savesnap-direct {
        color: #052e16 !important;
        background: linear-gradient(135deg, #4ade80, #22c55e);
        box-shadow: 0 8px 20px rgba(34, 197, 94, 0.12);
      }

      .savesnap-alternative {
        color: #451a03 !important;
        background: linear-gradient(135deg, #facc15, #f59e0b);
        box-shadow: 0 8px 20px rgba(245, 158, 11, 0.12);
      }

      .savesnap-note {
        margin: 14px 0 0;
        color: #64748b;
        font-size: 11px;
        line-height: 1.6;
        text-align: center;
      }

      @media (max-width: 600px) {
        .savesnap-actions {
          grid-template-columns: 1fr;
        }
      }
    `;

    document.head.appendChild(style);
  }

  /**
   * Main download handler.
   * This function can safely be called by the form submit event.
   *
   * @param {Event|null} event
   */
  function handleDownload(event) {
    // CRITICAL:
    // Prevent the browser's normal form submission.
    // This stops the page from reloading and prevents ?video-url=...
    // from being appended to the address bar.
    if (event && typeof event.preventDefault === "function") {
      event.preventDefault();
    }

    const input = getElement(CONFIG.inputId);
    const resultArea = getElement(CONFIG.resultId);

    if (!input) {
      console.error("SaveSnap: video-url input was not found.");
      return;
    }

    if (!resultArea) {
      console.error("SaveSnap: result-area element was not found.");
      return;
    }

    // Safely retrieve and trim the input.
    const videoUrl = input.value.trim();

    // Empty input.
    if (!videoUrl) {
      alert("Please paste a valid link first.");
      input.focus();
      return;
    }

    // Invalid URL.
    if (!isValidUrl(videoUrl)) {
      alert("Please paste a valid video link first.");
      input.focus();
      return;
    }

    // Display the result without reloading the page.
    displayResult(videoUrl);
  }

  /**
   * Initialize SaveSnap event handling.
   */
  function initializeSaveSnap() {
    const form = getElement(CONFIG.formId);
    const button = getElement("download-btn");
    const input = getElement(CONFIG.inputId);

    /*
     * Best practice:
     * Listen to the FORM submit event.
     *
     * This catches both:
     * 1. Clicking the submit button.
     * 2. Pressing Enter inside the input.
     *
     * Therefore only one handler is needed and duplicate execution
     * is avoided.
     */
    if (form) {
      form.addEventListener("submit", handleDownload);
    } else if (button) {
      /*
       * Fallback for pages where the form wrapper is missing.
       */
      button.addEventListener("click", handleDownload);
    }

    /*
     * Extra protection:
     * Prevent accidental native form submission if Enter is pressed
     * inside the input and the browser attempts unusual submit behavior.
     */
    if (input && form) {
      input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          event.preventDefault();

          // Trigger the same validated handler.
          handleDownload(event);
        }
      });
    }
  }

  /**
   * Start after the DOM is ready.
   */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeSaveSnap);
  } else {
    initializeSaveSnap();
  }

  // Make handleDownload available globally if needed.
  window.handleDownload = handleDownload;
})();

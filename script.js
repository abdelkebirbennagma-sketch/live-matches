/**
 * SaveSnap - Static Video Downloader
 * Front-end only / GitHub Pages compatible
 *
 * Requires these elements in your HTML:
 *   #video-url
 *   #result-area
 */

(() => {
  "use strict";

  /**
   * Escape HTML-sensitive characters.
   * This protects user-provided URLs before inserting them into HTML.
   *
   * @param {string} value
   * @returns {string}
   */
  function escapeHTML(value) {
    const div = document.createElement("div");
    div.textContent = value;
    return div.innerHTML;
  }

  /**
   * Build the result interface.
   *
   * @param {string} videoUrl
   */
  function renderResult(videoUrl) {
    const resultArea = document.getElementById("result-area");

    if (!resultArea) {
      console.error('SaveSnap: Element with id="result-area" was not found.');
      return;
    }

    const safeUrl = escapeHTML(videoUrl);

    resultArea.innerHTML = `
      <div class="savesnap-result">
        <div class="savesnap-success">
          <div class="savesnap-success-icon">✓</div>
          <div>
            <strong>✅ Video Processed Successfully!</strong>
            <p>Your video link is ready to use.</p>
          </div>
        </div>

        <div class="savesnap-url-box">
          <span class="savesnap-label">Video Link</span>
          <div class="savesnap-url" title="${safeUrl}">
            ${safeUrl}
          </div>
        </div>

        <div class="savesnap-actions">
          <a
            class="savesnap-action savesnap-direct"
            href="${safeUrl}"
            download
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open or download video directly"
          >
            <span>⬇</span>
            <span>
              <strong>Direct Download</strong>
              <small>Open the video link directly</small>
            </span>
          </a>

          <a
            class="savesnap-action savesnap-alternative"
            href="https://cobalt.tools/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Use an alternative video downloader"
          >
            <span>⚡</span>
            <span>
              <strong>Alternative Downloader</strong>
              <small>Try a public downloader if needed</small>
            </span>
          </a>
        </div>

        <div class="savesnap-note">
          <span>ℹ️</span>
          <span>
            The direct option depends on the source website allowing direct
            access or downloads. The alternative downloader opens in a new tab.
          </span>
        </div>
      </div>
    `;

    resultArea.style.display = "block";

    // Smoothly bring the result into view.
    resultArea.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }

  /**
   * Handle the main download/process action.
   *
   * Retrieves #video-url, validates it, and displays the result.
   */
  function handleDownload() {
    const input = document.getElementById("video-url");
    const resultArea = document.getElementById("result-area");

    if (!input) {
      console.error('SaveSnap: Element with id="video-url" was not found.');
      return;
    }

    if (!resultArea) {
      console.error('SaveSnap: Element with id="result-area" was not found.');
      return;
    }

    const videoUrl = input.value.trim();

    // Hide any previous result while validating the new request.
    resultArea.style.display = "none";

    // Validate empty input.
    if (!videoUrl) {
      alert("Please paste a valid video link first.");
      input.focus();
      return;
    }

    // Basic URL validation.
    let parsedUrl;

    try {
      parsedUrl = new URL(videoUrl);
    } catch {
      alert("Please paste a valid link first.");
      input.focus();
      return;
    }

    // Only allow standard web URLs.
    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      alert("Please paste a valid HTTP or HTTPS video link.");
      input.focus();
      return;
    }

    // Use the normalized URL for the generated links.
    renderResult(parsedUrl.href);
  }

  /**
   * Make handleDownload() globally available so it can be used by:
   * <button onclick="handleDownload()">Download</button>
   */
  window.handleDownload = handleDownload;

  /**
   * Optional automatic setup for a button with id="download-btn".
   * This works without requiring inline onclick attributes.
   */
  document.addEventListener("DOMContentLoaded", () => {
    const downloadButton = document.getElementById("download-btn");

    if (downloadButton) {
      downloadButton.addEventListener("click", handleDownload);
    }
  });
})();

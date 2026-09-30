```javascript
"use strict";

/**
 * SaveSnap static downloader interface.
 *
 * Note: A static website cannot download or process videos directly without a
 * backend service. The primary action opens the original URL, while the
 * alternative action opens a public downloader tool with the URL prefilled.
 */

const VIDEO_URL_INPUT_ID = "video-url";
const RESULT_AREA_ID = "result-area";
const ALTERNATIVE_DOWNLOADER_URL = "https://cobalt.tools/";

/**
 * Safely retrieves and normalizes the video URL entered by the user.
 *
 * @returns {string} The trimmed URL value.
 */
function getVideoUrl() {
  const input = document.getElementById(VIDEO_URL_INPUT_ID);
  return input ? input.value.trim() : "";
}

/**
 * Validates whether a string is a well-formed HTTP(S) URL.
 *
 * @param {string} value - The URL to validate.
 * @returns {boolean} Whether the URL is valid.
 */
function isValidVideoUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Creates an element with text content and optional attributes.
 *
 * Using textContent instead of innerHTML for user-provided values prevents
 * untrusted URLs from being interpreted as HTML.
 *
 * @param {string} tagName - The element tag name.
 * @param {string} text - The visible text content.
 * @param {Object} [attributes={}] - HTML attributes to assign.
 * @returns {HTMLElement} The created element.
 */
function createElement(tagName, text = "", attributes = {}) {
  const element = document.createElement(tagName);

  if (text) {
    element.textContent = text;
  }

  Object.entries(attributes).forEach(([attribute, value]) => {
    element.setAttribute(attribute, value);
  });

  return element;
}

/**
 * Builds and displays the processed result area.
 *
 * @param {string} videoUrl - The validated video URL.
 */
function renderResult(videoUrl) {
  const resultArea = document.getElementById(RESULT_AREA_ID);

  if (!resultArea) {
    console.error(`Element with id="${RESULT_AREA_ID}" was not found.`);
    return;
  }

  const alternativeUrl = new URL(ALTERNATIVE_DOWNLOADER_URL);
  alternativeUrl.searchParams.set("url", videoUrl);

  const resultContent = document.createDocumentFragment();

  const header = createElement("div", "", {
    class: "result-header"
  });

  const successIcon = createElement("span", "✓", {
    class: "result-success-icon",
    "aria-hidden": "true"
  });

  const successMessage = createElement(
    "h3",
    "Video Processed Successfully!",
    {
      class: "result-title"
    }
  );

  header.append(successIcon, successMessage);

  const description = createElement(
    "p",
    "Your link is ready. Choose an option below to continue.",
    {
      class: "result-description"
    }
  );

  const linkLabel = createElement("span", "Submitted link", {
    class: "result-link-label"
  });

  const submittedLink = createElement("a", videoUrl, {
    class: "result-link",
    href: videoUrl,
    target: "_blank",
    rel: "noopener noreferrer nofollow",
    title: "Open the submitted video link"
  });

  const linkPreview = createElement("div", "", {
    class: "result-link-preview"
  });

  linkPreview.append(linkLabel, submittedLink);

  const actions = createElement("div", "", {
    class: "result-actions"
  });

  const directLink = createElement("a", "", {
    class: "result-action result-action-primary",
    href: videoUrl,
    target: "_blank",
    rel: "noopener noreferrer nofollow",
    download: "",
    role: "button"
  });

  const directIcon = createElement("span", "↧", {
    class: "result-action-icon",
    "aria-hidden": "true"
  });

  const directText = createElement("span", "", {
    class: "result-action-copy"
  });

  directText.append(
    createElement("strong", "Open Direct Link"),
    createElement("small", "View or download from the source")
  );

  directLink.append(directIcon, directText);

  const alternativeLink = createElement(
    "a",
    "",
    {
      class: "result-action result-action-secondary",
      href: alternativeUrl.toString(),
      target: "_blank",
      rel: "noopener noreferrer nofollow",
      role: "button"
    }
  );

  const alternativeIcon = createElement("span", "↗", {
    class: "result-action-icon",
    "aria-hidden": "true"
  });

  const alternativeText = createElement("span", "", {
    class: "result-action-copy"
  });

  alternativeText.append(
    createElement("strong", "Try Alternative Downloader"),
    createElement("small", "Open a public downloader tool")
  );

  alternativeLink.append(alternativeIcon, alternativeText);
  actions.append(directLink, alternativeLink);

  const notice = createElement(
    "p",
    "SaveSnap is a static website and does not upload, store, or process your video link.",
    {
      class: "result-notice"
    }
  );

  resultContent.append(header, description, linkPreview, actions, notice);

  resultArea.replaceChildren(resultContent);
  resultArea.style.display = "block";
  resultArea.classList.add("is-visible");

  resultArea.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });
}

/**
 * Handles the downloader form submission.
 */
function handleDownload() {
  const videoUrl = getVideoUrl();

  if (!videoUrl || !isValidVideoUrl(videoUrl)) {
    alert("Please paste a valid video link first.");
    return;
  }

  renderResult(videoUrl);
}

/**
 * Initializes SaveSnap event listeners.
 */
function initializeSaveSnap() {
  const form = document.getElementById("download-form");
  const input = document.getElementById(VIDEO_URL_INPUT_ID);

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      handleDownload();
    });
  }

  if (input) {
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleDownload();
      }
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeSaveSnap);
} else {
  initializeSaveSnap();
}
```

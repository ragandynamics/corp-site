export function setupMobileMenu() {
  const button = document.getElementById("mobile-menu-button");
  const menu = document.getElementById("mobile-menu");
  const hamburgerIcon = document.getElementById("hamburger-icon");
  const closeIcon = document.getElementById("close-icon");

  if (!button || !menu || !hamburgerIcon || !closeIcon) return;

  button.addEventListener("click", () => {
    const isExpanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", (!isExpanded).toString());
    menu.classList.toggle("hidden");
    hamburgerIcon.classList.toggle("hidden");
    closeIcon.classList.toggle("hidden");
  });
}

// Run on initial load and view transition swaps
setupMobileMenu();
document.addEventListener("astro:after-swap", setupMobileMenu);
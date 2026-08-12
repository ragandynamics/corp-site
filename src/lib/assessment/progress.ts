export function updateProgress(step: number, total: number): void {
  const percent = Math.round((step / total) * 100);

  const label = document.querySelector("#progress h2");
  if (label) {
    label.textContent = `Step ${step} of ${total}`;
  }

  const badge = document.querySelector("#progress .rounded-full.bg-blue-100");
  if (badge) {
    badge.textContent = `${percent}%`;
  }

  const bar = document.getElementById("progress-bar");
  if (bar) {
    bar.style.width = `${percent}%`;
  }

  const circles = document.querySelectorAll("#progress .flex.h-10.w-10");
  circles.forEach((circle, index) => {
    const number = index + 1;
    circle.className =
      "flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold transition-all duration-300";

    if (number < step) {
      circle.classList.add("border-blue-600", "bg-blue-600", "text-white");
      circle.textContent = "✓";
    } else if (number === step) {
      circle.classList.add(
        "border-blue-600",
        "bg-white",
        "text-blue-600",
        "ring-4",
        "ring-blue-100"
      );
      circle.textContent = String(number);
    } else {
      circle.classList.add("border-slate-300", "bg-white", "text-slate-500");
      circle.textContent = String(number);
    }
  });
}
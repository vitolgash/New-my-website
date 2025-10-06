// ========== Theme toggle with persistence ==========
document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const btn = document.getElementById("theme-toggle");

  // 1) начальная тема: из localStorage, иначе из системной
  const saved = localStorage.getItem("theme");
  if (saved) {
    root.dataset.theme = saved; // 'light' | 'dark'
  } else {
    const prefersLight = window.matchMedia(
      "(prefers-color-scheme: light)"
    ).matches;
    root.dataset.theme = prefersLight ? "light" : "dark";
  }

  // 2) переключение
  if (btn) {
    btn.addEventListener("click", () => {
      const next = root.dataset.theme === "light" ? "dark" : "light";
      root.dataset.theme = next;
      localStorage.setItem("theme", next);
    });
  }

  // 3) синхронизация при смене темы в системе
  window
    .matchMedia("(prefers-color-scheme: light)")
    .addEventListener("change", (e) => {
      const savedNow = localStorage.getItem("theme");
      if (!savedNow) root.dataset.theme = e.matches ? "light" : "dark";
    });
});

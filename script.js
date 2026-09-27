document.querySelector("[data-menu]")?.addEventListener("click", () => {
  document.getElementById("navLinks")?.classList.toggle("open");
});

document.querySelectorAll("[data-formspree]").forEach((form) => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = form.querySelector("[type=submit]");
    const status = form.querySelector("[data-status]");
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Sending…";
    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("fail");
      form.reset();
      if (status) status.textContent = "Received. The desk will reply privately.";
      setTimeout(() => {
        document.getElementById("mandateModal")?.classList.add("hidden");
      }, 1200);
    } catch {
      if (status) status.textContent = "Could not send. Email sunil@digiproai.com or use WhatsApp.";
    } finally {
      btn.disabled = false;
      btn.textContent = original;
    }
  });
});

document.querySelectorAll("[data-open-mandate]").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("mandateModal")?.classList.remove("hidden");
  });
});
document.querySelectorAll("[data-close-mandate]").forEach((el) => {
  el.addEventListener("click", () => {
    document.getElementById("mandateModal")?.classList.add("hidden");
  });
});

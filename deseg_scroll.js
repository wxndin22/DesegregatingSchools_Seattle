function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const nav = sidebar.querySelector("nav");

  // Smooth scroll and close sidebar on nav <a> click
  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        sidebar.classList.remove("open");
      }
    });
  });

  // Add subsection <h3> links under correct <h2>
  const sections = document.querySelectorAll("section");

  sections.forEach(section => {
    const h2 = section.querySelector("h2");
    const h3s = section.querySelectorAll("h3");

    if (!h2) return;

    const h2Id = h2.id || h2.textContent.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]/g, "");
    if (!h2.id) h2.id = h2Id;

    const h2Link = nav.querySelector(`a[href="#${h2Id}"]`);
    if (!h2Link) return;

    const subContainer = document.createElement("div");
    subContainer.classList.add("sub-section-links");

    h3s.forEach(h3 => {
      const h3Id = h3.id || h3.textContent.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]/g, "");
      h3.id = h3Id;

      const subLink = document.createElement("a");
      subLink.href = `#${h3Id}`;
      subLink.textContent = h3.textContent;
      subLink.classList.add("subsection");

      subLink.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.getElementById(h3Id);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
          sidebar.classList.remove("open");
        }
      });

      subContainer.appendChild(subLink);
    });

    h2Link.parentNode.insertBefore(subContainer, h2Link.nextSibling);
  });
});

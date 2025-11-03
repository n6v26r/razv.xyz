const headings = "h2, h3, h4, h5, h6";

export function useCoolHeadings() {
  document.querySelectorAll(headings).forEach(heading => {
    heading.addEventListener('click', () => {
      heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

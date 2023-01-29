export default function menuControl() {
  const items = document.querySelectorAll("#app, .generations");

  if (items.length > 0) items.forEach((el) => el.classList.toggle("menu-open"));
}

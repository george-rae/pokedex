/**
 * Handles the control/state of the sidebar menu and main body.
 *
 * @returns {void} no return
 */
export default function menuControl() {
  const items = document.querySelectorAll("#app, .generations");

  if (items.length > 0) items.forEach((el) => el.classList.toggle("menu-open"));
}

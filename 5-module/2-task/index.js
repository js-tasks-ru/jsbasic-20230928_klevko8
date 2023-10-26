function toggleText() {
  let text = document.querySelector("#text");

  document.querySelector(".toggle-text-button").addEventListener('click', () => {
    text.classList.toggle('hidden');
    if (text.classList.contains("hidden")) {
      text.hidden = true;
    } else {
      text.hidden = false;
    }

    //Best variant
    // text.hidden = !text.hidden;
  });
}

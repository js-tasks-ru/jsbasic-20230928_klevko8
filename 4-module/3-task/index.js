function highlight(table) {
  let rows = table.querySelectorAll("tr");
  for (let row of rows) {
    for (let cell of row.cells) {
      if (cell.dataset.available === "true") {
        row.classList.add('available');
      } else if (cell.dataset.available === "false") {
        row.classList.add('unavailable');
      }

      row.hidden = !cell.dataset.available;

      if (cell.textContent === 'm') {
        row.classList.add('male');
      } else if (cell.textContent === 'f') {
        row.classList.add('female');
      }

      if (typeof Number(cell.textContent) === 'number' && cell.textContent < 18) {
        row.style.textDecoration = 'line-through';
      }
    }
  }
}

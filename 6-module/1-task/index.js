/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.render();
  }

  render() {
    this.elem = document.createElement('table');
    const tbody = document.createElement('tbody');

    this.elem.classList.add('table');


    for (let i = 0; i < this.rows.length; i++) {
      const tr = document.createElement("tr");
      const row = this.rows[i];
      const values = Object.values(row);

      values.forEach((item) => {
        const td = document.createElement('td');
        td.innerHTML = item;
        tr.appendChild(td);
      });

      const buttonTd = document.createElement('td');
      const button = document.createElement('button');
      button.innerHTML = 'X';
      button.addEventListener('click', this.onRowDelete);
      buttonTd.appendChild(button);
      tr.appendChild(buttonTd);

      tbody.appendChild(tr);
    }
    this.elem.appendChild(tbody);

    document.body.appendChild(this.elem);

  }

  onRowDelete(event) {
    event.target.closest('tr').remove();
  }
}

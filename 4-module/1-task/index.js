function makeFriendsList(friends) {
  let ul = document.createElement('ul');
  for (let item of friends) {
    let li = document.createElement('li');
    li.textContent = `${item.firstName} ${item.lastName}`;
    ul.append(li);
  }
  return ul;
}

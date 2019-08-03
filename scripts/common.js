import FindFullPath from './FindFullPath.js';

window.findFullPath = new FindFullPath();

window.item = document.querySelectorAll('.board_body_item')[2];

let path = findFullPath.find(item, false);
console.log(path);

path = findFullPath.find(item);
console.log(path);
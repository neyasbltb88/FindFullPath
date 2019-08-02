import FindFullPath from './FindFullPath.js';

window.findFullPath = new FindFullPath();

window.item = document.querySelector('.board_body_item');
let path = findFullPath.find(item);
console.log(path);
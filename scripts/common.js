import FindFullPath from "./FindFullPath.js";

window.findFullPath = new FindFullPath();

window.item = document.querySelectorAll(".board_body_item")[3];

let path = findFullPath.find(item, false);
console.log(path);

path = findFullPath.find(item);
console.log(path);

console.log(document.querySelectorAll(path));
let path_info = document.querySelector('.path_info');

document.addEventListener('mouseover', e => {
    let path = findFullPath.find(e.target, false);
    let target_build_path = findFullPath._buildPath([path.pop()]);
    let parent_build_path = findFullPath._buildPath(path);

    path_info.innerHTML = `${parent_build_path} <span class="highlight_target">${target_build_path}</span>`

    let style = document.querySelector('.findFullPath_highlight');
    if (!style) {
        style = document.createElement('style');
        style.className = 'findFullPath_highlight';
        document.head.appendChild(style);
    }

    style.textContent = /* css */ `
        ${parent_build_path + ' ' + target_build_path} {
            outline: 1px solid #f00;
        }
    `;
});
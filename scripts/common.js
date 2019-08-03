import FindFullPath from "./FindFullPath.js";

window.findFullPath = new FindFullPath();

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
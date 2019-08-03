import FindFullPath from "./FindFullPath.js";

window.findFullPath = new FindFullPath();

let path_info_wrap = document.createElement('div');
path_info_wrap.className = 'path_info_wrap';
let path_info = document.createElement('div');
path_info.className = 'path_info';
let path_info_style = document.createElement('style');
path_info_style.textContent = /* css */ `
.path_info_wrap {
    display: flex;
    justify-content: flex-end;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9999999999;
    padding: 20px;
    background-color: rgba(0,0,0,.7);
    border-radius: 7px 0 0 7px;
    color: #fff;
    font-family: sans-serif;
    font-size: 14px;
    max-width: 97vw;
    overflow: auto;
}
.path_info_wrap .path_info {
    max-width: 100%;
    word-wrap: break-word;
    overflow: auto;
}
.path_info_wrap .path_info:before {
    content: 'Селектор: ';
}
.path_info_wrap .path_info .highlight_target {
    color: #ffc000 !important;
}
`;

path_info_wrap.appendChild(path_info);
path_info_wrap.appendChild(path_info_style);
document.body.appendChild(path_info_wrap);

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
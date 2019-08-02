export default class FindFullPath {
    constructor() {}

    find(el, build = true) {
        let result;
        if (el instanceof HTMLElement) {
            result = this._findParent(el).reverse();

            if (build) result = this._buildPath(result);

            return result;
        }

        return false;
    }

    _camelToKebab(string) {
        return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    }

    _findParent(el, path = []) {
        path.push({
            selectors: this._detectSelector(el),
            // nth: ''
        });
        if (el.parentElement) {
            this._findParent(el.parentElement, path);
        }

        return path;
    }

    _countSibling(el, nth = 1) {

    }

    _buildPath(path) {
        return this._buildSelectors(path).join(' ');
    }

    _buildSelectors(path) {
        path.map((el, index) => {
            path[index] = el.selectors.node + this._buildId(el.selectors.id) + this._buildClass(el.selectors.class) + this._buildDataset(el.selectors.data);
        });

        return path;
    }

    _buildId(id) {
        if (id) return '#' + id;
        return '';
    }

    _buildClass(classList) {
        if (classList) return '.' + classList.join('.');
        return '';
    }

    _buildDataset(dataset) {
        let result = '';
        if (dataset) {
            for (let key in dataset) {
                result += `[data-${this._camelToKebab(key)}=\"${dataset[key]}\"]`
            }
        }
        return result;
    }

    _detectSelector(el) {
        let selectors = {};
        selectors.id = el.id ? el.id : '';
        selectors.class = el.classList.length ? [...el.classList] : '';
        selectors.data = Object.keys(el.dataset).length ? {
            ...el.dataset
        } : '';
        selectors.node = el.nodeName;

        return selectors;
    }
}
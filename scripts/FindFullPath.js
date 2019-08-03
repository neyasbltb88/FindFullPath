export default class FindFullPath {
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
        return string.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    }

    _findParent(el, path = []) {
        path.push(this._detectSelector(el));
        if (el.parentElement) {
            this._findParent(el.parentElement, path);
        }

        return path;
    }

    _findNth(el) {
        let nth = "";
        let parent = el.parentElement;
        if (parent) {
            nth = [...parent.children].indexOf(el);
        }

        return nth;
    }

    _buildNth(nth) {
        if (nth !== "") return `:nth-child(${++nth})`;
        return nth;
    }

    _buildPath(path) {
        return this._buildSelectors(path).join(" ");
    }

    _buildSelectors(path) {
        path.map((el, index) => {
            let selector = el.node + this._buildId(el.id);
            selector +=
                this._buildClass(el.class) + this._buildDataset(el.data);
            selector += this._buildNth(el.nth);
            path[index] = selector;
        });

        return path;
    }

    _buildId(id) {
        if (id) return "#" + id;
        return "";
    }

    _buildClass(classList) {
        if (classList) return "." + classList.join(".");
        return "";
    }

    _buildDataset(dataset) {
            let result = "";
            if (dataset) {
                for (let key in dataset) {
                    result += `[data-${this._camelToKebab(key)}${dataset[key] ? `="${dataset[key]}"` : ""}]`;
            }
        }
        return result;
    }

    _detectSelector(el) {
        let selectors = {};

        selectors.node = el.nodeName.toLowerCase();
        selectors.id = el.id ? el.id : "";
        selectors.class = el.classList.length ? [...el.classList] : "";
        selectors.data = Object.keys(el.dataset).length ? {
            ...el.dataset
        } : "";
        selectors.nth =
            selectors.node === "html" ||
            selectors.node === "head" ||
            selectors.node === "body" ?
            "" :
            this._findNth(el);

        return selectors;
    }
}
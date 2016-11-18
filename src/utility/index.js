export function extractParameters(_object) {
    let _list = Object.keys(_object).map(function(key, index) {
        return key + "=" + _object[key];
    });
    return _list.join('&');
}
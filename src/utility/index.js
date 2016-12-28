export function extractParameters(_object) {
    let _list = Object.keys(_object).map(function(key, index) {
        return key + "=" + _object[key];
    });
    return _list.join('&');
}

export function extractStatsResult(resultSet) {
    let headers = resultSet.headers;
    let rowSet = resultSet.rowSet;
    return rowSet.map(item => {
        let result = {};
        item.forEach((val, index) => {
            result[headers[index].toLowerCase()] = val;
        });
        return result;
    })
}

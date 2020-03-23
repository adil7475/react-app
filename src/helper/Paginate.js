import _ from 'lodash';
export function Paginate(items, pageNumber, pageSize){
    const startIndex = (pageNumber - 1) * pageSize;
    //first make items the object of the lodash
    return _(items)
            .slice(startIndex)
            .take(pageSize)
            .value();
}
function mergeSort(array) {
    let length = array.length;
    if (length <= 1) {return array;}

    let middle = Math.floor(length / 2);

    let leftArray = new Array(middle);
    let rightArray= new Array(length - middle);

    let bar = 0;

    for (let i = 0; i < length; i++ ){
        if(i < middle) {
            leftArray[i] = array[i];
        } else {
            rightArray[bar] = array[i];
            bar++;
        }   
    }
    leftArray = mergeSort(leftArray);
    rightArray = mergeSort(rightArray);
    return merge(leftArray, rightArray);
} 

function merge (leftArray, rightArray) {
    let result = [];

    // indices
    let l = 0;
    let r = 0;

    // check merge conditions
    while (l < leftArray.length && r < rightArray.length) {
        if (leftArray[l] < rightArray[r]){
            result.push(leftArray[l]);
            l++;
        } else {
            result.push(rightArray[r]);
            r++;
        }
    }

    return result.concat(leftArray.slice(l)).concat(rightArray.slice(r));
}

function cleanDuplicates(array) {
    array = [...new Set(array)];
    return array;
}

export {mergeSort, cleanDuplicates};

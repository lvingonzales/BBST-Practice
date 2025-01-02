// This module contains the code for a Balanced Binary Search Tree.

import { cleanDuplicates, mergeSort } from "./mergeSort.module.js";

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor (array){
        this.root = this.buildTree(mergeSort(cleanDuplicates(array)));
    }

    buildTree (array) {
        return this.arrayToBSTRecur(array, 0, array.length - 1);
    }

    arrayToBSTRecur(array, start, end) {
        if(start > end){return null;}

        let mid = start + Math.floor((end - start) / 2);

        let root = new Node(array[mid]);

        root.left = this.arrayToBSTRecur(array, start, mid - 1);

        root.right = this.arrayToBSTRecur(array, mid + 1, end);

        return root;
    }

    find (value, root = this.root) {
        if(root === null || root.data === value) {return root;}

        if (value < root.data) {
            return this.find(value, root.left);
        }
        return this.find(value, root.right);
    }

    levelOrder (array = [], queue = [], root = this.root, callback) {
        if(root === null) {return;}
        if(callback === null) {throw new Error(`Callback not found: Callback is required`);}
        callback(root);
        
        array.push(root.data);

        queue.push(root.left);
        queue.push(root.right);

        while (queue.length){
            const level = queue[0];
            queue.shift();
            this.levelOrder(array, queue, level)
        }

        return array;
    }
}



const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(array);
prettyPrint(tree.root);
console.log (tree.levelOrder());




 
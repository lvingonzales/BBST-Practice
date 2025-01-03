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

    levelOrder (callback, array = [], queue = [], root = this.root) {
        if(root === null) {return;}
        if(callback === undefined) {throw new Error(`Callback not found: Callback is required`);}
        callback(root);
        
        array.push(root.data);

        queue.push(root.left);
        queue.push(root.right);

        while (queue.length){
            const level = queue[0];
            queue.shift();
            this.levelOrder(callback, array, queue, level)
        }

        return array;
    }

    inOrder (callback, arr = [], root = this.root){
        if(root === null){return;}

        this.inOrder(callback, arr, root.left);
        callback(root);
        arr.push(root.data);
        this.inOrder(callback, arr, root.right);

        return arr;
    }

    preOrder(callback, arr = [], root = this.root) {
        if(root === null){return;}

        callback(root);
        arr.push(root.data);

        this.preOrder(callback, arr, root.left);
        this.preOrder(callback, arr, root.right);

        return arr;
    }

    postOrder(callback, arr = [], root = this.root) {
        if(root === null){return;}

        this.postOrder(callback, arr, root.left);
        this.postOrder(callback, arr, root.right);

        callback(root);
        arr.push(root.data);

        return arr;
    }
    
    depth(node, root = this.root) {
        if(root === null){return -1;}
        let dist = -1;

        if((node === root.data) || (dist = this.depth(node, root.left)) >= 0 || (dist = this.depth(node, root.right)) >= 0) {
            return dist + 1;
        }
        return dist;
    }

    findHeight(node, root = this.root){
        if (root === null){return -1}

        let leftHeight = this.findHeight(node, root.left);

        let rightHeight = this.findHeight(node, root.right);

        let ans = Math.max(leftHeight, rightHeight) + 1;

        if(root.data === node){
            height = ans;
        }

        return ans;
    }

    height(node, root = this.root) {
        this.findHeight(node, root);

        return height;
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

let height = -1;

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(array);
prettyPrint(tree.root);
console.log(tree.height(4))

function callbackTest (node) {
    return;
}




 
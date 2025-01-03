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

    insert(key, currNode){
        if(currNode === null){return new Node(key);}

        if(currNode.data === key){return currNode;}

        if(key <= currNode.data){
            currNode.left = this.insert(key, currNode.left);
        } else if(key > currNode.data){
            currNode.right = this.insert(key, currNode.right);
        }

        return currNode;
    }

    delNodeGetSuccessor(node){
        node = node.right;
        while(node !== null && node.left !== null){
            node = node.left;
        }
        return node;
    }

    deleteNode(node ,root = this.root) {
        if (root === null){return root;}

        if(root.data > node){
            root.left = this.deleteNode(node, root.left);
        } else if(root.data < node){
            root.right = this.deleteNode(node, root.right);
        } else {
            if(root.left === null){return root.right;}

            if(root.right === null){return root.left;}

            let successor = this.delNodeGetSuccessor(root);
            root.data = successor.data;
            root.right = this.deleteNode(successor.data, root.right);
        }

        return root; 
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
        if(callback === undefined) {throw new Error(`Callback not found: Callback is required`);}

        this.inOrder(callback, arr, root.left);
        callback(root);
        arr.push(root.data);
        this.inOrder(callback, arr, root.right);

        return arr;
    }

    preOrder(callback, arr = [], root = this.root) {
        if(root === null){return;}
        if(callback === undefined) {throw new Error(`Callback not found: Callback is required`);}

        callback(root);
        arr.push(root.data);

        this.preOrder(callback, arr, root.left);
        this.preOrder(callback, arr, root.right);

        return arr;
    }

    postOrder(callback, arr = [], root = this.root) {
        if(root === null){return;}
        if(callback === undefined) {throw new Error(`Callback not found: Callback is required`);}

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

    isBalanced(root = this.root){
        if(root === null){return true;}

        let leftHeight = this.balanceHeightUtil(root.left);
        let rightHeight = this.balanceHeightUtil(root.right);

        if ((leftHeight - rightHeight) <= 1 && this.isBalanced(root.left) == true  && this.isBalanced(root.right) == true){
            return true;
        }
        return false;
    }

    balanceHeightUtil(root){
        if (root === null) {return 0;}

        return Math.max(this.balanceHeightUtil(root.left), this.balanceHeightUtil(root.right)) + 1;
    }

    reBalance(newArr = []){
        this.inOrder(addToArray);

        function addToArray(node){
            return newArr.push(node.data);
        }
        
        this.root = this.buildTree(newArr, 0, newArr.length - 1);
        return `Rebalanced!`;
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

// Driver script

function dummyCallback() {
    return;
}

const arr = [7,13,21,25,47,54,55,82,91]

// initial creation and printout
let tree = new Tree(arr);
prettyPrint(tree.root);
console.log(tree.isBalanced());
console.log(`inOrder: ${tree.inOrder(dummyCallback)}`);
console.log(`preOrder: ${tree.preOrder(dummyCallback)}`);
console.log(`postOrder: ${tree.postOrder(dummyCallback)}`);

// adding to unbalance the tree
for (let i = 0; i < 10; i++){
    tree.insert(Math.floor(Math.random() * 100), tree.root);
}
prettyPrint(tree.root);
console.log(tree.isBalanced());
tree.reBalance();
prettyPrint(tree.root);
console.log(tree.isBalanced());

// Final print out
console.log(`levelOrder: ${tree.levelOrder(dummyCallback)}`);
console.log(`inOrder: ${tree.inOrder(dummyCallback)}`);
console.log(`preOrder: ${tree.preOrder(dummyCallback)}`);
console.log(`postOrder: ${tree.postOrder(dummyCallback)}`);



 
import { type CodeSnippet } from '../../types';

export const binaryTree: CodeSnippet = {
  id: 'binary-tree-java',
  title: 'Binary Tree Implementation',
  description: 'Complete binary tree implementation in Java with basic operations',
  language: 'java',
  code: `public class BinaryTree<T> {
    private class Node {
        T data;
        Node left;
        Node right;

        Node(T data) {
            this.data = data;
            left = right = null;
        }
    }

    private Node root;

    public void insert(T data) {
        root = insertRec(root, data);
    }

    private Node insertRec(Node root, T data) {
        if (root == null) {
            root = new Node(data);
            return root;
        }

        if (Math.random() < 0.5)
            root.left = insertRec(root.left, data);
        else
            root.right = insertRec(root.right, data);

        return root;
    }

    public void inorderTraversal() {
        inorderRec(root);
    }

    private void inorderRec(Node root) {
        if (root != null) {
            inorderRec(root.left);
            System.out.print(root.data + " ");
            inorderRec(root.right);
        }
    }
}`,
  tags: ['data-structure', 'tree', 'binary-tree', 'intermediate'],
  author: {
    name: 'Pranay De',
    github: 'https://github.com/pranayde',
  },
};
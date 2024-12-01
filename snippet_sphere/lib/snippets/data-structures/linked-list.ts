import { type CodeSnippet } from '../types';

export const linkedList: CodeSnippet = {
  id: 'linked-list',
  title: 'Linked List Implementation',
  description: 'A complete implementation of a singly linked list with common operations',
  language: 'typescript',
  code: `class ListNode<T> {
  val: T;
  next: ListNode<T> | null;

  constructor(val: T) {
    this.val = val;
    this.next = null;
  }
}

class LinkedList<T> {
  head: ListNode<T> | null;
  
  constructor() {
    this.head = null;
  }

  append(val: T): void {
    const newNode = new ListNode(val);
    
    if (!this.head) {
      this.head = newNode;
      return;
    }

    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }

  delete(val: T): void {
    if (!this.head) return;

    if (this.head.val === val) {
      this.head = this.head.next;
      return;
    }

    let current = this.head;
    while (current.next) {
      if (current.next.val === val) {
        current.next = current.next.next;
        return;
      }
      current = current.next;
    }
  }

  print(): void {
    let current = this.head;
    const values: T[] = [];
    
    while (current) {
      values.push(current.val);
      current = current.next;
    }
    
    console.log(values.join(' -> '));
  }
}`,
  tags: ['linked-list', 'data-structure', 'intermediate', 'interview'],
  author: {
    name: 'Pranay De',
    github: 'https://github.com/pranayde',
  },
};
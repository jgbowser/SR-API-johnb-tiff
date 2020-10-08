class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}
class LinkedList {
  constructor(total_score, name, id) {
    this.head = null;
    this.total_score = total_score;
    this.name = name;
    this.id = id;
  }

  insertFirst(item) {
    this.head = new _Node(item, this.head); // left side is item and right side is same item but adding to list
  }

  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item);
    }
    else {
      let tempNode = this.head;
      while (tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      tempNode.next = new _Node(item, null);
    }
  }
	
  findTail() {
    let tail = this.head

    while(tail.next) {
      tail = tail.next
    }
    return tail
  }

  getNodeAt(position) {
    let count = 0
    let node = this.head
    
    while ((count < position) && node) {
      node = node.next
      count++
    }
    return node
  }

  insertAt(newItem, i) {
    let nodeBeforeInsert = this.getNodeAt(i - 1)

    if(!nodeBeforeInsert) {
      return this.insertLast(newItem)
    }

    let newNode = new _Node(
      newItem,
      nodeBeforeInsert.next
    )
    newNode.value.next = nodeBeforeInsert.value.next
    nodeBeforeInsert.next = newNode
    this.head.value.next = this.head.next.value.id
    //console.log('NEW NEW NEW NEW NEW', newNode, 'HEAD HEAD HEAD HEAD HEAD ', this.head)
  }

  insert(item) {
    if (!this.head){
      this.insertFirst(item)
    } else {
      this.insertLast(item)
    }
  }
    
  moveNode(spaces) {
    let node = this.head
    this.head = this.head.next
    this.insertAt(node.value, spaces)
  }

  map() {
    let node = this.head
    let arr = []
    while (node) {
      arr.push(node)
      node = node.next
    }
    return arr
  }


    

  //     insertBefore(newItem, targetItem) {
  //         let currNode = this.head
  //         let previousNode = null
  //         if (!currNode) {
  //             return this.head = new _Node(newItem, null)
  //         }
  //         while (currNode.value !== targetItem) {
  //             if (currNode.next === null) {
  //                 return null;
  //             }
  //             else {
  //                 previousNode = currNode
  //                 currNode = currNode.next;
  //             }
  //         }
  //         if (previousNode === null) {
  //             return this.head = new _Node(newItem, this.head)
  //         }
  //         return previousNode.next = new _Node(newItem, currNode)
  //     }

  //     insertAfter(newItem, targetItem) {
  //         const targetNode = this.find(targetItem)
  //         if (targetNode) {
  //             targetNode.next = new _Node(newItem, targetNode.next) // left side is the target and next describes what's after, right side is inserting new node
  //         }

  //     find(item) {
  //         // Start at the head
  //         let currNode = this.head;
  //         // If the list is empty
  //         if (!this.head) {
  //             return null;
  //         }
  //         // Check for the item 
  //         while (currNode.value !== item) {
  //             /* Return null if it's the end of the list 
  //                and the item is not on the list */
  //             if (currNode.next === null) {
  //                 return null;
  //             }
  //             else {
  //                 // Otherwise, keep looking 
  //                 currNode = currNode.next;  // steps to next node
  //             }
  //         }
  //         // Found it
  //         return currNode;
  //     }
  //     remove(item) {
  //         // If the list is empty
  //         if (!this.head) {
  //             return null;
  //         }
  //         // If the node to be removed is head, make the next node head
  //         if (this.head.value === item) {
  //             this.head = this.head.next;
  //             return;
  //         }
  //         // Start at the head
  //         let currNode = this.head;
  //         // Keep track of previous
  //         let previousNode = this.head;

  //         while ((currNode !== null) && (currNode.value !== item)) {
  //             // Save the previous node 
  //             previousNode = currNode;
  //             currNode = currNode.next;
  //         }
  //         if (currNode === null) {
  //             console.log('ERROR: Item not found');
  //             return;
  //         }
  //         previousNode.next = currNode.next;  // removes item
  //     }
  // }

  // display = (list) => {
  //     let currNode = list.head
  //     console.log('-~-head-~-')
  //     while (currNode !== null) {
  //         console.log(currNode.value)
  //         currNode = currNode.next
  //     }
  //     console.log('-~-tail-~-')

}

module.exports = {_Node, LinkedList}
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
    nodeBeforeInsert.next = newNode
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
}

module.exports = {_Node, LinkedList}
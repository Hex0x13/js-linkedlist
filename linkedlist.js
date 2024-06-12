
class Node {
    constructor(val) {
        this.data = val;
        this.next = null;
    }
}


class LinkedList {
    #head;
    #tail;
    constructor() {
        this.#head = null;
        this.#tail = null;
    }

    append(val) {
        if (!this.#head) {
            this.#head = new Node(val);
            this.#tail = this.#head;
        } else {
            this.#tail.next = new Node(val);
            this.#tail = this.#tail.next;
        }
    }

    prepend(val) {
        const tmp = new Node(val);
        tmp.next = this.#head;
        this.#head = tmp;
    }

    size() {
        let ptr = this.#head,
            count = 0;
        while (ptr) {
            ptr = ptr.next;
            ++count;
        }
        return count;
    }

    head() {
        return this.#head;
    }

    tail() {
        return this.#tail;
    }

    at(index) {
        let ptr = this.#head,
            count = 0;
        while (ptr) {
            if (index === count) {
                return ptr;
            }
            ++count;
            ptr = ptr.next;
        }
        return null;
    }

    pop() {
        if (!this.#head) {
            return null;
        }

        if (!this.#head.next) {
            const tmp = this.#head;
            this.#head = null;
            this.#tail = null;
            return tmp;
        }

        const tmp = this.#tail;
        this.#tail = null;
        let prev,
            ptr = this.#head;
        while (ptr.next) {
            prev = ptr;
            ptr = ptr.next;
        }
        prev.next = null;
        this.#tail = prev;
        return tmp;
    }

    contains(val) {
        let ptr = this.#head;
        while (ptr) {
            if (ptr.data === val) {
                return true;
            }
            ptr = ptr.next;
        }
        return false;
    }

    find(val) {
        let ptr = this.#head,
            count = 0;
        while (ptr) {
            if (val === ptr.data) {
                return count;
            }
            ptr = ptr.next;
            ++count;
        }
        return -1;
    }

    /*
     * if return false means failed to insert a node
     * else success
     * */
    insertAt(val, index) {
        if (!this.#head) {
            return false;
        }
        let count = 0,
            prev = null,
            ptr = this.#head;
        while (ptr) {
            if (count === index) {
                const newNode = new Node(val);
                if (prev) {
                    prev.next = newNode;
                } else {
                    this.#head = newNode;
                }
                newNode.next = ptr;
                return true;
            }
            prev = ptr;
            ptr = ptr.next;
            ++count;
        }
        if (index === count) {
            this.append(val);
            return true;
        }

        return false;
    }

    removeAt(index) {
        if (!this.#head) {
            return null;
        }
        let count = 0,
            prev = null,
            ptr = this.#head;
        while (ptr) {
            if (count === index) {
                if (prev) {
                    prev.next = ptr.next;
                } else {
                    this.#head = ptr.next;
                }
                ptr.next = null;
                return ptr;
            }
            prev = ptr;
            ptr = ptr.next;
            ++count;
        }
        if (index === count) {
            return this.pop();
        }
        return null;
    }

    toString() {
        if (!this.#head) {
            return "null";
        }
        let str = "";
        let ptr = this.#head;

        while (ptr) {
            str += `( ${ptr.data} ) -> `;
            ptr = ptr.next;
        }
        str += "null";
        return str;
    }

}


const list = new LinkedList();
list.append(1);
list.append(2);
list.prepend(0);
list.append(3);
list.prepend(-1);
list.append(4);
list.prepend(-2);


console.log("head: " + list.head().data);
console.log("tail: " + list.tail().data);

let size = list.size();
console.log("size: " + size);

console.log("\n\nat method: ");
for (let i = 0; i < size; ++i) 
    console.log(i + ": " + list.at(i).data);

console.log("\n\ncontains method: ");
for (let i = 0; i < size+3; ++i) 
    console.log(i + ": " + list.contains(i));

console.log("\n\nfind method: ");
const items = [1, 2, 3, 10, 11, -4, -2];
for (let item of items) {
    const index = list.find(item);
    if (index === -1) {
        console.log("Not found");
    } else {
        console.log(item + " is found at index " + index); 
    }
}

list.insertAt(111, size);
list.insertAt(222, Math.floor(size / 2));
list.insertAt(333, 0);

console.log(list.removeAt(0));
console.log(list.removeAt(Math.floor(size / 2)));
console.log(list.removeAt(size));

console.log(list.toString());


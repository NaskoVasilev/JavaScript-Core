class SortedList {
    constructor() {
        this.list = [];
        this.size = 0;
    }

    add(element) {
        this.list.push(element);
        this.list.sort((a, b) => a - b);
        this.size++;
    }

    remove(index) {
        if (index >= 0 && index < this.list.length) {
            this.list.splice(index, 1);
            this.size--;
        }
    }

    get(index) {
        if (index >= 0 && index < this.list.length) {
            return this.list[index];
        }
    }
}

let sortedList = new SortedList();
sortedList.add(2)
sortedList.add(1)
sortedList.add(10)
sortedList.add(5)
sortedList.remove(0)
console.log(sortedList.list);
console.log(sortedList.get(2));
console.log(sortedList.size);

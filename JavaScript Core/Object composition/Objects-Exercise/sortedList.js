function getSortedList(){
    return {
        list:[],
        size:0,
        add:function (element) {
            this.list.push(element)
            this.size++;
            this.list=this.list.sort((a,b)=>a-b)
        },
        remove:function (index) {
            if(index>=0&&index<this.list.length){
                this.list.splice(index,1);
                this.size--;
            }
        },
        get:function (index) {
            if(index>=0&&index<this.list.length){
                return this.list[index];
            }
        },
    }
}
let sortedList=getSortedList();
sortedList.add(1)
sortedList.add(3)
sortedList.add(2)
sortedList.add(11)
console.log(sortedList.size);
sortedList.remove(2)
console.log(sortedList.list.toString());
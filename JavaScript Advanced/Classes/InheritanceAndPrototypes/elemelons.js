function solve() {
    class Melon{
        constructor(weight ,melonSort ){
            if(new.target===Melon){
                throw new TypeError("Abstract class cannot be instantiated directly");
            }
            this.weight=Number(weight);
            this.melonSort=melonSort;
            this._elementIndex=this.weight*(this.melonSort.length)
            this.element=""
        }
        get elementIndex(){
            return this._elementIndex;
        }
        toString(){
            let output=`Element: ${this.element}`;
            output+=`\nSort: ${this.melonSort}`;
            output+=`\nElement Index: ${this.elementIndex}`;
            return output;
        }
    }

    class Watermelon extends Melon{
        constructor(weight ,melonSort){
            super(weight ,melonSort);
            this.element="Water"
        }
    }
    class Firemelon extends Melon{
        constructor(weight ,melonSort){
            super(weight ,melonSort);
            this.element="Fire"
        }
    }
    class Earthmelon extends Melon{
        constructor(weight ,melonSort){
            super(weight ,melonSort);
            this.element="Earth"
        }
    }
    class Airmelon extends Melon{
        constructor(weight ,melonSort){
            super(weight ,melonSort);
            this.element="Air"
        }
    }
    class Melolemonmelon extends Watermelon{
        constructor(weight ,melonSort){
            super(weight ,melonSort);
            this.element="Water";
            this.elements=['Fire','Earth','Air','Water'];
        }
        morph(){
            let currentElement=this.elements.shift();
            this.element=currentElement;
            this.elements.push(currentElement);
        }
    }

    return {
        Melon,
        Watermelon,
        Earthmelon,
        Airmelon,
        Melolemonmelon,
        Firemelon
    }
}




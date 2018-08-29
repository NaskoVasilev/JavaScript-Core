class Repository {
    constructor(props) {
        this.props = props;
        this.count = 0;
        this.data = new Map();
        this.id = 0;
    }

    add(entity) {
        this.validate(entity)
        this.data.set(this.id++, entity);
        this.count++;
        return this.id - 1;
    }
    validate(entity){
        for (const key in entity) {
            if (!this.props.hasOwnProperty(key)) {
                throw new Error(`Property ${key} is missing from the entity!`)
            }
            if (typeof entity[key] !== this.props[key]) {
                throw new TypeError(`Property ${this.props[key]} is of incorrect type!`)
            }
        }
    }

    get(id) {
        let keys = Array.from(this.data.keys())
        for (const key of keys) {
            if (key === id) {
                return this.data.get(key)
            }
        }
        throw new Error(`Entity with id: ${id} does not exist!`)
    }

    update(id, entity) {
        let idExists = false;
        let keys = Array.from(this.data.keys());
        for (const key of keys) {
            if (id === key) {
                idExists = true;
            }
        }
        if (!idExists) {
            throw new Error(`Entity with id: ${id} does not exist!`)
        }
       this.validate(entity)
        this.data.set(id, entity)
    }

    del(id) {
        let keys = Array.from(this.data.keys());
        for (const key of keys) {
            if (key === id) {
                this.data.delete(id);
                this.count--;
                return;
            }
        }

        throw new Error(`Entity with id: ${id} does not exist!`)
    }
}

//tests
let properties = {
    name: "string",
    age: "number",
    birthday: "object"
};
//Initialize the repository
let repository = new Repository(properties);
// Add two entities
let entity = {
    name: "Kiril",
    age: 19,
    birthday: new Date(1998, 0, 7)
};
repository.add(entity); // Returns 0
repository.add(entity); // Returns 1

entity = {
    name: 'Valio',
    age: 19,
    birthday: new Date(1998, 0, 7)
};
repository.update(1, entity);
console.log(repository.get(1));

repository.del(0);
console.log(repository.count);

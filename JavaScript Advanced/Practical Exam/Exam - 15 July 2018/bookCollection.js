class BookCollection {
    constructor(shelfGenre, room, shelfCapacity) {
        this.room = room;
        this.shelfGenre = shelfGenre;
        this.shelf = [];
        this.shelfCapacity = Number(shelfCapacity);
    }

    get room() {
        return this._room;
    }

    set room(value) {
        if (value === 'livingRoom' || value === 'bedRoom' || value === 'closet') {
            this._room = value;
        } else {
            throw new Error(`Cannot have book shelf in ${value}`)
        }
    }

    get shelfCondition() {
        return this.shelfCapacity - this.shelf.length;
    }

    addBook(bookName, bookAuthor, genre) {
        if (this.shelfCondition===0) {
            this.shelf.splice(0,1)
        }
        let newBook = {bookName,bookAuthor,genre};
        this.shelf.push(newBook);

        this.shelf.sort((a, b) => {
            return a.bookAuthor.localeCompare(b.bookAuthor);
        })
    }

    throwAwayBook(bookName) {
        for (let i = 0; i < this.shelf.length; i++) {
            if (this.shelf[i].bookName === bookName) {
                this.shelf.splice(i, 1);
                break;
            }
        }
    }

    showBooks(genre) {
        let output=[];
        output.push(`Results for search "${genre}":`);
        for (const book of this.shelf) {
            if (book.genre === genre) {
                output.push(`\uD83D\uDCD6 ${book.bookAuthor} - "${book.bookName}"`)
            }
        }
        return output.join('\n')
    }

    toString() {
        if (this.shelf.length === 0) {
            return "It's an empty shelf";
        }
        let output = `"${this.shelfGenre}" shelf in ${this.room} contains:`
        for (const book of this.shelf) {
            output += `\n\uD83D\uDCD6 "${book.bookName}" - ${book.bookAuthor}`
        }
        return output
    }
}

// let livingRoom = new BookCollection("Programming", "livingRoom", 5)
//     livingRoom.addBook("Introduction to Programming with C#", "Svetlin Nakov")
//     livingRoom.addBook("Introduction to Programming with Java", "Svetlin Nakov")
//     livingRoom.addBook("Programming for .NET Framework", "Svetlin Nakov");
// console.log(livingRoom.toString());





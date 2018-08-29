class Task {
    constructor(title, deadline) {
        this.title = title;
        this.deadline = deadline;
        this.status = 'Open';
    }

    get deadline() {
        return this._deadline;
    }

    set deadline(value) {
        if (value < Date.now()) {
            throw new RangeError('The deadline is in the past');
        }
        this._deadline = value;
    }

    get isOverdue() {
        return this.deadline < Date.now()
    }

    get icon() {
        if (this.isOverdue && this.status!=='Complete') {
            return '\u26A0'
        } else if (this.status === 'Open') {
            return '\u2731'
        } else if (this.status === 'In Progress') {
            return '\u219D'
        } else {
            return '\u2714'
        }
    }

    get rank() {
        if (this.isOverdue && this.status !== 'Complete') {
            return 0
        } else if (this.status === "In Progress") {
            return 1;
        } else if (this.status === 'Open') {
            return 2
        } else {
            return 3;
        }
    }

    static comparator(task1, task2) {
        let rankDiff = task1.rank - task2.rank;
        if (rankDiff === 0) {
            return task1.deadline - task2.deadline;
        }
        return rankDiff;
    }

    toString() {
        if (this.isOverdue && this.status !== 'Complete') {
            return `[${this.icon}] ${this.title} (overdue)`
        } else if (this.status === 'Compete') {
            return `[${this.icon}] ${title}`
        }

        return `[${this.icon}] ${this.title} (deadline: ${this.deadline})`
    }

}

//tests
let date1 = new Date();
date1.setDate(date1.getDate() + 7); // Set date 7 days from now
let task1 = new Task('JS Homework', date1);
let date2 = new Date();
date2.setFullYear(date2.getFullYear() + 1); // Set date 1 year from now
let task2 = new Task('Start career', date2);
console.log(task1 + '\n' + task2);
let date3 = new Date();
date3.setDate(date3.getDate() + 3); // Set date 3 days from now
let task3 = new Task('football', date3);
// Create two tasks with deadline set to current time
let task4 = new Task('Task 4', new Date());
let task5 = new Task('Task 5', new Date());
task1.status = 'In Progress';
task3.status = 'In Progress';
task5.status = "Complete";
let tasks = [task1, task2, task3, task4, task5];
setTimeout(() => {
    tasks.sort(Task.comparator);
    console.log(tasks.join('\n'));
}, 1000); // Sort and print one second later

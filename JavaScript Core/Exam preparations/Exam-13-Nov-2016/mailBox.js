class MailBox{
    constructor(){
        this.mailbox=[];
    }
    addMessage(subject,text){
        this.mailbox.push({subject,text})
        return this;
    }
    get messageCount(){
        return this.mailbox.length;
    }
    deleteAllMessages(){
        this.mailbox=[];
    }
    findBySubject(substr){
        return this.mailbox.filter(msg=>msg.subject.includes(substr))
    }
    toString(){
        if(this.mailbox.length===0){
            return ' * (empty mailbox)';
        }else{
            return this.mailbox.map(msg=>`* [${msg.subject}] ${msg.text}`).join('\n')
        }
    }

}

//Tests

let mb = new MailBox();
console.log("Msg count: " + mb.messageCount);
console.log('Messages:\n' + mb);
mb.addMessage("meeting", "Let's meet at 17/11");
mb.addMessage("beer", "Wanna drink beer tomorrow?");
mb.addMessage("question", "How to solve this problem?");
mb.addMessage("Sofia next week", "I am in Sofia next week.");
console.log("Msg count: " + mb.messageCount);
console.log('Messages:\n' + mb);
console.log("Messages holding 'rakiya': " +
    JSON.stringify(mb.findBySubject('rakiya')));
console.log("Messages holding 'ee': " +
    JSON.stringify(mb.findBySubject('ee')));

mb.deleteAllMessages();
console.log("Msg count: " + mb.messageCount);
console.log('Messages:\n' + mb);

console.log("New mailbox:\n" +
    new MailBox()
        .addMessage("Subj 1", "Msg 1")
        .addMessage("Subj 2", "Msg 2")
        .addMessage("Subj 3", "Msg 3")
        .toString());


//Expected output

//Msg count: 0
// Messages:
//  * (empty mailbox)
// Msg count: 4
// Messages:
//  * [meeting] Let's meet at 17/11
//  * [beer] Wanna drink beer tomorrow?
//  * [question] How to solve this problem?
//  * [Sofia next week] I am in Sofia next week.
// Messages holding 'rakiya': []
// Messages holding 'ee': [{"subject":"meeting","text":"Let's meet at 17/11"},{"subject":"beer","text":"Wanna drink beer tomorrow?"},{"subject":"Sofia next week","text":"I am in Sofia next week."}]
// Msg count: 0
// Messages:
//  * (empty mailbox)
// New mailbox:
//  * [Subj 1] Msg 1
//  * [Subj 2] Msg 2
//  * [Subj 3] Msg 3
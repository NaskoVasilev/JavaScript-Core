function validateMessages(message) {
    let regex = /^<message\s+(([a-z])+="([A-Za-z0-9 .])+"\s*)+\s*>[\s\S]+<\/message>$/
    let recivePattern=/\bto="([A-Za-z0-9 .]+)\b"/;
    let sendPattern=/\bfrom="([A-Za-z0-9 .]+)\b"/;
    if (regex.test(message)) {
        let recieveMatch=message.match(recivePattern);
        let sendMatch=message.match(sendPattern);
        if(recieveMatch&&sendMatch){
            let recipient=recieveMatch[1];
            let sender=sendMatch[1];
            let text=message.substring(message.indexOf(">")+1,
                message.lastIndexOf("</message>"));

            let html="<article>\n";
            html+=`  <div>From: <span class="sender">${sender}</span></div>\n`;
            html+=`  <div>To: <span class="recipient">${recipient}</span></div>\n`;
            html+="  <div>\n";
            let index=text.indexOf("\n");
            if(index===-1){
                html+=`    <p>${text}</p>\n`
            }
            else{
                let startIndex=0;
                while(index>-1){
                    html+=`    <p>${text.substring(startIndex,index)}</p>\n`
                    startIndex=index+1;
                    index=text.indexOf("\n",index+1);
                }
                html+=`    <p>${text.substring(startIndex)}</p>\n`
            }

            html+="  </div>\n";
            html+="</article>";

            console.log(html);

        }
        else{
            console.log("Missing attributes")
        }


    }
    else {
        console.log("Invalid message format")
    }
}
validateMessages("<message mailto=\"everyone\" from=\"Grandma\" to=\"Everyone\">FWD: FWD: FWD: FWD: Forwards from grandma</message>")
//validateMessages("<message from=\"Hillary\" to=\"Edward\" secret:true>VGhpcyBpcyBhIHRlc3Q</message>")
//validateMessages("<message to=\"Bob\" from=\"Alice\" timestamp=\"1497254114\">Same old, same old\n" +
  //  "Let's go out for a beer</message>")
//validateMessages("<message to=\"Bob\" from=\"Alice\" timestamp=\"1497254092\">Hey man, what's up?</message>")
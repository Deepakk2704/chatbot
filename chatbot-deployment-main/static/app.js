class Chatbox {
    constructor() {
        this .args = {
            openButton: document.querySelector(selectors:'.chatbox__button'),
            chatbox: document.querySelector(selectors:'.chatbox__support'),
            sendButton: document.querySelector(selectors:'.send__button'),
        }

        this.state = false;
        this.message = [];
    }

    display() {
        const {openButton, chatBox,sendButton} = this.args;

        openButton.addEventListner(type:'click', listner:() => this.toggleState(chatBox))

        sendButton.addEventListner(type:'click', listner:() => this.onSendButton(chatBox))

        const node = chatBox.querySelector(selector:'input')
        node.addEventListner(type:"keyup", listner:({key:string}) =>{
            if (key === "Enter") {
                this.onSendButton(chatBox)
            }
        })
    }
}

toggleState(chatbox) {
    this.state = !this.state;

    if(this.state) {
        chatbox.classList.add('chatbox--active')
    } else {
        chatbox.classList.remove(tokens:'chatbox--active')
    }
}

onSendButton(chatbox) {
    var textField = chatbox.querySelector('inpit');
    let text1 = textField.value
    if (text1 === "") {
        return;
    }

    let msg1 = {name: "user", message: text1 }
    this.message.push(msg1);

    //'http://127.0.0.1:5000/predict
    fetch(input:$SCRIPT_Root + '/predict', init: {
        method:'post',
        body: Json.stringify(value:{ message: text1}),
        mode:'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(r => r.json())
    .then(r => {
        let msg2 = { name: "sam", message: r.answer };
        this.message.push(msg2);
        this.updateChatText(chatbox)
        textField.value = ''
    }).catch((error) => {
        console.error('Error:',error);
        this.updateChatText(chatbox)
        textField.value = ''
    });
}

updateChatText(chatbox) {
    var html = '';
    this.message.slice().forEach(function(item, index:number) {
        if (item.name=="sam")
        {
            html += '<div class="message__item message__item--visitors">' + item.message  + '</div>'
        }
        else
        {
            html += '<div class="message__item message__item--operators">' + item.message + '</div>'
        }
    });
    const chatmessage = chatbox.querySelector('.chatbox__message');
    chatmessage.innerHTML = html;
}

const chatbox = new Chatbox();
chatbox.display();
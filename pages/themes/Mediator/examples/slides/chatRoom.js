var Colleague = function(name) {
    this.name = name;
    this.chatroom = null;
};
Colleague.prototype = {
    send: function(message, to) {
        this.chatroom.send(message, this, to);
    },
    receive: function(message, from){
        console.log(from.name + " to " + this.name + ": " + message);
    }
};

// the Mediator
var Chatroom = function() {
    var participants = {};

    return {
        register: function(participant) {
            participants[participant.name] = participant;
            participant.chatroom = this;
        },
        send: function(message, from, to) {
            if (to) {                      // single message
                to.receive(message, from);
            } else {                       // broadcast message
                for (key in participants) {
                    if (participants[key] !== from) {
                        participants[key].receive(message, from);
                    }
                }
            }
            console.log(`\n`);
        }
    };
};



// define chatroom
var chatroom = new Chatroom();

// define colleagues
var maria = new Colleague("Maria");
var ivan = new Colleague("Ivan");
var asen = new Colleague("Asen");


// register participants
chatroom.register(maria);
chatroom.register(ivan);
chatroom.register(asen);

// start chat
ivan.send("Hi all, let's go for a beer?");
maria.send("I can't - have some urgent work to do!");
asen.send("I'm in!");
ivan.send("Come on, I'll help you after...", maria);
maria.send("Thanks! I'm coming, then.", ivan);

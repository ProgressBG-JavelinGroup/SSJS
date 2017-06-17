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
var Chatroom = function(name) {
  var participants = {};

  return {
  	chatName: name,
    register: function(participant) {
      participants[participant.name] = participant;
      participant.chatroom = this;
    },
    send: function(message, from, to) {
    	// check same chatrooms:
    	if( from.chatroom.chatName != to.chatroom.chatName){
    		return;
    	}

      if (to) {                      // single message
        to.receive(message, from);
      } else {                       // broadcast message
        for (key in participants) {
          if (participants[key] !== from) {
            participants[key].receive(message, from);
          }
        }
        console.log(`\n`);
      }
    }
  };
};

var companyChat = new Chatroom('companyChat');
var coleagueChat = new Chatroom('coleagueChat');

var maria = new Colleague('Maria');
var asen = new Colleague('Asen');

companyChat.register(maria);
coleagueChat.register(asen);

asen.send('Hi Maria', maria);


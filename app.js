var restify = require('restify');
var builder= require('botbuilder');
// set up restify server:

var server = restify.createServer();
server.listen(3978,function(){
    console.log('%s listen %s',server.name,server.url);
});
 var connector =new builder.ChatConnector({
     appId:'32a38024-70b8-48fb-8434-b690cc35bf34',
     appPassword:'MU7U85ggeX5vhXT9oGyzSnY'
 });
var bot = new builder.UniversalBot(connector);
server.post('/api/messages',connector.listen());

// Receive text from user :
bot.recognizer({
    recognize:function(context, done){
        var intent = {score:0.0};
        if (context.message.text){
            switch (context.message.text.toLowerCase()){

                case'hi':
                case 'hello':
                case 'hey':
                intent={score:1.0,intent:'Hi'};
                break;


            }
        }
        done(null, intent);
    }
});

// hi dialog:

bot.dialog('hi',function(session){
  session.sendTyping();
  setTimeout(function(){
    session.endDialog("Hi there, Welcome to Gizmofashion.com, India's leading brand for electronic products & accessories! How can I help you?");
  },2000);
}).triggerAction({matches:'Hi'});

class Form {
    constructor() {

    }
    display() {
        var title = createElement('h2')
        title.html("Welcome Soldier, get ready to fight!!");
        title.position(130, 0);

        var input = createInput("Name")
        var button = createButton("Enter")
        var greeting = createElement('h3');
        
        input.position(130,160);
        button.position(250,100);
        button.mousePressed(function() {
            input.hide();
            button.hide();
            var name = input.value();
            playerCount = playerCount + 1;
            player.update(name);
            player.updateCount(playerCount);
            greeting.html("Hello "+name+"! Ready for the Battle");
            greeting.position(130,160);
        })
    }
}
function Emitter() {
    this.events = {};
}

Emitter.prototype.on = function(type,listener){
    if (this.events[type] == undefined){
        this.events[type] = [];
        this.events[type].push(listener);
    } else{
        this.events[type].push(listener);
    }
}

Emitter.prototype.emit = function(type){
    if(this.events[type] != undefined){
        this.events[type].forEach(function(element){ //Call each element inside the current type
            element();
        });
    } else{
        return "Error";
    }
}

module.exports = Emitter;
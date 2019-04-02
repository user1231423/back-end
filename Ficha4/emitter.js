function Emitter() {
    var events = {};
}

Emitter.prototype.on = function(type,listener){
    if (this.events[type] == undefined){
        this.events[type] = [];
    } else{
        this.events[type].push(listener);
    }
}

Emitter.prototype.emit = function(type){
    type.forEach(function(element) {
        
    });
}
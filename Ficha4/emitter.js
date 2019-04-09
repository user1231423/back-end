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
    if(this.events[type] == undefined){
        return "Utilize o on primeiro!"; //Id does not exist return error
    }else{
        this.events[type].forEach(function(element){ //Call each element inside the current type
            return element();
        });
    }
}

module.exports = Emitter;
export default class Observable {
    constructor(initialValue) {
        this._listeners = [];
        this._value = initialValue;
    }

    notify() {
        this._listeners.forEach( listener => listener(this.value));
    }

    subscribe(listener) {
        this._listeners.push(listener);
    }

    get value() {
     return this._value;
    }

    set value(val) {
        if(val !== this._value)
        {
            this._value = val;
            this.notify();
        }
    }

}

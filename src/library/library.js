"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Library {
    constructor(value) {
        this._value = value;
    }
    getValue() {
        return this._value;
    }
    square() {
        return this._value * this._value;
    }
    cube() {
        return this.square() * this._value;
    }
}
exports.Library = Library;

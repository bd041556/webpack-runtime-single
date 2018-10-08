"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const library_1 = require("../library/library");
const library = new library_1.Library(12);
console.log("value:", library.getValue(), "squared:", library.square(), "cubed:", library.cube());

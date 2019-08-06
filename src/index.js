/* *** Node JS require module *** */

// var Person = require('./js/modules/Person.js');

/* *** ECMA 2015 (ES6) import */

import Person from './js/modules/Person';

class Adult extends Person {
    payTaxes() {
        console.log(this.name + " now owes $100 in taxes.");
    }
}

alert("This is a test 123!");

var john = new Person("John Doe", "red");
john.greet();

var jane = new Adult("Jane Smith", "blue-green");
jane.greet();
jane.payTaxes();

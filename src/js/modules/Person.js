/* *** traditional JS Object *** */

// function Person(fullName, FavColor) {
//     this.name = fullName;
//     this.favoriteColor = FavColor;
//     this.greet = function() {
//         console.log("Hello my name is " + this.name + " and my favorite color is " + this.favoriteColor + ".");
//     }
// }

// module.exports = Person;


/* *** ECMA 2015 Class */

class Person {
    constructor(fullName, FavColor) {
        this.name = fullName;
        this.favoriteColor = FavColor;
    }

    greet() {
        console.log("Hi there my name is " + this.name + " and my favorite color is " + this.favoriteColor + ".");
    }

}

export default Person;
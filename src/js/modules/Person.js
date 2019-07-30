function Person(fullName, FavColor) {
    this.name = fullName;
    this.favoriteColor = FavColor;
    this.greet = function() {
        console.log("Hello my name is " + this.name + " and my favorite color is " + this.favoriteColor + ".");
    }
}

module.exports = Person;
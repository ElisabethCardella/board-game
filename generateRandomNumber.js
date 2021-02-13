/*Creation of the method to generate a random number*/
export let generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
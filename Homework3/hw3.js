//Reverse a number
function reverseNumber(num){
    let numStr = num.toString();

    let revStr = numStr.split('').reverse().join('');
    
    let revNum = parseInt(revStr,10);
    return revNum;
}
let res = reverseNumber(245);
console.log(res)

//Palindrome

function palindrome(str){
    let Strnew = str.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
    let revStr =Strnew.split('').reverse().join('');

    return Strnew === revStr;
}
console.log(palindrome("mnm"))

//Combinations of a string

function strCombination(str){

    let comb=[];
    for(let i=0;i<=str.length;i++){
        for(let j=i+1;j<= str.length;j++){
            comb.push(str.substring(i,j));
        }
    }
    return comb;
}
console.log(strCombination("dog"));

//Alphabetical order

function alphabeticalOrder(str){
    return str.split('').sort().join('');
}
console.log(alphabeticalOrder("mad"));

//First letter of each word in a sentence to uppercase
function toUppercaseOfEachWord(sentence){
    return sentence.split(' ').map(word =>{
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
}
console.log(toUppercaseOfEachWord("welcome to antra"));

//Longest word in the sentence

function longestWord(sentence){
    let words = sentence.split(' ');
    let longest = '';
    for(let word of words){
        if(word.length>longest.length){
            longest = word;
        }
    }
    return longest;
}
console.log(longestWord('Welcome to Antra'));

//Number of Vowels within the string

function vowelsCount(sentence){

    const vowels =sentence.match(/[aeiouAEIOU]/g);

    return vowels ? vowels.length :0;
}
console.log(vowelsCount("Welcome to Antra"));

//Prime or not

function isPrime(num){
    if(num<=1) {
        return false;
    }
    if(num<=3){
        return true;
    }
    if(num%2===0||num%3 === 0){
        return false;
    }
    for(let i = 5; i*i <=num;i+=6){
        if(num%i===0 || num%(i+2)===0){
            return false;
        }
    }
    return true;
}
console.log(isPrime(8));

//Type of the argument
function typeOfArg(argument){
    if(argument == null) return null;

    if(Array.isArray(argument)) return 'array';

    return typeof argument;
}
console.log(typeOfArg("Antra"));

// matrix
function identityMatrix(n) {
    let matrix = [];

    for (let i = 0; i < n; i++) {
        let row = [];
        for (let j = 0; j < n; j++) {
            if (i === j) {
                row.push(1);
            } else {
                row.push(0);
            }
        }
        matrix.push(row);
    }

    return matrix;
}
console.log(identityMatrix(3));

//second lowest and largest number in the array
function secondLowestAndLargest(arr) {

    let sortedArr = arr.slice().sort((a, b) => a - b);
    let secondLowest = sortedArr[1];
    let secondGreatest = sortedArr[sortedArr.length - 2];

    return {
        secondLowest: secondLowest,
        secondGreatest: secondGreatest
    };
}
let example = [1, 2, 3, 4, 5];
let result = secondLowestAndLargest(example);
console.log(`Second Lowest is ${result.secondLowest}, Second Greatest is ${result.secondGreatest}`);

//perfect number
function isPerfectNumber(num) {
    if (num <= 0) return false;
    let sum = 0;
    for (let i = 1; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            if (i !== num) sum += i;
            if (i !== 1 && i !== num / i && num / i !== num) sum += num / i; 
    
        }
    }
    return sum === num;
}

console.log(isPerfectNumber(498));  //false
console.log(isPerfectNumber(8128)); //true

//factors of a positive integer
function computeFactors(num) {
    if (num <= 0) throw new Error("Required a positive integer");

    let factors = [];

    for (let i = 1; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            factors.push(i); 
            if (i !== num / i) {
                factors.push(num / i); 
            }
        }
    }

    return factors.sort((a, b) => a - b); 
}

console.log(computeFactors(18)); 

//amount to coins
function amountToCoins(amount, coins) {
    if (amount < 0) throw new Error("Amount must be positive");
    if (!Array.isArray(coins) || coins.some(coin => coin <= 0)) {
        throw new Error("Coins must be an array of positive integers");
    }

    coins.sort((a, b) => b - a);

    let result = [],remainingAmount = amount;

    for (let coin of coins) {
        while (remainingAmount >= coin) {
            result.push(coin);
            remainingAmount -= coin;
        }
    }

    return result;
}

console.log(amountToCoins(46, [25, 10, 5, 2, 1])); // Output: [25, 10, 10, 1]

//Compute power
function computePower() {

    let base = parseFloat(prompt("Enter the base (b):"));
    let exponent = parseInt(prompt("Enter the exponent (n):"), 10);
    if (isNaN(base) || isNaN(exponent)) {
        console.error("Invalid input. Please enter valid numbers.");
        return;
    }
    let result = Math.pow(base, exponent);

    console.log(`${base} raised to the power of ${exponent} is ${result}`);
}
computePower();

//Unique characters from a string

function extractUniqueCharacters(str) {
    let seen = new Set();
    let uniqueChars = '';

    for (let char of str) {
        if (!seen.has(char)) {
            seen.add(char);
            uniqueChars += char;
        }
    }

    return uniqueChars;
}

let sent = "thequickbrownfoxjumpsoverthelazydog";
console.log(extractUniqueCharacters(sent));

//Number of occurences in string
function countLetters(str) {
    const letterCount = {};
    str = str.toLowerCase();
    for (let char of str) {
        if (char.match(/[a-z]/)) {
            if (letterCount[char]) {
                letterCount[char]++;
            } else {
                letterCount[char] = 1;
            }
        }
    }

    return letterCount;
}

const inputString = "Hello World!";
const counts = countLetters(inputString);
console.log(counts);

//Binary Search
function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid;
        }
        if (arr[mid] < target) {
            left = mid + 1; //right half
        } else {
            right = mid - 1; //left half
        }
    }

    return -1;
}

const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15];
const target = 7;
const val = binarySearch(sortedArray, target);

if (val !== -1) {
    console.log(`Target found at index ${val}`);
} else {
    console.log('Target not found');
}

//Larger than a number
function filterLargerThan(arr, num) {
    return arr.filter(element => element > num);
}
const numbers = [1, 5, 8, 12, 20, 25];
const threshold = 10;
const largerValue = filterLargerThan(numbers, threshold);
console.log(largerValue);


const { each } = require('../functionalUtil')

const brackets = {
    '[': function(arrayClose){
        return arrayClose = arrayClose  << 1;
    },
    ']': function(arrayClose){
        return arrayClose = arrayClose  >> 1;
    },
    '{': function(objClose){
        return objClose = objClose  << 1;
    },
    '}': function(objClose){
        return objClose = objClose  >> 1;
    }
}
const closed = 2



const isComma = item => item === ','

const allClosed = (arrayClose, objClose) => (arrayClose<=closed) && (objClose <=closed)

const isStringItemEnd = (singleCharacter, arrayClose, objClose) =>allClosed(arrayClose, objClose) && isComma(singleCharacter)

const updateCloseState = (singleCharacter, arrayClose, objClose) => {
    updatedArrayClose = arrayClose
    updatedObjClose = objClose
    if(brackets[singleCharacter]){
        updatedArrayClose = brackets[singleCharacter](arrayClose)
        updatedObjClose = brackets[singleCharacter](objClose)
    }
    return {updatedArrayClose, updatedObjClose}
}


const splitItem = str => {
    const splitItemList = [] 
    let arrayClose = closed;
    let objClose = closed;
    let splitItem = ''
    
    each(str, function(singleCharacter){
        if(isStringItemEnd(singleCharacter, arrayClose, objClose)){
            splitItemList.push(splitItem)
            splitItem = ''
        }
        else {
            const {updatedArrayClose, updatedObjClose} = updateCloseState(singleCharacter, arrayClose, objClose) 
            arrayClose = updatedArrayClose
            objClose = updatedObjClose
            splitItem += singleCharacter
        }
    })       
    splitItemList.push(splitItem)
    return splitItemList
}

var s1 = "['1a'3',[null,false,['11',112,'99'], {a:'str', b:[912,[5656,33]]}, true]";
var result = splitItem(s1, 'array');

console.log(JSON.stringify(result, null, 2));

module.exports = splitItem
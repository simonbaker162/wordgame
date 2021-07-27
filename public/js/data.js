// const wordArray = [];
const processedWordsArray = (wordList) => {
  return wordList.map((word, index) => {
    return {
      word: word,
      length: word.length,
      id: index + 1
    }
  })
}



// For each word in the game, create an object which has also
// has the word's length and id value



// const processWord = (word, index) => {
//   const wordObject = {
//     word: word,
//     length: word.length,
//     id: index + 1
//   }
//   // wordArray.push(wordObject);
// }


  
// const generateWordObjects = (wordList) => {
//   wordList.forEach(processWords);
// }

// generateWordObjects(wordList);




// const processedWordsArray = (wordList) => {
//   worldList.map((word, index) => {
//     return processWord(word, index)
//   })
// }





export const gameWords = processedWordsArray(wordList);
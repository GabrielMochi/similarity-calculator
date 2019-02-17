const main = (function () {
  const elements = {
    calcForm: document.getElementById('calcForm'),
    wordsInput: document.getElementById('wordsInput'),
    calcButton: document.getElementById('calcButton'),
    similarityResultDiv: document.getElementById('similarityResultDiv')
  }

  elements.wordsInput.oninput = () => {
    elements.calcButton.disabled = textToWords(elements.wordsInput.value).length <= 1
  }

  elements.calcForm.onsubmit = (evt) => {
    evt.preventDefault()

    const words = textToWords(elements.wordsInput.value)
    
    if (words.length >= 2)
      elements.similarityResultDiv.innerText = `${calcSimilarity(...words) * 100}%`
    else
    elements.similarityResultDiv.innerText = ''
  }

  /**
   * @param {string} text
   * @return {Array<string>}
   */
  function textToWords (text) {
    return text
      .split(' ')
      .filter(word => !!word && !word.match(/\s+/g))
  }

  /**
   * @param  {...string} words
   * @return {number}
   */
  function calcSimilarity (...words) {
    debugger
    const totalCharacters = words.reduce((characters, word) => characters + word.length, 0)
    let intersectionCharacters = 0

    for (let i = 0; i < words.length - 1; i++) {
      const firstWord = words[i]

      for (let j = i + 1; j < words.length; j++) {
        const secondWord = words[j]

        for (let k = 0; k < Math.min(firstWord.length, secondWord.length); k++)
          if (firstWord[k] === secondWord[k]) intersectionCharacters++
      }
    }

    return (2 * intersectionCharacters) / ((words.length - 1) * totalCharacters)
  }

  function init () {
    elements.calcButton.disabled = true
  }

  return { init, calcSimilarity }
})()

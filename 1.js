const readline = require('readline')
const rl = readline.createInterface(process.stdin)

const isTransformed = str => {
    const [word1, word2] = str.split(' ')

    if (word1.length !== word2.length) return 0

    if (word1 === word2) return 1

    if (word2.length >= 33) {
        const russianChars = createRussianAlphabet()
        for (let char of word2) {
            if (russianChars.includes(char)) {
                russianChars.splice(russianChars.indexOf(char), 1)
            }
        }
        if (russianChars.length === 0) return 0
    }
    const vocabular = {}
    for (let i = 0; i < word1.length; i += 1) {
        const word1Char = word1[i]
        const word2Char = word2[i]
        if (vocabular[word1Char]) {
            if (vocabular[word1Char] !== word2Char) return 0
        } else {
            vocabular[word1Char] = word2Char
        }
    }
    return 1
}

const createRussianAlphabet = () => {
    const firstChar = 1072
    const lastChar = 1103
    const excludedChar = 1105 // Буква ё
    const chars = {}

    for (let i = firstChar; i <= lastChar; i++) chars.push(String.fromCharCode(i))
    return [...chars, String.fromCharCode(excludedChar)]
}

rl.on('line', line => {
    console.log(String(isTransformed(line)))
    rl.close()
})
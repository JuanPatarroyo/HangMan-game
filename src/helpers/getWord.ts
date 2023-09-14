let words = [ 'COMPUTER', 'BOOK', 'VEHICLE', 'PHOTOGRAPHER', 'DOCTOR', 'CREAM', 'TIMELINE', 'OUTLINE']

export function getRandomWord() {
    let index = Math.floor(Math.random() * words.length);
    return words[index];
}
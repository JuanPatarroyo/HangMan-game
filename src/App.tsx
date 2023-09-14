import { useEffect, useState } from "react";
import "./App.css";
import { HangImage } from "./components/HangImage";
import { getRandomWord } from "./helpers/getWord";
import { letters } from "./helpers/letters";

function App() {
  const [attempts, setAttempts] = useState(0);
  const [word, setWord] = useState(getRandomWord());
  const [hiddenWord, setHiddenWord] = useState("_ ".repeat(word.length));
  const [lose, setLose] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    if (attempts == 9) {
      setLose(true);
    }
  }, [attempts]);

  useEffect(() => {
    const currentHiddenWord = hiddenWord.split(" ").join("");
    if (currentHiddenWord === word) {
      setWon(true);
    }
  }, [hiddenWord]);

  const checkLetter = (letter: string) => {
    if(lose || won) return;

    if (!word.includes(letter)) {
      setAttempts(Math.min(attempts + 1, 9));
      return;
    }

    const hiddenWordArray = hiddenWord.split(" ");

    for (let index = 0; index < word.length; index++) {
      if (letter === word[index]) {
        hiddenWordArray[index] = letter;
      }
      setHiddenWord(hiddenWordArray.join(" "));
    }
  };

  const newGame = () =>{
    let randomWord = getRandomWord();
    setWord(randomWord);
    setHiddenWord('_ '.repeat(randomWord.length));
    setAttempts(0);
    setLose(false);
    setWon(false);
  }

  return (
    <div className="App">
      {<HangImage imageNumber={attempts} />}
      <h3>{hiddenWord}</h3>
      <h3>Attempts: {attempts}</h3>

      {lose ? <h2>You lose. The word was {word}</h2> : ""}

      {won ? <h2>¡You win!</h2> : ""}

      {letters.map((letter) => (
        <button onClick={() => checkLetter(letter)} key={letter}>
          {letter}
        </button>
      ))}
      <div id="divButton">
        <button onClick={ newGame }>New Game?</button>
      </div>
    </div>
  );
}

export default App;

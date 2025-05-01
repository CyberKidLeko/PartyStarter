import React, { useState } from 'react';
import { FaArrowLeft, FaGlassCheers } from 'react-icons/fa';
import './App.css';

const gameModes = {
  friends: [
    "Drink if you've ever laughed so hard you peed a little.",
    "The last person to touch their nose drinks.",
    "Drink if you've ever sent a risky text while drunk.",
    "Whoever has the longest hair drinks.",
    "Drink if you still don't understand how taxes work.",
    "Send your ex a 'you up' message or drink.",
    "Add your exes in a group chat and ask what went wrong, or take 4 shots",
    "Let the group go through your browser history or take a shot.",
    "WATERFALLLLLLL!!!!!",
    "Person with the most social media followers picks someone to drink",
    "Last person to check their phone drinks",
    "Everyone who's wearing jeans drinks"
  ],
  adults: [
    "Take a shot if you've ever lied about your age to get into a club.",
    "The person wearing the least clothes drinks.",
    "Whisper something dirty to the person on your right.",
    "Drink if you've ever been kicked out of a bar.",
    "Whoever has the most unread messages drinks.",
    "The last person to say 'cheers' drinks.",
    "Drink if you've ever hooked up with someone you met at a bar.",
    "Last person to take a selfie drinks",
    "Take a shot if you've ever had a one-night stand",
    "Person with the most tattoos chooses someone to drink"
  ],
  couples: [
    "Kiss your partner or take two shots.",
    "Take a drink if you've ever sent a spicy text.",
    "Whisper something naughty to your partner, or both take a drink.",
    "Whoever made the first move in your relationship drinks.",
    "Moan for 20 seconds or drink",
    "Kiss your 3 favourite parts on your partner's body.",
    "Say one thing that will get your partner flustered.",
    "Do I taste good? (Ask your partner)",
    "Dry hump for 90 seconds or drink.",
    "Take a shot if you've ever faked being asleep to avoid intimacy.",
    "Let me go through your search history or drink.",
    "Do a strip tease or drink.",
    "Take off your clothes for the rest of the game or drink.",
    "Touch yourself for 60 seconds or drink.",
    "Lick any liquid off my body, neck to... uh... you know.",
    "Turn me on without touching me or drink.",
    "Let me play with your private part for 30 seconds or drink.",
    "Spell a word on my body using your tongue."
  ]
};

const modeColors = {
  friends: "#4CAF50",
  adults: "#FF5722",
  couples: "#E91E63"
};

const modeTitles = {
  friends: "Friends Mode",
  adults: "18+ Friends Mode",
  couples: "Couples Mode"
};

function App() {
  const [screen, setScreen] = useState('intro');
  const [selectedMode, setSelectedMode] = useState(null);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [usedPrompts, setUsedPrompts] = useState([]);
  const [availablePrompts, setAvailablePrompts] = useState([]);

  const selectMode = (mode) => {
    setSelectedMode(mode);
    setAvailablePrompts([...gameModes[mode]]);
    setUsedPrompts([]);
    setScreen('game');
  };

  const getNextPrompt = () => {
    if (availablePrompts.length === 0) {
      setCurrentPrompt("No more prompts! Restart to play again.");
      return;
    }

    const randomIndex = Math.floor(Math.random() * availablePrompts.length);
    const nextPrompt = availablePrompts[randomIndex];
    
    setCurrentPrompt(nextPrompt);
    setUsedPrompts([...usedPrompts, nextPrompt]);
    setAvailablePrompts(availablePrompts.filter((_, i) => i !== randomIndex));
  };

  const restartGame = () => {
    setAvailablePrompts([...gameModes[selectedMode]]);
    setUsedPrompts([]);
    getNextPrompt();
  };

  return (
    <div className="app">
      {screen === 'intro' && (
        <div className="screen intro-screen">
          <h1><FaGlassCheers /> Drinking Game</h1>
          <p>Select a mode to start playing!</p>
          <button className="start-btn" onClick={() => setScreen('mode-select')}>
            Start Game
          </button>
        </div>
      )}

      {screen === 'mode-select' && (
        <div className="screen mode-selection">
          <h2>Choose Your Mode</h2>
          <div className="mode-buttons">
            <button 
              className="mode-btn friends" 
              onClick={() => selectMode('friends')}
            >
              Friends
            </button>
            <button 
              className="mode-btn adults" 
              onClick={() => selectMode('adults')}
            >
              18+ Friends
            </button>
            <button 
              className="mode-btn couples" 
              onClick={() => selectMode('couples')}
            >
              Couples
            </button>
          </div>
        </div>
      )}

      {screen === 'game' && (
        <div 
          className="screen game-screen" 
          style={{ backgroundColor: modeColors[selectedMode] }}
        >
          <div className="game-header">
            <button className="back-btn" onClick={() => setScreen('mode-select')}>
              <FaArrowLeft /> Back
            </button>
            <h2 className="game-title">{modeTitles[selectedMode]}</h2>
          </div>
          
          <div className="prompt-card">
            <div className="prompt-text">
              {currentPrompt || "Click Next to start!"}
            </div>
          </div>
          
          <div className="game-controls">
            {availablePrompts.length > 0 ? (
              <button className="next-btn" onClick={getNextPrompt}>
                Next Prompt
              </button>
            ) : (
              <button className="restart-btn" onClick={restartGame}>
                Restart Game
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
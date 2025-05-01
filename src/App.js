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
    "Everyone who's wearing jeans drinks",
    "Take a drink if you've ever stalked someone's profile for over 30 minutes.",
    "Group vote: Who's most likely to ghost someone? That person drinks.",
    "Drink if you've ever had a crush on someone in this room.",
    "Everyone guess how many people you've kissed. Closest guess drinks.",
    "First person to name five sex positions avoids drinking. Everyone else, bottoms up.",
    "Show the last photo you took or take 2 drinks.",
    "Act out your drunk alter ego. Best performance picks someone to drink.",
    "Reveal your screen time for today. Highest = 2 drinks.",
    "What's your toxic trait? Say it or drink.",
    "Drink if you've cried during a movie in the last month.",
    "Everyone do their best fake laugh. Worst one drinks.",
    "Pull up your IG DMs and read the most unhinged message you've received or drink."
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
    "Person with the most tattoos chooses someone to drink",
    "What’s your biggest red flag? Be honest or drink.",
    "Pretend you're sexting. One sentence only. Best one picks someone to drink.",
    "Drink if you've ever had sex in a public place.",
    "Do your most seductive voice saying 'I want you' — or drink.",
    "Whoever has the most unread emails drinks twice.",
    "Last person to show a hickey drinks.",
    "Send a random emoji to your situationship or ex — or take 2 drinks.",
    "Google 'naughty synonym for ___' — fill the blank with the word the group picks — or drink.",
    "Imitate porn acting for 10 seconds or drink.",
    "Do a sexy dance for someone across the room or finish your drink.",
    "What's your wildest drunk story? Tell or sip 3 times.",
    "Tell the group your 'walk of shame' story — or shamefully drink instead."
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
    "Spell a word on my body using your tongue.",
    "Make eye contact and say your dirtiest thought right now — or drink.",
    "Swap clothes with your partner (or parts of them) or drink.",
    "Take turns undressing each other (1 item only) or drink.",
    "Say the last time your partner turned you on. Be specific, or drink.",
    "Lick your partner somewhere random, blindfolded.",
    "Roleplay a fantasy for 60 seconds or drink.",
    "Use only your mouth to 'move' an ice cube from their neck to their stomach.",
    "Whisper in their ear what you want to do to them after this game. Or... drink.",
    "One of you moans your partner's name. Best moan wins. Loser drinks.",
    "Describe in vivid detail your partner’s best physical feature.",
    "Let your partner draw something on your chest with their finger or tongue.",
    "Take your partner’s hand and show them how you like to be touched. Or drink.",
    "Act out a scene from your favorite spicy movie — or finish your drink.",
    "Show everyone the last spicy pic you sent to your partner — or drink."
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
              We're all adults here
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
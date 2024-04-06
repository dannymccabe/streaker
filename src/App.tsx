import { useState } from 'react';
import './App.css';

function App() {
  const [colour, setColour] = useState<string | undefined>();

  const onclick = async () => {
    const [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript<string[], void>({
      target: { tabId: tab.id! },
      args: [colour as string],
      func: (colour) => {
        document.body.style.backgroundColor = colour;
      },
    });
  };

  return (
    <>
      <h1>Colour Picker</h1>
      <div className="card">
        <input
          type="color"
          name=""
          id=""
          onChange={(e) => setColour(e.currentTarget.value)}
          value={colour || ''}
        />
        <button onClick={() => onclick()}>Click</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  );
}

export default App;

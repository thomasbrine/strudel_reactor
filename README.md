# Strudel Reactor

A React-based web application for the Strudel.cc live-coding music platform.

## Video Demonstration

TODO: include video link

## Features

### Content View

**View Toggle**: Switch between the Code Preprocessor, Strudel REPL, and D3 Visualiser

- **Code Preprocesser**:
  - Edit the raw strudel code
  - Placeholders like '{instrument_effects}' are automatically replaced with the corresponding effects configured in the Instrument Controls
- **Strudel REPL**:
  - View the final processed strudel code
  - Automatically evaluates and updates the audio in real-time when any changes are made to the code, tempo, or effects
- **D3 Visualiser**
  - Real-time graph of effect values from the playing audio
  - Includes a dropdown menu to select which instrument and effect to visualize

### Master Audio Controls

- **Play/Stop Buttons**: Start and stop the Strudel audio
- **Tempo Control**: Adjust the CPM (Cycles Per Minute) in real-time

### Instrument Controls

- **Add/Remove Instrument Mixer Channels**: Dynamically create or delete instrument channels
- **Enable/Disable**: Each instrument has a checkbox to mute/unmute it
- **Instrument Naming**: Click an instrument name to rename it
- **Expandable Panels**: Click to collapse/expand instrument panels, which reveals the controls for effects:
  - **Add/Remove Effects**: Add multiple effects to each instrument
  - **Effect Controls**: Each effect has a slider and typable value
- **Help Section**: A help section is available, toggleable by clicking the '?' icon. The help information has also been pasted below:
  - Instrument names must match those in your code, e.g. <code>drums</code>.
  - Effect names must match effects available in the Strudel syntax, e.g. <code>gain</code>.
    You can see which effects are available <a href="https://strudel.cc/learn/effects/">here</a>.
  - Add placeholders for effects at the end of each instrument in the pre-processor code, using syntax:
    <code>{'{instrumentname_effects}'}</code>. e.g. <code>{'{drums_effects}'}</code>

### JSON Save/Load

- **Save Project**: Stores the entire project (code, tempo, all instrument settings) to browser local storage in json format
- **Load Projet**: Restores the last saved project state from browser local storage, and parses the json format

## Installation & Setup

1. Clone the repository
2. Install dependencies:
   `npm install`
3. Start the development server:
   `npm start`
4. Open http://localhost:3000 in your browser

## Song Attribution

Algorave Dave: www.youtube.com/watch?v=ZCcpWzhekEY

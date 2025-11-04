# Strudel Reactor

A React-based web application for the Strudel.cc live-coding music platform. 

## Video Demonstration
TODO: include video link

## Features

### Master Audio Controls
- **Play/Stop Buttons**: Start and stop the Strudel audio
- **Tempo Control**: Adjust the CPM (Cycles Per Minute)
- **View Toggle**: Switch between Preprocessor (raw code) and REPL (processed strudel code)

### Instrument Mixer
- **Add/Remove Instruments**: Dynamically create instrument channels
- **Enable/Disable**: Each instrument has a checkbox to mute/unmute it
- **Instrument Naming**: Click an instrument name to rename it
- **Expandable Panels**: Click to collapse/expand instrument panels
   - **Add/Remove Effects**: Add multiple effects to each instrument
   - **Effect Controls**: Each effect has a slider and typable value

### Code Preprocessor
- Edit the raw Strudel code with preprocessing placeholders
- Placeholders like `{instrument_effects}` are automatically replaced with effects

### D3 Visualizer
- Real-time graph of effect values from the playing audio
- Dropdown menu to select which instrument and effect to visualize

### JSON Save/Load
- **Save**: Stores the entire project (code, tempo, all instrument settings) to browser local storage in json format
- **Load**: Restores the last saved project state from browser local storage, and parses the json format

## Controls Documentation

TODO: list all controls, their file/component location, and what they do?

## Installation & Setup

1. Clone the repository
2. Install dependencies:
     `npm install`
3. Start the development server:
   `npm start`
4. Open http://localhost:3000 in your browser

## Song Attribution

TODO

## Project Structure

TODO: is this needed?
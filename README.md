# Kanban Board

A simple Kanban-style task management board built with **HTML**, **CSS** and **JavaScript**.  
The app loads three lists (To Do, In Progress, Done) using the TaskBoard API and lets the user add new tasks.

*This project was created as part of the Frontend assignment for the **DevReady Bootcamp**.*

## Features

- **Fetch board on page load**  
  The app loads the board and displays all three lists and their tasks using `GET /boards`.

- **Add new task to a list**  
  Each column has a small form. When the user types a title and clicks “Add”, a new task is created through `POST /lists/:listId/tasks` and the board refreshes automatically.

## How to Run the Project

1. Download or clone the repository:
   ```bash
   git clone https://github.com/mariabalafouti/DevReady-Kanban-Board.git

2. Open the project folder.

3. Open the file **index.html** in any browser (or use VS Code + Live Server for auto-refresh).

4. Make sure you are connected to the internet because the app uses the online TaskBoard API.

##  Known Limitations

- Tasks do not include descriptions in the UI (only title is used).
- Tasks cannot be moved between lists yet (`PATCH /tasks/:taskId` not implemented).
- There is no drag & drop and delete task functionality yet.

## Tech Stack

- **HTML5**
- **CSS3**
- **Vanilla JavaScript**
- **TaskBoard API** (provided by the assignment)

No frameworks (React, Vue) were used. Everything is built manually.

## Project Structure

- `index.html` → Main HTML page  
- `style.css` → All styling (layout, colors, UI)  
- `script.js` → JavaScript logic (API calls + rendering)

## Author

**Maria Balafouti**




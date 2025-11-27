console.log("Script loaded");

const todoColumn = document.getElementById("todo-column");
const inProgressColumn = document.getElementById("inprogress-column");
const doneColumn = document.getElementById("done-column");

console.log("Found columns:", todoColumn, inProgressColumn, doneColumn);

const BASE_URL = "https://fwpznxhkrtlglmuqrgwa.supabase.co/functions/v1/app";
const SANDBOX_ID = "maria-dev";

const addInProgressBtn = document.getElementById("add-inprogress-btn");
const addDoneBtn = document.getElementById("add-done-btn");
const addTodoBtn = document.getElementById("add-todo-btn");

addTodoBtn.addEventListener("click", createTaskInTodo);
addInProgressBtn.addEventListener("click", createTaskInInProgress);
addDoneBtn.addEventListener("click", createTaskInDone);


async function loadBoards() 
{
  try 
  {
    const response = await fetch(`${BASE_URL}/boards`, 
    {
      headers: 
      {
        "X-Sandbox-Id": SANDBOX_ID
      }
    });

    if (!response.ok) 
    {
      console.error("Failed to fetch boards. Status:", response.status);
      return;
    }

    const boards = await response.json();

    console.log("Boards from API:", boards);
    renderBoard(boards[0]);

    boards[0].lists.forEach(list => {
        console.log("List:", list.name, "ID:", list.id);
    });

  } catch (error) 
  {
    console.error("Error while fetching boards:", error);
  }
}

loadBoards();

function renderBoard(board) 
{
  const todoTasks = document.querySelector("#todo-column .tasks");
  const inProgressTasks = document.querySelector("#inprogress-column .tasks");
  const doneTasks = document.querySelector("#done-column .tasks");

  todoTasks.innerHTML = "";
  inProgressTasks.innerHTML = "";
  doneTasks.innerHTML = "";

  board.lists.forEach(list => 
  {
    if (list.name === "To Do") 
    {
      list.tasks.forEach(task => 
      {
        todoTasks.innerHTML += `<p>${task.title}</p>`;
      });
    }

    if (list.name === "In Progress") 
    {
      list.tasks.forEach(task => 
      {
        inProgressTasks.innerHTML += `<p>${task.title}</p>`;
      });
    }

    if (list.name === "Done") 
    {
      list.tasks.forEach(task => 
      {
        doneTasks.innerHTML += `<p>${task.title}</p>`;
      });
    }
  });
}

async function createTaskInTodo() 
{
  const listId = "3aa2a9d3-2196-41a5-a944-714bc7d0a6f3"; // To Do list ID

  const title = prompt("Enter task title:");
  if (!title) return;

  try {
    const response = await fetch(`${BASE_URL}/lists/${listId}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Sandbox-Id": SANDBOX_ID
      },
      body: JSON.stringify({
        title: title,
        description: ""
      })
    });

    if (!response.ok) 
    {
      console.error("Failed to create task. Status:", response.status);
      return;
    }

    console.log("Task created!");

    loadBoards();

  } catch (error) 
  {
    console.error("Error creating task:", error);
  }
}

async function createTaskInInProgress() 
{
  const listId = "c88e808a-666d-4362-ae56-e3b80b401927"; // In Progress list ID

  const title = prompt("Enter task title:");
  if (!title) return;

  try {
    const response = await fetch(`${BASE_URL}/lists/${listId}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Sandbox-Id": SANDBOX_ID
      },
      body: JSON.stringify({
        title: title,
        description: ""
      })
    });

    if (!response.ok) 
    {
      console.error("Failed to create task. Status:", response.status);
      return;
    }

    console.log("Task created in In Progress!");
    loadBoards();

  } catch (error) 
  {
    console.error("Error creating task in In Progress:", error);
  }
}

async function createTaskInDone() 
{
  const listId = "44a9ee33-61a5-4349-80e5-d5caf82d79f1"; // Done list ID

  const title = prompt("Enter task title:");
  if (!title) return;

  try {
    const response = await fetch(`${BASE_URL}/lists/${listId}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Sandbox-Id": SANDBOX_ID
      },
      body: JSON.stringify({
        title: title,
        description: ""
      })
    });

    if (!response.ok) 
    {
      console.error("Failed to create task. Status:", response.status);
      return;
    }

    console.log("Task created in Done!");
    loadBoards();

  } catch (error) 
  {
    console.error("Error creating task in Done:", error);
  }
}

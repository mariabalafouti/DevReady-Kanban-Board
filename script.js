console.log("Script loaded");

const todoColumn = document.getElementById("todo-column");
const inProgressColumn = document.getElementById("inprogress-column");
const doneColumn = document.getElementById("done-column");

const BASE_URL = "https://fwpznxhkrtlglmuqrgwa.supabase.co/functions/v1/app";
const SANDBOX_ID = "maria-dev";

const todoForm = document.getElementById("todo-form");
const todoTitleInput = document.getElementById("todo-title-input");

const inprogressForm = document.getElementById("inprogress-form");
const inprogressTitleInput = document.getElementById("inprogress-title-input");

const doneForm = document.getElementById("done-form");
const doneTitleInput = document.getElementById("done-title-input");

todoForm.addEventListener("submit", function (event) 
{
  event.preventDefault(); 

  const title = todoTitleInput.value.trim();
  if (!title) return;

  createTaskInTodo(title);
  todoTitleInput.value = "";
});

inprogressForm.addEventListener("submit", function (event) 
{
  event.preventDefault();

  const title = inprogressTitleInput.value.trim();
  if (!title) return;

  createTaskInInProgress(title);
  inprogressTitleInput.value = "";
});

doneForm.addEventListener("submit", function (event) 
{
  event.preventDefault();

  const title = doneTitleInput.value.trim();
  if (!title) return;

  createTaskInDone(title);
  doneTitleInput.value = "";
});


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

async function createTaskInTodo(title) 
{
  const listId = "3aa2a9d3-2196-41a5-a944-714bc7d0a6f3"; 
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

    console.log("Task created in To Do!");

    loadBoards();

  } catch (error) 
  {
    console.error("Error creating task in To Do:", error);
  }
}


async function createTaskInInProgress(title) 
{
  const listId = "c88e808a-666d-4362-ae56-e3b80b401927"; 
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
      console.error("Failed to create task in In Progress. Status:", response.status);
      return;
    }

    console.log("Task created in In Progress!");
    loadBoards();

  } catch (error) 
  {
    console.error("Error creating task in In Progress:", error);
  }
}

async function createTaskInDone(title) 
{
  const listId = "44a9ee33-61a5-4349-80e5-d5caf82d79f1"; // Done list ID

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
      console.error("Failed to create task in Done. Status:", response.status);
      return;
    }

    console.log("Task created in Done!");
    loadBoards();

  } catch (error) 
  {
    console.error("Error creating task in Done:", error);
  }
}

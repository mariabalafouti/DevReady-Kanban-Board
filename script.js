console.log("Script loaded");

const todoColumn = document.getElementById("todo-column");
const inProgressColumn = document.getElementById("inprogress-column");
const doneColumn = document.getElementById("done-column");

console.log("Found columns:", todoColumn, inProgressColumn, doneColumn);

const BASE_URL = "https://fwpznxhkrtlglmuqrgwa.supabase.co/functions/v1/app";
const SANDBOX_ID = "maria-dev";

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

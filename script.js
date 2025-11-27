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

  } catch (error) 
  {
    console.error("Error while fetching boards:", error);
  }
}

loadBoards();
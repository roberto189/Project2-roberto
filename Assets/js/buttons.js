
const homeButton = document.querySelector("#homeButton");
const listButton = document.querySelector("#listButton");

listBtn.addEventListener("click", async () => {
    const response = await fetch("/api/farmers/logout", {
      method: "DELETE",
    })
    console.log(response)
  })
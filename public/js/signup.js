const form = document.querySelector("#login-form");
const userType = document.querySelector("#user-type");

const signup = async (e) => {
  // check if Retailer or customer
  e.preventDefault();
  // Retailer signup
  if (userType.checked) {
    const response = await fetch("/api/Retailers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: document.querySelector("#username-input").value,
        password: document.querySelector("#password-input").value,
      }),
    });
    if (response.status === 200) {
      window.location.assign("/dashboard")
    } else {
      alert("wrong credentials buddy")
    }
  // customer signup
  } else {
    const response = await fetch("/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: document.querySelector("#username-input").value,
        password: document.querySelector("#password-input").value,
      }),
    });
    if (response.status === 200) {
      window.location.assign("/dashboard")
    } else {
      alert("wrong credentials buddy")
    }
  }
};

form.addEventListener("submit", signup);

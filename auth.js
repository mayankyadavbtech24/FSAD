
let users = JSON.parse(localStorage.getItem("users")) || [];


function register() {
    const username = document.getElementById("regUser").value.trim();
    const password = document.getElementById("regPass").value.trim();

    if (!username || !password) {
        alert("Please fill all fields");
        return;
    }

  
    let exists = users.find(user => user.username === username);
    if (exists) {
        alert("Username already exists");
        return;
    }

  
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");
    window.location.href = "login.html";
}


function login() {
    const username = document.getElementById("loginUser").value.trim();
    const password = document.getElementById("loginPass").value.trim();

    if (!username || !password) {
        alert("Please fill all fields");
        return;
    }

   
    let user = users.find(
        u => u.username === username && u.password === password
    );

    if (user) {
        localStorage.setItem("loggedInUser", username);
        window.location.href = "index.html";
    } else {
        alert("Invalid username or password");
    }
}


function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}
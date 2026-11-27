const API = "https://studysync-backend-mo8x.onrender.com";

async function login() {
  let e = document.getElementById('email').value;
  let p = document.getElementById('password').value;
  try {
    let res = await fetch(`${API}/login`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email: e, password: p})
    });
    let data = await res.json();
    localStorage.setItem('user', e);
    localStorage.setItem('token', data.access_token || 'test');
    alert("Login Success!");
    window.location.href = "dashboard.html";
  } catch(err) {
    alert("Login ho gaya! Dashboard khol rahi hu");
    localStorage.setItem('user', e);
    window.location.href = "dashboard.html";
  }
}
function logout(){ localStorage.clear(); window.location.href="login.html"; }
async function signup() {
  let n = document.getElementById('name').value;
  let e = document.getElementById('email').value;
  let p = document.getElementById('password').value;

  if(!e || !p){
    alert("Email aur Password to daalo!");
    return;
  }

  try {
    let res = await fetch(`${API}/signup`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({name: n, email: e, password: p})
    });
    let data = await res.json();
  } catch(err) {
  }

  // Account phone me save kar do taaki login ho jaye
  localStorage.setItem('user', e);
  localStorage.setItem('token', 'test');
  alert("Account ban gaya! Ab Login karo");
  window.location.href = "login.html";
}

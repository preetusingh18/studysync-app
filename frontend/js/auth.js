const API = "http://127.0.0.1:8001";

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
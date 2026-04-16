const API_KEY="7188501328754d209708c0b82f72f7fe";
const url="https://newsapi.org/v2/everything?q=";


window.addEventListener("load", () => fetchNews("india"));

async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();

  bindData(data.articles);
}


function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const template = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach(article => {
        if (!article.urlToImage) return;

        const cardClone = template.content.cloneNode(true);

        fillDataInCard(cardClone, article);

        // ✅ CLICK EVENT ADD HERE
        const card = cardClone.querySelector(".card");
        card.addEventListener("click", () => {
            window.open(article.url, "_blank");
        });

        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-image");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsDesc = cardClone.querySelector("#news-desc");

  newsImg.src = article.urlToImage || "https://dummyimage.com/400x200/cccccc/000000&text=No+Image";
  newsTitle.innerText = article.title;
  newsDesc.innerText = article.description;
}


function searchNews() {
  const query = document.getElementById("search-input").value;
  if (!query) return;
  fetchNews(query);
}
// PAGE LOAD CHECK
window.addEventListener("load", () => {
    const isLoggedIn = localStorage.getItem("loggedIn");

    if (isLoggedIn === "true") {
        showApp();
    } else {
        showLogin();
    }
});

// SHOW LOGIN
function showLogin() {
    document.getElementById("login-container").style.display = "block";
    document.getElementById("signup-container").style.display = "none";
    hideApp();
}

// SHOW SIGNUP
function showSignup() {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("signup-container").style.display = "block";
}

// SIGNUP FUNCTION
function signup() {
    const user = document.getElementById("signup-username").value;
    const pass = document.getElementById("signup-password").value;

    if (!user || !pass) {
        alert("Fill all fields");
        return;
    }

    const userData = {
        username: user,
        password: pass
    };

    localStorage.setItem("user", JSON.stringify(userData));

    alert("Signup successful! Now login.");
    showLogin();
}

// LOGIN FUNCTION
function login() {
    const user = document.getElementById("login-username").value;
    const pass = document.getElementById("login-password").value;

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
        storedUser &&
        user === storedUser.username &&
        pass === storedUser.password
    ) {
        localStorage.setItem("loggedIn", "true");
        showApp();
    } else {
        alert("Wrong username or password");
    }
}

// SHOW APP (news website)
function showApp() {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("signup-container").style.display = "none";

    document.querySelector(".nav").style.display = "flex";
    document.getElementById("cards-container").style.display = "grid";
}

// HIDE APP
function hideApp() {
    document.querySelector(".nav").style.display = "none";
    document.getElementById("cards-container").style.display = "none";
}

// LOGOUT
function logout() {
    localStorage.removeItem("loggedIn");
    location.reload();
}
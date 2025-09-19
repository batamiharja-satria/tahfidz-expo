function sayHello() {
  alert("✅ JS jalan di WebView!");
}

// kasih ke window biar bisa dipanggil inline HTML
window.sayHello = sayHello;

document.getElementById("title").style.color = "green";
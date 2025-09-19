
alert("✅ index.js loaded!");

function sayHello() {
  alert("✅ JS jalan di WebView!");
}

// kasih ke window biar bisa dipanggil inline HTML
window.sayHello = sayHello;

// test biar kelihatan kalau JS ke-load
document.getElementById("title").style.color = "green";

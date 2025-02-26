document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        document.querySelector(".loader").style.display = "none";
        document.querySelector(".hid").style.display = "block";
    }, 6000);
});
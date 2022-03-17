// Responsive menu
document.addEventListener('DOMContentLoaded', function (event) {
    const navmodal = document.getElementById("navmodal");
    const openmenu = document.getElementById("openmenu");
    const closemenu = document.getElementById("closemenu");

    // Open menu and Make Main Fixed Position
    openmenu.addEventListener("click", function () {
        navmodal.classList.add("active");
    });

    // Close menu and Remove Main Fixed Position
    closemenu.addEventListener("click", function () {
        navmodal.classList.remove("active");
    });
});
/*document.addEventListener('DOMContentLoaded', function (event) {
    const example = document.getElementById("example");

    example.addEventListener("change", () => {
        document.body.classList.toggle('dark');
    });
});*/



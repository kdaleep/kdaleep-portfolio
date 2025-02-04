document.addEventListener("DOMContentLoaded", function () {
    const menu = document.getElementById("mobile-menu");
    const openButton = document.getElementById("open-menu");
    const closeButton = document.getElementById("close-menu");
    const menuLinks = document.querySelectorAll("#mobile-menu a"); // Select all menu links

    // Open Menu
    openButton.addEventListener("click", function () {
        menu.classList.remove("hidden");
    });

    // Close Menu
    closeButton.addEventListener("click", function () {
        menu.classList.add("hidden");
    });

    // Close Menu and Scroll Smoothly on Link Click
    menuLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            const targetId = link.getAttribute("href").substring(1); // Extract target ID from href
            const targetElement = document.getElementById(targetId); // Get target element

            // Scroll to the target element smoothly
            targetElement.scrollIntoView({ behavior: "smooth" });

            // Close the menu
            menu.classList.add("hidden");
        });
    });
});

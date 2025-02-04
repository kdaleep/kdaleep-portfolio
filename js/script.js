        document.addEventListener("DOMContentLoaded", function () {
            const menu = document.getElementById("mobile-menu");
            const openButton = document.getElementById("open-menu");
            const closeButton = document.getElementById("close-menu");

            openButton.addEventListener("click", function () {
                menu.classList.remove("hidden"); // Show the menu
            });

            closeButton.addEventListener("click", function () {
                menu.classList.add("hidden"); // Hide the menu
            });
        });
        
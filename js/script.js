// ==========================================
// MASTA'S PLACE - PART 3 JAVASCRIPT
// ==========================================


// ==========================================
// ENQUIRY FORM VALIDATION
// ==========================================

const enquiryForm = document.getElementById("enquiryForm");

if (enquiryForm) {

    enquiryForm.addEventListener("submit", function(event) {

        event.preventDefault();

        let valid = true;

        // Get form values
        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const room = document.getElementById("room").value;
        const checkIn = document.getElementById("checkIn").value;
        const checkOut = document.getElementById("checkOut").value;
        const guests = document.getElementById("guests").value;
        const message = document.getElementById("message").value.trim();

        // Clear previous errors
        document.querySelectorAll(".error").forEach(function(error) {
            error.textContent = "";
        });

        document.getElementById("enquiryResponse").textContent = "";


        // Full name
        if (fullName.length < 2) {
            document.getElementById("fullNameError").textContent =
                "Please enter your full name.";
            valid = false;
        }


        // Email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            document.getElementById("emailError").textContent =
                "Please enter a valid email address.";
            valid = false;
        }


        // Phone
        const phonePattern = /^[0-9+ ()-]{7,20}$/;

        if (!phonePattern.test(phone)) {
            document.getElementById("phoneError").textContent =
                "Please enter a valid phone number.";
            valid = false;
        }


        // Room
        if (room === "") {
            document.getElementById("roomError").textContent =
                "Please select a room.";
            valid = false;
        }


        // Check-in
        if (checkIn === "") {
            document.getElementById("checkInError").textContent =
                "Please select a check-in date.";
            valid = false;
        }


        // Check-out
        if (checkOut === "") {
            document.getElementById("checkOutError").textContent =
                "Please select a check-out date.";
            valid = false;
        }


        // Check dates
        if (checkIn !== "" && checkOut !== "") {

            const startDate = new Date(checkIn);
            const endDate = new Date(checkOut);

            if (endDate <= startDate) {

                document.getElementById("checkOutError").textContent =
                    "Check-out date must be after the check-in date.";

                valid = false;
            }
        }


        // Guests
        if (guests === "" || guests < 1 || guests > 10) {

            document.getElementById("guestsError").textContent =
                "Please enter between 1 and 10 guests.";

            valid = false;
        }


        // Message
        if (message.length < 10) {

            document.getElementById("messageError").textContent =
                "Please enter at least 10 characters.";

            valid = false;
        }


        // Successful submission
        if (valid) {

            const response =
                document.getElementById("enquiryResponse");

            response.innerHTML = `
                <h3>Enquiry Received!</h3>
                <p>
                    Thank you, ${fullName}.
                    Your enquiry for the ${room} has been received.
                </p>
                <p>
                    We will contact you using the email address
                    you provided.
                </p>
            `;

            enquiryForm.reset();
        }

    });

}

// ==========================================
// GALLERY LIGHTBOX
// ==========================================

const galleryImages = document.querySelectorAll(".gallery img");

if (galleryImages.length > 0) {

    const lightbox = document.createElement("div");

    lightbox.className = "lightbox";

    lightbox.innerHTML = `
        <button class="lightbox-close" aria-label="Close image">
            &times;
        </button>

        <img src="" alt="Expanded gallery image">
    `;

    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector("img");
    const closeButton = lightbox.querySelector(".lightbox-close");


    galleryImages.forEach(function(image) {

        image.addEventListener("click", function() {

            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;

            lightbox.classList.add("active");

        });

    });


    closeButton.addEventListener("click", function() {

        lightbox.classList.remove("active");

    });


    lightbox.addEventListener("click", function(event) {

        if (event.target === lightbox) {
            lightbox.classList.remove("active");
        }

    });


    document.addEventListener("keydown", function(event) {

        if (event.key === "Escape") {
            lightbox.classList.remove("active");
        }

    });

}

// ==========================================
// ROOM SEARCH
// ==========================================

const roomSearch = document.getElementById("roomSearch");

if (roomSearch) {

    roomSearch.addEventListener("input", function() {

        const searchTerm =
            roomSearch.value.toLowerCase();

        const rooms =
            document.querySelectorAll(".room-card");

        rooms.forEach(function(room) {

            const roomText =
                room.textContent.toLowerCase();

            if (roomText.includes(searchTerm)) {
                room.style.display = "";
            } else {
                room.style.display = "none";
            }

        });

    });

}

// ==========================================
// INTERACTIVE MAP
// ==========================================


    const map = L.map("map").setView(
        [-26.2041, 28.0473],
        12
    );

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution:
                '&copy; OpenStreetMap contributors'
        }
    ).addTo(map);

    L.marker([-26.2041, 28.0473])
        .addTo(map)
        .bindPopup("<strong>MASTA's Place</strong><br>Johannesburg, South Africa")
        .openPopup();
console.log("map working")
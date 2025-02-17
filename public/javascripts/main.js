document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("urlForm");
    const inputURL = document.getElementById("inputURL");
    const shortUrlResult = document.getElementById("shortUrlResult");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); 

        const url = inputURL.value.trim();
        if (!url) return alert("Please enter a valid URL.");

        try {
            const response = await fetch("/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ inputURL: url }),
            });

            const data = await response.json();
            if (response.ok) {
                shortUrlResult.innerHTML = `
                    <p class="url-result">
                        Short URL: <a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a>
                    </p>`;
                inputURL.value = ""; 
            } else {
                alert("Error: " + data.message);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to shorten URL. Please try again.");
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("generator");
  const outputDiv = document.querySelector(".generated");
  const submitButton = form.querySelector(".search-button");
  const inputField = form.querySelector(".search-field");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const userInput = inputField.value.trim();
    const prompt = userInput || "Tell me a short and funny joke.";
    const context = "The joke should be appropriate for all ages.";
    const key = "2dtdb4c6b36b2bd5c58d04bf0o41ae00";

    submitButton.disabled = true;
    submitButton.value = "Loading...";

    // Show blinking thinking message with lightbulb
    outputDiv.innerHTML = `<span class="blink">💡 Thinking of a joke...</span>`;

    try {
      const response = await fetch(
        `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(
          prompt
        )}&context=${encodeURIComponent(context)}&key=${key}`
      );
      const data = await response.json();
      const answer = data.answer || "No joke returned.";

      typeOutText(outputDiv, answer);
      inputField.value = ""; // Clear input field
    } catch (error) {
      outputDiv.innerText = "Oops! Couldn't fetch a joke.";
      console.error("Error fetching joke:", error);
    } finally {
      submitButton.disabled = false;
      submitButton.value = "Submit";
    }
  });

  function typeOutText(element, text, speed = 30) {
    element.innerHTML = ""; // Clear "thinking" message

    const textSpan = document.createElement("span");
    element.appendChild(textSpan);

    let i = 0;
    const interval = setInterval(() => {
      textSpan.innerHTML += text[i] === " " ? "&nbsp;" : text[i];
      i++;
      if (i >= text.length) {
        clearInterval(interval);
      }
    }, speed);
  }
});

const form = document.querySelector("form");
const toastMsg = document.querySelector(".toast-msg");

// Reusable function for setting error state
function setError(input, message, inputClass) {
  const errorElement = input.closest(inputClass).querySelector(".error-msg");
  errorElement.textContent = message;
  errorElement.style.display = "block";
  input.style.borderColor = "red";
}

// Reusable function for clearing error state
function clearError(input, inputClass) {
  const errorElement = input.closest(inputClass).querySelector(".error-msg");
  errorElement.style.display = "none";
  input.style.borderColor = "var(--green-600)";
}

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let isValid = true; // Track the validity of the form

  // Name validation
  const firstNameInput = document.getElementById("first-name");
  if (firstNameInput.value.trim() === "") {
    setError(firstNameInput, "First name is required", ".first-name");
    isValid = false;
  } else {
    clearError(firstNameInput, ".first-name");
  }

  const lastNameInput = document.getElementById("last-name");
  if (lastNameInput.value.trim() === "") {
    setError(lastNameInput, "Last name is required", ".last-name");
    isValid = false;
  } else {
    clearError(lastNameInput, ".last-name");
  }

  // Email validation
  const emailInput = document.getElementById("email");
  if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
    setError(emailInput, "Please enter a valid email address", ".email");
    isValid = false;
  } else {
    clearError(emailInput, ".email");
  }

  // Query type validation
  const queryTypeInput = document.querySelector(
    'input[name="query-type"]:checked'
  );
  if (!queryTypeInput) {
    const queryError = document.querySelector(".query-select .error-msg");
    queryError.style.display = "block";
    isValid = false;
  } else {
    const queryError = document.querySelector(".query-select .error-msg");
    queryError.style.display = "none";
  }

  // Message validation
  const messageInput = document.getElementById("message");
  if (messageInput.value.trim() === "") {
    setError(messageInput, "Message is required", ".message");
    isValid = false;
  } else {
    clearError(messageInput, ".message");
  }

  // Consent validation
  const consentInput = document.getElementById("consent");
  if (!consentInput.checked) {
    document.querySelector(".checkbox-error").style.display = "block";
    isValid = false;
  } else {
    document.querySelector(".checkbox-error").style.display = "none";
  }

  // If form is valid, proceed with submission
  if (isValid) {
    // Display success toast message
    toastMsg.style.display = "block";
    setTimeout(() => {
      toastMsg.style.display = "none";
    }, 3000);

    // log form data to the console
    const formData = new FormData(form);
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    // Reset form
    form.reset();
  }
});

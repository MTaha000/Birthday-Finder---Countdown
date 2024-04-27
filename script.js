let birthday = document.querySelector(".birthday")
let userInfo = document.querySelector(".user-info")
let userName = document.querySelector(".userName input");
let display = document.querySelector(".display")
let displayAge = document.querySelector("#displayAge")
let countdownDisplay = document.querySelector("#displayCountdown");
let displayName = document.querySelector(".displayName")
let validationName;
let validationBirthDate;

function birthdayCalculator() {
    if (userName.value === "") {
        userName.classList.add("validation")
        validationName = false;
    } else {
        userName.classList.remove("validation")
        validationName = true;
    }
    if (birthday.value === "") {
        birthday.classList.add("validation")
        validationBirthDate = false;
    } else {
        birthday.classList.remove("validation")
        validationBirthDate = true;
    }
    if (validationName && validationBirthDate) {
        userInfo.classList.add("inActive");
        display.classList.remove("inActive");
        let dateOfBirth = new Date(birthday.value)
        let date = new Date();
        let yearCalculate = date.getFullYear() - dateOfBirth.getFullYear();
        let monthCalculate = (date.getMonth() + 1) - (dateOfBirth.getMonth() + 1);
        let daysCalculate = (date.getDate() > dateOfBirth.getDate()) ? date.getDate() - dateOfBirth.getDate() : dateOfBirth.getDate() - date.getDate();

        if (monthCalculate < 0 || (monthCalculate === 0 && date.getDate() < dateOfBirth.getDate())) {
            yearCalculate--;
            monthCalculate += 11;
            if (date.getDate() > dateOfBirth.getDate()) {
                daysCalculate = date.getDate() - dateOfBirth.getDate();
            } else {
                daysCalculate = date.getDate() + (dateOfBirth.getDate() - 31);
                monthCalculate--;
            }
        }
        displayName.innerHTML = `Welcome ${userName.value.toUpperCase()}`
        displayAge.innerHTML = `You are ${yearCalculate} years, ${monthCalculate} months and ${daysCalculate} days old.`;

        calculateNextBirthdayCountdown()
    }
}

function calculateNextBirthdayCountdown() {
    // Convert the input to a Date object
    let dobDate = new Date(birthday.value);
    // Extract the month and day from the user's input
    let birthMonth = dobDate.getMonth();
    let birthDay = dobDate.getDate();

    // Get the current year
    let currentYear = (new Date()).getFullYear();

    // Create a new Date object for the next birthday
    let nextBirthday = new Date(currentYear, birthMonth, birthDay);

    // If the next birthday is before today, set it to next year
    if (nextBirthday.getTime() < Date.now()) {
        nextBirthday.setFullYear(currentYear + 1);
    }

    // Calculate the time difference between today and the next birthday
    let timeDiff = nextBirthday.getTime() - Date.now();

    // Convert milliseconds to days, hours, minutes, and seconds
    let days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    let hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    // Display the countdown

    countdownDisplay.innerHTML = days + " days | " + hours + " hours | " + minutes + " minutes | " + seconds + " seconds";

    setTimeout(calculateNextBirthdayCountdown, 1000)
}

addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        birthdayCalculator();
    }
})





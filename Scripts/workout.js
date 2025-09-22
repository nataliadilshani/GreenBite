// Modal
const modal = document.getElementById("workout-modal");
const modalTitle = document.getElementById("modal-title");
const modalSteps = document.getElementById("modal-steps");
const modalInfo = document.getElementById("modal-info");
const closeModal = document.querySelector(".close");

document.querySelectorAll(".workout-card").forEach(card => {
    card.addEventListener("click", () => {
        const title = card.querySelector("h2").innerText;
        const description = card.querySelector("p").innerText;
        const type = card.dataset.type;
        const duration = card.dataset.duration;

        modalTitle.innerText = title;
        modalSteps.innerHTML = `<li>${description}</li>`;
        modalInfo.innerText = `Type: ${type.charAt(0).toUpperCase() + type.slice(1)}, Duration: ${duration}`;

        modal.style.display = "block";
    });
});

closeModal.addEventListener("click", () => { modal.style.display = "none"; });
window.addEventListener("click", (e) => { if(e.target == modal) modal.style.display = "none"; });

// Filter
const typeSelect = document.getElementById("type");
const durationSelect = document.getElementById("duration");
const searchInput = document.getElementById("search");

function filterWorkouts() {
    const type = typeSelect.value;
    const duration = durationSelect.value;
    const search = searchInput.value.toLowerCase();

    document.querySelectorAll(".workout-card").forEach(card => {
        const matchesType = type === "all" || card.dataset.type === type;
        const matchesDuration = duration === "all" || card.dataset.duration === duration;
        const matchesSearch = card.querySelector("h2").innerText.toLowerCase().includes(search);
        card.style.display = (matchesType && matchesDuration && matchesSearch) ? "block" : "none";
    });
}

typeSelect.addEventListener("change", filterWorkouts);
durationSelect.addEventListener("change", filterWorkouts);
searchInput.addEventListener("input", filterWorkouts);

// Workout Generator
const generateBtn = document.getElementById("generateWorkout");
const workoutPlan = document.getElementById("workoutPlan");

const workouts = [
    {name:"Jumping Jacks", bodyPart:"full body", equipment:"none", duration:120},
    {name:"Push-Ups", bodyPart:"arms", equipment:"none", duration:90},
    {name:"Forward Bend Stretch", bodyPart:"legs", equipment:"none", duration:60},
    {name:"Single Leg Stand", bodyPart:"core", equipment:"none", duration:80},
    {name:"Running", bodyPart:"full body", equipment:"none", duration:300}
];

generateBtn.addEventListener("click", () => {
    const bodyPart = document.getElementById("bodyPart").value;
    const equipment = document.getElementById("equipment").value;

    const filtered = workouts.filter(w => 
        (bodyPart === "all" || w.bodyPart === bodyPart) &&
        (equipment === "all" || w.equipment === equipment)
    );

    workoutPlan.innerHTML = "";
    filtered.forEach(w => {
        const li = document.createElement("li");
        li.dataset.name = w.name;
        li.dataset.duration = w.duration;
        li.textContent = w.name + " (" + w.duration + " sec)";
        workoutPlan.appendChild(li);
    });
});

// Timer
let countdown;
const startBtn = document.getElementById("startTimer");
const timerEl = document.getElementById("timer");
const exerciseNameEl = document.getElementById("exerciseName");

startBtn.addEventListener("click", () => {
    const firstExercise = workoutPlan.querySelector("li");
    if(!firstExercise) return alert("Generate a workout first!");

    let duration = parseInt(firstExercise.dataset.duration);
    exerciseNameEl.textContent = firstExercise.dataset.name;
    timerEl.textContent = formatTime(duration);

    clearInterval(countdown);
    countdown = setInterval(() => {
        duration--;
        timerEl.textContent = formatTime(duration);
        if(duration <= 0){
            clearInterval(countdown);
            alert(`${firstExercise.dataset.name} Complete!`);
        }
    }, 1000);
});

function formatTime(seconds){
    const min = Math.floor(seconds/60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`;
}

document.getElementById('calculatorForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const age = +document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const height = +document.getElementById('height').value;
    const weight = +document.getElementById('weight').value;
    const activityFactor = +document.getElementById('activity').value;

    let bmr;
    if(gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const tdee = Math.round(bmr * activityFactor);
    const carbs = Math.round((tdee * 0.5) / 4);
    const protein = Math.round((tdee * 0.2) / 4);
    const fat = Math.round((tdee * 0.3) / 9);

    // Animate numbers
    animateValue('bmr', 0, Math.round(bmr), 1000);
    animateValue('tdee', 0, tdee, 1000);
    animateValue('carbs', 0, carbs, 1000);
    animateValue('protein', 0, protein, 1000);
    animateValue('fat', 0, fat, 1000);

    // Animate bars
    animateBar('carbBar', 50, 1500);    // Carbs: 50%
    animateBar('proteinBar', 20, 1500); // Protein: 20%
    animateBar('fatBar', 30, 1500);     // Fat: 30%
});

function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    let startTime = null;
    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const value = Math.floor(start + (end - start) * (progress / duration));
        obj.textContent = value > end ? end : value;
        if(progress < duration) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

function animateBar(id, percent, duration) {
    const bar = document.getElementById(id);
    bar.style.width = '0%';
    let startTime = null;
    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const width = Math.min(percent * (progress / duration), percent);
        bar.style.width = width + '%';
        if(progress < duration) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

document.getElementById('calculatorForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const age = +document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const height = +document.getElementById('height').value;
    const weight = +document.getElementById('weight').value;
    const activityFactor = +document.getElementById('activity').value;

    // BMR calculation
    let bmr = gender === 'male' 
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;

    const tdee = Math.round(bmr * activityFactor);

    // Macronutrients in grams
    const carbs = Math.round((tdee * 0.5) / 4);
    const protein = Math.round((tdee * 0.2) / 4);
    const fat = Math.round((tdee * 0.3) / 9);

    // Display results
    document.getElementById('bmr').textContent = Math.round(bmr);
    document.getElementById('tdee').textContent = tdee;
    document.getElementById('carbs').textContent = carbs;
    document.getElementById('protein').textContent = protein;
    document.getElementById('fat').textContent = fat;

    // Animate progress bars proportionally
    const totalMacros = carbs + protein + fat;

    const carbPercent = (carbs / totalMacros) * 100;
    const proteinPercent = (protein / totalMacros) * 100;
    const fatPercent = (fat / totalMacros) * 100;

    document.getElementById('carbBar').style.width = '0%';
    document.getElementById('proteinBar').style.width = '0%';
    document.getElementById('fatBar').style.width = '0%';

    // Trigger animation after short delay
    setTimeout(() => {
        document.getElementById('carbBar').style.width = carbPercent + '%';
        document.getElementById('proteinBar').style.width = proteinPercent + '%';
        document.getElementById('fatBar').style.width = fatPercent + '%';
    }, 100);
});

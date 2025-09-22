const texts = document.querySelectorAll('.hero-text p');
const hero = document.querySelector('.hero');
let current = 0;

function changeHero() {
    texts[current].classList.remove('active');
    current = (current + 1) % texts.length;
    texts[current].classList.add('active');

    const img = texts[current].getAttribute('data-image');
    hero.style.setProperty('--hero-img', `url('${img}')`);
}

// Initialize first image
hero.style.setProperty('--hero-img', `url('${texts[0].getAttribute('data-image')}')`);

setInterval(changeHero, 10000);

const healthTips = [
  { text: "Drink at least 8 glasses of water daily.", image: "images/home/health-tip1.png" },
  { text: "Eat a rainbow of fruits and vegetables.", image: "images/home/health-tip2.png" },
  { text: "Walk at least 10,000 steps every day.", image: "images/home/health-tip3.png" },
  { text: "Do 10 minutes of meditation each morning.", image: "images/home/health-tip4.png" },
  { text: "Include protein in every meal.", image: "images/home/health-tip5.png" },
  { text: "Stretch before and after workouts.", image: "images/home/health-tip6.png" },
  { text: "Avoid sugary drinks.", image: "images/home/health-tip7.png" },
  { text: "Sleep 7-9 hours nightly.", image: "images/home/health-tip8.png" },
  { text: "Limit processed foods.", image: "images/home/health-tip9.png" },
  { text: "Take short breaks from screens every hour.", image: "images/home/health-tip10.png" }
];

const tipElement = document.getElementById('health-tip');
const tipImage = document.querySelector('.health-tip-img');

// Pick tip based on the day of the month
const today = new Date().getDate(); // 1–31
const tipIndex = (today - 1) % healthTips.length;

tipElement.textContent = healthTips[tipIndex].text;
tipImage.src = healthTips[tipIndex].image;

const subscribeForm = document.querySelector('.footer-subscribe .subscribe-form');
const emailInput = subscribeForm.querySelector('input[type="email"]');

subscribeForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    if (!email) {
        alert('Please enter a valid email!');
        return;
    }

    let emails = JSON.parse(localStorage.getItem('subscribedEmails')) || [];

    if(emails.includes(email)){
        alert('This email is already subscribed!');
        return;
    }

    emails.push(email);
    localStorage.setItem('subscribedEmails', JSON.stringify(emails));

    alert('Thank you for subscribing!');
    emailInput.value = '';
});

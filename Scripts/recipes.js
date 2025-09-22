// Recipe Filtering
const categorySections = document.querySelectorAll('.recipe-cards');

function filterRecipes() {
    const categoryValue = document.getElementById('category').value;
    const dietaryValue = document.getElementById('dietary').value;
    const searchValue = document.getElementById('search').value.toLowerCase();

    categorySections.forEach(section => {
        const cards = section.querySelectorAll('.recipe-card');
        let visibleCount = 0;

        cards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardDietary = card.getAttribute('data-dietary');
            const cardName = card.querySelector('h2').textContent.toLowerCase();

            const matchCategory = categoryValue === 'all' || cardCategory === categoryValue;
            const matchDietary = dietaryValue === 'all' || cardDietary === dietaryValue;
            const matchSearch = cardName.includes(searchValue);

            if (matchCategory && matchDietary && matchSearch) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        const sectionTitle = section.previousElementSibling; // assumes <h2> is right before the section
        if (visibleCount === 0) {
            section.style.display = 'none';
            sectionTitle.style.display = 'none';
        } else {
            section.style.display = 'grid'; // preserve original grid layout
            sectionTitle.style.display = 'block';
        }
    });
}

// Attach filter event listeners
document.getElementById('category').addEventListener('change', filterRecipes);
document.getElementById('dietary').addEventListener('change', filterRecipes);
document.getElementById('search').addEventListener('input', filterRecipes);

// Modal Setup
const modal = document.getElementById('recipe-modal');
const modalTitle = document.getElementById('modal-title');
const modalIngredients = document.getElementById('modal-ingredients');
const modalSteps = document.getElementById('modal-steps');
const modalNutritionBody = document.querySelector('#modal-nutrition tbody');
const closeBtn = document.querySelector('.modal .close');

// Open modal on card click
document.querySelectorAll('.recipe-card').forEach(card => {
    card.addEventListener('click', () => {
        const recipeName = card.querySelector('h2').textContent;
        const data = recipesData[recipeName];

        if (!data) return;

        // Fill modal
        modalTitle.textContent = recipeName;

        modalIngredients.innerHTML = '';
        data.ingredients.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            modalIngredients.appendChild(li);
        });

        modalSteps.innerHTML = '';
        data.steps.forEach(step => {
            const li = document.createElement('li');
            li.textContent = step;
            modalSteps.appendChild(li);
        });

        modalNutritionBody.innerHTML = '';
        data.nutrition.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${row.nutrient}</td><td>${row.amount}</td>`;
            modalNutritionBody.appendChild(tr);
        });

        modal.style.display = 'block';
    });
});

// Close modal
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close if clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Recipes Data (all 40 recipes!)
const recipesData = {
    // Breakfast & Brunch
    "Overnight Oats": {
        ingredients: ["1/2 cup oats", "1 cup milk", "1 tbsp chia seeds", "1 tsp honey"],
        steps: ["Mix oats, milk, chia seeds, and honey.", "Refrigerate overnight.", "Stir before serving."],
        nutrition: [{ nutrient: "Calories", amount: "250 kcal" }, { nutrient: "Protein", amount: "8 g" }, { nutrient: "Carbs", amount: "40 g" }, { nutrient: "Fat", amount: "7 g" }]
    },
    "Banana Pancakes": {
        ingredients: ["1 ripe banana", "1 egg", "1/2 cup oats", "1/4 tsp baking powder"],
        steps: ["Mash banana and mix with egg and oats.", "Add baking powder.", "Cook pancakes on a non-stick pan."],
        nutrition: [{ nutrient: "Calories", amount: "200 kcal" }, { nutrient: "Protein", amount: "6 g" }, { nutrient: "Carbs", amount: "30 g" }, { nutrient: "Fat", amount: "5 g" }]
    },
    "Egg Muffins": {
        ingredients: ["4 eggs", "1/2 cup chopped veggies", "Salt and pepper to taste"],
        steps: ["Preheat oven to 180°C.", "Mix eggs and veggies.", "Pour into muffin tin and bake 20 mins."],
        nutrition: [{ nutrient: "Calories", amount: "120 kcal" }, { nutrient: "Protein", amount: "10 g" }, { nutrient: "Carbs", amount: "3 g" }, { nutrient: "Fat", amount: "8 g" }]
    },
    "Berry Parfait": {
        ingredients: ["Yogurt", "Granola", "Fresh berries"],
        steps: ["Layer yogurt, granola, and berries in a glass.", "Repeat layers.", "Serve chilled."],
        nutrition: [{ nutrient: "Calories", amount: "220 kcal" }, { nutrient: "Protein", amount: "7 g" }, { nutrient: "Carbs", amount: "35 g" }, { nutrient: "Fat", amount: "5 g" }]
    },
    "Veggie Omelette": {
        ingredients: ["2 eggs", "1/2 cup chopped vegetables", "Salt and pepper"],
        steps: ["Beat eggs with salt and pepper.", "Pour into a hot pan.", "Add vegetables and cook until done."],
        nutrition: [{ nutrient: "Calories", amount: "180 kcal" }, { nutrient: "Protein", amount: "12 g" }, { nutrient: "Carbs", amount: "5 g" }, { nutrient: "Fat", amount: "12 g" }]
    },

    // Snacks
    "Sweet Potato Fries": {
        ingredients: ["2 sweet potatoes", "1 tbsp olive oil", "Salt", "Paprika"],
        steps: ["Preheat oven to 200°C.", "Cut sweet potatoes into fries.", "Toss with oil, salt, and paprika.", "Bake 25 mins."],
        nutrition: [{ nutrient: "Calories", amount: "150 kcal" }, { nutrient: "Protein", amount: "2 g" }, { nutrient: "Carbs", amount: "30 g" }, { nutrient: "Fat", amount: "4 g" }]
    },
    "Protein Bars": {
        ingredients: ["Oats", "Nuts", "Honey", "Protein powder"],
        steps: ["Mix all ingredients.", "Press into a tray.", "Refrigerate 2 hours.", "Cut into bars."],
        nutrition: [{ nutrient: "Calories", amount: "250 kcal" }, { nutrient: "Protein", amount: "12 g" }, { nutrient: "Carbs", amount: "28 g" }, { nutrient: "Fat", amount: "10 g" }]
    },
    "Chickpea Snack Bowl": {
        ingredients: ["1 cup chickpeas", "Herbs", "Salt", "Olive oil"],
        steps: ["Roast chickpeas with olive oil and herbs.", "Serve warm."],
        nutrition: [{ nutrient: "Calories", amount: "200 kcal" }, { nutrient: "Protein", amount: "10 g" }, { nutrient: "Carbs", amount: "25 g" }, { nutrient: "Fat", amount: "6 g" }]
    },
    "Zucchini Noodles": {
        ingredients: ["Zucchini", "Tomato sauce", "Basil", "Olive oil"],
        steps: ["Spiralize zucchini.", "Sauté with olive oil.", "Add tomato sauce and basil.", "Serve."],
        nutrition: [{ nutrient: "Calories", amount: "120 kcal" }, { nutrient: "Protein", amount: "3 g" }, { nutrient: "Carbs", amount: "8 g" }, { nutrient: "Fat", amount: "7 g" }]
    },
    "Trail Mix": {
        ingredients: ["Nuts", "Seeds", "Dried fruits"],
        steps: ["Mix all ingredients.", "Store in airtight container."],
        nutrition: [{ nutrient: "Calories", amount: "300 kcal" }, { nutrient: "Protein", amount: "8 g" }, { nutrient: "Carbs", amount: "30 g" }, { nutrient: "Fat", amount: "18 g" }]
    },

    // Desserts
    "Chia Pudding": {
        ingredients: ["Chia seeds", "Almond milk", "Honey or maple syrup"],
        steps: ["Mix chia seeds with almond milk.", "Refrigerate 4 hours or overnight.", "Add sweetener before serving."],
        nutrition: [{ nutrient: "Calories", amount: "180 kcal" }, { nutrient: "Protein", amount: "6 g" }, { nutrient: "Carbs", amount: "20 g" }, { nutrient: "Fat", amount: "8 g" }]
    },
    "Fruit Tart": {
        ingredients: ["Oat crust", "Mixed fruits", "Yogurt or cream"],
        steps: ["Prepare crust.", "Add filling.", "Top with fruits."],
        nutrition: [{ nutrient: "Calories", amount: "250 kcal" }, { nutrient: "Protein", amount: "5 g" }, { nutrient: "Carbs", amount: "35 g" }, { nutrient: "Fat", amount: "10 g" }]
    },
    "Banana Nice Cream": {
        ingredients: ["Frozen bananas", "Optional toppings"],
        steps: ["Blend frozen bananas until creamy.", "Add toppings if desired."],
        nutrition: [{ nutrient: "Calories", amount: "150 kcal" }, { nutrient: "Protein", amount: "2 g" }, { nutrient: "Carbs", amount: "35 g" }, { nutrient: "Fat", amount: "0 g" }]
    },
    "Energy Balls": {
        ingredients: ["Dates", "Nuts", "Cocoa powder"],
        steps: ["Blend all ingredients.", "Roll into balls.", "Chill before serving."],
        nutrition: [{ nutrient: "Calories", amount: "100 kcal" }, { nutrient: "Protein", amount: "3 g" }, { nutrient: "Carbs", amount: "15 g" }, { nutrient: "Fat", amount: "4 g" }]
    },
    "Oatmeal Cookies": {
        ingredients: ["Oats", "Raisins", "Cinnamon", "Honey"],
        steps: ["Mix ingredients.", "Bake at 180°C for 12 mins."],
        nutrition: [{ nutrient: "Calories", amount: "120 kcal" }, { nutrient: "Protein", amount: "3 g" }, { nutrient: "Carbs", amount: "20 g" }, { nutrient: "Fat", amount: "4 g" }]
    },

    // Soups
    "Spinach Soup": {
        ingredients: ["Spinach", "Garlic", "Vegetable broth", "Salt", "Pepper"],
        steps: ["Sauté garlic.", "Add spinach and broth.", "Cook until soft.", "Blend until smooth."],
        nutrition: [{ nutrient: "Calories", amount: "100 kcal" }, { nutrient: "Protein", amount: "5 g" }, { nutrient: "Carbs", amount: "15 g" }, { nutrient: "Fat", amount: "3 g" }]
    },
    "Tomato Soup": {
        ingredients: ["Tomatoes", "Onion", "Garlic", "Basil", "Vegetable broth"],
        steps: ["Sauté onions and garlic.", "Add tomatoes and broth.", "Cook 15 mins.", "Blend until smooth."],
        nutrition: [{ nutrient: "Calories", amount: "120 kcal" }, { nutrient: "Protein", amount: "3 g" }, { nutrient: "Carbs", amount: "20 g" }, { nutrient: "Fat", amount: "4 g" }]
    },
    "Vegetable Soup": {
        ingredients: ["Mixed vegetables", "Vegetable broth", "Salt", "Pepper"],
        steps: ["Add vegetables to broth.", "Simmer 20 mins.", "Season to taste."],
        nutrition: [{ nutrient: "Calories", amount: "90 kcal" }, { nutrient: "Protein", amount: "4 g" }, { nutrient: "Carbs", amount: "18 g" }, { nutrient: "Fat", amount: "1 g" }]
    },
    "Pumpkin Soup": {
        ingredients: ["Pumpkin", "Onion", "Garlic", "Vegetable broth", "Spices"],
        steps: ["Sauté onions and garlic.", "Add pumpkin and broth.", "Cook until soft.", "Blend until creamy."],
        nutrition: [{ nutrient: "Calories", amount: "110 kcal" }, { nutrient: "Protein", amount: "3 g" }, { nutrient: "Carbs", amount: "20 g" }, { nutrient: "Fat", amount: "2 g" }]
    },
    "Lentil Soup": {
        ingredients: ["Lentils", "Onion", "Garlic", "Spices", "Vegetable broth"],
        steps: ["Sauté onion and garlic.", "Add lentils and broth.", "Cook until lentils are tender.", "Season with spices."],
        nutrition: [{ nutrient: "Calories", amount: "180 kcal" }, { nutrient: "Protein", amount: "12 g" }, { nutrient: "Carbs", amount: "25 g" }, { nutrient: "Fat", amount: "3 g" }]
    },

    // Mains & Sides
    "Grilled Chicken": {
        ingredients: ["Chicken breast", "Herbs", "Olive oil", "Salt", "Pepper"],
        steps: ["Marinate chicken.", "Grill until cooked.", "Serve hot."],
        nutrition: [{ nutrient: "Calories", amount: "250 kcal" }, { nutrient: "Protein", amount: "35 g" }, { nutrient: "Carbs", amount: "0 g" }, { nutrient: "Fat", amount: "12 g" }]
    },
    "Grilled Salmon": {
        ingredients: ["Salmon fillet", "Lemon", "Herbs", "Salt", "Pepper"],
        steps: ["Season salmon.", "Grill until cooked.", "Serve with lemon."],
        nutrition: [{ nutrient: "Calories", amount: "300 kcal" }, { nutrient: "Protein", amount: "30 g" }, { nutrient: "Carbs", amount: "0 g" }, { nutrient: "Fat", amount: "18 g" }]
    },
    "Cauliflower Rice": {
        ingredients: ["Cauliflower", "Olive oil", "Salt", "Pepper"],
        steps: ["Grate cauliflower.", "Sauté in olive oil.", "Season and serve."],
        nutrition: [{ nutrient: "Calories", amount: "80 kcal" }, { nutrient: "Protein", amount: "3 g" }, { nutrient: "Carbs", amount: "7 g" }, { nutrient: "Fat", amount: "5 g" }]
    },
    "Grilled Veggies": {
        ingredients: ["Mixed vegetables", "Olive oil", "Salt", "Pepper"],
        steps: ["Toss veggies with oil and seasoning.", "Grill until tender."],
        nutrition: [{ nutrient: "Calories", amount: "120 kcal" }, { nutrient: "Protein", amount: "4 g" }, { nutrient: "Carbs", amount: "12 g" }, { nutrient: "Fat", amount: "7 g" }]
    },
    "Quinoa Salad": {
        ingredients: ["Quinoa", "Vegetables", "Lemon juice", "Olive oil"],
        steps: ["Cook quinoa.", "Mix with vegetables and dressing."],
        nutrition: [{ nutrient: "Calories", amount: "220 kcal" }, { nutrient: "Protein", amount: "8 g" }, { nutrient: "Carbs", amount: "30 g" }, { nutrient: "Fat", amount: "8 g" }]
    },

    // Salads
    "Greek Salad": {
        ingredients: ["Feta", "Cucumber", "Tomato", "Olives", "Olive oil"],
        steps: ["Chop vegetables.", "Mix with feta and olives.", "Drizzle olive oil."],
        nutrition: [{ nutrient: "Calories", amount: "180 kcal" }, { nutrient: "Protein", amount: "6 g" }, { nutrient: "Carbs", amount: "10 g" }, { nutrient: "Fat", amount: "12 g" }]
    },
    "Chickpea Salad": {
        ingredients: ["Chickpeas", "Vegetables", "Lemon juice", "Olive oil"],
        steps: ["Mix all ingredients.", "Serve chilled."],
        nutrition: [{ nutrient: "Calories", amount: "200 kcal" }, { nutrient: "Protein", amount: "8 g" }, { nutrient: "Carbs", amount: "25 g" }, { nutrient: "Fat", amount: "8 g" }]
    },
    "Avocado Salad": {
        ingredients: ["Avocado", "Cherry tomatoes", "Lime juice"],
        steps: ["Chop avocado and tomatoes.", "Drizzle lime juice.", "Mix and serve."],
        nutrition: [{ nutrient: "Calories", amount: "220 kcal" }, { nutrient: "Protein", amount: "3 g" }, { nutrient: "Carbs", amount: "12 g" }, { nutrient: "Fat", amount: "18 g" }]
    },
    "Cucumber & Tomato Salad": {
        ingredients: ["Cucumber", "Tomatoes", "Vinaigrette"],
        steps: ["Chop vegetables.", "Add vinaigrette.", "Mix well."],
        nutrition: [{ nutrient: "Calories", amount: "100 kcal" }, { nutrient: "Protein", amount: "2 g" }, { nutrient: "Carbs", amount: "8 g" }, { nutrient: "Fat", amount: "6 g" }]
    },
    "Spinach & Berry Salad": {
        ingredients: ["Spinach", "Berries", "Nuts", "Dressing"],
        steps: ["Combine all ingredients.", "Toss with dressing."],
        nutrition: [{ nutrient: "Calories", amount: "150 kcal" }, { nutrient: "Protein", amount: "4 g" }, { nutrient: "Carbs", amount: "15 g" }, { nutrient: "Fat", amount: "8 g" }]
    },

    // Drinks
    "Green Detox Smoothie": {
        ingredients: ["Spinach", "Apple", "Cucumber", "Water"],
        steps: ["Blend all ingredients.", "Serve immediately."],
        nutrition: [{ nutrient: "Calories", amount: "120 kcal" }, { nutrient: "Protein", amount: "3 g" }, { nutrient: "Carbs", amount: "25 g" }, { nutrient: "Fat", amount: "0 g" }]
    },
    "Berry Smoothie": {
        ingredients: ["Mixed berries", "Yogurt", "Honey"],
        steps: ["Blend all ingredients.", "Serve chilled."],
        nutrition: [{ nutrient: "Calories", amount: "150 kcal" }, { nutrient: "Protein", amount: "4 g" }, { nutrient: "Carbs", amount: "30 g" }, { nutrient: "Fat", amount: "2 g" }]
    },
    "Protein Shake": {
        ingredients: ["Whey protein", "Banana", "Milk"],
        steps: ["Blend all ingredients.", "Serve immediately."],
        nutrition: [{ nutrient: "Calories", amount: "200 kcal" }, { nutrient: "Protein", amount: "20 g" }, { nutrient: "Carbs", amount: "25 g" }, { nutrient: "Fat", amount: "3 g" }]
    },
    "Mango Lassi": {
        ingredients: ["Mango", "Yogurt", "Honey or sugar", "Water or milk"],
        steps: ["Peel and chop mangoes.", "Blend mango, yogurt, honey, and water/milk until smooth.", "Serve chilled."],
        nutrition: [{ nutrient: "Calories", amount: "180 kcal" }, { nutrient: "Protein", amount: "5 g" }, { nutrient: "Carbs", amount: "35 g" }, { nutrient: "Fat", amount: "2 g" }]
    },
    "Herbal Tea": {
        ingredients: ["Chamomile flowers", "Mint leaves", "Hot water", "Honey (optional)"],
        steps: ["Boil water.", "Steep chamomile flowers and mint leaves for 5-7 minutes.", "Add honey if desired and serve."],
        nutrition: [{ nutrient: "Calories", amount: "5 kcal" }, { nutrient: "Protein", amount: "0 g" }, { nutrient: "Carbs", amount: "1 g" }, { nutrient: "Fat", amount: "0 g" }]
    }
}
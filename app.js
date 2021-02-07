const searchButton = document.getElementById('search');
searchButton.addEventListener('click', () => {
    const customerInput = document.getElementById('customerInput');
    const row = document.getElementById('row');


    // Loading item data from MealDB by api 

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${customerInput.value}`)

        .then(res => res.json())
        .then(data => {
            let html = " ";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                        <div class="col-md-3" style="margin-top: 20px;" dataid="${meal.idMeal}">
                        <div class=" card text-center "  style="background-color:#F8F7F5;border-radius: 2%; ">
                            <img src="${meal.strMealThumb}" data-id="${meal.idMeal}" class="card-img-top " style="width: 100%; border-top-right-radius: 2%; border-top-left-radius: 2%; ">
                            <div class="card-body " data-id="${meal.idMeal}" style="padding-top: 7px;padding-bottom: 7px; ">
                                <h3 class="card-text text-center " data-id="${meal.idMeal}" style="font-size:17px">${meal.strMeal}</h3>
                            </div>
                        </div>
                    </div>
                        `;
                });
            } else {
                html = "We don't Find Any meal.";
                row.classList.add('not-found');
            }

            row.innerHTML = html;
        })
});




// Loading item details from mealdb  by api 

row.addEventListener('click', (event) => {
    const idfind = event.target;
    const detailsId = idfind.dataset.id;
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${detailsId}`)
        .then(res => res.json())
        .then(data => {
            const details = document.getElementById('details');
            details.style.display = 'block';
            let itemDetails = " ";
            if (data.meals) {
                data.meals.forEach(meal => {

                    itemDetails += `
                    <div class="card mb-3">
                        <button type="button" class="close" aria-label="Close">
                            <span aria-hidden="true" id="close" style="margin-right: 10px;margin-top: 15px;font-size: 40px;">&times;</span>
                          </button>
                        <img class="card-img-top" style="width: 40%; border-top-right-radius: 2%; border-top-left-radius: 2%; margin-top:20px; " src="${meal.strMealThumb}" data-id="${meal.idMeal}" alt="Card image cap">
                        <div class="card-body">
                        <h4>Category: <span>${meal.strCategory}</span></h4>
                            <h5 class="card-title text-lite">Item: <span>${meal.strArea}</span> </h5> 
                            <p class="card-text text-center" style="width: 80%;margin:auto;padding-bottom: 30px; 
                            font-size:20px;font-weight:bold;">Ingredient: <span style="font-size:15px;font-weight:400;">
                            <p >**<span>${meal.strMeasure1}</span> <span>${meal.strIngredient1}</span></p>
                            <p >** <span>${meal.strMeasure2}</span> <span>${meal.strIngredient2}</span></p>
                            <p >** <span>${meal.strMeasure3}</span> <span>${meal.strIngredient3}</span></p>
                            <p >** <span>${meal.strMeasure4}</span> <span>${meal.strIngredient4}</span></p>
                            <p >**<span>${meal.strMeasure5}</span> <span>${meal.strIngredient5}</span></p>
                            <p >**<span>${meal.strMeasure6}</span> <span>${meal.strIngredient6}</span></p>
                            <p >**<span>${meal.strMeasure7}</span> <span>${meal.strIngredient7}</span></p>
                            </p>
                        </div>
                    </div>
 
                    `
                });
                details.innerHTML = itemDetails;
            }
            const closebtn = document.getElementById('close');
            closebtn.addEventListener('click', () => {
                const details = document.getElementById('details');
                details.style.display = 'none';
            })
        })
})
const loadAndShowCategories = async () => {
    const categoryContainer = document.getElementById('category_container');
    try {
        const response = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories');
        const data = await response.json();
        data.categories.forEach(category => {
            // console.log(category)
            const btn = document.createElement('button');
            btn.classList = 'btn font-semibold text-lg';
            btn.innerText = category.category;
            categoryContainer.append(btn);
        });
    }
    catch(err){
        alert('Data Fetching Error');
    }
}








loadAndShowCategories();
const loadAndShowCategories = async () => {
    const categoryContainer = document.getElementById('category_container');
    try {
        const response = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories');
        const data = await response.json();
        data.categories.forEach(category => {
            const div = document.createElement('div');
            div.classList = 'flex justify-center items-center gap-4';
            div.innerHTML = `
            <button id="${category.category_id}" class="btn font-semibold text-lg buttons" onclick="loadVideosByCategory(${category.category_id})" >
            ${category.category}
            </button>
            `
            categoryContainer.append(div);
        });
    }
    catch (err) {
        alert('Data Fetching Error');
    }
}

const removeActive = () => {
    const allBtn = document.getElementsByClassName('buttons');
    for (let btn of allBtn) {
        btn.classList.remove('active')
    }
}

const loadVideosByCategory = async (id) => {
    try {
        const response = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        const data = await response.json();
        removeActive();
        document.getElementById(id).classList.add('active')
        // console.log(data.category )
        showVideos(data.category);
    }
    catch (err) {
        alert('Load Videos By Category Api Not Working');
    }
}

const loadVideos = async () => {
    try {
        const response = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos');
        const data = await response.json();
        showVideos(data.videos);
    }
    catch (err) {
        alert('Video Data Fetching Error');
    }
}

function getTimeString(time) {
    //get Hour and rest seconds
    const hour = parseInt(time / 3600);
    let remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
    return `${hour} hour  ${minute} minute ${remainingSecond} second ago`;
}



const showVideos = (items) => {
    const videoContainer = document.getElementById('videoContainer');
    videoContainer.innerHTML = '';
    console.log(items.length)
    if (items.length === 0) {
        videoContainer.classList.remove('grid');
        videoContainer.innerHTML = `
        <div class="h-screen flex flex-col justify-center items-center gap-3">
            <img src="./assets/Icon.png">
            <p class="font-bold text-lg">No Content here</p>
        </div>
        `
        return
    }
    else {
        videoContainer.classList.add('grid');
    }
    items.forEach(item => {
        const div = document.createElement('div');
        div.classList = 'card card-compact';
        div.innerHTML = `
        <div class="h-[200px] relative">
            <img class="h-full w-full object-cover" src=${item.thumbnail}/>

            ${item.others.posted_date?.length == 0 ? '' :
                `<span class="absolute right-2 bottom-2 text-xs  bg-black text-white rounded p-1">${getTimeString(item.others.posted_date)}</span>`
            }    
        </div>
        <div class="px-0 py-3 flex justify-between items-center gap-3">
            
            <div class="flex items-center gap-3">
                <div>
                    <img class="w-10 h-10 rounded-full object-cover" src="${item.authors[0].profile_picture}">
                </div>
                <div>
                    <h2 class="font-bold text-lg">${item.title}</h2>
                    <div class="flex items-center gap-2">
                        <p class="font-medium text-base">${item.authors[0].profile_name}</p>
                        ${item.authors[0].verified ? `<img class="w-5" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png"/>` : ''}
                    </div>
                <p class="font-light text-sm">${item.video_id}</p>
                </div>
            </div>
            <div>
                <button class="btn">
                    Details
                </button>
            </div>
        </div>
        `
        videoContainer.appendChild(div);
    });
}







loadAndShowCategories();
loadVideos();

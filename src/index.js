// write your code here


function fetchRamens() {
    fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        highlightRamen(data[0]); //Advanced deliverable #1 - auto-populate detail with first ramen
        data.forEach(ramen => renderRamen(ramen))
    });
}

function renderRamen(ramen) {
    const menu = document.querySelector('#ramen-menu');
    //console.log(menu);
    const image = document.createElement('img');
    //console.log(image);
    image.src = ramen.image;
    image.id = `${ramen.restaurant} ${ramen.name}`.split(" ").join("-");
    image.addEventListener('click', () => highlightRamen(ramen))
    menu.append(image);
}

function highlightRamen(ramen) {
    //console.log("Click!");
    document.querySelector('.detail-image').src = ramen.image;
    //console.log(detailImage);
    //console.log(ramen);
    document.querySelector('.name').textContent = ramen.name;
    document.querySelector('.restaurant').textContent = ramen.restaurant;
    document.querySelector('#rating-display').textContent = ramen.rating;
    document.querySelector('#comment-display').textContent = ramen.comment;
}

function initForm() {
    const newRamenform = document.querySelector('#new-ramen');
    const updateRamenForm = document.querySelector('#edit-ramen');
    //console.log(form);
    newRamenform.addEventListener('submit', event => addNewSubmitHandler(event))
    updateRamenForm.addEventListener('submit', event => updateSubmitHandler(event))
}

function addNewSubmitHandler(event) {
    event.preventDefault();
    //console.log("form submitted");
    //console.log(event.target['new-name'].value);
    newRamen = {
        name : document.getElementById('new-name').value, //either method works, this or the below
        restaurant : event.target['new-restaurant'].value,
        image : event.target['new-image'].value,
        rating : event.target['new-rating'].value,
        comment : event.target['new-comment'].value
    }
    console.log(newRamen);
    renderRamen(newRamen);
    event.target.reset();
}

function updateSubmitHandler(event) {
    event.preventDefault();


    const oldRamen = {
        name : document.querySelector('.name').textContent,
        restaurant : document.querySelector('.restaurant').textContent,
        image : document.querySelector('.detail-image').src,
        rating : document.querySelector('#rating-display').value,
        comment : document.querySelector('#comment-display').value,
    }

    const newRamen = {
        name : document.querySelector('.name').textContent,
        restaurant : document.querySelector('.restaurant').textContent,
        image : document.querySelector('.detail-image').src,
        rating : document.querySelector('#edit-ramen #new-rating').value,
        comment : document.querySelector('#edit-ramen #new-comment').value,
    }
    //console.log(ramen);
    renderRamen(newRamen); //create new ramen in ramen menu
    deleteRamen(oldRamen); //delete old ramen
    highlightRamen(newRamen); //brings new ramen into detail window
    event.target.reset();
}

function deleteRamen(ramen) {
    const id = `${ramen.restaurant} ${ramen.name}`.split(" ").join("-");
    console.log (id);
    document.querySelector(`#${id}`).remove();
}


fetchRamens();
initForm();
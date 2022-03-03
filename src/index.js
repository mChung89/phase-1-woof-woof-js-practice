const dogBar = document.getElementById('dog-bar');
const dogInfo = document.getElementById('dog-info')
const filterBtn = document.getElementById('good-dog-filter')
let allDogs = []

function dogRender(dog) {
    const span = document.createElement(`span`);
    span.textContent = dog.name;
    span.addEventListener('click', (e) => {
        dogInfo.innerText = ''
        const img = document.createElement('img');
        const h2 = document.createElement('h2')
        const btn = document.createElement('button')
        h2.textContent = dog.name;
        img.src = dog.image
        btn.textContent = dog.isGoodDog ? "Good Dog!" : "Bad Dog!";
        btn.addEventListener('click', (e) => {
            const theButton = e.target;
            if (dog.isGoodDog) {
                dog.isGoodDog = false;
                btn.textContent = "Bad Dog!"
            } else {
                dog.isGoodDog = true;
                btn.textContent = "Good Dog!"
            }
            fetch(`http://localhost:3000/pups/${dog.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(dog)
            })
                .then(resp => resp.json())
                .then(dogs => console.log(dogs))
        })
        dogInfo.append(img, h2, btn)
    })
    dogBar.appendChild(span)
}

// filter button
filterBtn.addEventListener('click', (e) => {
    let btnName = e.target
    let visibleDogs = [...allDogs]
    btnName.textContent === 'Filter good dogs: OFF' ? btnName.textContent = 'Filter good dogs: ON': btnName.textContent = 'Filter good dogs: OFF';
    if(btnName.textContent === 'Filter good dogs: ON') {
        dogBar.innerHTML = ''
        visibleDogs.forEach(dogs => {
            if (dogs.isGoodDog) {
                dogRender(dogs)
            }
        })
    } else if (btnName.textContent === 'Filter good dogs: OFF') {
        dogBar.innerHTML = ''
        allDogs.forEach(dogs => dogRender(dogs))
    }})


fetch("http://localhost:3000/pups")
    .then(resp => resp.json())
    .then(dogs => {
        dogs.forEach(dog => dogRender(dog))
        dogs.forEach(dogs => allDogs.push(dogs))
    })

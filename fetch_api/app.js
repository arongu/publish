const buttonOne = document.getElementById('one');
const buttonTwo = document.getElementById('two');

const render_json_data = (jsonObjects) => {
    for (const jsonObject of jsonObjects) {
        const newUl = document.createElement('ul');
        newUl.setAttribute('class', 'new-ul');

        for ( const key of Reflect.ownKeys(jsonObject)) {
            const newLi = document.createElement('li');
            newLi.textContent = jsonObject[key];
            newLi.setAttribute('class', 'new-li');
            newUl.appendChild(newLi);
        }

        document.body.appendChild(newUl);
    }
};

const get_json = (path) => {
    fetch(path).then((response) => {
        if ( response.ok ){
            response.json().then((data) => {
                render_json_data(data);
            }).catch((error) => {
                console.error(`An error occurred while processing the JSON message: ${error}`);
            });
        } else {
            console.error(`HTTP ERROR: ${response.status} ${response.text()}`);
        }

    }).catch((error) => {
        console.error(`An error occurred while fetching data: ${error}`);
    });
}

// event listeners
buttonOne.addEventListener('click', () => {
    get_json('fetch.txt');
});

buttonTwo.addEventListener('click', () => {
    const uls = document.querySelectorAll('ul.new-ul');
    for ( let i = 0; i < uls.length; i++ ) {
        const ul = uls[i];
        document.body.removeChild(ul);
    }
});




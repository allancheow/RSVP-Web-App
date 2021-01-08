//console.log(`I'm connected`);

const form = document.getElementById(`registrar`);
const input = form.querySelector(`input`);

const mainDiv = document.querySelector(`.main`);
const ul = document.getElementById(`invitedList`);

const div = document.createElement(`div`);
const filterLabel = document.createElement(`label`);
const filterCheckBox = document.createElement(`input`);

filterLabel.textContent = `Hide those who haven't responded`;
filterCheckBox.type = `checkbox`;
div.appendChild(filterLabel);
div.appendChild(filterCheckBox);
mainDiv.insertBefore(div, ul);
filterCheckBox.addEventListener(`change`, (e) => {
    const isChecked = e.target.checked;
    const lis = ul.children;
    if (isChecked) {
        for ( let i = 0; i < lis.length; i++ ) {
            let li = lis[i];
            if (li.className === `responded` ) {
                li.style.display = ``;
            } else {
                li.style.display = `none`;
            }
        }
    } else {
        for ( let i = 0; i < lis.length; i++ ) {
            let li = lis[i];
            li.style.display = ``;
        }
    }
});


/**
 * Retrieves input from user to create 
 * list of attendees. Craetes <li> with
 * guest name, checkbox and remove button
 *
 * @param {text} input value from user
 * @returns {text} returns HTML li to append to page
 */

function createLI(text) {
    const li = document.createElement(`li`);
    const span = document.createElement(`span`);
    span.textContent = text;
    li.appendChild(span);
    const label = document.createElement(`label`);
    label.textContent = `Confirmed`;
    // Adds checkbox
    const checkbox = document.createElement(`input`);
    checkbox.type = `checkbox`;
    label.appendChild(checkbox);
    li.appendChild(label);
    // Adds edit button
    const editButton = document.createElement(`button`);
    editButton.textContent = `edit`;
    li.appendChild(editButton);
    // Adds remove button
    const removeButton = document.createElement(`button`);
    removeButton.textContent = `remove`;
    li.appendChild(removeButton);
    return li;
};

form.addEventListener(`submit`, (e) => {
    // Cancels browsers default submit behavior
    e.preventDefault();
    // console.log(input.value);
    const text = input.value;
    input.value = ``;
    const li = createLI(text);
    ul.appendChild(li);
});

ul.addEventListener(`change`, (e) => {
    // console.log(e.target.checked);
    const checkbox = e.target;
    const checked = checkbox.checked;
    const listItem = checkbox.parentNode.parentNode;
    if (checked) {
        listItem.className = `responded`;
    } else {
        listItem.className = ``;
    }
});

ul.addEventListener(`click`, (e) => {
    if ( e.target.tagName === `BUTTON` ) {
        const button = e.target;
        const li = button.parentNode;
        const ul = li.parentNode;
        if ( button.textContent === `remove` ) {
            ul.removeChild(li);
        } else if ( button.textContent === `edit` ) {
            // console.log(`edit`);
            const span = li.firstElementChild;
            const input = document.createElement(`input`);
            input.type = `text`;
            input.value = span.textContent;
            li.insertBefore(input, span);
            li.removeChild(span);
            button.textContent = `save`;
        } else if ( button.textContent === `save` ) {
            // console.log(`save`);
            const input = li.firstElementChild;
            const span = document.createElement(`span`);
            span.textContent = input.value;            
            li.insertBefore(span,input);
            li.removeChild(input);
            button.textContent = `edit`;
        }
    }
});
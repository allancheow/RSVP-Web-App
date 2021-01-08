//console.log(`I'm connected`);

const form = document.getElementById(`registrar`);
const input = form.querySelector(`input`);
const ul = document.getElementById(`invitedList`);

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
    li.textContent = text;
    const label = document.createElement(`label`);
    label.textContent = `Confirmed`;
    // Adds checkbox
    const checkbox = document.createElement(`input`);
    checkbox.type = `checkbox`;
    label.appendChild(checkbox);
    li.appendChild(label);
    // Adds remove button
    const button = document.createElement(`button`);
    button.textContent = `Remove`;
    li.appendChild(button);
    return li;
};

form.addEventListener(`submit`, (e) => {
    // Cancels browsers default submit behavior
    e.preventDefault();
    //console.log(input.value);
    const text = input.value;
    input.value = ``;
    const li = createLI(text);
    ul.appendChild(li);
});

ul.addEventListener(`change`, (e) => {
    //console.log(e.target.checked);
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
    if (e.target.tagName === `BUTTON` ) {
        const li = e.target.parentNode;
        const ul = li.parentNode;
        ul.removeChild(li);
    }
});
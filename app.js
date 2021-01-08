//console.log(`I'm connected`);
document.addEventListener(`DOMContentLoaded`, () => {
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
        function createElement(elementName, property, value) {
            const element = document.createElement(elementName);
            element[property] = value;
            return element;
        }

        function appendToLI(elementName, property, value) {
            const element = createElement(elementName, property, value);
            li.appendChild(element);
            return element;
        }

        const li = document.createElement(`li`);
        appendToLI(`span`, `textContent`, text);
        // Adds checkbox
        appendToLI(`label`, `textContent`, `Confirm`)
            .appendChild(createElement(`input`, `type`, `checkbox`));
        // Adds edit button
        appendToLI(`button`, `textContent`, `edit`);
        // Adds remove button        
        appendToLI(`button`, `textContent`, `remove`);
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
        function createElement(elementName, property, value) {
            const element = document.createElement(elementName);
            element[property] = value;
            return element;
        }

        function appendToLI(elementName, property, value) {
            const element = createElement(elementName, property, value);
            label.appendChild(element);
            return element;
        }
        // console.log(e.target.checked);
        const checkbox = e.target;
        const checked = checkbox.checked;
        const listItem = checkbox.parentNode.parentNode;
        const label = checkbox.parentNode;
        console.log(label.textContent);
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
            const action = button.textContent;
            const nameActions = {
                remove: () => {                
                    ul.removeChild(li);
                },
                edit: () => {
                    const span = li.firstElementChild;
                    const input = document.createElement(`input`);
                    input.type = `text`;
                    input.value = span.textContent;
                    li.insertBefore(input, span);
                    li.removeChild(span);
                    button.textContent = `save`;
                },
                save: () => {
                    const input = li.firstElementChild;
                    const span = document.createElement(`span`);
                    span.textContent = input.value;            
                    li.insertBefore(span,input);
                    li.removeChild(input);
                    button.textContent = `edit`;
                }
            }
            // select and run action in buttons name
            nameActions[action]();
        }
    });
});
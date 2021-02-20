//console.log(`I'm connected`);
document.addEventListener(`DOMContentLoaded`, () => {
    const   form = document.getElementById(`registrar`),
            input = form.querySelector(`input`),
            mainDiv = document.querySelector(`.main`),
            ul = document.getElementById(`invitedList`),
            div = document.createElement(`div`),
            filterLabel = document.createElement(`label`),
            filterCheckBox = document.createElement(`input`);
    let lis = ul.children;

    filterLabel.textContent = `Hide those who haven't responded`;
    filterCheckBox.type = `checkbox`;
    div.appendChild(filterLabel);
    div.appendChild(filterCheckBox);
    mainDiv.insertBefore(div, ul);

    filterCheckBox.addEventListener(`change`, (e) => {
        const isChecked = e.target.checked;
        //const lis = ul.children;
        if (isChecked) {
            for ( let i = 0; i < lis.length; i++ ) {
                let li = lis[i];
                let confirmedText = li.firstElementChild.nextElementSibling;
                if (li.className === `responded` ) {
                    confirmedText.style.display = 'none';
                    li.style.display = ``;
                } else {
                    li.style.display = `none`;
                }
            }
        } else {
            for ( let i = 0; i < lis.length; i++ ) {
                let li = lis[i];
                let confirmedText = li.firstElementChild.nextElementSibling;
                li.style.display = ``;
                confirmedText.style.display = '';
            }
        }
    });


    /**
     * Retrieves input from user to create 
     * list of attendees. Creates <li> with
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
        const text = input.value;
        let dupeName = false;
        
        function alertNotification(color,message) {            
            input.style.backgroundColor = color;
            input.placeholder = message;
        }

        for ( let i = 0; i < lis.length; i++ ) {
            let lisName = lis[i].firstElementChild.textContent;
            text.toLowerCase() === lisName.toLowerCase() ? dupeName = true : null;
        }
        
        if ( text === '') {
            alertNotification(`#ff9999`,`Error: Blank entry, try again.`);
        } else if (dupeName) {
            alertNotification(`#FFA500`,`This name is already on the list`);                
            input.value = ``;
        } else {
            input.style.backgroundColor = `#fff`;
            input.value = ``;
            const li = createLI(text);
            ul.appendChild(li);
            addInvitees(text);
        }
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
        const   checkbox = e.target,
                checked = checkbox.checked,
                listItem = checkbox.parentNode.parentNode,
                label = checkbox.parentNode;
        checked ? (listItem.className = `responded`, label.firstChild.textContent = `Confirmed`) 
            : (listItem.className = ``, label.firstChild.textContent = `Confirm`);
    });

    ul.addEventListener(`click`, (e) => {
        if ( e.target.tagName === `BUTTON` ) {
            const   button = e.target,
                    li = button.parentNode,
                    ul = li.parentNode,
                    action = button.textContent;
            const nameActions = {
                remove: () => {          
                    const liText = li.firstElementChild.textContent;
                    ul.removeChild(li);
                    removeInvitees(liText);
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

    const supportsLocalStorage = () => ('localStorage' in window) && (window['localStorage'] !== null);
    
    const getRecentInvitees = () => {
        const inviteeList = localStorage.getItem('invitees');
        return inviteeList ? JSON.parse(inviteeList) :  [];
    }

    const addInvitees = (string) => {
        const invitees = getRecentInvitees();    
        invitees.push(string);
        localStorage.setItem('invitees', JSON.stringify(invitees));
    }

    const removeInvitees = (string) => {
        const invitees = getRecentInvitees();
        const removedInvitee = invitees.indexOf(string);    
        invitees.splice(removedInvitee,1);
        localStorage.setItem('invitees', JSON.stringify(invitees));
    }
    
    if( supportsLocalStorage ) {
        // Initialize display list
        const recentInvitees = getRecentInvitees();
        input.value = ``;
        recentInvitees.forEach(function(recentInvitees) {
            const newLi = createLI(recentInvitees);
            ul.appendChild(newLi);
        });
    }
});
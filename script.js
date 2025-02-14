const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Function to add a task
function addTask() {
    if (inputBox.value.trim() === '') {
        alert('You must write something!');
    } else {
        // Create a new list item
        let li = document.createElement('li');
        li.textContent = inputBox.value;

        // Create delete button
        let span = document.createElement('span');
        span.innerHTML = '\u00d7'; // Unicode for "×" (close button)
        span.style.marginLeft = "10px"; // Add spacing
        span.style.cursor = "pointer"; // Pointer on hover
        span.style.color = "red"; // Red color for visibility
        span.style.fontSize = "18px"; // Proper font size

        li.appendChild(span);
        listContainer.appendChild(li);
        
        // Save task data to local storage
        saveData();
    }

    inputBox.value = ''; // Clear input field
}

// Event listener for checking and deleting tasks
listContainer.addEventListener('click', function (e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
        saveData();
    } else if (e.target.tagName === 'SPAN') {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

// Function to save tasks to local storage
function saveData() {
    const tasks = [];
    const items = listContainer.querySelectorAll('li');
    
    items.forEach(item => {
        tasks.push({
            text: item.textContent.replace('×', '').trim(), // Save task text, removing the "×"
            checked: item.classList.contains('checked') // Save checked state
        });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to display saved tasks from local storage
function showTask() {
    const savedTasks = localStorage.getItem('tasks');
    
    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.text;
            
            if (task.checked) {
                li.classList.add('checked');
            }

            const span = document.createElement('span');
            span.innerHTML = '\u00d7'; // Unicode for "×" (close button)
            span.style.marginLeft = "10px";
            span.style.cursor = "pointer";
            span.style.color = "red";
            span.style.fontSize = "18px";

            li.appendChild(span);
            listContainer.appendChild(li);
        });
    }
}

// Call showTask() when the page loads to show saved tasks
showTask();

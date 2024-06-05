firebase.initializeApp((
    apikey:"YOUR_API_KEY",
    authDomain:"YOUR_AUTH_DOMAIN",
    projectId:"YOUR_PROJECT_ID",
));


const db = firebase.firestore();

function addTask() {
    const taskInput = document.getElementById("task-input");
    const task = taskInput.value.trim();
    if (task !="") {
        db.collection("task").add({
            task: task,
            timestamp: firebase.firestore.Fieldvalue.serverTimestamp(),
        });
        taskInput.value = "";
    }
}

function renderTasks(doc) {
    const taskList = document.getElementById("task-list");
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.innerHTML = '
      <span>${doc.data().task}</span> 
      <button onclick="deleteTask('${doc.id}')">Delete</button> 
    ';
    taskList.appendChild(taskItem);
}

db.collection("task")
   .orderBy("timestamp", "desc")
   .onSnapshot(snapshot => {
    const changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type == "added") {
            renderTasks(change.doc);
        }
    });
   });


function deleteTask(id) {
    db.collection("task").doc(id).delete();
}
```



// Problem: User interaction doesn't provide desired results.
// Solution: Add interactivity so the user can manage daily tasks

var taskInput = document.getElementById("new-task");
var taskInputHeader = document.getElementById("header-task");
var addButton = document.getElementsByTagName("button")[0];
var sortButton = document.getElementsByTagName("button")[1];
    sortButton.innerText = "Сортировка (А-Я)";
var delete_all_task = document.getElementsByTagName("button")[2];
var incompleteTasksHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");
  if (localStorage.length <= 1) {
    task_count = 0;
  } else {
    task_count = (localStorage.length-1)/4;
  }
  if (localStorage.length <= 1) {
    task_storage_count = 1;
  } else {
    task_storage_count = localStorage.getItem("start_count");
  }


//New Task List Item
function createNewTaskElement(taskString, headerTaskString, complete_status, id_status) {
  //Create List Item
  var listItem = document.createElement("div");


  //label-header
  var label_header = document.createElement("label");
   //label-header-description
  var label_header_description = document.createElement("label");
  //input (checkbox)
  // var checkBox = document.createElement("input"); // checkbox
  //label
  var label = document.createElement("label");
  //input (text)
  var editInput = document.createElement("textarea"); // text
  //button.edit
  var editButton = document.createElement("button");
  //button.delete
  var deleteButton = document.createElement("button");
  var deselectButton = document.createElement("button");

  // var label_header_description_div = document.createElement("div");
  // var label_div = document.createElement("div");
  
      //Each element needs modifying
  
  // checkBox.type = "checkbox";
  if (id_status == "none") {
    listItem.id_value = "task_" + task_storage_count;
  } else {
    listItem.id_value = id_status;
  }
  // listItem.id_value = "task_" + task_storage_count;
  if (complete_status == "none") {
    listItem.complete = "incomplete";
  } else {
    listItem.complete = complete_status;
  }
  
  listItem.header_value_localstorage = headerTaskString;
  listItem.description_value_localstorage = taskString;
  // listItem.header_value = headerTaskString;
  // listItem.description_value = taskString;
  editInput.className = "editInput";
  label_header.className = "label_header";
  listItem.className = "listItem";
  label.className = "label_description";
  label_header_description.className = "label_header_description";
  label_header_description.innerText = "Описание:";



  editButton.innerText = "Редактировать описание";
  editButton.className = "edit";
  deleteButton.innerText = "Удалить";
  deleteButton.className = "delete";
  deselectButton.className= "deselect";
  deselectButton.innerText = "Пометить как завершенное";
  
  label.innerText = taskString;
  if (taskString.replace(/\s/g, '') == "") {label_header_description.style.display = "none"}
  label_header.innerText = headerTaskString;
  
    
      // each element needs appending
  // listItem.appendChild(header);
  // listItem.appendChild(checkBox);
  listItem.appendChild(label_header);
  listItem.appendChild(label_header_description);
  // label_header_description_div.appendChild(label_header_description);
  listItem.appendChild(label);
  // label_div.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  listItem.appendChild(deselectButton);

  return listItem;
}

// Add a new task
var addTask = function() {
  console.log("Add task...");
  //Create a new list item with the text from #new-task:
  var listItem = createNewTaskElement(taskInput.value, taskInputHeader.value, "none", "none");
  //Append listItem to incompleteTasksHolder
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);  

  // localStorage.setItem(listItem.id_value + "_header_value", listItem.header_value_localstorage);  
  localStorage.setItem(listItem.id_value + "_header_value", listItem.header_value_localstorage);  
  localStorage.setItem(listItem.id_value + "_complete", listItem.complete);
  localStorage.setItem(listItem.id_value + "_description_value", listItem.description_value_localstorage);
  localStorage.setItem(listItem.id_value + "_id", listItem.id_value);
  task_storage_count++;
  localStorage.setItem("start_count", task_storage_count);

  taskInput.value = ""; 
  taskInputHeader.value = "";
  $('.add_button').attr('disabled',true);
  $('.add_button').removeClass("add_button_hover");
  $('.add_button').addClass("disable_add_button");
  task_count++;
  if (task_count>=2) {
    $('.sort_button').addClass("sort_button_hover");
    $('.sort_button').removeClass("disable_sort_button");
    $('.delete_all_task').addClass("delete_all_task_hover");
    $('.delete_all_task').removeClass("disable_delete_all_task");
  } else {
    $('.sort_button').removeClass("sort_button_hover");
    $('.sort_button').addClass("disable_sort_button");
    $('.delete_all_task').removeClass("delete_all_task_hover");
    $('.delete_all_task').addClass("disable_delete_all_task");
  }
  
  
}

// Edit an existing task
var editTask = function() {
  console.log("Edit Task...");
  
  var listItem = this.parentNode;
  
  var editInput = listItem.querySelector("textarea");
  var label = listItem.querySelectorAll("label");
  var edit_button = listItem.querySelectorAll("button")[0];
  
  var containsClass = listItem.classList.contains("editMode");
    //if the class of the parent is .editMode 
  if(containsClass) {
      //switch from .editMode 
      //Make label text become the input's value
    editInput.value = editInput.value.replace(/\s/g, '') == "" ? "" : editInput.value; 
    if (editInput.value == "") {
      $(label[1]).hide();
    } else {
      $(label[1]).show();
    }
    label[2].innerText = editInput.value;
    $(edit_button).removeClass("edit_description");
    // label[1].innerText = editInput[1].value;
  } else {
      //Switch to .editMode
      //input value becomes the label's text
    editInput.value = label[2].innerText;
    $(edit_button).addClass("edit_description");
    // editInput[1].value = label[1].innerText;
  }
  
    // Toggle .editMode on the parent
  listItem.classList.toggle("editMode");
 
}


// Delete an existing task
var deleteTask = function() {
  console.log("Delete task...");
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  localStorage.removeItem(listItem.id_value + "_header_value");  
  localStorage.removeItem(listItem.id_value + "_complete");
  localStorage.removeItem(listItem.id_value + "_description_value");
  localStorage.removeItem(listItem.id_value + "_id");
  
  //Remove the parent list item from the ul
  ul.removeChild(listItem);
  task_count--;
  if (task_count>=2) {
    $('.sort_button').addClass("sort_button_hover");
    $('.sort_button').removeClass("disable_sort_button");
    $('.delete_all_task').addClass("delete_all_task_hover");
    $('.delete_all_task').removeClass("disable_delete_all_task");
  } else {
    $('.sort_button').removeClass("sort_button_hover");
    $('.sort_button').addClass("disable_sort_button");
    $('.delete_all_task').removeClass("delete_all_task_hover");
    $('.delete_all_task').addClass("disable_delete_all_task");
  }
  
}

// Mark a task as complete 
var taskCompleted = function() {
  console.log("Task complete...");
  //Append the task list item to the #completed-tasks
  var listItem = this.parentNode;
  listItem.querySelectorAll("button")[2].innerText = "Пометить как не завершенное";
  $(listItem.querySelectorAll("button")).not(listItem.querySelectorAll("button")[1]).addClass("incompleted_all_button");
  $(listItem.querySelectorAll("button")[1]).css("background-color", "grey", 'important').css("color", "white", 'important');
  localStorage.setItem(listItem.id_value + "_complete", "complete");
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

// Mark a task as incomplete
var taskIncomplete = function() {
  console.log("Task Incomplete...");
  // When checkbox is unchecked
  // Append the task list item #incomplete-tasks
  var listItem = this.parentNode;
  listItem.querySelectorAll("button")[2].innerText = "Пометить как завершенное";
  $(listItem.querySelectorAll("button")).removeClass("incompleted_all_button");
  $(listItem.querySelectorAll("button")[1]).css("background-color", "white", 'important').css("color", "black", 'important');
  localStorage.setItem(listItem.id_value + "_complete", "incomplete");
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, buttonEventHandler) {
  console.log("Bind list item events");
  //select taskListItem's children
  var button_incomplete = taskListItem.querySelector("button.deselect");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
  
  //bind editTask to edit button
  editButton.onclick = editTask;
  
  //bind deleteTask to delete button
  deleteButton.onclick = deleteTask;
  
  //bind buttonEventHandler to checkbox
  button_incomplete.onclick = buttonEventHandler;
}

var ajaxRequest = function() {
  console.log("AJAX Request");
}

var sortTask = function() {
  if (sortButton.value == "abc") {
    var ul_incomplete = document.querySelector('#incomplete-tasks'),
    ul_incomplete_Children = [].slice.apply(ul_incomplete.children),
    count = ul_incomplete_Children.length;

    while (ul_incomplete.firstChild) {
      ul_incomplete.removeChild(ul_incomplete.firstChild);
    }

    for (var i = 0; i < count; i++) {
      for (var j = 0; j < count-1; j++) {
        if (ul_incomplete_Children[j].querySelector('.label_header').innerHTML > ul_incomplete_Children[j+1].querySelector('.label_header').innerHTML) {
          var max = ul_incomplete_Children[j];
          ul_incomplete_Children[j] = ul_incomplete_Children[j + 1];
          ul_incomplete_Children[j + 1] = max;
        }
      }
    }

    ul_incomplete_Children.forEach(function(item) {
      ul_incomplete.appendChild(item);
    });

    var ul_complete = document.querySelector('#completed-tasks'),
    ul_complete_Children = [].slice.apply(ul_complete.children),
    count = ul_complete_Children.length;

    while (ul_complete.firstChild) {
      ul_complete.removeChild(ul_complete.firstChild);
    }

    for (var i = 0; i < count; i++) {
      for (var j = 0; j < count-1; j++) {
        if (ul_complete_Children[j].querySelector('.label_header').innerHTML > ul_complete_Children[j+1].querySelector('.label_header').innerHTML) {
          var max = ul_complete_Children[j];
          ul_complete_Children[j] = ul_complete_Children[j + 1];
          ul_complete_Children[j + 1] = max;
        }
      }
    }

    ul_complete_Children.forEach(function(item) {
      ul_complete.appendChild(item);
    });
    sortButton.innerText = "Сортировка (Я-А)";
    sortButton.value = "zyx";
  } else if (sortButton.value == "zyx") {
    var ul_incomplete = document.querySelector('#incomplete-tasks'),
    ul_incomplete_Children = [].slice.apply(ul_incomplete.children),
    count = ul_incomplete_Children.length;

    while (ul_incomplete.firstChild) {
      ul_incomplete.removeChild(ul_incomplete.firstChild);
    }

    for (var i = 0; i < count; i++) {
      for (var j = 0; j < count-1; j++) {
        if (ul_incomplete_Children[j].querySelector('.label_header').innerHTML < ul_incomplete_Children[j+1].querySelector('.label_header').innerHTML) {
          var max = ul_incomplete_Children[j];
          ul_incomplete_Children[j] = ul_incomplete_Children[j + 1];
          ul_incomplete_Children[j + 1] = max;
        }
      }
    }

    ul_incomplete_Children.forEach(function(item) {
      ul_incomplete.appendChild(item);
    });
    var ul_complete = document.querySelector('#completed-tasks'),
    ul_complete_Children = [].slice.apply(ul_complete.children),
    count = ul_complete_Children.length;

    while (ul_complete.firstChild) {
      ul_complete.removeChild(ul_complete.firstChild);
    }

    for (var i = 0; i < count; i++) {
      for (var j = 0; j < count-1; j++) {
        if (ul_complete_Children[j].querySelector('.label_header').innerHTML < ul_complete_Children[j+1].querySelector('.label_header').innerHTML) {
          var max = ul_complete_Children[j];
          ul_complete_Children[j] = ul_complete_Children[j + 1];
          ul_complete_Children[j + 1] = max;
        }
      }
    }

    ul_complete_Children.forEach(function(item) {
      ul_complete.appendChild(item);
    });
    sortButton.innerText = "Сортировка (А-Я)";
    sortButton.value = "abc";
  }
}

var delete_all_task_in_list = function() {
  
  if(confirm("Вы точно хотите удалить все записи?")) {
    var ul_complete = document.querySelector('#completed-tasks'),
    ul_complete_Children = [].slice.apply(ul_complete.children),
    count = ul_complete_Children.length;

    while (ul_complete.firstChild) {
      ul_complete.removeChild(ul_complete.firstChild);
    }

    var ul_incomplete = document.querySelector('#incomplete-tasks'),
    ul_incomplete_Children = [].slice.apply(ul_incomplete.children),
    count = ul_incomplete_Children.length;

    while (ul_incomplete.firstChild) {
      ul_incomplete.removeChild(ul_incomplete.firstChild);
    }

    $('.delete_all_task').removeClass("delete_all_task_hover");
    $('.delete_all_task').addClass("disable_delete_all_task");
    $('.sort_button').removeClass("sort_button_hover");
    $('.sort_button').addClass("disable_sort_button");
    task_count = 0;
    localStorage.clear();
  }
}

// Set the click handler to the addTask function
//addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);
sortButton.addEventListener("click", sortTask);
delete_all_task.addEventListener("click", delete_all_task_in_list);


// Cycle over the incompleteTaskHolder ul list items
for(var i = 0; i <  incompleteTasksHolder.children.length; i++) {
    // bind events to list item's children (taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}
// Cycle over the completeTaskHolder ul list items
for(var i = 0; i <  completedTasksHolder.children.length; i++) {
    // bind events to list item's children (taskIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete); 

}

$(document).ready(function(){
    $('.add_button').attr('disabled',true);
    $('.add_button').removeClass("add_button_hover");
    $('.add_button').addClass("disable_add_button");
    $('#header-task').keyup(function(){
        if($(this).val().length !=0) {
            $('.add_button').attr('disabled', false);  
            $('.add_button').addClass("add_button_hover");
            $('.add_button').removeClass("disable_add_button");
        }       
        else {
            $('.add_button').attr('disabled',true);
            $('.add_button').removeClass("add_button_hover");
            $('.add_button').addClass("disable_add_button");
        }
    })
});
  if (localStorage.length < 9) {
    $('.sort_button').removeClass("sort_button_hover");
    $('.sort_button').addClass("disable_sort_button");
    $('.delete_all_task').removeClass("delete_all_task_hover");
    $('.delete_all_task').addClass("disable_delete_all_task");
  }



  // localStorage.setItem("bar", 111);
  // console.log(localStorage["bar"]);

  // var ul_incomplete_local_store = document.querySelector('#incomplete-tasks'),
  //   ul_incomplete_local_store_Children = [].slice.apply(ul_incomplete_local_store.children);
  // var ul_complete_local_store = document.querySelector('#completed-tasks'),
  //   ul_complete_local_store_Children = [].slice.apply(ul_complete_local_store.children);
  //   console.log(ul_incomplete_local_store_Children, ul_complete_local_store_Children);


    //  local_storage_DOM_complete = localStorage.getItem("complete") != "" ? JSON.parse(localStorage.getItem("complete")) : {};
    // //  local_storage_DOM_complete.forEach(function(item) {
    // //   document.querySelector('#completed-tasks').appendChild(item);
    // // });
    // local_storage_DOM_incomplete = localStorage.getItem("incomplete") != "" ? JSON.parse(localStorage.getItem("incomplete")) : {};
    // // local_storage_DOM_incomplete = JSON.parse(localStorage.getItem("incomplete"));
    // //  local_storage_DOM_incomplete.forEach(function(item) {
    // //   document.querySelector('#incomplete-tasks').appendChild(item);
    // // });

    // localStorage.setItem("obj", JSON.stringify([1,2]));
    // if (localStorage.length !== 0) {
    //   for (key in localStorage) {
    //     value_of_task_from_storage = JSON.parse(localStorage[key]);
    //     console.log(localStorage[key]);
    //     var listItem = createNewTaskElement(value_of_task_from_storage[0], value_of_task_from_storage[1]);
    //     //Append listItem to incompleteTasksHolder
    //     if (value_of_task_from_storage[2] == "incomplete") {
    //       listItem.querySelectorAll("button")[2].innerText = "Пометить как завершенное";
    //       $(listItem.querySelectorAll("button")).removeClass("incompleted_all_button");
    //       $(listItem.querySelectorAll("button")[1]).css("background-color", "white", 'important').css("color", "black", 'important');
    //       incompleteTasksHolder.appendChild(listItem);
    //       bindTaskEvents(listItem, taskCompleted);
    //     } else if (value_of_task_from_storage[2] == "complete") {
    //       listItem.querySelectorAll("button")[2].innerText = "Пометить как не завершенное";
    //       $(listItem.querySelectorAll("button")).not(listItem.querySelectorAll("button")[1]).addClass("incompleted_all_button");
    //       $(listItem.querySelectorAll("button")[1]).css("background-color", "grey", 'important').css("color", "white", 'important');
    //       completedTasksHolder.appendChild(listItem);
    //       bindTaskEvents(listItem, taskIncomplete);
    //     }
        
    //   }
    // }
    var header_array= [];
    var header_array_count = 0;
    var complete_array= [];
    var complete_array_count = 0;
    var description_array= [];
    var description_array_count = 0;
    var id_array = [];
    var id_array_count = 0;

    if (localStorage.length > 1) {
      for (key in localStorage) {
        if (key.search("_header_value") != -1) {
          header_array[header_array_count] = localStorage.getItem(key);
          header_array_count++;
        }
        if (key.search("_complete") != -1) {
          complete_array[complete_array_count] = localStorage.getItem(key);
          complete_array_count++;
        }
        if (key.search("_description_value") != -1) {
          description_array[description_array_count] = localStorage.getItem(key);
          description_array_count++;
        }
        if (key.search("_id") != -1) {
          id_array[id_array_count] = localStorage.getItem(key);
          id_array_count++;
        }
      }
    }

    for (var i = 0; i < header_array_count; i++) {
        if (complete_array[i] == "incomplete") {
       listItem = createNewTaskElement(description_array[i], header_array[i], complete_array[i], id_array[i]);
       listItem.querySelectorAll("button")[2].innerText = "Пометить как завершенное";
        $(listItem.querySelectorAll("button")).removeClass("incompleted_all_button");
        $(listItem.querySelectorAll("button")[1]).css("background-color", "white", 'important').css("color", "black", 'important');
       incompleteTasksHolder.appendChild(listItem);
       bindTaskEvents(listItem, taskCompleted); 
       } else if (complete_array[i] == "complete") {
        listItem = createNewTaskElement(description_array[i], header_array[i], complete_array[i], id_array[i]);
        listItem.querySelectorAll("button")[2].innerText = "Пометить как не завершенное";
        $(listItem.querySelectorAll("button")).not(listItem.querySelectorAll("button")[1]).addClass("incompleted_all_button");
        $(listItem.querySelectorAll("button")[1]).css("background-color", "grey", 'important').css("color", "white", 'important');
       completedTasksHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskIncomplete); 
       }
    }






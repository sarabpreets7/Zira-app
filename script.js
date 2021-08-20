let tc = document.querySelector(".ticket-container");
let allFilters = document.querySelectorAll(".filter");
let modalVisible = false;
let removee = document.querySelector(".delete");
removee.addEventListener
let priorityColor;
let deleteBtn = document.querySelector(".delete");
function generateUID() {
    // I generate the UID from two parts here 
    // to ensure the random number provide enough bits.
    var firstPart = (Math.random() * 46656) | 0;
    var secondPart = (Math.random() * 46656) | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-3);
    secondPart = ("000" + secondPart.toString(36)).slice(-3);
    return firstPart + secondPart;
}
deleteBtn.addEventListener("click",function(e){
    let selectedTickets = document.querySelectorAll(".ticket.active");
    let allTasks = JSON.parse(localStorage.getItem("allTasks"));
    for(let i=0;i<selectedTickets.length;i++){
        selectedTickets[i].animate({
            "width":"0vw"
        },300);
        setTimeout(() => {
            selectedTickets[i].remove();
        }, 300);
        
        let ticketid = selectedTickets[i].querySelector(".ticket-id").innerText;
        allTasks = allTasks.filter(function(data){
            return (("#"+data.tickedtId)!=ticketid);
        }) 
    }
    localStorage.setItem("allTasks",JSON.stringify(allTasks))
})
loadTickets();

function loadTickets(color){
    let allTaskss = localStorage.getItem("allTasks");
    if(allTaskss!=null){
        allTaskss = JSON.parse(allTaskss);
        if(color){
            allTaskss = allTaskss.filter(function(data){
                return (data.priority==color);
            })

        }
        
        for(let j=0;j<allTaskss.length;j++){
            let ticket = document.createElement("div");
            ticket.classList.add("ticket");
            ticket.innerHTML = `
            <div class="ticket-color ticket-color-${allTaskss[j].priority}"></div>
            <div class="ticket-id">#${allTaskss[j].tickedtId}</div>
            
            <div class="task">${allTaskss[j].task}</div>`
            console.log(allTaskss[j].tickedtId);
            console.log(allTaskss[j].task)
        
        tc.appendChild(ticket);
       
        ticket.addEventListener("click",function(e){
            if(e.currentTarget.classList.contains("active")){
                e.currentTarget.classList.remove("active");
            }
            else{
                e.currentTarget.classList.add("active");
            }
        })
    
        }
    }

}







for(let i=0;i<allFilters.length;i++){
    allFilters[i].addEventListener("click",filterHandler);
}

function filterHandler(e){
    tc.innerHTML="";
    if(e.currentTarget.classList.contains("active")){
        e.currentTarget.classList.remove("active");
        loadTickets();
    }
    else{
        let activeFilter = document.querySelector(".filter.active");
        if(activeFilter){
            activeFilter.classList.remove("active");
            
        }
        e.currentTarget.classList.add("active");
    let priority = e.currentTarget.children[0].classList[0].split("-")[0];
    loadTickets(priority);
    console.log(priority);
           
    }
    

}
let addBtn = document.querySelector(".add");
addBtn.addEventListener("click",showModal);

function showModal(e){
    if(!modalVisible){
        let modal = document.createElement("div");
        modal.classList.add("modal");
        modal.innerHTML = ` 
        <div class="task-to-be-added" data-typed="false" contenteditable="true">Enter your task here</div>
        <div class="modal-priority-list">
                <div class="modal-pink-filter modal-filter active"></div>
                <div class="modal-blue-filter modal-filter"></div>
                <div class="modal-green-filter modal-filter"></div>
                <div class="modal-yellow-filter modal-filter"></div>
            
        </div>
    </div>`
    modal.animate(
        {"height": "45vh",
        "width":"44vw"
      }
        
         
    ,300);
    // setTimeout(() => {
    //     selectedTickets[i].remove();
    // }, 300);
    
    tc.appendChild(modal);
    modalVisible=true;
    
    let task = document.querySelector(".task-to-be-added");
    priorityColor="pink";
    task.addEventListener("click",function(e){
        if(e.currentTarget.getAttribute("data-typed")=="false"){
            e.currentTarget.innerText = "";
            e.currentTarget.setAttribute("data-typed","true");
        }
    })
    
    let modalFilter = document.querySelectorAll(".modal-filter");
    for(let i=0;i<modalFilter.length;i++){
        modalFilter[i].addEventListener("click",selectFilter.bind(this,task));
    }
    task.addEventListener("keypress",addTicket.bind(this,task));
        
    }
    
    

}

function selectFilter(task,e){
    let activeFilter = document.querySelector(".modal-filter.active");
    let colore = e.currentTarget.classList[0].split("-")[1];
    priorityColor=colore;
    activeFilter.classList.remove("active");
    e.currentTarget.classList.add("active");
    task.click();
    task.focus();

}
function addTicket(task,e){
    if(e.key=="Enter" && e.shiftKey == false && task.innerText.trim()!=""){
        let taskContent = task.innerText;
        let id = generateUID()
        console.log("id:",id)
        let ticket = document.createElement("div");
        ticket.classList.add("ticket");
        ticket.innerHTML = `
        <div class="ticket-color ticket-color-${priorityColor}"></div>
        <div class="ticket-id">#${id}</div>
        <div class="task">${taskContent}</div>`
    
     
    document.querySelector(".modal").remove();
    
    // setTimeout(() => {
    //     selectedTickets[i].remove();
    // }, 300);


    //tc.appendChild(ticket);
    modalVisible=false;
    // ticket.addEventListener("click",function(e){
    //     if(e.currentTarget.classList.contains("active")){
    //         e.currentTarget.classList.remove("active");
    //     }
    //     else{
    //         e.currentTarget.classList.add("active");
    //     }
    // })
    let allTasks = localStorage.getItem("allTasks");
    
    if(allTasks==null){
        let data= [{"tickedtId":id,"task":taskContent,"priority":priorityColor}];
        localStorage.setItem("allTasks",JSON.stringify(data));
        
    }
    else{
        let data = JSON.parse(allTasks);
        data.push({"tickedtId":id,"task":taskContent,"priority":priorityColor});
        localStorage.setItem("allTasks",JSON.stringify(data))
        
    }
    let activeFilter = document.querySelector(".filter.active");
    tc.innerHTML="";
    if(activeFilter){
        let colour = activeFilter.children[0].classList[0].split("-")[0];
        loadTickets(colour);
    }
    else{
        loadTickets();
    }
    }
    else if(e.key=="Enter" && e.shiftKey==false){
        e.preventDefault();
        alert("Error!");
    }
    
}

   






   

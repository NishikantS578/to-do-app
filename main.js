
//card data
let default_task=[["title","description is going to be too long for this card this work is to be done quickly as soon as possible at this place ","dueDate","priority"],["work","work","2/2/2022",3]]
let today=[["title","description","dueDate","priority"]]
let tasks=[["title","description","dueDate","priority"]]
let notes=[["title","description","dueDate","priority"]]// select all tabs
let contents=[default_task,today,tasks,notes]

//link tabs and content
let tabs_node=document.querySelectorAll(".sidebar .tab");
let content=document.querySelector(".content")
let current_tab=0
//returns tab object
function tab(tab,content_array){
    let content=content_array
    return {tab,content}
}
let form_container=document.querySelector(".form-container")
//tabs click listener
let tabs=[]
for(i=0;i<tabs_node.length;i++){
    tabs[i]=tab(tabs_node[i],contents[i])
    tabs[i].tab.setAttribute("data",`${i}`)
    tabs[i].tab.addEventListener("click",function(e){
        let cards=content.children
        let j=cards.length
        current_tab=parseInt(e.target.getAttribute("data"))
        for(i=0;i<j;i++){
            content.removeChild(cards[0])
        }
        for(i=0;i<tabs[parseInt(e.target.getAttribute("data"))].content.length;i++){
            new_card=card(tabs[parseInt(e.target.getAttribute("data"))].content[i],parseInt(e.target.getAttribute("data")),i)
            new_card.displayCard()
        }
        let add_card=document.createElement("div")
        add_card.setAttribute("class","add card")
        add_card.innerHTML="+"
        add_card.addEventListener("click",function(){
            form_container.style.visibility="visible"
        })
        content.appendChild(add_card)
    })
}
current_tab=0

tabs[0].tab.click()

function card(arr,i,j){
    let new_card=document.createElement("div")
    new_card.setAttribute("class","card")
    new_card.innerHTML=`
    <h3>Title :${arr[0]}</h3>
    <h4>Description :</h4>
    <p>${arr[1]}</p>
    <div>
    <div>Due-date :${arr[2]}</div>
    <div>Priority :${arr[3]}</div>
    </div>
    <button data1="${i}" data2="${j}">Remove</button>
    `
    let remove=new_card.querySelector("button")
    remove.addEventListener("click",function(e){
        tabs[e.target.getAttribute("data1")].content.splice(e.target.getAttribute("data2"),1)
        tabs[e.target.getAttribute("data1")].tab.click()
    })
    function displayCard(){
        content.appendChild(new_card)
    }
    return {displayCard}
}
let done=document.querySelector(".done")
let form=document.querySelector(".form")
done.addEventListener("click",function(){
    tabs[current_tab].content.push([form.querySelector(".title").value,form.querySelector(".desc").value,form.querySelector(".date").value,form.querySelector(".priority").value])
    form_container.style.visibility="hidden"
    tabs[current_tab].tab.click()
})

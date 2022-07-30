let myLeads = []
let oldLeads = []


const inputBtnEl = document.getElementById("input-btn-el")
const inputEl = document.getElementById("input-el")
const Ulel = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")


const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

function render(leads) {
    let listItems = ""
    for (i = 0; i < leads.length; i++) {

        listItems += `
        <li>
            <a target ='_blank' href='${leads[i]}'>
                ${leads[i]}
            </a>
        </li>
        `

    }

    Ulel.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function () {

    localStorage.clear()
    myLeads = []
    render(myLeads)

})


inputBtnEl.addEventListener("click", function () {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)

    console.log(localStorage.getItem("myLeads"));


})


document.addEventListener('submit', async (e) => {
    try{
        e.preventDefault();

        var money = e.target.money.value;
        var description = e.target.description.value;
        var category = e.target.category.value;
    
        var user = {
            money: `${money}`,
            description: `${description}`,
            category: `${category}`
        }
        const response = await axios.post(`http://localhost:3000/expenses/add-expense`,user)
        console.log(response)
        showDetailsOnDisplay(response.data.newExpense)
    }
    catch(err){
        console.log(err)
    }
})

window.addEventListener('DOMContentLoaded',(e) => {
    e.preventDefault()
    const getData = async() => {
        try{
            const response = await axios.get(`http://localhost:3000/expenses`)
            console.log(response)
            let data = response.data;
            for(let i=0;i<data.length;i++){
                showDetailsOnDisplay(data[i])
            }
        }
        catch(err){
            console.log(err)
        }
    }
    getData()
})

const showDetailsOnDisplay = async(data) => {
    try{
        await axios.get(`http://localhost:3000/expenses/${data.id}`)
        var parentNode = document.getElementById('resultContainer');
        var childNode = `<li id=${data.id}>${data.money} Rupees for ${data.description}-${data.category}
                    <button id="editBtn" onclick="editData('${data.id}')">Edit</button>
                    <button id="deleteBtn" onclick="deleteData('${data.id}')">X</button>
                    </li>`
        parentNode.innerHTML += childNode;
        document.getElementById('money').value = ""
        document.getElementById("description").value = ""
    }
    catch(err) {
        console.log(err)
    }
}

const deleteData = async (userId) => {
    try{
        await axios.delete(`http://localhost:3000/delete-expense/${userId}`)
        deleteDataFromDisplay(userId)
    }
    catch(err){
        console.log(err)
    }
}

const deleteDataFromDisplay = async(userId)=> {
    let parentNode  = document.getElementById("resultContainer")
    let childNode = document.getElementById(userId)
    parentNode.removeChild(childNode)
}

const editData = async(userId) => {
    try{
        const response = await axios.get(`http://localhost:3000/expenses/edit-expense/${userId}`)
        console.log(response)
        document.getElementById('money').value = response.data.money;
        document.getElementById("description").value = response.data.description;
        document.getElementById('category').value = response.data.category;
        deleteData(userId)
    }
    catch(err) {
        console.log(err)
    }
}

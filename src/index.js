document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/dogs')
    .then(resp=>resp.json())
    .then(dogs=>dogs.forEach(dog=>printDog(dog)))
})

function printDog(dogInfo){
    const tableBody = document.getElementById('table-body')
    
    const row = document.createElement('tr')
    row.id = dogInfo.id
    const name = document.createElement('td')
    name.innerText = dogInfo.name
    const breed = document.createElement('td')
    breed.innerText = dogInfo.breed
    const sex = document.createElement('td')
    sex.innerText = dogInfo.sex
    const buttonTD = document.createElement('td')
    const button = document.createElement('button')
    button.className = 'edit-button'
    button.innerText = 'Edit'

    buttonTD.appendChild(button)
    row.appendChild(name)
    row.appendChild(breed)
    row.appendChild(sex)
    row.appendChild(buttonTD)
    tableBody.appendChild(row)

    button.addEventListener('click', e=>editDog(e.target.parentNode.parentNode))
}

function editDog(info){
    let name = info.cells[0].innerText
    let breed = info.cells[1].innerText
    let sex = info.cells[2].innerText
    const editForm = document.getElementById('dog-form') 
    editForm.elements['name'].value = name
    editForm.elements['breed'].value = breed
    editForm.elements['sex'].value = sex
    
    editForm.addEventListener('submit', e=>{
        e.preventDefault()

        fetch(`http://localhost:3000/dogs/${info.id}`, {
            method: 'PATCH',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                'name': e.target.elements[0].value,
                'breed': e.target.elements[1].value,
                'sex': e.target.elements[2].value
            })
        })
        .then(resp=>resp.json())
        .then(data=>{
            info.cells[0].innerText = data.name
            info.cells[1].innerText = data.breed
            info.cells[2].innerText = data.sex
        })
    })
}

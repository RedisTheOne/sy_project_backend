document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()

    const name = document.getElementById('name').value
    const surname = document.getElementById('surname').value
    const address = document.getElementById('address').value
    const description = document.getElementById('description').value
    const password = document.getElementById('password').value
    const email = document.getElementById('email').value
    const phone_number = document.getElementById('phone_number').value
    const body = JSON.stringify({ email, name, surname, address, description, phone_number, password })
    document.getElementById('addBtn').value = 'DUKE U SHTUAR'

    fetch('/api/users/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body
    })
        .then(res => res.json())
        .then(data => {
            window.location.href = '/lista/njerez-ne-nevoje'
        })
    
})
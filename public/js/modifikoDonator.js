document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()

    const name = document.getElementById('name').value
    const surname = document.getElementById('surname').value
    const address = document.getElementById('address').value
    const email = document.getElementById('email').value
    const phone_number = document.getElementById('phone_number').value
    const username = document.getElementById('username').value
    const body = JSON.stringify({ email, name, surname, address, phone_number, username })
    document.getElementById('addBtn').value = 'DUKE U MODIFIKUAR'

    fetch('/api/donors/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body
    })
        .then(res => res.json())
        .then(data => {
            window.location.href = '/lista/donator'
        })
    
})
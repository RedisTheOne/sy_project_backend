const options = document.querySelectorAll('.select-option')

document.querySelector('select').selectedIndex = -1

document.getElementById('filter').addEventListener('input', (e) => {
    const value = e.target.value
    if(value.length === 0) {
        options.forEach((o) => o.style.display = '');
    } else {
        options.forEach((o) => {
            if(o.innerHTML.toLowerCase().indexOf(value.toLowerCase()) > -1) 
                o.style.display = ''
            else
                o.style.display = 'none'
        })
        document.querySelector('select').selectedIndex = -1
    }
})

document.getElementById('delete-btn').addEventListener('click', (e) => {
    e.target.innerHTML = 'DUKE U FSHIRE'
    const select = document.querySelector('select')
    const number = select.options[select.selectedIndex].id
    const body = JSON.stringify({ number })
    fetch('/api/users/remove', {
        method: 'DELETE',
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
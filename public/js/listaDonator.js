const usernames = document.querySelectorAll('.username')
const rows = document.querySelectorAll('.table-row')

document.getElementById('filter').addEventListener('input', (e) => {
    const value = e.target.value
    if(value.length === 0) {
        rows.forEach((r) => r.style.display = '');
    } else {
        rows.forEach((r, i) => {
            if(usernames[i].innerHTML.indexOf(value.toLowerCase()) > -1) 
                r.style.display = ''
            else
                r.style.display = 'none'
        })
    }
})
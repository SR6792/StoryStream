const table = document.querySelector(".tb");

async function loadPending(x) {
    try {
        const data = await fetch('/all');
        const resp = await data.json();
        table.innerHTML = '';
        resp.forEach((p, index) => {
            if (p._id != x && p.status == 'pending') {
                const row = document.createElement('tr');
                row.innerHTML += `
                                    <td>${index + 1}</td>
                                    <td>${p.name}</td>
                                    <td>${p.desc1}</td>
                                    <td>
                                        ${p.file_path
                        ? `<img src="${p.file_path}" alternate="click here" style="width:50px; height:50px; object-fit:cover; border-radius:5px; cursor:pointer;" onerror="this.onerror=null; this.src='https://via.placeholder.com/50'; console.log('Error loading:', '${p.file_path}')" onclick="window.open('${p.file_path}')">`
                        : 'No file'}
                                    </td>
                                    <td>
                                        <button class="b11" onclick = "acceptAch('${p._id}')">✅</button>
                                        <button class="b12" onclick = "denyAch('${p._id}')">❌</button>
                                    </td>
                                    <td>
                                        <button class="b13" onclick="delAch('${p._id}')" style="background-color:white border:none;">🗑️</button>
                                    </td>
                                `
                table.append(row);
            }
        });
    }
    catch (e) {
        console.log(e)
    }
}

document.addEventListener('DOMContentLoaded', loadPending);

async function acceptAch(index) {
    try {
        const data = await fetch(`/approve/${index}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'approved' })
        });
        loadPending(index);
    }
    catch (e) {
        console.log(e);
    }
}

async function denyAch(index) {
    try {
        const data = await fetch(`/deny/${index}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'denied' })
        });
        loadPending(index);
    }
    catch (e) {
        console.log(e);
    }
}

async function delAch(index) {
    try {
        const data = await fetch(`/delete/${index}`, {
            method: 'DELETE'
        });
        loadPending();
    }
    catch (e) {
        console.log(e);
    }
}

const logout_btn = document.querySelector(".b4");
logout_btn.addEventListener('click', () => {
    localStorage.removeItem('role');
    window.location.href = 'index.html';
})

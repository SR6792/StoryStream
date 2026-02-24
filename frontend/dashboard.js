const table = document.querySelector(".tb");
index=0;
async function loadPending(x){
    try{
        const data = await fetch('http://localhost:2000/all');
        const resp = await data.json();
        table.innerHTML='';
        resp.forEach((p,index)=>{
            if(p._id != x && p.status=='pending'){
                const row = document.createElement('tr');
                row.innerHTML +=`
                                    <td>${index+1}</td>
                                    <td>${p.name}</td>
                                    <td>${p.desc1}</td>
                                    <td>File goes here</td>
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
    catch(e){
        console.log(e)
    }
}

document.addEventListener('DOMContentLoaded',loadPending);

async function acceptAch(index){
    try{
        const data = await fetch(`http://localhost:2000/approve/${index}`,{
            method:'PATCH',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({status:'approved'})
        });
        loadPending(index);
    }
    catch(e){
        console.log(e);
    }
}

async function denyAch(index){
    try{
        const data = await fetch(`http://localhost:2000/deny/${index}`,{
            method:'PATCH',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({status:'denied'})
        });
        loadPending(index);
    }
    catch(e){
        console.log(e);
    }
}

async function delAch(index){
    try{
        const data = await fetch(`http://localhost:2000/delete/${index}`,{
            method:'DELETE'
        });
        loadPending();
    }
    catch(e){
        console.log(e);
    }
}

const logout_btn = document.querySelector(".b4");
logout_btn.addEventListener('click',()=>{
  localStorage.removeItem('role');
  window.location.href='index.html';
})

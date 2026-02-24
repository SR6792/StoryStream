const a11= document.querySelector(".getpost");
async function loadSuggestion(){//to load all post
    a11.innerHTML='';
    a11.style.overflowY='scroll';
    const data = await fetch('http://localhost:2000/all');
        const posts = await data.json();
        posts.forEach(p=>{
            const post = document.createElement('div');
            post.innerHTML = `
                <h2>${p.name}</h2>
                <h3>${p.adm_no}</h3>
                <p>${p.desc1}</p>
                <p>${p.status}</p>
            `;
        post.style.justifyItems='center';
        post.style.width='35%';
        post.style.height='40%';
        post.style.padding='20px';
        post.style.border='3px solid black';
        post.style.margin='20px 20px';
        post.style.overflowY='scroll';
        post.style.scrollbarWidth='none';
        post.style.borderRadius = '20px';
        post.style.backgroundColor=' White';
        
        a11.appendChild(post);
    });
}
document.addEventListener("DOMContentLoaded",loadSuggestion);
//to get all suggestion on loading website(DOMCContentLoaded)
// const btn1 = document.querySelector(".btn1");
// btn1.addEventListener('click',async(event)=>{
//     try{
//         loadSuggestion();
//     }
//     catch(err){
//         console.log(err);     
//     }
// });

//to enter a suggestion(post)
const btn = document.querySelector(".btn");
const inp1=document.querySelector(".inp1");
const inp2=document.querySelector(".inp2");
const inp3=document.querySelector(".inp3");
const cat = document.querySelector(".category");
if(btn && inp1 && inp2 && inp3){
    // frontend: c:\... \frontend\index.js
btn.addEventListener('click', async (event) => {
  event.preventDefault();//to prevent crashing
  try {
    const name = inp1.value.trim();
    const adm  = inp2.value.trim();
    const sug  = inp3.value.trim();
    const ch = cat.value;//which category
    if (!name || !adm || !sug ||!ch) {
      alert('Please Fill all the Details');
      return;
    }

    // Make sure keys match server. Many examples expect: { name, adm_no, suggestion }
    const res = await fetch('http://localhost:2000/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name:name, adm_no: adm, desc1: sug ,category: ch})
    });

    if (!res.ok) {
      const err = await res.json().catch(()=>({error: res.statusText}));
      throw new Error(err.error || res.statusText);
    }

    // refresh list from server (avoid cache)
    await loadSuggestion(); // your function clears and fetches /all

    // clear form
    inp1.value = inp2.value = inp3.value =cat.value= '';
  } catch (err) {
    console.error(err);
    alert('Submit failed: ' + err.message);
  } finally {
    btn.disabled = false;
  }
});
}


//to diff btw ledwall,newsletter,social when click them optional
const btn1 = document.querySelector(".d1");
const btn2 = document.querySelector(".d2");
const btn3 = document.querySelector(".d3");
const btn4 = document.querySelector(".d4");
const btn5 = document.querySelector(".d5");
const btn6 = document.querySelector(".d6");

btn4.style.borderBottom='solid 5px black';

async function loadCat(cat){
  a11.innerHTML='';
    a11.style.overflowY='scroll';
    const data = await fetch(`http://localhost:2000/all/${cat}`);
        const posts = await data.json();
        posts.forEach(p=>{
            const post = document.createElement('div');
            post.innerHTML = `
                <h2>${p.name}</h2>
                <h3>${p.adm_no}</h3>
                <p>${p.desc1}</p>
                <p>${p.status}</p>
            `;
        post.style.justifyItems='center';
        post.style.width='35%';
        post.style.height='40%';
        post.style.padding='20px';
        post.style.border='3px solid black';
        post.style.margin='20px 20px';
        post.style.overflowY='scroll';
        post.style.scrollbarWidth='none';
        a11.appendChild(post);
    });
}

//function to load status
async function loadStatus(status){
  a11.innerHTML='';
    a11.style.overflowY='scroll';
    const data = await fetch(`http://localhost:2000/${status}`);
        const posts = await data.json();
        posts.forEach(p=>{
            const post = document.createElement('div');
            post.innerHTML = `
                <h2>${p.name}</h2>
                <h3>${p.adm_no}</h3>
                <p>${p.desc1}</p>
                <p>${p.status}</p>
            `;
        post.style.justifyItems='center';
        post.style.width='35%';
        post.style.height='40%';
        post.style.padding='20px';
        post.style.border='3px solid black';
        post.style.margin='20px 20px';
        post.style.overflowY='scroll';
        post.style.scrollbarWidth='none';
        a11.appendChild(post);
    });
}

btn1.addEventListener('click', () => {
  loadCat("led_wall");
  btn1.style.borderBottom = '5px solid black';
  btn2.style.borderBottom = 'none';
  btn3.style.borderBottom = 'none';
  btn4.style.borderBottom = 'none';
  btn5.style.borderBottom = 'none';
  btn6.style.borderBottom = 'none';
});

btn2.addEventListener('click', () => {
  loadCat("newsletter");
  btn2.style.borderBottom = '5px solid black';
  btn1.style.borderBottom = 'none';
  btn3.style.borderBottom = 'none';
  btn4.style.borderBottom = 'none';
  btn5.style.borderBottom = 'none';
  btn6.style.borderBottom = 'none';
});

btn3.addEventListener('click', () => {
  loadCat("social");
  btn3.style.borderBottom = '5px solid black';
  btn1.style.borderBottom = 'none';
  btn2.style.borderBottom = 'none';
  btn4.style.borderBottom = 'none';
  btn5.style.borderBottom = 'none';
  btn6.style.borderBottom = 'none';
});

btn4.addEventListener('click', () => {
  loadSuggestion();
  btn3.style.borderBottom = 'none';
  btn1.style.borderBottom = 'none';
  btn2.style.borderBottom = 'none';
  btn4.style.borderBottom = '5px solid black';
  btn5.style.borderBottom = 'none';
  btn6.style.borderBottom = 'none';
});

btn5.addEventListener('click', () => {
  loadStatus("approved");
  btn3.style.borderBottom = 'none';
  btn1.style.borderBottom = 'none';
  btn2.style.borderBottom = 'none';
  btn4.style.borderBottom = 'none';
  btn5.style.borderBottom = '5px solid black';
  btn6.style.borderBottom = 'none';
});
btn6.addEventListener('click', () => {
  loadStatus("denied");
  btn3.style.borderBottom = 'none';
  btn1.style.borderBottom = 'none';
  btn2.style.borderBottom = 'none';
  btn4.style.borderBottom = 'none';
  btn5.style.borderBottom = 'none';
  btn6.style.borderBottom = '5px solid black';
});

const logout_btn = document.querySelector(".b2");
logout_btn.addEventListener('click',()=>{
  localStorage.removeItem('role');
  window.location.href='index.html';
})

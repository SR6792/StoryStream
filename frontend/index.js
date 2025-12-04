//to get recent posts
const a11= document.querySelector(".getpost");
document.addEventListener("DOMContentLoaded",async(event)=>{
    if(!a11) throw new Error("No div here");
    try{
        const data= await fetch('http://localhost:2000/recent');
        const posts = await data.json();
        posts.forEach(p =>{
            const post=document.createElement('div');
            post.innerHTML = `
                <h2>${p.name}</h2>
                <h3>${p.adm_no}</h3>
                <p>${p.suggestion}</p>
            `;
            post.style='justify-items:center';
            post.style.width='35%';
            post.style.height='30%';
            post.style.padding='20px';
            post.style.border='3px solid black';
            post.style.margin='20px 20px';
            a11.appendChild(post);
        });
    }
    catch(err){
        console.log(err);
    }
});
//to get all suggestion
const btn1 = document.querySelector(".btn1");
btn1.addEventListener('click',async(event)=>{
    try{
        a11.textContent='';
        const data = await fetch('http://localhost:2000/all');
        const posts = await data.json();
        posts.forEach(p=>{
            const post = document.createElement('div');
            post.innerHTML = `
                <h2>${p.name}</h2>
                <h3>${p.adm_no}</h3>
                <p>${p.suggestion}</p>
            `;
            post.style='justify-items:center';
            post.style.marginTop='20px';
            post.style.width='30%';
            post.style.height='35%';
            post.style.padding='20px';
            post.style.border='3px solid black';
            a11.appendChild(post);
        });
    }
    catch(err){
        console.log(err);     
    }
});

//to enter a suggestion
const btn = document.querySelector(".btn");
const inp1=document.querySelector(".inp1");
const inp2=document.querySelector(".inp2");
const inp3=document.querySelector(".inp3");
btn.addEventListener('click',async(event)=>{
    try{
        const name = inp1.trim.value();
        const adm = inp2.trim.value();
        const sug = inp3.trim.values();
        if(!name||!adm||!sug){
            alert('Please Fill all the Details');
        }
    }
    catch(err){
        console.log(err);
    }
})
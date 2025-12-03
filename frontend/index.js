//to get recent posts
document.addEventListener("DOMContentLoaded",async(event)=>{
    const a11= document.querySelector(".getpost");
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

const btn = document.querySelector(".btn");
btn.addEventListener('click',async(event)=>{
    try{
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
            post.style.width='40%';
            post.style.height='45%';
            post.style.padding='20px';
            post.style.marginLeft='100px';
            post.style.border='3px solid black';
            a11.appendChild(post);
        });
    }
    catch(err){
        console.log(err);     
    }
});
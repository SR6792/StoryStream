//take value of both email and password

const inp1 = document.querySelector(".email1");
const inp2 = document.querySelector(".pass1");
const register_btn = document.querySelector(".reg");

register_btn.addEventListener('click',async(event)=>{
    event.preventDefault();//to prevent crashing
    try{
        const email1 = inp1.value.trim();
        const password1 = inp2.value.trim(); 
        if(!email1 || !password1){
            alert("Fill both first");
            return;
        }
        const data = await fetch('http://localhost:2000/register',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({Email:email1,Password:password1})//in backend jsut give Email and Password
        });

        window.location.href='user.html';
        inp1.value=inp2.value='';
    }
    catch(e){
        console.log(e)
    }
});
//take value of both email and password

const inp1 = document.querySelector(".email1");
const inp2 = document.querySelector(".pass1");
const login_btn = document.querySelector(".reg");

login_btn.addEventListener('click',async(event)=>{
    event.preventDefault();//to prevent crashing
    try{
        const email1 = inp1.value.trim();
        const password1 = inp2.value.trim(); 
        if(!email1 || !password1){
            alert("Fill both first");
            return;
        }
        const data = await fetch('http://localhost:2000/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({Email:email1,Password:password1})
        });
        if(data.ok){
            const resp = await data.json()
            alert("Successful Login");
            localStorage.setItem('role',resp.role);
            if(resp.role=='admin'){
                window.location.href='admin.html'
            }
            else{
                window.location.href='user.html'
            }
        }

        inp1.value=inp2.value='';
    }
    catch(e){
        console.log(e)
    }
});
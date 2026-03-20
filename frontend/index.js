//take value of both email and password

const inp1 = document.querySelector(".email1");
const inp2 = document.querySelector(".pass1");
const register_btn = document.querySelector(".reg");

register_btn.addEventListener('click', async (event) => {
    event.preventDefault();//to prevent crashing
    try {
        const email1 = inp1.value.trim();
        const password1 = inp2.value.trim();
        if (!email1 || !password1) {
            alert("Fill both first");
            return;
        }
        const data = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Email: email1, Password: password1 })//in backend jsut give Email and Password
        });

        window.location.href = 'user.html';
        inp1.value = inp2.value = '';
    }
    catch (e) {
        console.log(e)
    }
});

// Google Sign-In
const googleBtn = document.querySelector(".google-btn");

function handleGoogleResponse(response) {
    fetch('/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: response.credential })
    })
        .then(res => res.json())
        .then(data => {
            if (data.message === "Success") {
                alert("Google Sign-Up Successful!");
                localStorage.setItem('role', data.role);
                if (data.role === 'admin') {
                    window.location.href = 'admin.html';
                } else {
                    window.location.href = 'user.html';
                }
            } else {
                alert("Google Sign-Up Failed");
            }
        })
        .catch(err => {
            console.log(err);
            alert("Google Sign-Up Failed");
        });
}

// Initialize Google Sign-In after the GSI library has loaded
window.addEventListener('load', () => {
    if (typeof google !== 'undefined' && google.accounts) {
        google.accounts.id.initialize({
            client_id: "920151150259-j2em824nr7k0d5u7uassgre8otg2ntk9.apps.googleusercontent.com",
            callback: handleGoogleResponse,
        });

        // Render a hidden Google button, then trigger it from the custom button
        const hiddenDiv = document.createElement('div');
        hiddenDiv.id = 'g_id_signin';
        hiddenDiv.style.position = 'absolute';
        hiddenDiv.style.opacity = '0';
        hiddenDiv.style.pointerEvents = 'none';
        document.body.appendChild(hiddenDiv);

        google.accounts.id.renderButton(hiddenDiv, {
            type: 'standard',
            size: 'large',
        });
    } else {
        console.error("Google Identity Services library failed to load.");
    }
});

googleBtn.addEventListener('click', () => {
    const hiddenBtn = document.querySelector('#g_id_signin div[role="button"]');
    if (hiddenBtn) {
        hiddenBtn.click();
    } else {
        alert("Google Sign-In is not available. Please try again later.");
    }
});
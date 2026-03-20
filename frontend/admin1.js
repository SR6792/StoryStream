const a11 = document.querySelector(".getpost");
// Make sure your image tag looks like this:
// img.src = achievement.file_path; 
// This works because file_path already starts with "/uploads/"

async function loadSuggestion() {//to load all post
  a11.innerHTML = '';
  a11.style.overflowY = 'scroll';
  const data = await fetch('/all'); // CHANGE: Removed localhost
  const posts = await data.json();
  posts.forEach(p => {
    const post = document.createElement('div');
    const fileName = p.file_path ? p.file_path.split('/').pop() : '';

    // CHANGE: Added PDF check logic here
    const isPDF = p.file_path && p.file_path.toLowerCase().endsWith('.pdf');
    const mediaHTML = isPDF
      ? `<a href="${p.file_path}" target="_blank" style="color:red; font-weight:bold; text-decoration:none;"><i class="fa-solid fa-file-pdf"></i> View PDF Certificate</a>`
      : `<img src="${p.file_path}" alt="Achievement" style="width:100%; max-height:150px; object-fit:cover; border-radius:10px; margin-bottom:10px;">`;

    post.innerHTML = `
        <h2>${p.name}</h2>
        <h3>${p.adm_no}</h3>
        <p>${p.desc1}</p>
        <p>Status: ${p.status}</p>
        ${p.file_path ? `<a href="${p.file_path}" download title ="Download" target="_blank" title="View File" style="display:inline-block;margin-top:8px;padding:6px 14px;background:#2196F3;color:white;border-radius:8px;text-decoration:none;font-size:14px;cursor:pointer;">🔍 ${isPDF ? 'View PDF' : 'View Image'}</a>` : ''}
    `;
    post.style.justifyItems = 'center';
    post.style.width = '35%';
    post.style.height = '40%';
    post.style.padding = '20px';
    post.style.border = '3px solid black';
    post.style.margin = '20px 20px';
    post.style.overflowY = 'scroll';
    post.style.scrollbarWidth = 'none';
    post.style.borderRadius = '20px';
    post.style.backgroundColor = ' White';

    a11.appendChild(post);
  });
}
document.addEventListener("DOMContentLoaded", loadSuggestion);

const btn1 = document.querySelector(".d1");
const btn2 = document.querySelector(".d2");
const btn3 = document.querySelector(".d3");
const btn4 = document.querySelector(".d4");
const btn5 = document.querySelector(".d5");
const btn6 = document.querySelector(".d6");

btn4.style.borderBottom = 'solid 5px black';

async function loadCat(cat) {
  a11.innerHTML = '';
  a11.style.overflowY = 'scroll';
  const data = await fetch(`/all/${cat}`); // CHANGE: Removed localhost
  const posts = await data.json();
  posts.forEach(p => {
    const post = document.createElement('div');
    const isPDF = p.file_path && p.file_path.toLowerCase().endsWith('.pdf');
    const mediaHTML = isPDF
      ? `<a href="${p.file_path}" target="_blank" style="color:red; font-weight:bold; text-decoration:none;"><i class="fa-solid fa-file-pdf"></i> View PDF</a>`
      : `<img src="${p.file_path}" style="width:100%; border-radius:10px; margin-bottom:10px;">`;

    post.innerHTML = `
    <h2>${p.name}</h2>
    <h3>${p.adm_no}</h3>
    <p>${p.desc1}</p>
    <p>Status: ${p.status}</p>
    <br>
     ${p.file_path ? `<a href="${p.file_path}" target="_blank" title="View File" style="display:inline-block;margin-top:8px;padding:6px 14px;background:#2196F3;color:white;border-radius:8px;text-decoration:none;font-size:14px;cursor:pointer;">🔍 ${isPDF ? 'View PDF' : 'View Image'}</a>` : ''}
`; post.style.justifyItems = 'center';
    post.style.width = '35%';
    post.style.height = '40%';
    post.style.padding = '20px';
    post.style.border = '3px solid black';
    post.style.margin = '20px 20px';
    post.style.overflowY = 'scroll';
    post.style.scrollbarWidth = 'none';
    a11.appendChild(post);
  });
}

async function loadStatus(status) {
  a11.innerHTML = '';
  a11.style.overflowY = 'scroll';
  const data = await fetch(`/${status}`); // CHANGE: Removed localhost
  const posts = await data.json();
  posts.forEach(p => {
    const post = document.createElement('div');
    const isPDF = p.file_path && p.file_path.toLowerCase().endsWith('.pdf');

    post.innerHTML = `
                <h2>${p.name}</h2>
                <h3>${p.adm_no}</h3>
                <p>${p.desc1}</p>
                <p>${p.status}</p>
                ${p.file_path ? `<a href="${p.file_path}" target="_blank" title="View File" style="display:inline-block;margin-top:8px;padding:6px 14px;background:#2196F3;color:white;border-radius:8px;text-decoration:none;font-size:14px;cursor:pointer;">🔍 ${isPDF ? 'View PDF' : 'View Image'}</a>` : ''}
            `;
    post.style.justifyItems = 'center';
    post.style.width = '35%';
    post.style.height = '40%';
    post.style.padding = '20px';
    post.style.border = '3px solid black';
    post.style.margin = '20px 20px';
    post.style.overflowY = 'scroll';
    post.style.scrollbarWidth = 'none';
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
logout_btn.addEventListener('click', () => {
  localStorage.removeItem('role');
  window.location.href = 'index.html';
});
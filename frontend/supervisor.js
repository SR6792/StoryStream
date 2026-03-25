const role1 = localStorage.getItem('role');

async function loadCat(cat) {
    const a11 = document.querySelector('.getpost');
    if (!a11) return;
    
    a11.innerHTML = '';
    a11.style.overflowY = 'scroll';
    const data = await fetch(`/supervised/${cat}`); // CHANGE: Removed localhost
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

loadCat(role1);
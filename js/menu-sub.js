const sidebar = document.getElementById('sidebar');
const toggleIcon = document.getElementById('toggleSidebar');
const submenu = document.getElementById('submenu');
const sidebarTitle = document.getElementById('sidebarTitle');
const contentTitle = document.getElementById('contentTitle');

/* MENU DATA */
const menus = {
home: ['Dashboard', 'ภาพรวมระบบ'],
update: ['แก้ไขข้อมูล', 'ข้อมูลผู้กู้', 'ข้อมูลสัญญา'],
interest: ['อัตราดอกเบี้ย', 'เบี้ยปรับ'],
notify: ['แจ้งเตือนระบบ', 'ประวัติแจ้งเตือน'],
payment: ['รับชำระ', 'ประวัติการชำระ'],
condition: ['เปลี่ยนเงื่อนไข', 'บันทึกประเภท'],
org: ['จัดการองค์กร', 'โอนย้ายหนี้'],
account: ['ผังบัญชี', 'บันทึกบัญชี']
};

/* LOAD SUBMENU */
function loadSubmenu(key, title) {
submenu.innerHTML = '';
sidebarTitle.innerText = title;
contentTitle.innerText = title;

menus[key].forEach((item, index) => {
    const li = document.createElement('li');
    li.innerText = item;
    if (index === 0) li.classList.add('active');
    submenu.appendChild(li);
});
}

/* TOP MENU CLICK */
document.querySelectorAll('.top-menu a').forEach(link => {
link.addEventListener('click', e => {
    e.preventDefault();

    document.querySelectorAll('.top-menu a')
    .forEach(l => l.classList.remove('active'));

    link.classList.add('active');
    loadSubmenu(link.dataset.menu, link.innerText);
});
});

/* TOGGLE SIDEBAR */
toggleIcon.onclick = () => {
sidebar.classList.toggle('closed');

if (sidebar.classList.contains('closed')) {
    toggleIcon.classList.replace('fa-bars', 'fa-arrow-right');
} else {
    toggleIcon.classList.replace('fa-arrow-right', 'fa-bars');
}
};

/* INIT */
loadSubmenu('home', 'หน้าแรก');
document.addEventListener("DOMContentLoaded", () => {

  const menuData = [
    { name: "หน้าแรก", file: "index.html", key: "home" },
    { name: "การปรับปรุงข้อมูล", file: "update.html", key: "update" },
    { name: "ดอกเบี้ย/เบี้ยปรับ", file: "interest.html", key: "interest" },
    { name: "การแจ้งเตือน", file: "notify.html", key: "notify" },
    { name: "ชำระหนี้", file: "payment.html", key: "payment" },
    { name: "การเปลี่ยนเงื่อนไข", file: "condition.html", key: "condition" },
    { name: "จัดการหนี้องค์กร", file: "org.html", key: "org" },
    { name: "การบันทึกบัญชี", file: "account.html", key: "account" },
    { name: "องค์กรนายจ้าง", file: "employer-org.html", key: "employer-org" },
    { name: "จัดการหนี้องค์กร", file: "manage-debt.html", key: "manage-debt" }
  ];

  const topMenu = document.getElementById("topMenu");
  const currentPage = location.pathname.split("/").pop();

  menuData.forEach(menu => {
    const a = document.createElement("a");
    a.href = menu.file;
    a.dataset.menu = menu.key;
    a.innerText = menu.name;

    if (menu.file === currentPage || (currentPage === "" && menu.file === "index.html")) {
      a.classList.add("active");
    }

    topMenu.appendChild(a);
  });

});

document.addEventListener("DOMContentLoaded", () => {
  const menuData = [
    { name: "หน้าแรก", file: "index.html", key: "home" },
    {
      name: "งานติดตามหนี้",
      file: "debt-collection.html",
      key: "debt-collection",
    },
    { name: "การปรับปรุงข้อมูล", file: "update.html", key: "update" },
    { name: "ดอกเบี้ย/เบี้ยปรับ", file: "interest.html", key: "interest" },
    { name: "การแจ้งเตือน", file: "notify.html", key: "notify" },
    { name: "ชำระหนี้", file: "payment.html", key: "payment" },
    { name: "การเปลี่ยนเงื่อนไข", file: "condition.html", key: "condition" },
    { name: "จัดการหนี้องค์กร", file: "org.html", key: "org" },
    { name: "การบันทึกบัญชี", file: "account.html", key: "account" },
    { name: "องค์กรนายจ้าง", file: "employer-org.html", key: "employer-org" },
    { name: "จัดการหนี้องค์กร", file: "manage-debt.html", key: "manage-debt" },
  ];

  const topMenu = document.getElementById("topMenu");
  const currentPage = location.pathname.split("/").pop();

  menuData.forEach((menu) => {
    const a = document.createElement("a");
    a.href = menu.file;
    a.dataset.menu = menu.key;
    a.innerText = menu.name;

    if (
      menu.file === currentPage ||
      (currentPage === "" && menu.file === "index.html")
    ) {
      a.classList.add("active");
    }

    topMenu.appendChild(a);
  });
});

const ROLES = [
  { name: "ผู้ดูแลระบบ", value: "admin" },
  { name: "ผู้สร้างรายการ", value: "creator" },
  { name: "ผู้ตรวจสอบ", value: "checker" },
  { name: "ผู้อนุมัติ", value: "approver" },
  { name: "เจ้าหน้าที่นำเข้าข้อมูล", value: "import" },
];

const RoleState = {
  key: "selected_role",
  get() {
    return localStorage.getItem(this.key);
  },

  set(value) {
    localStorage.setItem(this.key, value);
    console.log("[RoleState] set:", value);
  },
  init(defaultValue) {
    if (!this.get()) {
      this.set(defaultValue);
    }
    return this.get();
  },
};

$(document).ready(() => {
  const $select = $("<select>", {
    id: "select_roles",
    name: "select_roles",
    class: "form-select",
  });
  ROLES.forEach((r) =>
    $select.append($("<option>", { value: r.value, text: r.name }))
  );
  $("#role_container").addClass("d-inline-block me-3").append($select);

  const currentRole = RoleState.init(ROLES[0].value);
  $select.val(currentRole);
  updateUIByRole(currentRole);

  // ON CHANGE
  $select.on("change", function () {
    RoleState.set(this.value);
    updateUIByRole(this.value);
  });
});

function updateUIByRole(role) {
  $("[data-roles]").each(function () {
    const rolesStr = $(this).data("roles");
    if (!rolesStr) return;

    const roles = rolesStr.split(",").map((r) => r.trim()); // ["admin","checker"]

    // *  = เห็นทุก roles
    if (roles.includes("*") || roles.includes(role)) {
      $(this).show();
    } else {
      $(this).hide();
    }
  });
}

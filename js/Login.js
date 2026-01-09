/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var token = $("meta[name='_csrf']").attr("content");
var header = $("meta[name='_csrf_header']").attr("content");
 
$(document).ajaxSend(function(e, xhr, options) {
    xhr.setRequestHeader(header, token);
});

var ORG_EMP_ID = "0";

$(document).ready(function() {
	//prod
	//document.getElementById("linkRD").innerHTML = "<a href='https://epit.rd.go.th/BOAPP_RDINET/EFLoginService?service=SLF'><U><font size='4.5px;'>สร้างผู้ใช้งานใหม่ (สำหรับหน่วยงานใหม่)</font></U></a>";
	//document.getElementById("linkRD").innerHTML = "<a href='https://epittest.rd.go.th/BOAPP_RDINET/EFLoginService?service=SLF'><U>สร้างผู้ใช้งานใหม่ (สำหรับหน่วยงานใหม่)</U></a>";
	//document.getElementById("linkGuest").innerHTML = "<a href='https://slfrd-uat.dsl.studentloan.or.th/SLFRD/home'><U><font'>ขอขยายระยะเวลาการมีหน้าที่นำส่งเงิน (สำหรับหน่วยงานใหม่)</font></U></a>";
	//document.getElementById("linkRD").innerHTML = "<a href='https://efilingtest.rd.go.th/rd-efiling-web/authen/SLF'><U>สร้างผู้ใช้งานใหม่ (สำหรับหน่วยงานใหม่)</U></a>";
	document.getElementById("linkRD").innerHTML = "<a href='"+$("#rdLink").val()+"'><U>สร้างผู้ใช้งานใหม่ (สำหรับหน่วยงานใหม่)</U></a>";
	
	
	if($("#result").val() != "login"){

		ORG_EMP_ID = $("#ORG_EMP_ID").val();
	    
		if ($("#result").val() == "success" && ORG_EMP_ID !== "") {
			
		}else if ($("#result").val() == "false" && ORG_EMP_ID !== "") {
	        Create_AddPer();
	    } else {
	    	alert("ไม่พบข้อมูลเลขประจำตัวผู้เสียภาษีอากร (Tax ID)\nหากต้องการใช้งานระบบกรุณาติดต่อกองทุนเงินให้กู้ยืมเพื่อการศึกษา\nโทร 02-0805099 หรือ Email: slf-debt@studentloan.or.th \nหรือ Line official กยศ.องค์กรนายจ้าง")
	    } 
	}
	
	if($("#message").val() != ""){
		document.getElementById("landingPage").innerHTML = $("#message").val();
		$("#exampleModalCenter").modal({show: true});
	}
	

	$('#close').click(function() {
		//$(location).attr('href', 'https://epayslftest.rd.go.th/');
		$(location).attr('href', 'login');
	});

	$("#taxid").keyup(function(event) {
		if (event.keyCode === 13) {
			$("#login").click();
		}
	});
	$("#NID").keyup(function(event) {
        if (event.keyCode === 13) {
            $("#login").click();
        }
    });
    
    $("#password").keyup(function(event) {
        if (event.keyCode === 13) {
            $("#login").click();
        }
    });
    
	$("[type=password]").inputFilter(function(value) {
        return /^\d*$/.test(value);
    });

    $(".btn-view-password").click(function(e) {
        $(this).hasClass("active") ? ($(this).removeClass("active"), 
        $(this).parent(".col-4").find('[type="text"]').attr("type", "password")) : ($(this).addClass("active"), 
        $(this).parent(".col-4").find('[type="password"]').attr("type", "text")), 
        e.preventDefault()
      });
});

/*function gotoHome(){ //ปิดไม่ให้หน่วยงานใช้
	document.homeForm.submit();
}*/

function login() {
	myApp.showPleaseWait();
	validate();
}

function validate() {
	
	if ($("#taxid").val() === "" || $("#NID").val() === "" || $("#password").val() === "") {
		alert("กรุณากรอกข้อมูลให้ครบถ้วน");
		myApp.hidePleaseWait();
	} else {
		Check_Password_Org();
	}
}

function Check_Password_Org() {
	var loginData = {
		"USERNAME" : $("#NID").val(),
		"PASSWORD" : $("#password").val(),
		"TAX_NO" : $("#taxid").val()
	};
	
	$.ajax({
		type : "POST",
		dataType : 'text',
		url : "/SLFRD/AdminLogin",
		data : loginData,
		success : function(result) {
			if (result === "true") {
                window.parent.closeModalandRedirect_To_MainPage();
                
			}else if(result == "noorg") {
				alert("ไม่พบข้อมูลเลขประจำตัวผู้เสียภาษีอากร (Tax ID)\nหากต้องการใช้งานระบบกรุณาติดต่อกองทุนเงินให้กู้ยืมเพื่อการศึกษา\nโทร 02-0805099 หรือ Email: slf-debt@studentloan.or.th \nหรือ Line official กยศ.องค์กรนายจ้าง")
				myApp.hidePleaseWait();

			}/*else if(result == "noAdmin") {
				alert("ไม่พบข้อมูลผู้ใช้งาน \nต้องการสร้างผู้ใช้งานใหม่คลิก Link ด้านล่าง");
				myApp.hidePleaseWait();
				//Create_AddPer();				
		    }*/else if(result === "dupLogin"){
            	alert("มี User กำลังใช้งานอยู่ไม่สามารถ Login ได้");
                document.getElementById('showImg').style.display = "none";
                document.getElementById('form1').style.display = "";
                location.reload(true);
            }
            else {
                alert("Username หรือ Pin Code ไม่ถูกต้อง");
                document.getElementById('showImg').style.display = "none";
                document.getElementById('form1').style.display = "";
            	replaceURL($("#taxid").val());
            }

		},
		error : function(req, status, error) {
			alert("เกิดข้อผิดพลาดระหว่างการทำงาน");
		}
	});
}

function replaceURL(taxNo){
	var url = window.location.href;    
	if (url.indexOf('RefNo') > -1){
		window.location.href = url.substring(0, url.indexOf('RefNo'))+"TaxNo="+taxNo;
	}else if(url.indexOf('TaxNo') > -1){
		window.location.href = window.location.href;
	}else{
		window.location.href = window.location.href+"?TaxNo="+taxNo;
	}
}

function Create_AddPer() {
	$("#framepopup").attr('src', "DefineAdmin_");
    $("#modalpopup").modal({show: true});
	
    /*$.ajax({
        url: "/SLFRD/CheckMember",
        type: "POST",
        async: false,
        success: function(result) {
            if (result === true) {
            	//console.log(result);
            } else {
            	//myApp.hidePleaseWait();
            	//$(location).attr('href', 'DefineAdmin_');
                $("#framepopup").attr('src', "DefineAdmin_");
                $("#modalpopup").modal({show: true});
            }
        },
        error: function(request, status, error) {
            alert("เกิดข้อผิดพลาดระหว่างทำงาน");
        }
    });*/
}

window.closeModal = function() {
	$('#modalpopup').modal('hide');
	// location.reload(true);
};

window.closeModalandRedirect_To_MainPage = function() {
	$('#modalpopup').modal('hide');
	$(location).attr('href', 'MainPage');
};

window.closeModalandRedirect_To_login = function() {
	$('#modalpopup').modal('hide');
	$(location).attr('href', 'login');
};
window.closeModal_and_Reload = function() {
	$('#modalpopup').modal('hide');
};

window.closeModaland_and_login_again = function() {
	/*$("#framepopup").attr('src', "/SLFRD/All_Admin");
	$("#modalpopup").modal({
		show : true
	});*/
	$('#modalpopup').modal('hide');
	//$(location).attr('href', 'login');
};

(function($) {
	$.fn.inputFilter = function(inputFilter) {
		return this
				.on(
						"input keydown keyup mousedown mouseup select contextmenu drop",
						function() {
							if (inputFilter(this.value)) {
								this.oldValue = this.value;
								this.oldSelectionStart = this.selectionStart;
								this.oldSelectionEnd = this.selectionEnd;
							} else if (this.hasOwnProperty("oldValue")) {
								this.value = this.oldValue;
								this.setSelectionRange(this.oldSelectionStart,
										this.oldSelectionEnd);
							}
						});
	};
}(jQuery));

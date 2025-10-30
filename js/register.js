$(document).ready(function () {
    $("#registerForm").validate({
        rules: {
            username: {
                required: true,
                minlength: 4
            },
            password: {
                required: true,
                minlength: 8,
                pwcheck: true // ใช้ custom rule ด้านล่าง
            },
            type: {
                required: true
            },
            company_name: {
                required: true
            },
            house_no: {
                required: true
            },
            road: {
                required: true
            },
            district: {
                required: true
            },
            sub_district: {
                required: true
            },
            province: {
                required: true
            },
            zipcode: {
                required: true,
                digits: true,
                minlength: 5,
                maxlength: 5
            },
            name_title: {
                required: true
            },
            contact_firstname: {
                required: true
            },
            contact_lastname: {
                required: true
            }
        },
        messages: {
            username: {
                required: "กรุณากรอกชื่อผู้ใช้",
                minlength: "ต้องมีอย่างน้อย 4 ตัวอักษร"
            },
            password: {
                required: "กรุณากรอกรหัสผ่าน",
                minlength: "ต้องมีอย่างน้อย 8 ตัวอักษร",
                pwcheck: "รหัสผ่านต้องมีตัวใหญ่ ตัวเล็ก และตัวเลข"
            },
            company_type: "กรุณาเลือกประเภท",
            company_name: "กรุณากรอกชื่อ-สกุลหรือชื่อบริษัท",
            house_no: "กรุณากรอกที่อยู่เลขที่",
            road: "กรุณากรอกชื่อถนน",
            district: "กรุณากรอกตำบล/แขวง",
            sub_district: "กรุณากรอกอำเภอ/เขต",
            province: "กรุณากรอกจังหวัด",
            zipcode: {
                required: "กรุณากรอกรหัสไปรษณีย์",
                digits: "ต้องเป็นตัวเลขเท่านั้น",
                minlength: "ต้องมี 5 หลัก",
                maxlength: "ต้องมี 5 หลัก"
            },
            name_title: "กรุณาเลือกคำนำหน้า",
            contact_firstname: "กรุณากรอกชื่อผู้ติดต่อ",
            contact_lastname: "กรุณากรอกสกุลผู้ติดต่อ"
        },
        errorElement: "span",
        errorPlacement: function (error, element) {
            error.addClass("error-message");
            error.insertAfter(element);
        },
        submitHandler: function (form) {
            const $submitBtn = $(form).find('button[type="submit"]');
             // $submitBtn.prop("disabled", true).text("⏳ กำลังสมัคร...");
            const registerdata = {
                username: $('#username').val(),
                password: $('#password').val(),
            }

            const data = {
                companyType: $('#company_type').val(),
                companyName: $('#company_name').val(),
                houseNumber: $('#house_no').val(),
                villageNumber: $('#village_no').val() || '',
                villageName: $('#village_name').val() || '',
                alley: $('#alley').val() || '',
                road: $('#road').val(),
                subDistrict: $('#sub_district').val(),
                district: $('#district').val(),
                province: $('#province').val(),
                postalCode: $('#zipcode').val(),
                contactPrefix: $('#name_title').val(),
                contactFirstName: $('#contact_firstname').val(),
                contactLastName: $('#contact_lastname').val(),
                email: $('#contact_email').val(),
                phoneNumber: $('#contact_phone').val(),
                refCode: $('#ref_code').val() || '',
                createdByUserId: 1, // สมมติ user ID 1
            };

            console.log(registerdata);

            $.ajax({
                url: "http://localhost:3000/user/register",
                type: "POST",
                data: JSON.stringify(registerdata),
                contentType: "application/json",
                success: function (response) {
                    const userId = response.userId;
                    data.createdByUserId = userId;

                    $.ajax({
                        url: "http://localhost:3000/company",
                        type: "POST",
                        data: JSON.stringify(data),
                        contentType: "application/json",
                        success: function (res) {
                            alert("สมัครสมาชิกสำเร็จ!");
                            window.location.href = "login.html"; // เปลี่ยนเส้นทางไปยังหน้า login
                        },
                        error: function (xhr) {
                            console.error("❌ บันทึกข้อมูลบริษัทไม่สำเร็จ:", xhr.responseText);
                            alert("เกิดข้อผิดพลาดในการบันทึกข้อมูลบริษัท: " + xhr.responseText);
                        },
                    });
                },
                error: function (xhr) {
                    console.error("❌ สมัครไม่สำเร็จ:", xhr.responseText);
                    alert("เกิดข้อผิดพลาด: " + xhr.responseText);
                },
            });
        }
    });

    // Custom validator สำหรับรหัสผ่าน
    $.validator.addMethod(
        "pwcheck",
        function (value) {
            return /[A-Z]/.test(value) && // มีตัวพิมพ์ใหญ่
                /[a-z]/.test(value) && // มีตัวพิมพ์เล็ก
                /\d/.test(value);      // มีตัวเลข
        }
    );
});

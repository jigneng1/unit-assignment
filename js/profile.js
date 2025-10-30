$(document).ready(function () {
    // ใส่ URL ของ API ที่คุณต้องการเรียกใช้ที่นี
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');

    if (!userId) {
        alert('ไม่พบข้อมูลผู้ใช้');
        window.location.href = 'login.html';
        return;
    }

    // ฟังก์ชันดึงข้อมูลจาก API ด้วย jQuery
    function fetchCompanyData() {
        $('#loading').show();
        $('#error').hide();

        $.ajax({
            url: `http://localhost:3000/company/${userId}`,
            method: 'GET',
            dataType: 'json',
            success: function (response) {
                // ตรวจสอบว่า API ส่งข้อมูลสำเร็จหรือไม่
                if (response.success && response.payload) {
                    const data = response.payload;

                    // เติมข้อมูลลงในฟอร์ม
                    $('#company').val(data.company_name || '');
                    $('#tax-id').val(data.tax_id || '');
                    $('#address-no').val(data.house_number || '');
                    $('#village').val(data.village_number || '');
                    $('#village-name').val(data.village_name || '');
                    $('#lane').val(data.alley || '');
                    $('#road').val(data.road || '');
                    $('#subdistrict').val(data.sub_district || '');
                    $('#district').val(data.district || '');
                    $('#province').val(data.province || '');
                    $('#postal').val(data.post_code || '');

                    $('#loading').hide();
                } else {
                    throw new Error('ไม่สามารถดึงข้อมูลได้');
                }
            },
            error: function (xhr, status, error) {
                $('#loading').hide();
                alert('เกิดข้อผิดพลาดในการดึงข้อมูล: ' + error);
                window.location.href = "login.html";
            }
        });
    }

    fetchCompanyData();
});
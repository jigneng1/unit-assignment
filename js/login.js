$(document).ready(function () {
    // Toggle show/hide password
    $('#showPassword').on('change', function () {
        const type = $(this).is(':checked') ? 'text' : 'password';
        $('#password').attr('type', type);
    });

    // Handle form submit
    $('#loginForm').on('submit', function (e) {
        e.preventDefault();

        const username = $('#username').val().trim();
        const password = $('#password').val().trim();

        if (username === '' || password === '') {
            alert('กรุณากรอกข้อมูลให้ครบ');
            return;
        }

        // // ตัวอย่างส่ง Ajax
        $.ajax({
            url: 'http://localhost:3000/user/login',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                username: username,
                password: password
            }),
            data: JSON.stringify({
                username: username,
                password: password
            }),
            success: function (response) {
                window.location.href = 'profile.html?userId=' + response.payload.userId;
            },
            error: function () {
                alert('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
            }
        });
    });
});


jQuery(document).ready(function() {

    $.ajaxSettings.contentType = 'application/json';

    $('.page-container form .username, .page-container form .password').keyup(function(){
        $(this).parent().find('.error').fadeOut('fast');
    });

});



function login() {
    var username = $('#myform').find('.username').val();
    var password = $('#myform').find('.password').val();
    if (username === '') {
        $('#myform').find('.error').fadeOut('fast', function () {
            $(this).css('top', '27px');
        });
        $('#myform').find('.error').fadeIn('fast', function () {
            $(this).parent().find('.username').focus();
        });
        return false;
    }
    if (password === '') {
        $('#myform').find('.error').fadeOut('fast', function () {
            $(this).css('top', '96px');
        });
        $('#myform').find('.error').fadeIn('fast', function () {
            $(this).parent().find('.password').focus();
        });
        return false;
    }
    var user = { "username": username, "password": password };
    $.post('/member/LoginIn', JSON.stringify(user), function (data) {
        if (data && data.success) {
            window.location = "/";
        } else {
            swal(
                '登陆失败',
                data.errorMessage,
                'error'
            );
        }
    });

}
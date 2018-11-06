$("#login-btn").on('click', function(e){
    //e.preventDefault();
    var username = $("#username-login").val();
    var password = $("#password-login").val();

    $("input").removeClass('error');
    $(".message-error").removeClass("active");
    if(username == ''){
        $("#username-login").addClass("error");
        $(".message-error").addClass("active");
        return;
    }
    if(password == ''){
        $("#password-login").addClass("error");
        $(".message-error").addClass("active");
        return;
    }
    
    //$(this).click();

    $.ajax({
        url: './login/login',
        data : {
            username : username,
            password : password
        },
        type : 'POST',
        async : false
    }).done(function(data){
        window.location.href = data.dashboard;
    }).fail(function(data){
        console.log(data);
        alert(data.responseJSON.message);
    })
})
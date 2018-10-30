$("#login-btn").on('click', function(){

    var username = $("#username-login").val();
    var password = $("#password-login").val();

    $("input").removeClass('error');
    $(".message-error").removeClass("active");
    if(username == ''){
        $("#username-login").addClass("error");
        $(".message-error").addClass("active");
    }
    if(password == ''){
        $("#password-login").addClass("error");
        $(".message-error").addClass("active");
    }
    
    $.ajax({
        url: './login/login',
        data : {
            username : username,
            password : password
        },
        type : 'POST',
        async : false
    }).done(function(data){
        console.log(data);
    })
})
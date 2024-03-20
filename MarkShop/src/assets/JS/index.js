$(document).ready(function () {
    $(".feat-btn").click(function () {
        $(this).toggleClass("active");
        $(".feat-show").toggleClass("show");
        $(".Second").toggleClass("rolate");
    });

    $(".serv-btn").click(function () {
        $(this).toggleClass("active");
        $(".serv-show").toggleClass("show1");
        $(".Final").toggleClass("rolate");
    });
    $(".sanpham-btn").click(function () {
        $(this).toggleClass("active");
        $(".sanpham-show").toggleClass("show2");
        $(".first").toggleClass("rolate");
    });
    $(".donvi-btn").click(function () {
        $(this).toggleClass("active");
        $(".donvi-show").toggleClass("show3");
        $(".Third").toggleClass("rolate");
    });
});
$(document).ready(function () {
    $('.counter').countUp();
});
$(document).ready(function () {
    AOS.init();
});

$(document).ready(function () {
    const menuLogin = $(".js-modal-login");
    const menuContainer = $(".js-modal__login--container");
    const menuClose = $(".js-modal-close");
    const loginButton = $(".login");

    loginButton.click(function () {
        setTimeout(() => {
            menuContainer.css({
                animation: "scale ease-in .3s",
                display: "block"
            });
        }, 700);
        menuLogin.css("display", "flex");
    });

    function hideMenuLogin() {
        menuLogin.add(menuContainer).css({
            animation: "",
            display: "none"
        });
    }

    menuClose.add(menuLogin).click(hideMenuLogin);
    menuContainer.click(function (event) {
        event.stopPropagation();
    });
});
$(document).ready(function () {
    var paragraph = $('#ngayDat');
    var currentDate = new Date();
    var formattedDate = currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
    paragraph.text(formattedDate);

    $("#form-validate").validate({
        rules: {
            TenSP: {
                required: !0
            },
            MoTa: {
                minlength: 20,
                required: !0
            },
            GiaBan: {
                required: !0,
                number: !0
            },
            GiaNhap: {
                required: !0,
                number: !0
            },
            SoLuongTon: {
                required: !0,
                number: !0
            }
        },
        errorClass: "help-block error",
        highlight: function (e) {
            $(e).closest(".form-group").addClass("has-error")
        },
        unhighlight: function (e) {
            $(e).closest(".form-group").removeClass("has-error")
        },
    });
});






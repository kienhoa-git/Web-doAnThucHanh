'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");

        /*------------------
            Gallery filter
        --------------------*/
        $('.featured__controls li').on('click', function () {
            $('.featured__controls li').removeClass('active');
            $(this).addClass('active');
        });
        if ($('.featured__filter').length > 0) {
            var containerEl = document.querySelector('.featured__filter');
            var mixer = mixitup(containerEl);
        }
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    //Humberger Menu
    $(".humberger__open").on('click', function () {
        $(".humberger__menu__wrapper").addClass("show__humberger__menu__wrapper");
        $(".humberger__menu__overlay").addClass("active");
        $("body").addClass("over_hid");
    });

    $(".humberger__menu__overlay").on('click', function () {
        $(".humberger__menu__wrapper").removeClass("show__humberger__menu__wrapper");
        $(".humberger__menu__overlay").removeClass("active");
        $("body").removeClass("over_hid");
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });


    $('.hero__categories__all').on('click', function(){
        $('.hero__categories ul').slideToggle(400);
    });

    /*-------------------
		Quantity change
	--------------------- */
    var proQty = $('.pro-qty');
    proQty.prepend('<span class="dec qtybtn">-</span>');
    proQty.append('<span class="inc qtybtn">+</span>');
    proQty.on('click', '.qtybtn', function () {
        var $button = $(this);
        var oldValue = $button.parent().find('input').val();
        if ($button.hasClass('inc')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        $button.parent().find('input').val(newVal);
        updateTotal();
    });

    /*-------------------
	Bổ sung hàm updateTotal()
	--------------------- */
    function updateTotal() {
        // 1. Lấy giá trị số lượng từ ô input
        var quantity = parseFloat($('#quantity').val());
        
        // 2. Lấy đơn giá (76.300) và loại bỏ các ký tự không phải số
        var priceText = $('.shoping__cart__price').text();
        var price = parseFloat(priceText.replace(/[^0-9]/g, ''));
        
        // 3. Tính tổng tiền
        var total = price * quantity;
        
        // 4. Định dạng lại số tiền hiển thị (thêm dấu chấm phân cách hàng nghìn)
        var formattedTotal = total.toLocaleString('vi-VN') + ' đ';
        
        // 5. Cập nhật vào cột "Tổng" và bảng "Tổng giỏ hàng"
        $('#total').text(formattedTotal);
        $('.shoping__checkout ul li:first-child span').text(formattedTotal); // Tổng phụ
        $('.shoping__checkout ul li:last-child span').text(formattedTotal);  // Tổng cuối
    }
})(jQuery);
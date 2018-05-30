$(document).ready(function(){
    function noty(type, message){
        return new Noty({
            type: type,
            layout: 'topRight',
            theme: 'metroui',
            progressBar: true,
            text: message,
            timeout: 4000,
            animation: {
                open: 'animated bounceInRight',
                close: 'animated bounceOutRight'
            }
        }).show();
    };
    $('#btnClickTry').on('click', function(){
        noty('success', '<strong>ĐÂY LÀ THÔNG BÁO THÀNH CÔNG</strong>');
        // success
        noty('error', 'ĐÂY LÀ LỖI')
        // error
        noty('info', 'ĐÂY LÀ THÔNG TIN')
    })
});
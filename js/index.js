// AIzaSyDVsESHdelHRLqPZcaR5kcyQqVlMTxlW_Y

$(document).ready(() => {
    $('h1').addClass('red');
})

// Searchbar Handler
$(function(){
    var searchField = $('#query');
    var icon = $('#search-btn');

    // Focus Handler
    $(searchField).on('focus', function(){
        $(this).animate({
            width: '100%'
        }, 400);

        $(icon).animate({
            right: '10px'
        }, 400);
    });

    // Blur Handler
    $(searchField).on('blur', function(){
        if (searchField.val() === ""){
            $(searchField).animate({
                width: '45%'
            }, 400, function(){});

            $(icon).animate({
                right: '360px'
            }, 400, function(){});
        }
    })
})
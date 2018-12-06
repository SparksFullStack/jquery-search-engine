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
    });

    $('#search-form').submit(function(e){
        e.preventDefault();
    })
})


// Search Function
function search(){
    // zeroing out the results and their buttons
    $('#results').html("");
    $('#buttons').html("");

    // getting the value from the query element
    var q = $(`#query`).val();


    // making the GET request
    $.get("https://www.googleapis.com/youtube/v3/search", {
        part: 'snippet, id',
        q: q,
        type: 'video',
        key: 'AIzaSyDVsESHdelHRLqPZcaR5kcyQqVlMTxlW_Y',
    }, (data) => {
        // works just like forEach in vanilla JS
            // first param: array, second: callback
        $.each(data.items, (index, item) => console.log(item));
    })
}
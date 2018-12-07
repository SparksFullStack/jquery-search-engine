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
        const { nextPageToken, prevPageToken } = data;

        // works just like forEach in vanilla JS
            // first param: array, second: callback
        $.each(data.items, (index, item) => {
            const output = getOutput(item); // custom function to handle the data returned from the request

            // displaying the results by appending them to the #results
            $('#results').append(output);
        });

        var buttons = getButtons(prevPageToken, nextPageToken, q); // custom function to build buttons based on the results


        console.log(buttons)
        // displaying the buttons in the HTML
        $('#buttons').append(buttons);
    })
}

// Next Page Function
function nextPage(){
    var token = $('#next-button').data('token');
    var q = $('#next-button').data('q');

    // zeroing out the results and their buttons
    $('#results').html("");
    $('#buttons').html("");

    // getting the value from the query element
    var q = $(`#query`).val();


    // making the GET request
    $.get("https://www.googleapis.com/youtube/v3/search", {
        part: 'snippet, id',
        q: q,
        pageToken: token,
        type: 'video',
        key: 'AIzaSyDVsESHdelHRLqPZcaR5kcyQqVlMTxlW_Y',
    }, (data) => {
        const { nextPageToken, prevPageToken } = data;

        // works just like forEach in vanilla JS
            // first param: array, second: callback
        $.each(data.items, (index, item) => {
            const output = getOutput(item); // custom function to handle the data returned from the request

            // displaying the results by appending them to the #results
            $('#results').append(output);
        });

        var buttons = getButtons(prevPageToken, nextPageToken, q); // custom function to build buttons based on the results


        console.log(buttons)
        // displaying the buttons in the HTML
        $('#buttons').append(buttons);
    })
}

// Next Page Function
function prevPage(){
    var token = $('#prev-button').data('token');
    var q = $('#prev-button').data('q');

    // zeroing out the results and their buttons
    $('#results').html("");
    $('#buttons').html("");

    // getting the value from the query element
    var q = $(`#query`).val();


    // making the GET request
    $.get("https://www.googleapis.com/youtube/v3/search", {
        part: 'snippet, id',
        q: q,
        pageToken: token,
        type: 'video',
        key: 'AIzaSyDVsESHdelHRLqPZcaR5kcyQqVlMTxlW_Y',
    }, (data) => {
        const { nextPageToken, prevPageToken } = data;

        // works just like forEach in vanilla JS
            // first param: array, second: callback
        $.each(data.items, (index, item) => {
            const output = getOutput(item); // custom function to handle the data returned from the request

            // displaying the results by appending them to the #results
            $('#results').append(output);
        });

        var buttons = getButtons(prevPageToken, nextPageToken, q); // custom function to build buttons based on the results


        console.log(buttons)
        // displaying the buttons in the HTML
        $('#buttons').append(buttons);
    })
}


// Request Output Handler
function getOutput(item){
    console.log('running')
    const { videoId } = item.id;
    const { 
        title, 
        description, 
        channelTitle,
        publishedAt 
    } = item.snippet;
    const thumb = item.snippet.thumbnails.high.url;

    // building the output 
    let output = '<li><div class="list-left"><img src="'+thumb+'"></div><div class="list-right"><h3><a data-fancybox="gallery" href="http://www.youtube.com/embed/'+videoId+'">'+title+'</a></h3><small>By <span class="cTitle">'+channelTitle+'</span> on '+publishedAt+'</small><p>'+description+'</p></div></li><div class="clearfix"></div>';

    return output;
}

// Button Creation Handler
function getButtons(prevPageToken, nextPageToken, q){
    let btnOutput = "";
    if (!prevPageToken) {
        btnOutput = '<div class="button-container"><button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'" onclick="nextPage();">Next Page</button></div>'
    } else {
        btnOutput = '<div class="button-container"><button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'" onclick="nextPage();">Next Page</button><button id="prev-button" class="paging-button" data-token="'+prevPageToken+'" data-query="'+q+'" onclick="prevPage();">Previous Page;</button></div>'
    }

    return btnOutput;
}
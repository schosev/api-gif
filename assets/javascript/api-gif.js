//giphy api key: Y8O1g1GuXVaHsUrdiBkw3x7nfIjIgOqa

var topics = ["clouds", "forest", "rain", "lava", "northern lights", "ocean", "snow", "sand", "desert",
                        "sunset", "wind", "trees"];

var isPlaying = false;

function createButtons () {
    $("#buttons").empty();

    for (var i=0; i<topics.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("btn-md btn-danger natureButtons");
        newButton.attr("data-name", topics[i]);
        newButton.text(topics[i]);

        $("#buttons").append(newButton);
    }
}

$("#submit-btn").on("click", function(event) {
    event.preventDefault();

    var input = $("#nature-input").val().trim().toLowerCase();
    console.log("input: " + input);

    topics.push(input);
    createButtons();
})

function showGifs() {

    var natureGifs = $(this).attr("data-name");
    console.log("natureGif var: " + natureGifs);
    var queryURLSearch = "https://api.giphy.com/v1/gifs/search?api_key=Y8O1g1GuXVaHsUrdiBkw3x7nfIjIgOqa&q=" + natureGifs + "&limit=10&offset=0&rating=G&lang=en";

    $.ajax ({
        url: queryURLSearch,
        method: "GET"
    }).then(function (response){

        var newDiv = $("<div class='gif-div'>");
        $("#nature-form").before(newDiv);

        for (var x = 0; x < response.data.length; x++) {

            var imgStill = response.data[x].images.fixed_height_still.url;
            var image = $("<img>");
            image.attr("src", imgStill);
            image.attr("data-name", response.data[x].id);
            image.addClass("imgClass");
            newDiv.append(image);

        }

        console.log(response);
    })
}

function playGifs() {
    console.log("play gifs function");
    var clickedGif = $(this).attr("data-name");
    var queryURLId = "https://api.giphy.com/v1/gifs/" + clickedGif + "?api_key=Y8O1g1GuXVaHsUrdiBkw3x7nfIjIgOqa"
    //var playGifURL;
    var thisGif = this;

    $.ajax ({
        url: queryURLId,
        method: "GET"
    }).then(function (responseClick){
        if (isPlaying) {
            //stop gif logic
            var stopGifURL = responseClick.data.images.fixed_height_still.url;
            $(thisGif).attr("src", stopGifURL);
            isPlaying = false;

        }
        else
        {
            //play gif logic
            var playGifURL = responseClick.data.images.fixed_height.url;
            $(thisGif).attr("src", playGifURL);
            isPlaying = true;
        }
    })
}



createButtons();

$(document).on("click", ".natureButtons", showGifs);
$(document).on("click", ".imgClass", playGifs);


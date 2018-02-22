
var topics = ["clouds", "forest", "rain", "lava", "northern lights", "ocean", "snow", "sand", "desert",
                        "sunset", "wind", "trees", "comets", "waterfall", "landscape", "mountains", "moon"];

var isPlaying = false;

function createButtons () {
    //create the buttons at the top of the page for the elements in the topics array.
    $("#buttons").empty();

    for (var i=0; i<topics.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("btn-danger natureButtons");
        newButton.attr("data-name", topics[i]);
        newButton.text(topics[i]);

        $("#buttons").append(newButton);
    }
}

//create a new button at the top for the value typed in by the user.
$("#submit-btn").on("click", function(event) {
    event.preventDefault();

    var input = $("#nature-input").val().trim().toLowerCase();

    topics.push(input);
    createButtons();
    $("#nature-input").val("");
})

function showGifs() {
    //on click of the button, make a call to giphy.com to get 10 gifs based on the value of the button
    var natureGifs = $(this).attr("data-name");
    var queryURLSearch = "https://api.giphy.com/v1/gifs/search?api_key=Y8O1g1GuXVaHsUrdiBkw3x7nfIjIgOqa&q=" + natureGifs + "&limit=10&offset=0&rating=PG&lang=en";
    isPlaying = false;

    $.ajax ({
        url: queryURLSearch,
        method: "GET"
    }).then(function (response){

        $(".gif-container").empty();

        for (var x = 0; x < response.data.length; x++) {

            var imgStill = response.data[x].images.fixed_height_still.url;

            var imageDiv = $("<div>")
            imageDiv.addClass("image-div");

            var image = $("<img>");
            image.attr("src", imgStill);
            image.attr("data-name", response.data[x].id);
            image.addClass("img-responsive imgClass");

            var rating = $("<p>");
            rating.text("Rating: " + response.data[x].rating);
            rating.addClass("display-rating");

            $(".gif-container").append(imageDiv);
            $(imageDiv).append(image);
            $(imageDiv).append(rating);

        }
    })
}

function playGifs() {
    //on click of the gif, make a call to giphy.com to get the url by id to show either gif or still image
    var clickedGif = $(this).attr("data-name");
    var queryURLId = "https://api.giphy.com/v1/gifs/" + clickedGif + "?api_key=Y8O1g1GuXVaHsUrdiBkw3x7nfIjIgOqa"
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

//on click make call to giphy.com to get the 10 api's
$(document).on("click", ".natureButtons", showGifs);
//on click of the gif image either start or stop playing the gif
$(document).on("click", ".imgClass", playGifs);


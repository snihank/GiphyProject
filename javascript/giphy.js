var searchItems = ['birds','animals'];
// Functions
//  ----------------------------------------------------------
// Creating buttons 
var createButtons = function(){
// removes all elements from the buttons section
$('#buttons').empty();
// Creating new buttons as the array above
for(var i = 0; i < searchItems.length; i++){
    // creates new button
    var button = $("<button>");
    
    button.addClass('image-btn');
    
    
    button.attr("data-name",searchItems[i]);
    
    button.text(searchItems[i]);
    

    console.log(i);
    // Adding buttons to the DOM
    $('#buttons').append(button);
}
}
var submit = function(){
    $("#submitBtn").on('click', function(event){
    event.preventDefault();
    // Get input text value
    var userInput = $("#input").val();
    searchItems.push(userInput);
    // console.log(searchItems);
    createButtons();
    });
    
}




function imageDisplay() {

    var btnVal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + btnVal + "&api_key=IVrjjV8DOnboFhTIuumNVLuooBU6eUXT&limit=10" ;
    
    // Creating an AJAX call for the specific image button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

        
        
        
        
    $("#images").empty();

    var results = response.data;
    console.log(results);

    for(var i = 0; i < results.length; i++){
 

        

        var gifyUrl = $("<img>");

        gifyUrl.attr("src", results[i].images.original.url);
        gifyUrl.attr("data-animated", results[i].images.original.url);
        gifyUrl.attr("data-still", results[i].images.original_still.url)
        gifyUrl.attr("data-state","still");
        gifyUrl.addClass("gifs");

        $("#images").append(gifyUrl);
        

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        p.css("color","yellow");
        p.css("margin","20px 0 20px 0px")

        $("#images").append(p);

        
            
            $(".gifs").on("click", function(){ 

                var state = $(this).attr("data-state");
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animated"));
                    $(this).attr("data-state", "animated");
                  } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                  }
            
            })
        
        
    }
    
    
});
}

createButtons();
submit();




$(document).on("click", ".image-btn", imageDisplay)

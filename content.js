jQuery.getMultipleJSON = function(){
    return jQuery.when.apply(jQuery, jQuery.map(arguments, function(jsonfile){
        return jQuery.getJSON(jsonfile);
    })).done(function(){
        var def = jQuery.Deferred();
        return def.resolve.apply(def, jQuery.map(arguments, function(response){
            return response[0];
        }));
    });
};

function insertCard(card) {
    let html_content = "<div class=\"row\"><div class=\"col-lg-4 col-sm-6 portfolio-item\"> <div class=\"card h-100\"> <a href=\"jacked.html\"><img class=\"card-img-top\" src=\"";

    // image
    html_content += card.thumbnail;
    html_content += "\"\" alt=\"\"></a> <div class=\"card-body\"> <h4 class=\"card-title\"> <a href=\"jacked.html\">"; 

    // title
    html_content += card.title;
    html_content += "</a> </h4> <p class=\"card-text\">";

    // description
    html_content += card.description;
    html_content += "</p> </div> </div> </div>";

    return html_content;
}

function insertMosaicPart(mosaicPart) {
    const content_directory = "media/portfolio/";
    var directories = [];
    for(let card of mosaicPart.content) {
        directories.push(content_directory + card.directory + "/content.json");
    }
    jQuery.getMultipleJSON(directories)
        .done(function() {
            var html_content = "";
            html_content += "<h1 class=\"my-4\">" + mosaicPart.title + "</h1>";
            html_content += "<div class=\"row\">";
            for(let arg of arguments) {
                console.log(arg);
                html_content += insertCard(arg);
            }
            html_content += "</div>";
            // insert html_content in DOM
            $("#mosaic").append(html_content);
        });
}

function mosaic() {
    const content_directory = "media/portfolio/";
    $.getJSON(content_directory + "home.json", function(mos) {
        for(let partCard of mos) {
            insertMosaicPart(partCard);
        }
    });
}

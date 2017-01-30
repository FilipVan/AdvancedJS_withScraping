////////////////// jquery much? ////////////////////////  anything much? //////////////////////////

////////////////////////////////////////// 1. SCRAPE /////////////////////////////////////

// selecting on web page and making JSON out of it AKA scraping
// Translating code from http://www.imdb.com/chart/top

// finding out the title
let title1 = $("td"); // gets all table cells
let title2 = $("td.titleColumn"); // gets all table cells with class titleColumn
let title3 = $("td.titleColumn a"); // gets all table cells with class titleColumn and all a elements within
let title4 = $("td.titleColumn a").text(); // gets all table cells with class titleColumn and all a containing that tds text

// find out the year
let year1 = $("td span.secondaryInfo"); // gets all td elements and all spans within them with class secondaryInfo
let year2 = $("td span.secondaryInfo").text(); // gets all text from all td elements and all spans within them with class secondaryInfo

// find rating
let rate1 = $("td.ratingColumn strong"); // gets all td with class ratingColumn and the element strong within them
let rate2 = $("td.ratingColumn strong").text(); // gets the text within the elements strong that are inside td with class ratingColumn

// find extra info ( director and actors )
let extraInfo = $("td.titleColumn a").attr("title"); // gets td with class titleColumn and inside a and gets the attribute title
// warning. Does not get info for all movies. Must use loop function

// find the img
let img1 = $("td.posterColumn a img"); // gets td with class posterColumn that has a elements with img elements
let img2 = $("td.posterColumn a img").attr(src); // gets src attribute from element img that is in element a that is in element td with class posterColumn

// find link to movie
let link = $("td.posterColumn a").attr("href"); // gets attribute href from element a that is in td with class posterColumn

//////////////// function that makes them in to objects! ///////////////////////////////

let movies = []; // making array movies to put all the movies like objects and make JSON file
let mainContainer = $("tbody.lister-list tr"); // define mainContainer that has the container containing all the info we need
let i = 1;
mainContainer.each(function () { // function that for each element in mainContainer does something
    let rank = i++;
    let title = $(this).find("td.titleColumn a").text(); // finds all td.titleColumn a text content and puts in title property
    let year = $(this).find("td span.secondaryInfo").text(); // finds all td span.secondaryInfo a text content and puts in title property
    let rate = $(this).find("td.ratingColumn strong").text(); // finds all td.ratingColumn strong text content and puts in title property
    let extraInfo = $(this).find("td.titleColumn a").attr("title"); // finds all td.titleColumn a from attribute title content and puts in title property
    let img = $(this).find("td.posterColumn a img").attr("src"); // finds all td.posterColumn a img from attribute src content and puts in title property
    let link = $(this).find("td.posterColumn a").attr("href"); // finds all td.posterColumn a from attribute href content and puts in title property
    if (title) // if there is title then do this
        movies.push({  // pushes all the items below in the array movies
            rank,
            title,
            year,
            rate,
            extraInfo,
            img,
            link
        })
});

/////////////////////////////////// 2. AJAX CALL ////////////////////////////////////

// making an AJAX call VANILLA STYLE

let call = new XMLHttpRequest(); // make a request called `call`
call.open('GET', 'movies.json', true); // with the property .open we get the link to API or local path to the JSON file
call.send(null); // we don't send anything because we are making a call ( if we want to send anything then write it instead of `null`

call.onreadystatechange = function () { // function for confirming and parsing the data that we get
    if (call.readyState == XMLHttpRequest.DONE) { // if the call is done
        let moviesJson = JSON.parse(call.response); // parse the response and put it in `moviesJson` variable
        console.log(moviesJson[1].title); // trying if it works. Logging the second movie from the list.
    }
};

// making an AJAX call JQUERY STYLE ( IT DID NOT WORK FOR ME... gave me undefined from the JSON

$.ajax({ // magic ( the call )
    url: `movies.json`, // the url to API or local path to the JSON file
    success: function(moviesJson){ // on success do function that gets a name as a property and creates a parsed variable with the data and the name you entered
        console.log(moviesJson);
    }
});

////////////////////////////////// 3. Function for writing on display ///////////////////////

////////////////////////////////// 3.1 Display one row of a movie!
let makeMovieRow = function (movie, rank, container) { // movie = json file, rank = movie.rank if we want rank/ "" if we don't want, container = the container where this code should be generated
    container.append(`<div class="row" id="displayMovies"> 
                        <div class="col-md-2 movie" id="cover"><a href="http://www.imdb.com/${movie.link}"><img src="${movie.img}" /></a></div>
                        <div class="col-md-3 movie" id="title"> ${rank} ${movie.title} </div>
                        <div class="col-md-3 movie" id="extra"> ${movie.extraInfo} </div>
                        <div class="col-md-2 movie" id="year"> ${movie.year} </div>
                        <div class="col-md-2 movie" id="rate"> ${movie.rate} </div>
                    </div>
    `); // every row is generated in bootstrap with the appropriate data and an ID and CLASS so we can select it with css later
};

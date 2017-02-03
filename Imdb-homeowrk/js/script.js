let $table = $("tbody");
// Add Movies on html.
let addMovies = (data, $table) => {
    $table.append(
        `<tr col-xs-3 class="table-inverse">
                <td><a href = "http://www.imdb.com/chart/top?ref_=nv_mv_250_6"></a><img class = "widthFix" src="${data.img}"></td>
                <td>${data.title}</td>
                <td>${data.rating}</td>
                <td>${data.author}</td>
                </tr>`
    )
};

let pageSize = 20;
let pageNumber = 1;
let movies = [];
let filterMovies = []


let removeRows = function () {
    $table.html("");
}

let displayPage = (pageNumber, pageSize, movies, $table) => {
    removeRows($table);
    let startIndex = (pageNumber - 1) * pageSize;
    let endIndex = pageNumber * pageSize;
    let displayMovies = movies.slice(startIndex, endIndex);
    displayMovies.forEach(m => addMovies(m, $table));
    $("#display").text(`PAGE ${pageNumber}`);
}



$("#moviesPerPage").on("keyup", () => {
    let value = $("#moviesPerPage").val();

    pageSize = value;
    pageNumber = 1;

    displayPage(pageNumber, pageSize, movies, $table);
});

// jquerry skraten document.ready 
$(() => {
    let getData = new XMLHttpRequest();
    getData.open("GET", "js/movies.json", true);
    getData.send();

    getData.onload = function () {
        let jsonData = JSON.parse(getData.response);
        let movies = jsonData;
        let filterMovies = movies;
        displayPage(pageNumber, pageSize, movies, $table)

        $("#previous").on("click", () => {
            if (pageNumber > 1) {
                pageNumber -= 1;
            }
            displayPage(pageNumber, pageSize, movies, $table);
        })

        $("#next").on("click", () => {
            debugger;
            let maxPageNumber = Math.ceil(movies.length / pageSize);
            if (pageNumber < maxPageNumber) {
                pageNumber += 1;
            }
            displayPage(pageNumber, pageSize, filterMovies, $table);
        })

        $("#searchItem").on("keyup", () => {
            let searchItem = $("#searchItem").val();
            if (!searchItem) 
                return;
            searchItem = searchItem.replace(/\s+/g, ' ').toLowerCase();

            filterMovies = movies.filter(data => {
                if (data.author.replace(/\s+/g, ' ').toLowerCase().indexOf(searchItem) !== -1)
                    return true;
                if (data.title.replace(/\s+/g, ' ').toLowerCase().indexOf(searchItem) !== -1)
                    return true;
                return false;
            });
            pageNumber = 1;
            displayPage(pageNumber, pageSize, movies, $table);
            $table.html("");
            filterMovies.forEach((a) => {
                addMovies(a, $table);
            })
            
            if (searchItem.val == "") { debugger;
                displayPage(pageNumber, pageSize, filterMovies, $table);
            }
        });


        // How many movies to show on a page.
        $("#moviesPerPage").on("keyup", () => {
            let value = $("#moviesPerPage").val();

            pageSize = value;
            pageNumber = 1;
            if (pageSize == "") {
                pageSize = 20;
                displayPage(pageNumber, pageSize, filterMovies, $table);
            }            
        });


        //SORTING
        let sorted = false;
        let movieName = $("#movieName").on("click", () => {
            if (!sorted) {
                filterMovies.sort(function (a, b) {
                    if (a.title < b.title) {
                        sorted = true;
                        return -1;
                    }
                    if (a.title > b.title) {
                        return 1;
                    }
                    return 0;
                })
                displayPage(pageNumber, pageSize, filterMovies, $table);
            }
            // not working yet, when we delete the name of the searched movie with holding backspace I want to return the original list the we see before the search 
            else if (sorted) {
                filterMovies.reverse();
                sorted = false;
            }
            displayPage(pageNumber, pageSize, filterMovies, $table);
        })

        let director = $("#director").on("click", function () {
            if (!sorted) {
                filterMovies.sort(function (a, b) {
                    if (a.author < b.author) {
                        sorted = true;
                        return -1;
                    }
                    if (a.author > b.author) {
                        return 1;
                    }
                    return 0;
                })
                displayPage(pageNumber, pageSize, filterMovies, $table);
            }
            else if (sorted) {
                filterMovies.reverse();
                sorted = false;
            }
            displayPage(pageNumber, pageSize, filterMovies, $table);
        })
        let sortedRank = true;
        let rating = $("#rating").on("click", function () {
            debugger
            if (!sortedRank) {
                filterMovies.sort(function (a, b) {
                    sortedRank = true;
                    return a.rating - b.rating;
                })
                displayPage(pageNumber, pageSize, filterMovies, $table);
            }
            else {
                filterMovies.reverse();
                sortedRank = false;
                displayPage(pageNumber, pageSize, filterMovies, $table);
            }
        })
    }
});


// let $rows = $("#tBody tr");
// $('#searchItem').keyup(function () {
//     let val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase(); // the /+/g, '' ignores space between words ex. "The       Lord of    the Rings"-----will actually be The Lord Of the Rings!
//     $rows.show().filter(function () {
//         let text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
//         return !~text.indexOf(val);
//     }).hide();
// });

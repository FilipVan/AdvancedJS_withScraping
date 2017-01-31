let $table = $("tbody");
// Add Movies on html.
let addMovies = (data, $table) => {
    $table.append(
        `<tr>
                <td><a href = "http://www.imdb.com/chart/top?ref_=nv_mv_250_6"></a><img src="${data.img}"></td>
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

    let $rows = $("#tBody tr");
    $('#searchItem').keyup(function () {
        let val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase(); // the /+/g, '' ignores space between words ex. "The       Lord of    the Rings"-----will actually be The Lord Of the Rings!
        $rows.show().filter(function () {
            let text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
            return !~text.indexOf(val);
        }).hide();
    });
}
// jquerry skraten document.ready 
$(() => {
    let getData = new XMLHttpRequest();
    getData.open("GET", "javascript/movies.json", true);
    getData.send();

    getData.onload = function () {
        debugger;
        let jsonData = JSON.parse(getData.response);
        let movies = jsonData;
        let filterMovies = movies;
        displayPage(pageNumber, pageSize, filterMovies, $table)

        $("#previous").on("click", () => {
            debugger;
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
            displayPage(pageNumber, pageSize, movies, $table);
        })
    };
});


 


    // $("#search").on("click", () => {
    //     let searchItem = $("#searchItem").val();
    //     if (!searchItem)
    //         return;
    //     searchItem = searchItem.toLowerCase();

    //     filterMovies = movies.filter(data => {
    //         if (data.author.toLowerCase().indexOf(searchItem) !== -1)
    //             return true;
    //         if (data.title.toLowerCase().indexOf(searchItem) !== -1)
    //             return true;
    //         return false;
    //     });
    //     $table.html("");
    //     filterMovies.forEach((a)=>{
    //         appendMovies(a,$table);
    //     })

    // });



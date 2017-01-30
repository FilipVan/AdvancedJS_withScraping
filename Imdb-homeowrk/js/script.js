    let $table = $("#tBody");


    let appendMovies = ((a, $table) => {
        $table.append(
            `<tr>
                <td>${a.title}</td>
                <td>${a.rating}</td>
                <td>${a.author}</td>
                <td><img src="${a.img}"></td>
                </tr>`
        )
    });
// jquerry skraten document.ready 
$(() => {

   
    $('#searchItem').keyup(function () {
        var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
        $table.show().filter(function () {
            var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
            return !~text.indexOf(val);
        }).hide();
    });



    let getData = new XMLHttpRequest();

    getData.open("GET", "js/movies.json", true);
    getData.send(null);

    getData.onload = function () {
        let data = JSON.parse(getData.response);
        movies = data;
        filterMovies = movies;

        filterMovies.forEach((a)=>{
            appendMovies(a,$table);
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



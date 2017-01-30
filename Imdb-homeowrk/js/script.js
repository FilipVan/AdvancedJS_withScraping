        let $table = $("tbody");


        let getData = new XMLHttpRequest();
        getData.open("GET", "javascript/movies.json", true);
        getData.send();

        getData.onload = function() {
            let jsonData = JSON.parse(getData.response);
            // movies = data;
            // filterMovies = movies;
            addMovies(jsonData, $table);
        };
        // Add Movies on html.
        let addMovies = (data, $table) => {
            data.forEach((a) => {
                $table.append(
                    `<tr>
                <td>${a.title}</td>
                <td>${a.rating}</td>
                <td>${a.author}</td>
                <td><a href = "http://www.imdb.com/chart/top?ref_=nv_mv_250_6"></a><img src="${a.img}"></td>
                </tr>`
                )
            })

        };

        // jquerry skraten document.ready 
        $(() => {
            var $rows = $("#myTable tr");
            $('#searchItem').keyup(function() {
                var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
                $rows.show().filter(function() {
                    var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
                    return !~text.indexOf(val);
                }).hide();
            });
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



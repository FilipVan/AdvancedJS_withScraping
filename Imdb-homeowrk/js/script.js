filterMovies.sort(function(a,b){
                if(a.title < b.title){
                    sorted = true;
                    return -1;
                }
                if(a.title > b.title) {
                    return 1;
                }
                return 0;
            })
            displayPage(pageNumber, pageSize, filterMovies, $table);
            }
            else if(sorted) {
                filterMovies.reverse();
                sorted = false;
            }
            displayPage(pageNumber, pageSize, filterMovies, $table);
        })

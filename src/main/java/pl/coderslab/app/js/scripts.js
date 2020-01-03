$(function a() {

    //get all books

    var books;
    var jsonGet = (function () {
        var jsonGet = null;
        $.ajax({
            'async': false,
            'global': false,
            'url': 'http://localhost:8282/books/',
            'dataType': "json",
            'success': function (data) {
                jsonGet = data;
            }
        });
        return jsonGet;
    })();
    books=Array.from(jsonGet);
    var books2=[];
    books.forEach(function (value, index) {
        books2.push( [value.id, value.isbn, value.title, value.author, value.publisher, value.type]);
    });
    //console.log(books2);

    //------------------------------------------------------------------

    //delete a book from serv

    var del = function(id) {
        $.ajax({
            url: "http://localhost:8282/books/" + id,
            type: "DELETE",
        });
        setTimeout(function () {
            location.reload();
        }, 500);
    }


    //-----------------------------------------------------------------------

    //create the all-books table struct

    books2.forEach(function (value, index, array) {
        var row = $('<tr>');
        row.addClass('table-active');
        var title = $('<td>');
        title.text(value[2]);
        var div = $('<div>');
        div.text('siema');
        div.css('display', 'none');
        title.append(div);
        title.click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (div.css('display')=='none') {   //details
                div.html("<span>"+"<br>"+
                    "Id: "+value[0]+"<br>"+
                        "ISBN: "+value[1]+"<br>"+
                        "Autor: "+value[3]+"<br>"+
                        "Wydawca: "+value[4]+"<br>"+
                        "Kategoria: "+value[5]+
                        "</span>");
            }
            div.toggle();    //toggle details
            return false;
        })
        row.append(title);
        var btnTd = $('<td>');
        var btn = $('<button>');
        btn.attr('type','button');
        btn.addClass('btn btn-danger');
        btn.text('Usuń');
        btnTd.append(btn);
        row.append(btnTd);
        $('#books').append(row);
        var $this = $(this);
        btn.click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            del(value[0]);    //delete row from serv
            return false;
        });
    })

    //-----------------------------------------------------------------


});

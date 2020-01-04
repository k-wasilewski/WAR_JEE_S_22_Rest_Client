$(function a() {

    //one ajax call

    var do_ajax = function() {

        if ($('#books').data('ajax')=='get') {
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
        }

        $.each($('tr'), function () {
            if ($(this).data('ajax')=='del') {
                del($(this).attr('id'));
                $(this).remove();
                return;
            }
        })

        if ($('#submit').data('ajax')=='post') {
            var data = {
                'isbn': $("#isbn").val(),
                'title': $("#title").val(),
                'author': $("#author").val(),
                'publisher': $("#publisher").val(),
                'type': $("#type").val()
            }
            $.ajax({
                url: 'http://localhost:8282/books/',
                type: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                dataType: 'json',
                data: JSON.stringify(data),
                success: function () {
                    location.reload();
                }
            });
        }
    }

    //-------------------------------------------------------------------------

    //get all books

    var books;
    $('#books').data('ajax', 'get');
    var jsonGet = do_ajax();
    $('#books').data('ajax', null);
    books=Array.from(jsonGet);
    var books2=[];
    books.forEach(function (value, index) {
        books2.push( [value.id, value.isbn, value.title, value.author, value.publisher, value.type]);
    });

    //------------------------------------------------------------------

    //delete a book from serv

    var del = function(id) {
        $.ajax({
            url: "http://localhost:8282/books/" + id,
            type: "DELETE",
        });
    }


    //-----------------------------------------------------------------------

    //create the all-books table

    books2.forEach(function (value, index, array) {
        var row = $('<tr>');
        row.attr('id', value[0]);

        row.addClass('table-active');
        var title = $('<td>');
        title.text(value[2]);
        var div = $('<div>');
        div.css('display', 'none');
        title.append(div);
        title.click(function (e) {  //details
            e.preventDefault();
            e.stopPropagation();
            if (div.css('display')=='none') {
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
        btn.click(function (e) {    //delete btn
            e.preventDefault();
            e.stopPropagation();
            row.data('ajax', 'del');
            do_ajax();
            return false;
        });
    })

    //-----------------------------------------------------------------

    //adding a new book

    $('#submit').click(function (event) {
        event.preventDefault();
        event.stopPropagation();
        $('#submit').data('ajax', 'post');
        do_ajax();
        return false;
    })

});

// Manage CSS Grid by jQuery

$(function () {

    $(".columns").on('change', function() {
        var value = $(this).val();
        $(".app").css("grid-template-columns","repeat("+value+", 1fr)");
    });

    $(".rows").on('change', function() {
        var value = $(this).val();
        $(".app").css("grid-template-rows","repeat("+value+", 1fr)");
    });

    $(".add").on('click', function() {
        var element = $(
            "<div class='element' data-width='1' data-height='1' data-left='1' data-top='1'>" +
            "<button class='move element_top'><i class='fa fa-arrow-up' aria-hidden='true'></i></button>" +
            "<button class='move element_bottom'><i class='fa fa-arrow-down' aria-hidden='true'></i></button>" +
            "<button class='move element_left'><i class='fa fa-arrow-left' aria-hidden='true'></i></button>" +
            "<button class='move element_right'><i class='fa fa-arrow-right' aria-hidden='true'></i></button>" +
            "<input class='resize element_width' type='number' value='1'>" +
            "<input class='resize element_height' type='number' value='1'>" +
            "</div>"
        );

        element.find(".resize").on("change",function () {

            if ($(this).hasClass("element_width")){

                $(this).parent().data("width", parseInt($(this).val()));

            }

            if ($(this).hasClass("element_height")){

                $(this).parent().data("height", parseInt($(this).val()));
            }

            $(this).parent().css("grid-column-end", String(parseInt($(this).parent().css("grid-column-start")) +  $(this).parent().data("width")));

            $(this).parent().css("grid-row-end", String(parseInt($(this).parent().css("grid-row-start")) + $(this).parent().data("height")));

        });

        element.find(".move").on("click",function () {

            var row_start = parseInt($(this).parent().data("top"));

            var column_start = parseInt($(this).parent().data("left"));

            var row_max = parseInt($(".rows").val());

            var column_max = parseInt($(".columns").val());

            var height = $(this).parent().data("height");

            var width = $(this).parent().data("width");


            if ($(this).hasClass("element_top")){

                if (row_start <= 1){

                    return false;
                }

                row_start = row_start - 1;

                $(this).parent().css("grid-row-start", String(row_start));
            }

            if ($(this).hasClass("element_right")){

                if (column_start + width > column_max){
                    return false;
                }

                column_start = column_start + 1;

                $(this).parent().css("grid-column-start", String(column_start));
            }

            if ($(this).hasClass("element_left")){

                if (column_start <= 1){
                    return false;
                }

                column_start = column_start - 1;

                $(this).parent().css("grid-column-start", String(column_start));
            }

            if ($(this).hasClass("element_bottom")){

                if (row_start + height > row_max){

                    return false;
                }

                row_start = row_start + 1;

                $(this).parent().css("grid-row-start", String(row_start));
            }

            $(this).parent().data("left", column_start);

            $(this).parent().data("top", row_start);

            $(this).parent().css("grid-column-end", String(column_start + width));

            $(this).parent().css("grid-row-end", String(row_start + height));
        });

        $(".app").append(element)

    });

})
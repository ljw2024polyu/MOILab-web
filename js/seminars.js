$(".header").load("components/header.html");
$(".footer").load("components/footer.html");
$(document).ready(function () {

    // 从 YAML 文件加载事件数据
    $.ajax({
        type: "GET",
        url: "yml/seminars.yml",
        success: function (data) {
            var seminars = jsyaml.load(data);

            if (!seminars){
                var coming = '<h2 style="text-align: center; margin: 100px auto">Coming Soon</h2>';
                $('.seminars').append(coming);
            }else{
                generateYearFolder(seminars);
                seminars.forEach(function (seminar) {

                    var title = seminar.title;
                    var date = seminar.date;
                    var speaker = seminar.speaker;
                    var venue = seminar.venue;


                    var meeting = seminar.meeting;
                    var poster = seminar.poster;
                    var video = seminar.video;
                    var photo = seminar.photo;

                    link_line = "";
                    var changeable_val = [meeting,poster,video,photo];
                    var changeable_key = ["Meeting link","Poster","Video","Photo"];
                    var changeble_val_unnull = [];
                    var changeble_key_unnull = [];
                    for (var i=0; i<changeable_val.length; i++){
                        if (changeable_val[i]){
                            changeble_val_unnull.push(changeable_val[i]);
                            changeble_key_unnull.push(changeable_key[i]);
                        }
                    }

                    // var changeable = {"Poster":poster,"Video":video,"Photo":photo};
                    for (var i = 0; i < changeble_val_unnull.length; i++) {
                        if (changeble_val_unnull[i]) {
                            if (i !== changeble_val_unnull.length - 1) {
                                link_line += '<a href="' + changeble_val_unnull[i] + '">' + changeble_key_unnull[i] + '</a> | ';
                            } else {
                                link_line += '<a href="' + changeble_val_unnull[i] + '">' + changeble_key_unnull[i] + '</a>';
                            }
                        }
                    }
                    // console.log(link_line)

                    var regex = /\d{4}/;        //match year in date by regular expression
                    var matched = date.match(regex);
                    if (matched) {
                        var year = matched[0];
                    } else {
                        var year = (new Date()).getFullYear();
                    }

                    if (venue!=null){
                        var eventCard = '<div class="event-card seminars-card">' +
                            '<h4>' + title + '</h4>' +
                            '<p>Date: ' + date + '</p>' +
                            '<p>Venue: ' + venue + '</p>' +
                            '<p>Speaker: '+ speaker + '</p>' +
                            '<p>' + link_line + '</p>' +
                            '</div>';
                    }else {
                        var eventCard = '<div class="event-card seminars-card">' +
                            '<h4>' + title + '</h4>' +
                            '<p>Date: ' + date + '</p>' +
                            '<p>Speaker: '+ speaker + '</p>' +
                            '<p>' + link_line + '</p>' +
                            '</div>';
                    }

                    var selector = "#" + year;
                    $(selector).append(eventCard);
                });
            }

        },
        error: function (xhr, status, error) {
            console.log("Error loading YAML file:", error);
        }
    });

});

function toggleYears(year) {
    var container = document.getElementById(year);
    if (container.classList.contains('hide')) {
        container.classList.remove('hide');
    } else {
        container.classList.add('hide');
    }
}

function generateYearFolder(data) {
    var semianrs = data;
    var yearSet = new Set();
    semianrs.forEach(function (semianr) {
        var date = semianr.date;

        var regex = /\d{4}/;        //match year in date by regular expression
        var matched = date.match(regex);
        if (matched) {
            var year = matched[0];
        } else {
            var year = (new Date()).getFullYear();
        }
        yearSet.add(year);
    });


    yearSet.forEach(function (year) {
        var yearFolder = '<div class="year" onclick=toggleYears("' + year + '")>' + year + '</div>' +
            '<div id="' + year + '" class="event-container">' + '</div>';

        $('#eventContainer').append(yearFolder);
    });

}
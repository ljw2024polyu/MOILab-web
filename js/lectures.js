$(".header").load("components/header.html");
$(".footer").load("components/footer.html");
$(document).ready(function () {

    // 从 YAML 文件加载事件数据
    $.ajax({
        type: "GET",
        url: "yml/lectures.yml",
        success: function (data) {
            var lectures = jsyaml.load(data);
            if (!lectures){
                var coming = '<h2 style="text-align: center; margin: 100px auto">Coming Soon</h2>';
                $('.eventContainer').append(coming);
            }else {
                generateYearFolder(lectures);
                lectures.forEach(function (lecture) {

                    var title = lecture.title;
                    var date = lecture.date;
                    var time = lecture.time;
                    var detail = lecture.detail;
                    var poster = lecture.poster;
                    var venue = lecture.venue;
                    //changeable variable
                    var meeting = lecture.meeting;
                    var video = lecture.video;
                    var photo = lecture.photo;

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
                                link_line += '<a href="' + changeble_val_unnull[i] + '" target=_blank>' + changeble_key_unnull[i] + '</a> | ';
                            } else {
                                link_line += '<a href="' + changeble_val_unnull[i] + '" target=_blank>' + changeble_key_unnull[i] + '</a>';
                            }
                        }
                    }

                    var regex = /\d{4}/;        //match year in date by regular expression
                    var matched = date.match(regex);
                    if (matched) {
                        var year = matched[0];
                    } else {
                        var year = (new Date()).getFullYear();
                    }

                    if (venue!=null){
                        var eventCard = '<div class="event-card row">' +
                            '<div class="col-md-4">' + '<img src="' + poster + '" style="width: 100%">' + '</div>' +
                            '<div class="col-md-8">' +
                            '<h4>' + title + '</h4>' +
                            '<p>Date: ' + date + '</p>' +
                            '<p>Time: ' + time + '</p>' +
                            '<p>Venue: ' + venue + '</p>' +
                            '<p>' + link_line + '</p>' +
                            '<a href="' + detail + '" class="btn btn-primary">Details</a>' +
                            '</div>' +
                            '</div>';
                    }else {
                        var eventCard = '<div class="event-card row">' +
                            '<div class="col-md-4">' + '<img src="' + poster + '" style="width: 100%">' + '</div>' +
                            '<div class="col-md-8">' +
                            '<h4>' + title + '</h4>' +
                            '<p>Date: ' + date + '</p>' +
                            '<p>Time: ' + time + '</p>' +
                            '<p>' + link_line + '</p>' +
                            '<a href="' + detail + '" class="btn btn-primary">Details</a>' +
                            '</div>' +
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

function generateYearFolder(data) {
    var lectures = data;
    var yearSet = new Set();
    lectures.forEach(function (lecture) {
        var date = lecture.date;

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

function toggleYears(year) {
    var container = document.getElementById(year);
    if (container.classList.contains('hide')) {
        container.classList.remove('hide');
    } else {
        container.classList.add('hide');
    }
}
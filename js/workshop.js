$(".header").load("components/header.html");
$(".footer").load("components/footer.html");
$(document).ready(function () {

    // 从 YAML 文件加载事件数据
    $.ajax({
        type: "GET",
        url: "yml/workshop.yml",
        success: function (data) {
            var workshops = jsyaml.load(data);
            generateYearFolder(workshops);
            workshops.forEach(function (workshop) {

                var title = workshop.title;
                var date = workshop.date;
                var time = workshop.time;
                var venue = workshop.venue;
                var speaker = workshop.speaker;


                var meeting = workshop.meeting;
                var poster = workshop.poster;
                var video = workshop.video;
                var photo = workshop.photo;
                var website = workshop.website;

                link_line = "";
                var changeable_val = [meeting,poster,video,photo,website];
                var changeable_key = ["Meeting link","Poster","Video","Photo","Website"];
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
                        '<p>Time: '+ time + '</p>' +
                        '<p>Venue: ' + venue + '</p>' +
                        '<p>Speaker: '+ speaker + '</p>' +
                        '<p>' + link_line + '</p>' +
                        '</div>';
                }else {
                    var eventCard = '<div class="event-card seminars-card">' +
                        '<h4>' + title + '</h4>' +
                        '<p>Date: ' + date + '</p>' +
                        '<p>Time: '+ time + '</p>' +
                        '<p>' + link_line + '</p>' +
                        '</div>';
                }


                var selector = "#" + year;
                // if (video && photo){
                //     var eventCard = '<div class="event-card seminars-card">' +
                //         '<h4>' + title + '</h4>' +
                //         '<p>Date: ' + date + '</p>' +
                //         '<p>Speaker: '+ speaker + '</p>' +
                //         '<p style="display: inline"><a href="'+poster+'">Poster</a> | <a href="'+photo+'">Photo</a> | <a href="'+video+'">Video</a></p>' +
                //         '</div>';
                //
                //     var selector = "#" + year;
                // }
                // else if (video){
                //     var eventCard = '<div class="event-card seminars-card">' +
                //         '<h4>' + title + '</h4>' +
                //         '<p>Date: ' + date + '</p>' +
                //         '<p>Speaker: '+ speaker + '</p>' +
                //         '<p><a href="'+poster+'">Poster</a> | <a href="'+video+'">Video</a></p>' +
                //         '</div>';
                //
                //     var selector = "#" + year;
                // }else if (photo){
                //     var eventCard = '<div class="event-card seminars-card">' +
                //         '<h4>' + title + '</h4>' +
                //         '<p>Date: ' + date + '</p>' +
                //         '<p>Speaker: '+ speaker + '</p>' +
                //         '<p><a href="'+poster+'">Poster</a> | <a href="'+photo+'">Photo</a></p>' +
                //         '</div>';
                //
                //     var selector = "#" + year;
                // }



                $(selector).append(eventCard);
            });
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
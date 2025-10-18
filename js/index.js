
$(".header").load("components/header.html");
$(".footer").load("components/footer.html");
document.addEventListener("DOMContentLoaded", function() {
        // 使用 AJAX 读取 YAML 文件
        $.ajax({
            url: "yml/banner.yml",
            dataType: "text",
            success: function(data) {
                // 解析 YAML 数据
                const banners = jsyaml.load(data);
                console.log(banners);
                const indicators = document.getElementById('carousel-indicators');
                const inner = document.getElementById('carousel-inner');

                banners.forEach((banner, index) => {
                    // 创建轮播指示器
                    const indicator = document.createElement('li');
                    indicator.setAttribute('data-target', '#myCarousel');
                    indicator.setAttribute('data-slide-to', index);
                    if (index === 0) indicator.classList.add('active');
                    indicators.appendChild(indicator);

                    // 创建轮播项目
                    const item = document.createElement('div');
                    item.classList.add('item');
                    if (index === 0) item.classList.add('active');

                    const link = document.createElement('a');
                    link.setAttribute('href', banner.hyperlink);
                    link.setAttribute('target', '_blank');

                    const img = document.createElement('img');
                    img.setAttribute('src', banner.banner_image_path);

                    link.appendChild(img);
                    item.appendChild(link);
                    inner.appendChild(item);
                });
            },
            error: function() {
                console.error("Failed to load YAML file.");
            }
        });
    });

$(document).ready(function() {    //console.log("This website was designed & built by Maojun Sun(PhD Student, AMA, 24fall)");

    // // 从 YAML 文件加载事件数据
    // $.ajax({
    //     type: "GET",
    //     url: "yml/announcement.yml",
    //     success: function(data) {
    //         var events = jsyaml.load(data);
    //         events.slice(0, 4).forEach(function(event) { // only show top2 events
    //             var title = event.title;
    //             var date = event.date;
    //             var detail = event.detail;
    //
    //             var eventCard = '<div href="'+detail+'" class="col-md-3 eventCard">\n' +
    //                 '                <div class="event">\n' +
    //                 '                    <div>\n' +
    //                 '                        <div class="time">' + date + '</div>\n' +
    //                 '                        <div class="title">' + title + '</div>\n' +
    //                 '                        <div>\n' +
    //                 '                            <a href="'+detail+'">Read\n' +
    //                 '                                More > </a></div>\n' +
    //                 '                    </div>\n' +
    //                 '                </div>\n' +
    //                 '            </div>';
    //
    //             $('#announcements').append(eventCard);
    //         });
    //         $('.event').click(function() {
    //             var url = $(this).find('a').attr('href');
    //             window.location.href = url;
    //         });
    //     },
    //     error: function(xhr, status, error) {
    //         console.log("Error loading YAML file:", error);
    //     }
    // });
    //
    // $.ajax({
    //     type: "GET",
    //     url: "yml/conferences(back).yml",
    //     success: function(data) {
    //         var events = jsyaml.load(data);
    //         events.slice(0, 2).forEach(function(event) { // only show top2 events
    //             var title = event.title;
    //             var date = event.date;
    //             var location = event.location;
    //             var detail = event.detail;
    //             var imgUrl = event.image;
    //
    //             var eventCard = '<div href="'+detail+'" class="col-md-4 eventCard">\n' +
    //                 '                <div class="event">\n' +
    //                 '                    <div>\n' +
    //                 '                        <img src="' + imgUrl + '" alt="">\n' +
    //                 '                    </div>\n' +
    //                 '                    <div>\n' +
    //                 '                        <div class="time">' + date + '</div>\n' +
    //                 '                        <div class="title">' + title + '</div>\n' +
    //                 '                        <div class="location">' + location + '</div>\n' +
    //                 '                        <div>\n' +
    //                 '                            <a href="'+detail+'">Read\n' +
    //                 '                                More > </a></div>\n' +
    //                 '                    </div>\n' +
    //                 '                </div>\n' +
    //                 '            </div>';
    //
    //             $('#conferences').append(eventCard);
    //         });
    //         $('.event').click(function() {
    //             var url = $(this).find('a').attr('href');
    //             window.location.href = url;
    //         });
    //     },
    //     error: function(xhr, status, error) {
    //         console.log("Error loading YAML file:", error);
    //     }
    // });
    //
    // $.ajax({
    //     type: "GET",
    //     url: "yml/seminars.yml",
    //     success: function(data) {
    //         var events = jsyaml.load(data);
    //         events.slice(0, 3).forEach(function(event) { // only show top2 events
    //             var title = event.title;
    //             var date = event.date;
    //             var location = event.location;
    //             var speaker = event.speaker;
    //             var detail = event.detail;
    //             var imgUrl = event.image;
    //
    //             var eventCard = '<div href="'+detail+'" class="col-md-4 eventCard">\n' +
    //                 '                <div class="event">\n' +
    //                 '                    <div>\n' +
    //                 '                        <img src="' + imgUrl + '" alt="">\n' +
    //                 '                    </div>\n' +
    //                 '                    <div>\n' +
    //                 '                        <div class="time">' + date + '</div>\n' +
    //                 '                         <div class="speaker">Speaker: ' + speaker + '</div>'+
    //                 '                        <div class="title">' + title + '</div>\n' +
    //                 '                        <div class="location">' + location + '</div>\n' +
    //                 '                        <div>\n' +
    //                 '                            <a href="'+detail+'">Read\n' +
    //                 '                                More > </a></div>\n' +
    //                 '                    </div>\n' +
    //                 '                </div>\n' +
    //                 '            </div>';
    //
    //             $('#seminars').append(eventCard);
    //         });
    //         $('.event').click(function() {
    //             var url = $(this).find('a').attr('href');
    //             window.location.href = url;
    //         });
    //     },
    //     error: function(xhr, status, error) {
    //         console.log("Error loading YAML file:", error);
    //     }
    // });
});

// const longText = document.getElementById('long-text');
// const readMoreBtn = document.getElementById('read-more');
// const textContent = document.getElementById('text-content');
//
// readMoreBtn.addEventListener('click', function(event) {
//     event.preventDefault();
//     longText.classList.toggle('expanded');
//
//     if (longText.classList.contains('expanded')) {
//         readMoreBtn.textContent = 'Shrink';
//         textContent.style.maxHeight = textContent.scrollHeight + 'px';
//     } else {
//         readMoreBtn.textContent = 'Read More';
//         textContent.style.maxHeight = '110px';
//     }
// });

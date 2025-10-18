$(".header").load("components/header.html");
$(".footer").load("components/footer.html");
// 异步加载 YAML 文件
function loadYAMLFile(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.responseText);
                } else {
                    reject(xhr.statusText);
                }
            }
        };
        xhr.send();
    });
}

// 解析 YAML 数据并填充表格
function parseYAMLData(data) {
    var data = jsyaml.load(data);
    data['director'].forEach(function(data) {
        var name = data.name;
        var link = data.link;
        var peo = '<div class="line">' +
            ' <a href=" '+link+' ">  '+name+'  </a> '+
            '</div>';
        $('#director').append(peo);
    });
    data['deputy'].forEach(function(data) {
        var name = data.name;
        var link = data.link;
        var peo = '<div class="line">' +
            ' <a href=" '+link+' ">  '+name+'  </a> '+
            '</div>';
        $('#deputy').append(peo);
    });
    data['assistant'].forEach(function(data) {
        var name = data.name;
        var link = data.link;
        var peo = '<div class="line">' +
            ' <a href=" '+link+' ">  '+name+'  </a> '+
            '</div>';
        $('#management').append(peo);
    });
    data['member'].forEach(function(data) {
        var name = data.name;
        var link = data.link;
        var peo = '<div class="line">' +
            ' <a href=" '+link+' ">  '+name+'  </a> '+
            '</div>';
        $('#member').append(peo);
    });
}

function toggle(name) {
    var container = document.getElementById(name);
    if (container.classList.contains('hide')) {
        container.classList.remove('hide');
    } else {
        container.classList.add('hide');
    }
}

// 从 YAML 文件中加载数据并解析
loadYAMLFile('yml/structure.yml')
    // .then(console.log("load_data_successful"))
    .then(parseYAMLData)
    .catch(error => {
        console.error('Failed to load YAML file:', error);
    });
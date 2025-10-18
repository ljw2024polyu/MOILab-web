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
    const parsedData = jsyaml.load(data);
    if (!parsedData){
        var coming = '<h2 style="text-align: center; margin: 100px auto">Coming Soon</h2>';
        $('.section-content').append(coming);
    }else {
        const publicationsContainer = document.querySelector('#dyna-publication');
        for (const year in parsedData){
            const year_title = document.createElement("div");
            year_title.className = "year_title";
            year_title.textContent = year;

            const content = document.createElement("div");
            content.className = "content";
            for (let i = 0; i < parsedData[year].length; i++) {
                const publication = document.createElement("li");
                publication.className = "publication_item";
                publication.textContent = parsedData[year][i];
                content.appendChild(publication);
            }

            publicationsContainer.appendChild(year_title);
            publicationsContainer.appendChild(content);

            year_title.addEventListener("click", function() {
                content.style.display = content.style.display === "none" ? "block" : "none";
            });

        }
    }
    // console.log(parsedData)
    // const sortedYears = Object.keys(parsedData).sort((a, b) => b - a);

}


// 从 YAML 文件中加载数据并解析
loadYAMLFile('yml/publication.yml')
    // .then(console.log("load_data_successful"))
    .then(parseYAMLData)
    .catch(error => {
        console.error('Failed to load YAML file:', error);
    });

function toggle(name) {
    var container = document.getElementById(name);
    if (container.classList.contains('hide')) {
        container.classList.remove('hide');
    } else {
        container.classList.add('hide');
    }
}
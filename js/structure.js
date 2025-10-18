/* Load header / footer */
$(".header").load("components/header.html");
$(".footer").load("components/footer.html");

/* Utility: escape HTML */
function esc(s){return String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;")
  .replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");}

/* Fetch YAML (Promise) */
function fetchYAML(url){
  return new Promise(function(resolve,reject){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function(){
      if (xhr.readyState === 4){
        if (xhr.status === 200) resolve(xhr.responseText);
        else reject(new Error("HTTP "+xhr.status+" loading "+url));
      }
    };
    xhr.send();
  });
}

/* Build one lecture card (Bootstrap) */
function buildLectureCard(item){
  // Required fields
  var title   = esc(item.title);
  var speaker = esc(item.speaker);
  var affil   = esc(item.affiliation || "");
  var date    = esc(item.date    || "");
  var time    = esc(item.time    || "");
  var venue   = esc(item.venue   || "");
  var host    = esc(item.host    || "");
  var abs     = esc(item.abstract || "");

  // Optional links
  var slides  = item.slides ? `<a href="${esc(item.slides)}" target="_blank" rel="noopener">Slides</a>` : "";
  var video   = item.video  ? `<a href="${esc(item.video)}"  target="_blank" rel="noopener">Video</a>`  : "";
  var poster  = item.poster ? `<img class="lecture-poster" src="${esc(item.poster)}" alt="${title} poster">` : "";

  // Tags
  var tagsHTML = "";
  if (Array.isArray(item.tags)) {
    tagsHTML = item.tags.map(function(t){ return `<span class="tag">${esc(t)}</span>`; }).join(" ");
  }

  // Meta lines
  var metaLines = [];
  if (affil) metaLines.push(affil);
  if (date || time) metaLines.push([date,time].filter(Boolean).join("  ·  "));
  if (venue) metaLines.push(venue);
  if (host)  metaLines.push("Host: " + host);

  var actions = [slides, video].filter(Boolean).join(" ");

  // Card HTML
  return `
  <div class="col-sm-12 col-md-6 lecture-card wow fadeInUp">
    <div class="panel panel-default">
      ${poster ? `<div class="panel-image">${poster}</div>` : ""}
      <div class="panel-body">
        <h3 style="margin-top:0">${title}</h3>
        <p><strong>${speaker}</strong></p>
        ${metaLines.length ? `<p class="lecture-meta">${metaLines.join("<br>")}</p>` : ""}
        ${abs ? `<p style="margin-top:10px">${abs}</p>` : ""}
        ${tagsHTML ? `<div style="margin-top:8px">${tagsHTML}</div>` : ""}
        ${actions ? `<div class="lecture-actions" style="margin-top:12px">${actions}</div>` : ""}
      </div>
    </div>
  </div>`;
}

/* Render all lectures into the grid */
function renderLectures(list){
  var row = document.getElementById("lecturesRow");
  if (!row) return;

  // Optional: sort by date descending if ISO format is used (YYYY-MM-DD)
  var sorted = (list || []).slice().sort(function(a,b){
    var da = Date.parse(a.date || "") || 0;
    var db = Date.parse(b.date || "") || 0;
    return db - da;
  });

  // Build & inject
  var html = sorted.map(buildLectureCard).join("");
  row.innerHTML = html || `<div class="col-sm-12"><p>No lectures published yet.</p></div>`;
}

/* Entry */
fetchYAML("yml/lectures.yml")
  .then(function(text){ return jsyaml.load(text); })
  .then(function(data){
    // Expecting { lectures: [ ... ] }
    renderLectures((data && data.lectures) || []);
  })
  .catch(function(err){
    console.error(err);
    var row = document.getElementById("lecturesRow");
    if (row) row.innerHTML = `<div class="col-sm-12"><p>Failed to load lectures.</p></div>`;
  });

/* ===== Header / Footer ===== */ 
$(".header").load("components/header.html");
$(".footer").load("components/footer.html");

/* ===== Helpers ===== */
function esc(s){
  return String(s||"")
    .replace(/&/g,"&amp;").replace(/</g,"&lt;")
    .replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
}

// DO NOT override jQuery `$`
const qs = (sel, root=document) => root.querySelector(sel);

function exists(sel){ return !!qs(sel); }

function renderList(sel, arr){
  const el = qs(sel);
  if (!el || !Array.isArray(arr)) return false;
  el.innerHTML = "";
  arr.forEach(item=>{
    if (!item) return;
    const name = esc(item.name || "");
    const link = (item.link || "#").trim();
    const aff  = item.affiliation ? ` (${esc(item.affiliation)})` : "";
    const div = document.createElement("div");
    div.className = "line";
    div.innerHTML = `<a href="${esc(link)}" target="_blank" rel="noopener">${name}${aff}</a>`;
    el.appendChild(div);
  });
  return true;
}

function appendTextList(sel, arr){
  const el = qs(sel);
  if (!el || !Array.isArray(arr)) return false;
  el.innerHTML = "";
  arr.forEach(t=>{
    const s = typeof t==="string" ? t : (t && t.name) ? t.name : "";
    if (!s) return;
    const div = document.createElement("div");
    div.className = "line";
    div.textContent = s;
    el.appendChild(div);
  });
  return true;
}

/* ===== Load YAML ===== */
function loadYAML(url){
  return new Promise((resolve,reject)=>{
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function(){
      if (xhr.readyState===4){
        if (xhr.status===200) resolve(xhr.responseText);
        else reject(new Error("HTTP "+xhr.status+" "+url));
      }
    };
    xhr.send();
  });
}

/* ===== Parse & Render (auto-detect IDs) ===== */
function parseYAMLData(text){
  const data = jsyaml.load(text) || {};
  const directors = data.director || [];
  const deputies  = data.deputy   || [];
  const members   = data.member   || [];
  const assists   = data.assistant|| [];
  const teams     = data.research_teams || [];

  // director / deputy
  renderList("#tc-director", directors) || renderList("#director", directors);
  renderList("#tc-deputy",  deputies)  || renderList("#deputy",  deputies);

  // Technical Committee members
  if (!renderList("#tc-members", members)) {
    const polyu  = members.filter(x => (x.affiliation||"").toLowerCase()==="polyu");
    const huawei = members.filter(x => (x.affiliation||"").toLowerCase()==="huawei");
    const anySplit =
      renderList("#tc-members-polyu",  polyu) ||
      renderList("#tc-members-huawei", huawei);
    if (!anySplit) {
      renderList("#member", members); // legacy
    }
  }

  // Management Support Team
  if (!renderList("#mst", assists)) {
    const polyu  = assists.filter(x => (x.affiliation||"").toLowerCase()==="polyu");
    const huawei = assists.filter(x => (x.affiliation||"").toLowerCase()==="huawei");
    const anySplit =
      renderList("#mst-polyu",  polyu) ||
      renderList("#mst-huawei", huawei);
    if (!anySplit) {
      renderList("#management", assists); // legacy
    }
  }

  // Research teams (optional)
  appendTextList("#research-teams", teams);
}

/* ===== Start ===== */
loadYAML("yml/structure.yml")
  .then(parseYAMLData)
  .catch(err=>{
    console.error(err);
  });

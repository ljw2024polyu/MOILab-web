/* Load header / footer */
$(".header").load("components/header.html");
$(".footer").load("components/footer.html");

/* --- Fetch YAML file (async) --- */
function loadYAMLFile(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) resolve(xhr.responseText);
        else reject(xhr.statusText || "HTTP " + xhr.status);
      }
    };
    xhr.send();
  });
}

// --- Safe HTML escape (avoid inserting raw text) ---
function esc(s){ return String(s||"")
  .replace(/&/g,"&amp;").replace(/</g,"&lt;")
  .replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"); }

// Render a list of {name, link, affiliation}
function renderList(selector, list) {
  const el = document.querySelector(selector);
  if (!el || !Array.isArray(list)) return;
  list.forEach((item) => {
    if (!item) return;
    const name = esc(item.name || "");
    const aff  = item.affiliation ? ` (${esc(item.affiliation)})` : "";
    const link = (item.link || "#").trim();

    const line = document.createElement("div");
    line.className = "line";
    line.innerHTML = `<a href="${esc(link)}" target="_blank" rel="noopener">${name}${aff}</a>`;
    el.appendChild(line);
  });
}

// Append plain text items (for research team names)
function appendTextList(selector, arr) {
  const el = document.querySelector(selector);
  if (!el || !Array.isArray(arr)) return;
  arr.forEach((v) => {
    const text = (typeof v === "string") ? v : (v && v.name) ? v.name : "";
    if (!text) return;
    const line = document.createElement("div");
    line.className = "line";
    line.textContent = text;
    el.appendChild(line);
  });
}

/* --- Parse YAML & render --- */
function parseYAMLData(yamlText) {
  const data = jsyaml.load(yamlText) || {};

  // 1) Technical Committee: director & deputy
  renderList("#tc-director", data.director || []);
  renderList("#tc-deputy",   data.deputy   || []);

  // 2) Technical Committee members (split by PolyU / Huawei via name)
  const tcMembers = (data.member || []);
  const tcPolyU   = tcMembers.filter(m => m && /polyu/i.test(m.name || ""));
  const tcHuawei  = tcMembers.filter(m => m && /huawei/i.test(m.name || ""));
  renderList("#tc-members-polyu",  tcPolyU);
  renderList("#tc-members-huawei", tcHuawei);

  // 3) Management Support Team (assistant in YAML)
  const assistants = (data.assistant || []);
  const mstPolyU   = assistants.filter(m => m && /polyu/i.test(m.name || ""));
  const mstHuawei  = assistants.filter(m => m && /huawei/i.test(m.name || ""));
  renderList("#mst-polyu",  mstPolyU);
  renderList("#mst-huawei", mstHuawei);

  // 4) Research Teams (optional array of strings or {name})
  appendTextList("#research-teams", data.research_teams || []);
}

/* --- Show/Hide sections --- */
function toggle(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.toggle("hide");
}

/* --- Kick off --- */
loadYAMLFile("yml/structure.yml")
  .then(parseYAMLData)
  .catch(err => console.error("Failed to load YAML file:", err));

  function parseYAMLData(yamlText) {
    const data = jsyaml.load(yamlText) || {};
  
    // helpers
    const byAff = (arr, org) => (arr || []).filter(x => (x && (x.affiliation||'').toLowerCase() === org));
    const render = (sel, arr) => renderList(sel, arr || []);
  
    // Technical Committee
    render("#tc-director", data.director);
    render("#tc-deputy",  data.deputy);
  
    render("#tc-members-polyu",  byAff(data.member, "polyu"));
    render("#tc-members-huawei", byAff(data.member, "huawei"));
  
    // Management Support Team
    render("#mst-polyu",  byAff(data.assistant, "polyu"));
    render("#mst-huawei", byAff(data.assistant, "huawei"));
  
    // Research Teams
    appendTextList("#research-teams", data.research_teams);
  }
  
// Load shared header/footer
$(".header").load("components/header.html");
$(".footer").load("components/footer.html");

// ---- Load YAML via XHR ----
function loadYAMLFile(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) resolve(xhr.responseText);
        else reject(xhr.statusText || "XHR failed");
      }
    };
    xhr.send();
  });
}

// ---- Safe DOM appenders ----
function appendLine(containerSelector, person) {
  // Create: <div class="line"><a href="...">Name</a>, Title, Affiliation</div>
  var $c = $(containerSelector);
  if ($c.length === 0 || !person) return;

  var div = document.createElement("div");
  div.className = "line";

  var a = document.createElement("a");
  a.href = String(person.link || "#");
  a.textContent = String(person.name || "");
  a.rel = "noopener";
  a.target = "_blank";
  div.appendChild(a);

  var parts = [];
  if (person.title) parts.push(person.title);
  if (person.affiliation) parts.push(person.affiliation);
  if (parts.length) {
    var span = document.createElement("span");
    span.textContent = ", " + parts.join(", ");
    div.appendChild(span);
  }

  $c.append(div);
}

function appendList(containerSelector, arr) {
  (Array.isArray(arr) ? arr : []).forEach(function (p) {
    appendLine(containerSelector, p);
  });
}

// ---- Parse & Render with NEW schema ----
function parseYAMLData(yamlText) {
  var obj = {};
  try {
    obj = jsyaml.load(yamlText) || {};
  } catch (e) {
    console.error("YAML parse error:", e);
    return;
  }

  // Technical Committee -> PolyU
  var tcPolyU = obj?.technical_committee?.polyu || {};
  appendList("#tc-polyu-director", tcPolyU.director);
  appendList("#tc-polyu-members", tcPolyU.members);

  // Technical Committee -> Huawei
  var tcHuawei = obj?.technical_committee?.huawei || {};
  appendList("#tc-huawei-deputy", tcHuawei.deputy_director);
  appendList("#tc-huawei-members", tcHuawei.members);

  // Management Support Team
  appendList("#mst-polyu", obj?.management_support_team?.polyu || []);
  appendList("#mst-huawei", obj?.management_support_team?.huawei || []);
}

// ---- Entry ----
$(function () {
  loadYAMLFile("yml/structure.yml")
    .then(parseYAMLData)
    .catch(function (err) {
      console.error("Failed to load YAML file:", err);
    });
});

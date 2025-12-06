let cases = [];

// Load from localStorage (so data stays after refresh)
function loadCases() {
    const saved = localStorage.getItem("cases");
    cases = saved ? JSON.parse(saved) : [];
}

// Save to localStorage
function saveCases() {
    localStorage.setItem("cases", JSON.stringify(cases));
}

// Render table rows
function renderCases() {
    const tbody = document.getElementById("case-table-body");
    tbody.innerHTML = "";

    cases.forEach((c, index) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${c.caseNumber}</td>
            <td>${c.partyName}</td>
            <td>${c.caseType}</td>
            <td>${c.priority}</td>
            <td>${c.status}</td>
            <td>${c.hearingDate || "-"}</td>
            <td><button class="btn btn-small" data-index="${index}">Delete</button></td>
        `;

        tbody.appendChild(tr);
    });

    // Attach delete listeners
    document.querySelectorAll("button[data-index]").forEach(btn => {
        btn.addEventListener("click", () => {
            const idx = btn.getAttribute("data-index");
            cases.splice(idx, 1);
            saveCases();
            renderCases();
        });
    });
}

// Handle form submit
function setupForm() {
    const form = document.getElementById("case-form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const caseNumber = document.getElementById("caseNumber").value.trim();
        const partyName = document.getElementById("partyName").value.trim();
        const caseType = document.getElementById("caseType").value;
        const priority = document.getElementById("priority").value;
        const status = document.getElementById("status").value;
        const hearingDate = document.getElementById("hearingDate").value;

        if (!caseNumber || !partyName) {
            alert("Please fill in Case Number and Party Name.");
            return;
        }

        const newCase = {
            caseNumber,
            partyName,
            caseType,
            priority,
            status,
            hearingDate
        };

        cases.push(newCase);
        saveCases();
        renderCases();
        form.reset();
    });
}

// Init
document.addEventListener("DOMContentLoaded", () => {
    loadCases();
    setupForm();
    renderCases();
});

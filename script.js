const API_URL = "https://script.google.com/macros/s/AKfycbzpcnCO3S3JUi-1ti8qYI-IzXCR8wVvJOeKNz1JGHPQntZu7l1skEAth4ZKcKA5gIXe/exec";

async function carregarDados() {

  try {

    const response = await fetch(API_URL + "?nocache=" + Date.now());
    const data = await response.json();

    console.log(data);

    // =========================
    // ESTATÍSTICAS
    // =========================
    document.getElementById("membros").innerText =
      data.estatisticas?.membros ?? 0;

    document.getElementById("congregados").innerText =
      data.estatisticas?.congregados ?? 0;

    document.getElementById("batizados").innerText =
      data.estatisticas?.batizados ?? 0;


    // =========================
    // AVISOS (COM ANIMAÇÃO EM CASCATA)
    // =========================
    const avisosContainer = document.getElementById("avisos-container");

    if (avisosContainer && Array.isArray(data.avisos)) {

      avisosContainer.innerHTML = "";

      data.avisos.forEach((aviso, index) => {

        const card = document.createElement("div");
        card.className = "card";
        card.style.animationDelay = (index * 0.08) + "s";

        card.innerHTML = `
          <strong>${aviso.titulo}</strong><br>
          ${formatarData(aviso.data)}
        `;

        avisosContainer.appendChild(card);

      });
    }


    // =========================
    // AGENDA (COM ANIMAÇÃO EM CASCATA)
    // =========================
    const agendaContainer = document.getElementById("agenda-container");

    if (agendaContainer && Array.isArray(data.agenda)) {

      agendaContainer.innerHTML = "";

      data.agenda.forEach((item, index) => {

        const card = document.createElement("div");
        card.className = "card";
        card.style.animationDelay = (index * 0.08) + "s";

        card.innerHTML = `
          <strong>${item.evento}</strong><br>
          ${item.dia} • ${item.hora}
        `;

        agendaContainer.appendChild(card);

      });
    }

  } catch (error) {
    console.error("Erro ao carregar dados:", error);
  }
}


// =========================
// UTILITÁRIO DE DATA
// =========================
function formatarData(data) {
  if (!data) return "";

  const d = new Date(data);

  if (isNaN(d.getTime())) return data;

  return d.toLocaleDateString("pt-BR");
}


// =========================
// INICIALIZA
// =========================
carregarDados();

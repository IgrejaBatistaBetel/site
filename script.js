const API_URL = "https://script.google.com/macros/s/AKfycbzpcnCO3S3JUi-1ti8qYI-IzXCR8wVvJOeKNz1JGHPQntZu7l1skEAth4ZKcKA5gIXe/exec";

async function carregarDados() {

  try {

    const response = await fetch(API_URL + "?nocache=" + Date.now());
    const data = await response.json();

    console.log("DADOS API:", data);

    // =========================
    // ESTATÍSTICAS
    // =========================
    atualizarTexto("membros", data.estatisticas?.membros);
    atualizarTexto("congregados", data.estatisticas?.congregados);
    atualizarTexto("batizados", data.estatisticas?.batizados);


    // =========================
    // AVISOS
    // =========================
    renderLista("avisos-container", data.avisos, (aviso) => `
      <div class="card">
        <strong>${aviso.titulo}</strong><br>
        ${formatarData(aviso.data)}
      </div>
    `);


    // =========================
    // AGENDA
    // =========================
    renderLista("agenda-container", data.agenda, (item) => `
      <div class="card">
        <strong>${item.evento}</strong><br>
        ${item.dia} • ${item.hora}
      </div>
    `);


    // =========================
    // VERSÍCULO DA SEMANA
    // =========================
    const versiculoElement = document.getElementById("versiculo");

    if (versiculoElement && data.versiculo) {

      versiculoElement.style.opacity = 0;

      setTimeout(() => {
        versiculoElement.innerText = data.versiculo;
        versiculoElement.style.transition = "0.6s ease";
        versiculoElement.style.opacity = 1;
      }, 200);

    }


    // =========================
    // ORAÇÕES (NOVO!)
    // =========================
    renderLista("oracoes-container", data.oracoes, (o) => `
      <div class="card">
        <strong>${o.nome}</strong><br>
        ${o.pedido}
      </div>
    `);

  } catch (error) {
    console.error("Erro ao carregar dados:", error);
  }
}


// =========================
// FUNÇÃO: ATUALIZAR TEXTO
// =========================
function atualizarTexto(id, valor) {
  const el = document.getElementById(id);
  if (el) el.innerText = valor ?? 0;
}


// =========================
// FUNÇÃO: RENDER LISTA COM ANIMAÇÃO
// =========================
function renderLista(containerId, lista, templateFn) {

  const container = document.getElementById(containerId);

  if (!container || !Array.isArray(lista)) return;

  container.innerHTML = "";

  lista.forEach((item, index) => {

    const wrapper = document.createElement("div");
    wrapper.innerHTML = templateFn(item);

    const element = wrapper.firstElementChild;

    if (element) {
      element.style.animationDelay = (index * 0.08) + "s";
      container.appendChild(element);
    }

  });

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

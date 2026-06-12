const API_URL = "https://script.google.com/macros/s/AKfycbzYpL9ixNvK2WD_g34ob3F9P9TBSUTPQaEDxZC-0_rn78xi-sRFRcO9mwRjC9PX0Jp7lg/exec";

async function carregarDados() {

  try {

    const response = await fetch(API_URL);
    const data = await response.json();

    console.log("Dados recebidos:", data);

    // Estatísticas

    document.getElementById("membros").innerText =
      data.estatisticas.membros || 0;

    document.getElementById("congregados").innerText =
      data.estatisticas.congregados || 0;

    document.getElementById("batizados").innerText =
      data.estatisticas.batizados || 0;

    // Avisos

    const avisosContainer =
      document.getElementById("avisos-container");

    if (avisosContainer) {

      avisosContainer.innerHTML = "";

      if (data.avisos && data.avisos.length > 0) {

        data.avisos.forEach(aviso => {

          avisosContainer.innerHTML += `
            <div class="card">
              <strong>${aviso.titulo}</strong>
              <br>
              ${new Date(aviso.data).toLocaleString("pt-BR")}
            </div>
          `;

        });

      } else {

        avisosContainer.innerHTML = `
          <div class="card">
            Nenhum aviso disponível.
          </div>
        `;

      }

    }

  } catch (error) {

    console.error("Erro ao carregar dados:", error);

  }

}

carregarDados();

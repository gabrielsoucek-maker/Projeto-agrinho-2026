 // Esconde todas as páginas
   /**
 * CONCURSO AGRINHO 2026
 * Tema: "Agro forte, futuro sustentável: o equilíbrio entre produção e meio ambiente"
 * * Lógica do Sistema: Single Page Application (SPA) e Simulador de Estufa
 */

// ==========================================
// 1. SISTEMA DE NAVEGAÇÃO DE PÁGINAS (ABAS)
// ==========================================
function mudarPagina(idPagina) {
    // Seleciona todas as seções de página e remove a classe 'active' para escondê-las
    const paginas = document.querySelectorAll('.page');
    paginas.forEach(pagina => {
        pagina.classList.remove('active');
    });

    // Seleciona todos os botões de navegação e remove a classe 'active'
    const botoes = document.querySelectorAll('.nav-btn');
    botoes.forEach(botao => {
        botao.classList.remove('active');
    });

    // Mostra a página que o usuário clicou adicionando a classe 'active'
    const paginaAlvo = document.getElementById(idPagina);
    if (paginaAlvo) {
        paginaAlvo.classList.add('active');
    }

    // Encontra o botão clicado através do atributo 'onclick' e ativa o visual dele
    const botaoAtivo = Array.from(botoes).find(btn => {
        const cliqueAtributo = btn.getAttribute('onclick');
        return cliqueAtributo && cliqueAtributo.includes(idPagina);
    });
    
    if (botaoAtivo) {
        botaoAtivo.classList.add('active');
    }
}

// ==========================================
// 2. INTELIGÊNCIA DO SIMULADOR DA ESTUFA
// ==========================================
function atualizarSimulador() {
    // 2.1. Captura com segurança os elementos de entrada (sliders)
    const inputTemp = document.getElementById('temp');
    const inputUmiAr = document.getElementById('umi-ar');
    const inputUmiSolo = document.getElementById('umi-solo');

    // Se algum elemento não existir na árvore HTML, interrompe para evitar erros no console
    if (!inputTemp || !inputUmiAr || !inputUmiSolo) return;

    // Converte os valores textuais dos inputs em números inteiros
    const temp = parseInt(inputTemp.value, 10);
    const umiAr = parseInt(inputUmiAr.value, 10);
    const umiSolo = parseInt(inputUmiSolo.value, 10);

    // 2.2. Atualiza os textos numéricos que o usuário vê na tela
    document.getElementById('val-temp').innerText = temp;
    document.getElementById('val-umi-ar').innerText = umiAr;
    document.getElementById('val-umi-solo').innerText = umiSolo;

    // 2.3. Captura os elementos de texto e caixas de alerta onde exibiremos os resultados
    const statusGeral = document.getElementById('status-geral');
    const statusRecursos = document.getElementById('status-recursos');
    const alertaMensagem = document.getElementById('alerta-mensagem');

    if (!statusGeral || !statusRecursos || !alertaMensagem) return;

    // 2.4. Criação das variáveis de análise ambiental
    let problemasDetectados = [];
    let gastoExcessivoRecursos = false;

    // --- ANÁLISE BIOLÓGICA DO MORANGUEIRO ---
    
    // Regra da Temperatura (Ideal para morangos: entre 18°C e 25°C)
    if (temp < 15) {
        problemasDetectados.push("Temperatura muito baixa (o crescimento da planta congela).");
    } else if (temp > 27) {
        problemasDetectados.push("Temperatura muito alta (provoca o abortamento de flores e frutos pequenos).");
    }

    // Regra da Umidade do Ar (Ideal: entre 60% e 80%)
    if (umiAr < 55) {
        problemasDetectados.push("Ar muito seco (provoca transpiração excessiva e desidrata as folhas).");
    } else if (umiAr > 85) {
        problemasDetectados.push("Ar excessivamente úmido (ambiente propício para proliferação de fungos e doenças).");
    }

    // Regra da Umidade do Solo (Ideal: entre 60% e 75%)
    if (umiSolo < 50) {
        problemasDetectados.push("Solo seco (estresse hídrico severo, as raízes não absorvem nutrientes).");
    } else if (umiSolo > 80) {
        problemasDetectados.push("Solo encharcado (falta oxigênio nas raízes, apodrecendo o sistema radicular).");
        gastoExcessivoRecursos = true; // Desperdício óbvio de água na irrigação
    }

    // --- ANÁLISE DE SUSTENTABILIDADE (Consumo energético e hídrico) ---
    // Se as condições externas forem extremas, os sistemas automatizados (aquecedores/exaustores) gastam muita energia
    if (temp > 32 || temp < 12 || umiAr < 45) {
        gastoExcessivoRecursos = true;
    }

    // 2.5. RENDERIZAÇÃO E FEEDBACK VISUAL NO SITE
    
    // Limpa todas as classes de estilização antigas da caixa de alerta
    alertaMensagem.className = "alert-box";

    // CASO 1: Tudo em perfeito equilíbrio (Foco no tema do Agrinho)
    if (problemasDetectados.length === 0) {
        statusGeral.innerText = "Excelente (Equilíbrio Ecológico)";
        statusGeral.style.color = "#2e7d32"; // Verde escuro
        
        statusRecursos.innerText = "Otimizado (Sustentável)";
        statusRecursos.style.color = "#2e7d32";

        alertaMensagem.innerText = "Parabéns! O ecossistema da estufa está em perfeito equilíbrio. Produção máxima com o menor impacto ambiental possível.";
        alertaMensagem.classList.add("estado-perfeito");
    } 
    // CASO 2: Apenas um parâmetro saindo do controle (Alerta amarelo)
    else if (problemasDetectados.length === 1 && !gastoExcessivoRecursos) {
        statusGeral.innerText = "Atenção / Regular";
        statusGeral.style.color = "#f57f17"; // Laranja/Amarelo

        statusRecursos.innerText = "Controle em Alerta";
        statusRecursos.style.color = "#f57f17";

        alertaMensagem.innerText = "Aviso do Sensor: " + problemasDetectados[0];
        alertaMensagem.classList.add("estado-alerta");
    } 
    // CASO 3: Múltiplos problemas ou alto desperdício (Estado Crítico)
    else {
        statusGeral.innerText = "Crítico / Desfavorável";
        statusGeral.style.color = "#c62828"; // Vermelho

        statusRecursos.innerText = gastoExcessivoRecursos 
            ? "Alto Desperdício de Recursos (Água/Energia)" 
            : "Risco de Perda Total da Safra";
        statusRecursos.style.color = "#c62828";

        // Une todos os problemas encontrados em um único texto separado por espaços
        alertaMensagem.innerText = "ALERTA DO SISTEMA: " + problemasDetectados.join(" ");
        alertaMensagem.classList.add("estado-critico");
    }
}

// ==========================================
// 3. INICIALIZAÇÃO AUTOMÁTICA
// ==========================================
// Garante que o simulador calcule o estado inicial correto assim que o HTML carregar na tela
window.addEventListener('DOMContentLoaded', () => {
    atualizarSimulador();
});
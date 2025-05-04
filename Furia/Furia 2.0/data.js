const chatbox = document.getElementById("chatbox");
    const input = document.getElementById("userInput");

    const perfilDoFan = {
      nome: null,
      pesquisandoInfo: false,
      coletaFase: 0,
      dados: {},
      revisando: false,
      consentimento: false
    };

    const coleta = [
      { pergunta: "Você segue a FURIA no Instagram? (sim/não)", campo: "Segue Instagram" },
      { pergunta: "Segue a FURIA no Twitter/X? (sim/não)", campo: "Segue Twitter" },
      { pergunta: "Já comprou algo na loja da FURIA? (sim/não)", campo: "Usou Loja" },
      { pergunta: "De qual cidade você fala, guerreiro?", campo: "Cidade" },
      { pergunta: "Você acompanha os jogos ao vivo? (sim/não)", campo: "Assiste Ao Vivo" },
      { pergunta: "Já participou de algum evento da FURIA? (sim/não)", campo: "Participou Evento" },
      { pergunta: "Qual seu jogador favorito da FURIA?", campo: "Jogador Favorito" },
      { pergunta: "Ja fou em algum stage acompanhar a furia de Perto? (sim/não)", campo: "Foi aos Jogos" },
      { pergunta: "Tem item oficial da FURIA em casa? (sim/não)", campo: "Tem Item Oficial" },
      { pergunta: "Como você conheceu a FURIA?", campo: "Como Conheceu" }
    ];

    function addMessage(text, sender) {
      const msg = document.createElement("div");
      msg.className = `message ${sender}`;
      msg.innerHTML = text;
      chatbox.appendChild(msg);
      chatbox.scrollTop = chatbox.scrollHeight;
    }

    function mostrarTabelaDeDados() {
      let tabela = '<table border="1" style="width:100%; color:#fff; border-collapse: collapse;">';
      for (let key in perfilDoFan.dados) {
        tabela += `<tr><td style='padding:4px;'>${key}</td><td style='padding:4px;'>${perfilDoFan.dados[key]}</td></tr>`;
      }
      tabela += '</table>';
      addMessage(`Aqui está o que você respondeu:<br><br>${tabela}<br><br>Está tudo certo? (sim/não)`, "bot");
      perfilDoFan.revisando = true;
    }

    function sendMessage() {
      const text = input.value.trim().toLowerCase();
      if (text === "") return;

      addMessage(text, "user");
      input.value = "";

      if (!perfilDoFan.nome) {
        perfilDoFan.nome = text.charAt(0).toUpperCase() + text.slice(1);
        addMessage(`Fechado, ${perfilDoFan.nome}! Agora quero saber mais sobre você.`, "bot");
        perfilDoFan.pesquisandoInfo = true;
        addMessage(coleta[0].pergunta, "bot");
        return;
      }

      if (perfilDoFan.pesquisandoInfo) {
        const campoAtual = coleta[perfilDoFan.coletaFase].campo;
        perfilDoFan.dados[campoAtual] = text;
        perfilDoFan.coletaFase++;

        if (perfilDoFan.coletaFase < coleta.length) {
          addMessage(coleta[perfilDoFan.coletaFase].pergunta, "bot");
        } else {
          perfilDoFan.pesquisandoInfo = false;
          mostrarTabelaDeDados();
        }
        return;
      }

      if (perfilDoFan.revisando) {
        if (text === "não") {
          perfilDoFan.nome = null;
          perfilDoFan.coletaFase = 0;
          perfilDoFan.dados = {};
          perfilDoFan.revisando = false;
          addMessage("Sem problema! Vamos começar de novo. Qual é o seu nome?", "bot");
        } else if (text === "sim") {
          perfilDoFan.revisando = false;
          perfilDoFan.consentimento = true;
          addMessage("Podemos enviar seus dados para a FURIA usar e melhorar seus serviços, conforme a LGPD? (sim/não)", "bot");
        }
        return;
      }

      if (perfilDoFan.consentimento) {
        if (text === "sim") {
          addMessage("Obrigado por aceitar! Isso vai nos ajudar a melhorar ainda mais pra você, guerreiro da FURIA! 🖤🐾", "bot");
        } else {
          addMessage("Entendido! Seus dados não serão enviados. Obrigado por participar! 💬", "bot");
        }
        addMessage("Se quiser conversar de novo, é só mandar seu nome e começar denovo! Aproveite tambem e veja nosso chat para o CS", "bot");
        perfilDoFan.nome = null;
        perfilDoFan.pesquisandoInfo = false;
        perfilDoFan.coletaFase = 0;
        perfilDoFan.dados = {};
        perfilDoFan.revisando = false;
        perfilDoFan.consentimento = false;
        return;
      }

      addMessage("Tô aqui pra falar de FURIA, manda ver! 💬", "bot");
    }

    function menuAtalho(comando) {
      input.value = comando;
      sendMessage();
    }

    input.addEventListener("keydown", function(e) {
      if (e.key === "Enter") {
        sendMessage();
      }
    });

    window.onload = () => {
      addMessage("Bem-vindo à Tropa FURIA! Qual é o seu nome, guerreiro?", "bot");
    }
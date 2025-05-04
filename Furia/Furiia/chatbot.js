const chatbox = document.getElementById("chatbox");

window.onload = function() { //Mensagem inicial
  addMessage("Fala, Furioso!<br>Com oque eu posso ajudar você, Furioso? 🔥", "bot");
  addMessage(`<b>🔥 Menu da Tropa FURIA:</b><br>
    1 - Jogos<br>
    2 - Elenco <br>
    3 - Loja Oficial <br>
    4 - Redes Sociais <br>
    5 - Suporte <br>
    <br>
    Digite o nome do tópico pra saber mais!`, "bot"); //Menu para locomoção
}

const respostas = { //Possiveis respostas do bot
  "jogos": "O Proximo Jogão da Furia vai ser no PGL Astana, contra os The MongolsZ, caso queira ver mais da nossa Furia, veja mais em <a href = https://x.com/FURIA </a>Twitter Oficial da Furia!",
  "elenco": "Nossa camisa ta sendo representada pelos: <br>Brasileiros Yuurih, KSCerato<br>O Cazaquistanês Molodoy <br>O Austriaco Yekindar <br> E o ALIENIGENA,VENCEDOR DE 2 MAJORS, O PROFESSOR, Fallen!!! Sendo o Capitão do time <br>Juntamente Nosso Head Coach Sidde",
  "loja oficial": "A Furia não é so um time, é um movimento Social e Cultura, e você pode ajudar a gente na nossa caminhada juntos, adquirindo <a href = https://www.furia.gg/produtos </a>aqui<a></a> seu manto sagrado para acompanhar nossos proximos jogos. <br> Caso esteja interessado em uma roupa de uma coleção especial, pode achar todas nossas coleções disponiveis bem <a href = https://www.furia.gg/collections>aqui </a>",
  "redes sociais": "Claro , Aproveita e segue a Furia em todas elas <br><a href = https://x.com/FURIA </a>🐦 X <a></a><br><a href = https://www.instagram.com/furiagg/ </a>📸 Instagram<a></a><br><a href = https://www.youtube.com/@FURIAggCS </a>🎥 Youtube<a></a>",
  "suporte": "Algo deu errado? Precisa de uma ajudinha? Então ta na mão Furioso, Pode nos contatar por <a href = https://api.whatsapp.com/send?l=pt&phone=5511945128297&text=Poderia%20me%20ajudar? </a>📱 Whats<a></a> Que te ajudamos",
};

function addMessage(text, sender) { //A Mensagem é adicionada no chat bot
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.innerHTML = text;
  chatbox.appendChild(msg);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function sendMessage() { //A Mensagem do usuario é colocada no formato que a maquina entenda para evitar erros com letras maiusculas
  const input = document.getElementById("userInput");
  const text = input.value.trim().toLowerCase();

  if (text === "") return; //Nao enviar caso nao tiver nada

  addMessage(text, "user"); //A Mensagem é adicionada no chat

  let resposta = respostas[text] || "Não entendi muito bem... tenta perguntar de outro jeito! 💬"; //Caso nao tiver nenhuma Resposta compativel

  addMessage(resposta, "bot"); //O Bot responde a mensagem correta

  input.value = "";
}
document.getElementById("userInput").addEventListener("keydown", function(event) { //Faz a tecla enter enviar mensagem
  if (event.key === "Enter"){
    sendMessage();
  }
});

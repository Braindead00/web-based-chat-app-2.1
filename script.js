const loginForm = document.getElementById('login-form');
const userSelector = document.getElementById('user-selector');
const chatContainer = document.querySelector('.chat');
const chatHeader = document.querySelector('.header')
const chatSuobshteniq = document.querySelector('.chat-suobshteniq')
const chatInputBtn = document.querySelector('.chat-input-button')
const chatInput = document.querySelector('.input')
const btnClear = document.querySelector('.button-clear')
//const btnLogout = document.querySelector('.button-logout');
const izprateno = document.getElementById('izprateno');
const polucheno = document.getElementById('polucheno');
const suobshteniq = JSON.parse(localStorage.getItem('suobshteniq')) || []

let sender = '';

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    sender = userSelector.value;
    
    document.querySelector('.login-form').style.display = 'none';
    chatContainer.style.display = 'block';
    chatHeader.innerText = `${sender}`;
    chatInput.placeholder = `Pishi tuk, ${sender}...`;

    if (sender === 'Prezidenta') 
        {
        polucheno.classList.add('izprateni')
        polucheno.classList.remove('polucheni')
        izprateno.classList.remove('izprateni')
        izprateno.classList.add('polucheni')
      }
      if (sender === 'Dakata') 
        {
        izprateno.classList.add('izprateni')
        izprateno.classList.remove('polucheni')
        polucheno.classList.remove('izprateni')
        polucheno.classList.add('polucheni')
      }
});

const napraviSuobshtenie = (suobshtenie) => `
<div class="suobshtenie ${suobshtenie.sender === 'Prezidenta' ? 'izprateni' : 'polucheni'}">
    <div class="sender">${suobshtenie.sender}</div>
    <div class="text">${suobshtenie.text}</div>
    <div class="timestamp">${suobshtenie.timestamp}</div>
</div>
`

window.onload = () => 
{
  suobshteniq.forEach((suobshtenie) => {
    chatSuobshteniq.innerHTML += napraviSuobshtenie(suobshtenie)
  })
}

const izprati = (e) => 
{
  e.preventDefault()

  const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  const suobshtenie = 
  {
    sender: sender,
    text: chatInput.value, timestamp
  }

  suobshteniq.push(suobshtenie)
  localStorage.setItem('suobshteniq', JSON.stringify(suobshteniq))

  chatSuobshteniq.innerHTML += napraviSuobshtenie(suobshtenie)

  chatInputBtn.reset()

  chatSuobshteniq.scrollTop = chatSuobshteniq.scrollHeight
}

chatInputBtn.addEventListener('submit', izprati)

btnClear.addEventListener('click', () => 
{
  localStorage.clear()
  chatSuobshteniq.innerHTML = ''
})

/*
btnLogout.addEventListener('click', () => {
    sender = '';
    document.querySelector('.login-form').style.display = 'block'; // Show login form
    chatContainer.style.display = 'none'; // Hide chat interface
    chatSuobshteniq.innerHTML = ''; // Clear chat messages
    localStorage.removeItem('suobshteniq'); // Optional: Clear all stored messages
})
*/
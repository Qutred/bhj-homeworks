class SimpleChat {
  constructor() {
    this.startChatBtn = document.querySelector('.chat-widget__side-text');
    this.input = document.getElementById('chat-widget__input');
    this.messageContainer = document.querySelector('.chat-widget__messages-container');
    this.chatWidgetMessage = document.getElementById('chat-widget__messages');
    this.isChatActive = false;
    this.idleMs = 30000;
    this.timeoutId = null;

    this.startChat = this.startChat.bind(this);
    this.onInputHandle = this.onInputHandle.bind(this);

    this.startChatBtn.addEventListener('click', this.startChat);
    this.input.addEventListener('keyup', this.onInputHandle);
  }

  startChat() {
    document.querySelector('.chat-widget').classList.add('chat-widget_active');
    this.isChatActive = true;
  }

  onInputHandle(e) {
    if (e.key === 'Enter' && e.target.value !== '') {
      this.timeoutId !== null && clearTimeout(this.timeoutId);
      let message = e.target.value;
      let userMessage = this.createMessage(message, 'client');
      let botMessage = this.createMessage(this.getRandomMessage(), 'bot');
      this.clearInput();
      this.updateChat(userMessage, botMessage);
      this.setIdleWatcher();
    }
  }

  setIdleWatcher() {
    this.timeoutId = setTimeout(() => {
      let botMessage = this.createMessage('Вы еще тут?', 'bot');
      this.updateChat(botMessage);
    }, this.idleMs);
  }

  clearInput() {
    this.input.value = '';
  }

  createMessage(message, type) {
    return `<div class="message ${type === 'client' ? 'message_client' : ''}">
                <div class="message__time">${this.getFormatedTime(new Date())}</div>
                <div class="message__text">${message}</div>
            </div>`;
  }

  getRandomMessage() {
    simpleBotAnswers = [
      'добрий день',
      'я вас не понимаю',
      'чем могу помочь?',
      'вам понравиться',
      'могу еще чем то помочь?',
      'кто тут?',
    ];
    let randomMessageIndex = Math.floor(Math.random() * (simpleBotAnswers.length - 0) + 0);
    return simpleBotAnswers[randomMessageIndex];
  }

  getFormatedTime(now) {
    return `${now.getHours()}:${now.getMinutes()}`;
  }

  updateChat(...messages) {
    this.chatWidgetMessage.innerHTML = this.chatWidgetMessage.innerHTML += messages.join('');
    this.scrollChatToBottom();
  }

  scrollChatToBottom() {
    this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
  }
}

new SimpleChat();

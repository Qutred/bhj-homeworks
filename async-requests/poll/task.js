const pollTitle = document.getElementById('poll__title');
const pollAnswers = document.getElementById('poll__answers');
const pollInfo = document.querySelector('.poll__info');
const modal = document.querySelector('.modal');
const modalCloseBtn = document.querySelector('.modal .modal__btn');
let lastQuestionData = {
  data: null,
  activeIndex: null,
};

const infoClickHandle = e => {
  if (e.target.classList.contains('poll__answer')) {
    showModal();
    lastQuestionData.activeIndex = [...document.querySelectorAll('.poll__answer')].indexOf(e.target);
  }
};

const showModal = () => modal.classList.add('modal--active');

const hideModal = () => modal.classList.remove('modal--active');

const getQuestions = () => {
  let settings = {
    method: 'GET',
    url: 'https://students.netoservices.ru/nestjs-backend/poll',
    onLoad: (request, e) => {
      const { title, answers } = request.response.data;
      lastQuestionData.data = request.response;
      if (request.status === 200) {
        renderQuestions(title, answers);
      } else {
        pollInfo.textContent = 'Ошибка при отправке запроса';
        setTimeout(() => (pollInfo.textContent = ''), 1000);
      }
    },
  };
  sendRequest(settings);
};

const showResults = () => {
  hideModal();

  let data = `vote=${lastQuestionData.data.id}&answer=${lastQuestionData.activeIndex}`;
  let settings = {
    method: 'POST',
    url: 'https://students.netoservices.ru/nestjs-backend/poll',
    reqHeaders: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data,
    onLoad: (request, e) => {
      if (request.status === 201) {
        renderResults(request.response.stat);
      } else {
        pollInfo.textContent = 'Ошибка при отправке запроса';
        setTimeout(() => (pollInfo.textContent = ''), 1000);
      }
    },
  };

  sendRequest(settings);
};

const renderQuestions = (title, answers) => {
  pollTitle.textContent = title;
  pollInfo.innerHTML = answers
    .map(item => {
      return `<button class="poll__answer">
              ${item}
            </button>`;
    })
    .join('');
};

renderResults = stats => {
  let votesQty = stats.reduce((votes, item) => (votes += item.votes), 0);
  pollInfo.innerHTML = stats
    .map(item => {
      return `<div>${item.answer} <b>${((item.votes / votesQty) * 100).toFixed(2)}%</b></div>`;
    })
    .join('');
};

const sendRequest = (
  settings = {
    url: null,
    method: 'GET',
    data: null,
    reqHeaders: null,
    onError: (request, e) => {
      pollInfo.textContent = 'Ошибка при отправке запроса';
      setTimeout(() => (pollInfo.textContent = ''), 1000);
    },
    onLoad: () => {},
  }
) => {
  const request = new XMLHttpRequest();
  request.open(settings.method, settings.url);
  request.responseType = 'json';
  request.addEventListener('load', e => {
    settings.onLoad(request, e);
  });
  request.addEventListener('error', e => {
    settings.onError(request, e);
  });
  settings.reqHeaders &&
    Object.entries(settings.reqHeaders).forEach(([key, value]) => request.setRequestHeader(key, value));

  settings.data ? request.send(settings.data) : request.send();
};

getQuestions();
pollInfo.addEventListener('click', infoClickHandle);
modalCloseBtn.addEventListener('click', showResults);

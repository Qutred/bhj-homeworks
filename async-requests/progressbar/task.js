const form = document.getElementById('form');
const progress = document.getElementById('progress');
const file = document.getElementById('file');
const send = document.getElementById('send');
const fileName = document.querySelector('.input__wrapper-desc');
const infoMessage = document.querySelector('.card__info-message');

const updateFileName = e => {
  const { target } = e;
  const [, , uploadFileName] = target.value.split('\\');
  fileName.textContent = uploadFileName;
  infoMessage.textContent = '';
};

const clearForm = () => {
  form.reset();
  infoMessage.textContent = '';
  fileName.textContent = fileName.dataset.text;
  progress.value = '0';
};

const sendFile = () => {
  const url = 'https://students.netoservices.ru/nestjs-backend/upload';
  let data = new FormData(form);
  const xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=something');
  xhr.upload.addEventListener('progress', e => {
    progress.value = Math.floor((e.loaded / e.total) * 100).toFixed(2);
  });
  xhr.upload.addEventListener('load', e => {
    if (e.loaded === e.total) {
      infoMessage.textContent = 'Файл успешно загружен';
      setTimeout(clearForm, 1000);
    }
  });
  xhr.upload.addEventListener('error', e => {
    infoMessage.textContent = 'Ошибка при загрузке файла';
    setTimeout(() => clearForm, 1000);
  });
  xhr.send(data);
};

const onSubmit = e => {
  e.preventDefault();
  if (!file.files.length) {
    infoMessage.textContent = 'Пожалуйста выберите сначала файл';
  } else {
    sendFile();
  }
};

file.addEventListener('change', updateFileName);
send.addEventListener('click', onSubmit);

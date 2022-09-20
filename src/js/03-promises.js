import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const { delay, step, amount } = event.target.elements;

  let delayVal = Number(delay.value);
  let stepVal = Number(step.value);
  let amountVal = Number(amount.value);

  for (let i = 1; i <= amountVal; i += 1) {
  
    createPromise(i, delayVal)
      .then(({ position, delay }) => { Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`) })
      .catch(({ position, delay }) => { Notiflix.Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`) }
    );
    delayVal += stepVal;
  }
};

function createPromise(position, delay) {

  return new Promise((resolve, reject) => {
    
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {

      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
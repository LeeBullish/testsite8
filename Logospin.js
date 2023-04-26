document.addEventListener('DOMContentLoaded', function () {
    const pimpLogo = document.getElementById('pimplogo');
  
    pimpLogo.addEventListener('click', function () {
      if (pimpLogo.style.animationDuration === '1s') {
        pimpLogo.style.animationDuration = '5s';
      } else {
        pimpLogo.style.animationDuration = '1s';
      }
    });
  });
  
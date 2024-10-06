let ModalButton = document.getElementById('modal-button');
let ModalWindow = document.querySelector('.modal')
let ModalButtonClose = document.querySelector('.modal-button__close')
let ModalAdditionalInfo = document.querySelector('.info-icon')
let ModalChildInfo = document.querySelector('.child-info__block')
let ModalOverlay = document.querySelector('.overlay')

ModalButton.onclick = function() {
  ModalWindow.classList.remove('invisible')
  ModalOverlay.classList.remove('overlay-disabled')
}

ModalButtonClose.onclick = function() {
  ModalWindow.classList.add('invisible')
  ModalOverlay.classList.add('overlay-disabled')
}

  ModalAdditionalInfo.addEventListener("mouseover",function() {
    ModalChildInfo.classList.toggle('invisible')

  })

ModalAdditionalInfo.addEventListener("mouseout",function() {
  ModalChildInfo.classList.toggle('invisible')

})


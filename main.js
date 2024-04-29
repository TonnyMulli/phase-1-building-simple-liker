// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
document.addEventListener("DOMContentLoaded", function domContentLoadedHandler() {
  const likeButtons = document.querySelectorAll(".like");
  const errorModal = document.getElementById("modal");
  const errorMessageElement = document.getElementById("modal-message");

  function displayError(message) {
    errorMessageElement.textContent = message;
    errorModal.classList.remove("hidden");
    setTimeout(function() {
      errorModal.classList.add("hidden");
    }, 3000);
  }

  function likeButtonClickHandler(event) {
    const likeButton = event.currentTarget;
    if (likeButton.querySelector(".like-glyph").textContent === EMPTY_HEART) {
      mimicServerCall()
        .then(function () {
          likeButton.querySelector(".like-glyph").textContent = FULL_HEART;
          likeButton.classList.add("activated-heart");
        })
        .catch(function (error) {
          displayError(error);
        });
    } else if (likeButton.querySelector(".like-glyph").textContent === FULL_HEART) {
      likeButton.querySelector(".like-glyph").textContent = EMPTY_HEART;
      likeButton.classList.remove("activated-heart");
    }
  }

  likeButtons.forEach(function(likeButton) {
    likeButton.addEventListener("click", likeButtonClickHandler);
  });
});



//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}

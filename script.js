const container = document.querySelector('.container');
const modal = document.querySelector('.modal');
const nameElem = document.querySelector('.name');
const emailElem = document.querySelector('.email');
const commentElem = document.querySelector('.comment-text');
const closeButton = document.querySelector('.close-button');
let comments = [];
let renderedComments = 0;

function renderComments(comments) {
  comments.slice(renderedComments, renderedComments + 10).forEach((comment, index) => {
    const commentElem = document.createElement('div');
    commentElem.classList.add('comment');
    commentElem.dataset.commentIndex = renderedComments + index;
    commentElem.innerHTML = `
      <p><strong>Name:</strong> ${comment.name}</p>
      <p><strong>Email:</strong> ${comment.email}</p>
      <p><strong>Comment:</strong> ${comment.body}</p>
    `;
    commentElem.addEventListener('click', () => {
      nameElem.textContent = comment.name;
      emailElem.textContent = comment.email;
      commentElem.textContent = comment.body;
      modal.style.display = 'block';
    });
    container.appendChild(commentElem);
  });
  renderedComments += 10;
}

function fetchComments() {
  fetch('https://jsonplaceholder.typicode.com/comments')
    .then(response => response.json())
    .then(data => {
      comments = data;
      renderComments(comments);
    });
}

function onScroll() {
  if (window.scrollY + window.innerHeight >= container.scrollHeight) {
    renderComments(comments);
  }
}

function onCloseModal(){
  modal.style.display = 'none';
  nameElem.textContent = '';
  emailElem.textContent = '';
  commentElem.textContent = '';
}

function onOpenModal() {
  modal.style.display = 'block';
}

closeButton.addEventListener('click', onCloseModal);
window.addEventListener('scroll', onScroll);
fetchComments();

// window.onclick = () => {
//     if(event.target === modal){
//         onCloseModal();
//     }
// }
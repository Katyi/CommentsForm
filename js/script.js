let currentId = 0;

function likeComment(e) {
  // console.log(e.target.id);
  // console.log(document.getElementById(e.target.id).src.slice(-8));
  if (document.getElementById(e.target.id).src.slice(-8) === "like.png") {
    document.getElementById(e.target.id).src = "../img/likeRed.png";
  } else {
    document.getElementById(e.target.id).src = "../img/like.png";
  }
}

function deleteComment(e) {
  document.getElementById(e.target.id).parentElement.parentElement.remove();
}

function AddComment() {
  let userName = document.getElementById("userName").value;
  let userComment = document.getElementById("userComment").value;
  let commentDate = document.getElementById("commentDate").value;

  let today = new Date();
  let day = today.getDate();
  let dayAgo = day - 1;
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  if (day < 10) day = '0' + day;
  if (dayAgo < 10) dayAgo = '0' + dayAgo;
  if (month < 10) month = `0${month}`;
  today = `${day}-${month}-${year}`;
  let yesterday = `${dayAgo}-${month}-${year}`;

  if (!commentDate) {
    commentDate = today;
  } else {
    commentDate = commentDate.split("-").reverse().join("-");
  }

  let commentTime = new Date();
  let hour = commentTime.getHours();
  let minutes = commentTime.getMinutes();
  let seconds = commentTime.getSeconds();
  if (hour < 10) hour = '0' + hour;
  if (minutes < 10) minutes = `0${minutes}`;
  if (seconds < 10) seconds = `0${seconds}`;
  commentTime = `${hour}:${minutes}:${seconds}`;


  if (commentDate === today) {
    commentDate = 'сегодня';
  }
  if (commentDate === yesterday) {
    commentDate = 'вчера';
  }

  div = document.createElement('div');
  currentId = currentId + 1;
  let currenComment = "comment" + currentId;
  div.id = currenComment;
  div.className = "comment";
  document.getElementById("comments").append(div);

  div = document.createElement("div");
  div.id = "userNameInComments";
  text = document.createTextNode(userName);
  div.append(text);
  document.getElementById(currenComment).append(div);

  div = document.createElement("div");
  div.id = "userCommentInComments";
  text = document.createTextNode(userComment);
  div.append(text);
  document.getElementById(currenComment).append(div);

  div = document.createElement("div");
  let commentBottom = 'commentBottom' + currentId;
  // console.log(commentBottom);
  div.id = commentBottom;
  div.className = 'commentBottom';
  document.getElementById(currenComment).append(div);

  let commentDateTime = `${commentDate}, ${commentTime}`;
  div = document.createElement("div");
  div.id = "commentDateTimeinComments";
  text = document.createTextNode(commentDateTime);
  div.append(text);
  document.getElementById(commentBottom).append(div);

  let img = document.createElement("img");
  img.id = "likeButton" + currentId;
  img.className = "likeButton";
  img.src = "../img/like.png";
  img.addEventListener('click', likeComment);
  document.getElementById(commentBottom).append(img);

  img = document.createElement("img");
  img.id = "commentButton" + currentId;
  img.className = "commentButton";
  img.src = "../img/delete1.png";
  img.addEventListener('click', deleteComment);
  document.getElementById(commentBottom).append(img);
  

  document.getElementById("userName").value = "";
  document.getElementById("userComment").value = "";
  document.getElementById("commentDate").value = "";
}


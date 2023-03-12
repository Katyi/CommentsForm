const url = 'https://comments-api.onrender.com/comments';

/* fetch GET из db.json */
async function getComments() {
  const responce = await fetch(url);
  const comments = await responce.json();
  return comments;
}

/* fetch POST из db.json */
async function postComments(bodyForFetch) {
  let responce = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      mode: "cors",
      body: JSON.stringify(bodyForFetch)
  });
  return responce;
}

/* Отображает комментарии из db.json */
getComments()
.then(comments => {
  console.log(comments)
  comments.forEach(item => {
    let div = document.createElement('div');
    let currentId = 'comment' + item.id;
    div.id = currentId;
    div.className = "comment";
    document.getElementById("comments").append(div);
    
    let userName = item.name;
    div = document.createElement("div");
    div.id = "userNameInComments";
    let text = document.createTextNode(userName);
    div.append(text);
    document.getElementById(currentId).append(div);

    let userComment = item.comment;
    div = document.createElement("div");
    div.id = "userCommentInComments";
    text = document.createTextNode(userComment);
    div.append(text);
    document.getElementById(currentId).append(div);

    div = document.createElement("div");
    let commentBottom = 'commentBottom' + item.id;
    console.log(commentBottom);
    div.id = commentBottom;
    div.className = 'commentBottom';
    document.getElementById(currentId).append(div);

    let commentDateTime = `${item.date}, ${item.time}`;
    div = document.createElement("div");
    div.id = 'commentDateTimeinComments';
    text = document.createTextNode(commentDateTime);
    div.append(text);
    document.getElementById(commentBottom).append(div);

    let img = document.createElement("img");
    img.id = "likeButton" + item.id;
    img.className = "likeButton";
    if (item.like === true) {
      img.src = "./img/likeRed.png";
      img.title='unlike!';
    } else {
      img.src = "./img/like.png";
      img.title='like!';
    }
    img.addEventListener('click', likeComment);
    document.getElementById(commentBottom).append(img);

    img = document.createElement("img");
    img.id = "deleteButton" + item.id;
    img.className = "deleteButton";
    img.src = "./img/delete1.png";
    img.title='delete!';
    img.addEventListener('click', deleteComment);
    document.getElementById(commentBottom).append(img);
  });
});

/* Добавляет новый комментарий */
function AddComment(e) {
  e.preventDefault();
  let elemCount = Number(document.getElementById("comments").lastChild.id.slice(7));
  console.log(elemCount);
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

  let bodyForFetch = {
    id: elemCount + 1,
    name: userName,
    comment: userComment,
    date: commentDate,
    time: commentTime,
    like: false
  };
  
  postComments(bodyForFetch)
    .then(response => response.json())
    .then(() => window.location.reload());
}

/* Удаляет комментарий */
async function deleteComment(e) {
  let id = document.getElementById(e.target.id).parentElement.id.slice(13);
  await fetch(`${url}/${id}`, {
    method: 'DELETE',
  })
  .then(()=> window.location.reload());
}

/* делает like и unlike комментария */
async function likeComment(e) {
  let id = e.target.id.slice(10);
  if (document.getElementById(e.target.id).src.slice(-8) === "like.png") {
    await fetch(`${url}/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        like: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(responce => responce.json())
      .then(() => window.location.reload());
  } else {
    await fetch(`${url}/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      like: false
    }),
    headers: {
      'Content-Type': 'application/json'
    } 
  })
    .then(responce => responce.json())
    .then(() => window.location.reload());
  }
}

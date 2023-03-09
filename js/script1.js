let usersinfo = [];

let comments = fetch('http://localhost:5000/comments')
.then(responce=>responce.json())
.then(data=>{
    console.log(data);
    data.forEach(item => {
      usersinfo.push({
        id: item.id,
        name: item.name,
        date: item.date,
        time: item.time
      })
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
      img.src = "../img/like.png";
      img.addEventListener('click', likeComment);
      document.getElementById(commentBottom).append(img);

      img = document.createElement("img");
      img.id = "commentButton" + item.id;
      img.className = "commentButton";
      img.src = "../img/delete1.png";
      img.addEventListener('click', deleteComment);
      document.getElementById(commentBottom).append(img);
    });
    console.log(usersinfo)
    // return currentId;
})


// let myForm =document.getElementById('myForm');
// myForm.addEventListener('submit', AddComment);

function likeComment(e) {
  console.log(e.target.id);
  console.log(document.getElementById(e.target.id).src.slice(-8));
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
  let elemCount  = document.getElementsByClassName("comments").childElementCount;
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
  fetch('http://localhost:5000/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: elemCount +1,
      name: userName,
      comment: userComment,
      date: commentDate,
      time: commentTime
    })
  })
  .then(res=>console.log(res.status))
}


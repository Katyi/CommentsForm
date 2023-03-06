// fetch("db.json")
// .then((response) => {
//   if (!response.ok) {
//     throw new Error(`HTTP error, status = ${response.status}`);
//   }
//   return response.json();
// })
// .then((data) => {
//   data.comments.map(item => {
//     let commentData = "Имя: " + item.name + " Коментарий: " + item.comment + " Дата: " + item.date + " Время: " + item.time;
//       + " Дата : " + item.date;
//     let li = document.createElement("li");
//     let commenValue = document.createTextNode(commentData);
//     li.appendChild(commenValue);
//     document.getElementById("comments").appendChild(li);
//   })
// })
// .catch((error) => {
//   const p = document.createElement("p");
//   p.appendChild(document.createTextNode(`Error: ${error.message}`));
//   document.body.insertBefore(p, myList);
// });

const comments = [{
    "id": 1,
    "name": "Alex S",
    "comment": "They start talking and after a few drinks the conversation shifts to cars. The Jedi living a life of austerity and frugality only has a 1991 Camry. The Sith and Mando laughs at him saying he has a Bad Car. The Sith having manipulated others into giving him their wealth shows off his McClaren F1. The patrons at the bar are amazed and even the Jedi has to admit it’s a nice ride. They both end up saying it’s a Good Car. The Mandalorian walks around the corner and after a few minutes comes screaming back on his jet pack and blows up the other cars. He has the Beskar.",
    "date": "09-09-2022",
    "time": "01:11:12"
  },
  {
    "id": 2,
    "name": "Jane B",
    "comment": "They're all stranded on this Desert Island. The cannibals come and say: right you're coming back with us and we are going to skin you and turn you into canoes. So... they arrive at their camp and the cannibals say before you're killed you each get one last request. The scots man is first and says 'I want the finest whisky that you can find me he has his whisky and is killed, skinned and turned into a canoe The English man is next, he says: I'd like a nice roast dinner he has his roast dinner and gets killed, skinned and turned into a canoe The Irish man is last and says Just give me a fork the cannibals are confused as it's a strange last request but anyways they give him a fork. The Irish man looks at the cannibals and says you're not making a canoe out of me so he starts stabbing himself with the fork",
    "date": "31-12-2021",
    "time": "12:23:08"
  }
]

comments.map(item => {
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
})

let currentId = 2;

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
  // let divId = 'comment' + currentId;
  // console.log(currentId);
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
  console.log(commentBottom);
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


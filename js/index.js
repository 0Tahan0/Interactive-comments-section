let commentsArray = [
  {
    id: 1234,
    imgSrc: "../images/avatars/image-amyrobson.png",
    ownerName: "amyrobson",
    date: "1 month ago",
    postText:
      "Impressive! Though it seems drag feature could be improved. But overall it looks incredible. You've nailed the design and responsiveness at various breakpoints works really well. ",
    counterLikes: 12,
    sender: "user",
    type: "comment",
    htmlStyle: null,
    replies: [],
  },
  {
    id: 12345,
    imgSrc: "../images/avatars/image-maxblagun.png",
    ownerName: "maxblagun",
    date: "2 weeks ago",
    postText:
      "Woah. your project looks awesome! How long have you been coding for? I'm still new. but think I want to dive into React as well soon. Perhaps You can giv me an insight on where I can learn React? Thanks!",
    counterLikes: 5,
    sender: "user",
    type: "comment",
    htmlStyle: null,
    replies: [
      {
        id: 123456,
        imgSrc: "../images/avatars/image-ramsesmiron.png",
        ownerName: "ramsesmiron",
        date: "1 week ago",
        postText:
          "If you're still new. I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. it's very tempting to jump ahead but lay a solid foundation first.",
        counterLikes: 4,
        sender: "user",
        type: "reply",
        htmlStyle: null,
        replies: [
          {
            id: 123457,
            imgSrc: "../images/avatars/image-juliusomo.png",
            ownerName: "juliusomo",
            date: "2 days ago",
            postText:
              "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/ framework. But fundamentals are what stay constant.",
            counterLikes: 2,
            sender: "owner",
            type: "reply",
            htmlStyle: null,
            replies: [],
          },
        ],
      },
    ],
  },
];

let userImg = "../images/avatars/image-juliusomo.png";
let userName = "juliusomo";
const commentsContainer = document.querySelector(".posts .container");
const boardText = document.querySelector("#board-text");
const sendBtn = document.querySelector("#send-post-btn");

sendBtn.onclick = () => createComment(boardText.value);

addToHtml(commentsArray, commentsContainer);
postsEvents(commentsArray);
function createComment(_text) {
  if (_text.trim() != "") {
    let _comment = new Object({
      id: Date.now(),
      imgSrc: userImg,
      ownerName: userName,
      date: "now",
      postText: _text,
      counterLikes: 0,
      sender: "owner",
      type: "comment",
      htmlStyle: null,
      replies: [],
    });

    _comment.htmlStyle = addToHtml([_comment], commentsContainer);
    commentsArray.push(_comment);
    postsEvents(commentsArray);
  }
}

function addToHtml(arr, box, repTag = null) {
  let htmlStyle = "<h1>Testing</h1>";
  arr.forEach((el) => {
    htmlStyle = createHtml(el, repTag);
    el.htmlStyle = htmlStyle;
    box.appendChild(htmlStyle);
    if (el.replies != null)
      addToHtml(
        el.replies,
        htmlStyle.querySelector(".replies-box"),
        el.ownerName
      );
  });
  return htmlStyle;
}

function createHtml(_comment, repTag) {
  let post = `
          <div
            class="post row align-items-center bg-white p-4 rounded-4 my-3 border shadow my-23"
          >
            <div class="heading col-md-8 col-12 d-flex align-items-center">
              <div class="image rounded-pill">
                <img
                  src="${_comment.imgSrc}"
                  alt="user img"
                  class="img-fluid rounded-pill"
                />
              </div>
              <h5 class="ms-3 mb-0">${_comment.ownerName}</h5>
              ${
                _comment.sender == "owner"
                  ? `<span class="you ms-3 text-uppercase badge fs-6">you</span>`
                  : ""
              }
              <p class="text-black-50 ms-3 mb-0">${_comment.date}</p>
            </div>
           ${
             _comment.sender == "owner"
               ? `
                <button data-bs-toggle="modal" data-bs-target="#modal-alert" class="btn border-0 sec-btn-red  btn-delete px-1 col-md-1 col-auto d-flex ms-auto me-1 align-items-center justify-content-center order-4 order-md-3  "><i class="fa-solid fa-trash me-2 fa-sm"></i>Delete</button>
               <button class="btn border-0 sec-btn-blue btn-edit px-1 col-md-1 col-auto d-flex ms-auto align-items-center justify-content-center order-4 order-md-3 "><i class="fa-solid fa-pen me-2 fa-sm"></i>Edit</button>`
               : `<button class="btn border-0 sec-btn-blue btn-reply px-1 col-md-1 col-auto d-flex ms-auto align-items-center justify-content-center order-4 order-md-3  "><i class="fa-solid fa-reply me-2 fa-sm"></i>Reply</button>`
           }

            <div
              class="post-content col-12 ms-auto order-2 order-md-last col-md-11 py-3"
            >
            <span class="tag">${
              repTag != null ? "@" + repTag : ""
            }</span><p class=" lh-lg d-inline">
                ${_comment.postText}
              </p>
            </div>
            <div
              class="counter-box col-md-1 col-5 order-3 order-md-first d-md-block d-flex justify-content-between bg-light p-2 rounded  text-center"
            
              >
              <button class="btn border-0 plus"><i class="fa-solid fa-plus"></i></button>
              <div class="counter fs-4">${_comment.counterLikes}</div>
              <button class="btn border-0 minus">
                <i class="fa-solid fa-minus"></i>
              </button>
            </div>
            
          </div>
          
          ${
            _comment.type == "reply"
              ? `
              <div class="post-reply ">
          <div class="replies-box"></div>
        </div>`
              : `<div class="post-reply row">
            <div class="line col-1 col-md-2 position-relative"></div>
            <div class="replies-box col-11 col-md-10"></div>
          </div>`
          }
        `;

  let postBox = document.createElement("div");
  postBox.className = "post-box";
  postBox.innerHTML = post;
  return postBox;
}

function postsEvents(_arr) {
  let arr = _arr;
  arr.forEach((el) => {
    let reply_btn = el.htmlStyle.querySelector(".post .btn-reply");
    let edit_btn = el.htmlStyle.querySelector(".post .btn-edit");
    let delete_btn = el.htmlStyle.querySelector(".post .btn-delete");
    let plus_btn = el.htmlStyle.querySelector(".post .counter-box .plus");
    let minus_btn = el.htmlStyle.querySelector(".post .counter-box .minus");
    let counter = el.htmlStyle.querySelector(".post .counter-box .counter");
    // -----------------------
    // ----- Plus -----
    if (plus_btn) {
      plus_btn.onclick = () => {
        el.counterLikes = changerCounter(
          plus_btn,
          minus_btn,
          counter,
          el.counterLikes,
          1
        );
      };
    }
    // ----- Minus -----
    if (minus_btn) {
      minus_btn.onclick = () => {
        el.counterLikes = changerCounter(
          plus_btn,
          minus_btn,
          counter,
          el.counterLikes,
          -1
        );
      };
    }
    // ----- Reply -----
    if (reply_btn) {
      reply_btn.onclick = () => {
        addReply(el);
      };
    }
    // ----- Edit -----
    if (edit_btn) {
      edit_btn.onclick = () => {
        editPost(el, commentsArray);
      };
    }
    // ----- Delete -----
    if (delete_btn) {
      delete_btn.onclick = () => {
        alertMessage(
          `Delete comment`,
          `Are you sure you want to delete the comment? This will remove the
        comment and can't be undone.`,
          `yes, delete`,
          `no, cancel`,
          deletePost,
          (params = { commentsArray, el })
        );
      };
    }
    // restart function for replies
    if (el.replies != null) postsEvents(el.replies);
  });
}

function changerCounter(plus, minus, counter, currentVal, amount) {
  if (
    plus.hasAttribute("disabled") == false &&
    minus.hasAttribute("disabled") == false
  ) {
    if (amount > 0) {
      counter.classList.add("counterInc");
      plus.setAttribute("disabled", "true");
    } else {
      counter.classList.add("counterDec");
      minus.setAttribute("disabled", "true");
    }
  } else if (plus.hasAttribute("disabled") == true && amount < 0) {
    counter.classList.remove("counterInc");

    plus.removeAttribute("disabled");
  } else if (minus.hasAttribute("disabled") == true && amount > 0) {
    counter.classList.remove("counterDec");

    minus.removeAttribute("disabled");
  }

  counter.textContent = (currentVal + amount).toString();
  return parseInt(counter.textContent);
}

function alertMessage(
  title,
  content,
  accept = "Conform",
  refuse = "No, Cancel",
  doFunc = null,
  params = null
) {
  document.querySelector("#alertTitle").textContent = title;
  document.querySelector("#alertContent").textContent = content;
  let accBtn = document.querySelector("#accept");
  accBtn.textContent = accept;
  let refBtn = document.querySelector("#refuse");
  refBtn.textContent = refuse;

  accBtn.onclick = () => {
    if (doFunc != null) {
      params == null ? doFunc() : doFunc(params);
    }
  };
}

function deletePost(params) {
  commentsArray = deleteFromArray(params.commentsArray, params.el.id);
  params.el.htmlStyle.remove();

  function deleteFromArray(arr, id) {
    let newArray = [];
    arr
      .filter((rep) => rep.id != id)
      .forEach((el) => {
        if (el.replies.length > 0) {
          el.replies = deleteFromArray(el.replies, id);
          newArray.push(el);
        } else newArray.push(el);
      });
    return newArray;
  }
}

function addReply(el) {
  let comment = new Object({
    id: Date.now(),
    imgSrc: userImg,
    ownerName: userName,
    date: "now",
    postText: null,
    counterLikes: 0,
    sender: "owner",
    type: "reply",
    htmlStyle: null,
    replies: [],
  });
  // ---------------------
  let _repHTML = `
          <div
            class="inner-board-box row align-items-start justify-content-around py-3 px-2 shadow-lg bg-white rounded-4"
          >
            <div class="col-6 col-md-2 order-md-1">
              <img
                src="${comment.imgSrc}"
                alt="user img"
                class="img-fluid rounded-pill"
              />
            </div>
            
            <textarea 
            class="main-input col-12 col-md-6 order-first order-md-2 fs-4 rounded px-2 py-5 mb-4"
            id="board-reply-text"
            ></textarea>
            <button
              class="btn main-btn fs-5 col-6 col-md-2 order-md-3 p-3"
              id="send-reply-btn"
              
            >
              Reply
            </button>
          </div>
        `;
  let repBox = document.createElement("div");
  repBox.className = "writing-board-box";
  repBox.id = "_repBox";
  repBox.innerHTML = _repHTML;

  let writingBoard_Reply = repBox.querySelector("#board-reply-text");
  writingBoard_Reply.addEventListener("keyup", (e) => {
    let scHight = e.target.scrollHeight;
    writingBoard_Reply.style.height = `${scHight}px`;
  });
  // ------------------
  el.htmlStyle.querySelector(".replies-box").appendChild(repBox);

  writingBoard_Reply.focus();
  let replies_Btns = document.querySelectorAll(".post .btn-reply");
  let edit_btns = document.querySelectorAll(".post .btn-edit");
  let delete_btns = document.querySelectorAll(".post .btn-delete");
  set_remove_Attr(replies_Btns, "disabled");
  set_remove_Attr(edit_btns, "disabled");
  set_remove_Attr(delete_btns, "disabled");
  set_remove_Attr(sendBtn, "disabled");
  repBox.querySelector("#send-reply-btn").onclick = () => {
    comment.postText = writingBoard_Reply.value;
    if (writingBoard_Reply.value.trim() != "") {
      repBox.remove();
      addToHtml(
        [comment],
        el.htmlStyle.querySelector(".replies-box"),
        el.ownerName
      );

       set_remove_Attr(replies_Btns, "disabled","remove");
       set_remove_Attr(edit_btns, "disabled", "remove");
       set_remove_Attr(delete_btns, "disabled", "remove");
       set_remove_Attr(sendBtn, "disabled", "remove");
      el.replies.push(comment);
      postsEvents(commentsArray);
    }
  };
}

function editPost(element, _arr) {
  let arr = _arr;
  let updateBox = document.createElement("div");
  updateBox.className = "update-box col-12 order-last py-2";
  updateBox.innerHTML = `
  <button id="update-btn" class="btn  main-btn fs-5  p-3  ms-auto d-block" id="send-reply-btn">
   Update
  </button>
  `;
  element.htmlStyle.querySelector(".post").appendChild(updateBox);
  let textBox = element.htmlStyle.querySelector(".post-content");
  let currentText = textBox.querySelector("p");
  let writingBoard = document.createElement("textarea");

  writingBoard.className =
    "main-input lh-lg px-2 pb-4 pt-1 w-100" + currentText.className;
  writingBoard.setAttribute("multiple", "true");
  writingBoard.value = currentText.textContent.trim();
  writingBoard.addEventListener("keyup", (e) => {
    let scHight = e.target.scrollHeight;
    writingBoard.style.height = `${scHight}px`;
  });
  currentText.remove();
  textBox.appendChild(writingBoard);
  if (textBox.querySelector(".modified"))
    textBox.querySelector(".modified").remove();
  updateBox.querySelector("#update-btn").onclick = () => {
    writingBoard.remove();
    currentText.textContent = writingBoard.value;
    element.postText = writingBoard.value;
    textBox.appendChild(currentText);
    let modified = document.createElement("div");
    modified.className = "tag my-2  modified";
    modified.textContent = ` Modified in ${getDateNow()}`;
    textBox.appendChild(modified);
    updateBox.remove();
    commentsArray = arr;
  };
}

function getDateNow() {
  let today = new Date();
  let fullDate = `${today.getDate()}/${
    today.getMonth() + 1
  }/${today.getFullYear()}`;
  return fullDate;
}
function set_remove_Attr(element, attr, type = "set") {
  if (element.length > 0) {
    element.forEach((el) => {
      if (type == "set") el.setAttribute(attr, "true");
      else el.removeAttribute(attr);
    });
  } else if (type == "set") element.setAttribute(attr, "true");
  else element.removeAttribute(attr);
}

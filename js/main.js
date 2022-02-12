let container = document.querySelector(".container");
let CommentsData = {
    "currentUser": {
        "image": {
            "png": "./images/avatars/image-juliusomo.png",
            "webp": "./images/avatars/image-juliusomo.webp"
        },
        "username": "juliusomo"
    },
    "comments": [

        {
            "id": 1,
            "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
            "createdAt": "1 month ago",
            "score": 12,
            "user": {
                "image": {
                    "png": "./images/avatars/image-amyrobson.png",
                    "webp": "./images/avatars/image-amyrobson.webp"
                },
                "username": "amyrobson"
            },
            "replies": []
        },

        {
            "id": 2,
            "content": "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
            "createdAt": "2 weeks ago",
            "score": 5,
            "user": {
                "image": {
                    "png": "./images/avatars/image-maxblagun.png",
                    "webp": "./images/avatars/image-maxblagun.webp"
                },
                "username": "maxblagun"
            },
            "replies": [
                {
                    "id": 3,
                    "content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
                    "createdAt": "1 week ago",
                    "score": 4,
                    "replyingTo": "maxblagun",
                    "user": {
                        "image": {
                            "png": "./images/avatars/image-ramsesmiron.png",
                            "webp": "./images/avatars/image-ramsesmiron.webp"
                        },
                        "username": "ramsesmiron"
                    }
                },
                {
                    "id": 4,
                    "content": "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
                    "createdAt": "2 days ago",
                    "score": 2,
                    "replyingTo": "ramsesmiron",
                    "user": {
                        "image": {
                            "png": "./images/avatars/image-juliusomo.png",
                            "webp": "./images/avatars/image-juliusomo.webp"
                        },
                        "username": "juliusomo"
                    }
                }
            ]
        }
    ]
};
let modal = document.querySelector(".modal");
let currentUser;

// Helper Functions

// Disable Scroll function
const functiondisable = () => {
    // To get the scroll position of current webpage
    let TopScroll = window.pageYOffset || document.documentElement.scrollTop;
    let LeftScroll = window.pageXOffset || document.documentElement.scrollLeft;

    // if scroll happens, set it to the previous value
    window.onscroll = function () {
        window.scrollTo(LeftScroll, TopScroll);
    };
}

// Enable Scroll function
const functionenable = () => {
    window.onscroll = function () { };
}


// 1.Create Add a Comment section 
const addCommentSection = () => {
    let addCommenSection = document.createElement('div');
    addCommenSection.innerHTML = `<div class="add_comment">
    <img src="./images/avatars/image-juliusomo.webp" alt="" class="avatar" />
    <input
      type="text"
      name="add-comment"
      id="add"
      placeholder="Your Comment ...."
    />
    <button value="Submit" class="add-comment-btn" id="Add-Comment">Send</button>
  </div>`;
    container.parentNode.insertBefore(addCommenSection, container.nextSibling);
}


// 2. Creating Reply Div to append the replies comments to
const createReply = () => {
    let replies = document.createElement('div');
    replies.classList.add("replied")
    return replies;
}

// 3. Creating the Comment Divs with Contents function and Appendin it to the Parent container
const createElements = (data, ParentContainer) => {

    // Declaring the Divs elements
    let comment = document.createElement('div');
    let commentInfo = document.createElement('div');
    let head = document.createElement('div');
    let mainDesc = document.createElement('div');
    let avatar = document.createElement('img');
    let title = document.createElement('span');
    let derution = document.createElement('span');
    let reply = document.createElement('div');
    let replyBtn = document.createElement('button');
    let commentDesc = document.createElement('div');
    let mobVoteReply = document.createElement('div');
    let vote = document.createElement('div');
    let votePlus = document.createElement('span');
    let voteNum = document.createElement('span');
    let voteMinus = document.createElement('span');
    let ReplyMobile = document.createElement('div');


    // Adding classes to the elements
    comment.classList.add("comment");
    commentInfo.classList.add("comment-info");
    head.classList.add("head");
    mainDesc.classList.add("main-desc");
    avatar.classList.add("avatar");
    title.classList.add("title");
    reply.classList.add("reply", "desktop");
    replyBtn.classList.add("reply-btn");
    commentDesc.classList.add("comment-desc");
    mobVoteReply.classList.add("mobile-vote-reply");
    vote.classList.add("vote")
    votePlus.classList.add("vote-span", "sign", "plus");
    voteNum.classList.add("vote-span", "num");
    voteMinus.classList.add("vote-span", "sign", "minus");
    ReplyMobile.classList.add("reply", "mobile");

    // Appending childs to parents
    mainDesc.appendChild(avatar);
    mainDesc.appendChild(title);
    mainDesc.appendChild(derution);
    head.appendChild(mainDesc);
    reply.innerHTML = '<i class="fas fa-reply"></i>';
    replyBtn.innerText = "Reply";
    ReplyMobile.innerHTML = '<i class="fas fa-reply"></i><button class="reply-btn">Reply</button>';
    reply.appendChild(replyBtn);
    head.appendChild(reply);
    commentInfo.appendChild(head);
    commentInfo.appendChild(commentDesc);
    comment.appendChild(commentInfo);
    vote.appendChild(votePlus);
    vote.appendChild(voteNum);
    vote.appendChild(voteMinus);
    mobVoteReply.appendChild(vote);
    mobVoteReply.appendChild(ReplyMobile);
    comment.appendChild(mobVoteReply);

    // Checking if the user was the Current user
    if (data.user.username == currentUser) {
        let you = document.createElement('span');
        let delet = document.createElement('div');
        you.classList.add('you');
        delet.classList.add('delete', 'desktop');
        you.innerText = 'you';
        delet.innerHTML = '<i class="fas fa-trash-alt delete"></i>&nbsp;<span class="deletBtn">Delete</span>'
        mainDesc.appendChild(you)
        head.appendChild(delet)
        reply.innerHTML = `<i class="fas fa-pen"></i>
        <button class="reply-btn edit">Edit</button>`;
        replyBtn.innerText = "Edit";
        ReplyMobile.innerHTML = `  <span><i class="fas fa-trash-alt delete"></i>
        <span class="deletBtn">Delete</span></span>
        <i class="fas fa-pen"></i>
        <button class="reply-btn edit">Edit</button>`;

    }


    // adding content
    avatar.src = data.user.image.webp;
    title.innerText = data.user.username;
    derution.innerText = data.createdAt;

    // To Check if its a reply
    if (data.replyingTo) {
        commentDesc.innerHTML = `<span class="usernamereply">@${data.replyingTo}&nbsp; </span><p> ${data.content}</p>`
    } else {
        commentDesc.innerHTML = data.content
    }
    votePlus.innerText = "+";
    voteNum.innerText = data.score;
    voteMinus.innerText = "-";
    ParentContainer.appendChild(comment);

    // Checking for replies

    if (data.replies === undefined || data.replies.length === 0) {

        ParentContainer.appendChild(comment);

    }
    else {

        let replies = createReply();
        for (let index = 0; index < data.replies.length; index++) {

            createElements(data.replies[index], replies)
            ParentContainer.appendChild(replies);
        }


    }


}

// 4. Generate comments from the JSON File
const addContentDynamically = (data) => {

    CommentsData = data;
    let ParentContainer = container;
    currentUser = data.currentUser.username

    for (let index = 0; index < data.comments.length; index++) {
        createElements(data.comments[index], ParentContainer);
    }
    addCommentSection();

    // For delete button 
    const del = document.querySelectorAll(".deletBtn");
    del.forEach(deleteBtn => {
        deleteBtn.addEventListener("click", (e) => {
            let cont = (((deleteBtn.parentElement).parentNode).parentNode).parentNode
            window.scrollTo({ top: 0 });

            modal.style.visibility = "visible";
            functiondisable()
            let modalDeleteBtn = document.querySelector(".delete-comment-btn")
            let modalCancelBtn = document.querySelector(".cancel-delete-comment-btn")
            modalCancelBtn.addEventListener("click", (e) => { e.preventDefault; modal.style.visibility = "hidden"; functionenable() })
            modalDeleteBtn.addEventListener("click", (e) => { e.preventDefault; modal.style.visibility = "hidden"; cont.style.display = "none"; functionenable() })

        })

    });
    // End of delete button

    // Reply button 
    let addReplyDiv;
    const replyBtn = document.querySelectorAll(".reply");
    replyBtn.forEach(reply => {

        // Edit Button 
        if (reply.lastChild.innerText === "Edit") {
            reply.addEventListener("click", (e) => {
                e.preventDefault;
                let EditComment = (((reply.parentNode).nextSibling).lastChild);
                let note = document.createElement("span");
                note.classList.add("note")
                note.innerText = "Edite your comment and press enter to save";
                EditComment.parentNode.insertBefore(note, EditComment.nextSibling);
                EditComment.contentEditable = "true"
                EditComment.style.fontWeight = "900";
                EditComment.focus();
                EditComment.addEventListener('keypress', function (e) {
                    if (e.key === 'Enter') {

                        alert("Comment Saved");
                        note.remove();
                        EditComment.contentEditable = "false"
                        EditComment.style.fontWeight = "normal";

                    }
                })



            })

        }
        else {
            reply.addEventListener("click", (e) => {
                e.preventDefault;
                let newComment = document.querySelector("input");
                addReplyDiv = reply.parentElement.parentNode.parentNode;
                newComment.focus();
                newComment.value = `@${reply.previousElementSibling.childNodes[1].innerText} `
            })
        }
    })


    // Add a comment 
    const addCommentBtn = document.getElementById("Add-Comment");
    addCommentBtn.addEventListener("click", (e) => {
        e.preventDefault;

        let newComment = document.querySelector("input").value;

        if (!newComment) {
            alert("Please Add a comment");
        }
        else {
            let tempData = {
                "id": 4,
                "content": "",
                "createdAt": "Now",
                "score": 0,
                "replyingTo": "",
                "user": {
                    "image": {
                        "png": "./images/avatars/image-juliusomo.png",
                        "webp": "./images/avatars/image-juliusomo.webp"
                    },
                    "username": "juliusomo"
                }
            }

            if (newComment.startsWith("@")) {
                newComment = newComment.substring(1);
                tempData.replyingTo = newComment.split(" ")[0]
                tempData.content = newComment.substr(newComment.indexOf(" ") + 1);
                const replyDiv = createReply();
                createElements(tempData, replyDiv);
                document.querySelector("input").value = ""

                addReplyDiv.parentNode.insertBefore(replyDiv, addReplyDiv.nextSibling);

            }
            else {
                tempData.content = newComment
                createElements(tempData, container)
                document.querySelector("input").value = "";
            }
        }

    })


    // Vote Increment and Decreament

    let upVote = document.querySelectorAll(".plus")
    let downVote = document.querySelectorAll(".minus")
    upVote.forEach(vote => {
        let UpvoteFlag = false;
        vote.addEventListener("click", (e) => {

            if (!UpvoteFlag) {

                e.preventDefault;
                let voteScore = parseInt(vote.nextSibling.innerText)
                vote.nextSibling.innerText = voteScore + 1;

                UpvoteFlag = true;
            }


        })

    })

    downVote.forEach(vote => {
        let DownvoteFlag = false;
        vote.addEventListener("click", (e) => {
            if (!DownvoteFlag) {
                e.preventDefault;
                let voteScore = parseInt(vote.previousSibling.innerText)
                vote.previousSibling.innerText = voteScore - 1;
                DownvoteFlag = true;
            }
        })
    })

}





addContentDynamically(CommentsData, container)



// I've disabled this promise and added the data from JSON file into CommentsData Object -- To work on github pages

// Fetching data from JSON file

// async function
// async function fetchAsync() {
//     // await response of fetch call
//     let response = await fetch("../data.json");
//     let data = await response.json();
//     return data;
// }

// // trigger async function To add Comments from JSON file to the page
// fetchAsync()
//     .then(data => addContentDynamically(data, container));



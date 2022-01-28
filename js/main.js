
let container=document.querySelector(".container");

let currentUser;
const addComment=(data)=>
{

    currentUser=data.currentUser.username

    for (let index = 0; index < data.comments.length; index++) 
    {
        if(data.comments[index].user.username==currentUser)
        {
            createElements(data.comments[index]);
            //createCurrentUserComment(data.comments[index]);
        }
        else
        {
            createElements(data.comments[index]);
        }
    }


}


const createReply=()=>
{
    let replies=document.createElement('div');
    replies.classList.add("replied")
    return replies;
}

 //const createComment=()=>{}
 const createElements=(data)=>{

    let comment=document.createElement('div');
    let commentInfo=document.createElement('div');
    let head=document.createElement('div');
    let mainDesc=document.createElement('div');
    let avatar=document.createElement('img');
    let title=document.createElement('span');
    let derution=document.createElement('span');
    let reply=document.createElement('div');
    let replyBtn=document.createElement('button');
    let commentDesc=document.createElement('div');
    let mobVoteReply=document.createElement('div');
    let vote=document.createElement('div');
    let votePlus=document.createElement('span');
    let voteNum=document.createElement('span');
    let voteMinus=document.createElement('span');
    let ReplyMobile=document.createElement('div');


    // Adding classes to the elements
    comment.classList.add("comment");
    commentInfo.classList.add("comment-info");
    head.classList.add("head");
    mainDesc.classList.add("main-desc");
    avatar.classList.add("avatar");
    title.classList.add("title");
    reply.classList.add("reply","desktop");
    replyBtn.classList.add("reply-btn");
    commentDesc.classList.add("comment-desc");
    mobVoteReply.classList.add("mobile-vote-reply");
    vote.classList.add("vote")
    votePlus.classList.add("vote-span","sign","plus");
    voteNum.classList.add("vote-span","num");
    voteMinus.classList.add("vote-span","sign","minus");
    ReplyMobile.classList.add("reply","mobile");

    // Appending childs to parents
    mainDesc.appendChild(avatar);
    mainDesc.appendChild(title);
    
   


    mainDesc.appendChild(derution);
    head.appendChild(mainDesc);
    reply.innerHTML='<i class="fas fa-reply"></i>';
    replyBtn.innerText="Reply";
    ReplyMobile.innerHTML='<i class="fas fa-reply"></i><button class="reply-btn">Reply</button>';

    if(data.user.username==currentUser)
    {
        let you=document.createElement('span');
        let delet=document.createElement('div');
        you.classList.add('you');
        delet.classList.add('delete','desktop');
        you.innerText='you';
        delet.innerHTML='<i class="fas fa-trash-alt delete"></i>&nbsp;<span>Delete</span>'
        mainDesc.appendChild(you)
        head.appendChild(delet)

        reply.innerHTML='<i class="fas fa-edit"></i>';
        replyBtn.innerText="Edit";
        ReplyMobile.innerHTML=`  <i class="fas fa-trash-alt delete"></i>
        <span class="delete">Delete</span>
        <i class="fas fa-pen"></i>
        <button class="reply-btn edit">Edit</button>`;
        


    }
 
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


    // adding content
    avatar.src=data.user.image.webp;
    title.innerText=data.user.username;
    derution.innerText=data.createdAt;

    commentDesc.innerText=data.content;
    votePlus.innerText="+";
    voteNum.innerText=data.score;
    voteMinus.innerText="-";

    // Checking for replies
    

    if (  data.replies != undefined ) 
    {
        for (let index = 0; index < data.replies.length; index++) 
        {   
         
            createElements(data.replies[index])
        }
        
        
    }


    // Append it to the container
    
    container.appendChild(comment);
    container.appendChild(createReply());
}








// Fetching data from JSON file

    // async function
    async function fetchAsync () {
    // await response of fetch call
    let response = await fetch("../data.json");
    // only proceed once promise is resolved
    let data = await response.json();
    // only proceed once second promise is resolved
    return data;
  }
  
  // trigger async function
  fetchAsync()
      .then(data => addComment(data) )
      





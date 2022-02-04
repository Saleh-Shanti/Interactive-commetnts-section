let container=document.querySelector(".container");
let modal=document.querySelector(".modal");
let currentUser;

// Helper Functions

// Disable Scroll function
const functiondisable=()=> {
    // To get the scroll position of current webpage
    let TopScroll = window.pageYOffset || document.documentElement.scrollTop;
    let LeftScroll = window.pageXOffset || document.documentElement.scrollLeft;
    
    // if scroll happens, set it to the previous value
    window.onscroll = function() {
    window.scrollTo(LeftScroll, TopScroll);
            };
    }

// Enable Scroll function
const  functionenable=()=> 
{
    window.onscroll = function() {};
}


// 1.Create Add a Comment section 
const addComment=()=>{
    let addCommenSection=document.createElement('div');
    addCommenSection.innerHTML=`<div class="add_comment">
    <img src="./images/avatars/image-juliusomo.webp" alt="" class="avatar" />
    <input
      type="text"
      name="add-comment"
      id="add"
      placeholder="Your Comment ...."
    />
    <button value="Submit" class="add-comment-btn">Send</button>
  </div>`;
  container.appendChild(addCommenSection);
}


// 2. Creating Reply Div to append the replies comments to
const createReply=()=>
{
    let replies=document.createElement('div');
    replies.classList.add("replied")
    return replies;
}

// 3. Creating the Comment Divs with Contents function and Appendin it to the Parent container
 const createElements=(data,ParentContainer)=>{

    // Declaring the Divs elements
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
    if(data.user.username==currentUser)
    {
        let you=document.createElement('span');
        let delet=document.createElement('div');
        you.classList.add('you');
        delet.classList.add('delete','desktop');
        you.innerText='you';
        delet.innerHTML='<i class="fas fa-trash-alt delete"></i>&nbsp;<span class="deletBtn">Delete</span>'
        mainDesc.appendChild(you)
        head.appendChild(delet)
        reply.innerHTML=`<i class="fas fa-pen"></i>
        <button class="reply-btn edit">Edit</button>`;
        replyBtn.innerText="Edit";
        ReplyMobile.innerHTML=`  <span><i class="fas fa-trash-alt delete"></i>
        <span class="deletBtn">Delete</span></span>
        <i class="fas fa-pen"></i>
        <button class="reply-btn edit">Edit</button>`;
        
    }
 

    // adding content
    avatar.src=data.user.image.webp;
    title.innerText=data.user.username;
    derution.innerText=data.createdAt;
    commentDesc.innerHTML=`<span class="usernamereply">@${data.user.username}</span>${data.content}`
    votePlus.innerText="+";
    voteNum.innerText=data.score;
    voteMinus.innerText="-";
    ParentContainer.appendChild(comment); 

    // Checking for replies
    
    if (  data.replies === undefined || data.replies.length===0 ) 
    {
       
        ParentContainer.appendChild(comment); 
                      
    }
    else
    {

        let replies=createReply();
        for (let index = 0; index < data.replies.length; index++) 
        {   
            
            createElements(data.replies[index],replies)
            ParentContainer.appendChild(replies); 
        }
    

    }
      
    
}

// 4. Generate comments from the JSON File
const addContentDynamically=(data)=>
{
    let ParentContainer=container;
    currentUser=data.currentUser.username

    for (let index = 0; index < data.comments.length; index++) 
    {
         createElements(data.comments[index],ParentContainer);
    }
    addComment();

    // For delete button 
    const del=document.querySelectorAll(".deletBtn");
    del.forEach(deleteBtn => {
        deleteBtn.addEventListener("click",(e)=>{
            let cont=(((deleteBtn.parentElement).parentNode).parentNode).parentNode
            window.scrollTo({ top: 0 });
            
            modal.style.visibility="visible";
            functiondisable()
                let modalDeleteBtn =document.querySelector(".delete-comment-btn")
                let modalCancelBtn =document.querySelector(".cancel-delete-comment-btn")
                modalCancelBtn.addEventListener("click",(e)=>{e.preventDefault; modal.style.visibility="hidden";functionenable()})
                modalDeleteBtn.addEventListener("click",(e)=>{e.preventDefault; modal.style.visibility="hidden" ; cont.style.display="none";functionenable()})
            
        })
      
    });
    // End of delete button

    // Reply button 
    const replyBtn=document.querySelectorAll(".reply");
    replyBtn.forEach(reply=>{
        reply.addEventListener("click",(e)=>{ 
        console.log("replied")})
    })

    

}









// Fetching data from JSON file

    // async function
    async function fetchAsync () {
    // await response of fetch call
    let response = await fetch("../data.json");
    let data = await response.json();
    return data;
  }
  
  // trigger async function To add Comments from JSON file to the page
  fetchAsync()
      .then(data => addContentDynamically(data,container) );
      


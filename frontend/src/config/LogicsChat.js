export const getSender=(loggedUser,users)=>{

  console.log(loggedUser , "loggedUser")

   let UserName = users?.map((item)=>{

    return item?._id !== loggedUser?._id ? item?.name : null ;   }).filter((names)=>names!==loggedUser?.name&&names) 

    return UserName

}


export const getSenderFull=(loggedUser,users)=>{
    return users[0]._id === loggedUser?._id ? users[1]: users[0]
}



export const isSameSender = (messages, m, i, userId) => {
    return (
      i < messages.length - 1 &&
      (messages[i + 1].Sender?._id !== m.Sender?._id ||
        messages[i + 1].Sender?._id === undefined) &&
      messages[i]?.Sender?._id !== userId
    );
  };
  
  export const isLastMessage = (messages, i, userId) => {
    return (
      i === messages.length - 1 &&
      messages[messages.length - 1].sender?._id !== userId &&
      messages[messages.length - 1].sender?._id
    );
  };



  export const isSameSenderMargin = (messages, m, i, userId) => {
    // console.log(i === messages.length - 1);
  
    if (
      i < messages.length - 1 &&
      messages[i + 1].Sender?._id === m?.Sender?._id &&
      messages[i].Sender?._id !== userId
    )
      return 33;
    else if (
      (i < messages.length - 1 &&
        messages[i + 1].Sender?._id !== m?.Sender?._id &&
        messages[i]?.Sender?._id !== userId) ||
      (i === messages.length - 1 && messages[i]?.Sender?._id !== userId)
    )
      return 0;
    else return "auto";
  };



  export const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1]?.sender?._id === m?.sender?._id;
  };
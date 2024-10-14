const generateUniqueUserName = (email) => {
    const uniqueDigit = Math.floor(Math.random() * 9999) ;
    let userName =  email.substring(0, email.indexOf('@')).concat(uniqueDigit);
    
    // remove '.'(dot) from username 
    if(userName.indexOf('.') != -1){
        const dotIndex = userName.indexOf('.');
        userName = userName.substring(0, dotIndex).concat(userName.slice( dotIndex + 1 ));
    }
    return userName;
  }
  
  export { generateUniqueUserName };
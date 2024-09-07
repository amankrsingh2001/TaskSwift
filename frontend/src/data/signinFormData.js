export const signinData = {
    heading:"Create an account",
    description:"Describe yourself as clearly so that there are no mistakes.",   
    formEls :[
        {   id:1,
            icon:'FaRegUser',
            name:"fullName",
            type:"text",  
            lable:"Full name"      
        },
        {   id:2,
            icon:'HiOutlineMail',
            name:"email",
            type:"email", 
            lable:"Email"  
        },
        {   id:3,
            icon:'MdLockOutline',
            name:"password",
            type:"password",  
            lable:"Password" 
        },

    ],
    additionalInfo:{
        title:"Sign In",
        description:"Don't you have an account?",
        linkUrl :"/signin"
    },
    submitButtonText : 'Sign in'

}

export const signupData = {
    heading:"Create an account",
    description:"Describe yourself as clearly so that there are no mistakes.",   
    formEls :[
        {   id:1,
            icon:'FaRegUser',
            name:"fullName",
            type:"text",  
            lable:"Full name"      
        },
        {   id:2,
            icon:'HiOutlineMail',
            name:"email",
            type:"email", 
            lable:"Email"  
        },
        {   id:3,
            icon:'MdLockOutline',
            name:"password",
            type:"password",  
            lable:"Password" 
        },

    ],
    additionalInfo:{
        title:"Sign In",
        description:"Don't you have an account?",
        linkUrl :"/signin"
    },
    submitButtonText : 'Create account'

}
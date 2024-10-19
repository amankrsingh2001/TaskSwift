import { nanoid } from "@reduxjs/toolkit"

export const signinData = {
    heading:"Welcome back!",
    description:"Start tracking your progress with GoalGuru the fastest task manager application.",   
    formEls :[
        {   id:nanoid(),
            icon:'FaRegUser',
            name:"email",
            type:"email",  
            lable:"Email"      
        },
        {   id:nanoid(),
            icon:'MdLockOutline',
            name:"password",
            type:"password",  
            lable:"Password" 
        },

    ],
    additionalInfo:{
        title:"Sign Up",
        description:"Don't you have an account?",
        linkUrl :"/account/signup"
    },
    submitButtonText : 'Sign in'

}

export const signupData = {
    heading:"Create an account",
    description:"Describe yourself as clearly so that there are no mistakes.",   
    formEls :[
        {   id:nanoid(),
            icon:'FaRegUser',
            name:"fullName",
            type:"text",  
            lable:"Full name"      
        },
        {   id:nanoid(),
            icon:'HiOutlineMail',
            name:"email",
            type:"email", 
            lable:"Email"  
        },
        {   id:nanoid(),
            icon:'MdLockOutline',
            name:"password",
            type:"password",  
            lable:"Password" 
        },

    ],
    additionalInfo:{
        title:"Sign In",
        description:"Already have an account?",
        linkUrl :"/account/signin"
    },
    submitButtonText : 'Create account'

}

export const forgotPasswordData = {
    heading:"Forgot your password",
    description:"Describe yourself as clearly so that there are no mistakes.",   
    formEls :[
        {   id:nanoid(),
            icon:'HiOutlineMail',
            name:"email",
            type:"email", 
            lable:"Email"  
        },
    ],
    additionalInfo:{
        title:"Sign In",
        description:"Don't you have an account?",
        linkUrl :"/account/signin"
    },
    submitButtonText : 'Forgot Password'

}

export const newPasswordData = {
    heading:"Set New password",
    description:"Describe yourself as clearly so that there are no mistakes.",   
    formEls :[
        {   id:nanoid(),
            icon:'MdLockOutline',
            name:"password",
            type:"password",  
            lable:"Password" 
        },
        {   id:nanoid(),
            icon:'MdLockOutline',
            name:"confirmPassword",
            type:"password",  
            lable:"Confirm Password" 
        },
    ],
    additionalInfo:{
        title:"Sign In",
        description:"Are you remeber your password?",
        linkUrl :"/account/signin"
    },
    submitButtonText : 'Submit'

}
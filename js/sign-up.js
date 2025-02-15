const form = document.getElementById('form');
const email = document.getElementById('email');
const username = document.getElementById('username');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const error_messages=document.getElementById('error_messages')

form.addEventListener('submit',(e)=>{
    e.preventDefault()//Prevents form from auto submitting 
    let errors=[];
    if(password.value !== confirmPassword.value){
        e.preventDefault()//Prevents form from auto submitting 
        errors.push('Password word do not match')
    }
    if(errors.length > 0){
        error_messages.innerHTML=errors.join('<br>')
    }else{
        let informationObject={
            email: email.value,
            username:username.value,
            password:password.value,
            confirmPassword:confirmPassword.value,
        }
        let  stringInformation=JSON.stringify(informationObject);
                console.log(stringInformation);
               

        localStorage.setItem("userInformation",stringInformation);
        console.log(localStorage);
    }
    
})

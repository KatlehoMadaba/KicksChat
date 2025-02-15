const form = document.getElementById('form');
const email = document.getElementById('email');
const username = document.getElementById('username');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const error_messages=document.getElementById('error_messages')

form.addEventListener('submit',(e)=>{
    let errors=[];
    if(password.value !== confirmPassword.value){
        e.preventDefault()
        errors.push('Password word do not match')
    }
    if(errors.length > 0){
        error_messages.innerHTML=errors.join('<br>')
    }
    
})
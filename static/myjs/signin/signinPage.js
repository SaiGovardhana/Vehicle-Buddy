//doAjaxRequest ->Not required for page currently
//doRenderPage ->Not required for page currently.
function validateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true);
  }
   
    return (false);
}

async function buttonClicked(e)
{
    let email=$("#email").val();
    let password=$("#password").val();

    if(!validateEmail(email))
    {
        Swal.fire({
            icon: 'error',
            title: 'Not a valid email',
            text: 'Please enter a valid email.',
            
          });
          return
    }

    if(password.length<3)
    {
        Swal.fire({
            icon: 'error',
            title: 'Password too short.',
            text: 'Minimum characters are 3 for a password.',
            
          });

    }
    try{
    //Send request for authentication for server.
    let respone=await $.ajax({method:'POST',url:'/user/authenticate',contentType:'application/json',data:JSON.stringify({email:email,password:password})});
    
    //Process response
    if(respone.success)
      {
        Swal.fire({
          icon: 'success',
          title: 'Yahooo!!!',
          text: respone.message,
          showConfirmButton: false, 
          allowOutsideClick: false, 
          timer:2200
          
        });
        setTimeout(()=>window.location.replace('/'),2000);
        return;
      }
    else
    {
      Swal.fire({
        icon: respone.message.indexOf("Find")!=-1? 'question':'error',
        title:  respone.message.indexOf("Find")!=-1? "Do you have an account bro?":"Seems like you forgot the password",
        text: respone.message,

        
      });
      return ;
    }
    }
    catch(E)
    {
      console.log(E);
      Swal.fire({
        icon: 'error',
        title: "Seems there is an error",
        text: "Internal error/Problem with the Network"
        
      });
    }

}
async function  doRegisterListener()
{
    $('#signIn').on('click',buttonClicked);

}

PageTemplate(undefined ,undefined,doRegisterListener,undefined);
//This page doesn't have doAjax
//This page doesn't have doRender
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
    let name=$("#name").val();
    let repassword=$("#repassword").val();
    console.log(name);
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
        return;

    }
    if(password!=repassword)
    {
        Swal.fire({
            icon: 'error',
            title: 'Passwords do not match.',
            text: 'Minimum characters are 3 for a password.',
            
          });
          return;
    }
    try{
    //Send request for authentication for server.
    let respone=await $.ajax({method:'POST',url:'/user/createUser',contentType:'application/json',data:JSON.stringify({email:email,name:name,password:password})});
    
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
        return ;
      }
    else
    {
      Swal.fire({
        icon: 'error',
        title:  "Oops, seems we got a problem.",
        text: respone.message,

        
      });
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
    $('#signUp').on('click',buttonClicked);

}

PageTemplate(undefined ,undefined,doRegisterListener,undefined);
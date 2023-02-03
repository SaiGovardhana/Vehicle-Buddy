async function autoCompleteLocation(data,initial)
{

function render(data,initial){
    
    for(let [k,v] of Object.entries(data))
    {
      for(let x of v)
        { let cur=x+", "+k;
          let newOption = new Option(cur, cur, false, false);
          $('#location').append(newOption).trigger('change');
        }
    }
    $("#location").trigger('change')
    }

    render(data,initial); 

      console.log(data);
      console.log(initial)
      $('#location').select2({'selectOnClose':true});
      $("#location").prop('disabled',true);
      $("#location").val(initial).trigger('change');
}

async function doAjaxRequest()
{
    let data=await $.ajax({method:'GET',url:'/user/auth/loggedin'});
    
    console.log(data,"HERE");
    data=data;
    return data;

}
async function submitChange()
{
    let email=$("#email").val();
    let name=$('#name').val();
    let dob=$('#dob').val();
    let location=$("#location").val();
    let profilepic=$('#profile').attr('src');
    try
    {
        let response=await $.ajax({method:'PUT',url:'/user/',data:JSON.stringify({profilepic:profilepic,email:email,name:name,dob:dob,location:location}),contentType:'application/json'})
        
        if(response.success)
        {
          Swal.fire({
            icon: 'success',
            title: response.message,
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
          icon:'error',
          
          title: response.message,
          showConfirmButton: false, 
          allowOutsideClick: false, 
          timer:2200
  
          
        });
    }}
    catch(E)
    {
        console.log(E);
        Swal.fire({
            icon:'error',
            
            title: "A fatal has occured",
            showConfirmButton: false, 
            allowOutsideClick: false, 
            timer:2200
    
            
          });

    }
    
}
async function doRender(data)
{   let user=data.data;
    if(user==null||user==undefined)
    {   
        Swal.fire({
            icon: 'error',
            title: "Failed to get user!!!",
            showConfirmButton: false, 
            allowOutsideClick: false, 
            timer:2200
            
          });
        
        return;
    }
    
    $("#email").val(user.email);
    $("#name").val(user.name);
    $("#dob").val(user.dob);
    $("#location").val(user.location);
    if(user.profilepic!=undefined)
      $("#profile").attr('src',user.profilepic);
   let locData= await  $.ajax({url:'/data/india.json',method:'GET'});
   autoCompleteLocation(locData,user.location);
}
async function toggleEditing()
{   let name=$('#name');
    let email=$('#email');
    let dob=$('#dob');
    let location=$('#location');
    let input=$('#input');
    let arr=[input,name,dob];
    if(location.prop('disabled'))
      $("#location").prop('disabled',false);
    else
    $("#location").prop('disabled',true);
    arr.forEach(x=>{   console.log("HERE",x.attr('disabled')==='disabled')

            if(x.attr('disabled')=='disabled')
            {
                x.attr('disabled',false);
            }
            else
                x.attr('disabled','disabled');
        }
        );
    if(name.attr('disabled')=='disabled')
    {
      Swal.fire({
        icon: 'error',
        title: "Editing has been disabled!!!",
        showConfirmButton: false, 
        allowOutsideClick: false, 
        timer:2200
        
      });
    }
    else
    {
      Swal.fire({
        icon: 'success',
        title: "Editing has been enabled!!!",
        showConfirmButton: false, 
        allowOutsideClick: false, 
        timer:1500
        
      });
    }
    
    

}
async function doRegisterListener()
{   $('#edit').on('click',toggleEditing);
    $('#save').on('click',submitChange);
}

PageTemplate(doAjaxRequest,doRender,doRegisterListener);
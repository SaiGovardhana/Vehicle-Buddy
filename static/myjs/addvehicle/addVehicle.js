async function alerting(data)
{   
   
   Swal.fire({

        showCancelButton: true,
        confirmButtonText: 'Add vehicle',
        icon:"warning",
        title:"Are your sure?",
        showLoaderOnConfirm: true,
        allowOutsideClick: false,
        preConfirm:  () => {
          return $.ajax({method:"POST",contentType:'application/json','data':JSON.stringify(data),'url':"/vehicle/addVehicle"}).
          then((result)=>
            {

                if(result.success)
                {
                    console.log("Succesfully added");
                    Swal.fire({allowOutsideClick:false,
                        showConfirmButton: false, 
                        allowOutsideClick: false, 
                        "icon":"success",
                        "title":"Successfully added vehicle.",
                        "text":"Redirecting you to homepage."
                        }
                    );
                    setTimeout(()=>window.location.href='/',3000);
                }
                else
                {

                    Swal.fire({allowOutsideClick:false,
                        confirmButtonText: 'OK',
                        allowOutsideClick: false, 
                        "icon":"error",
                        "title":`${result.message}`,
                            "text":'Try again'
                        }
                    );
                }

                
        
            }


          ) .
          catch(e=>
            {       console.log("Error babai",e);
                    Swal.fire({allowOutsideClick:false,
                        "icon":"error",
                        "title":"A fatal error occurend."
                        }
                     );});;},});
 

}
function displayError(message)
{
    Swal.fire({allowOutsideClick:false,
        confirmButtonText: 'OK',
        allowOutsideClick: false, 
        "icon":"error",
        "title":`${message}`,
            "text":'Try again'
        });


}
async function submitChange()
{
    let model=$("#autocompletemodel").val();
    let vehicleprice=$('#vehicleprice').val();
    let location=$("#autocompletestate").val();
    let profilepic=$('#profile').attr('src');
    if(model==null)
    {   displayError("Enter the car model");
        return;
    }
    if(location==null)
    {   displayError("Enter the cars location");
        return;
    }
    if(vehicleprice==null||vehicleprice<=0)
    {   displayError("Enter vehicles price.");
        return;
    }
    
    let requestData={model:model,vehicleprice:vehicleprice,location:location,profilepic:profilepic};
    alerting(requestData);
}


async function doRegisterListener(data)
{
    $("#submitVehicle").on('click',submitChange);

}
async function doHook()
{    console.log("IN HOOK")
    autoCompleteCar();
    autoCompleteLocation();

}

PageTemplate(undefined,undefined,doRegisterListener,doHook);


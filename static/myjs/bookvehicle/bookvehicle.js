async function renderVehicle(vehicle){
    return (`<div id="display-container container-fluid" class="row gy-4 mt-4">
      <div class="row justify-content-around">
        
        <div class="container-fluid justify-content-center col-md-4 col-8 ">
          <div class="row justify-content-center ">
          <p class="mt-4 h2">${vehicle["fullmodel"]}</p>
           <img  src="${vehicle.pic}" alt="">
        </div>
        </div>

        <div class="mt-5 container-fluid col-8   ">
          <div class="row justify-content-center">
            <p class=" h4 ">Location</p>
            <div class="icon h5 flex-shrink-0"><i class="fa-solid me-2 fa-location-dot"></i>${vehicle["location"]}</div>
            <p class="mt-4 h4">Price:</p>
            <div class="icon h5 flex-shrink-0"><i class="fa-solid me-2 fa-inr"></i>${vehicle["vehicleprice"]} / Per day</div>
            <p class="mt-4 h4">Seller</p>
            <div class="icon h5 flex-shrink-0"><i class="fa-solid me-2 fa-envelope"></i>${vehicle["selleremail"]}</div>
          </div>
        </div>


      </div>

    
  </div>`);
}
async function doAjaxRender()
{   
    let id = window.location.hash.substring(1);
    let data = await $.ajax({url:"/vehicle/getVehicle?id="+id,method:"GET"});
    return data;
}

async function doRender(data){
    let vehicle = data.data;
    if(vehicle== null){
        $("#vehicleContainer").html("<h1 class='text-danger text-center h1'>Oops! Couldn't find vehicle</h1>");
    }
    else{
        $("#vehicleContainer").html(await renderVehicle(vehicle));
    }
}

PageTemplate(doAjaxRender,doRender);
async function doAjax()
{
    let data=await $.ajax({url:"/book/getCustomerBookings",method:"GET",});
    return data;
}

async function doRender(data)
{   let dataFormat={
    data:data.data,
    columns:
    [
        {title:"Vehicle Name",data:"vehicleid"},
        {title:"Vehicle Price",data:"vehicleprice"}
    ]
        };

    $("#table").DataTable(dataFormat);
}

PageTemplate(doAjax,doRender);
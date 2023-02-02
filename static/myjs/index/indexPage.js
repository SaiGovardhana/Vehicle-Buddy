async function doAjaxRequest()
{
    let data=await $.ajax(
        {
            url:'/vehicleCategories'
        }
    );
    
    console.log(data);

    return data;
}

async function renderStat(categoryName,categoryIcon,categoryCount)
{
 return ( `<div class="col-lg-3 col-6">
  <div class="stats-item text-center w-100 h-100">
    <span data-purecounter-start="0" data-purecounter-end="${categoryCount}" data-purecounter-duration="1" class="purecounter">${categoryCount}</span>
    <div class="icon flex-shrink-0"><i class="fa-solid fa-xl ${categoryIcon}"></i></div>
    <p>${categoryName}</p>
  </div>
</div>`)

}

async function renderCard(categoryName,categoryIcon,categoryDescription)
{
    return (`<div class="col-lg-4 col-md-6 service-item d-flex" data-aos="fade-up">
    <div class="icon flex-shrink-0"><i class="fa-solid ${categoryIcon}"></i></div>
    <div>
      <h4 class="title">${categoryName}</h4>
      <p class="description">${categoryDescription}</p>
      <a href="service-details.html#${categoryName}F" class="readmore stretched-link"><span>Learn More</span><i class="bi bi-arrow-right"></i></a>
    </div>
  </div>`

);
}

async function doRenderPage(data)
{
  let categories=data.data;
  let renderedString='';
  let renderedStats="";
  for(let [k,v] of Object.entries(categories))
  {
    renderedString+=await renderCard(v["category-name"],v["category-icon"],v["category-description"]);
    renderedStats+=await renderStat(v["category-name"],v["category-icon"],v["category-count"]);
  }

    $('#category-container').html(renderedString);
  
    $('#stats-container').html(renderedStats);

}

PageTemplate(doAjaxRequest,doRenderPage,undefined,undefined);
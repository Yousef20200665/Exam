$(document).ready(function () {
  
  $(".loading").fadeOut(1000)
  $("body").css("overflow","auto")

  
  
  let sideOpen=document.querySelector(".open")
  let sideClose=document.querySelector(".close")
  let sideBarWidth = $(".sideBarLeft").innerWidth()
    // $(".sideBarLeft .text").slideToggle();
    
    
    
    $(" .sideBar").css("left",-sideBarWidth)
    
    sideOpen.addEventListener("click",function(){
      sideOpen.classList.replace("d-block","d-none")
    sideClose.classList.replace("d-none","d-block")
    $(".sideBar ").animate({left:"0px"},500)
    $(".search1").animate({ top: "10px" }, 700);
    $(".category1").animate({ top: "20px" }, 800);
    $(".Area1").animate({ top: "30px" }, 900);
    $(".Ingredient1").animate({ top: "40px" }, 1000);
    $(".ContactUs1").animate({ top: "50px" },1100);
    })
    sideClose.addEventListener("click",function(){
      sideClose.classList.replace("d-block","d-none")
    sideOpen.classList.replace("d-none","d-block")
   
    $(".sideBar").animate({left:-sideBarWidth},500)
    // $(".sideBarLeft .text").slideUp(200)

  })
  
  
  $(".open").click(function(){
      $(".open").css({"display":"none"},function(){
          $(".close").css({"display":"block"})
        })
      })
      




        //-------------------------------------
        document.querySelector(".category1").addEventListener("click", function() {
          $(".inputs").css("display","none")
          displayCategory();
          sideClose.classList.replace("d-block","d-none")
          sideOpen.classList.replace("d-none","d-block")
          $(".sideBar").animate({left:-sideBarWidth},500)
          
        });
  
        document.querySelector(".Area1").addEventListener("click", function() {
          $(".inputs").css("display","none")
          displayArea();
          sideClose.classList.replace("d-block","d-none")
          sideOpen.classList.replace("d-none","d-block")
          $(".sideBar").animate({left:-sideBarWidth},500)
          
       
        });

        document.querySelector(".Ingredient1").addEventListener("click", function() {
          $(".inputs").css("display","none")
          displayIngredient(Ing)
          sideClose.classList.replace("d-block","d-none")
          sideOpen.classList.replace("d-none","d-block")
          $(".sideBar").animate({left:-sideBarWidth},500)
          
       
        });
        document.querySelector(".search1").addEventListener("click", function() {
          displayInputs();
          sideClose.classList.replace("d-block", "d-none");
          sideOpen.classList.replace("d-none", "d-block");
          $(".sideBar").animate({ left: -sideBarWidth }, 500);
        });
        
        //-------------------------------------
        let src = [];
        function displayInputs() {
          let rowData = document.querySelector(".rowData");
          let box = "";
        
          box = `
   <div class="container  p-5">
        <div class="row g-4  pt-4  mt-5 inputs" >
        <div class="col-md-6">
        <div class="form-group">
          <input type="text" id="input1" class="form-control" placeholder="Search by name">
        </div>
       </div>
        <div class="col-md-6">
          <div class="form-group">
          <input type="text" id="input2" class="form-control" placeholder="Search by first letter" maxlength="1">
          </div>
        </div>
            
        </div>
        <div class="row g-4  pt-4 rowData mt-5" >
            
        </div>

        </div> 

          `;
          
          document.getElementById("bigBody").innerHTML = box;
          let input1 = document.getElementById("input1");
          let input2 = document.getElementById("input2");

          input1.addEventListener("keyup", async function() {
            let rowData=document.querySelector(".rowData")
            let index = input1.value;
            let apiResponse2 = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${index}`);
            let finalRlt2 = await apiResponse2.json();
            src = finalRlt2.meals;
            console.log(src);
            if(src!=null){
            displaySearch()
            }
            else{
              rowData.innerHTML="";
            }
            if(index==""|| index==" "){
              rowData.innerHTML="";
            }
          });
        
          input2.addEventListener("keyup", async function() {
            let rowData=document.querySelector(".rowData")
            let index = input2.value;
            let apiResponse2 = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${index}`);
            let finalRlt2 = await apiResponse2.json();
            src = finalRlt2.meals;
            console.log(src);
            if(src!=null){
            displaySearch()
            }
            else{
              rowData.innerHTML="";
            }
            if(index==""){
              rowData.innerHTML="";
            }
          });
          
        }
        
        function displaySearch(){
          let rowData=document.querySelector(".rowData")

          let box="";
          for (let i = 0; i < src.length; i++) {
         
            box+=`
            <div class="col-md-3 ">
              <div class="position-relative innerCol  border border-success bg-danger rounded-4">
                  <div class="  rounded-4">
                      <img src="${src[i].strMealThumb}"  class="w-100  rounded-4  " alt="">
                      <div class="layer rounded-4 position-absolute " mealDetails="${ src[i].idMeal}">
                           <h3 class=" ms-2  text-black text-center py-2 " mealDetails="${ src[i].idMeal}">${ src[i].strMeal}</h3>  
                       </div>
                   </div>
               </div>
            </div>
            ` 
          }
          rowData.innerHTML=box
          document.querySelectorAll(".layer").forEach(function(element) {
            element.addEventListener("click", function(e) {
              getDetails(e.target.getAttribute("mealDetails"));
              // console.log(getCatDetails(m[index]));
            });
          });
        }
       
//============================= start Category=======================      
      // let search = document.getElementById("search")
      // // search.addEventListener('click',function()
      // // {
      // //   rowData.innerHTML=''
      // // })
      let index;
      
      let cat=[];
      async  function getCategory(){
        let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        let finalRlt = await apiResponse.json();
        cat=finalRlt.categories;
        // console.log(finalRlt);
        //  console.log(cat.length);
        // console.log(cat);
      }
      getCategory()
      
  

  function displayCategory( ){
    let rowData=document.querySelector(".rowData")

    let box="";
    for (let i = 0; i < cat.length; i++) {
   
      box+=`
      <div class="col-md-3 ">
        <div class="position-relative innerCol  border border-success bg-danger rounded-4">
            <div class="  rounded-4">
                <img src="${cat[i].strCategoryThumb}"  class="w-100  rounded-4  " alt="">
                <div class="layer rounded-4 position-absolute " category="${ cat[i].strCategory}">
                     <h3 class=" ms-2  text-black text-center py-2 " category="${ cat[i].strCategory}">${ cat[i].strCategory}</h3>  
                     <p class="text-black text-center">${cat[i].strCategoryDescription .split(" ").slice(0,20).join(" ")}</p>
                 </div>
             </div>
         </div>
      </div>
      ` 
    }
    rowData.innerHTML=box
  
    
    document.querySelectorAll(".layer").forEach(function(element) {
      element.addEventListener("click", function(e) {
        getCatDetails(e.target.getAttribute("category"));
        // console.log(getCatDetails(m[index]));
      });
    });
  }
//============================= start Category=======================      

  //================= start CategoryDetails====================
  // let m=[];
  async function getCatDetails(index) {
    let apiResponse2 = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${index}`);
    let finalRlt2=  await apiResponse2.json();
    // m=finalRlt2.meals
    // console.log(m);
    displayCategoryDetails(finalRlt2.meals)
  }
 


function displayCategoryDetails(v) {
  let rowData = document.querySelector(".rowData");
  let box = "";

  for (let i = 0; i < v.length; i++) {
    box += `
      <div class="col-md-3">
        <div class="position-relative innerCol " >
          <div class="rounded-4">
            <img src="${v[i].strMealThumb}" class="w-100"  alt="">
            <div class="layer rounded-4 position-absolute" mealId="${ v[i].idMeal}">
              <p class="ms-2 text-black text-center py-2" mealId="${ v[i].idMeal}">${v[i].strMeal}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  rowData.innerHTML = box;
  document.querySelectorAll(".layer").forEach(function(element) {
    element.addEventListener("click", function(e) {
      getDetails(e.target.getAttribute("mealId"));
      // console.log(getCatDetails(m[index]));
    });
  });
  

}

  //=================  end CategoryDetails====================
  //================= start CategoryDetails====================
  async function getDetails(index) {
    let apiResponse2 = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${index}`);
    let finalRlt2 = await apiResponse2.json();

    displayDetails(finalRlt2.meals)
  }
 


function displayDetails(mealDetails) {
  let rowData = document.querySelector(".rowData");
  let box = "";

  for (let i = 0; i < mealDetails.length; i++) {
     box = `
  <div class="col-md-4">
  <img src="${mealDetails[i].strMealThumb}" class="w-100 rounded-3" alt="">
  <p class=" fs-3 fw-bolder">${mealDetails[i].strCategory}</p>
  </div> 
  
  <div class="col-md-8">
  <h2>Instructions</h2>
  <p >${mealDetails[i].strInstructions}</p>
      <p class=" fs-4 fw-bolder">Area : ${mealDetails[i].strArea}</p>
      <p class=" fs-4 fw-bolder">Category : ${mealDetails[i].strCategory}</p>
      <p class=" fs-4 fw-bolder">Recipes :</p>
      <ul class="list-unstyled d-flex gap-2"> 
      <li class=" alert alert-info p">${mealDetails[i].strIngredient1}</li>
      <li class="alert alert-info p">${mealDetails[i].strIngredient2}</li>
      <li class="alert alert-info p">${mealDetails[i].strIngredient3}</li>
        <li class="alert alert-info p">${mealDetails[i].strIngredient4}</li>
        <li class="alert alert-info p">${mealDetails[i].strIngredient5}</li>
      </ul>
      <p >Tags: </p>
      <ul class="list-unstyled d-flex gap-5"> 
        <li class="alert alert-info p">${mealDetails[i].strTags}</li>

      </ul>
      
      <div class="d-flex gap-3">
      <a target="_blank" href="${mealDetails[i].strSource}" class="btn-danger btn">Source</a>
      <a target="_blank" href="${mealDetails[i].strYoutube}" class="btn btn-info">Youtube</a>
      </div>
    </div> 
  `;
  }

  rowData.innerHTML = box;
}

  //=================  end CategoryDetails====================





//============================= start Home========================================
let meal = [];

async function getMeal() {
  let apiResponse1 = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
  let finalRlt1 = await apiResponse1.json();
  meal = finalRlt1.meals;
  displayMeal();
}

getMeal();

function displayMeal() {
  let rowData = document.querySelector(".rowData");
  let box = "";
  
  for (let i = 0; i < meal.length; i++) {
    box += `
    <div class="col-md-3 ">
    <div class="position-relative innerCol">
    <div class="  rounded-4 ">
            <img src="${meal[i].strMealThumb}"  class="w-100  rounded-4" alt="">
            <div class="layer rounded-4 position-absolute">
              <h3 class="ms-2 m text-black py-2">${meal[i].strMeal}</h3>  
            </div>
          </div>
          </div>
          </div>
    `;
  }
  
  rowData.innerHTML = box;
  
  let mealDivs = document.querySelectorAll(".innerCol");
  mealDivs.forEach((div, index) => {
    div.addEventListener("click", () => {
      displayMealDetails(index);
    });
  });
}

async function displayMealDetails(index) {
  let mealId = meal[index].idMeal;
  let apiResponse2 = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
  let finalRlt2 = await apiResponse2.json();
  let mealDetails = finalRlt2.meals[0];
  
  let rowData = document.querySelector(".rowData");
  
  const box = `
  <div class="col-md-4">
  <img src="${mealDetails.strMealThumb}" class="w-100 rounded-3" alt="">
  <p class=" fs-3 fw-bolder">${mealDetails.strCategory}</p>
  </div> 
  
  <div class="col-md-8">
  <h2>Instructions</h2>
  <p >${mealDetails.strInstructions}</p>
      <p class=" fs-4 fw-bolder">Area : ${mealDetails.strArea}</p>
      <p class=" fs-4 fw-bolder">Category : ${mealDetails.strCategory}</p>
      <p class=" fs-4 fw-bolder">Recipes :</p>
      <ul class="list-unstyled d-flex gap-2"> 
      <li class=" alert alert-info p">${mealDetails.strIngredient1}</li>
      <li class="alert alert-info p">${mealDetails.strIngredient2}</li>
      <li class="alert alert-info p">${mealDetails.strIngredient3}</li>
        <li class="alert alert-info p">${mealDetails.strIngredient4}</li>
        <li class="alert alert-info p">${mealDetails.strIngredient5}</li>
      </ul>
      <p >Tags: </p>
      <ul class="list-unstyled d-flex gap-5"> 
        <li class="alert alert-info p">${mealDetails.strTags}</li>

      </ul>
      
      <div class="d-flex gap-3">
      <a target="_blank" href="${mealDetails.strSource}" class="btn-danger btn">Source</a>
      <a target="_blank" href="${mealDetails.strYoutube}" class="btn btn-info">Youtube</a>
      </div>
    </div> 
  `;

  rowData.innerHTML = box;
}


//============================= end Home========================================



//================================= start Area ========================================

let area=[];
async function getArea(){
  let apiResponse= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list
`)
let finalRlt=await apiResponse.json()
area=finalRlt.meals
  // console.log(area);
  // displayArea()
}
getArea();

function displayArea(){
  let rowData = document.querySelector(".rowData");
  let box = "";
  
  for (let i = 0; i < area.length; i++) {
    box += `
    <div class="col-md-3 text-white text-center ">
    
    <i class="fa-solid fa-house-laptop fa-4x"></i>
    
    <h3  Area="${area[i].strArea} ">${area[i].strArea}</h3>
    
      </div>
    `;
    rowData.innerHTML=box;

}
document.querySelectorAll("h3").forEach(function(element) {
  element.addEventListener("click", function(e) {
    getAreaDetails(e.target.getAttribute("Area"));
    // console.log(getCatDetails(m[index]));
  });
});
  
}


//================================= end Area ========================================

async function getAreaDetails(index) {
  let apiResponse2 = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${index}
  `);
  let finalRlt2=  await apiResponse2.json();
  // m=finalRlt2.meals
  console.log(finalRlt2);
  displayAreaDetails(finalRlt2.meals)
}



function displayAreaDetails(v) {
let rowData = document.querySelector(".rowData");
let box = "";

for (let i = 0; i < v.length; i++) {
  box += `
    <div class="col-md-3">
      <div class="position-relative innerCol "  >
        <div class="rounded-4">
          <img src="${v[i].strMealThumb}" class="w-100"  alt="">
          <div class="layer rounded-4 position-absolute" areaId="${v[i].idMeal}" >
            <p class="ms-2 text-black text-center py-2"areaId="${v[i].idMeal}">${v[i].strMeal}</p>
          </div>
        </div>
      </div>
    </div>
  `;
}


rowData.innerHTML = box;
document.querySelectorAll(".layer").forEach(function(element) {
  element.addEventListener("click", function(e) {
    areaDetails(e.target.getAttribute("areaId"));
    // console.log(getCatDetails(m[index]));
  });
});
    



}
async function areaDetails(index) {
  let apiResponse2 = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${index}`);
  let finalRlt2 = await apiResponse2.json();

  displayAD(finalRlt2.meals)
}



function displayAD(mealDetails) {
let rowData = document.querySelector(".rowData");
let box = "";

for (let i = 0; i < mealDetails.length; i++) {
   box = `
<div class="col-md-4">
<img src="${mealDetails[i].strMealThumb}" class="w-100 rounded-3" alt="">
<p class=" fs-3 fw-bolder">${mealDetails[i].strCategory}</p>
</div> 

<div class="col-md-8">
<h2>Instructions</h2>
<p >${mealDetails[i].strInstructions}</p>
    <p class=" fs-4 fw-bolder">Area : ${mealDetails[i].strArea}</p>
    <p class=" fs-4 fw-bolder">Category : ${mealDetails[i].strCategory}</p>
    <p class=" fs-4 fw-bolder">Recipes :</p>
    <ul class="list-unstyled d-flex gap-2"> 
    <li class=" alert alert-info p">${mealDetails[i].strIngredient1}</li>
    <li class="alert alert-info p">${mealDetails[i].strIngredient2}</li>
    <li class="alert alert-info p">${mealDetails[i].strIngredient3}</li>
      <li class="alert alert-info p">${mealDetails[i].strIngredient4}</li>
      <li class="alert alert-info p">${mealDetails[i].strIngredient5}</li>
    </ul>
    <p >Tags: </p>
    <ul class="list-unstyled d-flex gap-5"> 
      <li class="alert alert-info p">${mealDetails[i].strTags}</li>

    </ul>
    
    <div class="d-flex gap-3">
    <a target="_blank" href="${mealDetails[i].strSource}" class="btn-danger btn">Source</a>
    <a target="_blank" href="${mealDetails[i].strYoutube}" class="btn btn-info">Youtube</a>
    </div>
  </div> 
`;
}

rowData.innerHTML = box;
}




//================================= start Ingredient ========================================

let  Ing=[];
async function getIngredient(){
  let apiResponse= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list

`)
  let finalRlt=await apiResponse.json()
  Ing=finalRlt.meals
  // console.log(Ing);
  // displayArea()
}
getIngredient();


function displayIngredient(){
  let rowData = document.querySelector(".rowData");
  let box = "";

  for (let i = 0; i <20; i++) {
    box += `
      <div class="col-md-3 text-white text-center  gy-1 gx-2 border border-secondary pt-3">
      
            <i class="fa-solid fa-drumstick-bite fa-4x" ></i>

              <h3 class="  " >${Ing[i].strIngredient }</h3>
              <p class="  " IngD="${Ing[i].strIngredient}">${Ing[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
            
      </div>
    `;
    rowData.innerHTML=box;
}
document.querySelectorAll(".gy-1").forEach(function(element) {
  element.addEventListener("click", function(e) {
    getIngDetails(e.target.getAttribute("IngD"));
    // console.log(getCatDetails(m[index]));
  });
});
}
//================================= end Ingredient ========================================
async function getIngDetails(index) {
  let apiResponse2 = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${index}
  `);
  let finalRlt2=  await apiResponse2.json();
  // m=finalRlt2.meals
  console.log(finalRlt2);
  displayIngDetails(finalRlt2.meals)
}



function displayIngDetails(v) {
let rowData = document.querySelector(".rowData");
let box = "";

for (let i = 0; i < v.length; i++) {
  box += `
    <div class="col-md-3">
      <div class="position-relative innerCol "  >
        <div class="rounded-4">
          <img src="${v[i].strMealThumb}" class="w-100"  alt="">
          <div class="layer rounded-4 position-absolute" ingDetails="${v[i].idMeal}" >
            <p class="ms-2 text-black text-center py-2" ingDetails="${v[i].idMeal}">${v[i].strMeal}</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

rowData.innerHTML = box;
document.querySelectorAll(".layer").forEach(function(element) {
  element.addEventListener("click", function(e) {
    IngDetails(e.target.getAttribute("ingDetails"));
    // console.log(getCatDetails(m[index]));
  });
});



}
async function IngDetails(index) {
  let apiResponse2 = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${index}`);
  let finalRlt2 = await apiResponse2.json();

  displayIngD(finalRlt2.meals)
}



function displayIngD(mealDetails) {
let rowData = document.querySelector(".rowData");
let box = "";

for (let i = 0; i < mealDetails.length; i++) {
   box = `
<div class="col-md-4">
<img src="${mealDetails[i].strMealThumb}" class="w-100 rounded-3" alt="">
<p class=" fs-3 fw-bolder">${mealDetails[i].strCategory}</p>
</div> 

<div class="col-md-8">
<h2>Instructions</h2>
<p >${mealDetails[i].strInstructions}</p>
    <p class=" fs-4 fw-bolder">Area : ${mealDetails[i].strArea}</p>
    <p class=" fs-4 fw-bolder">Category : ${mealDetails[i].strCategory}</p>
    <p class=" fs-4 fw-bolder">Recipes :</p>
    <ul class="list-unstyled d-flex gap-2"> 
    <li class=" alert alert-info p">${mealDetails[i].strIngredient1}</li>
    <li class="alert alert-info p">${mealDetails[i].strIngredient2}</li>
    <li class="alert alert-info p">${mealDetails[i].strIngredient3}</li>
      <li class="alert alert-info p">${mealDetails[i].strIngredient4}</li>
      <li class="alert alert-info p">${mealDetails[i].strIngredient5}</li>
    </ul>
    <p >Tags: </p>
    <ul class="list-unstyled d-flex gap-5"> 
      <li class="alert alert-info p">${mealDetails[i].strTags}</li>

    </ul>
    
    <div class="d-flex gap-3">
    <a target="_blank" href="${mealDetails[i].strSource}" class="btn-danger btn">Source</a>
    <a target="_blank" href="${mealDetails[i].strYoutube}" class="btn btn-info">Youtube</a>
    </div>
  </div> 
`;
}

rowData.innerHTML = box;
}









//================================= start Contacts ======================================


  function displayContact1(){
    let rowData = document.querySelector(".rowData");
    box=`
   
    <div class="row   g-4  pt-4  mt-5 ">
    <div class="col-md-6 ">

            <input type="text" name=""class="form-control" placeholder="Enter Your Name" id="Name">
            <p class="alert alertName bg-danger w-100 d-none  mt-2">Special characters and numbers not allowed</p>
    </div>
    <div class="col-md-6  ">

            <input type="text" name=""class="form-control" placeholder="Enter Your Email" id="email">
            <p class="alert alertEmail bg-danger w-100 d-none  mt-2">Email not valid *exemple@yyy.zzz </p>
    </div>
    <div class="col-md-6  ">

            <input type="tel" name=""class="form-control" placeholder="Enter Your Phone" id="phone" maxlength="11">
           <p class="alert alertPhone bg-danger w-100 d-none mt-2">Enter valid Phone Number</p>

    </div>
    <div class="col-md-6  ">

            <input type="number" name=""class="form-control w-100" placeholder="Enter Your Age" id="Age">
      <p class="alert alertAge bg-danger w-100 d-none mt-2">Enter valid age</p>
    </div>
    <div class="col-md-6  ">

            <input type="text" name=""class="form-control" placeholder="Enter Your Password" id="passWord">
            <p class="alert alertPass bg-danger w-100 d-none  mt-2">Enter valid password *Minimum eight characters, at least one letter and one number:</p>
        </div>
    <div class="col-md-6  ">

            <input type="text" name=""class="form-control" placeholder="Repassword" id="Re-password">
            <p class="alert alertRePass bg-danger d-none w-100  mt-2">Enter valid repassword</p>
    </div>
    <div class=" d-flex justify-content-center ">
        <button disabled class=" btn btn-danger mt-3" id="btn">Submit</button>
    </div>
    </div>
  
`
rowData.innerHTML=box;


let Name =document.getElementById('Name')
let passWord =document.getElementById('passWord')
let phone =document.getElementById('phone')
let rePassword =document.getElementById('Re-password')
let email =document.getElementById('email')
let Age =document.getElementById('Age')
let btn =document.getElementById('btn')

let nameRegex = /^[A-Z][a-z]{3,}$/;
function isNameValid(){
  if(nameRegex.test(Name.value)){
return true
  }else{
    return false

  }

}


let emailRegex =/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
function isEmailValid(){
  if(emailRegex.test(email.value)){
return true
  }else{
    return false

  }

}
let passwordRegex =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
function isPassValid(){
  if(passwordRegex.test(passWord.value)){
return true
  }else{
    return false

  }

}
let rePasswordRegex =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
function isRePassValid(){
  if(rePasswordRegex.test(rePassword.value)){
return true
  }else{
    return false

  }

}
let phoneRegex =/^(002)?01[0125][0-9]{8}$/;
function isPhoneValid(){
  if(phoneRegex.test(phone.value)){
return true
  }else{
    return false

  }

}
let AgeRegex= /^(?!0)\d+(?:[.,]\d+)*$/;
function isAgeValid(){
  if(AgeRegex.test(Age.value)){
return true
  }else{
    return false

  }

}
Name.addEventListener('keyup',function(){
  if(isNameValid()) {
    document.querySelector(".alertName").classList.add("d-none")
}else{
  document.querySelector(".alertName").classList.replace("d-none","d-block")
}


});
email.addEventListener('keyup',function(){
  if(isEmailValid()) {
    document.querySelector(".alertEmail").classList.add("d-none")
}else{
  document.querySelector(".alertEmail").classList.replace("d-none","d-block")
}


});
phone.addEventListener('keyup',function(){
  if(isPhoneValid()) {
    document.querySelector(".alertPhone").classList.add("d-none")
}else{
  document.querySelector(".alertPhone").classList.replace("d-none","d-block")
}


});
passWord.addEventListener('keyup',function(){
  if(isPassValid()) {
    document.querySelector(".alertPass").classList.add("d-none")
}else{
  document.querySelector(".alertPass").classList.replace("d-none","d-block")
}


});
rePassword.addEventListener('keyup',function(){
  if(isRePassValid()) {
    if (rePassword.value === passWord.value){

      document.querySelector(".alertRePass").classList.add("d-none")
    }
}else{
  document.querySelector(".alertRePass").classList.replace("d-none","d-block")
}


});
Age.addEventListener('keyup',function(){
  if(isAgeValid()) {
    document.querySelector(".alertAge").classList.add("d-none")
}else{
  document.querySelector(".alertAge ").classList.replace("d-none","d-block")
}


});









  Name.addEventListener('keyup',function(){
  if(isNameValid()&&isEmailValid()&&isRePassValid()&&isPhoneValid()&&isAgeValid()&&isPassValid()) {
    btn.removeAttribute("disabled")
  }else{
    btn.disabled="true"
  }
})
  email.addEventListener('keyup',function(){
    if(isNameValid()&&isEmailValid()&&isRePassValid()&&isPhoneValid()&&isAgeValid()&&isPassValid()) {
      btn.removeAttribute("disabled")
    }else{
      btn.disabled="true"
    }})
  passWord.addEventListener('keyup',function(){
    if(isNameValid()&&isEmailValid()&&isRePassValid()&&isPhoneValid()&&isAgeValid()&&isPassValid()) {
      btn.removeAttribute("disabled")
    }else{
      btn.disabled="true"
    }})
 rePassword.addEventListener('keyup',function(){
  if(isNameValid()&&isEmailValid()&&isRePassValid()&&isPhoneValid()&&isAgeValid()&&isPassValid()) {
    if (rePassword.value === passWord.value){
    btn.removeAttribute("disabled")
  }}else{
    btn.disabled="true"
  }})
 phone.addEventListener('keyup',function(){
  if(isNameValid()&&isEmailValid()&&isRePassValid()&&isPhoneValid()&&isAgeValid()&&isPassValid()) {
    btn.removeAttribute("disabled")
  }else{
    btn.disabled="true"
  }})
Age.addEventListener('keyup',function(){
  if(isNameValid()&&isEmailValid()&&isRePassValid()&&isPhoneValid()&&isAgeValid()&&isPassValid()) {
    btn.removeAttribute("disabled")
  }else{
    btn.disabled="true"
  }})
  }




  document.getElementById("ContactUs").addEventListener("click",function(){
    $(".inputs").css("display","none")
    displayContact1();
    sideClose.classList.replace("d-block","d-none")
    sideOpen.classList.replace("d-none","d-block")
    $(".sideBar").animate({left:-sideBarWidth},500)
    // console.log(displayContact());
    })



    //================================= end Contacts ========================================

  });

// firebase initalizations

  const dataBase = firebase.firestore();
  const settings = { timestampsInSnapshots: true};
  dataBase.settings(settings);



//  getting all variables (example:- buttons, input Fields)

const userId = document.querySelector("#exampleInputUserId");
const userName = document.querySelector("#exampleInputUserName");
const userAge = document.querySelector("#exampleInputUserAge");
const userCollegeName = document.querySelector("#exampleInputUserCollageName");
const userLikes = document.querySelector("#exampleInputUserLikes");
const spinner = document.querySelector(".spinner-border")
const submit = document.querySelector('.submit');
const update = document.querySelector(".update");
//==========================================================================



//  form input Listeners

userId.addEventListener('blur',function(){
    const id = new checkValidity('checkId',userId,"id")
})

userName.addEventListener('blur',function(){
    const name = new checkValidity('checkName',userName ,'name')
})

userAge.addEventListener('blur',function(){
    const age = new checkValidity('checkAge',userAge,'age')
})

userCollegeName.addEventListener('blur',function(){
    const collegeName = new checkValidity('checkCollege',userCollegeName,'collegename')
})

userLikes.addEventListener('blur',function(){
    const age = new checkValidity('CheckLikes',userLikes,'likes')
})

// validation constructors 

function checkValidity(data,data1,title){
const display = document.querySelector(`.${data}`);
//  console.log(data1.value)
if(data1.value === ''){
       console.warn(`${title} is not entered`);
       display.style.color = 'red';
       display.style.display = 'block';
       }
setInterval(function(){
   display.style.display = 'none';
},1400)
}
//==================================================================================================


// for sending Data process

function firebaseSend(id,name,age,college,like){
    this.userId = id;
    this.userName = name;
    this.userAge = age;
    this.userCollegeName  = college;
    this.date  = new Date();
    this.userLikes = like;
}

firebaseSend.prototype.createUi = function(){
    const ui = document.querySelector(".list-group");
    let li = document.createElement("li");
    let span = document.createElement("span");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    span.className="badge badge-primary badge-pill";
    // li.innerText= 'hello world';
    // span.innerText= '2';
    li.appendChild(document.createTextNode("####"));
    span.appendChild(document.createTextNode("####"));
    li.appendChild(span);
    ui.appendChild(li)
    
    // console.log("element is created");
    
}
 const ui = new firebaseSend();
 ui.createUi();
// firebasee prototypes methods

firebaseSend.prototype.sendData = function(datas){
//  console.log(datas );
spinner.style.display ='block';
 dataBase.collection("users").doc(datas.userId).set({
     Name:datas.userName,
     Age : datas.userAge,
     Date:datas.date,
     Like :datas.userLikes,
     collegeName:datas.userCollegeName
 }).then(function(){
     console.log("data is submitted");
     spinner.style.display ='none';
     let head = document.querySelector(".alert");
            head.classList = 'alert alert-success'
            head.innerHTML = ` <center>Succesfully Sent</center> `
            setTimeout(function(){
                head.classList = 'alert alert-primary' ;
                head.innerHTML = ` <center> Firebase Crud Operations <a href="#">click here</a></center> `
            },1500)
        userAge.value = '';
        userName.value = '';
        userCollegeName.value = '' ;
        userAge.value = '';
        userId.value = '' ;
        userLikes.value = ''
 }).catch(function(err){
     console.log(`Error is ${err}`)
 });
}


     // submit button click Listener

    submit.addEventListener('click',dataCollected)
    function dataCollected(e){
        // console.log("submit Button is fired")
       
        if(userId.value === '' ||userName.value === '' ||userAge.value === '' ||userCollegeName.value === '' ||userLikes.value === ''){
            // alert("please fill all blocks");
            let head = document.querySelector(".alert");
            head.classList = 'alert alert-danger'
            head.innerHTML = ` <center>Please* Fill all Fields</center> `
            setTimeout(function(){
                head.classList = 'alert alert-primary' ;
                head.innerHTML = ` <center> Firebase Crud Operations <a href="#">click here</a></center> `
            },1500) 
        }
        else{
            const id =  userId.value;
            const name = userName.value;
            const age = userAge.value;
            const collegeName = userCollegeName.value; 
            const likes = userLikes.value;
            const allData = new firebaseSend(id,name,age,collegeName,likes);    // data object
            allData.sendData(allData);                                             // prototype functions
        }
        e.preventDefault();
    }

    
   //===================================================================================
    // for updating Data process
    
    // update button click Listener


    class updatefireBaseData{
        constructor(userUpdateId,userUpdatedName,userUpdatedAge,userUpdatedCollege,userUpdatedLikes){
            this.userId = userUpdateId;
            this.userName = userUpdatedName;
            this.userAge = userUpdatedAge;
            this.userCollegeName = userUpdatedCollege;
            this.userLikes = userUpdatedLikes;

        }
     
        dataCheck(datas){
            //  console.log(datas)
             let a = [];
             a.push(datas.userAge);
             a.push(datas.userLikes);
             a.push(datas.userName);
             a.push(datas.userCollegeName);

            dataBase.collection('users').doc(datas.userId).get()
              .then(function(getData){
                let p = getData.data();
                // console.log(p)
                let dataArray = [];
                dataArray.push(p.Age);
                dataArray.push(p.Like);
                dataArray.push(p.Name);
                dataArray.push(p.collegeName);
                // console.log(dataArray);
                return dataArray;
            }).then(function(dataArray){
                // console.log(dataArray);
             for(var i =0;i<=a.length;i++){
                if(a[i] !== ''){
                 dataArray[i]= a[i]
             }
            }
            let userUpdatedDate = new Date();
            // console.log(dataArray);
             dataBase.collection('users').doc(datas.userId).update({           
                            Name:dataArray[2],
                            Age : dataArray[0],
                            collegeName: dataArray[3],
                            Like :dataArray[1],
                            Date:userUpdatedDate 
                          }).then(function(){
                             spinner.style.display ='none';
                             console.log("data Updated")
                             let head = document.querySelector(".alert");
                             head.classList = 'alert alert-success'
                             head.innerHTML = ` <center>Succesfully Sent</center> `
                            setTimeout(function(){
                                head.classList = 'alert alert-primary' ;
                                head.innerHTML = ` <center> Firebase Crud Operations <a href="#">click here</a></center> `
                            },1500)
                            userAge.value = '';
                            userCollegeName.value = '' ;
                            userAge.value = '';
                            userId.value = '' ;
                            userLikes.value = ''
                          }).catch(function(err){
                            console.log(err)
                           })
     }).catch(function(err){
        console.error('Error' + err); // showing Error 
        let head = document.querySelector(".alert");
        head.classList = 'alert alert-danger'
        head.innerHTML = ` <center>Id doesn't Exist </center> `
         setTimeout(function(){
                  head.classList = 'alert alert-primary' ;
                 head.innerHTML = ` <center> Firebase Crud Operations <a href="#">click here</a></center> `
             },1500)
        spinner.style.display = 'none'
     })
  }
                
}

    update.addEventListener('click',updateData)
        function updateData(e){
            // console.log("update button is fired")

            if(userId.value === ''){
                console.warn("id is missing");
                alert("Id is missing")
            } else {
                let userUpdateId = userId.value;
                let userUpdatedName = userName.value;
                let userUpdatedAge = userAge.value;
                let userUpdatedCollege = userCollegeName.value;
                let userUpdatedLikes = userLikes.value;
                const updatedData = new updatefireBaseData(userUpdateId,userUpdatedName,userUpdatedAge,userUpdatedCollege,userUpdatedLikes);          
                updatedData.dataCheck(updatedData);
                spinner.style.display ='block';
                // console.log(updatedData)
            }
            e.preventDefault();
        }



        //   CREATING UI 


   
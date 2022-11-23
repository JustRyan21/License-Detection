var username = null;
var password = null;
var staffid = null;
var staffblock = '';
const showHome = () =>
{
    document.getElementById("home").style.display = "block";
    document.getElementById("staff").style.display = "none";
    document.getElementById("shop").style.display = "none";
    document.getElementById("registration").style.display = "none";
    document.getElementById("guest").style.display = "none";
}

const showStaff  = () =>
{
    document.getElementById("home").style.display = "none";
    document.getElementById("staff").style.display = "block";
    document.getElementById("shop").style.display = "none";
    document.getElementById("registration").style.display = "none";
    document.getElementById("guest").style.display = "none";
}

const showShop  = () =>
{
    document.getElementById("home").style.display = "none";
    document.getElementById("staff").style.display = "none";
    document.getElementById("shop").style.display = "block";
    document.getElementById("registration").style.display = "none";
    document.getElementById("guest").style.display = "none";
}

const showRegistration  = () =>
{
    document.getElementById("home").style.display = "none";
    document.getElementById("staff").style.display = "none";
    document.getElementById("shop").style.display = "none";
    document.getElementById("registration").style.display = "block";
    document.getElementById("guest").style.display = "none";
}

const showGuest  = () =>
{
    document.getElementById("home").style.display = "none";
    document.getElementById("staff").style.display = "none";
    document.getElementById("shop").style.display = "none";
    document.getElementById("registration").style.display = "none";
    document.getElementById("guest").style.display = "block";
}


function registerbutton()
{
    const username = document.querySelector(".username").value;
    const password = document.querySelector(".password").value;
    const address = document.querySelector(".address").value;
    const user = 
{
    "userName": username,
    "password": password,
    "address": address
}
    fetch('http://localhost:5000/api/Register',
    {
       headers : 
       {
          "Content-Type" : 'application/json',
       },
       method : "POST",
       body : JSON.stringify(user)
    })
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('There was a problem. Status Code: ' +
            response.status);
          alert('Missing credentials, please try again.')
          document.getElementById("userfield").value = "";
          document.getElementById("passfield").value = "";
          document.getElementById("adfield").value = "";
          return response.status;
        }
        response.text().then(function(data) {
          alert(data);
        });
        document.getElementById("userfield").value = "";
        document.getElementById("passfield").value = "";
        document.getElementById("adfield").value = "";
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
  }
  
  function commentbutton()
  {
      const comment = document.querySelector(".commentbox").value;
      const name = document.querySelector(".namebox").value;
      const commentline = 
  {
      "Comment": comment,
      "Name": name
  }
      fetch('http://localhost:5000/api/WriteComment',
      {
         headers : 
         {
            "Content-Type" : 'application/json',
         },
         method : "POST",
         body : JSON.stringify(commentline)
      })
      .then(
          function(response) {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' +
                response.status);
              return response.status;
            }
            response.text().then(function(data) {
              document.getElementById("commentiframe").src="http://localhost:5000/api/GetComments"
              console.log(data);
            });
          }
        )
        .catch(function(err) {
          console.log('Fetch Error :-S', err);
        });
    

}

function buybutton(id)
{  
    fetch('http://localhost:5000/api/PurchaseSingleItem/'+id,
    {
       headers : 
       {
          "Authorization": 'Basic '+btoa(username+":"+password),
          "Content-Type" : 'application/json',
       },
       method : "GET",
    })
    .then(
        function(response) {
          if (response.status !== 201) {
            alert('You are not logged in, please login before purchasing');
            showRegistration()
            return response.status;
          }
          response.json().then(function(data) {
            alert('Thanks '+data.userName+' for buying product '+data.productID);
            console.log(data);
          });
        }
      )
      ;
}

function logoutbutton()
{
    document.getElementById("logoutbtn").style.display = "none";
    document.getElementById("username").innerHTML = 'Guest';
    username =null;
    password =null;
}

function loginbutton()
{
    username = document.querySelector(".username").value;
    password = document.querySelector(".password").value;

const fetchpromise =
fetch('http://localhost:5000/api/GetVersionA',
{
   headers : 
   {
      "Authorization": 'Basic '+btoa(username+":"+password),
      "Content-Type" : 'application/json',
   },
   method : "GET",
})
.then(
    function(response) {
      if (response.status !== 200) {
        console.log('There was a problem. Status Code: ' +
          response.status);
        alert('Wrong login credentials, please try again.')
        document.getElementById("userfield").value = "";
        document.getElementById("passfield").value = "";
        document.getElementById("adfield").value = "";
        return response.status;
      }
      response.text().then(function(data) {
        console.log(data);
        document.getElementById("username").innerHTML = username;
        document.getElementById("logoutbtn").style.display = "block";
        document.getElementById("logoutbtn").style.display = "inline";
        alert('Login in successful,'+' welcome '+username);
      });
      document.getElementById("userfield").value = "";
      document.getElementById("passfield").value = "";
      document.getElementById("adfield").value = "";
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}

function commentbutton()
{
    const comment = document.querySelector(".commentbox").value;
    const name = document.querySelector(".namebox").value;
    const commentline = 
{
    "Comment": comment,
    "Name": name
}
    fetch('http://localhost:5000/api/WriteComment',
    {
       headers : 
       {
          "Content-Type" : 'application/json',
       },
       method : "POST",
       body : JSON.stringify(commentline)
    })
    .then(
        function(response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return response.status;
          }
          response.text().then(function(data) {
            document.getElementById("commentiframe").src="http://localhost:5000/api/GetComments"
            console.log(data);
          });
        }
      )
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
    

}

const getallstaffid =
    fetch('http://localhost:5000/api/GetAllStaff',
{
   headers : 
   {
      "Content-Type" : 'application/json',
   },
   method : "GET",
})
.then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return response.status;
      }
      response.json().then(function(data) {
        staffid = (data.map(x => x.id))+'';
        var staffsplit = staffid.split(',');
        console.log(staffsplit);
        for (let i = 0; i < staffsplit.length; i++) {
          getstaffinfo(staffsplit[i]);
        }

      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
  

function getstaffinfo(id)
{
  fetch('http://localhost:5000/api/GetCard/'+id,
  {
     headers : 
     {
        "Content-Type" : 'application/json',
     },
     method : "GET",
  })
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return response.status;
      }
      response.text().then(function(data) {
        var staffdetails = (data+'').split(/[\r\n]+/);
        console.log(staffdetails);
        staffblock += ("<br>"+"<img id = staffidphotos src="+"http://localhost:5000/api/GetStaffPhoto/"+staffdetails[4].substr(4)+">"+"<br>"+"Name: "+staffdetails[3].substr(3)+"<br>"+"Organisation: "+staffdetails[5].substr(4)+"<br>"+"Email: "+'<a href="mailto:'+staffdetails[6].substr(16)+'">'+staffdetails[6].substr(16)+'</a>'+"<br>"+"Telephone: "+'<a href="tel:'+staffdetails[7].substr(4)+'">'+staffdetails[7].substr(4)+'</a>'+"<br>"+"Link: "+"<a href=”"+staffdetails[8].substr(4)+"”>"+staffdetails[8].substr(4)+"</a>"+"<br>"+"Research: "+staffdetails[9].substr(11)+"<br>"+'<hr size="2" width="100%" color=#747474>');
      });
      document.getElementById("staffinfo").innerHTML = staffblock;
    })
}

window.onload = showHome







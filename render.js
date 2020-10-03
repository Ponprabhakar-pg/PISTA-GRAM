var datajson;

//Validating User Criteria and serving necessary webpages.
function validateUser(){
    var usr=document.getElementById('user').value;
    var pwd=document.getElementById('pwd').value;
    if(usr!="" && pwd!=""){
        if(usr=="pattarai@admin" && pwd=="admin@196"){
            setTimeout(function() {
            window.location='admin.html'
                }, 0000);
        }
        else{
            setTimeout(function() {
                window.location='other_user.html'
                    }, 0000);
        }
    }
    else{
        if(usr==""){
            alert("Enter the Username")
        }
        else{
            alert("Enter the password")
        }
    }
}//End


//start
function scrap1(){
    let xhr = new XMLHttpRequest();
    xhr.open('POST','https://elevate-be-staging.azurewebsites.net/instafeed.php',true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4 && xhr.status==200){
            datajson=JSON.parse(xhr.responseText);
            bg();
            generateAdminInfo();
            generateGridPost();        
        }
    }
    
    xhr.send();
}


function scrap2(){
    let xhr = new XMLHttpRequest();
    xhr.open('POST','https://elevate-be-staging.azurewebsites.net/instafeed.php',true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4 && xhr.status==200){
            datajson=JSON.parse(xhr.responseText);
            bg();
            generateInfo();//Generates the Account Informations
            generateGridPost();
        
        }
    }
    
    xhr.send();
}


function scrap3(){
    //Using Ajax and getting data from the given website
    let xhr = new XMLHttpRequest();
    xhr.open('POST','https://elevate-be-staging.azurewebsites.net/instafeed.php',true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4 && xhr.status==200){
            datajson=JSON.parse(xhr.responseText);
            bg();
            generateSavedInfo();//Generates the Account Informations
            generateSavedGridPost();
            console.log(datajson)
        }
    }
    
    xhr.send();
}//End

//Function for displaying page info based on user criteria
function generateInfo(){
    document.getElementById("co1").innerHTML+="<center><img src="+datajson.graphql.user.profile_pic_url+" style='border-radius: 75px; width: 150px; height: 150px;'><br><h3>Username: "+datajson.graphql.user.username+"</h3><br><h4>"+datajson.graphql.user.biography+"</h4><br><h3>Full Name: "+datajson.graphql.user.full_name+"</h3><hr><h3>Followers: "+datajson.graphql.user.edge_followed_by.count+"&nbsp&nbsp&nbsp&nbsp Following: "+datajson.graphql.user.edge_follow.count+"</h3><br><a class='btn btn-primary disabled' href='saved.html' role='button'>Saved Media</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a class='btn btn-primary' href='login.html' role='button'>Log Out</a></center>"
}


function generateAdminInfo(){
    document.getElementById("co1").innerHTML+="<center><img src="+datajson.graphql.user.profile_pic_url+" style='border-radius: 75px; width: 150px; height: 150px;'><br><h3>Username: "+datajson.graphql.user.username+"</h3><br><h4>"+datajson.graphql.user.biography+"</h4><br><h3>Full Name: "+datajson.graphql.user.full_name+"</h3><hr><h3>Followers: "+datajson.graphql.user.edge_followed_by.count+"&nbsp&nbsp&nbsp&nbsp Following: "+datajson.graphql.user.edge_follow.count+"</h3><br><a class='btn btn-primary' href='saved.html' role='button'>Saved Media</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a class='btn btn-primary' href='login.html' role='button'>Log Out</a></center>"
}

function generateSavedInfo(){
    document.getElementById("co1").innerHTML+="<center><img src="+datajson.graphql.user.profile_pic_url+" style='border-radius: 75px; width: 150px; height: 150px;'><br><h3>Username: "+datajson.graphql.user.username+"</h3><br><h4>"+datajson.graphql.user.biography+"</h4><br><h3>Full Name: "+datajson.graphql.user.full_name+"</h3><hr><h3>Followers: "+datajson.graphql.user.edge_followed_by.count+"&nbsp&nbsp&nbsp&nbsp Following: "+datajson.graphql.user.edge_follow.count+"</h3><br><a class='btn btn-primary' href='admin.html' role='button' >Back To Profile</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a class='btn btn-primary' href='login.html' role='button'>Log Out</a></center>"
}//End

//Functions for displaying Posts posted by the Admin
function generateGridPost(){
    var num_post=Object.keys(datajson.graphql.user.edge_owner_to_timeline_media.edges).length;
    console.log(num_post)
    var k=0;
    var r="row";
    var c="col";
    let ig = new XMLHttpRequest();
    document.getElementById("con2").innerHTML="<div>"
    for(var i=0;i<num_post;i=i+2){
        var cls=r+(i+1).toString();
        console.log(cls)
        console.log(typeof(cls))
        document.getElementById("con2").innerHTML+="<div class='row' id="+cls+">"
        var tstamp = datajson.graphql.user.edge_owner_to_timeline_media.edges[k].node.taken_at_timestamp;
        var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var date = new Date(tstamp*1000);
        var year = date.getFullYear();
        var month = months_arr[date.getMonth()];
        var day = date.getDate();
        // Display date time in dd-MM-yyyy h:m:s format
        var period = day+'-'+month+'-'+year;
        for(var j=0;j<2;j++){
            var des=(datajson.graphql.user.edge_owner_to_timeline_media.edges[k].node.edge_media_to_caption.edges[0].node.text).substring(0,150);
            var img=datajson.graphql.user.edge_owner_to_timeline_media.edges[k].node.display_url
            ig.open('GET',img,false);
            ig.onreadystatechange = function(){
                if(ig.status==200){
                    document.getElementById(cls).innerHTML+="<div class='col' id='col'"+j+" ><div class='container' style='background-color: rgb(255, 255, 255); text-align: left; border-radius: 25px; height: 150px;width: 520px;display: flex;&__image {margin: 20px 30px 0 0;width: 200px;object-fit: contain;align-self: flex-start;}&__text {flex: 1 1 auto;}}'><img src="+ img+" style='height: 150px;width: 200px; border-radius: 25px;'><span style='padding-left: 10px; padding-top: 5px; padding-bottom: 5px; padding-right:10px;'><span style='color: red;'>"+period+"</span><br>"+des+"...."+"</span></div><br></div>"
                    console.log(img)
                }
                else if(ig.status==403){
                    document.getElementById(cls).innerHTML+="<div class='col' id='col'"+j+"><div class='container' style='background-color: rgb(255, 255, 255); text-align: left; border-radius: 25px; height: 150px;width: 520px;display: flex;&__image {margin: 20px 30px 0 0;width: 200px;object-fit: contain;align-self: flex-start;}&__text {flex: 1 1 auto;}}'><iframe height=' 150px' width= '200px' src="+img+" type='video/mp4' style='border-radius: 25px;'></iframe><span style='padding-left: 10px; padding-top: 5px; padding-bottom: 5px; padding-right:10px;'><span style='color: red;'>"+period+"</span><br>"+des+"...."+"</span></div><br></div><br>"
                }
            }
            ig.send();
           k++;
        }
        document.getElementById("con2").innerHTML+="</div><br><br><br>"
    }
    document.getElementById("con2").innerHTML+="</div>"
}


function generateCardPost(){
    var num_post=Object.keys(datajson.graphql.user.edge_owner_to_timeline_media.edges).length;
    
    var k=0;
    var r="row";
    let ig = new XMLHttpRequest();
    document.getElementById("con2").innerHTML="<div>"
    for(var i=0;i<num_post;i++){
        var cls=r+(i+1).toString();
        var tstamp = datajson.graphql.user.edge_owner_to_timeline_media.edges[i].node.taken_at_timestamp;
        var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var date = new Date(tstamp*1000);
        var year = date.getFullYear();
        var month = months_arr[date.getMonth()];
        var day = date.getDate();
        // Display date time in dd-MM-yyyy h:m:s format
        var period = day+'-'+month+'-'+year;
        
        document.getElementById("con2").innerHTML+="<div class='row' style='padding-left: 300px' id="+cls+">"
            var des=(datajson.graphql.user.edge_owner_to_timeline_media.edges[i].node.edge_media_to_caption.edges[0].node.text);
            var img=datajson.graphql.user.edge_owner_to_timeline_media.edges[i].node.display_url
            ig.open('GET',img,false);
            ig.onreadystatechange = function(){
                if(ig.status==200){
                    document.getElementById(cls).innerHTML+="<div class='card' style='width: 38rem;'><div class='card-header' ><b><h4><img src="+datajson.graphql.user.profile_pic_url+ " style='border-radius: 23px; width: 50px; height: 50px;'> "+datajson.graphql.user.username+"<br></b></h4><img src="+img+" class='card-img-top' ><div class='card-body'><p class='card-text'>"+des+"<br><span style='color: red;'>"+period+"</span></p></div></div></div><hr>"
                }
                else if(ig.status==403){
                    document.getElementById(cls).innerHTML+="<div class='card' style='width: 38rem;'><div class='card-header' ><b><h4><img src="+datajson.graphql.user.profile_pic_url+ " style='border-radius: 23px; width: 50px; height: 50px;'> "+datajson.graphql.user.username+"<br></b></h4><iframe class='card-img-top' src="+img+" type='video/mp4'></iframe><div class='card-body'><p class='card-text'>"+des+"<br><span style='color: red;'>"+period+"</span></p></div></div></div><hr>"
                }
            }
            ig.send();
           k++;
        document.getElementById("con2").innerHTML+="</div><br><br><br>"
    }
    document.getElementById("con2").innerHTML+="</div>"
}

function generateContPost(){
    var num_post=Object.keys(datajson.graphql.user.edge_owner_to_timeline_media.edges).length;
    
    var k=0;
    var r="row";
    var c="col";
    var i=0;
    var des=(datajson.graphql.user.edge_owner_to_timeline_media.edges[i].node.edge_media_to_caption.edges[0].node.text);
    var img=datajson.graphql.user.edge_owner_to_timeline_media.edges[i].node.display_url
    var cls="crd"
    let ig = new XMLHttpRequest();
    var tstamp = datajson.graphql.user.edge_owner_to_timeline_media.edges[i].node.taken_at_timestamp;
    var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var date = new Date(tstamp*1000);
    var year = date.getFullYear();
    var month = months_arr[date.getMonth()];
    var day = date.getDate();
    // Display date time in dd-MM-yyyy h:m:s format
    var period = day+'-'+month+'-'+year;
    document.getElementById("con2").innerHTML='<div id="carouselExampleControls" class="carousel slide" data-ride="carousel"><div class="carousel-inner" id='+cls+'>'
    document.getElementById(cls).innerHTML+="<div class='carousel-item active'><div class='card' ><h3 class='card-title' ><center><b><img src="+datajson.graphql.user.profile_pic_url+ " style='border-radius: 25px; width: 50px; height: 50px;'> "+datajson.graphql.user.username+"<br></b></center></h3><img src="+img+" class='card-img-top' ><div class='card-body'><p class='card-text'><h4><span style='color: red;'>"+period+"</span></h4><br>"+des+"</p></div></div></div>"

    for(i=1;i<num_post-1;i++){
        //var cls=r+(i+1).toString();
        
        //document.getElementById("con2").innerHTML+="<div class='row' id="+cls+">"
        
            des=(datajson.graphql.user.edge_owner_to_timeline_media.edges[i].node.edge_media_to_caption.edges[0].node.text);
            img=datajson.graphql.user.edge_owner_to_timeline_media.edges[i].node.display_url;
            tstamp = datajson.graphql.user.edge_owner_to_timeline_media.edges[i].node.taken_at_timestamp;
            date = new Date(tstamp*1000);
            year = date.getFullYear();
            month = months_arr[date.getMonth()];
            day = date.getDate();
            period = day+'-'+month+'-'+year;
            ig.open('GET',img,false);
            ig.onreadystatechange = function(){
                if(ig.status==200){
                    document.getElementById(cls).innerHTML+="<div class='carousel-item'><div class='card'><h3 class='card-title' ><center><b><img src="+datajson.graphql.user.profile_pic_url+ " style='border-radius: 25px; width: 50px; height: 50px;'> "+datajson.graphql.user.username+"<br></b></center></h3><img src="+img+" class='card-img-top' ><div class='card-body'><p class='card-text'><h4><span style='color: red;'>"+period+"</span></h4><br>"+des+"</p></div></div></div>"
                    //document.getElementById(cls).innerHTML+="<div class='container' id='col'"+i+"><div class='container' style='height: 150px;width: 520px;display: flex;&__image {margin: 20px 30px 0 0;width: 200px;object-fit: contain;align-self: flex-start;}&__text {flex: 1 1 auto;}}'><img src="+ img+" style='height: 150px;width: 200px'>"+des+"...."+"</div></div>"
                    //console.log(datajson.graphql.user.edge_owner_to_timeline_media.edges[k].node.edge_media_to_caption.edges[0].node.text)
                }
                else if(ig.status==403){
                    document.getElementById(cls).innerHTML+="<div class='carousel-item'><div class='card'><h3 class='card-title' ><center><b><img src="+datajson.graphql.user.profile_pic_url+ " style='border-radius: 25px; width: 50px; height: 50px;'> "+datajson.graphql.user.username+"<br></b></center></h3><iframe class='card-img-top' src="+img+" type='video/mp4'></iframe><div class='card-body'><p class='card-text'><h4><span style='color: red;'>"+period+"</span></h4><br>"+des+"</p></div></div></div>"
                    //document.getElementById(cls).innerHTML+="<div class='container' id='col'"+i+"><div class='container' style='height: 150px;width: 520px;display: flex;&__image {margin: 20px 30px 0 0;width: 200px;object-fit: contain;align-self: flex-start;}&__text {flex: 1 1 auto;}}'><iframe height=' 150px' width= '200px' src="+img+" type='video/mp4'></iframe>"+des+"...."+"</div></div>"
                }
            }
            ig.send();
           k++;
        //document.getElementById("con2").innerHTML+="</div><br><br><br>"
    }
    document.getElementById(cls).innerHTML+='</div><a class="carousel-control-prev" href="#carouselExampleControls" role="button" style="background-color: rgb(247, 245, 245) transparent;" data-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></a></div>'
}//End


//Functions for displaying Saved Media
function generateSavedCardPost(){
    var num_post=Object.keys(datajson.graphql.user.edge_saved_media.edges).length;
    
    var k=0;
    var r="row";
    var c="col";
    let ig = new XMLHttpRequest();
    document.getElementById("con2").innerHTML="<div>"
    for(var i=0;i<num_post;i++){
        var cls=r+(i+1).toString();
        var tstamp = datajson.graphql.user.edge_saved_media.edges[i].node.taken_at_timestamp;
        var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var date = new Date(tstamp*1000);
        var year = date.getFullYear();
        var month = months_arr[date.getMonth()];
        var day = date.getDate();
        var period = day+'-'+month+'-'+year;
        
        document.getElementById("con2").innerHTML+="<div class='row' style='padding-left: 300px' id="+cls+">"
        
            var des=(datajson.graphql.user.edge_saved_media.edges[i].node.edge_media_to_caption.edges[0].node.text);
            var img=datajson.graphql.user.edge_saved_media.edges[i].node.display_url
            ig.open('GET',img,false);
            ig.onreadystatechange = function(){
                if(ig.status==200){
                    document.getElementById(cls).innerHTML+="<div class='card' style='width: 38rem;'><div class='card-header' ><b><h4><img src="+datajson.graphql.user.profile_pic_url+ " style='border-radius: 23px; width: 50px; height: 50px;'> "+datajson.graphql.user.username+"<br></b></h4><img src="+img+" class='card-img-top' ><div class='card-body'><p class='card-text'>"+des+"<br><span style='color: red;'>"+period+"</span></p></div></div></div><hr>"
                }
                else if(ig.status==403){
                    document.getElementById(cls).innerHTML+="<div class='card' style='width: 38rem;'><div class='card-header' ><b><h4><img src="+datajson.graphql.user.profile_pic_url+ " style='border-radius: 23px; width: 50px; height: 50px;'> "+datajson.graphql.user.username+"<br></b></h4><iframe class='card-img-top' src="+img+" type='video/mp4'></iframe><div class='card-body'><p class='card-text'>"+des+"<br><span style='color: red;'>"+period+"</span></p></div></div></div><hr>"
                }
            }
            ig.send();
           k++;
        document.getElementById("con2").innerHTML+="</div><br><br><br>"
    }
    document.getElementById("con2").innerHTML+="</div>"
}

function generateSavedGridPost(){
    var num_post=Object.keys(datajson.graphql.user.edge_saved_media.edges).length;
    console.log(num_post)
    var k=0;
    var r="row";
    var c="col";
    let ig = new XMLHttpRequest();
    document.getElementById("con2").innerHTML="<div>"
    for(var i=0;i<num_post;i=i+2){
        var cls=r+(i+1).toString();
        console.log(cls)
        console.log(typeof(cls))
        document.getElementById("con2").innerHTML+="<div class='row' id="+cls+">"
        var tstamp = datajson.graphql.user.edge_saved_media.edges[k].node.taken_at_timestamp;
        var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var date = new Date(tstamp*1000);
        var year = date.getFullYear();
        var month = months_arr[date.getMonth()];
        var day = date.getDate();
        var period = day+'-'+month+'-'+year;
        for(var j=0;j<2;j++){
            var des=(datajson.graphql.user.edge_saved_media.edges[k].node.edge_media_to_caption.edges[0].node.text).substring(0,110);
            var img=datajson.graphql.user.edge_saved_media.edges[k].node.display_url
            ig.open('GET',img,false);
            ig.onreadystatechange = function(){
                if(ig.status==200){
                    document.getElementById(cls).innerHTML+="<div class='col' id='col'"+j+" ><div class='container' style='background-color: rgb(255, 255, 255); text-align: left; border-radius: 25px; height: 150px;width: 520px;display: flex;&__image {margin: 20px 30px 0 0;width: 200px;object-fit: contain;align-self: flex-start;}&__text {flex: 1 1 auto;}}'><img src="+ img+" style='height: 150px;width: 200px; border-radius: 25px;'><span style='padding-left: 10px; padding-top: 5px; padding-bottom: 5px; padding-right:10px;'><span style='color: red;'>"+period+"</span><br>"+des+"...."+"</span></div><br></div>"
                }
                else if(ig.status==403){
                    document.getElementById(cls).innerHTML+="<div class='col' id='col'"+j+"><div class='container' style='background-color: rgb(255, 255, 255); text-align: left; border-radius: 25px; height: 150px;width: 520px;display: flex;&__image {margin: 20px 30px 0 0;width: 200px;object-fit: contain;align-self: flex-start;}&__text {flex: 1 1 auto;}}'><iframe height=' 150px' width= '200px' src="+img+" type='video/mp4' style='border-radius: 25px;'></iframe><span style='padding-left: 10px; padding-top: 5px; padding-bottom: 5px; padding-right:10px;'><span style='color: red;'>"+period+"</span><br>"+des+"...."+"</span></div><br></div><br>"
                }
            }
            ig.send();
           k++;
        }
        document.getElementById("con2").innerHTML+="</div><br><br><br>"
    }
    document.getElementById("con2").innerHTML+="</div>"
}


function generateSavedContPost(){
    var num_post=Object.keys(datajson.graphql.user.edge_saved_media.edges).length;
    var k=0;
    var r="row";
    var c="col";
    var i=0;
    var des=(datajson.graphql.user.edge_saved_media.edges[i].node.edge_media_to_caption.edges[0].node.text);
    var img=datajson.graphql.user.edge_saved_media.edges[i].node.display_url
    var cls="crd"
    let ig = new XMLHttpRequest();
    var tstamp = datajson.graphql.user.edge_saved_media.edges[i].node.taken_at_timestamp;
    var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var date = new Date(tstamp*1000);
    var year = date.getFullYear();
    var month = months_arr[date.getMonth()];
    var day = date.getDate();
    // Display date time in dd-MM-yyyy h:m:s format
    var period = day+'-'+month+'-'+year;
    document.getElementById("con2").innerHTML='<div id="carouselExampleControls" class="carousel slide" data-ride="carousel"><div class="carousel-inner" id='+cls+'>'
    document.getElementById(cls).innerHTML+="<div class='carousel-item active'><div class='card' ><h3 class='card-title' ><center><b><img src="+datajson.graphql.user.profile_pic_url+ " style='border-radius: 25px; width: 50px; height: 50px;'> "+datajson.graphql.user.username+"<br></b></center></h3><img src="+img+" class='card-img-top' ><div class='card-body'><p class='card-text'><h4><span style='color: red;'>"+period+"</span></h4><br>"+des+"</p></div></div></div>"

    for(i=1;i<num_post-1;i++){
        des=(datajson.graphql.user.edge_saved_media.edges[i].node.edge_media_to_caption.edges[0].node.text);
        img=datajson.graphql.user.edge_saved_media.edges[i].node.display_url;
        tstamp = datajson.graphql.user.edge_saved_media.edges[i].node.taken_at_timestamp;
        date = new Date(tstamp*1000);
        year = date.getFullYear();
        month = months_arr[date.getMonth()];
        day = date.getDate();
        period = day+'-'+month+'-'+year;
        ig.open('GET',img,false);
        ig.onreadystatechange = function(){
            if(ig.status==200){
                document.getElementById(cls).innerHTML+="<div class='carousel-item'><div class='card'><h3 class='card-title' ><center><b><img src="+datajson.graphql.user.profile_pic_url+ " style='border-radius: 25px; width: 50px; height: 50px;'> "+datajson.graphql.user.username+"<br></b></center></h3><img src="+img+" class='card-img-top' ><div class='card-body'><p class='card-text'><h4><span style='color: red;'>"+period+"</span></h4><br>"+des+"</p></div></div></div>"
            }
            else if(ig.status==403){
                document.getElementById(cls).innerHTML+="<div class='carousel-item'><div class='card'><h3 class='card-title' ><center><b><img src="+datajson.graphql.user.profile_pic_url+ " style='border-radius: 25px; width: 50px; height: 50px;'> "+datajson.graphql.user.username+"<br></b></center></h3><iframe class='card-img-top' src="+img+" type='video/mp4'></iframe><div class='card-body'><p class='card-text'><h4><span style='color: red;'>"+period+"</span></h4><br>"+des+"</p></div></div></div>"
            }
        }
        ig.send();
        k++;
    }
    document.getElementById(cls).innerHTML+='</div><a class="carousel-control-prev" href="#carouselExampleControls" role="button" style="background-color: rgb(247, 245, 245) transparent;" data-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></a></div>'
}
//End



//Function for Canvas
function bg(){
    const STAR_COUNT = ( window.innerWidth + window.innerHeight ) / 8,
      STAR_SIZE = 3,
      STAR_MIN_SCALE = 0.2,
      OVERFLOW_THRESHOLD = 50;

    const canvas = document.querySelector( 'canvas' ),
        context = canvas.getContext( '2d' );

    let scale = 1, // device pixel ratio
        width,
        height;

    let stars = [];

    let pointerX,
        pointerY;

    let velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0005 };

    let touchInput = false;

    generate();
    resize();
    step();

    window.onresize = resize;
    canvas.onmousemove = onMouseMove;
    canvas.ontouchmove = onTouchMove;
    canvas.ontouchend = onMouseLeave;
    document.onmouseleave = onMouseLeave;

    function generate() {

    for( let i = 0; i < STAR_COUNT; i++ ) {
        stars.push({
        x: 0,
        y: 0,
        z: STAR_MIN_SCALE + Math.random() * ( 1 - STAR_MIN_SCALE )
        });
    }

    }

    function placeStar( star ) {

    star.x = Math.random() * width;
    star.y = Math.random() * height;

    }

    function recycleStar( star ) {

    let direction = 'z';

    let vx = Math.abs( velocity.x ),
            vy = Math.abs( velocity.y );

    if( vx > 1 || vy > 1 ) {
        let axis;

        if( vx > vy ) {
        axis = Math.random() < vx / ( vx + vy ) ? 'h' : 'v';
        }
        else {
        axis = Math.random() < vy / ( vx + vy ) ? 'v' : 'h';
        }

        if( axis === 'h' ) {
        direction = velocity.x > 0 ? 'l' : 'r';
        }
        else {
        direction = velocity.y > 0 ? 't' : 'b';
        }
    }
    
    star.z = STAR_MIN_SCALE + Math.random() * ( 1 - STAR_MIN_SCALE );

    if( direction === 'z' ) {
        star.z = 0.1;
        star.x = Math.random() * width;
        star.y = Math.random() * height;
    }
    else if( direction === 'l' ) {
        star.x = -OVERFLOW_THRESHOLD;
        star.y = height * Math.random();
    }
    else if( direction === 'r' ) {
        star.x = width + OVERFLOW_THRESHOLD;
        star.y = height * Math.random();
    }
    else if( direction === 't' ) {
        star.x = width * Math.random();
        star.y = -OVERFLOW_THRESHOLD;
    }
    else if( direction === 'b' ) {
        star.x = width * Math.random();
        star.y = height + OVERFLOW_THRESHOLD;
    }

    }

    function resize() {

    scale = window.devicePixelRatio || 1;

    width = window.innerWidth * scale;
    height = window.innerHeight * scale;

    canvas.width = width;
    canvas.height = height;

    stars.forEach( placeStar );

    }

    function step() {

    context.clearRect( 0, 0, width, height );

    update();
    render();

    requestAnimationFrame( step );

    }

    function update() {

    velocity.tx *= 0.96;
    velocity.ty *= 0.96;

    velocity.x += ( velocity.tx - velocity.x ) * 0.8;
    velocity.y += ( velocity.ty - velocity.y ) * 0.8;

    stars.forEach( ( star ) => {

        star.x += velocity.x * star.z;
        star.y += velocity.y * star.z;

        star.x += ( star.x - width/2 ) * velocity.z * star.z;
        star.y += ( star.y - height/2 ) * velocity.z * star.z;
        star.z += velocity.z;
    
        // recycle when out of bounds
        if( star.x < -OVERFLOW_THRESHOLD || star.x > width + OVERFLOW_THRESHOLD || star.y < -OVERFLOW_THRESHOLD || star.y > height + OVERFLOW_THRESHOLD ) {
        recycleStar( star );
        }

    } );

    }

    function render() {

    stars.forEach( ( star ) => {

        context.beginPath();
        context.lineCap = 'square';
        context.lineWidth = STAR_SIZE * star.z * scale;
        context.strokeStyle = 'rgba(255, 7, 7,'+(0.5 + 0.5*Math.random())+')';

        context.beginPath();
        context.moveTo( star.x, star.y );

        var tailX = velocity.x * 2,
            tailY = velocity.y * 2;

        // stroke() wont work on an invisible line
        if( Math.abs( tailX ) < 0.1 ) tailX = 0.5;
        if( Math.abs( tailY ) < 0.1 ) tailY = 0.5;

        context.lineTo( star.x + tailX, star.y + tailY );

        context.stroke();

    } );

    }

    function movePointer( x, y ) {

    if( typeof pointerX === 'number' && typeof pointerY === 'number' ) {

        let ox = x - pointerX,
            oy = y - pointerY;

        velocity.tx = velocity.tx + ( ox / 8*scale ) * ( touchInput ? 1 : -1 );
        velocity.ty = velocity.ty + ( oy / 8*scale ) * ( touchInput ? 1 : -1 );

    }

    pointerX = x;
    pointerY = y;

    }

    function onMouseMove( event ) {

    touchInput = false;

    movePointer( event.clientX, event.clientY );

    }

    function onTouchMove( event ) {

    touchInput = true;

    movePointer( event.touches[0].clientX, event.touches[0].clientY, true );

    event.preventDefault();

    }

    function onMouseLeave() {

    pointerX = null;
    pointerY = null;

    }

}

// Variables

var playing = 0;
setInterval(() => {getData()}, 5000);
setInterval(() => {songHistory()}, 5000);
getData();
songHistory();
let audio = new Audio("https://live.repeat.pw");



$(document).on('click', '[target="modal"]', function(openmodal) {
  openmodal.preventDefault();

  $(".modal").remove()
  $(".navbar").attr("style", "")
  $("body").removeClass("modal-open")
  $("body").attr("style", "")
  $(".modal-backdrop").remove()
  $("#modal" + $(this).attr('id')).remove();

  modal = $('<div class="modal" style="display: block!important;"></div>');
  $('body').append(modal);
  url = "__modals__/" + $(this).attr('href');
  modal.load(url);
});

$('body').click(function (event) 
{
   if(!$(event.target).closest('.modal-dialogue').length && !$(event.target).is('.modal-dialogue')) {
     $(".modal").remove();
   }     
});

function getData() {
    fetch('https://c.veth1.cc/staff.repeatradio.net/_api/nowPlaying', {})
    .then((result) => result.json())
    .then((result) => {
      var meta = result.song.artist + result.song.title;
      var date = new Date();  
        $(".name").html(result.onAir.name);
        $(".listeners").html('<i class="fas fa-headphones-alt"></i> ' + result.listeners + '');
        if (screen.width < 910) {
          if (meta.length >= 10) {
            $(".metadata").text(result.song.title + " - " + result.song.artist);
            $(".data").text("");
            
          } else {
            $(".metadata").text("");
            $(".data").text(result.song.title + " - " + result.song.artist);
          }
        } else {
        if (meta.length >= 30) {
          $(".metadata").text(result.song.title + " - " + result.song.artist);
          $(".data").text("");
          
        } else {
          $(".metadata").text("");
          $(".data").text(result.song.title + " - " + result.song.artist);
        }}
        
        $(".stats img:not(.dj)").attr("src", result.song.cover);
        $(".recent .backdrop").attr("src", result.song.cover);
    })
    fetch('https://c.veth1.cc/staff.repeatradio.net/_api/upNext', {})
    .then((result) => result.json())
    .then((time) => {
      $("#1 p").html(time[0].slot.name);
      $("#1 img").attr("src", time[0].slot.avatar);
      $(".tt-bd").attr("src", time[0].slot.avatar);
      //
      $("#2 p").html(time[1].slot.name);
      $("#2 img").attr("src", time[1].slot.avatar);
      //
      $("#3 p").html(time[2].slot.name);
      $("#3 img").attr("src", time[2].slot.avatar);

    })
  }

  $(".toggle").click(toggleRadio)
  function toggleRadio(){
    if(playing == 0){
        $("#audio").attr("src", "https://live.repeat.pw")
        $(".toggle").attr("class", "fas fa-circle-notch fa-spin toggle")
        $("#audio")[0].play().then(function () {
            $(".toggle").attr("class", "fas toggle fa-pause")
            playing = 1
        })
    }else{
        playing = 0
        $("#audio").attr("src", "")
        $("#audio")[0].pause()
        $(".toggle").attr("class", "fas toggle fa-play")
    }
}


   function songHistory() {
    $.ajax({
      url: "https://c.veth1.cc/staff.repeatradio.net/_api/songHistory?limit=5",
      method: "GET",
      dataType: "JSON",

      success: function(data) {
        obj = JSON.parse(JSON.stringify(data));

        if (obj.response == true) {
          $("#t1").text(obj.song[0].track);
          $("#t2").text(obj.song[1].track);
          $("#t3").text(obj.song[2].track);
          $("#t4").text(obj.song[3].track);
          $("#a1").text(obj.song[0].artist);
          $("#a2").text(obj.song[1].artist);
          $("#a3").text(obj.song[2].artist);
          $("#a4").text(obj.song[3].artist);
          $("#art1").attr("src", obj.song[0].cover);
          $("#art2").attr("src", obj.song[1].cover);
          $("#art3").attr("src", obj.song[2].cover);
          $("#art4").attr("src", obj.song[3].cover);
        }else {
          alert(obj.error)
        }
      }
    })
   }


function changeVolume(amount) {
    var a = document.getElementsByTagName("audio")[0];
    a.volume = amount;
}


var modal = document.getElementById("requestModal");
var btn = document.getElementById("openRequestModal");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
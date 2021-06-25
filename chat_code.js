roomid = localStorage.getItem('whichredirect')
usernamesa = localStorage.getItem('User name')
console.log(roomid)
console.log(usernamesa)

function getData() {
  firebase.database().ref("/" + roomid).on('value', function (snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      childData = childSnapshot.val();
      if (childKey != "purpose") {
        firebase_message_id = childKey;
        message_data = childData;
        //Start code
        console.log(firebase_message_id);
        console.log(message_data);
        name = message_data['name'];
        message = message_data['message'];
        like = message_data['like'];
        name_with_tag = "<h4> " + name + "<img class='user_tick' src='tick.png'></h4>";
        message_with_tag = "<h4 class='message_h4' style='word-break: break-all;'>" + message + "</h4>";
        like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";

        row = name_with_tag + message_with_tag + like_button + span_with_tag;
        document.getElementById("output").innerHTML += row;
        window.scrollTo(0, document.body.scrollHeight);
        document.getElementById('ting12').play();
        //End code
      }
    });
  });
}
getData();

function send() {
  messageval = document.getElementById('msg').value;
  if (messageval != "") {
    console.log('Nop !!!')
    document.getElementById('msg').value = "";
    firebase.database().ref(roomid).child('/').push({
      name: usernamesa,
      message: messageval,
      like: 0
    });
  }
}

function logout() {
  localStorage.removeItem('User name');
  localStorage.removeItem('whichredirect')
  window.location = 'index.html';
}

function updateLike(message_id) {
  console.log("clicked on like button - " + message_id);
  button_id = message_id;
  likes = document.getElementById(button_id).value;
  updated_likes = Number(likes) + 1;
  console.log(updated_likes);

  firebase.database().ref(roomid).child(message_id).update({
    like: updated_likes
  });

}

function back() {
  window.location = 'kwitter_room.html';
}
document.getElementById('roomname').innerHTML = "#" + roomid;
window.addEventListener('keydown', ejd)

function ejd(e) {
  key = e.keyCode;
  console.log(key)
  if (key == '13') {
    console.log('Enter Pressed');
    send();
  }
}
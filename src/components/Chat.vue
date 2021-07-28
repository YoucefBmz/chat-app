<template>
  <div class="container">
    <button @click="signOut">sign out</button>
    <h3 class="text-center">Messaging</h3>
    <div class="messaging">
      <div class="inbox_msg">
        <div class="inbox_people">
          <div class="headind_srch">
            <div class="recent_heading">
              <h4>Recent</h4>
            </div>
            <div class="srch_bar">
              <div class="stylish-input-group">
                <input type="text" class="search-bar" placeholder="Search" />
                <span class="input-group-addon">
                  <button type="button">
                    <i class="fa fa-search" aria-hidden="true"></i>
                  </button>
                </span>
              </div>
            </div>
          </div>
          <div class="inbox_chat">
            <div class="chat_list active_chat">
              <div class="chat_people">
                <div class="chat_img">
                  <img
                    src="https://ptetutorials.com/images/user-profile.png"
                    alt="sunil"
                  />
                </div>
                <div class="chat_ib">
                  <h5>Sunil Rajput <span class="chat_date">Dec 25</span></h5>
                  <p>
                    Test, which is a new approach to have all solutions
                    astrology under one roof.
                  </p>
                </div>
              </div>
            </div>

            <div class="chat_list">
              <div class="chat_people">
                <div class="chat_img">
                  <img
                    src="https://ptetutorials.com/images/user-profile.png"
                    alt="sunil"
                  />
                </div>
                <div class="chat_ib">
                  <h5>Sunil Rajput <span class="chat_date">Dec 25</span></h5>
                  <p>
                    Test, which is a new approach to have all solutions
                    astrology under one roof.
                  </p>
                </div>
              </div>
            </div>
            <div class="chat_list">
              <div class="chat_people">
                <div class="chat_img">
                  <img
                    src="https://ptetutorials.com/images/user-profile.png"
                    alt="sunil"
                  />
                </div>
                <div class="chat_ib">
                  <h5>Sunil Rajput <span class="chat_date">Dec 25</span></h5>
                  <p>
                    Test, which is a new approach to have all solutions
                    astrology under one roof.
                  </p>
                </div>
              </div>
            </div>
            <div class="chat_list">
              <div class="chat_people">
                <div class="chat_img">
                  <img
                    src="https://ptetutorials.com/images/user-profile.png"
                    alt="sunil"
                  />
                </div>
                <div class="chat_ib">
                  <h5>Sunil Rajput <span class="chat_date">Dec 25</span></h5>
                  <p>
                    Test, which is a new approach to have all solutions
                    astrology under one roof.
                  </p>
                </div>
              </div>
            </div>
            <div class="chat_list">
              <div class="chat_people">
                <div class="chat_img">
                  <img
                    src="https://ptetutorials.com/images/user-profile.png"
                    alt="sunil"
                  />
                </div>
                <div class="chat_ib">
                  <h5>Sunil Rajput <span class="chat_date">Dec 25</span></h5>
                  <p>
                    Test, which is a new approach to have all solutions
                    astrology under one roof.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mesgs">
          <div class="msg_history">
            <div 
              v-for="msg in messages" 
              :key="msg.id" 
              :class="[msg.author === userAuth.name ? 'mymsg' : 'hismsg']">
              <!-- 
                <div :class="[message.author === userAuth.displayName ? 'outgoing_msg' : 'incoming_msg_img']">
                <img :src="userAuth.photo" alt="sunil" />
              </div>
              -->
              <div class="outgoing_msg">
                <div class="received_withd_msg">
                  <p>{{ msg.message }}</p>
                  <span class="time_date"> {{ msg.createdAt.time }} | {{ msg.author }} |  {{ msg.createdAt.date }} </span>
                </div>
              </div>
            </div>
            <!--
            <div class="outgoing_msg">
              <div class="sent_msg">
                <p>Apollo University, Delhi, India Test</p>
                <span class="time_date"> 11:01 AM | Today</span>
              </div>
            </div>
            -->
          </div>
          <div class="type_msg">
            <div class="input_msg_write">
              <input
                @keyup.enter="saveMessage"
                v-model="message"
                type="text"
                class="write_msg"
                placeholder="Type a message"
              />
              <button @click="saveMessage" class="msg_send_btn" type="button">
                <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "HelloWorld",
  data() {
    return {
      message: "",
      messages: [],
      userAuth: {},
    };
  },
  methods: {
    saveMessage() {
      db.collection("chat")
        .add({
          message: this.message,
          author: this.userAuth.name,
          createdAt: new Date(),
        })

        .then( (docRef) => {
          console.log("Document written with ID: ", docRef.id);
          this.scrollToBottom();
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
      this.message = "";
    },
    scrollToBottom(){
      let box = document.querySelector('.msg_history');
      box.scrollTop = box.scrollHeight;
    },
    signOut(){
      firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log('sign-out');
        //this.$router.push("/login");
      }).catch(function(error) {
        // An error happened.
      });
    }

  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userAuth = {
          name: user.displayName,
          email: user.email,
          uid: user.uid,
          photo: user.photoURL,
        };
        console.log(this.userAuth);
      }
    });
    //const date = createdAt.toDate().toDateString()

    db.collection("chat")
      .orderBy("createdAt")
      .onSnapshot((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((doc) => {
          let messageObj = {
            message: doc.data().message,
            id: doc.id,
            author: doc.data().author,
            createdAt:{
              date: doc.data().createdAt.toDate().toDateString(),
              time: doc.data().createdAt.toDate().toLocaleTimeString('en-US')
            }
          };
          //messageObj.date = date.toDate().toDateString()
          
          //console.log(`${doc.id} => ${doc.data()}`);
          data.push(messageObj);
        });
        this.messages = data;
        setTimeout(()=>{
          this.scrollToBottom();
        },1000);
      });
  },
  beforeRouteEnter(to, from, next) {
    //console.log('before eoute enter');
    
    next((vm) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          //console.log(user);
          next();
        } else {
          vm.$router.push("/login");
        }
      });
    });
    
  },
};  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.container {
  max-width: 1170px;
  margin: auto;
}
img {
  max-width: 100%;
}
.inbox_people {
  background: #f8f8f8 none repeat scroll 0 0;
  float: left;
  overflow: hidden;
  width: 40%;
  border-right: 1px solid #c4c4c4;
}
.inbox_msg {
  border: 1px solid #c4c4c4;
  clear: both;
  overflow: hidden;
}
.top_spac {
  margin: 20px 0 0;
}

.recent_heading {
  float: left;
  width: 40%;
}

.headind_srch {
  padding: 10px 29px 10px 20px;
  overflow: hidden;
  border-bottom: 1px solid #c4c4c4;
}

.recent_heading h4 {
  color: #05728f;
  font-size: 21px;
  margin: auto;
}
.srch_bar input {
  border: 1px solid #cdcdcd;
  border-width: 0 0 1px 0;
  width: 80%;
  padding: 2px 0 4px 6px;
  background: none;
}
.srch_bar .input-group-addon button {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  padding: 0;
  color: #707070;
  font-size: 18px;
}
.srch_bar .input-group-addon {
  margin: 0 0 0 -27px;
}

.chat_ib h5 {
  font-size: 15px;
  color: #464646;
  margin: 0 0 8px 0;
}
.chat_ib h5 span {
  font-size: 13px;
  float: right;
}
.chat_ib p {
  font-size: 14px;
  color: #989898;
  margin: auto;
}
.chat_img {
  float: left;
  width: 11%;
}
.chat_ib {
  float: left;
  padding: 0 0 0 15px;
  width: 88%;
}

.chat_people {
  overflow: hidden;
  clear: both;
}
.chat_list {
  border-bottom: 1px solid #c4c4c4;
  margin: 0;
  padding: 18px 16px 10px;
}
.inbox_chat {
  height: 550px;
  overflow-y: scroll;
}

.active_chat {
  background: #ebebeb;
}

.incoming_msg_img {
  display: inline-block;
  width: 6%;

}
.received_msg {
  display: inline-block;
  padding: 0 0 0 10px;
  vertical-align: top;
  width: 92%;
}
.received_withd_msg p {
  background: red none repeat scroll 0 0;
  border-radius: 13px;
  color: #646464;
  font-size: 14px;
  margin: 0;
  padding: 5px 10px 5px 12px;
  width: 100%;
}
.time_date {
  color: #747474;
  display: block;
  font-size: 12px;
  margin: 8px 0 0;
}
.received_withd_msg {
  width: 57%;
}
.mesgs {
  float: left;
  padding: 30px 15px 0 25px;
  width: 60%;
}

.sent_msg p {
  background:blue none repeat scroll 0 0;
  border-radius: 3px;
  font-size: 18px;
  margin: 0;
  color: #fff;
  padding: 5px 10px 5px 12px;
  width: 100%;
}
.outgoing_msg {
  overflow: hidden;
  margin: 26px 0 26px;
}
.sent_msg {
  float: right;
  width: 46%;
}
.input_msg_write input {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  color: #4c4c4c;
  font-size: 15px;
  min-height: 48px;
  width: 100%;
}

.type_msg {
  border-top: 1px solid #c4c4c4;
  position: relative;
}
.msg_send_btn {
  background: #05728f none repeat scroll 0 0;
  border: medium none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 17px;
  height: 33px;
  position: absolute;
  right: 0;
  top: 11px;
  width: 33px;
}
.messaging {
  padding: 0 0 50px 0;
}
.msg_history {
  height: 516px;
  overflow-y: auto;
  scroll-behavior: smooth;
}
.mymsg div div p{
  background: green;
  color:#fff
}
.mymsg div div{
  float: right;
}

.hismsg div div p{
  background: peru;
  color: #fff;
}
</style>

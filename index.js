// Import stylesheets
import "./style.css";
import liff from "@line/liff";

// Write Javascript code!
const appDiv = document.getElementById("app");
appDiv.innerHTML = `... `;

// Write Javascript code!

var body = document.getElementById("body");
var imgURL = document.getElementById("pictureURL");
var userId = document.getElementById("userId");
var displayName = document.getElementById("displayName");
var statusMessage = document.getElementById("statusMessage");
var email = document.getElementById("email");

var btnShare = document.getElementById("btnShare");

async function main() {
  liff.ready.then(() => {
    var device = liff.getOS();
    var lang = liff.getLanguage();
    var ver = liff.getVersion();
    var linever = liff.getLineVersion();
    var MobileConn = liff.isInClient();
    document.getElementById("TEXT").innerHTML =
      "<h3> Language: " +
      lang +
      " <br>Version:" +
      ver +
      " <br>Line Version:" +
      linever +
      " <br>Client Mobile:" +
      MobileConn +
      " <br>device :" +
      device +
      " <br></h3>";
    body.style.backgroundColor = "black";
    userId.innerHTML = "<b>UserID:</b>";
    displayName.innerHTML = "<b>DisplayName:</b>";
    statusMessage.innerHTML = "<b>StatusMessage:</b>";
    email.innerHTML = "<b>email:</b>";

    if (device === "ios") {
      body.style.backgroundColor = "#77A";
    } else if (device === "android") {
      body.style.backgroundColor = "#A77";
    } else {
      body.style.backgroundColor = "#7A7";
    }
    if (MobileConn) {
      getUserProfile();
    } else {
      document.getElementById("app").innerHTML = " Liff : Load profile is Fail";
    }
    btnShare.style.display = "block";
  });

  await liff.init({ liffId: "1655373282-n3y9YMAq" });
}
main();
function successCallback() {
  document.getElementById("app").innerHTML =
    "<h1>Liff : " + device + " initial pass</h1>";
}
/*
{
    "iss": "https://access.line.me",
    "sub": "U1234567890abcdef1234567890abcdef ",
    "aud": "1234567890",
    "exp": 1504169092,
    "iat": 1504263657,
    "amr": [
        "pwd"
    ],
    "name": "Taro Line",
    "picture": "https://sample_line.me/aBcdefg123456"
}

*/

//---------------------------
async function getUserProfile() {
  try {
    // const email = await liff.getDecodeIDToken().email;
    //const idToken =

    const profile = await liff.getProfile();
    imgURL.src = profile.pictureUrl;
    userId.innerHTML = "<b>UserID:</b>" + profile.userId;
    displayName.innerHTML = "<b>DisplayName:</b>" + profile.displayName;
    statusMessage.innerHTML = "<b>StatusMessage:</b>" + profile.statusMessage;
    email.innerHTML = "<b>email:</b>" + (await liff.getDecodedIDToken().email);
    document.getElementById("app").innerHTML = "get Profile pass";
    //pictureUrl.src = profile.pictureUrl;
  } catch (err) {
    document.getElementById("app").innerHTML = " Err:" + err.message;
  }
}
/*
[
      {
        type: "sticker",
        packageId: 2,
        stickerId: 34
      }
      {
        type: "text",
        text: " ได้ทำการแชร์ ด้วย LIFF แล้ว"
      }
      {
        type: "image",
        originalContentUrl:
          "https://www.sermsuk-intelligent.com/img/blog/blog2.png",
        previewImageUrl:
          "https://www.sermsuk-intelligent.com/img/blog/blog2.png"
      }
  */

async function shareMsg() {
  try {
    const result = await liff.shareTargetPicker([
      {
        type: "text",
        text: " ได้ทำการแชร์ ด้วย LIFF แล้ว"
      }
    ]);
    if (result) {
      alert(" แชร์ แล้ว ");
    } else {
      alert(" ผู้ใช้งาน ไม่ได้ทำการแชร์ ");
    }
    liff.closeWindow();
  } catch (err) {
    document.getElementById("app").innerHTML = " Err:" + err.message;
  }
}

btnShare.onclick = () => {
  shareMsg();
};

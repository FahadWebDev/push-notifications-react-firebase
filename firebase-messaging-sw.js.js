// Scripts for firebase and firebase messaging
// Both couple of scrips works, just change incase of not working the other

importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// importScripts(
//   "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
// );
// importScripts(
//   "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
// );

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyBneiNCYEpwk0YU_XlHj0LLdhX5Wects9o",
  authDomain: "push-notifications-react-b0364.firebaseapp.com",
  projectId: "push-notifications-react-b0364",
  storageBucket: "push-notifications-react-b0364.appspot.com",
  messagingSenderId: "982609279162",
  appId: "1:982609279162:web:e4e68b78b04e1d57112a83",
  measurementId: "G-SPEPS522H9",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBneiNCYEpwk0YU_XlHj0LLdhX5Wects9o",
  authDomain: "push-notifications-react-b0364.firebaseapp.com",
  projectId: "push-notifications-react-b0364",
  storageBucket: "push-notifications-react-b0364.appspot.com",
  messagingSenderId: "982609279162",
  appId: "1:982609279162:web:e4e68b78b04e1d57112a83",
  measurementId: "G-SPEPS522H9",
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const getTokenFunc = (setTokenFound) => {
  return getToken(messaging, {
    vapidKey:
      "BMmVIeiRIZoGQBxOfpn_hAbSaWfQ0M86078WMRfyLXWI9X7fTQqzL_f3zxABdvj2vzy8O1wobtR9ayq42PqkVXM",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

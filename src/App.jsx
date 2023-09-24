import { useEffect, useState } from "react";
import { Button, Toast } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import reactLogo from "./assets/react.svg";
import { getTokenFunc, onMessageListener } from "./firebase";

function App() {
  const [show, setShow] = useState(false);
  const [isTokenFound, setTokenFound] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });

  useEffect(() => {
    getTokenFunc(setTokenFound);
  }, []);

  onMessageListener()
    .then((payload) => {
      setShow(true);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
      console.log("payload", payload);
    })
    .catch((err) => console.log("failed: ", err));

  return (
    <div className="App">
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
        animation
        style={{
          position: "absolute",
          top: 20,
          right: 20,
        }}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
          <strong className="mr-auto">{notification.title}</strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body>{notification.body}</Toast.Body>
      </Toast>
      {isTokenFound && "Notification permission enabled 👍🏻"}
      {!isTokenFound && "Need notification permission ❗️"}
      <header className="App-header">
        <img
          src={reactLogo}
          className="App-logo d-block m-auto mb-2"
          alt="logo"
        />
        <Button onClick={() => setShow(true)}>Show Toast</Button>
      </header>
    </div>
  );
}

export default App;

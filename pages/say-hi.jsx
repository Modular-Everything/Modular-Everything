import firebase from "firebase/compat/app";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { PageHead } from "../components/Head";
import { Navigation } from "../components/Navigation";
import { classNames } from "../helpers/classNames";

firebase.initializeApp({
  apiKey: "AIzaSyAwCjot-aqQUY-CeVLZH0yW-j3n8B3gHI0",
  authDomain: "modular-everything-chat.firebaseapp.com",
  projectId: "modular-everything-chat",
  storageBucket: "modular-everything-chat.appspot.com",
  messagingSenderId: "940843182149",
  appId: "1:940843182149:web:7757eb1780e757238b1b2c",
  measurementId: "G-E630JKBSCM",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

/**
 * Sign in options
 */
function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
}

/**
 * A sign in button or buttons to sign in with oauth providers
 * @returns Button(s) with oauth providers to gain access
 */
function SignIn() {
  const [modal, setModal] = useState(false);

  return (
    <>
      {modal && (
        <>
          <div className="absolute left-1/2 top-1/2 z-50 flex w-1/2 -translate-x-1/2 -translate-y-1/2 transform flex-col bg-pure-white p-8">
            <button
              type="button"
              onClick={signInWithGoogle}
              className="border-gray-200 py-4"
            >
              Sign in with Google
            </button>
          </div>
          <button
            type="button"
            className="absolute left-0 top-0 z-40 h-full w-full backdrop-blur-xl"
            onClick={() => setModal(false)}
            aria-label="Close sign in"
          />
        </>
      )}
      <button
        type="button"
        onClick={() => setModal(true)}
        className="order-2 flex h-full w-full max-w-lg items-end bg-blue p-0 pr-8 text-left text-3xl font-semibold leading-none text-black lg:order-1 lg:text-lg"
      >
        Sign in&#8599;
      </button>
    </>
  );
}

/**
 * Allow signing out
 * @returns A button to sign the user out
 */
function SignOut() {
  return (
    auth.currentUser && (
      <button
        type="button"
        className="order-2 flex h-full w-full max-w-lg items-end bg-blue p-0 pr-8 text-left text-3xl font-semibold leading-none text-black lg:order-1 lg:text-lg"
        onClick={() => auth.signOut()}
      >
        Sign out&times;
      </button>
    )
  );
}

/**
 * Chat message
 * @param {object} message The object containing database fields
 * @returns A chat bubble
 */
function ChatMessage({ message }) {
  const { text, uid, createdAt } = message;
  const messageClass =
    uid === process.env.NEXT_PUBLIC_GOOGLE_USER_ID
      ? "bg-blue"
      : "bg-mid-grey self-end";

  const sentDate = createdAt?.toDate().toDateString();

  return (
    <article
      className={classNames(
        messageClass,
        "flex w-fit-content max-w-5xl flex-col lg:max-w-4xl"
      )}
    >
      <p className="flex text-5xl lg:text-4xl">{text}</p>
      <time
        dateTime={sentDate}
        className="flex self-end text-right text-3xl lg:text-lg"
      >
        Sent on {sentDate}
      </time>
    </article>
  );
}

/**
 * Leave a message!
 * @returns A loop of messages from the database, limited to 25
 */
function LeaveAMessage() {
  const dummy = useRef();

  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  // Returns array of objects where each chat message is
  // the chat message in the database
  // Any time the data changes, this will update
  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  // Send our message to the database
  async function sendMessage(e) {
    e.preventDefault();
    const { uid } = auth.currentUser;

    // Add a new document to the database
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
    });

    setFormValue("");

    dummy.current.scrollIntoView({ behavior: "smooth" });
  }

  const [user] = useAuthState(auth);

  useEffect(() => {
    // Scroll to the bottom of the page when the messages
    // are available
    dummy.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="grid h-full grid-rows-chat">
      <div className="flex w-full flex-col gap-4 overflow-auto">
        {messages &&
          messages.map((msg) => (
            <ChatMessage key={msg.createdAt.nanoseconds} message={msg} />
          ))}

        <div ref={dummy} />
      </div>

      <form
        onSubmit={sendMessage}
        className="grid w-full grid-cols-chat-message"
      >
        <div id="message" className="sr-only">
          Leave a message
        </div>

        <input
          aria-labelledby="message"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder={user ? "Leave a message|" : "Sign in to leave a message"}
          className="pt-8 text-5xl placeholder:text-black lg:text-4xl"
          disabled={!user}
        />

        <div className="flex lg:flex-col">
          {user ? (
            <>
              <SignOut />
              <button
                type="submit"
                className="order-1 flex h-full w-full max-w-lg items-end bg-black p-0 pr-8 text-left text-3xl font-semibold leading-none text-white lg:order-2 lg:text-lg"
              >
                Send it&#8599;
              </button>
            </>
          ) : (
            <SignIn />
          )}
        </div>
      </form>
    </div>
  );
}

/**
 * An app to leave me a message
 * @returns Sign in or leave a message app
 */
function SayHi() {
  return (
    <>
      <PageHead title="Leave a message — Modular Everything" />

      <Navigation active="say-hi" />
      <div className="absolute top-0 bg-dark-grey text-3xl text-white md:hidden">
        <Link href="/">Go back</Link>
      </div>

      <section className="h-full w-full bg-light-grey pt-24 md:pt-10">
        <LeaveAMessage />
      </section>
    </>
  );
}

export default SayHi;

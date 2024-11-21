# Chat Application
hat Application

This project is a simple chat application built with React Native using Firebase Authentication and Firestore. Users can register with their email and password, log in, and join group chats. Chats are updated in real-time, enabling messaging between users.

Features

	•	User Registration and Login: Users can create an account and log in with their email and password using Firebase Authentication.
	•	Real-Time Chat: Chat messages are updated in real-time using the Firestore database.
	•	Simple and Clean UI: The user interface is built with React Native Paper components, providing a modern and user-friendly design.
	•	Message Sending: Users can send messages to chat rooms, and messages are stored in Firestore.
	•	User Profile: The logged-in user’s name is fetched from Firebase Authentication and displayed in the chat messages.

Technologies Used

	•	React Native: The primary library used for building the mobile application.
	•	Firebase Authentication: Firebase Authentication is used for user authentication.
	•	Firestore: The Firestore database is used for storing chat messages.
	•	React Navigation: Used for navigation within the app.
	•	React Native Paper: The React Native Paper library is used for UI components.

Setup

Prerequisites

	•	Node.js (LTS version recommended)
	•	React Native CLI
	•	Firebase project and Firestore configuration


Application Features

1. User Registration (SignUp)

Users can create a new account by entering their email, password, and name. Firebase Authentication is used for account creation, and the user details are stored in Firestore.
	•	Register with email and password
	•	Enter name (displayed after login)

2. User Login (SignIn)

Existing users can log in with their email and password. After a successful login, the user is redirected to the homepage.
	•	Log in with email and password
	•	Link to create a new account

3. Chat Screen (Chat)

Users can join specific chat rooms and send messages. Messages are updated in real-time from the Firestore database.
	•	Real-time messaging
	•	Send messages
	•	Messages displayed with user name

Example User Flow

	1.	Sign Up: The user enters their email, password, and name on the SignUp screen.
	2.	Log In: The user enters their email and password to log into the app.
	3.	Join Chat: The user joins a specific chat room and can send messages.
	4.	Real-Time Chat: Messages are stored in Firestore in real-time, and all participants can see the new messages instantly.

Debugging

	•	If you encounter errors during login: Check your Firebase Authentication settings to ensure they are configured correctly.
	•	If chat messages are not updating: Review your Firestore security rules and database connection settings.

  
This project is a simple chat application developed using React Native and Firebase. It allows users to sign up, log in, and chat with other users.

## Features

  •  **User Registration and Login**: Powered by Firebase Authentication.  
  •  **Real-Time Messaging**: Supports Firebase Realtime Database or Firestore for real-time chat functionality.  
  •  **Simple and User-Friendly Interface**: Easy-to-navigate design.  
  •  **Error Handling**: Provides user feedback through error messages (e.g., email-already-in-use error).

## Demo

![Chat Application Demo](E.gif)
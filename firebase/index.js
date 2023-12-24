import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  arrayUnion,
  where,
  deleteDoc,
} from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASURMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

async function addBooking(req, id) {
  await setDoc(doc(db, "bookings", id), req);
}

async function updateBooking(uid, id) {
  const docRef = doc(db, "bookings", id);
  await updateDoc(docRef, {
    uid: uid,
    isReliable: true,
  });
}
async function getBookingById(id) {
  const docRef = doc(db, "bookings", id);
  const docSnapshot = await getDoc(docRef);
  const booking = {
    id: docSnapshot.id,
    ...docSnapshot.data(),
  };
  return booking;
}

async function getBookingsByUserId(uid) {
  const ref = collection(db, "bookings");
  const filter = query(ref, where("uid", "==", uid));
  const response = await getDocs(filter);
  const bookings = response.docs.map((doc) => doc.data());
  return bookings;
}
async function getAllBookings() {
  const ref = collection(db, "bookings");
  const response = await getDocs(ref);
  const bookings = response.docs.map((doc) => doc.data());
  return bookings;
}
async function getBookings(uid) {
  const requestsCollection = collection(db, "bookings");
  const userRequestsQuery = query(requestsCollection, where("uid", "==", uid));
  const querySnapshot = await getDocs(userRequestsQuery);
  const bookings = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return bookings;
}

async function getUsers() {
  const ref = collection(db, "users");
  const response = await getDocs(ref);
  const users = response.docs.map((doc) => doc.data());
  return users;
}
async function getDocument(collection, key) {
  const docRef = doc(db, collection, key);
  const docSnapshot = await getDoc(docRef);

  return docSnapshot.data();
}
async function addDocument(collection, uniqueId, data) {
  await setDoc(doc(db, collection, uniqueId), data);
}
async function removeDocument(collection, uniqueId) {
  await deleteDoc(doc(db, collection, uniqueId));
}
async function updateDocument(keys, values, collection, id) {
  const docRef = doc(db, collection, id);
  const docSnapshot = await getDoc(docRef);

  if (docSnapshot.exists()) {
    const existingData = docSnapshot.data();
    const updatedData = { ...existingData };

    // Update or create each key-value pair
    keys.forEach((key, index) => {
      updatedData[key] = values[index];
    });

    // Update the document in the database
    await updateDoc(docRef, updatedData);
  } else {
    // If the document doesn't exist, create it with the provided keys and values
    const initialData = {};
    keys.forEach((key, index) => {
      initialData[key] = values[index];
    });

    await setDoc(docRef, initialData);
  }
}

// blog
async function getBlogPosts() {
  const docRef = doc(db, "blog", "blog");
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}
async function addBlogPost(post) {
  const docRef = doc(db, "blog", "blog");
  const docSnap = await getDoc(docRef);
  if (!docSnap.data()) {
    await setDoc(doc(db, "blog", "blog"), { posts: [post] });
  } else {
    await updateDoc(doc(db, "blog", "blog"), {
      posts: arrayUnion(post),
    });
  }
}
async function updateBlogPost(postId, updatedPost) {
  const docRef = doc(db, "blog", "blog");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const posts = docSnap.data().posts;
    const postIndex = posts.findIndex((post) => post.postId === postId);
    if (postIndex !== -1) {
      posts[postIndex] = updatedPost;
      await updateDoc(docRef, { posts });
    }
  }
}

export {
  addBooking,
  auth,
  addDocument,
  getBookings,
  removeDocument,
  getUsers,
  updateDocument,
  getAllBookings,
  updateBooking,
  getBookingById,
  getBookingsByUserId,
  getBlogPosts,
  addBlogPost,
  updateBlogPost,
  getDocument,
  db,
  storage,
};

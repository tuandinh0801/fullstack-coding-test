import firebase from "firebase";
import firebaseService from "services/firebase";

type BlogData = {
  image: string,
  title: string,
  content: string
}

type BlogIds = string[]

class Blogs {
  db: firebase.firestore.Firestore;

  constructor() {
    this.db = firebaseService.firestore();
  }

  onBlogs(callback: (BlogIds) => void): firebase.Unsubscribe  {
    const unsubscribe = this.db.collection("blogs").onSnapshot(docs => {
      const ids: string[] = []

      docs.forEach((docs) => {
        ids.push(docs.id)
      })

      callback(ids);
    });

    return unsubscribe
  }

  onPostData(postId: string, callback: (BlogData) => void): firebase.Unsubscribe {
    const unsubscribe = this.db.collection("blogs").doc(postId).onSnapshot(doc => {
      callback(doc.data())
    });

    return unsubscribe
  }
}

export default new Blogs()

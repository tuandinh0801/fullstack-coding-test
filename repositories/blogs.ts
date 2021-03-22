import firebase from "firebase";
import axiosInstance from "services/axios";
import firebaseService from "services/firebase";

interface BlogData {
  image: any;
  title: string;
  content: string;
}

interface BlogDataId {
  id: string;
}

type BlogIds = string[];

class Blogs {
  db: firebase.firestore.Firestore;

  constructor() {
    this.db = firebaseService.firestore();
  }

  async getBlogs(): Promise<BlogData & BlogDataId[]> {
    const { data } = await axiosInstance.get("/blogs");
    return data;
  }

  async updateBlog(blogData: BlogData & BlogDataId): Promise<any> {
    if (typeof blogData.image !== "string") {
      blogData.image = await this.uploadImage(blogData.image)
    }

    const { id, ...rest } = blogData;

    return axiosInstance.put(`/blogs/${id}`, rest);
  }

  async createBlog(blogData: BlogData): Promise<any> {
      blogData.image = await this.uploadImage(blogData.image)

    return axiosInstance.post('/blogs', blogData);
  }

  async deleteBlog(id: string): Promise<any> {
    return axiosInstance.delete(`/blogs/${id}`);
  }

  async uploadImage(image: File): Promise<string> {
    const imageName = `images/${Date.now()}.jpg`;
    const storageRef = firebaseService.storage().ref().child(imageName);
    const upload = await storageRef.put(image);

    return upload.ref.getDownloadURL();
  }

  onBlogs(callback: (BlogIds) => void): firebase.Unsubscribe {
    const unsubscribe = this.db.collection("blogs").onSnapshot((docs) => {
      const ids: string[] = [];

      docs.forEach((docs) => {
        ids.push(docs.id);
      });

      callback(ids);
    });

    return unsubscribe;
  }

  onPostData(postId: string, callback: (BlogData) => void): firebase.Unsubscribe {
    const unsubscribe = this.db
      .collection("blogs")
      .doc(postId)
      .onSnapshot((doc) => {
        callback(doc.data());
      });

    return unsubscribe;
  }
}

export default new Blogs();

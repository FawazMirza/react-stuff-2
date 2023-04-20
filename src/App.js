import { useEffect, useState } from 'react';
import './App.css';
import { Auth } from "./components/auth"
import { db, auth, storage } from "./config/firebase"
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc} from "firebase/firestore"
import { ref, uploadBytes } from "firebase/storage"

function App() {
  const [movieList, setMovieList] = useState([])

  const [newMovieTitle, setNewMovieTitle] = useState("")
  const [newReleaseDate, setNewReleaseDate] = useState(0)
  const [newMovieOscar, setNewMovieOscar] = useState(false)



  const [updatedMovie, setUpdatedMovie] = useState("")


  const [fileUpload, setFileUpload] = useState(null)

  const movieCollectionRef = collection(db, "movies")

  const onSubmitMovie = async () => {
    try {
    await addDoc(movieCollectionRef, {title: newMovieTitle, releaseDate: newReleaseDate, Oscar: newMovieOscar, userID: auth?.currentUser.uid})
    } catch(err) {
      console.error(err)
    }
  }


  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id)
    await deleteDoc(movieDoc)
  }

  const updateMovie = async (id) => {  
    const movieDoc = doc(db, "movies", id)
    await updateDoc(movieDoc, {title: updatedMovie})
  }

  useEffect (() => {
    const getMovieList = async () => {
      // READ DATA
      // SET THE MOVIE
   
      try {
      const data = await getDocs(movieCollectionRef)
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
         id: doc.id}))
        setMovieList(filteredData)
        } catch(err) {
        console.error(err)
      }
    }
    getMovieList()
  }, [onSubmitMovie])

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
    await uploadBytes(filesFolderRef, fileUpload)
    } catch(err) {
      console.error(err)
    }
  }
  
  return ( <div className="App">
    
    <Auth/>
    <div>
      <input placeholder="Movie title..." 
      onChange={(e) => setNewMovieTitle(e.target.value)}/>

      <input placeholder="Relase date..." 
      type="number"
      onChange={(e) => setNewReleaseDate(Number(e.target.value))}/>

      <input type = "checkbox" checked={newMovieOscar} 
      onChange={(e) => setNewMovieOscar(e.target.checked)}/>

      <label>Received an Oscar</label>
      <button onClick={onSubmitMovie}>Submit Movie</button>
    </div>


    <div>
      {movieList.map((movie) => (
        <div>
          <h1 style={{color: movie.Oscar ? "green" : "red"}}>{movie.title}</h1>
          <p>Date: {movie.releaseDate}</p>

          <button onClick={() => deleteMovie(movie.id)}>Delete movie</button>

          <input placeholder="new title..."
          onChange={(e) => setUpdatedMovie(e.target.value)}/>
          <button onClick={() => updateMovie(movie.id)}>Update title</button>
        </div>
        ))}
    </div>
    <div>
      <input type="file" onChange={(e) => setFileUpload(e.target.files[0])}/>
      <button onClick={uploadFile}>Upload file</button>

    </div>
  </div>
  );
}

export default App;

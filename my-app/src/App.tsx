import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import Layout from "./module/Layout";
import MusicList from "./module/music/MusicList";
import MusicForm from "./module/music/MusicForm";
import ContactForm from "./module/music/ContactForm";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MusicList />}></Route>
            <Route path="/add" element={<MusicForm />}></Route>
            <Route path="/contact" element={<ContactForm />}></Route>
            <Route path="/edit/:id" element={<MusicForm isEditForm={true}/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import "./App.css";

import React,{useState} from "react";
import Navbar from "./COMPONENTS/Navbar";
import News  from "./COMPONENTS/News";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';


const App=(props)=>{
 const [progress, setprogress] = useState(0)
  const pageSize=12;
  
  const setProgress=(progress)=>{
    setprogress(progress);
  }
 
    return (
      <Router>

      <div>

      <LoadingBar
        color='green'
        height={3}
        progress={progress}
        
      />
        <Navbar />
       

          <Routes>
           
           <Route exact path="/"   element={<News   setProgress={setProgress}     key="General"  pageSize={pageSize} country="in" category="General" />}/> 
           <Route exact path="/Business"  element={<News   setProgress={setProgress}   key="Business" pageSize={pageSize} country="in" category="Business" />}/> 
           <Route exact path="/Entertainment"  element={<News   setProgress={setProgress}   key="Entertainment" pageSize={pageSize} country="in" category="Entertainment" />}/>
           <Route exact path="/Health"  element={<News   setProgress={setProgress}   key="Health" pageSize={pageSize} country="in" category="Health" />}/>
           <Route exact path="/Science"  element={<News   setProgress={setProgress}   key="Science" pageSize={pageSize} country="in" category="Science" />}/>
           <Route exact path="/Sports"  element={<News   setProgress={setProgress}   key="Sports" pageSize={pageSize} country="in" category="Sports" />}/>
           <Route exact path="/Technology"  element={<News  setProgress={setProgress}   key="Technology" pageSize={pageSize} country="in" category="Technology" />}/> 


          </Routes>
          
      </div>
      </Router>
 
);
  }
  export default App;


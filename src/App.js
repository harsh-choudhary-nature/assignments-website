import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/navbar';
import Introduction from './components/introduction';
import Projects from './components/projects';
import ProjectDetail from './components/projectdetail';
import Contact from './components/contact';
import Footer from './components/footer';

function App() {
  return (
    <Router>
      <div className="App" id="top">
        <NavBar />
        <main>
          <Routes>
            <Route path="/"
              element={
                <>
                  <section>
                    <Introduction />
                  </section>
                  <section id="projects">
                    <Projects/>
                  </section>
                  <section id="contact">
                    <Contact />
                  </section>
                </>
              }/>
            <Route path="/project/:projectId" element={<ProjectDetail />} />
          </Routes>
        </main>
        <Footer />
        
        <p></p>
      </div>
    </Router>
  );
}

export default App;

import './projects.css'; // Optional, for additional styling
import React from 'react';
import { Link } from 'react-router-dom';
import LabCard from './labcard';
import { projectsData } from '../data';

const Projects = () => {

  const scrollToSection = (sectionId) => {
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView();
      }
    }, 0);
  };
  return (
    <section className="projects">
      <h2>Projects</h2>
      <div className="projects-container">
        {projectsData.map(project => (
          <Link to={`/project/${project.id}`} onClick={(e) => scrollToSection('top')} key={project.id}>
            <LabCard title={project.title} description={project.description} imageUrl={project.imageUrl} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Projects;

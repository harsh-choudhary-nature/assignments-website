// src/components/ProjectDetail.js
import './projectdetail.css'
import React from 'react';
import { useParams } from 'react-router-dom';
import { projectsData } from '../data'; // Import your data
import Project1 from '../projects/project1';
import Project2 from '../projects/project2';


const ProjectDetail = () => {
  const { projectId } = useParams();
  const index = projectId - 1;
  const project = projectsData[index];

  if (!project) {
    return <div className='not-found'>Project not found.</div>;
  }

  return (
    <div>
      {projectId === '1' && <Project1 />}
      {projectId === '2' && <Project2 />}
    </div>
  );
};

export default ProjectDetail;

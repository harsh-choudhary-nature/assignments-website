// src/components/ProjectDetail.js
import './projectdetail.css'; // Create a CSS file for styling
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { projectsData } from '../data'; // Import your data
import DOMPurify from 'dompurify'; 

const ProjectDetail = () => {
  const { projectId } = useParams();
  const index = projectId - 1;
  const project = projectsData[index];

  useEffect(() => {
    // Select all elements with the copy-btn class
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    // Attach event listeners to each button
    copyButtons.forEach(button => {
      button.addEventListener('click', handleCopyClick);
    });
    
    // Cleanup event listeners when component unmounts
    return () => {
      copyButtons.forEach(button => {
        button.removeEventListener('click', handleCopyClick);
      });
    };
  }, []); // Empty dependency array ensures this runs only once after the component mounts

  const handleCopyClick = (event) => {
    event.preventDefault();
    const button = event.target.closest('button');
    const codeText = button.previousElementSibling.innerText;
    navigator.clipboard.writeText(codeText).then(() => {
      button.classList.add('copied');
      // Revert back to the original icon after 1 second
      setTimeout(() => {
        button.classList.remove('copied');
      }, 1000);
    }).catch((err) => {
      console.error('Failed to copy: ', err);
    });
  };


  if (!project) {
    return <div>Project not found.</div>;
  }
  // Sanitize HTML before rendering
  const sanitizedTableOfContents = DOMPurify.sanitize(project.tableOfContents);
  const sanitizedIntroduction = DOMPurify.sanitize(project.introduction);
  const sanitizedSubmission = DOMPurify.sanitize(project.submission);
  const sanitizedQuestions = project.questions.map(q => DOMPurify.sanitize(q));

  return (
    <div className="project-detail">
      <h2>{project.title}</h2>
      {/* Render Table of Contents */}
      <div dangerouslySetInnerHTML={{ __html: sanitizedTableOfContents }} />
      
      <img src={project.gifUrl} alt={project.title} className="project-image" />

      {/* Render Introduction */}
      <div dangerouslySetInnerHTML={{ __html: sanitizedIntroduction }} />

      {/* Render Questions */}
      {sanitizedQuestions.map((questionHTML, idx) => (
        <div key={idx} className="question">
          <div dangerouslySetInnerHTML={{ __html: questionHTML }} />
        </div>
      ))}

      {/* Render Submission */}
      <div dangerouslySetInnerHTML={{ __html: sanitizedSubmission }} />
    </div>
  );
};

export default ProjectDetail;

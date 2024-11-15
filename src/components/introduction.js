import React from 'react';
import './introduction.css'; // Optional, for styling

const Introduction = () => {
  return (
    <section className="introduction">
      <h1>Welcome to AI Labs</h1>
      <p> 
        Welcome to CS330! In this course, we’re diving into the exciting world of Artificial Intelligence through interactive learning and engaging games. Whether you're new to AI or have a bit of experience, our hands-on approach will help you grasp fundamental concepts in a fun, approachable way.
      </p>
      <p>
        We designed these projects with the following key objectives: 
        <ul>
          <li>
            To enable students to visualize the outcomes of the AI techniques they implement.
          </li>
          <li>
            To provide clear instructions and code examples, without burdening students with unnecessary setup or complexity.
          </li>
          <li>
           To offer a challenging problem-solving environment that encourages creative solutions, reflecting the complexity of real-world AI challenges.
          </li>
        </ul>
      </p>
      <p>
        Throughout the course, each concept will be introduced with interactive games that bring theory to life. These games provide a unique way to apply what you&rsquo;ve learned, solving problems just like AI agents do. You&rsquo;ll have the chance to test your strategies, improve algorithms, and see how small changes can create big differences in AI performance.
      </p>

      <p>
        Join us as we explore the possibilities of Artificial Intelligence and build a solid foundation in the tools and techniques that are transforming our world! For bug reports or additional information, please refer to the <a href="#contact">Contact</a> section.
      </p>
    </section>
  );
};

export default Introduction;
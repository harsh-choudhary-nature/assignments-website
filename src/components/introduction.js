import React from 'react';
import './introduction.css'; // Optional, for styling

const Introduction = () => {
  return (
    <section className="introduction">
      <h1>Welcome to AI Labs</h1>
      <p>
        The following projects were created for IIT Goa's introductory Artificial Intelligence course, CS330. They showcase a variety of AI techniques applied to different games. However, the focus of these projects is not on developing AI for video games. Instead, they aim to teach core AI concepts such as informed state-space search, probabilistic inference, and reinforcement learning—fundamental principles that underpin real-world applications like robotics.
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
        These projects have significantly improved enrollment, teaching evaluations, and student engagement in our course. Over time, they have been refined and debugged through various iterations, and we are pleased to make them available for educational use at other universities as well.
      </p>

      <p>For bug reports or additional information, please refer to the <a href="#contact">Contact</a> section. </p>
    </section>
  );
};

export default Introduction;
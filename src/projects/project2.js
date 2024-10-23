import React, { useEffect } from 'react';
import { projectsData } from '../data';
import './project2.css';

const Project2 = () => {

  const project = projectsData[1];
  
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

  return (
    <div className="project-detail">
      <h2>{project.title}</h2> 

      <section id="toc" className="datablock">  
        <h3> Table of Contents </h3>  
        <ul>  
          <li> <a href="#introduction">Introduction</a></li> 
          <li> <a href="#q1">Q1: Reflex Agent</a></li>   
          <li> <a href="#q2">Q2: Minimax</a></li>  
          <li> <a href="#q3">Q3: Alpha- Beta Pruning</a></li>  
          <li> <a href="#q4">Q4: Expectimax</a></li>  
          <li> <a href="#q5">Q5: Better Evaluation function</a></li>
          <li> <a href="#submission">Submission</a></li>  
        </ul>  
      </section>
      
      <img src={project.gifUrl} alt={project.title} className="project-image" />
      
      <section id="introduction" className="datablock">  
        <h3> Introduction </h3>  
        <p> In this project, your player agent is faced with agnostic ghosts. You will see the details to it in the first question, which will familiarise you to additional game rules. 
        </p>

        <p> This project provides an autograder that allows you to test your solutions on your local machine. You can run the autograder using the following command:
          <div className="code-block">
            <span className="code">python3 autograder.py --no-graphics</span>
            <button className="copy-btn">
              <i className="fas fa-copy"></i>
              <i className="fas fa-check"></i>
            </button>
          </div>
        </p>
        <p>The project code is organized into multiple Python files. To complete the assignment, you'll need to read and understand some of these files, while others can be ignored. You can download the entire codebase and supporting files as a <a href={project.zipUrl} download>zip archive</a>.
        </p>
        <h4> Files you will edit and submit: </h4>
        <dl>
          <dt>evaluationFunctions.py</dt>
          <dd>Contains evaluation function to use for evaluating a game state.</dd>
          <dt>playerAgents.py</dt>
          <dd>Contains all the platformer agents of the game. Agents have an "act" function which takes the "agent_index", "game_state" and "problem" as parameters and returns an action based on current game state based on agent index.</dd>
        </dl>
        <h4> Files you might want to look at: </h4>
        <dl>
          <dt>costFunctions.py</dt>
          <dd>Contains cost function to use for scoring the game.</dd>
          <dt>gameState.py</dt>
          <dd>Contains code for the game state that is used to progress the game.</dd>
          <dt>ghostAgents.py</dt>
          <dd>Contains all the ghost agents of the game.</dd>
          <dt>help.txt</dt>
          <dd>Contains supported commands in platformers.py and autograder.py.</dd>
          <dt>problems.py</dt>
          <dd>Contains different search problems, and acts as wrapper for all the helper methods needed to solve the problem.</dd>
          <dt>utils.py</dt>
          <dd>Contains several data structures and utility functions.</dd>
        </dl>
        <h4> Files you can ignore: </h4>
        <dl>
          <dt>autograder.py</dt>
          <dd>Contains code for running your submission against test cases and giving you score.</dd>
          <dt>game.py</dt>
          <dd>Contains code for displaying game graphics.</dd>
          <dt>gameSettings.py</dt>
          <dd>Contains some variables for overall game settings.</dd>
          <dt>ghost.py</dt>
          <dd>Contains code for animating the ghost when display is enabled.</dd>
          <dt>graphicsUtils.py</dt>
          <dd>Contains code for helping load game graphics.</dd>
          <dt>platformers.py</dt>
          <dd>Contains code for starting the game and parsing arguments.</dd>
          <dt>player.py</dt>
          <dd>Contains code for animating the player when display is enabled.</dd>
        </dl>
      </section>

      <div className="question">
        <section id="q1" className="datablock">  
          <h3> Question 1: Reflex Agent (3 points) </h3>  
          <p> After downloading and unzipping the code, navigate to the project directory. To start playing Platformers, enter the following command in your terminal:
            <div className="code-block">
              <span className="code">python3 platformers.py</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>
          <p>
            To play an adversarial version, enter the following command in your terminal to use <span className="monospace">DirectionalGhostAgent</span>:
            <div className="code-block">
              <span className="code">python3 platformers.py --ghostAgent DirectionalGhostAgent
</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>
          <p>
            This game has the following extra features from the last project:-
          </p>
          <ul>
            <li>
            The ghosts have roughly got the same set of rules and actions as the Platformer itself <span className="bold">(except 'noop' and 'jump' actions, as these two actions never change the position of the agent, and jump was only important to eat some food dot, which makes it worthless for the ghosts)</span>. 
            </li>
            <li>You will also see some black animating dots; these are the <span className = "bold">freezers</span> eating which offers no extra points to the player but freezes the ghosts for a fixed time duration. You can hit a frozen ghost which will send it all the way to its initial position, and we say that the ghost is reborn.
            </li>
            <li>If player <span className="bold">hits the ghost anywhere in the traced path where ghost is in landed position and active (not frozen)</span>, or if the ghost acts and hits the player, the player is killed (given the goal of eating all the foods is not yet achieved). However, sky is for all, so collision rules do not apply when both ghost and player are in sky.
            </li>
            <li>
              The player starts with <span className="bold"> 0 points </span>. The scoring rules are shown in table below:-
            </li>
            <dl>
              <dt> Acting 'noop'</dt>
              <dd> -1 points</dd>
              <dt> Travelling some cells</dt>
              <dd> -1*(no. of cells travelled) points</dd>
              <dt> Eating a food</dt>
              <dd> 10 points</dd>
              <dt> Hitting a frozen ghost</dt>
              <dd> 100 points</dd>
              <dt> Winning the game</dt>
              <dd> 500 points</dd>
              <dt> Losing the game</dt>
              <dd> -500 points</dd>
            </dl>

          </ul>
          <p>
            As like last project, there are a no. of command line arguments that you can use, and most of them come with default values, as for here the default player agent is <span className="monospace">KeyboardAgent</span> and the default ghost agent is <span className="monospace">RandomGhostAgent</span>. If randomness if preventing you to debug, use the <span className="monospace">--fixSeed</span> flag. You can refer <span className="monospace">help.txt</span> for all options available.
          </p>
          <p>
            For this question, you will have to improve the <span className="monospace">ReflexAgent</span> by implementing the function <span className="monospace"> evaluation_function</span> in <span className="monospace">ReflexAgent</span> class of <span className="monospace">playerAgents.py</span>. A capable reflex agent will have to consider both food locations and ghost locations to perform well (if you want, you can consider freezers as well, but this is optional). We expect your reflex agent to win almost all of the times on <span className="monospace">testClassic.lay</span> layout:
            <div className="code-block">
              <span className="code">python3 platformers.py --playerAgent ReflexAgent --layout testClassic.lay</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>
          <p>
            You must be curious why reflex agent is performing so well! If you observe closely, the <span className="monospace">testClassic.lay</span> is biased towards player winning the game. You can run a number of games (say n) to see how the agent is performing using the <span className="monospace">--test n</span>:
            <div className="code-block">
              <span className="code">python3 platformers.py --playerAgent ReflexAgent --layout testClassic.lay --test 10 --noGraphics</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>
          <p>We will check your implementation on only few of the layouts which are biased to allow the player to win for majority times.
          You can check your solution with autograder:
            <div className="code-block">
              <span className="code">python3 autograder.py -q q1 --no-graphics</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>
        </section>

        <section id="q2" className="datablock">  
          <h3> Question 1: Warm Up Problem (1 point) </h3>  
          <p> After downloading and unzipping the code, navigate to the project directory. To start playing Platformers, enter the following command in your terminal:
            <div className="code-block">
              <span className="code">python3 platformers.py</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>
          <p>
            There are a no. of command line arguments that you can use, and most of them come with default values, as for here the default player agent is <span className="monospace">KeyboardAgent</span>. 
          </p>
          <p>
            <span className='important'>Important: </span>
            In this project, the player starts with a positive score, and the aim is to reach the goal state of all foods eaten in minimum total cost. It gets <span className = "bold">no extra points for eating foods</span>, but eating foods quickly does help in not loosing more points. The default cost function costs an amount equal to number of grid squares travelled during the action, and if action is "noop" then a cost of 1 is levied.
          </p>
          <p> The player has the actions and the key bindings as:
            <dl>
              <dt> noop </dt>
              <dd> No key is pressed. Player remains where it was.</dd>
              <dt> left </dt>
              <dd> Left arrow key. Player moves one unit left and then falls till it does not land on a ground block.</dd>
              <dt> right </dt>
              <dd> Right arrow key. Player moves one unit right and then falls till it does not land on a ground block.</dd>
              <dt> jump </dt>
              <dd> 'space' key. Player moves one unit up, then falls back to ground at its initial position, this action is only useful to collect food.</dd>
              <dt> long_jump_left </dt>
              <dd> 'a' key. Player moves one unit up and two units left and then falls till it does not land on a ground block.</dd>
              <dt> long_jump_right </dt>
              <dd> 'f' key. Player moves one unit up and two units right and then falls till it does not land on a ground block.</dd>
              <dt> short_jump_left </dt>
              <dd> 's' key. Player moves one unit up and one unit left and then falls till it does not land on a ground block.</dd>
              <dt> short_jump_right </dt>
              <dd> 'd' key. Player moves one unit up and one unit right and then falls till it does not land on a ground block.</dd>
            </dl>
          </p>
          <p>
            Only a subset of these actions may be legal for the player depending on its location. The aim of this problem is that you understand the Platformer actions well. To answer this problem, refer to method <span className="monospace">act</span> of class <span className="monospace">RandomAgent</span> in file <span className="monospace">Agents.py</span>. <span className="bold">Return a random action from list of possible actions</span>. We will run the game for 10 times and check that the actions are not deterministic. To check and debug your implementation, run: 
              <div className="code-block">
                <span className="code">python3 platformers.py --layout small_test1.lay --agent RandomAgent</span>
                <button className="copy-btn">
                  <i className="fas fa-copy"></i>
                  <i className="fas fa-check"></i>
                </button>
              </div>
          </p>
          <p>
            Tp run without graphics, you can use the <span className="monospace">--no-graphics</span> flag:
            <div className="code-block">
              <span className="code">python3 platformers.py --layout small_test1.lay --agent RandomAgent --no-graphics</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>
          <p>
            You can check your solution with autograder:
            <div className="code-block">
              <span className="code">python3 autograder.py -q q1 --no-graphics</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>
        </section>

        <section id="q3" className="datablock">  
          <h3> Question 1: Warm Up Problem (1 point) </h3>  
          <p> After downloading and unzipping the code, navigate to the project directory. To start playing Platformers, enter the following command in your terminal:
            <div className="code-block">
              <span className="code">python3 platformers.py</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>
          <p>
            There are a no. of command line arguments that you can use, and most of them come with default values, as for here the default player agent is <span className="monospace">KeyboardAgent</span>. 
          </p>
          <p>
            <span className='important'>Important: </span>
            In this project, the player starts with a positive score, and the aim is to reach the goal state of all foods eaten in minimum total cost. It gets <span className = "bold">no extra points for eating foods</span>, but eating foods quickly does help in not loosing more points. The default cost function costs an amount equal to number of grid squares travelled during the action, and if action is "noop" then a cost of 1 is levied.
          </p>
          <p> The player has the actions and the key bindings as:
            <dl>
              <dt> noop </dt>
              <dd> No key is pressed. Player remains where it was.</dd>
              <dt> left </dt>
              <dd> Left arrow key. Player moves one unit left and then falls till it does not land on a ground block.</dd>
              <dt> right </dt>
              <dd> Right arrow key. Player moves one unit right and then falls till it does not land on a ground block.</dd>
              <dt> jump </dt>
              <dd> 'space' key. Player moves one unit up, then falls back to ground at its initial position, this action is only useful to collect food.</dd>
              <dt> long_jump_left </dt>
              <dd> 'a' key. Player moves one unit up and two units left and then falls till it does not land on a ground block.</dd>
              <dt> long_jump_right </dt>
              <dd> 'f' key. Player moves one unit up and two units right and then falls till it does not land on a ground block.</dd>
              <dt> short_jump_left </dt>
              <dd> 's' key. Player moves one unit up and one unit left and then falls till it does not land on a ground block.</dd>
              <dt> short_jump_right </dt>
              <dd> 'd' key. Player moves one unit up and one unit right and then falls till it does not land on a ground block.</dd>
            </dl>
          </p>
          <p>
            Only a subset of these actions may be legal for the player depending on its location. The aim of this problem is that you understand the Platformer actions well. To answer this problem, refer to method <span className="monospace">act</span> of class <span className="monospace">RandomAgent</span> in file <span className="monospace">Agents.py</span>. <span className="bold">Return a random action from list of possible actions</span>. We will run the game for 10 times and check that the actions are not deterministic. To check and debug your implementation, run: 
              <div className="code-block">
                <span className="code">python3 platformers.py --layout small_test1.lay --agent RandomAgent</span>
                <button className="copy-btn">
                  <i className="fas fa-copy"></i>
                  <i className="fas fa-check"></i>
                </button>
              </div>
          </p>
          <p>
            Tp run without graphics, you can use the <span className="monospace">--no-graphics</span> flag:
            <div className="code-block">
              <span className="code">python3 platformers.py --layout small_test1.lay --agent RandomAgent --no-graphics</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>
          <p>
            You can check your solution with autograder:
            <div className="code-block">
              <span className="code">python3 autograder.py -q q1 --no-graphics</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>
        </section>

        <section id="q4" className="datablock">  
          <h3> Question 1: Warm Up Problem (1 point) </h3>  
          <p> After downloading and unzipping the code, navigate to the project directory. To start playing Platformers, enter the following command in your terminal:
            <div className="code-block">
              <span className="code">python3 platformers.py</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>
          <p>
            There are a no. of command line arguments that you can use, and most of them come with default values, as for here the default player agent is <span className="monospace">KeyboardAgent</span>. 
          </p>
          <p>
            <span className='important'>Important: </span>
            In this project, the player starts with a positive score, and the aim is to reach the goal state of all foods eaten in minimum total cost. It gets <span className = "bold">no extra points for eating foods</span>, but eating foods quickly does help in not loosing more points. The default cost function costs an amount equal to number of grid squares travelled during the action, and if action is "noop" then a cost of 1 is levied.
          </p>
          <p> The player has the actions and the key bindings as:
            <dl>
              <dt> noop </dt>
              <dd> No key is pressed. Player remains where it was.</dd>
              <dt> left </dt>
              <dd> Left arrow key. Player moves one unit left and then falls till it does not land on a ground block.</dd>
              <dt> right </dt>
              <dd> Right arrow key. Player moves one unit right and then falls till it does not land on a ground block.</dd>
              <dt> jump </dt>
              <dd> 'space' key. Player moves one unit up, then falls back to ground at its initial position, this action is only useful to collect food.</dd>
              <dt> long_jump_left </dt>
              <dd> 'a' key. Player moves one unit up and two units left and then falls till it does not land on a ground block.</dd>
              <dt> long_jump_right </dt>
              <dd> 'f' key. Player moves one unit up and two units right and then falls till it does not land on a ground block.</dd>
              <dt> short_jump_left </dt>
              <dd> 's' key. Player moves one unit up and one unit left and then falls till it does not land on a ground block.</dd>
              <dt> short_jump_right </dt>
              <dd> 'd' key. Player moves one unit up and one unit right and then falls till it does not land on a ground block.</dd>
            </dl>
          </p>
          <p>
            Only a subset of these actions may be legal for the player depending on its location. The aim of this problem is that you understand the Platformer actions well. To answer this problem, refer to method <span className="monospace">act</span> of class <span className="monospace">RandomAgent</span> in file <span className="monospace">Agents.py</span>. <span className="bold">Return a random action from list of possible actions</span>. We will run the game for 10 times and check that the actions are not deterministic. To check and debug your implementation, run: 
              <div className="code-block">
                <span className="code">python3 platformers.py --layout small_test1.lay --agent RandomAgent</span>
                <button className="copy-btn">
                  <i className="fas fa-copy"></i>
                  <i className="fas fa-check"></i>
                </button>
              </div>
          </p>
          <p>
            Tp run without graphics, you can use the <span className="monospace">--no-graphics</span> flag:
            <div className="code-block">
              <span className="code">python3 platformers.py --layout small_test1.lay --agent RandomAgent --no-graphics</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>
          <p>
            You can check your solution with autograder:
            <div className="code-block">
              <span className="code">python3 autograder.py -q q1 --no-graphics</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>
        </section>

        <section id="q5" className="datablock">  
          <h3> Question 1: Warm Up Problem (1 point) </h3>  
          <p> After downloading and unzipping the code, navigate to the project directory. To start playing Platformers, enter the following command in your terminal:
            <div className="code-block">
              <span className="code">python3 platformers.py</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>
          <p>
            There are a no. of command line arguments that you can use, and most of them come with default values, as for here the default player agent is <span className="monospace">KeyboardAgent</span>. 
          </p>
          <p>
            <span className='important'>Important: </span>
            In this project, the player starts with a positive score, and the aim is to reach the goal state of all foods eaten in minimum total cost. It gets <span className = "bold">no extra points for eating foods</span>, but eating foods quickly does help in not loosing more points. The default cost function costs an amount equal to number of grid squares travelled during the action, and if action is "noop" then a cost of 1 is levied.
          </p>
          <p> The player has the actions and the key bindings as:
            <dl>
              <dt> noop </dt>
              <dd> No key is pressed. Player remains where it was.</dd>
              <dt> left </dt>
              <dd> Left arrow key. Player moves one unit left and then falls till it does not land on a ground block.</dd>
              <dt> right </dt>
              <dd> Right arrow key. Player moves one unit right and then falls till it does not land on a ground block.</dd>
              <dt> jump </dt>
              <dd> 'space' key. Player moves one unit up, then falls back to ground at its initial position, this action is only useful to collect food.</dd>
              <dt> long_jump_left </dt>
              <dd> 'a' key. Player moves one unit up and two units left and then falls till it does not land on a ground block.</dd>
              <dt> long_jump_right </dt>
              <dd> 'f' key. Player moves one unit up and two units right and then falls till it does not land on a ground block.</dd>
              <dt> short_jump_left </dt>
              <dd> 's' key. Player moves one unit up and one unit left and then falls till it does not land on a ground block.</dd>
              <dt> short_jump_right </dt>
              <dd> 'd' key. Player moves one unit up and one unit right and then falls till it does not land on a ground block.</dd>
            </dl>
          </p>
          <p>
            Only a subset of these actions may be legal for the player depending on its location. The aim of this problem is that you understand the Platformer actions well. To answer this problem, refer to method <span className="monospace">act</span> of class <span className="monospace">RandomAgent</span> in file <span className="monospace">Agents.py</span>. <span className="bold">Return a random action from list of possible actions</span>. We will run the game for 10 times and check that the actions are not deterministic. To check and debug your implementation, run: 
              <div className="code-block">
                <span className="code">python3 platformers.py --layout small_test1.lay --agent RandomAgent</span>
                <button className="copy-btn">
                  <i className="fas fa-copy"></i>
                  <i className="fas fa-check"></i>
                </button>
              </div>
          </p>
          <p>
            Tp run without graphics, you can use the <span className="monospace">--no-graphics</span> flag:
            <div className="code-block">
              <span className="code">python3 platformers.py --layout small_test1.lay --agent RandomAgent --no-graphics</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>
          <p>
            You can check your solution with autograder:
            <div className="code-block">
              <span className="code">python3 autograder.py -q q1 --no-graphics</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>
        </section>
      </div>
      
      <section id="submission" className="datablock">  
        <h3> Submission </h3>  
        <p> Run the following command to see your full score:

        <div className="code-block">
          <span className="code">python3 autograder.py --no-graphics</span>
          <button className="copy-btn">
            <i className="fas fa-copy"></i>
            <i className="fas fa-check"></i>
          </button>
        </div>
      </p>
      </section>
    </div>
  );
};

export default Project2;
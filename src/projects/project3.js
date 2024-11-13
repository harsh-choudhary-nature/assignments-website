import React, { useEffect } from 'react';
import { projectsData } from '../data';
import './project3.css';

const Project3 = () => {

  const project = projectsData[2];
  
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
          <li> <a href="#q1">Q1: Value Iteration</a></li>   
          <li> <a href="#q2">Q2: Policy Iteration</a></li>  
          <li> <a href="#q3">Q3: Temporal Difference Q Learning</a></li>  
          <li> <a href="#q4">Q4: Epsilon Greedy</a></li>  
          <li> <a href="#q5">Q5: Approximate Q Learning</a></li>
          <li> <a href="#q6">Q6: Advanced Feature Extractor</a></li>
          <li> <a href="#submission">Submission</a></li>  
        </ul>  
      </section>
      
      <img src={project.gifUrl} alt={project.title} className="project-image" />
      
      <section id="introduction" className="datablock">  
        <h3> Introduction </h3>  
        <p> In this project, you will tackle two related but different game environments - <span className="bold">PlatformersMdp</span> and our usual <span className="bold">Platformers</span>. The two environments are different; the former has a well defined model, but the latter does not, so online learning algorithms are required. 
        </p>

        <p> This project provides an autograder that allows you to test your solutions on your local machine. You can run the autograder using the following command:
          <div className="code-block">
            <span className="code">python3 autograder.py --noGraphics</span>
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
          <dt>featureExtractor.py</dt>
          <dd>Contains functions to extract features from state, action pair.</dd>
          <dt>playerAgents.py</dt>
          <dd>Contains all the platformer agents of the game.</dd>
        </dl>
        <h4> Files you might want to look at: </h4>
        <dl>
          <dt>costFunctions.py</dt>
          <dd>Contains cost function to use for scoring the game.</dd>
          <dt>gameState.py</dt>
          <dd>Contains code for the game state that is used to progress the game.</dd>
          <dt>ghostAgents.py</dt>
          <dd>Contains all the ghost agents of the game.</dd>
          <dt>ghostDetails.py</dt>
          <dd>Contains informations that are tracked for a ghost player.</dd>
          <dt>help.txt</dt>
          <dd>Contains supported commands in platformers.py and autograder.py.</dd>
          <dt>mountainCar.py</dt>
          <dd>A gymnasium environment for viewing the applicability of Q Learning.</dd>
          <dt>playerDetails.py</dt>
          <dd>Contains informations that are tracked for a platformer player.</dd>
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
          <dt>ghostRules.py</dt>
          <dd>Contains the rules for the ghost player of the game.</dd>
          <dt>graphicsUtils.py</dt>
          <dd>Contains code for helping load game graphics.</dd>
          <dt>platformers.py</dt>
          <dd>Contains code for starting the game and parsing arguments.</dd>
          <dt>platformersMdp.py</dt>
          <dd>Contains code for single player MDP based game and model.</dd>
          <dt>player.py</dt>
          <dd>Contains code for animating the player when display is enabled.</dd>
          <dt>playerRules.py</dt>
          <dd>Contains the rules for the platformer player of the game.</dd>
          <dt>requirements.txt</dt>
          <dd>Contains the package versions for virtual environment.</dd>
        </dl>
        <p>
          <span className="important">Python Environment:</span> This project requires <span className="bold monospace">python3.10</span> (being specific, the source code used <span className="monospace">python3.10.12</span>). Navigate to the project directory. Make sure you have <span className="monospace">virtualenv</span> installed on your system. If not, run the command:
          <div className="code-block">
            <span className="code">pip3 install virtualenv</span>
            <button className="copy-btn">
              <i className="fas fa-copy"></i>
              <i className="fas fa-check"></i>
            </button>
          </div>
        </p>
        <p> To check if <span className="monospace">virtualenv</span> has been successfully installed or was installed already, run:
          <div className="code-block">
            <span className="code">python3 -m virtualenv --version</span>
            <button className="copy-btn">
              <i className="fas fa-copy"></i>
              <i className="fas fa-check"></i>
            </button>
          </div>
        </p>
        <p> If the installation of <span className="monospace">virtualenv</span> is successful, its version will be displayed!
        </p>
        <p> Create a Python virtual environment with virtualenv using <span className="monospace">python3</span> executable as the base(give the accessible path to the executable of python3 as argument to <span className="monospace">-p</span>):
          <div className="code-block">
            <span className="code">python3 -m virtualenv -p /usr/bin/python3 platformers_reinforcement_venv</span>
            <button className="copy-btn">
              <i className="fas fa-copy"></i>
              <i className="fas fa-check"></i>
            </button>
          </div>

        </p>
        <p> To activate the environment, run:
        </p>
        <ul>
          <li> 
            <p> Linux or Mac:
              <div className="code-block">
                <span className="code">source platformers_reinforcement_venv/bin/activate</span>
                <button className="copy-btn">
                  <i className="fas fa-copy"></i>
                  <i className="fas fa-check"></i>
                </button>
              </div>
            </p>
          </li>
          <li> 
            <p> Windows:
              <div className="code-block">
                <span className="code">.\platformers_reinforcement_venv\Scripts\activate</span>
                <button className="copy-btn">
                  <i className="fas fa-copy"></i>
                  <i className="fas fa-check"></i>
                </button>
              </div>
            </p>
          </li>

        </ul>
        <p>
          Install all the packages needed for this project by running:
          <div className="code-block">
            <span className="code">pip3 install -r requirements.txt</span>
            <button className="copy-btn">
              <i className="fas fa-copy"></i>
              <i className="fas fa-check"></i>
            </button>
          </div>
        </p>
        <p> You are now ready to get started with this project. To deactivate the environment, run:
          <div className="code-block">
            <span className="code">deactivate</span>
            <button className="copy-btn">
              <i className="fas fa-copy"></i>
              <i className="fas fa-check"></i>
            </button>
          </div>

        </p>
      </section>

      <div className="question">
        <section id="q1" className="datablock">  
          <h3> Question 1: Value Iteration (5 points) </h3>  
          <p> This and the next question are specific to <span className="bold">MDP</span> version of Platformers. The rules and conditions in this version of game are different. Note the following:-
          </p>
          <ul>
            <li> The world has some blue pellets, these are the Platformer <span className="bold">space stations</span>. The platformer can stick to it and stay in the air.
            </li>
            <li> There are no ghosts in the game.
            </li>
            <li> There are 5 actions for the player: <span className="bold">left</span> (left arrow key), <span className="bold">right</span> (right arrow key), <span className="bold">up</span> (up arrow key), <span className="bold">down</span> (down arrow key) and <span className="bold">noop</span>.
            </li>
            <li> The player cannot take 'up' action unless the next cell has a space station. Thus, there is no flying in this version, but falling is still possible.
            </li>
            <li> The goal of the game is to reach good terminal state. The states indicating <span className="bold">saw</span> are bad terminal states and the ones with <span className="bold">trophy</span> are good. The animating trophy has better rewards than the static one.
            </li>
            <li> The actions are not deterministic; when you take a valid action, the action is unaltered with <span className="bold">1-noise</span> probability, and is turned into a random action with <span className="bold">noise</span> probability by the environment.
            </li>
            <li> The only dynamic part of game is the player's position and it is thus enough to only keep track of <span className="bold">Platformer position</span> in the state information. The living reward may be +ve, -ve or 0. The goal is to come up with a policy in order to <span className="bold">maximise long term rewards</span>.
            </li>
          </ul>
          <p>
          To start playing PlatformersMdp, enter the following command in your terminal:
            <div className="code-block">
              <span className="code">python3 platformersMdp.py</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>
          <p>
            You can control the amount of noise using <span className="monospace">--noise</span> parameter, living reward with <span className="monospace">--livingReward</span> argument:
            <div className="code-block">
              <span className="code">python3 platformersMdp.py --noise 0.5 --livingReward -0.25</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>
          <p>
            There are a no. of other command line arguments which you can view using:
            <div className="code-block">
              <span className="code">python3 platformersMdp.py -h</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>
          <p>
            For this question, you will have to implement the <span className="monospace">ValueIteartionAgent</span> class in <span className="monospace">playerAgents.py</span>. As always, the <span className="monospace">act</span> method will be called, which calls <span className="monospace bold">self.run_value_iteration(problem)</span>, <span className="monospace bold">self.populate_q_values(problem)</span> and <span className="monospace bold">self.populate_policy(problem)</span> methods and your task is to implement all of these, Make sure the required data structures are populated as mentioned in the comments of this class. Test your implementation with:
            <div className="code-block">
              <span className="code">python3 platformersMdp.py --noise 0.5 --livingReward -0.1 --verbose --agent ValueIterationAgent</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>
          <p>
            The arrows show the policy directly from <span className="monospace">self.policy</span>. Remeber the following points:
          </p>
          <ul>
            <li><span className="bold">Do not</span> alter the call to <span className="monospace bold">problem.register_values(self.values, k)</span> as this is needed by the autograder.
            </li>
            <li> Calling <span className="monospace">problem.get_actions(state)</span> on a terminal state is illegal.
            </li>
            <li>Terminal states have no entry in the Q Table, but <span className="monospace">self.values</span> must assign 0 value to them and <span className="monospace">self.policy</span> must say <span className="monospace">None</span> for all <span className="bold">terminal states</span>.
            </li>
            <li>  Each call to <span className="monospace">act</span> is limited by time of 4s.
            </li>
            <li>  Do not break early on convergence, though you can check for it.
            </li>
          </ul>

          <p>To check your solution, run:
            <div className="code-block">
              <span className="code">python3 autograder.py -q q1 --noGraphics</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>
        </section>

        <section id="q2" className="datablock">  
          <h3> Question 2: Policy Iteration (5 points) </h3>  
          <p> You will now implement <span className='monospace'>PolicyIterationAgent</span> class in <span className='monospace'>playerAgents.py</span>. You may find it helpful to implement the <span className='monospace bold'>policy_evaluation(self, policy, problem)</span> method to use later. You must implement <span className='monospace bold'>run_policy_iteration(self, problem)</span>, <span className='monospace bold'>populate_values(self, problem)</span> and <span className='monospace bold'>populate_q_values(self, problem)</span> methods of this class and ensure required data structures are populated appropriately.
          </p>

          <p> If you are checking for convergence, you will notice that policies converge much faster than values. Try your Policy Iteration agent on (it should give exactly same results as Value Iteration agent):
            <div className="code-block">
              <span className="code">python3 platformersMdp.py --noise 0.5 --livingReward -0.1 --verbose --agent PolicyIterationAgent</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>

          <p> For a correct implementation of policy iteration that is compatible with autograder, you must take a note of the following:
          </p>
          <ul>
            <li> Policy iteration is <span className='bold'>sensitive to initialisation</span>, especially if some states give equal long term values. Thus, initialize the policies using <span className='monospace bold'>self.rng</span> only, in order to remain in sync with the autograder's <span className='bold'>fix seed</span>.
            </li>
            <li> Do not alter the call to <span className='monospace'>problem.register_policy(self.policy, k)</span> as this is needed by the autograder.
            </li>
            <li> Calling <span className='monospace'>problem.get_actions(state)</span> on a terminal state is illegal.
            </li>
            <li> Terminal states have no entry in the Q Table, but <span className='monospace'>self.values</span> must assign 0 value to them and <span className='monospace'>self.policy</span> must say <span className='monospace'>None</span> for all <span className='bold'>terminal states</span>.
            </li>
            <li> Each call to <span className="monospace">act</span> is limited by time of 4s.
            </li>
            <li>  Do not break early on convergence, though you can check for it.
            </li>
          </ul>
          <p>
            You can check your solution with autograder:
            <div className="code-block">
              <span className="code">python3 autograder.py -q q2 --noGraphics</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>
        </section>

        <section id="q3" className="datablock">  
          <h3> Question 3: Temporal Difference Q Learning (5 points) </h3>  
          <p>From this question onwards, we will be exploring <span className="bold">Reinforcement Learning</span> framework. These algorithms do not require a model, hence we will apply these on both <span className="bold">Platformers</span> and <span className="bold">PlatformersMdp</span> games. You must keep in mind that the <span className="bold">state</span> in PlatformersMdp is a <span className="bold">tuple</span> that captures the current player position, whereas state for a Platformers game is a <span className="bold monospace">GameState</span> object (hashable) that captures the current board configuration of the game.
          </p>
          <p> You have to implement the <span className="monospace">TDQLearningAgent</span> class in <span className="monospace">playerAgents.py</span>. This is a <span className="bold">Q Learning</span> agent that uses online <span className="bold">Temporal Difference</span> methods. Implement the <span className="monospace bold">act</span>, <span className="monospace bold">get_q_value</span>, <span className="monospace bold">observe_transition</span> methods of this class. You may <span className="bold">optionally</span> maintain and update <span className="monospace">self.policy</span> too which will let you see the policies in display for <span className="monospace">PlatformersMdp</span> problem.
          </p>
          <p> The <span className="bold">time limit</span> for each call to <span className="monospace">act</span> and <span className="monospace">observe_transition</span> is 1s. The following are the goals of these methods:
          </p>
          <dl>
            <dt><span className="monospace bold">act</span></dt>
            <dd>Chooses the best action based on the q values so far for the state.</dd>
            <dt><span className="monospace bold">get_q_value</span></dt>
            <dd>Returns the q value associated with state action pair. If the entry does not exist for a pair, return 0.</dd>
            <dt><span className="monospace bold">observe_transition</span></dt>
            <dd>Updates the Q Value using the temporal difference equation.</dd>
          </dl>
          <p> Keep the following points in mind:
          </p>

          <ul>  
            <li> Calling <span className="monospace">problem.get_actions(state)</span> on a terminal state is illegal.
            </li>
            <li> Terminal states have no entry in the Q Table but <span className="monospace">self.policy</span> (if maintained) shall say None for all terminal states.
            </li>
          </ul>
          <p> Follow the comments to understand and maintain the data structures for correct coordination with the autograder. Try running the following to visulaise your implementation:
            <div className="code-block">
              <span className="code">python3 platformers.py --layout smallTest.lay --playerAgent TDQLearningAgent --train 20 --test 1 --noTrainGraphics</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>
          <p> On this layout, it is possible to view the training in graphics. Just run:
            <div className="code-block">
              <span className="code">python3 platformers.py --layout smallTest.lay --playerAgent TDQLearningAgent --train 20</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>
          <p>
            Did you notice that once the player learns the correct winning startegy, it keeps on following it. The usual Q Learning does not cater to changing environments. This will be fixed in Epsilon Greedy Q Learning. Test your implementation with the autograder as:
            <div className="code-block">
              <span className="code">python3 autograder.py -q q3 --noGraphics</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>
        </section>

        <section id="q4" className="datablock">  
          <h3> Question 4: Epsilon Greedy (1 point) </h3>  
          <p> Now you have to implement <span className="monospace">EpsilonGreedyQAgent</span> class in <span className="monospace">playerAgents.py</span>. You will notice this inherits from <span className="monospace">TDQLearningAgent</span> class. Only the <span className="monospace">act</span> method has to be overridden. Use <span className="monospace">self.rng.random()</span> to draw a random no., and take a random action with <span className="monospace">self.epsilon</span> probability, other wise return the best action so far based on Q Table. Just like before, calling <span className="monospace">problem.get_actions(0, state)</span> for terminal states is not allowed, and the time limit per call to <span className="monospace">act</span> is 1s.
          </p>
          <p> Run your agent on a slightly larger board with more foods:
            <div className="code-block">
              <span className="code">python3 platformers.py --playerAgent EpsilonGreedyQAgent --layout simplified.lay --train 2500 --test 1 --noTrainGraphics --ghostAgent DirectionalGhostAgent --epsilon 0.4 --fixSeed 0</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>
          <p> You can also view the performance of your agent on <span className="bold">PlatformersMdp</span> game.
            <div className="code-block">
              <span className="code">python3 platformersMdp.py --agent EpsilonGreedyQAgent --train 2000 --test 1 --noTrainGraphics --fixSeed 0 --noise 0.6 --epsilon 0.4 --alpha 0.1 --fixSeed 0</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>

          <p> All the implementations so far are general enough to apply this to <span className="bold">MountainCar</span> problem (<i>Gymnasium</i> offers this and many other environments to test RL algorithms). The objective is to find optimal combination of acceleration with position and velocity in order to move the car on top of hill. The continuous state space is discretized by dividing it into bins, and actions are discrete- <span className="bold">accelerate left</span>, <span className="bold">stop</span> or <span className="bold">accelerate right</span>. The learning is enhanced by decaying the epsilon value over the training phase. Test with different increasing values for <span className="monospace">--train</span> to witness how an untrained agent does not perform well. With 1000 training epsiodes, the agent shall work alright:
            <div className="code-block">
              <span className="code">python3 mountainCar.py --epsilon 1 --discount 0.9 --alpha 0.9 --noTrainGraphics --train 1000 --test 1</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>
          <p>
            You can check your solution with autograder:
            <div className="code-block">
              <span className="code">python3 autograder.py -q q4 --noGraphics</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>
        </section>

        <section id="q5" className="datablock">  
          <h3> Question 5: Approximate Q Learning (5 points) </h3>  
          <p> With usual Q Learning on Platformers game, you must have realised it is memory intensive as each of the state action pair is memorized. The no. of states can be huge. Not only is the space reuirement massive, the no. of episodes it needs to learn well is impractical. Try this layout with <span className="monospace">EpsilonGreedyQAgent</span>:
            <div className="code-block">
              <span className="code">python3 platformers.py --train 1000 --fixSeed 0 --layout forward.lay --playerAgent EpsilonGreedyQAgent --noTrainGraphics --test 1 --epsilon 0.5 --discount 0.999 --alpha 0.5</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>
          <p>
            The player acts naively, because the exploration was insufficient during training. Now is the time to extract useful features from game state and learn the weights for those features. You will implement the <span className="monospace">ApproximateQLearningAgent</span> class in <span className="monospace">playerAgents.py</span>. Implement the <span className="monospace bold">act</span>, <span className="monospace bold">get_q_value</span> and <span className="monospace bold">observe_transition</span> methods of this class. As before, calling <span className="monospace">problem.get_actions(0, state)</span> on terminal states is incorrect. Also, each call to <span className="monospace">act</span> and <span className="monospace">observe_transition</span> has a time limit of 1s. The <span className="monospace">observe_transition</span> updates <span className="monospace">self.weights</span> now. 
          </p>
          <p>
            The <span className="monospace">simple_feature_extractor</span> is already implemented for you. Follow along the comments in file to complete all methods of <span className="monospace">ApproximateQLearningAgent</span>. You can see the performance of Platformer using approximate Q Learning algorithm: 
            <div className="code-block">
              <span className="code">python3 platformers.py --train 1000 --fixSeed 0 --layout forward.lay --playerAgent ApproximateQLearningAgent --noTrainGraphics --test 1 --epsilon 0.5 --discount 0.999 --alpha 0.5 --featureExtractor simple_feature_extractor</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>
          <p> 
             The default feature extractor is <span className="monospace">IdentityExtractor</span> which does nothing interesting, just makes every other (state, action) pair as a new feature. All the feature extractors are defined in <span className="monospace">featureExtractor.py</span>.
          </p>
          
          <p> You can check your implementation using:
            You can check your solution with autograder:
            <div className="code-block">
              <span className="code">python3 autograder.py -q q5 --noGraphics</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>
        </section>

        <section id="q6" className="datablock">  
          <h3> Question 6: Advanced Feature Extractor (4 points) </h3>  
          <p> The already implemented <span className="monospace">simple_feature_extractor</span> works well, but there are several aspects of game state it does not account for. You are expected to implement the <span className="monospace">advanced_feature_extractor</span> function of <span className="monospace">featureExtractor.py</span>.
          </p>
          <p>
            The following points will let you create the feature extractor easily:-
          </p>
          <ul>
            <li> Time limit per call to act is <span className="bold">1s</span>, so do not perform heavy calculations in feature extractor.
            </li>
            <li> Use the cache effectively to avoid redundant calculations (otherwise the training would take long time).
            </li> 
            <li> For scoring well, you need to account for killing the ghost, eating freezers etc. as well effectively.
            </li>
            <li> Features are preferably strings, though other hashable types are allowed. If using strings, make sure not to use the characters <span className="bold">(</span>, <span className="bold">)</span>, <span className="bold">'</span>, <span className="bold">:</span> as these are used as delimiters by autograder. 
            </li>
          </ul>
          <p> We will run your extractor on <span className="monospace bold">forward.lay</span> 20 times and we shall follow the following <span className="bold">grading scheme</span>:-</p>

          <table className = "styled-table">
            <thead>
              <tr>
                <th>No. of games won</th>
                <th>Marks</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>&lt;12</td>
                <td>0</td>
              </tr>
              <tr>
                <td>&ge;12 and &le;20</td>
                <td>
                  <table class= "nested-table">
                    <thead>
                      <tr>
                        <th>Average of top 5</th>
                        <th>Marks</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>&lt;600</td>
                        <td>1</td>
                      </tr>  
                      <tr>
                        <td>&ge;600 and &lt;720</td>
                        <td>2</td>
                      </tr>   
                      <tr>
                        <td>&ge;720 and &lt;780</td>
                        <td>3</td>
                      </tr>  
                      <tr>
                        <td>&ge;780</td>
                        <td>4</td>
                      </tr>   
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          
          <p>Since you need greater than 780 points on average in top 5 games, <span className="bold">hitting an inactive ghost</span> once or twice becomes quite essential. To visulaise and debug, use:
            <div className="code-block">
              <span className="code">python3 platformers.py --train 1000 --fixSeed 0 --layout forward.lay --playerAgent ApproximateQLearningAgent --noTrainGraphics --test 20 --epsilon 0.5 --discount 0.999 --alpha 0.5 --featureExtractor advanced_feature_extractor</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>
          <p>
            You can check your solution with autograder:
            <div className="code-block">
              <span className="code">python3 autograder.py -q q6 --noGraphics</span>
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
          <span className="code">python3 autograder.py --noGraphics</span>
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

export default Project3;

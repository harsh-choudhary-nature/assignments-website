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
          <li> <a href="#q5">Q5: Faster Expectimax</a></li>
          <li> <a href="#q6">Q6: Better Evaluation Function</a></li>
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
          <dt>evaluationFunctions.py</dt>
          <dd>Contains evaluation function to use for evaluating a game state.</dd>
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
          <dt>player.py</dt>
          <dd>Contains code for animating the player when display is enabled.</dd>
          <dt>playerRules.py</dt>
          <dd>Contains the rules for the platformer player of the game.</dd>
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
            To play an adversarial version, enter the following command in your terminal to use <span className="monospace bold">DirectionalGhostAgent</span> (they take the action towards the player with probability <span className="monospace bold">1 - epsilon</span>, and random action with <span className="monospace bold">epsilon</span> probability; <span className="monospace bold">epsilon</span> is <span className="bold">0.2</span> by default, and you can set it using <span className="monospace bold">--epsilon</span> argument):
            <div className="code-block">
              <span className="code">python3 platformers.py --ghostAgent DirectionalGhostAgent</span>
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
            The ghosts have roughly got the same set of rules and actions as the Platformer itself (<span className="bold">except 'noop' and 'jump'</span> actions, as these two actions <span className="bold">never change the position</span> of the agent, and jump was only important to eat some food dot, which makes it worthless for the ghosts). 
            </li>
            <li>You will also see some <span className="bold">black animating dots</span>; these are the <span className = "bold">freezers</span> eating which offers no extra points to the player but freezes the ghosts for a fixed time duration. You can <span className="bold">hit a frozen ghost</span> which will send it all the way to its initial position, and we say that the <span className="bold">ghost is reborn</span>.
            </li>
            <li>If player <span className="bold">hits the ghost anywhere in the traced path</span> where ghost is in <span className="bold">landed position</span> and <span className="bold">active (not frozen)</span>, or if the ghost acts and hits the player, <span className="bold">the player is killed</span> (given the goal of eating all the foods is not yet achieved). However, sky is for all, so <span className="bold">collision rules do not apply</span> when both ghost and player are <span className="bold">in sky</span>.
            </li>
            <li> Each of the player agents have got an <span className="monospace bold">act</span> method. It takes the agent index <span className="bold">(0 for player and numbered successively for ghosts)</span>, current game state, and problem instance as the argument, and must return the action the player intends to perform from the current game state.

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
              <dt> Ghost actions</dt>
              <dd> 0 points</dd>

            </dl>

          </ul>
          <p>
            As like last project, there are a no. of command line arguments that you can use, and most of them come with default values, as for here the default player agent is <span className="monospace bold">KeyboardAgent</span> and the default ghost agent is <span className="monospace bold">RandomGhostAgent</span>. If randomness if preventing you to debug, use the <span className="monospace bold">--fixSeed seed</span> option, <span className="monospace bold">0&le;seed&lt;2**32</span>. You can refer <span className="monospace bold">help.txt</span> for all options available.
          </p>
          <p>
            For this question, you will have to implement the <span className="monospace bold">act</span> method of <span className="monospace bold">ReflexAgent</span> class in <span className="monospace bold">playerAgents.py</span>. A reflex agent choses the action that gives it the <span className="bold">maximum immediate evaluation</span>. Thus, you also need to implement the function <span className="monospace bold"> evaluation_function</span> in <span className="monospace bold">ReflexAgent</span> class of <span className="monospace bold">playerAgents.py</span>. This function assigns a numeric value to (state, action) pair indicating how beneficial the given action is for the current game state. A capable reflex agent will have to consider both food locations and ghost locations to perform well (if you want, you can consider freezers as well, but this is optional). Follow the comments given in <span className="monospace bold">playerAgents.py</span> for <span className="monospace bold">ReflexAgent</span> class to successfully finish this question. We expect your reflex agent to win almost all of the times on <span className="monospace bold">testClassic.lay</span> layout:
            <div className="code-block">
              <span className="code">python3 platformers.py --playerAgent ReflexAgent --layout testClassic.lay</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>
          <p>
            You must be curious why reflex agent is performing so well! If you observe closely, the <span className="monospace bold">testClassic.lay</span> is biased towards player winning the game. You can run a number of games (say n) to see how the agent is performing using the <span className="monospace bold">--test n</span>:
            <div className="code-block">
              <span className="code">python3 platformers.py --playerAgent ReflexAgent --layout testClassic.lay --test 10 --noGraphics</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>

          <p> <span className="important">Note:</span> It is advised to use <span className="monospace bold">self.rng</span> as the random number generator, if you need to. It is internally initialized as <span className="monospace bold">np.random.default_rng(seed = args['fix_seed'])</span> and would thus work appropriately to any seed value that you or the autograder uses.
          </p>

          <p>We will check your implementation on only few of the layouts which are biased to allow the player to win for majority times. Note that there is a <span class = "bold">time limit of 0.5s </span> for each call to <span className="monospace bold">act</span> method, so make sure to keep the time taken inside <span className="monospace bold">evaluation_function</span> controlled. The exact <span class = "bold">grading scheme</span> will be printed on terminal window for each of the layouts:
            You can check your solution with autograder:
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
          <h3> Question 2: Minimax (5 points) </h3>  
          <p> Your task is to design a <span className='monospace bold'>MinimaxAgent</span>. The minimax algorithm that you implement should be more general in the sense that it should work for <span className="bold">any no. of min agents</span>, and to <span className="bold">any depth</span>. Navigate to <span className='monospace bold'>MinimaxAgent</span> class of <span className='monospace bold'>playerAgents.py</span> and implement the <span className='monospace bold'>act</span> method. It should return the best action for the player agent after as per the minimax algorithm. Implement this method, keeping in mind the following points:-
          </p>
          <ul>
            <li> <span class="bold">Do not</span> make recursive calls to <span className='monospace bold'>act</span> method itself. <span className='monospace bold'>act</span> should never be called by student's code as we use it to track the generated states count, and any extra call will break its consistency with the autograder. Rather create a nested function or another function to apply Minimax and call that from <span className='monospace bold'>act</span> method.
            </li>
            <li> The minimax algorithm should check for when <span className='monospace bold'>self.depth</span> is reached and must use <span className='monospace bold'>self.evaluation_function</span> to evaluate the state and return. This evaluation function <span class="bold">evaluates the state and not (state, action) pair</span>. The default evaluation function is <span className='monospace bold'>score_evaluation_function</span> defined in <span className='monospace bold'>evaluationFunctions.py</span>. One game ply consists of player followed by all ghosts acting. The default value for <span className='monospace bold'>self.depth</span> is 2, and can be overridden with depth k using <span className='monospace bold'>--depth k</span> option.
            <br/>
              <span className="bold">Important</span>: All the evaluation functions are defined in <span className='monospace bold'>evaluationFunctions.py</span>. These take game state, problem instance (and optionally a helper dictionary to memoize results) as arguments, and returns the evaluation of the game state.
            </li>
            <li> One call to <span className='monospace bold'>problem.get_next_game_state(agent_index, cur_game_state, action)</span> <span class="bold">increases the generated states count in the search tree by 1</span>, so make sure you do not make any extra or less calls to this function in your code implementation.
            </li>
            <li>  Iterate through the actions in <span class="bold">same order</span> as is returned by <span className='monospace bold'>problem.get_actions(agent_index, cur_game_state)</span> and only update the best tracked value with a value from new action on <span className="bold">strict inequality</span>. This is needed to ensure correctness with the autograder.
            </li>
            <li> If you get <span className="bold">time limit exceeded</span>, try running without putting any extra print statements inside recursive calls. Any depth greater than 2 will likely exceed the time limit of <span className="bold">0.5s</span>, and so autograder will use <span className="bold">depth 2</span> only.
            </li>
          </ul>
          <p>
            Follow the comments in <span className="monospace bold">act</span> method of class <span className="monospace bold">MinimaxAgent</span> in file <span className="monospace bold">playerAgents.py</span>. To check and debug your implementation, run: 
              <div className="code-block">
                <span className="code">python3 platformers.py --layout sureWin.lay --playerAgent MinimaxAgent</span>
                <button className="copy-btn">
                  <i className="fas fa-copy"></i>
                  <i className="fas fa-check"></i>
                </button>
              </div>
          </p>
          <p> The <span className="monospace bold">RandomGhostAgent</span> extends the game longer, so use <span className="monospace bold">DirectionalGhostAgent</span> instead:
            <div className="code-block">
                <span className="code">python3 platformers.py --layout sureWin.lay --playerAgent MinimaxAgent --ghostAgent DirectionalGhostAgent</span>
                <button className="copy-btn">
                  <i className="fas fa-copy"></i>
                  <i className="fas fa-check"></i>
                </button>
              </div>
          </p>
          <p>
            With minimax, if the player is trapped, it bumps into the nearest ghost due to a constant penalty for living. It has no idea the ghost may not act optimally. Try running:
            <div className="code-block">
              <span className="code">python3 platformers.py --layout narrowFall.lay --playerAgent MinimaxAgent</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>
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
          <p> A correct implementation of Minimax will lead to losing some of the games, which is perfectly alright.
          </p>
        </section>

        <section id="q3" className="datablock">  
          <h3> Question 3: Alpha Beta Agent (5 points) </h3>  
          <p><span className="monospace bold">sureWinWithFoods.lay</span> is a very favorable layout for rational agents, but a depth 2 search may lead to player agent getting trapped. Try this to find out how often the player agent wins:
            <div className="code-block">
              <span className="code">python3 platformers.py --layout sureWinWithFoods.lay --playerAgent MinimaxAgent --depth 2 --test 10 --noGraphics --fixSeed 0</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>
          <p> Try <span className="monospace bold">MinimaxAgent</span> on <span className="monospace bold">sureWinWithFoods.lay</span> layout with depth 4:
            <div className="code-block">
              <span className="code">python3 platformers.py --layout sureWinWithFoods.lay --playerAgent MinimaxAgent --depth 4 --fixSeed 0</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>
          <p> Did the agent timed out? Now is the time to improve <span className="monospace bold">MinimaxAgent</span> with <span className = "bold">alpha- beta pruning</span>. Implement the <span className="monospace bold">act</span> method of <span className="monospace bold">AlphaBetaAgent</span> class in <span className="monospace bold">playerAgents.py</span>. This should allow the player to simulate the game till <span className="bold">depth 4</span>. Try this command to view the game:
            <div className="code-block">
              <span className="code">python3 platformers.py --layout sureWinWithFoods.lay --playerAgent AlphaBetaAgent --depth 4 --fixSeed 0</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>
          <p>
            <span className='important'>Important: </span>
            If you still get <span className='bold'>time limit exceeded</span>, make sure you have not put any <span className='bold'>print</span> statements inside your recursive method.
          </p>
          <p> Check how often the player wins with depth 4 search:
            <div className="code-block">
              <span className="code">python3 platformers.py --layout sureWinWithFoods.lay --playerAgent AlphaBetaAgent --depth 4 --fixSeed 0 --test 10 --noGraphics</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>
          <p>
            <span className="important">Note:</span> You must <span className="bold">not prune on equality</span> in order to be compatible with autograder. Use the pseudocode discussed in the lecture to implement this function.
          </p>
          <p>
            You can check your solution with autograder:
            <div className="code-block">
              <span className="code">python3 autograder.py -q q3 --noGraphics</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>
          <p> A correct implementation of Minimax will lead to losing some of the games, which is perfectly alright.
          </p>
        </section>

        <section id="q4" className="datablock">  
          <h3> Question 4: Expectimax (5 points) </h3>  
          <p> As you notice from previous questions, <span className="monospace bold">MinimaxAgent</span> assumes that the ghost acts optimally, which is seldom true. The default ghost agent is <span className="monospace bold">RandomGhostAgent</span>, which takes a random action, so we now build agents that make use of this knowledge about the ghost behavior. Implement the <span className="monospace bold">act</span> method of <span className="monospace bold">ExpectimaxAgent</span> class in <span className="monospace bold">playerAgents.py</span>. Test this on <span className="monospace bold">narrowFall.lay</span> and contrast it with how <span className="monospace bold">MinimaxAgent</span> performed in <span className="monospace bold">question 2</span>.
            <div className="code-block">
              <span className="code">python3 platformers.py --layout narrowFall.lay --playerAgent ExpectimaxAgent</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>
          <p> Now even if the platformer is trapped, it tries to escape and eat foods, as the platformer now models the ghost agent as random and not perfectly agnostic. Run a no. of games to convince yourself that <span className="monospace bold">ExpectimaxAgent</span> is indeed the right choice here.
            <div className="code-block">
              <span className="code">python3 platformers.py --layout narrowFall.lay --playerAgent ExpectimaxAgent --test 10 --noGraphics</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>
          <p> You should find that your <span className="monospace bold">ExpectimaxAgent</span> wins for majority times, while your <span className="monospace bold">AlphaBetaAgent</span> and <span className="monospace bold">MinimaxAgent</span>  always loses.
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
          <h3> Question 5: Faster Expectimax (1 point) </h3>  
          <p> The pruning of game tree is unfortunately not possible with <span className="monospace bold">ExpectimaxAgent</span> as <span className="bold">values from all of the branches of min agent</span> are required in order to take expectation over them. This makes the expectimax agent very slow. Try this layout that uses two ghosts:
            <div className="code-block">
              <span className="code">python3 platformers.py --layout ghostSimple.lay --playerAgent ExpectimaxAgent --ghostAgent DirectionalGhostAgent --epsilon 0.2 --fixSeed 0</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>
          <p>
            If you are on a faster computer the lag may not be evident to you, but the no. of generated states in the game tree will make it evident that some computations were wasteful. In this question, you will be using the concept of <span className = "bold">memoization</span> to avoid repeated computations. The motivation comes from the following: 
          </p>
          <ul>
            <li> The state that results after player takes <span className="monospace bold">noop</span> in first ply and <span className="monospace bold">jump</span> in second ply is exactly the same as taking <span className="monospace bold">jump</span> in first ply and <span className="monospace bold">noop</span> in the second. In this way there are a no. of <span className = "bold">repeated game states</span> that result, and calling recursive method on these repetitions result in <span className = "bold">recalculation of that entire subtree</span>. However, to ensure correctness of expectimax, the <span className="bold">uniqueness of state alone is not sufficient</span>, the triple <span className="bold">(agent_index, game_state, depth)</span> together determines the output of one function call to expectimax.
            </li>
            <li> The objects of classes in python are <span className="bold">unhashable</span> by default, however, we have defined <span className="monospace bold">__hash__()</span> and <span className="monospace bold">__eq__()</span> methods of <span className="monospace bold">GameState</span> class, so you can use a dictionary to cache the results.
            </li>
          </ul>
          <p>
            Implement the <span className="monospace bold">act</span> method of <span className="monospace bold">ExpectimaxAgentWithCache</span> class in <span className="monospace bold">playerAgents.py</span>. You should ensure that the triple <span className="bold monospace">(agent_index, cur_game_state, cur_depth)</span> is expanded exactly once (ideally it should be generated exactly once, but to check for repeated game state you must generate it using <span className="monospace bold">problem.get_next_game_state(agent_index, cur_game_state, action)</span>, so we do not compare on generation but on expansion). That means if <span className="monospace bold">(agent_index, cur_game_state, cur_depth)</span> has been previously encountered in expectimax, use the value from the previous computation itself as expectimax is a function of exactly these three parameters, which have not changed (<span className="monospace bold">problem</span> is just to provide an interface for some helpful function calls).
          </p>
          <p> 
             The autograder will check both actions and no. of expanded triples. Remember that <span className="bold">the actions should match exactly as what the usual expectimax wiould give</span> but expanded states here should be lesser or equal to what usual expectimax would expand. You can use the <span className="monospace bold">self.cache</span> for memoization (provided in <span className="monospace bold">__init__</span> constructor).
          </p>
          <p>
            Run the same game with this agent and you shall see an improved runtime performance:
            <div className="code-block">
              <span className="code">python3 platformers.py --layout ghostSimple.lay --playerAgent ExpectimaxAgentWithCache --ghostAgent DirectionalGhostAgent --epsilon 0.2 --fixSeed 0</span>
              <button className="copy-btn">
                <i className="fas fa-copy"></i>
                <i className="fas fa-check"></i>
              </button>
            </div>
          </p>
          <p> The no. of expanded states dropped from <span className = "bold">8844</span> to <span className = "bold">3831</span>.
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
          <h3> Question 6: Better Evaluation Function (6 points) </h3>  
          <p> There are several issues with the default evaluation function, in the sense that it does not take advantage of the fact that one action may move it closer to the food, other perhaps closer to the ghost and so on. It simply returns the <span className="bold">score received</span> so far. This question expects you to be creative. You will design an entire player agent, called <span className="monospace bold">CreativeAgent</span>.
          </p>
          <p>
            Implement the <span className="monospace bold">act</span> method as per your choice, either using <span className="monospace bold">AlphaBetaAgent</span> design or <span className="monospace bold">ExpectimaxAgentWithCache</span> idea, or something even cleverer. Just keep in mind the following:-
          </p>
          <ul>
            <li> Time limit per call to act is <span className="bold">0.5s</span>.
            </li>
            <li><span className="monospace bold">self.evaluation_function</span> redirects to <span className="monospace bold">better_evaluation_function(game_state, problem, helper_cache = None)</span> in <span className="monospace bold">evaluationFunctions.py</span>, so <span className="bold">write your logic there</span>. The <span className="monospace bold">helper_cache</span> may also be helpful in caching some results specific to evaluation of specific game states. (Some hints provided there to guide you)
            </li>
            <li>The ghost agents will be <span className="monospace bold">DirectionalGhostAgent</span> with <span className="monospace bold">epsilon</span> of 0.5. This may let you decide on the algorithm to use in <span className="monospace bold">act</span> method of <span className="monospace bold">CreativeAgent</span> class in <span className="monospace bold">playerAgents.py</span>, and you have to implement this function also.
            </li>
            <li>Use <span className="monospace bold">self.evaluation_cache</span> to pass to evaluation function some additional informations like depth (if you want) and <span className="monospace bold">self.cache</span> to memoize recursive calls (again, if you want), or you may define your custom data structures if you do not want to use these, but make sure to manage all the things keeping in mind the above three points.
            </li>
          </ul>
          <p> We will run your game on <span className="monospace bold">mediumClassic.lay</span> 10 times and we shall follow the following <span className="bold">grading scheme</span>:-</p>

          <table className = "styled-table">
            <thead>
              <tr>
                <th>No. of games won</th>
                <th>Marks</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>&lt;5</td>
                <td>0</td>
              </tr>
              <tr>
                <td>&ge;5 and &le;10</td>
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
                        <td>&lt;500</td>
                        <td>3</td>
                      </tr>  
                      <tr>
                        <td>&ge;500 and &lt;600</td>
                        <td>5</td>
                      </tr>  
                      <tr>
                        <td>&ge;600</td>
                        <td>6</td>
                      </tr>   
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          
          <p>Since you need greater than 600 points on average in top 5 games, <span className="bold">hitting an inactive ghost</span> becomes quite essential. To visulaise and debug, use:
            <div className="code-block">
              <span className="code">python3 platformers.py --layout mediumClassic.lay --playerAgent CreativeAgent --ghostAgent DirectionalGhostAgent --evalFn better_evaluation_function --epsilon 0.5</span>
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

export default Project2;
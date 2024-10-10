export const projectsData = [
	{
    id: 1,
    title: 'Platformer - Search',
    description: 'Students implement depth-first, breadth-first, uniform cost, and A* search algorithms. These algorithms are used to solve navigation and traveling salesman problems in the Platform world.',
    imageUrl: '/platformers-search/platformers-search.png',
    gifUrl: '/platformers-search/platformers-search.gif',
    zipUrl: '/platformers-search/platformers-search.zip',
    tableOfContents: `<section id="toc" class="datablock">  
                        <h3> Table of Contents </h3>  
                        <ul>  
                          <li> <a href="#introduction">Introduction</a></li> 
                          <li> <a href="#q1">Q1: Warm up Problem</a></li>   
                          <li> <a href="#q2">Q2: Depth First Search</a></li>  
                          <li> <a href="#q3">Q3: Breadth First Search</a></li>  
                          <li> <a href="#q4">Q4: Eat all Foods</a></li>  
                          <li> <a href="#q5">Q5: Uniform Cost Search</a></li>  
                          <li> <a href="#q6">Q6: A* Search</a></li>  
                          <li> <a href="#q7">Q7: Struggle in the Platformer World</a></li> 
                          <li> <a href="#submission">Submission</a></li>  
                        </ul>  
                      </section>`,
    introduction: `<section id="introduction" class="datablock">  
                        <h3> Introduction </h3>  
                        <p> In this project, your task is to guide the Platformer agent through an environment, finding paths to reach specific locations and efficiently collect food. You will be developing general search algorithms and applying them to different Platformer world scenarios.
                        </p>

                        <p> This project provides an autograder that allows you to test your solutions on your local machine. You can run the autograder using the following command:
                          <div class="code-block">
                            <span class="code">python3 autograder.py --no-graphics</span>
                            <button class="copy-btn">
                              <i class="fas fa-copy"></i>
                              <i class="fas fa-check"></i>
                            </button>
                          </div>
                        </p>
                        <p>The project code is organized into multiple Python files. To complete the assignment, you'll need to read and understand some of these files, while others can be ignored. You can download the entire codebase and supporting files as a <a href="/platformers-search/platformers-search.zip" download>zip archive</a>.
                        </p>
                        <h4> Files you will edit and submit: </h4>
                        <dl>
                          <dt>Agents.py</dt>
                          <dd>Contains all the agents of the game. All agents have an "act" function which takes a problem parameter and returns an action based on current state.</dd>
                          <dt>heuristicFunctions.py</dt>
                          <dd>Contains all the heuristic functions, that may be called from A*.</dd>
                          <dt>Problems.py</dt>
                          <dd>Contains different search problems, and acts as wrapper for all the helper methods needed to solve the problem.</dd>
                          <dt>searchFunctions.py</dt>
                          <dd>Contains all the search functions.</dd>
                        </dl>
                        <h4> Files you might want to look at: </h4>
                        <dl>
                          <dt>costFunctions.py</dt>
                          <dd>Contains cost function to use for scoring the game.</dd>
                          <dt>GameState.py</dt>
                          <dd>Contains code for the game state that is used to progress the game.</dd>
                          <dt>help.txt</dt>
                          <dd>Contains supported commands in platformers.py and autograder.py.</dd>
                          <dt>utils.py</dt>
                          <dd>Contains several data structures and utility functions.</dd>
                        </dl>
                        <h4> Files you can ignore: </h4>
                        <dl>
                          <dt>autograder.py</dt>
                          <dd>Contains code for running your submission against test cases and giving you score.</dd>
                          <dt>Game.py</dt>
                          <dd>Contains code for displaying game graphics.</dd>
                          <dt>gameSettings.py</dt>
                          <dd>Contains some variables for overall game settings.</dd>
                          <dt>graphicsUtils.py</dt>
                          <dd>Contains code for helping load game graphics.</dd>
                          <dt>platformers.py</dt>
                          <dd>Contains code for starting the game and parsing arguments.</dd>
                          <dt>Player.py</dt>
                          <dd>Contains code for animating the player when display is enabled.</dd>
                        </dl>
                    </section>`,
    questions: [
      `<section id="q1" class="datablock">  
        <h3> Question 1: Warm Up Problem (1 point) </h3>  
        <p> After downloading and unzipping the code, navigate to the project directory. To start playing Platformers, enter the following command in your terminal:
          <div class="code-block">
            <span class="code">python3 platformers.py</span>
            <button class="copy-btn">
              <i class="fas fa-copy"></i>
              <i class="fas fa-check"></i>
            </button>
          </div>
        </p>
        <p>
          There are a no. of command line arguments that you can use, and most of them come with default values, as for here the default player agent is <span class="monospace">KeyboardAgent</span>. 
        </p>
        <p>
          <span class='important'>Important:</span>
          In this project, the player starts with a positive score, and the aim is to reach the goal state of all foods eaten in minimum total cost. It gets <span class = "bold">no extra points for eating foods</span>, but eating foods quickly does help in not loosing more points. The default cost function costs an amount equal to number of grid squares travelled during the action, and if action is "noop" then a cost of 1 is levied.
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
          Only a subset of these actions may be legal for the player depending on its location. The aim of this problem is that you understand the Platformer actions well. To answer this problem, refer to method <span class="monospace">act</span> of class <span class="monospace">RandomAgent</span> in file <span class="monospace">Agents.py</span>. <span class="bold">Return a random action from list of possible actions</span>. We will run the game for 10 times and check that the actions are not deterministic. To check and debug your implementation, run: 
            <div class="code-block">
              <span class="code">python3 platformers.py --layout small_test1.lay --agent RandomAgent</span>
              <button class="copy-btn">
                <i class="fas fa-copy"></i>
                <i class="fas fa-check"></i>
              </button>
            </div>
        </p>
        <p>
          Tp run without graphics, you can use the <span class="monospace">--no-graphics</span> flag:
          <div class="code-block">
            <span class="code">python3 platformers.py --layout small_test1.lay --agent RandomAgent --no-graphics</span>
            <button class="copy-btn">
              <i class="fas fa-copy"></i>
              <i class="fas fa-check"></i>
            </button>
          </div>
        </p>
        <p>
          You can check your solution with autograder:
          <div class="code-block">
            <span class="code">python3 autograder.py -q q1 --no-graphics</span>
            <button class="copy-btn">
              <i class="fas fa-copy"></i>
              <i class="fas fa-check"></i>
            </button>
          </div>
        </p>
      </section>`,
      `<section id="q2" class="datablock">  
        <h3> Question 2: Depth First Search (3 points)</h3>  
        <p> In the file <span class="monospace">Agents.py</span>, you'll find a fully functional <span class="monospace">SearchAgent</span> class, which is designed to map out a path in Platformer's world and execute it step by step. However, the search algorithms responsible for creating the path aren't implemented yet—that's your task. Before you start, make sure the <span class="monospace">SearchAgent</span> is functioning correctly using a hardcoded search function for a specific layout:
          <div class="code-block">
            <span class="code">python3 platformers.py --agent SearchAgent --searchFn small_test3_search_test --layout small_test3.lay</span>
            <button class="copy-btn">
              <i class="fas fa-copy"></i>
              <i class="fas fa-check"></i>
            </button>
          </div>
        </p>
        <p>
          Next, your goal is to develop generalized search algorithms that help Platformer plan his routes. Remember, a search node must store not only the current state but also the information necessary to reconstruct the sequence of actions (or plan) that leads to that state.
        </p>
        <p> Take a note of these function signatures:
        </p>
        <ul>
          <li> All search functions must <span class = "bold">return a list of valid actions</span> that will move Platformer from the start state to the goal. Every action must be a legal move (i.e., no moving through ground, etc.).</li>
          <li> All search functions take the <span class="monospace">problem</span> as argument which is an object of <span class="monospace">PlatformersSearchProblem</span> class, and call the helper functions of the <span class="monospace">PlatformersSearchProblem</span> class to get important properties. (Only A* search takes some extra parameters, which you'll see further).</li>
          <li> Be sure to use the <span class="monospace">Stack</span>, <span class="monospace">Queue</span>, and <span class="monospace">PriorityQueue</span> data structures provided in <span class="monospace">utils.py</span>. These implementations have specific characteristics required for compatibility with the autograder.</li>
        </ul>
        <p>
          Your first task is to implement the depth-first search (DFS) algorithm in the <span class="monospace">dfs</span> function in <span class="monospace">searchFunctions.py</span>. To ensure completeness, <span class="bold">implement the graph search version of DFS</span>, which prevents revisiting already explored states.
        </p>
        <p>
          Once implemented, your DFS algorithm should efficiently solve the following layouts:
          <div class="code-block">
            <span class="code">python3 platformers.py --agent SearchAgent --searchFn dfs --layout hill.lay</span>
            <button class="copy-btn">
              <i class="fas fa-copy"></i>
              <i class="fas fa-check"></i>
            </button>
          </div>
          <div class="code-block">
            <span class="code">python3 platformers.py --agent SearchAgent --searchFn dfs --layout narrow_fall.lay</span>
            <button class="copy-btn">
              <i class="fas fa-copy"></i>
              <i class="fas fa-check"></i>
            </button>
          </div>
          <div class="code-block">
            <span class="code">python3 platformers.py --agent SearchAgent --searchFn dfs --layout single_achiever.lay</span>
            <button class="copy-btn">
              <i class="fas fa-copy"></i>
              <i class="fas fa-check"></i>
            </button>
          </div>
          <div class="code-block">
            <span class="code">python3 platformers.py --agent SearchAgent --searchFn dfs --layout small_test3.lay</span>
            <button class="copy-btn">
              <i class="fas fa-copy"></i>
              <i class="fas fa-check"></i>
            </button>
          </div>
          <div class="code-block">
            <span class="code">python3 platformers.py --agent SearchAgent --searchFn dfs --layout tricky.lay</span>
            <button class="copy-btn">
              <i class="fas fa-copy"></i>
              <i class="fas fa-check"></i>
            </button>
          </div>
        </p>
        <p>
          Did you observe that the agent acts suboptimally, neither is it following shortest cost path nor is it following the minimum moves path. This is, however, the desired behavior.
        </p>
        <p>
          You can check your solution with autograder:
          <div class="code-block">
            <span class="code">python3 autograder.py -q q2 --no-graphics</span>
            <button class="copy-btn">
              <i class="fas fa-copy"></i>
              <i class="fas fa-check"></i>
            </button>
          </div>
        </p>
      </section>`,
      `<section id="q3" class="datablock">  
        <h3> Question 3: Breadth First Search (3 points)</h3>  
        <p> Implement the breadth-first search (BFS) algorithm in the <span class="monospace">bfs</span> function located in <span class="monospace">searchFunctions.py</span>. Be sure to <span class="bold">design it as a graph search algorithm</span> that avoids re-exploring already visited states. To verify your implementation, you can test it using the following commands:
          <div class="code-block">
            <span class="code">python3 platformers.py --agent SearchAgent --searchFn bfs --layout small_test3.lay</span>
            <button class="copy-btn">
              <i class="fas fa-copy"></i>
              <i class="fas fa-check"></i>
            </button>
          </div>
          <div class="code-block">
            <span class="code">python3 platformers.py --agent SearchAgent --searchFn bfs --layout hill.lay</span>
            <button class="copy-btn">
              <i class="fas fa-copy"></i>
              <i class="fas fa-check"></i>
            </button>
          </div>
        </p>
        <p>
          You will notice that <span class="monospace">bfs</span> agent takes the <span class="bold">path with minimum number of actions (moves)</span>. To view how it outperforms <span class="monospace">dfs</span> agent, try <span class="monospace">two_paths_single_food.lay</span>:
          <div class="code-block">
            <span class="code">python3 platformers.py --agent SearchAgent --searchFn dfs --layout two_paths_single_food.lay && python3 platformers.py --agent SearchAgent --searchFn bfs --layout two_paths_single_food.lay</span>
            <button class="copy-btn">
              <i class="fas fa-copy"></i>
              <i class="fas fa-check"></i>
            </button>
          </div>
        </p>
        <p> 
          Though <span class="monospace">bfs</span> agent outperforms <span class="monospace">dfs</span>, it is <span class="bold">not optimal with respect to the cost function</span>. It minimizes the number of actions, but in the Platform world different actions have different costs. Try the <span class="monospace">tricky.lay</span> and observe how the player takes jump on plane surface also which costs it more.
          <div class="code-block">
            <span class="code">python3 platformers.py --agent SearchAgent --searchFn bfs --layout tricky.lay</span>
            <button class="copy-btn">
              <i class="fas fa-copy"></i>
              <i class="fas fa-check"></i>
            </button>
          </div>
        </p>
        <p>
          You can check your solution with autograder:
          <div class="code-block">
            <span class="code">python3 autograder.py -q q3 --no-graphics</span>
            <button class="copy-btn">
              <i class="fas fa-copy"></i>
              <i class="fas fa-check"></i>
            </button>
          </div>
        </p>
      </section>`,
      `<section id="q4" class="datablock">  
        <h3> Question 4: Eat all Foods (2 points)</h3>  
        <p> The implementation uses <span class="monospace">problem.is_goal_state(state)</span> and the goal state is defined as the one in which foods left to be eaten is empty. So whatever implementation of the <span class="monospace">dfs</span> and <span class="monospace">bfs</span> agent is written shall work on multiple food layouts as well <span class="bold">without any modification</span>. 
          To verify your implementation, you can test it using the following commands:
          <div class="code-block">
            <span class="code">python3 platformers.py --agent SearchAgent --searchFn dfs --layout small_test2.lay</span>
            <button class="copy-btn">
              <i class="fas fa-copy"></i>
              <i class="fas fa-check"></i>
            </button>
          </div>
          <div class="code-block">
            <span class="code">python3 platformers.py --agent SearchAgent --searchFn bfs --layout two_paths.lay</span>
            <button class="copy-btn">
              <i class="fas fa-copy"></i>
              <i class="fas fa-check"></i>
            </button>
          </div>
        </p>
        
        <p>
          You can check your solution with autograder:
          <div class="code-block">
            <span class="code">python3 autograder.py -q q4 --no-graphics</span>
            <button class="copy-btn">
              <i class="fas fa-copy"></i>
              <i class="fas fa-check"></i>
            </button>
          </div>
        </p>  
      </section>`,
      `<section id="q5" class="datablock">  
        <h3> Question 5: Uniform Cost Search (3 points)</h3>  
        <p> Now your goal is to compute the least cost path for the Platformer. Code up the uniform cost search algorithm in function <span class="monospace">ucs</span> of <span class="monospace">searchFunctions.py</span>. The cost of each action is  also returned when you call <span class="monospace">problem.get_successors(state)</span>

        <p>
          To verify your implementation, you can test it using the following commands:
          <div class="code-block">
            <span class="code">python3 platformers.py --agent SearchAgent --searchFn ucs --layout hill.lay</span>
            <button class="copy-btn">
              <i class="fas fa-copy"></i>
              <i class="fas fa-check"></i>
            </button>
          </div>
        </p>
        <p>
          You will observe that the player does not take unnecessary jumps unlike the <span class="monospace">bfs</span> agent. Though the length of plan has increased, the overall cost is minimised. Where the <span class="monospace">bfs</span> agent ends up with a score of 67 on the same layout, <span class="monospace">ucs</span> agent achieves 75 points.
        </p>
        <p> The <span class="monospace">ucs</span> agent plans out <span class="bold">different routes with different cost functions</span> even for the same layout. Cost functions are defined in <span class="monospace">costFunctions.py</span>. Observe how the player is averse to long jumps due to exponential costs when using <span class="monospace">action_based_cost</span>.
          <div class="code-block">
            <span class="code">python3 platformers.py --agent SearchAgent --searchFn ucs --layout long.lay --costFn action_based_cost</span>
            <button class="copy-btn">
              <i class="fas fa-copy"></i>
              <i class="fas fa-check"></i>
            </button>
          </div>
        </p>
        <p>
          You can check your solution with autograder:
          <div class="code-block">
            <span class="code">python3 autograder.py -q q5 --no-graphics</span>
            <button class="copy-btn">
              <i class="fas fa-copy"></i>
              <i class="fas fa-check"></i>
            </button>
          </div>
        </p>    
      </section>`,
      `<section id="q6" class="datablock">  
        <h3> Question 6: A* Search (4 points)</h3>  
        <p> Try running the <span class="monospace">ucs</span> agent on <span class="monospace">rise_and_fall.lay</span>. This agent <span class="bold">times out</span>. The problem of finding shortest path while eating all the foods is a <span class="bold">Travelling Salesman Problem</span> in the Platformer world, and is a <span class = "bold">hard</span> problem.
        </p>
        <p>
          We now try to speed up the search using heuristic functions. There are some heuristic function signatures provided in <span class="monospace">heuristicFunctions.py</span>. You can either choose to implement those heuristics or create your own heuristic function, following the same function signatures. In any case, <span class="monospace">autograder.py</span> uses <span class="monospace">farthest_food_manhattan</span> heuristic, so <span class="bold">you must implement <span class="monospace">farthest_food_manhattan</span> heuristic</span>. Can you argue why should it be a reasonable heuristic? 
        </p>
        <p>
          Heuristics take the <span class="monospace">state</span>, the <span class="monospace">problem</span> instance and a <span class="monospace">cache</span> (which is essentially a dictionary, but you may customise it into any data structure that suits your implementation of <span class="monospace">astar</span>) (<span class="monospace">cache</span> is used to avoid recomputation of heuristic values for same states again and again, or to pass some extra arguments from A* to heuristic) as input parameters, and returns a value that should represent the approximate cost of reaching a goal state from state. The heuristic function will be <span class="bold">called from within <span class="monospace">astar</span> function only</span>, so you have to ensure and sync the logic of data structure that you use in the caller <span class="monospace">astar</span> function as well as within the heuristic function.
        </p>
        <ul>
          <li> Heuristic functions you define or implement <span class="bold">must be both admissible and consistent</span>. </li>
          <li> One easy way to catch inconsistent heuristics is that the plan returned by <span class="monospace">astar</span> function should have same cost as the one that <span class="monospace">ucs</span> function would return. </li>
        </ul>
        <p>
          Following this, you will be coding up <span class="monospace">astar</span> function in <span class="monospace">searchFunctions.py</span>. The <span class="monospace">astar</span> agent must clear the <span class="monospace">rise_and_fall.lay</span> within the <span class="bold">time limit of 4s</span> and optimally in order to receive full credit. If your heuristic is <span class="bold">inconsistent</span>, you will receive 0 points. If your <span class="monospace">astar</span> agent expands more than <span class="bold">16000 states</span>, then too you will receive 0 credits.
          <div class="code-block">
            <span class="code">python3 platformers.py --agent SearchAgent --searchFn astar --layout rise_and_fall.lay --heuristicFn farthest_food_manhattan</span>
            <button class="copy-btn">
              <i class="fas fa-copy"></i>
              <i class="fas fa-check"></i>
            </button>
          </div>
        </p>
        <p>
          If you do not specify any argument for '<span class="monospace">heuristicFn</span>', <span class="monospace">null_heuristic</span> would be taken by default. If  you have used some other heuristic, pass the corresponding function name here.
        </p>
        <p>
          You can check your solution with autograder:
          <div class="code-block">
            <span class="code">python3 autograder.py -q q6 --no-graphics</span>
            <button class="copy-btn">
              <i class="fas fa-copy"></i>
              <i class="fas fa-check"></i>
            </button>
          </div>
        </p>     
      </section>`,
      `<section id="q7" class="datablock">  
        <h3> Question 7: Struggle in the Platformer World (8 points) </h3>  
        <p> If you are using <span class="monospace">farthest_food_manhattan</span>, you must have realised that it is barely passing the autograder. This heuristic is just not advanced enough to capture all the intricacies of the Platformer world. You know that heuristics are formed by problem relaxations, but <span class="monospace">farthest_food_manhattan</span> is <span class="bold">far too relaxed</span> to be of any use in slightly modified layouts too. Try using it on <span class="monospace">rise_and_fall_hard.lay</span> layout:
          <div class="code-block">
            <span class="code">python3 platformers.py --agent SearchAgent --searchFn astar --layout rise_and_fall_hard.lay --heuristicFn farthest_food_manhattan</span>
            <button class="copy-btn">
              <i class="fas fa-copy"></i>
              <i class="fas fa-check"></i>
            </button>
          </div>
        </p>
        <p> Did it <span class="bold">time-out</span>? Even if your computers are fast enough, the <span class="bold">no. of expanded states matter</span>! This question carries partial marks, solely based on the number of expanded states (and 4s limit stays so that you do not try out some extremely fancy stuffs in the heuristic function itself). If you wrote another heuristic for previous question, try if it clears this layout in time.
        </p>
        <p> A point to observe is that the <span class="bold">layout <span class="monospace">rise_and_fall_hard.lay</span> is just a modified version of <span class="monospace">rise_and_fall.lay</span></span>, but now there are some states where-from the agent may never be able to complete the game. The <span class="bold">heuristics based on manhattan distances view the endpoints as symmetric</span>, but the platformer world is not so. <span class="bold">Reachability is not commutative in the Platformer world</span>, and now you must build heuristics that capture the reachability information and thus penalize the dead states (from which completing the game is not possible) heavily.
        </p>
        <p> You have to implement <span class="monospace">advanced_heuristic</span> function in <span class="monospace">heuristicFunctions.py</span>. If you do not want to use reachability concept to design this <span class="monospace">advanced_heuristic</span>, you may skip the following paragraph, but make sure whatever heuristic you design <span class="bold">is consistent</span> failing which will earn you no grades for this question. The autograder will be calling <span class="monospace">advanced_heuristic</span>, so make sure to implement your heuristic within this function, or handle the function calls.
        </p>
        <p>
          As a first step, implement the <span class="monospace">simple_traversal</span> function in <span class="monospace">PlatformersFoodReachabilityProblem</span> class of <span class="monospace">Problems.py</span>. It takes a player position and returns the set of all food positions that could be eaten from the player position. The food positions are taken from <span class="monospace">game_state</span> that is used to initialize this class's object. Since the agent plans out the entire path before actually moving, this shall always be all the food positions in the game. Follow the comments to complete it. Having completed it, design the <span class="monospace">advanced_heuristic</span> function in <span class="monospace">heuristicFunctions.py</span>; use <span class="monospace">simple_traversal</span> cautiously so that you so not spend too much time. You may find some precomputations helpful. The <span class="monospace">cache</span> will be useful now.
        </p>
        <p> The grading scheme is as follows:-
        </p>
        <table class = "styled-table">
          <thead>
            <tr>
              <th>No. of states expanded</th>
              <th>Marks</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>>19000</td>
              <td>0</td>
            </tr>
            <tr>
              <td>>15000 and <=19000</td>
              <td>1</td>
            </tr>
            <tr>
              <td>>10000 and <=15000</td>
              <td>2</td>
            </tr>
            <tr>
              <td>>5000 and <=10000</td>
              <td>3</td>
            </tr>
            <tr>
              <td>>3000 and <=5000</td>
              <td>4</td>
            </tr>
            <tr>
              <td>>1500 and <=3000</td>
              <td>5</td>
            </tr>
            <tr>
              <td>>800 and <=1500</td>
              <td>6</td>
            </tr>
            <tr>
              <td><=800</td>
              <td>8</td>
            </tr>
          </tbody>
        </table>
        <p>
          After you are done, you may run your agent on the above mentioned layout:
          <div class="code-block">
            <span class="code">python3 platformers.py --agent SearchAgent --searchFn astar --layout rise_and_fall_hard.lay --heuristicFn advanced_heuristic</span>
            <button class="copy-btn">
              <i class="fas fa-copy"></i>
              <i class="fas fa-check"></i>
            </button>
          </div>
        </p>
        <p>
          You can check your solution with autograder:
          <div class="code-block">
            <span class="code">python3 autograder.py -q q7 --no-graphics</span>
            <button class="copy-btn">
              <i class="fas fa-copy"></i>
              <i class="fas fa-check"></i>
            </button>
          </div>
        </p>
      </section>`,
      // Add more questions here
    ],
    submission: `<section id="submission" class="datablock">  
          <h3> Submission </h3>  
          <p> Run the following command to see your full score:

          <div class="code-block">
            <span class="code">python3 autograder.py --no-graphics</span>
            <button class="copy-btn">
              <i class="fas fa-copy"></i>
              <i class="fas fa-check"></i>
            </button>
          </div>
        </p>
        </section>`
  },
  {
    id: 2,
    title: 'Platformer - Multiagent',
    description: 'Students implement .... (not completed currently)',
    imageUrl: '/platformers-multiagent/platformers-multiagent.png',
    gifUrl: '/platformers-multiagent/platformers-multiagent.gif',
    zipUrl: '/platformers-multiagent/platformers-multiagent.zip',
    tableOfContents: `<section id="toc" class="datablock">  
                        <h3> Table of Contents</h3>  
                        <ul>  
                          <li> <a href="#introduction">Introduction</a></li> 
                          <li> <a href="#q1">Q1: </a></li>   
                          <li> <a href="#submission">Submission</a></li>  
                        </ul>  
                      </section>`,
    introduction: `<section id="introduction" class="datablock">  
                        <h3> Introduction </h3>  
                        <p> In this project, your task is to guide the Platformer agent through an environment, finding paths to reach specific locations and efficiently collect food. You will be developing general search algorithms and applying them to different Platformer world scenarios.
                        </p>

                        <p> This project provides an autograder that allows you to test your solutions on your local machine. You can run the autograder using the following command:
                          <div class="code-block">
                            <span class="code">python3 autograder.py --no-graphics</span>
                            <button class="copy-btn">
                              <i class="fas fa-copy"></i>
                              <i class="fas fa-check"></i>
                            </button>
                          </div>
                        </p>
                        <p>The project code is organized into multiple Python files. To complete the assignment, you'll need to read and understand some of these files, while others can be ignored. You can download the entire codebase and supporting files as a <a href="/platformers-search/platformers-search.zip" download>zip archive</a>.
                        </p>
                        <h4> Files you will edit and submit: </h4>
                        <dl>
                          <dt>Agents.py</dt>
                          <dd>Contains all the agents of the game. All agents have an "act" function which takes a problem parameter and returns an action based on current state.</dd>
                          <dt>searchFunctions.py</dt>
                          <dd>Contains all the search functions.</dd>
                        </dl>
                        <h4> Files you might want to look at: </h4>
                        <dl>
                          <dt>Problems.py</dt>
                          <dd>Contains different search problems, and acts as wrapper for all the helper methods needed to solve the problem.</dd>
                          <dt>utils.py</dt>
                          <dd>Contains several data structures and utility functions.</dd>
                        </dl>
                        <h4> Files you can ignore: </h4>
                        <dl>
                          <dt>graphicsUtils.py</dt>
                          <dd>Contains code for helping run game graphics.</dd>
                        </dl>
                    </section>`,
    questions: [
      `<section id="q1" class="datablock">  
        <h3> Question 1 </h3>  
        
      </section>`,
      // Add more questions here
    ],
    submission: `<section id="submission" class="datablock">  
          <h3> Submission </h3>
        </section>`
  }
  // Add other projects

];
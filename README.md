<h1>Setting up this project</h1>
<ol>
   <li> Ensure that you're in the directory you want to put the code in VSCode.
   <li> Clone the repository using the <code>git clone https://github.com/CSE341-WDD330-Team-2/Task-Manager.git</code> command.
   <li> In the same directory, run <code>npm install</code> to install all the packages required. You may have to run <code>npm install --save-dev nodemon</code> separately. I don't remember.
   <li> If you want to create a branch to work on so you don't push changes to the main code, use <code>git checkout -b [name_of_the_new_branch]</code>
   <li> It's usually a good idea to push the branch immediately: <code>git push origin [name_of_the_branch]</code>
</ol>
You can see all the branches that exist by using <code>git branch -a</code>

<br><br><br>
Sorry for mansplaining github, I just know they don't teach it all that well in class. 😂 Contact me if you have any questions!
<br>-Isaac
<br><br>

<h1>Heroku</h1>
I've set up a heroku app that will update automatically whenever we push changes to the main branch.<br>
Here's the link: https://cse341-wdd330-task-manager.herokuapp.com/

Here is the mongoDB Compass connect link:
mongodb+srv://dunntooni:<password>@cluster0.j6osm.mongodb.net/test

Use the password from your environment variables to connect.
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <link rel="stylesheet" href="https://stackedit.io/style.css" />
</head>

<body class="stackedit">
  <div class="stackedit__html"><h1 id="assignment-management-system">Assignment Management System</h1>
<p>A Node.js and Express-based backend application for managing assignments between users and admins.</p>
<h2 id="features">Features</h2>
<ul>
<li>User and Admin registration and login</li>
<li>User can upload assignments tagged to specific admins</li>
<li>Admins can view, accept, or reject assignments</li>
<li>Middleware for authentication and role-based authorization</li>
<li>MongoDB as the database with Mongoose for modeling</li>
</ul>
<hr>
<h2 id="prerequisites">Prerequisites</h2>
<p>Before running this project, ensure you have the following installed:</p>
<ul>
<li><a href="https://nodejs.org/">Node.js</a> (v14 or later)</li>
<li><a href="https://www.mongodb.com/">MongoDB</a> (v5 or later)</li>
<li><a href="https://www.postman.com/">Postman</a> (optional, for API testing)</li>
</ul>
<hr>
<h2 id="installation">Installation</h2>
<ol>
<li>
<p>Clone the repository:</p>
<pre class=" language-bash"><code class="prism  language-bash"><span class="token function">git</span> clone https://github.com/your-username/assignment-management-system.git
<span class="token function">cd</span> assignment-management-system`

</code></pre>

</li>
<li>
<p>Install dependencies:</p>
<p>bash</p>
<p><code>npm install</code></p>
</li>
<li>
<p>Set up environment variables: Create a <code>.env</code> file in the root directory and add the following:</p>
<p>env</p>
<p><code>PORT=5000 MONGO_URI=mongodb://localhost:27017/assignmentDB JWT_SECRET=your_jwt_secret_key</code></p>
</li>
<li>
<p>Start the server:</p>
<p>bash</p>
<p><code>npm run dev</code></p>
</li>
</ol>
<p>The server will run at <code>http://localhost:5000</code>.</p>
<hr>
<h2 id="api-endpoints">API Endpoints</h2>
<h3 id="user-routes">User Routes</h3>
<p>Method</p>
<p>Endpoint</p>
<p>Description</p>
<p>POST</p>
<p><code>/user/register</code></p>
<p>Register a new user</p>
<p>POST</p>
<p><code>/user/login</code></p>
<p>Login as a user</p>
<p>POST</p>
<p><code>/assignment/upload</code></p>
<p>Upload a new assignment</p>
<h3 id="admin-routes">Admin Routes</h3>
<p>Method</p>
<p>Endpoint</p>
<p>Description</p>
<p>POST</p>
<p><code>/user/register</code></p>
<p>Register a new admin</p>
<p>POST</p>
<p><code>/user/login</code></p>
<p>Login as an admin</p>
<p>GET</p>
<p><code>/admin/assignments</code></p>
<p>Get all assignments</p>
<p>POST</p>
<p><code>/admin/assignments/:id/accept</code></p>
<p>Accept an assignment by ID</p>
<p>POST</p>
<p><code>/admin/assignments/:id/reject</code></p>
<p>Reject an assignment by ID</p>
<hr>
<h2 id="sample-payloads">Sample Payloads</h2>
<h3 id="user-registration">User Registration</h3>
<p><strong>Endpoint:</strong> <code>POST /user/register</code></p>
<p>json</p>
<p><code>{ "name": "John Doe", "email": "john.doe@example.com", "password": "password123" }</code></p>
<h3 id="upload-assignment">Upload Assignment</h3>
<p><strong>Endpoint:</strong> <code>POST user/assignment/upload</code></p>
<p>json</p>
<p><code>{ "task": "Complete Module 1", "adminId": "674c323bc3582f9f6d7e2718" }</code></p>
<h3 id="admin-accept-assignment">Admin Accept Assignment</h3>
<p><strong>Endpoint:</strong> <code>POST /admin/assignments/:id/accept</code></p>
<hr>
<h2 id="error-handling">Error Handling</h2>
<ul>
<li><strong>400 Bad Request:</strong> Missing or invalid input</li>
<li><strong>401 Unauthorized:</strong> Invalid or missing token</li>
<li><strong>404 Not Found:</strong> Resource not found</li>
<li><strong>500 Internal Server Error:</strong> Server-side errors</li>
</ul>
<hr>
<h2 id="tech-stack">Tech Stack</h2>
<ul>
<li><strong>Backend:</strong> Node.js, Express.js</li>
<li><strong>Database:</strong> MongoDB, Mongoose</li>
<li><strong>Authentication:</strong> JSON Web Tokens (JWT)</li>
</ul>
<hr>
<h2 id="development">Development</h2>
<h3 id="run-locally">Run Locally</h3>
<p>Start the development server with:</p>
<p>bash</p>
<p><code>npm run start</code></p>
<h3 id="linting">Linting</h3>
<p>Run ESLint to check for code quality:</p>
<p>bash</p>
<p><code>npm run lint</code></p>
<hr>
<hr>
</div>
</body>

</html>

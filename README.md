<h1><font color="red">mongo</font><i>news</i></h1>

<h2>News scraper with the abiility to write comments</h2>

<p>Tools being used for this project</p>
<ul>
    <li>express</li>
    <li>exress-handlebars</li>
    <li>mongoos</li>
    <li>body-parser</li>
    <li>cheerio</li>
    <li>request</li>
    <li>dotenv</li>
    <li>morgan</li>
</ul>

<h2>Description of libraries used</h2>
<p><strong>Node.js</strong> will be the platform that this project will reside in.
</p>
<p>A working copy of this repository will be hosted in the following Heroku Link:</p>
<a href="https://mongonewss.herokuapp.com/">https://mongonewss.herokuapp.com/</a>
<p>I use <strong>morgan</strong> to see what is sent to the <strong>express</strong> API and HTML routes.</p>
<p><strong>request</strong> is used to obtain the data from the web page. I use <strong>cheerio</strong> similar to <strong>jQuery</strong>, grabbing the elements by their class names from the raw html.</p>
<break>
<h2>Work Flow</h2>
<ol>
<li>start node</li>
<li>upon startup, clear data from db and run scraper</li>
<li>once scraper is complete, present page using handlebars</li>
<li>when article is selected push a modal for appending notes</li>
<li>when notes are added, show that the article has a node</li>
</ol>
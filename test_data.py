software_documentation = """
rb2b is a script to know website visitors without them logging in to your website.

to activate rb2b, you need to copy the tracking script to HTML file and paste it in the <head> section of the HTML file

the script code will be something like this:
<script>
    !function () {var reb2b = window.reb2b = window.reb2b || [];
    if (reb2b.invoked) return;reb2b.invoked = true;reb2b.methods = ["identify", "collect"];
    reb2b.factory = function (method) {return function () {var args = Array.prototype.slice.call(arguments);
    args.unshift(method);reb2b.push(args);return reb2b;};};
    for (var i = 0; i < reb2b.methods.length; i++) {var key = reb2b.methods[i];reb2b[key] = reb2b.factory(key);}
    reb2b.load = function (key) {var script = document.createElement("script");script.type = "text/javascript";script.async = true;
    script.src = "https://s3-us-west-2.amazonaws.com/b2bjsstore/b/" + key + "/reb2b.js.gz";
    var first = document.getElementsByTagName("script")[0];
    first.parentNode.insertBefore(script, first);};
    reb2b.SNIPPET_VERSION = "1.0.1";reb2b.load("Y46DJ4HL3Q61");}();
  </script>
"""

directory_structure = """
.github
.github/workflows
.github/workflows/static.yml
.gitignore
README.md
index.html
main.js
package-lock.json
package.json
src
src/Entry.js
src/Network.js
src/Node.js
src/NodeFactory.js
src/canvas.js
src/types.js
style.css
vite.config.js
"""

file_content = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lavish Saluja</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/modern-normalize/2.0.0/modern-normalize.min.css" rel="stylesheet">
    <style>
        :root {
            --color-background: #f5f5f7;
            --color-text: #1d1d1f;
            --color-accent: #0071e3;
            --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        body, html {
            font-family: var(--font-family);
            background-color: var(--color-background);
            color: var(--color-text);
            line-height: 1.5;
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: hidden;
        }
        .container {
            display: flex;
            height: 100%;
        }
        .left-panel {
            flex: 1;
            padding: 40px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        .right-panel {
            flex: 1;
            background: url('/api/placeholder/800/1600') no-repeat center center;
            background-size: cover;
        }
        h1 {
            font-size: 48px;
            font-weight: 700;
            margin-bottom: 10px;
            background: linear-gradient(to right, #4CC2FF, #955EFF, #F262D6, #FE8F6B);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            color: transparent;
        }
        h2 {
            font-size: 28px;
            font-weight: 700;
            color: black;
            margin-bottom: 30px;
        }
        p {
            font-size: 20px;
            margin-bottom: 20px;
        }
        .links a {
            color: var(--color-accent);
            text-decoration: none;
            margin-right: 20px;
            font-size: 16px;
        }
        .links a:hover {
            text-decoration: underline;
        }
        @media (max-width: 768px) {
            .container {
                flex-direction: column;
            }
            .right-panel {
                display: none;
            }
            .left-panel {
                padding: 20px;
            }
            h1 {
                font-size: 36px;
            }
            h2 {
                font-size: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="left-panel">
            <div>
                <h1>Lavish Saluja</h1>
                <p>I like learning from smart thinkers, sellers, and builders about everything there is to know about this matrix's past, present, and future.</p>
            </div>
            <div class="links">
                <a href="https://twitter.com/lavishsaluja" target="_blank">Twitter</a>
                <a href="mailto:lavishsaluja.ls@gmail.com" target="_blank">Email</a>
                <a href="https://www.linkedin.com/in/lavishsaluja" target="_blank">LinkedIn</a>
            </div>
        </div>
        <div class="right-panel"></div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script>
        gsap.from(".links a:first-child", {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power2.out"
        });

        gsap.from(".links a:not(:first-child)", {
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.1,
            ease: "power2.out",
            delay: 1
        });
    </script>
</body>
</html>
"""



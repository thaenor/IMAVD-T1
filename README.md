# IMAVD IMAGE

# HOW TO

1. `git clone https://github.com/thaenor/IMAVD-T1.git`
2. `npm install`
3. `npm start`

Make sure you have node and npm installed.


# CODE STRUCTURE

* `main.js` is executed by nodeJS - this part is just responsible for opening the window. You can configure things like it's size here.
* `app/*` all the "client side" code executed in browser
* `index.html` your typical HTML - let's try to keep libraries local so this can run offline
* * in a script tag I'm initallizing all the canvas, fabric and image components so they can used anywhere in the app
* `app/lib/fabric.min.js` - ran into some issues installing fabric via npm, so this is a slightly hacky way to include it in our project.
* `app/renderer.js` this is common.js so you can use `require` at will. For now this just imports all the other bits of the code
* `app/events` this is the event handlers that attach to the HTML. They're all separate and (slightly) more organized, so you can just create your own and import it in the `renderer.js`

# NOTES

The globals `imageSettings` and `imageData` are meant to hold all the data of the image, try to keep them updated always.
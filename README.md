# mattia.id
[![Netlify Status](https://api.netlify.com/api/v1/badges/075be8a8-5957-4130-82fc-82c93c67a8d4/deploy-status)](https://app.netlify.com/sites/mattiaschiano/deploys)

In my never ending attempt at making a nice looking website, I made another.

I decided to allow myself non default fonts, because I wanted to play around with this idea.

Thus, I cared less about load times this time, because as usual, I was preoptimizing.

# Templating System
I realized that maintaing consistent, static html files was gonna be a pain, so I went through and tried to make a templating and build system.

I'm just using [mustache](http://mustache.github.io) for the templates themselves and running it through the build script, which I remade as a node script [from bash] and strangly runs faster now, so I gotta figure that one out.

Either way, this makes it super easy to automate builds on [netlify](https://netlify.com).
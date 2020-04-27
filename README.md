# mattia.id
[![Netlify Status](https://api.netlify.com/api/v1/badges/075be8a8-5957-4130-82fc-82c93c67a8d4/deploy-status)](https://app.netlify.com/sites/mattiaschiano/deploys)

In my never ending attempt at making a nice looking personal website, I made another.

I decided to allow myself non default fonts, because I wanted to play around with this design.

Thus, I cared less about load times this time, because as usual, I was preoptimizing.  I mean it's still a tiny website that loads stupid quick, just now I permit fonts to load.

## Templating System
I realized that maintaing consistent, static html files was gonna be a pain, so I went through and tried to make a templating and build system.

I'm started off [mustache](http://mustache.github.io), but now have my own weird custom templating system using javascript.  Currently, I'm using [Haipa](https://github.com/matteron/Haipa) to create HTML strings.

I also got [browser-sync](https://www.browsersync.io) to listen to changes in template files and recompile only the needed ones.  (Though listening to changes in the template itself did seem to break in the transition...)

Either way, this makes it super easy to automate builds on [netlify](https://netlify.com).

## TODO
- [X] Fix template live refresh.

## Color History:
### Before April 27, 2020
![Light: #F1EEE7](https://img.shields.io/badge/Light-%23F1EEE7-%23F1EEE7)
![Dark: #222222](https://img.shields.io/badge/Dark-%23222222-%23222222)
![Purple: #9c528b](https://img.shields.io/badge/Purple-%239c528b-%239c528b)
![Red: #EF626C](https://img.shields.io/badge/Red-%23EF626C-%23EF626C)
![Green: #7AA095](https://img.shields.io/badge/Green-%237AA095-%237AA095)
![Blue: #6D72C3](https://img.shields.io/badge/Blue-%236D72C3-%236D72C3)
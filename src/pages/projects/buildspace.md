----
title: Buildspace
date: April 20, 2020
desc: Small tool set to help build static sites.
----

[Repository](https://github.com/matteron/buildspace)

A small tool set to help build static sites.

This was built after I really started using [Haipa](/projects/haipa) to build my websites and noticed I was writing a lot of boilerplate code to write the output files to disc.  I didn't want to use a full featured static site generator for every little site I made as that's a lot of bloat to carry around, so I tried to condense all of that into Buildspace.

Buildspace is meant to be light, portable, and universally compatible.  In case a similar way to how Haipa just creates raw strings that can be piped into anything, Buildspace just takes in raw strings to transform into files.
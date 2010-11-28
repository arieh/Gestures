/*
---
description: Provides readymade gestures that you can choose from

license: MIT-style

authors:
- Arieh Glazer

requires:
- Gestures/0.5 : [Gestures]

provides: [Gestures.Readymade]

...
*/
/*!
Copyright (c) 2010 Arieh Glazer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE 
*/
    Gestures.Readymade = {
        right : new Gesture(['right'],[ [0], [0,45], [0,315] ])
        , left : new Gesture(['left'],[ [180], [180,135], [180,225] ])
        , up : new Gesture(['up'],[[0,270,90],[315,270],[270],[180,270],[0,270],[45,270],[315]])
        , down : new Gesture(['down'], [[0,90],[90],[45,90],[45,90]])
        , z : new Gesture(['z'],[[0,90,0],[45,0,135,0],[270,0,135,0],[0,45],[45,90,0],[0,135,0],[270,0,135,0,135],[0,45,0],[0,45,0,180],[45,0,135,0,135],[0,90,0,180],[0,45,90,0],[45]])
        , x : new Gesture(['x'],[[270,90,270,135],[45,0,135],[45,0,135,270],[45,90],[90,45,270,135,315],[90,45,270,135],[45,90,135],[45,0],[135],[0,45,270,135],[45,0,135,0],[270,90,315,135],[45,135]])
    };
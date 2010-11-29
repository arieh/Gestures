/*
---
description: Provides an event-based gesture system, that allows you to register and listen to complex mouse gestures

license: MIT-style

authors:
- Arieh Glazer

requires:
- core/1.3 : [Core,Class,Class.Extras,Element,Element.Event,Array]

provides: [Gestures,Gestures.Directions]

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

(function(document,$){
Gestures = new Class({
        Implements : [Events,Options]
        , options : {
            attachTarget : false
            , target : document
            , preventEvent : true
        }
        , wait : false
        , currentPos  : {}
        , currentAngle : 0
        , sequence : []
        , handle : null
        , prevent : false
        , sequences : {}
        , initialize : function(options){
            this.setOptions(options);
            this.options.target = $(this.options.target);
            
            this.logSequence = this.logSequence.bind(this);
            this.startGesture = this.startGesture.bind(this);
            this.endSequence = this.endSequence.bind(this);
            this.contexMenu = this.contexMenu.bind(this);
            this.mouseDown = this.mouseDown.bind(this);
            this.stopEvent = this.stopEvent.bind(this);
        }
        , start : function(){
            this.options.target.addEvents({
                'contextmenu' : this.contexMenu
                
                , 'mousedown' : this.mouseDown
                
                , 'mouseup' : this.stopEvent 
                
                , 'touchstart' : this.mouseDown
                
                , 'touchend' : this.stopEvent
            });
        }
        
        , stop : function(){
            this.options.target.removeEvents({
                'contextmenu' : this.contexMenu
                
                , 'mousedown' : this.mouseDown
                
                , 'mouseup' : this.stopEvent 
                
                , 'touchstart' : this.mouseDown
                
                , 'touchend' : this.stopEvent
            });
        }
        , mouseDown : function(e){
            if (!e.rightClick) return;
            this.sequence = [];
            this.startGesture(e.client);
            this.down = true;
            this.currentPos = e.client;
        }
        , contexMenu : function(e){            
            if (this.prevent && this.options.preventEvent) e.preventDefault();
            this.prevent = false;           
        }
        , stopEvent :function(e){
            if (!e.rightClick) return;
            clearTimeout(this.handle);
           
            this.down = false;
            
            if (this.sequence.length > 1){
                this.endSequence(e.client);
                if (e.rightClick) this.prevent = true;
            }
            
            this.options.target.removeEvent('mousemove',this.logSequence);
            this.sequence = [];
        }
        , startGesture : function(pos){
            this.sequence.push(-1);
            this.currentPos = pos;
            this.currentAngle = -1;
            this.fireEvent('start');
            this.options.target.addEvent('mousemove',this.logSequence);
        }
        , getAngle : function(pos){
            function roundTo45(num){
                var diff = num % 45;  
                if (diff>22) return num - diff + 45;
                else return num - diff;
            }
            
            var x = pos.x- this.currentPos.x
                , y = pos.y - this.currentPos.y
                , deg = Math.atan(y/x) * 180/Math.PI;
           
            if (x<=0) deg+=180;
            else if (x && y<=0)  deg+=360;
                
            deg = roundTo45(deg);
            if (deg == 360) return 0;
            return deg;
        }
        , logSequence : function(e){
            if (this.wait) return;
            if (e.client.x == this.currentPos.x && e.client.y == this.currentPos.y) return;
            var $this = this
                , deg = this.getAngle(e.client);
                    
            setTimeout(function(){$this.wait = false;},200);
            this.wait = true;
                
            if (deg!=this.currentAngle){
                this.currentAngle = deg;
                this.currentPos = e.client;
                if (!deg && deg!==0) return;
                this.sequence.push(deg);
            }  
        }
        , endSequence : function(pos){
        
           var deg = this.getAngle(pos);
            if (deg != this.currentAngle && (deg || deg==0)) this.sequence.push(deg);
            
            this.sequence.shift();
            this.fireEvent('end',[this.sequence]);
            this.handleSequence();
            this.sequence = [];
            this.deg = -1;           
        }
        , handleSequence : function(){
            var $this = this, str;
            
            str = this.sequence.join('-');
            if (this.sequences[str]){
                 this.sequences[str].each(function(name){
                    $this.fireEvent(name);
                    if ($this.options.attachTarget) $this.options.target.fireEvent('gesture:'+name);
                 });
            }
            
            if (Gestures.Sequences[str]){
                Gestures.Sequences[str].each(function(name){
                    $this.fireEvent(name);
                    if ($this.options.attachTarget) $this.options.target.fireEvent('gesture:'+name);
                });
            }
        }
        , register : function(gesture,seqs){
            function register(names,sequences){
                for (var seq in sequences){
                    if (!sequences.hasOwnProperty(seq)) continue;
                    $this.sequences[sequences[seq]] = names;
                }
            }
            
            var $this = this;
            
            if (gesture instanceof Gesture){
                register(gesture.names,gesture.sequences);
            }else if (seqs){
                register(Array.from[gesture],seqs);
            }
            return this;
        }   
    });
    
    Gesture = new Class({
        names : []
        , sequences : []
        , initialize : function(names,sequences){
            this.names = Array.from(names);
            
            for (seq in sequences){
                if (!sequences.hasOwnProperty(seq)) continue;
                this.sequences.push(sequences[seq].join('-'));
            }
        }   
    });
    
    Gestures.Sequences = {};
    
    Gestures.Directions = {
        'East' : 0
        , 'SouthEast': 45
        , 'South' : 90
        , 'SouthWest' : 135
        , 'West' : 180
        , 'NorthWest' : 225
        , 'North' : 270
        , 'NorthEast' : 315
    };
    
    Gestures.registerGesture = function(gesture,seqs){
        function register(names,sequences){
            for (var seq in sequences){
                if (!sequences.hasOwnProperty(seq)) continue;
                Gesture.Sequences[sequences[seq]] = names;
            }
        }
        
        if (gesture instanceof Gesture){
            register(gesture.names,gesture.sequences);
        }else if (seqs){
            register(Array.from[gesture],seqs);
        }
        
    };
    
})(document,document.id);
Gestures
========
This Class allows you to register and listen to mouse/touch gestures on your device. It also comes with a boundle of premade gestures, a gesture generation tool, and a gesture helper class.
For the mouse, the Class uses the right mouse button.
*NOTE: This class can handle simple gestures, but has trouble identifying more complex ones, such as the letter S*
*NOTE: I don't have a touch device, and so cannot test the usability of this class. If you want to hep me develop this class, pm me on github*

![Screenshot](https://github.com/arieh/Gestures/raw/master/Gestures.png)
How to use
----------
For most applications, it's enough to have one Gestures class. Initializing it is simple:

    #JS
    var g = new Gestures([options]);
    
Possible options are:

1. attachTarget (bool default to false) : will also fire the gesture event on the target element (naming: 'gesture:gestureName').
2. target (Element. default is document): element to listen to.

Registering Getures
--------------
In order for the class to be effective, you first need to register getures for it. You can either do it globaly or per Class instance. Each gesture is combined of 2 parts:

1. names - event names that will fire when the gesture is performed correctly (this is for cases when one gesture pack uses the same sequence as another's).
2. sequences - a list of direction changes that, when performed successfully, will trigger the event.

#### Sequences

The Class recognizes 8 directions, which have a name and an angle: East (0), SouthEast(45), South(90), SouthWest(135), West(180), NorthWest(225), North(270) and NorthEast(315).
These can be used either by the angle or useing Gestures.Directions for creating more readable sequences.
Each sequence is an array of directions. So, for example, registering the letter Z:

    #JS
    [0,135,0]
    [Gestures.Directions.East , Gestures.Directions.SouthWest , Gestures.Directions.East]
    
Since the use might not be as accurate, the Class allows you to register mutiple sequences for the same gesture. The best way to do this is to use the Generator tool that is supplied with this package multiple times (maybe even in different sizes).

#### Registering global gestures
Registering global gestures (ones that will be available for all instances) can be done either with the Gesture Class:

    #JS
    var right = new Gesture('right' ,[
        [Gestures.Directions.East]
        , [Gestures.Directions.East , Gestures.Directions.NorthEast]
        , [Gestures.Directions.East , Gestures.Directions.SouthEast]
    ]);
    
    Gestures.registerGesture(right);

Or by simple supplying it with parameters:

    #JS
    Gestures.registerGesture('right',[
        [Gestures.Directions.East]
        , [Gestures.Directions.East , Gestures.Directions.NorthEast]
        , [Gestures.Directions.East , Gestures.Directions.SouthEast]
    ]);
    
#### Registering instance specific gestures
Normaly, you won't have more than one instance per application, but if for example you want to register gestures to different elements in the same page, you can register instance-specific gestures:

    #JS
    //using the above right Gesture
    var g= new Gestures({target:el});
    g.register(right);
    
### Wrapping it all up
So, after we registered some gestures, we can do:

    #JS
    var g = new Gestures();
    g.addEvent('z',function(){/* do something */});
    g.addEvent('right',function(){/* do something else */});
    g.start(); //starts listening to gestures
    
Events
---------
The Class fires 2 main evens (other than the gesture ones):
1. start: fires when a gesture capture begins.
2. end: fires when a gesture capture ends. Passes the recorded gesture sequence as a parameter.

Gestures.Readymade
-------------------------------
This is a list of readymade gesture recordings. Usage:

    #JS
    Gestures.registerGesture(Gestures.Readymade.right);
    
Currently available gestures:

1. right
2. left
3. up
4. down
5. z
6. x
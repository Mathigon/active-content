# Functions

## Relations and Functions

> section: relations
> sectionStatus: dev
> id: sorting-hat
> color: "#FD8C00"
> level: Intermediate
> next: sequences

::: column.grow

Welcome to the Hoctagon School of Magic! You’ve taken the train from King’s Cross station in London,
a boat across the great lake in front of the castle, and just arrived in the great hall with all the
other students.

But before the welcome feast can begin, the Sorting Hat has to assign all new students to a house.
Try sorting each of these students into one of the four house:

::: column(width=300)

    // EDITORIAL ONLY
    // https://depositphotos.com/139592200/stock-photo-the-hogwarts-express-train.html

{.fixme} Image

:::

    x-relation
      .item(slot="domain" name="a") **Current User**
      .item(slot="domain" name="b") Phineas Lynch
      .item(slot="domain" name="c") Sturgis Switch
      .item(slot="domain" name="d") Dilys Derwent
      .item(slot="domain" name="e") Demelza Zabini
      .item(slot="domain" name="f") Bogod Clearwater
      .item(slot="range") Lionpaw
      .item(slot="range") Eaglewing
      .item(slot="range") Badgerclaw
      .item(slot="range") Serpentfang

---

After dinner, all students return to the common rooms of their new houses. Everyone settles into their dorms and returns to the common room to meet their new housemates. Heads of houses use this time to pass out class lists. Like before, connect each of the students with different classes:

    x-relation
      .item(slot="domain" name="a") **Current User**
      .item(slot="domain" name="b") Phineas Lynch
      .item(slot="domain" name="c") Sturgis Switch
      .item(slot="domain" name="d") Dilys Derwent
      .item(slot="domain" name="e") Demelza Zabini
      .item(slot="domain" name="f") Bogod Clearwater
      .item(slot="range") Potions
      .item(slot="range") Transfiguration
      .item(slot="range") Magical Creatures
      .item(slot="range") Broomstick Flying
      .item(slot="range") Charms

---

The next day, you and several of your classmates arrive early to your first lesson. Conversation quickly turns to your new wands. You trade stories about how the wands chose you. Connect each of these wands to a student.

    x-relation
      .item(slot="domain")
        img(src="images/wand-1.png" width=200 height=30)
        span.caption Birch, phoenix feather, 5 3/4
      .item(slot="domain")
        img(src="images/wand-2.png" width=200 height=30)
        span.caption Oak,dragon heartstring, 6 9/16
      .item(slot="domain")
        img(src="images/wand-3.png" width=200 height=30)
        span.caption Oak, unicorn hair, 6 5/8
      .item(slot="domain")
        img(src="images/wand-4.png" width=200 height=30)
        span.caption Yew, kneazle whicker, 4 9/16
      .item(slot="domain")
        img(src="images/wand-5.png" width=200 height=30)
        span.caption Yew, unicorn hair, 5 7/8
      .item(slot="range" name="a") **Current User**
      .item(slot="range" name="b") Phineas Lynch
      .item(slot="range" name="c") Sturgis Switch
      .item(slot="range" name="d") Dilys Derwent
      .item(slot="range" name="e") Demelza Zabini

---

In all of the examples above, there were two groups of things (like students, houses or wands), which you had to connect to each other.

In mathematics, we call groups of things like this [__sets__](gloss:set). We can write down the elements of a set in “curly brackets”, e.g. {Lionpaw, Eaglewing, Badgerclaw, Serpentfang}. The order of the items in a set does not matter, but every item can only appear once in a set.

A connection between two sets is called a [__relation__](gloss:relation). Relations can take different forms, and you might have already noticed some similarities and differences between the examples above.

| Houses | Classes | Wands |
| ------ | ------- | ----- |
|Multiple students can be in a single house. A relation like this is called [[many-to-one\|one-to-one\|one-to-many\|many-to-many]].|Multiple students can be in multiple classes. A relation like this is called [[many-to-many\|one-to-one\|one-to-many\|many-to-one]].|A single wand chooses a single student. A relation like this is called [[one-to-one\|many-to-many\|one-to-many\|many-to-one]].|
|Conversely, a single house contains multiple students—a [[one-to-many\|one-to-one\|many-to-one\|many-to-many]] relation.|Conversely, multiple classes contain multiple students—a [[many-to-many\|one-to-one\|many-to-one\|one-to-many]] relation.|Conversely, a single student has one wand—a [[one-to-one\|one-to-many\|many-to-one\|many-to-many]] relation.|

---

There are many ways we can represent the same relation between sets. So far we have been using mapping diagrams. We can also represent the same information using a table. The sorting hat mapping diagram is shown in the table below.

TODO Interactive here

We can also use ordered pairs to show this relationship. The first value in an ordered pair is from the input set. The second value is from the output set.

({{Current User Name}}, Lionpaw) (Phineas Lynch, Lionpaw) (Sturgis Switch, Eaglewing) (Dilys Derwent, Badgerclaw) (Demelza Zabini, Serpentfang) (Bogod Clearwater, Serpentfang)

---

### Domain and Range

You can think of relations as an operation: you pass in an item from the __set__ on the left, and you get items from the set on the right as an output. Consider this relation:

| Input | | Output |
| :---: | | :----: |
| 14 |  | even |
| 3 |  | odd |
| 11 |  | odd |
| 6 |  | even |
| -6 |  | even |

The input set for the first example is {14, 3, 11, 6, -6}. Note that these numbers don’t have to be in order from least to greatest. The output set for this example is {even, odd}. Notice that we only list even and odd *once* in our output set.

These input and output sets have special names. The complete set of all possible inputs is called [__domain__](gloss:domain). Similarly,  [__range__](gloss:range) is the set of all possible output values. We use the same curly brace notation in the example above.  Sometimes we use inequalities to communicate domain and range. We will look at this in more detail later. Use the tabs to answer the questions below.

TODO Interactive here

---
> id: coordinate-plots
> goals: p0 p1 p2

### Coordinate Systems

We have been using mapping diagrams, coordinate pairs, and tables to represent relations. Graphs are another way to visualize relations. We can note a few interesting things when we look at relations on the [__coordinate plane__](gloss:coordinate-system).

Let’s plot the relation {(0,0), (1,4), (-5,3), (-2,-1), (4, -3)} on the coordinate plane. Two points are already on the graph.

    x-geopad(width=400 height=300 x-axis="-6,6,1" y-axis="-5,5,1" axes grid padding=8 snap): svg
      circle.green(x="point(0, 0)")
      circle.green(x="point(1, 4)")

---
> id: vertical-line-test

Let’s look at the graphs of the relations we have been working with so far. Notice how the mapping diagram relates to the graph. The axes in the coordinate plane below take names other than x and y, the variables we’ve seen before. This graph, for instance, includes a name- and a house-axis.

    x-geopad(width=500 height=350 x-axis="-1,6,1" y-axis="0,4,1" axes grid padding=25): svg

Using coordinate systems, it is also very easy to check whether a relation is many-to-many, or one-to-many. The many-to-one and many-to-many graphs have [[at least one | no]] points that share an x-value. The one-to-one and one-to-many graphs have [[no | at least one]] points that share an x-value.

Go through the coordinate system from left to right, and check if there are any two points connected by a vertical line. This means that they share the same x-value, so the relation is not many-to-one or many-to-many. This is called the vertical line test. The graphs that share an x-value seem like they could have a vertical line that connects [[two or more | none]] of their points.

::: column(width=350)

This relation [[passes | fails]] the vertical line test:

    x-geopad.verticalLineTest(width=350 height=350 x-axis="-10,10,1" y-axis="-10,10,1" axes grid padding=8): svg
      circle(x="point(-6, 9)")
      circle(x="point(-3, 9)")
      circle(x="point(-1, -3)")
      circle(x="point(5, -8)")
      circle(x="point(9, 1)")
      circle(x="point(10, 1)")

::: column(width=350)

This relation [[fails | passes]] the vertical line test:

    x-geopad.verticalLineTest(width=350 height=350 x-axis="-10,10,1" y-axis="-10,10,1" axes grid padding=8): svg
      circle(x="point(-10, 0)")
      circle(x="point(-6, -3)")
      circle(x="point(-6, -7)")
      circle(x="point(-3, -9)")
      circle(x="point(-3, -10)")
      circle(x="point(2, -9)")

:::

::: column(width=350)

This relation [[passes | fails]] the vertical line test:

    x-geopad.verticalLineTest(width=350 height=350 x-axis="-10,10,1" y-axis="-10,10,1" axes grid padding=8): svg
      circle(x="point(-9, -3)")
      circle(x="point(0, -4)")
      circle(x="point(6, -6)")
      circle(x="point(7, 10)")
      circle(x="point(8, 1)")
      circle(x="point(10, 1)")

::: column(width=350)

This relation [[fails | passes]] the vertical line test:

    x-geopad.verticalLineTest(width=350 height=350 x-axis="-10,10,1" y-axis="-10,10,1" axes grid padding=8): svg
      circle(x="point(-6, 5)")
      circle(x="point(-6, -7)")
      circle(x="point(0, -8)")
      circle(x="point(0, 5)")
      circle(x="point(3, -8)")
      circle(x="point(3, -9)")
      circle(x="point(9, 2)")
      circle(x="point(9, -4)")
      circle(x="point(10, -4)")
      circle(x="point(10, -9)")

:::

---

### Functions

In math, relations that are one-to-one or many-to-one are particularly important, and we will see many more examples in later chapters. That’s why they have a special name: Functions. A [__function__](gloss:function) is a rule that assigns each input to  [[exactly one | at least one]] output.

---
> id: select-functions

Let’s return to the Hoctagon relations from the very beginning of this chapter. Which of them are functions?

**Students to Houses** is [[many-to-one | one-to-many | many-to-many | one-to-one]], which makes it [[a function | not a function]]:

    x-relation
      .item(slot="domain" name="a") **Current User**
      .item(slot="domain" name="b") Phineas Lynch
      .item(slot="domain" name="c") Sturgis Switch
      .item(slot="domain" name="d") Dilys Derwent
      .item(slot="domain" name="e") Demelza Zabini
      .item(slot="domain" name="f") Bogod Clearwater
      .item(slot="range") Lionpaw
      .item(slot="range") Eaglewing
      .item(slot="range") Badgerclaw
      .item(slot="range") Serpentfang

**Students to Classes** is [[many-to-many | many-to-one | one-to-many | one-to-one]], which makes it [[not a function | a function]]:

    x-relation
      .item(slot="domain" name="a") **Current User**
      .item(slot="domain" name="b") Phineas Lynch
      .item(slot="domain" name="c") Sturgis Switch
      .item(slot="domain" name="d") Dilys Derwent
      .item(slot="domain" name="e") Demelza Zabini
      .item(slot="domain" name="f") Bogod Clearwater
      .item(slot="range") Potions
      .item(slot="range") Transfiguration
      .item(slot="range") Magical Creatures
      .item(slot="range") Broomstick Flying
      .item(slot="range") Charms


**Wands to Students** is [[one-to-one | many-to-one | many-to-many | one-to-many]], which makes it [[a function | not a function]]:

    x-relation
      .item(slot="domain")
        img(src="images/wand-1.png" width=200 height=30)
        span.caption Birch, phoenix feather, 5 3/4
      .item(slot="domain")
        img(src="images/wand-2.png" width=200 height=30)
        span.caption Oak,dragon heartstring, 6 9/16
      .item(slot="domain")
        img(src="images/wand-3.png" width=200 height=30)
        span.caption Oak, unicorn hair, 6 5/8
      .item(slot="domain")
        img(src="images/wand-4.png" width=200 height=30)
        span.caption Yew, kneazle whicker, 4 9/16
      .item(slot="domain")
        img(src="images/wand-5.png" width=200 height=30)
        span.caption Yew, unicorn hair, 5 7/8
      .item(slot="range" name="a") **Current User**
      .item(slot="range" name="b") Phineas Lynch
      .item(slot="range" name="c") Sturgis Switch
      .item(slot="range" name="d") Dilys Derwent
      .item(slot="range" name="e") Demelza Zabini

---
> id: function-machines
> goals: monkey fox smile

Think of a function as a machine that accepts an object, changes it, and gives it back. Here is a function machine that puts hats on things:

    x-function-machine(width=400 height=200 id="hat-machine"): svg
      g.input(name="monkey" output="hat-monkey" id="monkey" hint="Woah, Hat Monkey!")
        text 🙊
      g.input(name="fox" output="hat-fox" hint="Hat Fox! Amazing!")
        text 🦊
      g.input(name="smile" output="hat-smile" hint="Hat Smiley?? YES!")
        text 😃
      g.operation
        text 🎩
      g.output(name="hat-monkey")
        text 🙊
        text(y=-6) 🎩
      g.output(name="hat-fox")
        text 🦊
        text(y=-6) 🎩
      g.output(name="hat-smile")
        text 😃
        text(y=-6) 🎩
    x-gesture(target="#monkey" slide="300, 0")

---
> id: function-notation

In math we have a simple way to write functions. This notation tells us the name, the input value, and the rule that provides the output value for a function.

Let's use our top hat function as an example. If we call the function "f", and the input "x", we could write the function like this:

TODO: Emoji latex
```latex
f(x) = _{x}^{🎩}
```

If x=🙊, we know that f(x)=![A monkey with a hat on](/content/functions/images/hat-monkey.png). Similarly, if f(x)=![A fox with a hat on](/content/functions/images/hat-monkey.png), we know x=[[🦊|🙊|😃|🎩]].

| Function Name | | Input Value |   | Output Value |
| :-----------: | |:---------: | :---:| :-------: |
|      _f_      | |      _(x)_ | = | _rule_ |

Let’s use this pattern to describe the sorting hat function, which we'll name "sort". *sort* takes a *Student Name* as input and outputs a *House Name*:

sort(Student Name) = House Name

At the beginning of the chapter, you set up this relation for the Sorting Hat:

TODO: Load state from earlier interactive

    x-relation
      .item(slot="domain" name="a") **Current User**
      .item(slot="domain" name="b") Phineas Lynch
      .item(slot="domain" name="c") Sturgis Switch
      .item(slot="domain" name="d") Dilys Derwent
      .item(slot="domain" name="e") Demelza Zabini
      .item(slot="domain" name="f") Bogod Clearwater
      .item(slot="range") Lionpaw
      .item(slot="range") Eaglewing
      .item(slot="range") Badgerclaw
      .item(slot="range") Serpentfang

According to your relation, what House Name does _sort_ return for each of these students?

sort({current user name})= [[{current user house} | not {current user house}1 | not {current user house}2  |not {current user house}3 ]]

sort(Sturgis Switch) = [[{Sturgis Switch’s house} | not {Sturgis Switch’s house}1  | not {Sturgis Switch’s house}2 | not {Sturgis Switch’s house}3]]

sort(Demelza Zabini) = [[{Demela Zabini's house} | not {Demela Zabini's house}1  | not {Demela Zabini's house}2 | not {Demela Zabini's house}3]]

### Functions with Numbers
> id: number-functions

A function maps a set of inputs to a set of outputs. That could be Emojis to Emojis With Hats, or Student Names to House Names… but naturally, in math our functions typically map Numbers to other Numbers.

Here's a function machine that adds +1 to a given number:

    x-function-machine(width=400 height=200 id="plus-one-machine"): svg
      g.input(name="two" output="three" hint="2+1=3")
        text 2
      g.input(name="five" output="six" hint="5+1=6")
        text 5
      g.input(name="eight" output="nine" hint="8+1=9")
        text 8
      g.operation
        text x+1
      g.output(name="three")
        text 3
      g.output(name="six")
        text 6
      g.output(name="nine")
        text 9

So for this function, we know that f(3)=[[4]]

---

Let's try another simple function, `f(x)=x^2`:

| _f(x)_ | _=_ | _x•x_ |
| :-----------: | :---------: | :-------: |
| f(2) | = | [[4]] |
| f(3) | = | [[9]] |
| f(-1) | = | [[1]] |

---
> id: numerical-coordinate-functions
> goals: negative-two negative-one zero one two

Just like before, we can plot functions on a coordinate system. The horizontal x-axis represents the input, and the vertical y-axis represents the output. Let's plot `f(x)=x^2`:

::: column(width=300)

    x-function-machine(id="x-squared-machine" width=300 height=350): svg
      g.input(name="negative-two" value=-2 output="four" hint="-2•-2=4")
        text -2
      g.input(name="negative-one" value=-1 output="one" hint="-1•-1=1")
        text -1
      g.input(name="zero" value=0 output="zero" hint="0•0=0")
        text 0
      g.input(name="one" value=1 output="one" hint="1•1=1")
        text 1
      g.input(name="two" value=2 output="four" hint="2•2=4")
        text 2
      g.operation
        text x•x
      g.output(name="four" value=4)
        text 4
      g.output(name="one" value=1)
        text 1
      g.output(name="zero" value=0)
        text 0

::: column(width=200)

    x-geopad(id="x-squared-plot" width=200 height=350 x-axis="-3,3,1" y-axis="-5,5,1" axes grid padding=8): svg

:::

---
> id: numerical-plot
> goals: plotPoints

With just a few input values, we can see `f(x)=x^2` tracing out a shape. Let's plot even more points here to get a better look at our function:

    x-geopad(id="x-squared-plotter" width=400 height=400 x-axis="-4,4,1" y-axis="-1,8,1" axes grid padding="24 8 8 8" count=10): svg

    x-gesture(target="#x-squared-plotter")

---
> id: pick-domain

### Finding Domain and Range

Let's find the domain and range for this function. Remember, the domain is **all possible inputs** and the range is **all possible outputs**. Which of these are possible inputs for `f(x)=x^2`?

    x-picker.numberPicker
      .item#item1 -2
      .item 4
      .item 8.5
      .item(data-error="invalid-domain-emoji") 🦊
      .item -1.2
      .item 0

    x-gesture(target="#item1")

---
> id: input-domain

All those numbers are valid because _any_ point on the number line works as input for `f(x)=x^2`. We could write the domain like this (remember that ∞ means infinity):

**Domain:**

`x` [[ > | < | = | ≤ | ≥ ]] `-∞`

`x` [[ < | > | = | ≤ | ≥ ]] `∞`

Here's a slightly simpler way to write the same thing:

**Domain:** `-∞` [[ < | > | = | ≤ | ≥ ]] `x` [[ ≤ | > | = | < | ≥ ]] `∞`

---
> id: pick-range

Now let's look at the range. Which are possible outputs for `f(x)=x^2`?

    x-picker.numberPicker
      .item(data-error="invalid-range-negative") -2
      .item 4
      .item 8.5
      .item(data-error="invalid-range-emoji") 🦊
      .item(data-error="invalid-range-negative") -1.2
      .item 0

---
> id: input-range

For `f(x)=x^2` every number is a possible input, but _not_ every number is a possible output. Specifically, the output can never be less than [[zero | one | negative one]]. So we could write the range like this:

**Range:** [[0]] ≤ `f(x)` [[ < | > | = | ≤ | ≥ ]] `∞`

---
> id: find-domain-range-1

Let's try some other functions, starting with `f(x)=-x^2+3`. Use the function plotter to help you find the domain and range:

    x-geopad(id="domain-range-1-plot" width=400 height=400 x-axis="-4,4,1" y-axis="-5,4,1" axes grid padding="24 8 8 8"): svg

    x-gesture(target="#domain-range-1-plot")


**Domain:** `-∞` < `x` < `∞`

**Range**: `-∞` < `f(x)` [[ < | > | = | ≤ | ≥ ]] [[3]]

--------------------------------------------------------------------------------


## Graphing and Interpreting Functions

> section: graphing
> sectionStatus: dev
> id: vault-graph

The Olympics is full of incredible athletic feats. It’s also full of interesting data. Graphs help us visualize that data. During our time together today, we will watch Olympic competitions and analyse their graphs for interesting information. Let’s head over to the gymnastics arena!

::: column(width=240)

![Ri](/content/functions/images/ri_portrait.jpg)

::: column.grow

Ri Se-gwang of the People’s Republic of Korea is about to vault. He won the gold medal for the vault in the 2016 Summer Olympic Games. Let’s watch.

:::

    x-video-graph
        x-video(src="images/olympic_vault.mp4" poster="images/olympic_vault_poster.png" width=640 height=360 controls credit="©NBC")
        x-coordinate-system(width=640 height=180 x-axis="0,29.1,1" y-axis="0,10,1" axis-names="Distance,Height")

    // functions: https://www.desmos.com/calculator/td3fynck7q
    // TODO: Realistic height/distance values. 30m is arbitrary, and there's no way he hits 8 meters.

There are several things going on here. Move the video back and forth to see how the graph lines up with the motion.

First we need to understand what the axes represent. The X axis in this graph is the horizontal **Distance** Ri travels throughout his vault (measured in meters). The Y axis is the vertical **Height** Ri reaches (also in meters). Together these axes tell us every point along Ri's path.

    // TODO: Implement +/- ranges for these
Using this graph, we can see that Ri begins his vault at 25 meters, peaks at ([[27±0.5]], [[8±0.5]]), and lands at [[29±0.5]] meters.

---

> id: graph-match

Let’s build some intuition for what graphs of different events look like. Match each event to a graph.

    // TODO: Make completing this a required goal for this section

    x-relation#graph-match-relation(randomize="true" requireMatch="true")
      .item(slot="domain" name="vault" match="vault-graph") Vault
        x-video(src="images/olympic_vault.mp4" poster="images/olympic_vault_poster.png" width=320 height=180 controls credit="©NBC")
      .item(slot="domain" name="triple-jump" match="triple-jump-graph") Triple Jump
        x-video(src="images/olympic_triple_jump.mp4" poster="images/olympic_triple_jump_poster.png" width=320 height=180 controls credit="©ESPN")
      .item(slot="domain" name="dive" match="dive-graph") Diving
        x-video(src="images/olympic_dive.mp4" poster="images/olympic_dive_poster.png" width=320 height=180 controls credit="©Fina")
      .item(slot="domain" name="ski" match="ski-graph") Slalom Skiing
        x-video(src="images/olympic_ski.mp4" poster="images/olympic_ski_poster.png" width=320 height=180 controls credit="©Olympic")
      .item(slot="domain" name="hurdles" match="hurdles-graph") Hurdles
        x-video(src="images/olympic_hurdles.mp4" poster="images/olympic_hurdles_poster.png" width=320 height=180 controls credit="©Olympic")
      .item(slot="domain" name="swim" match="swim-graph") Swimming
        x-video(src="images/olympic_swim.mp4" poster="images/olympic_swim_poster.png" width=320 height=180 controls credit="©Olympic")
      .item(slot="range" name="vault-graph")
        x-coordinate-system(width=300 height=150 x-axis="0,30,1" y-axis="0,15,1" axis-names="Distance,Height" grid="no" labels="no" crosshairs="no" fn="6/(1+((x-24)/1)^4)")
      .item(slot="range" name="triple-jump-graph")
        x-coordinate-system(width=300 height=150 x-axis="0,30,1" y-axis="0,15,1" axis-names="Distance,Height" grid="no" labels="no" crosshairs="no" fn="2/(1+((x-16)*1.5)^4)+2.5/(1+((x-20)*1.5)^4)+3/(1+((x-25)/1.5)^4)")
      .item(slot="range" name="dive-graph")
        x-coordinate-system(width=300 height=150 x-axis="0,30,1" y-axis="0,15,1" axis-names="Distance,Height" grid="no" labels="no" crosshairs="no" fn="12-((x-1)*1)^2")
      .item(slot="range" name="ski-graph")
        x-coordinate-system(width=300 height=150 x-axis="0,30,1" y-axis="0,15,1" axis-names="Distance,Height" grid="no" labels="no" crosshairs="no" fn="15+sin(x/2)-x/2")
      .item(slot="range" name="hurdles-graph")
        x-coordinate-system(width=300 height=150 x-axis="0,30,1" y-axis="0,15,1" axis-names="Distance,Height" grid="no" labels="no" crosshairs="no" fn="1/(1+((x-3)*1.5)^4)+1/(1+((x-6)*1.5)^4)+1/(1+((x-9)*1.5)^4)+1/(1+((x-12)*1.5)^4)+1/(1+((x-15)*1.5)^4)+1/(1+((x-18)*1.5)^4)+1/(1+((x-21)*1.5)^4)+1/(1+((x-24)*1.5)^4)+1/(1+((x-27)*1.5)^4)")
      .item(slot="range" name="swim-graph")
        x-coordinate-system(width=300 height=150 x-axis="0,30,1" y-axis="0,15,1" axis-names="Distance,Height" grid="no" labels="no" crosshairs="no" fn="1")

---

> id: time-height-graph

These graphs tell us everything about the athlete's position, but they say nothing about **Time**. For example, during Ri Se-Gwang's vault we cannot tell _when_ he lands on the mat. We only see Height and Distance.

On our first graph, the X axis represented Distance (measured in meters). What if it represented Time (measured in seconds)?

    x-video-graph
        x-video(src="images/olympic_vault.mp4" poster="images/olympic_vault_poster.png" width=640 height=360 controls credit="©NBC")
        x-coordinate-system(width=640 height=180 x-axis="0,9.1,1" y-axis="0,10,1" axis-names="Time,Height")

This looks similar to our first graph. This makes sense, because the number of meters that Ri runs is closely related to the number of seconds that pass. However, now we can measure new things about Ri's vault; he begins running about 1.5 seconds after the video begins. He hits the table at about [[5.9]] seconds, peaks at [[6.4]] seconds, and lands at [[7.3]] seconds.

---

> id: time-distance-graph

Our last graph plotted Height by Time. We can also plot Distance by Time. Note that Time is still on the X axis, but Distance is now on the Y axis:

    x-video-graph
        x-video(src="images/olympic_vault.mp4" poster="images/olympic_vault_poster.png" width=640 height=360 controls credit="©NBC")
        x-coordinate-system(width=640 height=180 x-axis="0,9.1,1" y-axis="0,29.5,5" axis-names="Time,Distance")

This graph looks different than the other two, because it tells us nothing about [[Height|Distance|Time]].

But again, we can learn new things about Ri's vault. In the first few seconds, we can see him [[gaining|losing]] speed. He reaches his top speed after about [[4]] seconds. As he enters the vault, we see him [[losing|gaining]] speed.

---

> id: swim-graph

Let's head over to the pool. We are just in time for the men’s 50 meter freestyle finals! Keep a close eye on César Cielo Filho of Brazil:

    x-video-graph.horizontal
        x-video(src="images/olympic_swim.mp4" poster="images/olympic_swim_poster.png" width=640 height=360 controls credit="©NBC")
        x-coordinate-system(width=180 height=400 x-axis="0,21.5,10" y-axis="0,51,10" axis-names="Time,Distance" style="margin-left: 20px;")

::: column(width=240)

![César Cielo](/content/functions/images/cielo_portrait.jpg)

::: column.grow

What an emotional race for Cielo! He broke the world and olympic records with a time of 21.47 seconds. The graph shows Cielo’s record-breaking swim. The shape is one we have seen before in [graphing linear functions](/linear-functions/graphing-functions). Remember that every point on this graph represents an ordered pair: one input, and one output.

:::

We can use information from the graph to write the function describing Cielo’s swim. Let’s call the function f(t).

Remember the general form for a [__linear function__](gloss:linear-function) like this is y=mx+c, where m is the slope and c is the y-intercept. Our function f(t) has the same form, but we replace x with t:

{.text-center} `y=mx+c`  
⇓<br>
`f(t)=m`[[t]]`+c`

This means we have two remaining unknown variables: [[m]] and [[c]].

---

> id: measure-slope-1

::: column(width=180)

    x-coordinate-system(width=170 height=350 x-axis="0,21.5,10" y-axis="0,51,10" axis-names="Time,Distance" fn="x*50/21.47")

    // TODO: Fix targeting of swim-x-axis and swim-y-axis

::: column.grow

Notice the [horizontal-axis](target:swim-x-axis) in this graph shows [[time | distance | speed]] in seconds. The [vertical-axis](target:swim-y-axis) is the distance travelled by Cielo, measured in [[meters]].

We see that the graph [__intercepts__](gloss:intercept) the y-axis at [[0]] meters. Now we can fill in c, our y-intercept variable:

{.text-center} `f(t)=mt+c`  
⇓<br>
`f(t)=mt+`[[0]]

:::

---

> id: measure-slope-2

Now the only variable we are missing is m, our [__slope__](gloss:line-slope). In this function, slope represents Cielo’s [[speed | distance | kick rate]]. How could we use the graph to measure this?

::: column.grow

Remember that slope is "Rise over Run", meaning Vertical Change (rise) divided by Horizontal Change (run). In this case, that means [[distance | time | speed]] divided by [[time | distance | speed]].

In this race, Cielo travels 50 meters in 21.47 seconds. So our slope is [[50]] divided by 21.47, or (roughly) 2.33. Now we can fill in our slope variable, m:

{.text-center} `f(t)=mt+0`  
⇓<br>
`f(t)=`[[2.33±0.01]]`t+0`

::: column(width=180)

    x-coordinate-system(width=170 height=350 x-axis="0,21.5,10" y-axis="0,51,10" fn="x*50/21.47")

    // TODO: Is there a way to reverse column order? I want this to display right of text on wide screens, but above text on narrow.

:::

---

> id: measure-slope-3

::: column(width=180)

    x-coordinate-system#slope-graph-3(width=170 height=350 x-axis="0,21.5,10" y-axis="0,51,10" fn="x*50/21.47")

::: column.grow

    // TODO: Can I `align-items: center;` this column group?

Another way to measure the slope is to ask "how many meters does Cielo swim in one second?"

    // TODO: Fix targeting!
Check the [{.red} graph](target:#slope-graph-3) yourself; in a single second, the graph "rises" [[2.33±0.03]] meters and "runs" [[1]] second. This gives us a slope of [[2.33±0.03]]

The slope is the same at every point on this graph, because Cielo’s speed [[stayed constant | increased | decreased]] for this race. This is a key feature of linear functions.

:::

---

> id: swim-algebra

Now we have a complete linear function: `f(t)=2.33t+0`

What can we do with this? Well, let’s say we want to know how long it took Cielo to swim the first 10 meters. `f(t)` is the [[distance | time | speed]] Cielo swims, so at 10 meters `f(t)=`[[10]]. We need to solve for t, the number of seconds it takes to reach that point:

{.text-center} `f(t)=2.33t+0`  
[[10]]`=2.33t`  
`10/(2.33)=`[[t]]  
[[4.3±0.01]]`=t`

    // TODO: Ask if we should assume students have access to a calculator

There you have it; Cielo swims the first 10 meters in about [[4.3±0.01]] seconds.

---

> id: swim-system

Now let's take a look at the top four finishers during this race:

::: column.grow

    // NOTES
    // Lines are labeled with the swimmer’s name and the function name. Moving the cursor along the active line show crosshairs extending to the axes. Students can also select a line, then select a value along one of the axes to lock the crosshairs to that value.
| Swimmer | | Function Name |
| :------ | | :------------ |
| Cesar Cielo Filho | | {.red#cielo-distance} `f(t)=0` |
| Amaury Leveaux | | {.blue#leveaux-distance} `l(t)=0` |
| Alain Bernard | | {.green#bernard-distance} `b(t)=0` |
| Ashley Callus | | {.purple#callus-distance} `c(t)=0` |

::: column(width=220)

    x-coordinate-system#multi-swimmer-graph(width=200 height=260 x-axis="0,25,10" y-axis="0,51,10" axis-names="Time,Distance" crosshairs="no")

:::

{.text-center#time-variable-text} `t=0`
    
    x-slider#swim-slider(steps=500)

    x-gesture(target="#swim-slider .bar .knob" slide="100,0")

All the lines cross the y-axis at [[0]] meters because this is where the race begins. At first glance, we notice the graphs seem almost on top of each other. This must indicate that the swimmers’ speeds are similar.

We calculated above that Cielo swam 10 meters in 4.3 seconds. But what if we want to know how many seconds behind Leveaux was at that point? We know the equation for `f(t)`, but not `l(t)`. However, we have the graph. Using the slider [__slider__](target:swim-slider), we can learn that `l(t)=10` when `t=`[[4.55]]. That means at 10 meters Leveaux was [[.22±0.03]] seconds behind Cielo.

Leveaux and Bernard trained together, and it shows. They stay neck-in-neck the whole race. They finish only [[0.4±.05]] seconds apart.

What about the 20 meter mark? How long does it take for each swimmer to reach that point?

| {.red} `f(8.6)= `[[20]] | {.blue} `l`([[9.15]])`=20`|
| {.green} `b`([[9.3]])`=20` | {.purple} `c`([[9.7]])`=20` |

These are just a few things we can learn about the race by graphing each swimmer's performance. Now let’s head over to the diving pool for the women’s 10 meter platform competition.

---

> id: dive-graph
> goals: card1 card2 card3 card4 card5 card6

Meanwhile, on the other side of the Aquatics center, a diving competition is in progress.
Ren Qian is among the youngest Olympic medalists. She is diving now - let’s [watch](https://www.youtube.com/watch?v=wTX13JZFHd4)
     
    x-video-graph.horizontal
        x-video(src="images/olympic_dive.mp4" poster="images/olympic_dive_poster.png" width=640 height=360 controls credit="©Fina")
        x-coordinate-system(width=180 height=400 x-axis="0,4.3,1" y-axis="-8,12.5,4" axis-names="Time,Height" style="margin-left: 20px;")

::: column.grow

Ren Qian of China won the gold medal for diving in the 2016 Summer Olympic Games.

::: column(width=240)

![Ren image mock-up](/content/functions/images/ren_portrait.jpg)

:::

Let’s call the function representing Ren’s dive d(t). The input values, t, are seconds from the start of her dive. The output values, d(t), are Ren’s [[height]] above the water. Immediately, we notice the shape of this graph is different from the swimming graphs above. This graph has [[2]] turning points compared to a linear function's [[0]] turning points.

Graphs with this shape are called cubic functions. We can get important information from the graph even without knowing the function equation. Match the given statements to the graph.

    x-card-graph
        x-coordinate-system(width=500 height=300 x-axis="0,4.3,1" y-axis="-8.5,12.5,4" axis-names="Time,Height" crosshairs="no")

Recall that for any function, the y-intercept is where t=[[0]]. In function notation, this looks like d([[0]])=10.

Similarly, the x-intercepts are where [[d(t) | t]]=0. This graph has [[2]] x-intercepts. They represent the surface of the water.

---

When we talk about the maximum, we are really talking about the highest [[d(t) | t]] value. Ren’s greatest height is [[10.8±0.3]] meters, which she reaches after [[0.3±0.2]] seconds. In function notation, this looks like d([[0.3±0.2]])=[[10.8±0.3]].

The minimum is Ren’s lowest height. In this graph her lowest point is underwater. Because the x-axis represents the surface of the water, the minimum d(t) is [[negative | positive | zero]]. She turns around [[3.2±0.3]] seconds after diving.

---

> id: dive-intervals
> goals: card0 card1 card2

Intuitively, we understand that the graph is increasing when Ren’s body is moving [[up | down]]. The notation for increasing is different from turning points and intercepts. Since the graph increases for more than one point, we represent the section of the graph using an [__interval__](gloss:interval). The interval specifies the [[t | d(t)]] values corresponding to Ren’s increasing height. Note that there are many different ways to write intervals; in this chapter, we will write them as [__inequalities__](gloss:inequality). We'll break this graph into three intervals:

    x-card-graph
        x-coordinate-system(width=500 height=300 x-axis="0,4.3,1" y-axis="-8.5,12.5,4" axis-names="Time,Height" crosshairs="no")

Notice the [[maximum | minimum]] is where Ren’s path changes from increasing to decreasing heights. The [[minimum | maximum]] is where Ren’s path changes from decreasing to increasing.

---

> id: dive-domain-range

Let’s think about the input and output values for d(t). Recall [__domain__](gloss:domain) is the set of all possible input values for d(t). One method for finding the domain is starting with the set of [Real numbers](gloss:real-numbers) and narrowing down to match the situation.

Ren’s dive begins at 0 seconds. She resurfaces at about t=[[4.2±0.2]] seconds. Therefore, we can write the domain as [[0]]≤x≤[[4.2±0.2]]. Note that we're using `≤`, which unlike `<` [[includes | excludes]] the minimum and maximum values.

Recall [__range__](gloss:range) is the set of all heights Ren travels. We can use the function’s [[minimum | maximum | horizontal intercept | vertical intercept]] to determine the lower bound on the range.  On this graph, that's about [[-7.6±0.5]] meters.

Similarly, the maximum d(x) gives us the upper bound on the range. Therefore, the range is [[-7.6±0.5]] ≤ d(x) ≤ [[10.8±]].

___

> id: pole-vault
> goals: submitCorrect

### Creating Graphs

The women’s pole vault is just about to start. Ekaterini Stefanidi takes her position:

    x-video#pole-vault-video(src="images/olympic_pole_vault.mp4" poster="images/olympic_pole_vault_poster.png" width=640 height=360 controls credit="©Olympics")


You will be drawing the graph for this event. Here is everything you need to know:

- The runway is 40m long
- The pole is 4.45m long
- The landing pad is 5x5x0.8m
- The bar is 4.85m high

Good luck!

    x-draw-graph#pole-vault-graph
        x-coordinate-system(width=600 height=200 x-axis="0,45.5,5" y-axis="0,5.1,1" axis-names="Distance,Height" crosshairs="no")
        div.scoring-row
            button.btn Submit
            div.judge-text
            div.scores

    x-gesture(target="#pole-vault-graph")

---

> id: running-graph

### Systems of Functions/ Simultaneous Functions

Let’s head over to the track for the women’s 800 meter final. Looks like we arrive in time to catch the last 200 meters of the race:

    x-video-graph#running-video-graph
        x-video(src="images/olympic_running.mp4" poster="images/olympic_running_poster.png" width=640 height=360 controls credit="©RA")
        div
            div.runner-name-key
                div
                    img(src="images/tracey_face.png")
                    div.red Adelle Tracey
                    div g(t)
                div
                    img(src="images/boufaarirane_face.png")
                    div.green Laila Boufaarirane
                    div f(t)
                div
                    img(src="images/rogers_face.png")
                    div.blue Raevyn Rogers
                    div u(t)
            x-coordinate-system(width=400 height=320 x-axis="80,130,10" y-axis="550,800,50" axis-names="Time,Distance")

[800 M mock-up](https://www.desmos.com/calculator/msryjohuz9)

When we have two or more function on the same coordinate plane, we call them a [__system of equations__](gloss:system-of-equations). Systems like this add key features that help us further understand what is happening in the race between Tracey, Boufaarirane, and Rogers. For example, something interesting is happening when the graphs intersect. Select all the true statements about the intersection points in this system.

    // NOTES
    // Multiple select

| Tracey and Rogers are at the same location. | | g(t) = u(t) | | Rogers is ahead of Boufaarirane. | | u(t) < f(t) |
| Boufaarirane and Rogers are at the same location. | | f(t) = u(t) | | Tracey is behind Rogers. | | g(t) > u(t) |

The graphs intersect when one runner passes another. When the runners have about 200 meters left in their race, [[Rogers | Boufaarirane | Tracey]] is in third place.

---

Rogers passes Boufaarirane at about [[97±3]] seconds when they are both about [[630±10]] meters into the race. In function notation, this looks like f([[97±3]])=u([[97±3]])=[[630±10]].

About [[13.5±1]] seconds later, Rogers overtakes [[Tracey | Rogers | Boufaarirane]]. They have about [[73±10]] meters to the finish line.

---

> id: running-slope-rogers

The slope of each function tells us that runner’s [[speed | distance | time]]. Let's focus on Rogers:

    x-coordinate-system#rogers-slope-graph(width=400 height=200 x-axis="80,130,10" y-axis="550,800,50" axis-names="Time,Distance" fn="7.10179x-53.6354")

Remember that slope (m) is change in y over change in x. Written out, it looks like this:

{.text-center} `m=(y_2 - y_1)/(x_2 - x_1)`  

Let's calculate our change in x first. We'll use the period from `t=90` to `t=100`. This is a period of [[10]] seconds, which means:

{.text-center} `x_2-x_1=`[[10]]

---

Now we need to calculate `y_2-y_1`. We know that `y_1=u(90)`, and `y_2=`u([[100]]).

Using the graph above, we can see that `u(100)=`[[656.5]] and `u(90)=`[[585.5]]. So now we can calculate:

{.text-center} `y_2-y_1=u(100)-u(90)=`[[71]]

---

Now we have everything we need to finish our equation:

{.text-center} `m=(y_2 - y_1)/(x_2 - x_1)=`[[7.1]] 

---

> id: running-slope-boufaarirane

Let's follow the same process for Boufaarirane—but this time, you're on your own!

    x-coordinate-system#boufaarirane-slope-graph(width=400 height=200 x-axis="80,130,10" y-axis="550,800,50" axis-names="Time,Distance" fn="5.709x+80.55")

It's simple, just fill in the formula:

{.text-center} `m=(y_2 - y_1)/(x_2 - x_1)=`[[5.71±0.2]]

So Rogers could overtake Boufaarirane in the last 200 meters of the race because she was running [[1.4±0.2]] meters per second faster.

---

> id: running-cards
> goals: card0 card1 card2 card3 card4

In this system of functions, we can see who is ahead at any given time during the race. For example, we write f(t) > u(t) when [[Boufaarirane is ahead of Rogers | Rogers is ahead of Boufaarirane]].


    x-card-graph#runner-card-graph
        div
            div
                div.red Tracey
                div g(t)
            div
                div.green Boufaarirane
                div f(t)
            div
                div.blue Rogers
                div u(t)
        x-coordinate-system(width=600 height=400 x-axis="90,130,10" y-axis="600,800,50" axis-names="Time,Distance" crosshairs="no")

---

When we talk about one function being greater than another, we are using the [[output | input]] values to identify a range of [[input | output]] values. For example, we see Tracey is ahead of Boufaarirane for this entire stretch of the race. This is expressed as [[g(t) > f(t) | g(t) < f(t)]]. We can think of this as “the range of time when Tracey has run a farther distance than Boufaarirane”. That range is [[90.5±1]] ≤ t ≤ [[121±1]]. We can do a similar analysis for each pair of functions.

Looking at the three functions on the coordinate plane, we can see that the relationship between u(t) and g(t) changes from g(t)>u(t) to u(t)>g(t) when [[Rogers passes Tracey | Tracey passes Rogers | Rogers passes Boufaarirane | Boufaarirane passes Rogers]]. This means that the upper bound on g(t)>u(t) is where g(t) [[= | < | >]] u(t), which is t=[[110±2]] seconds. This t-value is also the lower bound on u(t)>g(t).

----

> id: fn-sketch

Finally, here is one more function that represents a sport. Can you think of what it is, and write a short story that explains the different features of the chart?

TODO: draw chart
<< free-form text input >>

Draw a Function:

    x-coordinate-sketch(width=600 height=400 x-axis="-1,10,1" y-axis="-5,5,1")
      button.btn.clear Clear

Type some text:

    x-free-text(placeholder="Your answer…")

--------------------------------------------------------------------------------

## Piecewise Functions

> section: piecewise
> id: piecewise-intro

::: column.grow

Only the most elite athletes make it to the Olympics. However, similar athletic events are enjoyed by people all around the world—and we can graph those too. One popular choice is the triathlon, where athletes complete an epic long-distance race broken into three distinct events.

Triathlons can be any combination of three sports—some involve canoeing, ice skating, and at least one even features rappelling—but the most common arrangement is **swim**, **bike**, **run** (in that order).

::: column(width=200)

![Three images showing the parts of a typical triathlon: swimming, biking, and running.](/content/functions/images/swim_bike_run.png)

:::

Since [[biking | swimming | running]] is the fastest and [[swimming | biking | running]] is the slowest, which of these graphs best represents such a race?

    x-picker.graphPicker
      .item
        x-coordinate-system#graph1(width=200 height=200 x-axis="0,65,10" y-axis="0,5.5,1" axis-names="Time,Distance" crosshairs="no")
      .item(data-error="swimming-faster-running")
        x-coordinate-system#graph2(width=200 height=200 x-axis="0,65,10" y-axis="0,5.5,1" axis-names="Time,Distance" crosshairs="no")
      .item(data-error="wrong-distance")
        x-coordinate-system#graph3(width=200 height=200 x-axis="0,65,10" y-axis="0,5.5,1" axis-names="Time,Distance" crosshairs="no")
      .item(data-error="running-too-fast")
        x-coordinate-system#graph4(width=200 height=200 x-axis="0,65,10" y-axis="0,5.5,1" axis-names="Time,Distance" crosshairs="no")

---

> id: piecewise-definition

::: column.grow#piecewise-description-column

This is called a [__piecewise function__](gloss:piecewise), where different rules apply within different ranges of input values. Notice how the [{.red}first](target:line1) segment has a different slope than the [{.blue}second](target:line2) segment, and occupies a different range of inputs.

For example, the [{.green}third](target:line3) segment has a slope of `1/20`, begins at `t=`[[40]], and ends at `t=`[[60]].

::: column.grow#piecewise-graph-column

    x-coordinate-system.piecewise-cases(width=300 height=300 x-axis="0,65,10" y-axis="0,5.5,1" axis-names="Time (min),Distance (km)" crosshairs="no")

:::

---

> id: piecewise-cases

One of the most common ways to write piecewise functions is by using "cases":


::: column.piecewise-function-left(style="width:60px; margin:0;")

`d(t)=`

::: column(style="width:240px;")

{div.red}(`(1/40 t, 0 ≤ t < 20)`,

{div.blue}`(6/40 t, 20 ≤ t < 40)`,

{div.green}`(3/40 t, 40 ≤ t ≤ 60)`:)

:::

Each case defines a function rule and a range of input values where the rule applies. So `t=44` falls into the [[third | second | first]] case, and `t=6` falls into the [[first | second | third]] case.

---

> id: piecewise-endpoints

Let's look at the speed of each segment, which we'll call `s(t)`. Recall that our speed is equal to the [[slope | y-axis | area]] of the previous graph:

    x-coordinate-system.piecewise-step(width=600 height=200 x-axis="0,65,10" y-axis="0,0.25,0.1" axis-names="Time (min),Speed (km/min)" crosshairs="no")

Notice that each segment has two endpoints, but there are *two kinds* of endpoints: [__closed ●__](target:closed-endpoint) and [__open ◦__](target:open-endpoint). A closed endpoint means the segment includes that point. An open endpoint means the segment includes everything _until_ that point, but not the point itself. This means a closed endpoint represents [[≤ | < | =]] and an open enpoint represents [[< | ≤ | =]].

---

> id: endpoints-1
> goals: endpoint-puzzle

Make the endpoints match the ranges. Remember that ● represents ≤, and ◦ represents <:

    x-piecewise-endpoint-puzzle#endpoints-1
        div
            x-coordinate-system(width=600 height=200 x-axis="0,11,1" y-axis="0,6,1" axis-names="X,Y" crosshairs="no")
            div.scoring-row
                button.btn Submit
                div.prompt-text
    x-gesture(target="#endpoints-1 .endpoint")

    // TODO: Make gesture successfully target dot

---

> id: endpoints-2
> goals: endpoint-puzzle

Now try this one!

    x-piecewise-endpoint-puzzle#endpoints-2
        div
            x-coordinate-system(width=600 height=200 x-axis="0,11,1" y-axis="0,6,1" axis-names="X,Y" crosshairs="no")
            div.scoring-row
                button.btn Submit
                div.prompt-text

---

> id: endpoints-3
> goals: endpoint-puzzle

How about this one?

    x-piecewise-endpoint-puzzle#endpoints-3
        div
            x-coordinate-system(width=600 height=200 x-axis="0,11,1" y-axis="0,6,1" axis-names="X,Y" crosshairs="no")
            div.scoring-row
                button.btn Submit
                div.prompt-text

---

> id: endpoints-4
> goals: endpoint-puzzle

Now make a function that covers the whole range of `1 ≤ x ≤ 10` (remember, a function must pass the [__Vertical Line Test__](gloss:vertical-line-test)—only one output per input!):

    x-piecewise-endpoint-puzzle#endpoints-3
        div
            x-coordinate-system(width=600 height=200 x-axis="0,11,1" y-axis="0,6,1" axis-names="X,Y" crosshairs="no")
            div.scoring-row
                button.btn Submit
                div.prompt-text

---

> id: piecewise-data

Great! Now fill out the piecewise function for our original triathlon speed graph:

::: column.piecewise-function-left(style="width:60px; margin:0;")

`s(t)=`

::: column(style="width:240px;text-align:left;")

{div.red}((`1/40`, 0 ≤ d < [[20]]),

{div.blue}(`6/40`, 20 [[ ≤ | < | > | ≥ ]] d < 40),

{div.green}(`3/40`, 40 ≤ d [[ ≤ | < | > | ≥ ]] 60):)

:::

    x-coordinate-system.piecewise-step.piecewise-data(width=600 height=200 x-axis="0,65,10" y-axis="0,0.25,0.1" axis-names="Time (min),Speed (km/min)" crosshairs="no")

---

> id: step-function

The function s(d) is a special kind of piecewise function called a [__step function__](gloss:step-function). One major difference between s(d) and d(t) above is all the slopes in s(d) are [[0]].

---

> id: triathlon-graph
> goals: submitCorrect

The data from our first graph, `d(t)`, is a little unrealistic for the sake of explanation. Let's draw a graph to represent a real-world race. Here's everything you need to know about the function for our new race, `l(t)`:

- The swimming portion is 2km
- The biking portion is 40km
- The running portion is 10km
- `l(t)` matches the following 3 cases—though we've hidden the rule for each case!

::: column.piecewise-function-left(style="margin:0; width:60px;")

`l(t)=`

::: column.piecewise-function-right
    // TODO: Fix large open and close parenths

{div}(`(s(t), 0≤t≤25),`

{div}`(b(t), 25<t≤85),`

{div}`(r(t), 85<t≤125)`:)

:::

    x-draw-graph#draw-triathlon-graph(score-threshold=0.98, snap=1)
        x-coordinate-system(width=600 height=300 x-axis="0,125,10" y-axis="0,55,10" axis-names="Minutes,Kilometers" crosshairs="no")
        div.scoring-row
            button.btn Submit
            div.judge-text
            div.scores

    x-gesture(target="#draw-triathlon-graph")

---

> id: triathlon-slopes

Now that we have the graph, let's calculate the slope of each segment. Recall that [__slope__](gloss:slope) is equal to Rise over Run. We'll start with the swimming segment:

{.text-center}**Rise** is the distance swam: [[2]]km

{.text-center}**Run** is the time swimming: [[25]]min

{.text-center}**Slope** is equal to `Rise/Run`: [[0.08]]km/min

---

Now do the same for the other two segments:

| | **Swimming** | **Biking** | **Running** |
| **Rise** | 2km | [[40]]km | [[10]]km |
| **Run** | 25min | [[60]]min | [[40]]min |
| **Slope** | 0.08km/min | [[0.66±0.01]]km/min | [[0.25]]km/min |

---

> id: triathlon-adjustments

Triathlons are exciting because you don't need to be the fastest at every sport; you only need to cross the finish line first. Say you finish the swim segment a whole 15 minutes slower than the graph above. What speed—or slope—do you need during the biking segment to finish at the same time?

(hint: you'll need to finish the biking segment 15 minutes faster!)

| | **Swimming** | **Biking** | **Running** |
| **Rise** | 2km | 40km | 10km |
| **Run** | 40min | [[45]]min | 40min |
| **Slope** | 0.05km/min | [[0.88±0.01]]km/min | 0.25km/min |

---

That's pretty fast. Say you can only bike at 0.8km/min; now how fast do you need to run to catch up?

| | **Swimming** | **Biking** | **Running** |
| **Rise** | 2km | 40km | 10km |
| **Run** | 40min | [[50]]min | [[45]]min |
| **Slope** | 0.05km/min | 0.8km/min | [[0.22]]km/min |

---

What an exhausting day. Let's go relax with some video games in the next chapter.

--------------------------------------------------------------------------------


## Absolute Value Functions

> section: absolute-value
> sectionStatus: dev

    // NOTE
    // Local server trouble - not able to visualize design decisions. Followed the conventions I could find in terms of notes, fixme tags, image/ graph mock-ups, and targets. Targets do not have objects set, but the syntax should indicate where the target is intended to go. Worked last to first. Some of these conventions change as I learned more from other code.

::: column.grow

Atari's Pong, released in 1972, launched the video gaming industry as we know it. The game is effectively a digital table tennis game. Pong is so popular that pop culture still references it today.

These days gamers can play internet-based variations of pong or visit an arcade with an original Atari Ping console.

    // REFERENCE ONLY
    // [https://www.youtube.com/watch?time_continue=9&v=fiShX2pTz9A&feature=emb_logo](https://www.youtube.com/watch?time_continue=9&v=fiShX2pTz9A&feature=emb_logo)

MathiPong pays homage to this titan in gaming history. The objective is to direct the ball to the target. Choose regular or challenge mode to get started.

::: column(width=240)

![](https://upload.wikimedia.org/wikipedia/commons/3/32/Signed_Pong_Cabinet.jpg)

    // Source: https://commons.wikimedia.org/wiki/File:Signed_Pong_Cabinet.jpg

:::

    x-pong
        x-coordinate-system(width=600 height=300 x-axis="-10,10,1" y-axis="0,10,1" crosshairs="no")

    // NOTES
    // onboard the game. User uses arrow keys to move platform. Platform is wider than the point shown.
    // User plays several rounds.

![](/content/functions/images/4/Screenshot_2020-06-29_at_13.53.44.png)

Now that you've played a few rounds and have the idea of how the game works, let's think about a strategy for hitting the target. Let's take a look at the game on a coordinate plane.

    // NOTES
    // The animation mock-ups are on a loop for minimal clicking in this draft. I don't think they need to be on a loop in the final. In fact, I actually envision these happening on one coordinate plane. This would make each a different state of the same interactive.
    // Left column shows states of game. Right column is the text matching the state. In final version of the chapter, this won't need to be a series of columns.

::: column(width=240)

[https://www.desmos.com/calculator/vy9nhnyp1z](https://www.desmos.com/calculator/vy9nhnyp1z)

::: column.grow

If we just let the ball fall from the upper left part of the screen. It's path will look like [this](target:1_linearGraph). Here we recognise the slope of the line describing the path of the ball is [[-1]]. Given that this line crosses the origin, the function is f(x)=-x.

::: column(width=240)

[https://www.desmos.com/calculator/yyoqeezli2](https://www.desmos.com/calculator/yyoqeezli2)

::: column.grow

We know we want the path of the ball to look like [this](target:2_linearGraph) in order to hit the target. This new line describing the intended path of the ball is [[1]]. Interestingly, this is simply the opposite of the slope above. The function of this line is g(x)=x.

::: column(width=240)

[https://www.desmos.com/calculator/jr6scyqzdn](https://www.desmos.com/calculator/jr6scyqzdn)

::: column.grow

If we move the platform to the intersection of these two lines, the path of  the ball will move from its original path to our desired path. The intersection is at ([[0]], [[0]]).

::: column(width=240)

[https://www.desmos.com/calculator/jjbzth2pta](https://www.desmos.com/calculator/jjbzth2pta)

::: column.grow

In the chapter on piecewise functions, we practised writing functions to describe situations like this. That is, we want to use a specific section of one function and a specific section of another. The domain values for the piecewise function describing this path are:

h(x)= \begin{matrix}-x & x [[\ge]]\ [[0]] \\x & x\ [[<]]\ [[0]]\end{matrix}

:::

There is actually another way to express the same shape using a different function.

[https://www.desmos.com/calculator/vyl1ggpfxc](https://www.desmos.com/calculator/vyl1ggpfxc)

[https://www.desmos.com/calculator/ihajfmgvkl](https://www.desmos.com/calculator/ihajfmgvkl)

This [v-shaped graph](target:1_absGraph) is called an absolute value function. As you can see, the shape is the same as the one described by the piecewise function. In addition to function notation, it uses bars to mean absolute value. Recall that [**absolute value**](gloss:absolute-value) is the distance between the given number and zero. In other words, absolute value of any number is not negative. The same idea applies to this function.

f(x)=|x|

Absolute value functions have many of the same key features we have been looking at through the functions course. The platform is at a key point called the [vertex](gloss:graph-vertex) of a graph. It is the turning point in all absolute value graphs. The vertex of this absolute value function is at ([[0]], [[0]]).

Now Mathipong wouldn't be much of a game if the ball always fell from the same spot and the target never moved. Likewise, absolute vallue functions wouldn't be very useful if they only ever occured with the rule f(x)=|x|. Let's have a look at how they move around the coordinate plane.

    // NOTES
    // This section will likely work better with some animations. The graphs here can be mock-ups of key points in the animations.

So far, when we have been graphing functions, we have been either plotting points on the line and connecting them with a line, or we have been finding a significant point, like the y-intercept or x-intercept and counting the slope to construct the line. The graphs and their respective equations actually leads us to a new way of understanding graphs on the coordinate plane. We can think of graphing in terms of **[transformations](gloss:transformations).** Let's take a look at this with a lin we are familiar with graphing y=x.

::: column(width=240)

![](/content/functions/images/4/Screenshot_2020-07-10_at_15.18.28.png)

![](/content/functions/images/4/Screenshot_2020-07-10_at_14.47.44.png)

::: column.grow

Now graph the line y=x+2.

::: column(width=240)

[https://www.desmos.com/calculator/mcwyh3toux](https://www.desmos.com/calculator/mcwyh3toux)

Notice that this line is y=x shift up 2. Or, we could see if as y=x shifted left 2.

Then let's reflect it over the x-axis.

::: column(width=240)

![](/content/functions/images/4/Screenshot_2020-07-10_at_14.50.39.png)

![](/content/functions/images/4/Screenshot_2020-07-10_at_14.53.38.png)

::: column.grow

The right side of the original like, the portion above the x-axis, remained unmoved. The left side, everything below the x-axis, reflected up above the x-axis. The position above the x-axis is the same as the graph of f(x)=|x+2|.

::: column(width=240)

[https://www.desmos.com/calculator/6fpbvgfrny](https://www.desmos.com/calculator/6fpbvgfrny)

::: column.grow

Notice y=|x+2| is y=|x| shift to the left 2.

Now suppose we add a number to y=|x| similar to y=x+2. What do you think will happen to the graph?

:::

---

::: column(width=240)

[https://www.desmos.com/calculator/aqly16ptq5](https://www.desmos.com/calculator/aqly16ptq5)

::: column.grow

The graph of y=|x| shift up.

Notice that moving the graph left and right changes values [[inside | outside]] the absolute value bars. Similarly, moving the graph up and down changes the values [[outside | inside]] the absolute value bars. This means that y=|x+2| is **not** the same as y=|x|+2.

These two transformations, which we call shifts, clearly result in different graphs. The left graph shows a [[horizontal | vertical]] shift while the graph on the right shows a [[vertical | horizontal]] shift. We will look at transformations in more detail in the [Function Transformations](https://mathigon.org/course/function-transformations) course.

:::

---

Match the function with its graph. Keep in mind the shifts f(x)=|x-h|+k where h is the horizontal shift and k is the vertical shift.

    // NOTES
    // Students drag functions to their respective graphs.

    // Functions for cards.

[](https://lh6.googleusercontent.com/bjmVukpDAuueGt7ShvzlA7ciunIpVLBrQPg-WNbdw0JZSFb59imu8XM4rDi_sS1mIn8FcooZjyUbeJnj04TExksgfPn70I0CdNL6kN65eIHZ611gFplehLVgMMnl11QhTOUUl0C-)

    // Graph mock-ups for cards.

[https://lh6.googleusercontent.com/BiB7qoKIoH-Ct1EKL54qUHd5DaPt8yEC11EHxDh0NY8jv_baTSmdjCIxuT4I-bEkGIgpj_zUhe-Q-vYyURKf6rv9mWpFtkWF8ClKaPNfkle5r575c3isjwp47h8128K9Dol5Pael](https://lh6.googleusercontent.com/BiB7qoKIoH-Ct1EKL54qUHd5DaPt8yEC11EHxDh0NY8jv_baTSmdjCIxuT4I-bEkGIgpj_zUhe-Q-vYyURKf6rv9mWpFtkWF8ClKaPNfkle5r575c3isjwp47h8128K9Dol5Pael)

[https://lh5.googleusercontent.com/qDPHACr6mN2lDyvT2T4HzeV93FcMRj0yXAvctg0Wu00_WrB3VSRacBLURLB_A3VQazxfFoIjJ9mtRvZEsl9uYnPvl3zOgOOIemy6GXwziJR1A-PdxQpl2FKFJ23flqUg2rHdGTXY](https://lh5.googleusercontent.com/qDPHACr6mN2lDyvT2T4HzeV93FcMRj0yXAvctg0Wu00_WrB3VSRacBLURLB_A3VQazxfFoIjJ9mtRvZEsl9uYnPvl3zOgOOIemy6GXwziJR1A-PdxQpl2FKFJ23flqUg2rHdGTXY)

[https://lh6.googleusercontent.com/vmg68ABIbxAl6uhLVfxGs3Z0GOZqUF3LvM4hdubZ4qKBIBIyrY1fgUc9rP9oPBthfbFAyWz8Ra_8-SN2kpZMO4bONJ6Awj1V17MksaDdxQA01Xr9BoMRgTM8t-zA9BeOjID1PPyS](https://lh6.googleusercontent.com/vmg68ABIbxAl6uhLVfxGs3Z0GOZqUF3LvM4hdubZ4qKBIBIyrY1fgUc9rP9oPBthfbFAyWz8Ra_8-SN2kpZMO4bONJ6Awj1V17MksaDdxQA01Xr9BoMRgTM8t-zA9BeOjID1PPyS)

[https://lh4.googleusercontent.com/jjOSNHGZ4SyupkjyNcwV6R6SttOVaNW2Wans6ug9mOx24AXzNrUIIqIY531O1sF9tAc5kKJSV01yE6C__uy1JLKh32XFDf-jkfWJyhBAimFWGyMbP8U0_FHf--NHtqZ18dPPIqQ9](https://lh4.googleusercontent.com/jjOSNHGZ4SyupkjyNcwV6R6SttOVaNW2Wans6ug9mOx24AXzNrUIIqIY531O1sF9tAc5kKJSV01yE6C__uy1JLKh32XFDf-jkfWJyhBAimFWGyMbP8U0_FHf--NHtqZ18dPPIqQ9)

[https://lh5.googleusercontent.com/Fs4qVDVYffvrT6EWYqmwbxPiNXNQrrVHXqA3kK85-H8V1hwLoIbN59ODnXwXjRp-SW17-Y4vjMTg6mXVM8m6csg_zDb4BcptbReFnap16j7KYvF1xbuJ5tjNo0lDlmoToLS-RexU](https://lh5.googleusercontent.com/Fs4qVDVYffvrT6EWYqmwbxPiNXNQrrVHXqA3kK85-H8V1hwLoIbN59ODnXwXjRp-SW17-Y4vjMTg6mXVM8m6csg_zDb4BcptbReFnap16j7KYvF1xbuJ5tjNo0lDlmoToLS-RexU)

---

Let's return to this idea of reflecting a graph over the x-axis. This is actually not a coincidence that this action give the absolute value function of the original linear function. The same property holds for the absolute value of other kinds of function.

    // NOTES
    // **Slideshow** functions: https://www.desmos.com/calculator/l2lveli1ey
    // This could be a cool graph drawing interactive once your tool is done.
    // Function mock-ups. Left column is original graph. Right column is absolute value Superimposed over original.

::: column (width=240)

![](/content/functions/images/4/Screenshot_2020-07-10_at_15.27.58.png)

![](/content/functions/images/4/Screenshot_2020-07-10_at_15.30.12.png)

![](/content/functions/images/4/Screenshot_2020-07-10_at_15.29.35.png)

![](/content/functions/images/4/Screenshot_2020-07-10_at_15.28.36.png)

![](/content/functions/images/4/Screenshot_2020-07-10_at_15.31.06.png)

![](/content/functions/images/4/Screenshot_2020-07-10_at_15.29.58.png)

::: column(width=240)

![](/content/functions/images/4/Screenshot_2020-07-10_at_15.29.23.png)

![](/content/functions/images/4/Screenshot_2020-07-10_at_15.28.13.png)

![](/content/functions/images/4/Screenshot_2020-07-10_at_15.30.22.png)

![](/content/functions/images/4/Screenshot_2020-07-10_at_15.29.47.png)

![](/content/functions/images/4/Screenshot_2020-07-10_at_15.28.55.png)

![](/content/functions/images/4/Screenshot_2020-07-10_at_15.31.30.png)

:::

We explore reflections more in [Reflecting Functions](https://mathigon.org/course/function-transformations/refleticing).

---

### Absolute Error

    // NOTES
    // This section may not work with final chapter. Editors may strike.

Let's take a look at how the idea of absolute value can relate to data analysis. There is an kind of measurement called absolute error that quantifies the difference between an expected value and a measured value. For example, we know our thermometer has an error of 2 degrees. The thermometer says it is 25 C right now. We can use absolute values to determine what the lowest and highest possible temperatures the air could be given the error on the theromometer.

Let x represent the actual temperature while 25 is the measured temperature. Their difference gives us the error, which we know is 2. Therefore, we can use the equation |x-25|=2 to determine the possible actual temperatures.

Recall that absolute value measures the distance from zero. This means that that measurement can go in the positive direction **or** in the negative direction. We don't actually know the intended direction when we are given a value like *absolute error is 5*. To account for this, we need to look at both options.

    // NOTES
    // Algebra Flow. Currently written step-by-step in step then description.

$|x-25|=2 $

Given

$x-25=2 \ \text{or}\ -(x-25)=2 $

Account for the value in the [positive direction](target:1_leftEquation) and the value in the [negative direction](target:2_rightEquation).

$x=27 \ \text{or} \ x-25=-2$

Solve each equation normally.

$x=27\ \text{or}\ x=23$

The solutions give the lowest and highest possible temperatures.

    // END ALGEBRA FLOW

In order to know whether the temperature is higher or lower than our measured value, we would need additional information like a measurement from another thermometer.

Many different kinds of function have situations like this where they can actually have more than one solution to a problem. We will explore this idea in more depth in [quadratic functions](https://mathigon.org/course/quadratics/introduction).

---

Now that we know more about absolute value functions and how they work, take a swing at the next level of Mathipong.

    // NOTES
    // Ball comes at different locations on the upper left side of the screen. Path is at different angels (slopes).


--------------------------------------------------------------------------------


## Inverse Functions

> section: inverse
> sectionStatus: dev

    // NOTE
    // Local server trouble - not able to visualize design decisions. Followed the conventions I could find in terms of notes, fixme tags, image/ graph mock-ups, and targets. Targets do not have objects set, but the syntax should indicate where the target is intended to go. Worked last to first. Some of these conventions change as I learned more from other code.
    // Many links go to databases in Notion where design elements and texts are stored.

Team sports is a world of split-second decisions and fast-moving bodies. Teammates choose where to place a pass. Referees decide who gains possession of the ball. Fans follow the action from great distances. In all these cases, jersey colour is deciding factor in how these instantaneous decisions are made.

Let's take a look at the the Balligon Soccer League. Match each team to a jersey colour such that you have a [function](gloss:function).

    // NOTES
    // Same interactive as chapter 1. Links go to the databases with assets and text.

[team mascots](https://www.notion.so/a89f42d0f2b447f89f0d4ae58ad565be)

[Jersey Colours](https://www.notion.so/e13166523b5e47ef96044c922bac940b)

Recall that the team mascots make up the [[domain | range]] of the function,

    // NOTE hide until blank is filled

while jersey colours make up the range. In function notation, we write this relationship as f([[team]])=[[jersey colour]].

    // NOTE
    // also accept "domain", "mascot", "team name"; also accept "range", "colour", "color", "jersey"; OR make multi-select

Take a look at the end of season tournament brackets.

::: column(width=240)

![](/content/functions/images/5/Screenshot_2020-07-01_at_16.50.26.png)

Example brackets. Fill in with teams matched to colours.

::: column.grow

The game between `team1 assigned to same color` and `team2 assigned to same color` is going to be a challenge for the players, referees, and fans. The jersey colours are `{jersey colour}` for both teams. Imagine keeping track of who has possession of the ball from 30 meters away. The consequences of wearing the same colours are so challenging, in fact, that many sports leagues give penalties to teams who are in the wrong uniform.

:::

---

This idea of seeing jersey colour and immediately knowing what team the player belongs to is the opposite of `f(team)=jersey` colour. In math, we call this backwards relationship an [inverse](gloss:inverse-operation). We use this idea when we balance equations: addition cancels subtraction, multiplication cancels division, etc. Specifically, we are thinking about an [inverse function](gloss:inverse-function) relationship.

The inverse function we are looking at identifies the team based on jersey colour. Take a look at the mapping for the function above moving from left to right.

    // NOTES
    // Show mapping from above with copy of the team group to the right of colour.
    // Think about how to guide students toward adding a colour to the output. This should be integrated into the interactive design.

Here we can see that the [relation](target:1_mapping) between colour and team is not a function. What would fix this relationship between `f(team)` and  so that `f^(-1)(colour)`  is a function?

---

    // NOTES
    // Show mapping from above with copy of the team group to the right of colour. Students can add a colour option. Change the mapping s.t. `f(team)` is one-to-one.

Now  `f^(-1)(colour)` is a function. In fact, recall from [Relations and Functions](https://mathigon.org/course/functions/relations) there are several types of functions. `f(team)`is now a [[one-to-one | one-to-many | many-to-one | many-to-many]].

    // Decide whether or not to include all relation classificiations or just function classifications.

---

Let's look at this mapping relationship in a function machine. Choose a team to pass through the machine. The machine assigns the team to a colour, then reverses the assignment. In other words, the machine applied the function rule then the inverse function rule.

    // NOTES
    // Visual inspiration
    // Apples are team names. Lemons are jersey colours. Label the first machine with `f(team)` and the second with `f^1(colour)`.
    // EDITORIAL USE ONLY

![](https://upload.wikimedia.org/wikipedia/commons/f/fe/Fruit_function_and_inverse.PNG)

[Inspiration](https://phet.colorado.edu/sims/html/function-builder/latest/function-builder_en.html)

Every time you pass `{team}` through both machines, you get out the team's [[name | jersey color]]. Algebraically we write this as `f(f^1(x))=x`. We will look more closely at why this is important throughout the chapter.

    // NOTES
    // Highlight that f^-1 is not exponent

---

### Currency Conversion

International tourism reached over 4 million arrivals each day in 2019. With so much travel between countries, people are more aware of their spending power.  That is, how far a `{user's currency unit e.g. dollar}` in `{user's home country's currency}` goes in another currency. Let's explore this idea of spending power - choose a destination from the cities listed.

    // NOTES
    // Do not show city options located in the same country as the user.
    // Could be great to tie the conversion rate in this interactive to the daily rates. This would complicate the rest of the chapter's text and [[blanks]]. I think it could be a nice touch, though. Users who return to this chapter would see how (potentially) volatile, or at least not-static, this rate is in real life.

[Cities and Currencies](https://www.notion.so/554f2cbfc43640799fff025363f6d2fc)

    // NOTES
    // The text below is build on visiting Machu Picchu from the USA.

Along your trip, you find many different markets take only cash. To prepare for your next trip to the market, you withdraw cash. The conversion function is `{destination currency}={conversion rate}*{home currency}` . Based on your budget you have about [[home currency]]

{.fixme} user enters whatever amount they want

to spend on souvenirs, which means you need to withdraw [[{destination currency}={conversion rate}*{home currency}]]

{.fixme} user must do this calculation and enter the amount +- .5

Take a stroll through the market and decide what you want to buy.

    // MOCK UP
    // Souvenir cards
    // Images have local price. Rollover shows price in `{home currency}`. Even cooler, user calculates and inputs on the back of the card.

[Figma](https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FAItjhFAz9DsTkH0elhIbNt%2FUntitled%3Fnode-id%3D10%253A5%26viewport%3D-720%252C470%252C0.9163351058959961%26scaling%3Dmin-zoom)

[Souvenirs by city](https://www.notion.so/20a2f11c078940b6ae0170578e84c4ea)

---

### Visual relationship

We can represent this relationship between the cost in `{destination currency}` and `{home currency}` as (`{destination currency}`, `{user home currency}`). This relationship means `{destination currency}` is the [[input | output]] and `{user home}` is the [[output | input]]. The points fall on a line. Let's call this line f(`{destination currency}`)=`{conversion rate}`x`{destination currency}`.

---

Recall that earlier we used the equation `{destination currency}={conversion rate}*{home currency}` to calculate how much money to withdraw from the bank before our trip to the market. Notice that the this equation is strikingly similar to the [f(x)](target:1_souvenirGraph) on the graph.

In fact, the most important difference is that the input and output values are switched. We saw this relationship between functions above in the jersey example. Using this observation, we can see that `{destination currency}={conversion rate}*{home currency}` is the inverse function of f(`{destination currency}`)=`{conversion rate}`x`{destination currency}`. This means we can use the notation `f^(-1)({home currency})` for the function representing the exchange from `{home currency}` to `{destination currency}`.

---

The graphs of inverse functions have some interesting features. First, this idea of switching inout and output values helps us plot points for `f^(-1)({home currency})`. Let's plot the souvenir points for the inverse function.

    // NOTES
    // f(x)=3.54x where x is soles and f(x) is dollars. The souvenir labels would be stronger if they were the name of the souvenir purchased.
    // Object of f(x) target above.
[https://www.desmos.com/calculator/ff6489z9ns](https://www.desmos.com/calculator/ff6489z9ns)

[https://www.desmos.com/calculator/tlscgnsyy3](https://www.desmos.com/calculator/tlscgnsyy3)

    // Students plot these points.
[https://www.desmos.com/calculator/ccbs3quxpu](https://www.desmos.com/calculator/ccbs3quxpu)

[https://www.desmos.com/calculator/mgmj8jbz26](https://www.desmos.com/calculator/mgmj8jbz26)

---

There is another interesting feature of inverse functions, though it may not be immediately obvious. Let's make some measurements between lines to see if the interesting feature emerges.

Begin by measuring the vertical distance from `{souvenir 1}` on `f^(-1)({home currency})`to  `f({destination currency})`. The distance is

    // NOTES
    // Students read this from the measurement tool on the graph. I'm not as worried about the exact measurement as I interested in their noticing the vertical and horizontal distances are the same. I also want them to eventually key into the intersection points.

[[`f({cost of souvenir 1 in destination currency})`- `f^(-1)({cost of souvenir 1 in home currency})`|xxx]]. Similarly measure the horizontal distance between `{souvenir 1}` on  `f({destination currency})` to `f^(-1)({home currency})`.

---

This distance is the same as the vertical distance you measured! Make the same measurements for each of the souvenir points.

    // NOTES
    // Interactive states

![](/content/functions/images/5/Screenshot_2020-06-30_at_14.58.09.png)

![](/content/functions/images/5/Screenshot_2020-06-30_at_14.58.39.png)

![](/content/functions/images/5/Screenshot_2020-06-30_at_14.59.00.png)


Notice that the intersection points of each of these measurements fall on their own line.

    // NOTES
    // Interactive states

![](/content/functions/images/5/Screenshot_2020-06-30_at_14.59.38.png)

![](/content/functions/images/5/Screenshot_2020-06-30_at_15.00.10.png)

![](/content/functions/images/5/Screenshot_2020-06-30_at_14.11.11.png)

The equation of this [line](target:2_souvenirGraph) is y= [[1]]m+[[0]]

{.fixme} hide until blank filled

which simplifies to y=x. Notice that if we were to fold the coordinate plane along the line y=x,  `f({destination currency})` and `f^(-1)({home currency})`would lie on top of each other.  The line y=x would remain in the same position during this fold.

In fact, all inverse functions are symmetric over the line y=x. The tools we used to arrive at this observation are the same that we can use to determine whether two functions are inverses. Let's take a closer look at this with a new graph shape called a parabola.

---

### Parabolas

::: column(width=240)

    // NOTES
    // Interactive states - not shown: vertical line test
![](/content/functions/images/5/Screenshot_2020-06-30_at_15.29.04.png)

![](/content/functions/images/5/Screenshot_2020-06-30_at_15.33.18.png)

::: column.grow

We call this shape a [parabola](gloss:parabola). [Check](target:1_lineTest) to make sure it is indeed a function.

---

The parabola passes the vertical line test, so it is a function. We just observed that inverses are symmetric about the line y=x. Make a copy of the parabola and rotate it in the coordinate plane to make it a reflection of the original parabola over the line y=x. Reflection in this case means that the two parabolas are symmetric over y=x.

:::


    // NOTES
    // New parabola can snap to inverse when user gets close.

![](/content/functions/images/5/Screenshot_2020-06-30_at_15.37.42.png)

::: column.grow

The inverse parabola has the same mirror look as the currency functions. Recall the ordered pairs on those line were switched. That is (`destination currency`, `home currency`) was on one line and (`home currency`, `destination currency`) was on the other line. Check that this pattern hold for these two parabolas.

Fill in the table with the coordinate points for each key feature in the original parabola. Verify that their inverses appear on the rotated parabola.

    // NOTES
    // All values are fill-in-the-blank. Students can indicate or track that they have found the corresponding coordinate points.

::: column(width=240)

    // NOTES
    // **Note** students should check several points to verify.

![](/content/functions/images/5/Screenshot_2020-06-30_at_15.43.10.png)

:::

[Untitled](https://www.notion.so/3c9309dafa2f4ed6b49e3d5a9cb6004a)

---

::: column(width=240)

![](/content/functions/images/5/Screenshot_2020-06-30_at_15.47.25.png)


::: column.grow

According to the properties of inverses, this is the inverse of the original parabola. It's symmetric over y=x and the points on this curve are the inverses of the points on the original parabola. The last thing we need to do is check that it is a function.

---

The inverse function doesn’t pass the vertical line test. It isn’t actually a function! When we were looking at the jersey example, we changed the team to colour function so that each team was assign to only one colour. Can you apply that idea here?

:::

    // NOTES
    // CTA: Use the sliders to adjust the original function so that the second parabola is a function.
    // Sliders here prototype the slider function in the chapter. They restrict the domain from each direction.

[https://www.desmos.com/calculator/ywpamz642r](https://www.desmos.com/calculator/ywpamz642r)

When we change the [domain](gloss:domain) of the original parabola, we can make the inverse parabola a function. In fact, the domain must be restricted so that each input value is matched to only one output. This means that some functions have inverses and some functions don’t. Specifically, only one-to-one functions have inverse functions.

---

### Algebraic Relationship

::: column(width=240)

![](/content/functions/images/5/Screenshot_2020-07-01_at_21.27.34.png)

[https://stock.adobe.com/images/beachside-hammock/328924634?prev_url=detail](https://stock.adobe.com/images/beachside-hammock/328924634?prev_url=detail)

::: column.grow

The Caribbean islands are another popular tourist destination. Their iconic beaches and crystal blue waters paint a picture of relaxation. Bermuda, an island country in the Caribbean, is one of the few places in the world that use both Celsius and Fahrenheit temperature scales in meteorology.  Let's set up a hammock in the this shady nook and take a look at the relationship between these temperature scales.

Recall that inverting money from one currency to another are inverse functions. We looked at this using graphs. Let's look at converting temperatures from one scale to another to see if this is indeed an instance of inverse functions.

---

The forecast calls for a high of 27 degrees Celsius today. We missed the report that included the temperature in Fahrenheit, so we Google the conversion and find C(x)= $\frac{5}{9}(x-32)$. Find today's high in Fahrenheit.

:::

    // NOTES
    // Algebra Flow. Written as step, description, step, description, etc.

$27=\frac{5}{9}(x-32) $

Substitute 27 in for C(X)

$9*27=[\frac{5}{9}(x-32)]x9$

Use inverse operation on to move 9

$\frac{9}{5}x27=\frac{5*(x-32)}{5}$

Use inverse operation to move 5

$\frac{9}{5}x27+32=x-32+32$

Use inverse operation to move 32

$\frac{9}{5}x27+32=x$

x, representing the temperature in Fahrenheit, is isolated

$80.6=x$

Today's high in Fahrenheit

    // END Algebra FLOW

This is a familiar process for solving equations. We can use this same process to find inverse functions algebraically. Let's take a look at two key steps in solving the equations above.


    // NOTES
    // Several columns to show alignment between text and steps. Does not need to remain as several columns.

::: column(width=240)

{.text-center} Original Function: $27=\frac{5}{9}(x-32) $

::: column(width=240)

{.text-center} Inverse Function: $\frac{9}{5}x27+32=x$

:::

Recall that we substituted 27 in for C(x) since it was our given temperature. Let's put y in for 27 to represent the output value in an ordered pair.

::: column.grow

{.text-center} Original Function $y=\frac{5}{9}(x-32) $

::: column(width=240)

{.text-center} Inverse Function: $\frac{9}{5}y+32=x$

::: column.grow

Now remember that to graph the inverse function when we were buying souvenirs at the market in `{destination}`, we swapped the x and y coordinates. That is, we switched the input and output. Let's do that same thing in the inverse function.

::: column(width=240)

{.text-center} $\frac{9}{5}x+32=y$

::: column.grow

Recall the notation for inverse functions use the letter name of the original function with a -1 in the exponent location. This means y in the inverse function represents `C^(-1)(x)`.

Take another look at the original and inverse functions side-by-side.

::: column(width=240)

{.text-center} $\frac{9}{5}x+32=C^{-1}(x)$

::: column.grow

{.text-center} $C(x)=\frac{5}{9}(x-32) $

::: column(width=240)

{.text-center} $\frac{9}{5}x+32=C^{-1}(x)$

:::

 Recall from the jersey example above that passing a value through a function machine then its inverse function machine gives the same value in the end. We called this `f(f^(-1)(x))=x`. Let's verify that this works for C(x) and `C^(-1)(x)`.

    // NOTES
    // Use same function builder inspirations as above.
    // Let's use the function machine as the way to explore `f(f^(-1)(x))=x`. List lots of numbers to pass through the machines. List a few variables, including x, to pass through. We can dig into the algebraic composition  functions in another chapter.

Let's determine whether these two functions are inverses.

{.text-center} $f(x)=4-\frac{3}{2}x\\ g(x)=\frac{1}{2}x+\frac{3}{2}$

    // NOTES
    // Students use function machine. They see they are not inverses.

The function machine indicates that f(x) and g(x) [[are not | are]] inverse functions.

---

Let's find the inverse function of f(x).

    // NOTES
    // Students put the steps cards in order, then match the equation cards to the steps cards.

{.text-center} $f(x)=4-\frac{3}{2}x $

    // NOTES
    // Several columns to show alignment between text and steps. Does not need to remain as several columns.
    // Left column indicates equation cards. Right column represents steps cards.
    // Students put the steps cards in order, then they fill in the blanks of the equations cards.

::: column(width=240)

{.text-center} $y=4-\frac{3}{2}x$

::: column(width=240)

substitute y in for f(x)

::: column(width=240)

{.text-center} $x=4-\frac{3}{2}y$

::: column(width=240)

switch x and y

::: column(width=240)

{.text-center} $x-4=-\frac{3}{2}y$

::: column(width=240)

solve for y as usual

::: column(width=240)

{.text-center} $-2(x-4)={3}y$
$\frac{-2x+8}{3}=y$

::: column(width=240)

{.text-center} $\frac{-2x+8}{3}=f^{-1}(x)$

::: column(width=240)

substitute `f^(-1)(x)` in for y

:::

We know have several ways of identifying and verifying inverse functions. Select your favourite method and describe why.

    // NOTES
    // Multiple select. No correct answer (i.e. open ended)

[option 1](inverting equations algebraically)
[option 2](graphing using coordinate points and their inverses)
[option 3](graphing using y=x as the line of symmetry)
[option 4](mapping diagram)

    // NOTES
    // Open-ended answer field

Functions and inverse functions are fundamental ideas in coding and deciphering. Check out [Codes and Ciphers](https://mathigon.org/course/codes/introduction) to see these ideas in action!


--------------------------------------------------------------------------------


## Rates of Change

> section: rates-of-change
> sectionStatus: dev

    // NOTE
    // Local server trouble - not able to visualize design decisions. Followed the conventions I could find in terms of notes, fixme tags, image/ graph mock-ups, and targets. Targets do not have objects set, but the syntax should indicate where the target is intended to go. Worked last to first. Some of these conventions change as I learned more from other code.

Throughout history, bacteria and viruses have plagued populations ranging in size from villages to entire civilisations. We see cycles of infectious diseases such as small pox, black death, salmonella,  yellow fever, flu, polio, AIDS, ebola, Zika, and  COVID-19 change the course of history.

Math can help us understand the scale and impact of disease outbreaks. Today we will be focusing on the [function](gloss:function) describing the cumulative confirmed cases of COVID-19.

::: column(width=240)

![](/content/functions/images/6/Screenshot_2020-07-09_at_09.52.32.png)

::: column.grow

The table to the right shows the cumulative confirmed cases as a function of time. Recall that this wording means that time is the [[input | output]]

###fixme: hide until blank filled
 and cumulative confirmed cases is the output.

This word cumulative means current total over all time. That means this number only goes up, even if the daily confirmed cases begins to decrease. To get a more accurate picture of what's going on, we can calculate the number of new cases every day.

::: column(width=240)

![](/content/functions/images/6/Screenshot_2020-07-09_at_09.52.45.png)

::: column.grow

For example, we can place points on the graph to the right on January 26 and June 12. The slope of the line running through these two points is called [t](gloss:secant-line)he **average rate of change** for this timeframe.

::: column(width=240)

![](/content/functions/images/6/Screenshot_2020-07-09_at_09.53.21.png)

::: column.grow

This line estimates the confirmed cases have been increasing at a rate of over [[14]] billion per day.

::: column(width=240)

![](/content/functions/images/6/Screenshot_2020-07-09_at_10.00.25.png)

::: column.grow

Now, we can see that this line doesn't do a great job of telling the story of how the daily case count changed over time. The area in blue shows the distance between the average rate of change and the actual graph.

Let's see if there is a way to make the average rate of change better estimate the actual daily change.

::: column(width=240)

![](/content/functions/images/6/Screenshot_2020-07-09_at_10.11.24.png)

::: column.grow

When we zoom in on a smaller date range, we see that the cumulative case count makes huge jumps on some days. The average rate of change can smooth these jumps.

This can be especially helpful for data sets that have huge outliers. Outliers are data that are substantially different than other data points. In statistics, we recognise that outliers can pull averages and standard deviations in their direction.

:::

The same thing can happen here with this data. Days where there is particularly high or low increase rates can make the graph jagged. Average rates of change can help smooth the graph and perhaps our understanding of what is going on during a specific interval. The trick is adjusting the interval to the appropriate size. We will looks this more in [statistics](/course/statistics).

---

Average rate of change can also give a way to compare change among different countries. Let's compare cumulative confirmed cases in the [USA](target:1_USAgraph) and [Italy](target:2_ITgraph) in the month of March 2020.

{.fixme} Students can use crosshairs to read data from the graphs. They can also draw lines between interesting point (as noted in the text) to visualize rate of change.

![](/content/functions/images/6/Screenshot_2020-07-09_at_10.43.53.png)

::: column.grow

We can see that Italy had a higher cumulative case count until March [[27]]. This means that Italy had more cases of COVID-19 for most of March.

::: column(width=240)

![](/content/functions/images/6/Screenshot_2020-07-09_at_10.52.43.png)

:::

::: column.grow

When we look at the average rates of change for the two countries between March 9 and March 18, we see that Italy's daily case count is rising about [[2]] thousand more cases per day than the USA's.

It makes sense that the country with the highest case count would be seeing a higher number of cases per day. But something interesting happens between March 19 and 26.

::: column(width=240)

![](/content/functions/images/6/Screenshot_2020-07-09_at_10.49.26.png)

:::

---

::: column.grow

During this week, the total case count in the USA was still lower than Italy's. However, the USA's case count was increasing faster that Italy's. The USA's daily case count was growing about [[3]] thousand cases per day faster than Italy's!

While it may seem opposite of our expectations, this odd relationship between average rates of change and total count is the only way that the USA's total case count surpasses Italy's.

::: column(width=240)

![](/content/functions/images/6/Screenshot_2020-07-09_at_11.01.15.png)

:::

As we have seen, average rates of change can be helpful for understanding statistical data. They can also help us understand objects in motion. Let's take a look at rates of change in SCUBA diving and space shuttle missions.

---

### SCUBA Diving

::: column(width=240)

![](/content/functions/images/6/Screenshot_2020-07-02_at_13.03.48.png)

::: column.grow

Scuba diving (self-contained underwater breathing apparatus) is a XXX dollar industry globally. People travel to destinations to dive in new and different waters. With this recreation XXX industry growing, diver education and safety is a high priority for organisations like PADI and DAN. The pressure of the water on the human body is higher than we are used to at ground level in the atmosphere. And, those pressure increase the deeper a diver travels.

::: column(width=240)

[Stock Video of Group of Divers During Safety Stop at Adobe Stock](https://stock.adobe.com/video/group-of-divers-during-safety-stop/122711283?prev_url=detail)

{.fixme} Nice 14s video of safety stop

::: column.grow

The laws of gasses and pressures are such that the air we breathe, even with scuba gear, can change XXX and XXX as the water pressure increases. This compression needs to reverse as the pressure decreases when a diver ascends to the water's surface. If a diver resurfaces too quickly, the gases in their cells won't have time to XXX - creating bubbles in tissues and joints. This can lead to decompression illness. To prevent this, divers pay close attention to the rate at which they are ascending. Yep, rate. The idea is to ascend slower than 10-15 meters per minute.

::: column(width=240)

![](/content/functions/images/6/Screenshot_2020-07-09_at_13.28.42.png)

{.fixme} Lots of great options in Adobe Stock with search: SS Thistlegorm.

::: column.grow

The S.S. Thistlegorm is one of the top 10 wreck diving sites in the world. This British Merchant Navy ship sank on 6 October, 1941 during the Second World War. Jacques Cousteau discovered her wreck site in the early 1950s.

::: column.grow

This is the depth profile of a typical dive to the SS Thistlegorm. We call a graph like this one a **position** function. The y-values tell us where the diver is in relation to the the surface of the water, while the x-axis tell us *when* they are at any given position.

The diver's maximum depth was about [[30+-.25]] meters about [[40+-2]] minutes into the dive. Let's take a look at other key features in this graph. They will give us areas to focus on as we think about whether the diver ascended at a safe rate. Label the graph with each key feature.

::: column(width=240)

![](/content/functions/images/6/Screenshot_2020-07-09_at_13.30.23.png)

{.fixme} The above is a mock-up of a more realistic profile. Combine this with the noise elements of the image below.

![](https://upload.wikimedia.org/wikipedia/commons/d/db/Dive_computer_recorded_profile_example.png)

[image citation](https://en.wikipedia.org/wiki/File:Dive_computer_recorded_profile_example.png)

:::

{.fixme} Design cards for the words below. Students drag to above graph.

::: column(width=100)

x-intercept

maximum

x-intercept

::: column(width=100)

increasing

increasing

increasing

::: column(width=100)

decreasing

decreasing

decreasing

:::

Notice the graph has a bunch of peaks and valleys. These seemingly random highs and lows are called "noise". Many different factors can contribute to data like this. GPS readings often have noise because of lapses in connection between the diver's computer and the satellites.

We can use average rates of change to smooth out this graph just like we did in the COVID-19 graph above.

::: column(width=240)

![](/content/functions/images/6/Screenshot_2020-07-09_at_13.52.19.png)

{.fixme} The above is a mock-up of a more realistic profile. Combine this with the noise elements of the image below.

![](/content/functions/images/6/Screenshot_2020-07-02_at_14.41.47.png)

::: column.grow

We see that the diver's position function more or less increases from (45, -30) to ([[60+-5, [[0]]). These two points give us enough information to calculate the diver's **average rate of change** of [[2]] meters per minute, well below the threshold of 10-15 meters per minute. So far, it seems like this diver prevents decompression illness.

::: column(width=240)

![](/content/functions/images/6/Screenshot_2020-07-09_at_13.56.16.png)

{.fixme} The above is a mock-up of a more realistic profile. Combine this with the noise elements of the image below.

![](/content/functions/images/6/Screenshot_2020-07-02_at_14.46.02.png)

::: column.grow

Notice, though, that the rate of increase is not constant. This diver seems to have taken breaks along the way.

This begs the question - did the diver ever exceed the recommended ascent rate?

:::

To answer this question, we can [place points](target:1_point, target:2_point) on the graph indicating the segments we want to isolate. The line running through two of these two points is called a [secant](gloss:secant) line. We can compare the **secant** to the  actual graph. The [distance](target:1_distance) between the two gives us a sense for how accurate the average rate of change between the two points is compared to what the graph shows is happening.

Use the slider to see how changing the number of averages affects the relative average rates of change.

{.fixme} Approximate states for slider. Design similar for the "depth vs. time" data. Images are mock-ups based on old data.

![](/content/functions/images/6/Screenshot_2020-07-02_at_14.47.24.png)

![](/content/functions/images/6/Screenshot_2020-07-02_at_14.48.09.png)

![](/content/functions/images/6/Screenshot_2020-07-02_at_14.48.36.png)

The more lines representing average rates of change there are, the secant lines gets [[closer to | farther from]] the graph. Select the other true statements.

{.fixme} Multiple select

The slope of the secant line gets closer to the rate of change on the cumulative cases graph between the intersection points.

The slope of the secant line gets farther from the rate of change on the cumulative cases graph between the intersection points.

Distance between the secant line and the cumulative cases graph increases.

Distance between the secant line and the cumulative cases graph decreases.

Slope of the secant line changes.

---

{.fixme} Design similar for the "depth vs. time" data. Images below are mock-ups with old data.

::: column(width=240)

![](/content/functions/images/6/Screenshot_2020-07-02_at_15.06.21.png)

{.fisxme} Just highlighted some noise. We can decide how detailed we want to be here.

::: column.grow

Data based in GPS reading like this often have a lot of "noise", or points that seem inconsistent with the general trend of the rest of the points. One way to deal with points like these is to think of them as outliers. Average rates of change should cut out the noise.

::: column(width=240)

![](/content/functions/images/6/Screenshot_2020-07-02_at_15.16.57.png)

{.fixme} Eyeballing this. Mock-up level accuracy.

::: column.grow

Lines of best fit like this reduce, or eliminate, the noise from GPS. From here, we can determine whether the diver exceeded the safe ascent speed.

To do this, we are going to look at *many* average rates of change.

::: column(width=240)

![](/content/functions/images/6/Screenshot_2020-07-02_at_15.22.50.png)

::: column.grow

{.fixme} slider to zero. Target to tangent.  You seem to have a clear idea of what this feature will do. I can mock something up if you want, but it doesn't seem to the the highest priority in this chapter.

:::

As we add more lines approximating the rate of change, the two points on the graph get closer together. When this distance gets very small, the average rate of change approximates **instantaneous rate of change**.

---

Move the line along the position graph to see how the instantaneous rate of change changes.

This line is called a **[tangent](gloss:tangent)**. It only touches the position graph at one point compared to secant line's two. The tangent line's slope is the diver's **instantaneous rate of change**.

We can plot the slopes of the tangent lines on a new graph. Notice the x-axis is time since the start of the dive. The y-axis is diver's ascent and descent speeds.

{.fixme} This seems like it will work best with either *more* sliders, this time moving time along like scrubbing, or as an animation with actual scrubbing. Images are state mock-ups.

![](/content/functions/images/6/Screenshot_2020-07-09_at_14.16.53.png)

![](/content/functions/images/6/Screenshot_2020-07-09_at_14.17.08.png)

The position and speed graphs look very different but are generated from the same data. The position graph is most useful for knowing exactly how deep the diver is during any moment during the dive. The speed graph is most useful for knowing how well the diver regulated their decompression. The maximum y-value on the speed graph is about [[8+-.2]] meters per min, so the diver did take good care of their decompression.

---

Match the use/information with the appropriate graph

::: column(width=100)

location in the pool

length of the race

race time

time of turn

::: column(width=100)

when he got tired

speed during first length

speed during second length

slowest part of the race

relationship to other swimmers

::: column(width=100)

position graph

velocity graph

:::

The relations between these two graphs, really  between the two functions represented by the graphs, is called a **[derivative](gloss:derivative)**. Specifically, the velocity graph is the derivative of the position graph. This relationship exists with many functions. The derivative can give useful information that is hidden in the position graph. In this case, the diver can quickly determine whether he/she/they stayed in the safety recommendations for decompression illness.

Let's look at another application of derivatives.

---

### Space Shuttle Discovery

{.fixme} Data from: https://www.nasa.gov/pdf/522588main_AP_ED_Phys_ShuttleLaunch.pdf

The Space Shuttle *Discovery* is one of the space shuttles in NASA's space shuttle program. Discovery alone launched and landed 39 times in about 27 years between 1984 and 2011. It's missions included both research and assembly missions for the International Space Station.

Space shuttle flights like the Discovery's are split into four phases: ascent, entry, orbit, and rendezvous. This is the [altitude graph](target:1_altgraph) for the ascent phase of one of the Discovery's missions.  The space shuttle needs to reach at least 7.85 kilometres per second in order to attain orbit. We will need the speed graph to determine if and when the Discovery reaches this speed.

{.fixme} Students use the same tangent tool as above to make the speed graph. Images below are state mock-ups.

![](/content/functions/images/6/Screenshot_2020-07-08_at_15.09.45.png)

The x-axis would be easier to read if gridlines were at the minute (e.g. 60, 120, etc).

![](/content/functions/images/6/Screenshot_2020-07-08_at_14.53.25.png)

The Discovery does reach the required speed at about [[470+-10]] seconds.  It only takes about [[25+-5]] seconds to break the sound barrier at 343 meters per second. That's an incredible change in speed. The space shuttle goes from 0 to over 343 meters per second in about half a minute. That kind of [acceleration](gloss:acceleration) will flatten an astronaut to their seat.

In fact, the safety of the crew and equipment requires the shuttle's acceleration to stay under 29 meters per `second^2`.

We typically think of acceleration in terms of fast cars. Think "This Ferrari goes from 0 to 100 kilometres per hour in 2.4 seconds!" **Acceleration** is actually the derivative of speed. That means acceleration measures the change of speed during a certain time. Let's see how close to the safety limit of 29 meters per `second^2`.

{.fixme} Students use the same tangent tool as above to make the acceleration graph. The images are state mock-ups.

![](/content/functions/images/6/Screenshot_2020-07-08_at_15.09.45.png)

{.fixme} The x-axis would be easier to read if gridlines were at the minute (e.g. 60, 120, etc).

![](/content/functions/images/6/Screenshot_2020-07-08_at_14.53.25.png)

![](/content/functions/images/6/Screenshot_2020-07-08_at_15.16.08.png)

The maximum acceleration during this ascent phase is about [[28+-1]] meters per second, just at the safety limit. Remember that it only take the Discovery about 30 seconds to break the speed of sound. The acceleration at 30 seconds is [[17+-2]] meters per `second^2`, not even close to the maximum acceleration the crew and shuttle experience later in the ascent phase.

The ascent phase of the mission include several events between lift-off and reaching orbit. Small variations in the position and velocity graphs show as large jumps in the acceleration graph. Drag the events to their corresponding locations on the acceleration graph. Some events are single points on the graph and others are entire sections of the graph.

{.fixme} design cards for each line below

::: column(width=100)

Space shuttle lift-off

Solid Rocket Booster separation

Main Engine Cutoff

::: column(width=100)

Space Shuttle Main Engines provide smoothly changing acceleration

External Tank Separation

::: column(width=100)

Negative rate of change of acceleration (large air drag)

Constant acceleration (3 g’s)

On orbit

:::

---

From virus spread to diving decompression to space flights, the relationship between velocity and position stays constant. The velocity is the derivative of position. What position graphs show in steepness, velocity graphs show in coordinate points. Continue practicing visualising this relationship by matching the position graphs on the left to the velocity graphs on the right.

{.fixme} shuffle the cards below. Students match.

![](/content/functions/images/6/chart.png)

![](/content/functions/images/6/chart_(3).png)

![](/content/functions/images/6/chart_(5).png)

![](/content/functions/images/6/chart_(7).png)

![](/content/functions/images/6/chart_(9).png)

![](/content/functions/images/6/chart_(11).png)

![](/content/functions/images/6/chart_(1).png)

![](/content/functions/images/6/chart_(2).png)

![](/content/functions/images/6/chart_(4).png)

![](/content/functions/images/6/chart_(6).png)

![](/content/functions/images/6/chart_(8).png)

![](/content/functions/images/6/chart_(10).png)

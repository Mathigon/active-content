# Exponential Functions

## Carbon Dating

> section: carbon-dating
> sectionStatus: dev
> id: egypt

::: column.grow

A group of archaeologists has discovered a new tomb in the Egyptian desert.
They carefully open the hidden entrance, climb through several rooms filled with
ancient treasures, until they arrive in the burial chamber. The sarcophagus
is still sealed, and contains the mummy of a Pharaoh.

After cataloguing every item in the tomb and carefully transporting them to a
nearby museum, they try to answer their most pressing question: who is this
Pharaoh, and when did he die?

::: column(width=300)

    x-media(src="images/egypt.jpg" lightbox width=300 height=312)

:::

Unfortunately, none of the drawings and inscriptions on the walls of the tomb
seem to contain names or dates. However, there is an ingenious method to
accurately determine the age of ancient artifacts like mummies or fossils,
which solely relies on physics and mathematics: __Carbon Dating__.
[Continue](btn:next)

---
> id: carbon-1

    figure: x-media(src="images/sarcophagus.jpg" width=600 height=180)

All living organisms on Earth – plants, animals and humans – contain Carbon
[atoms](gloss:atom). Usually, the core of a Carbon atom consists of six
[protons](gloss:proton) and six [neutrons](gloss:neutron), but a small
proportion of Carbon atoms contain additional neutrons. These different
“variants” of Carbon are called __isotopes__:

::: column(width=170)

    x-atom(protons=6 neutrons=6 size=150)

{.text-center} __Carbon-12__  
6 protons, 6 neutrons  
98.8%

::: column(width=170)

    x-atom(protons=6 neutrons=7 size=150)

{.text-center} __Carbon-13__  
6 protons, 7 neutrons  
1.1%

::: column(width=170)

    x-atom(protons=6 neutrons=8 size=150)

{.text-center} __Carbon-14__  
6 protons, 8 neutrons  
0.1%

:::

[Continue](btn:next)

---
> id: carbon-2

The proportion at which these isotopes occur is almost exactly the same,
everywhere on Earth – and this will be very important later. In this example,
we are particularly interested in Carbon-14, which is abbreviated as
<sup>14</sup>C. It contains 6 protons and 8 neutrons, and it is created when
cosmic rays coming from space hit particles high in our atmosphere.

Any sample of Carbon atoms contains [[0.1]]% of these special <sup>14</sup>C
atoms. You might think that this is an insignificant amount, but your body
contains around `8 × 10^26` Carbon atoms, which means that you also contain
around `8 × 10^23` Carbon-14 atoms. That’s almost a million-million-million-million
atoms!

    // Carbon is an essential part of our body, because it can form long,
    // complex molecules. 

---
> id: radioactive-1
> goals: decay

::: column(width=300)

    .decay-box
      x-atom(protons=6 neutrons=8 size=68 style="cursor: pointer;")
      x-atom(hidden protons=7 neutrons=7 size=68 style="left: 100px")
      x-atom(hidden protons=1 color="fd8c00" size=68 style="left: 178px")
      x-atom(hidden protons=1 color="22ab24" size=68 style="left: 244px")
      .label #[strong Carbon-14]#[br]6 protons#[br]8 neutrons
      .label(hidden style="left: 100px") #[strong Nitrogen]#[br]7 protons#[br]7 neutrons
      .label(hidden style="left: 178px"): strong Antineutrino
      .label(hidden style="left: 244px"): strong Electron
      .operator(hidden style="left: 76px") →
      .operator(hidden style="left: 176px") +
      .operator(hidden style="left: 240px") +
    x-gesture(target=".decay-box x-atom")

{.caption} 

::: column.grow

Carbon-14 is useful, because it is [__radioactive__](gloss:radioactive). The
atom is unstable, and it might __decay__ into other, more stable elements. We
are actually surrounded by many radioactive materials, but their concentration
is much too low to be dangerous.

:::

---
> id: radioactive-2

::: column.grow

During our life, as we eat and breathe, our body absorbs <sup>14</sup>C atoms.
When we die, we stop absorbing new <sup>14</sup>C atoms, and the ones that are
already in our body slowly start to [[decay|multiply|disappear]].

All radioactive elements decay at a very predictable rate – this is determined
by their __half-life__. Carbon-14, for example, has a half-life of approximately
6,000 years. This means that if you have a block of <sup>14</sup>C atoms, it
will take 6,000 years for half of them to decay. After another 6,000 years, half
of the remaining atoms will have also decayed, so you're left with just [[a
quarter|a third|1/8|none]] of the original amount.

::: column(width=220)

    x-media(src="images/atom.jpg" width=220 height=310)

:::

---
> id: radioactive-table-1

Let’s assume we start with a block of 1,200 Carbon-14 atoms. Using the half-life,
we can calculate the remaining amount of <sup>14</sup>C atoms over time:

|            | _{div.col}_ | _{div.col.c1}_ | _{div.col.c2}_ | _{div.col.c3}_ | _{div.col.c4}_ |
| __Years__  | 0           | 6000           | 12,000         | 18,000         | 24,000         |
| __Amount__ | 1200        | [[600]]        | [[300]]        | [[150]]        | [[75]]         |
{.grid.col-grid}

---
> id: radioactive-table-2

As you can see, we’re multiplying by `§1/2` at every step, just like a
[[geometric|arithmetic|Fibonacci]] sequence.

---
> id: radioactive-equation

Using exponents, we can write down an equation for the amount left after `t` years:

{.text-center} `§"amount" = 1200 × (1/2)^(t/6000)`

Of course 1200 and 6000 were just arbitrary numbers. A more general equation
is:

{.text-center} `§"amount" = "initial" × 2^((-t)/"half-life")`

Since the equation contains an _exponent_, and the number of atoms _decreases_,
we call this process __exponential decay__.

---
> id: radioactive-chart

We can plot the amount of <sup>14</sup>C atoms over time in a coordinate system.
If we start with an initial amount of ${format(x0)}{x0|3000|100,4000,100} and
the half-life is ${format(hl)}{hl|5000|200,10000,200} years, then the decay
looks like this:

    x-coordinate-system(width=600 height=400 x-axis="0|18000" y-axis="0|4000" x-label="Years" y-label="Carbon-14 Atoms" margins="20 20 20 40")

---
> id: radioactive-chart-2

The points on the graph show when the number of atoms has halved. Notice that
we can calculate the remaining about of atoms at _any point in time_, not just
these specific intervals. This is the main difference compared with geometric
sequences.

The decay of radioactive atoms is random, and it is impossible to predict
exactly when an individual <sup>14</sup>C is going to decay. If the graph shows
there should be a decimal number of atoms left at a certain time (like 10.6),
this is the _average_ number of atoms we _expect_ to be left, even though you
can only have whole numbers of atoms. You will learn more about this in our
[course on probability](/course/probability/randomness).
[Continue](btn:next)

---
> id: spectrometer

::: column.grow

Now we have all the information needed to determine the age of the Pharaoh
in our story. The archaeologists decided cut a tiny sample out of the mummy's
skin. Using a complex machine called a __mass spectrometer__, they were able to
“count” the number of <sup>12</sup>C and <sup>14</sup>C atoms in the sample.

They found 800 Carbon-14 atoms in the sample. Given the ratios of <sup>12</sup>C
and <sup>14</sup>C atoms, they also estimate that the same sample would have
contained 1200 <sup>14</sup>C atoms when the Pharaoh was alive.

::: column(width=320)

    x-media(src="images/spectrometer.jpg" lightbox width=320 height=280)

{.caption} Accelerator Mass Spectrometer in the Oxford Radiocarbon Accelerator Unit

:::

All we have to do now is calculate how long it takes for the missing 400
<sup>14</sup>C atoms to decay. That number is precisely the [[time since the
Pharaoh died|age of the Pharaoh when he died]].

---
> id: carbon-solver

We can use the equation we found above, and fill in the required parameters:

::: x-algebra-flow

`input(1200,"initial") × 2^((-t)/input(6000,"half-life")) = input(800,"amount")`

* Fill in the three parameters from above!
* First, let's divide both sides of the equation by 1200.
* We can simplify the right-hand side of the equation.
* Now, we have to revert the exponent on the left-hand side. To do that, we can
  use a special function called the __Logarithm__, which we'll learn more about
  later.
* Using a calculator, we can find the value of `log_2(0.667)`.
* The rest should be simple: let's multiply both sides of the equation by 6000.
* We can simplify the right-hand side of the equation.
* We can also remove the - sign on both sides of the equation.
* Thus, we see that it takes 3510 years for this many <sup>14</sup>C atoms to
  decay.

:::

---
> id: carbon-end-1

::: column(width=280)

    x-media(src="images/mummy.jpg" lightbox width=280 height=170)

::: column.grow

This means that the Pharaoh died approximately 3510 years ago, or in
[[1490 ± 10]] BC. This time period was the beginning of the _New Kingdom_ in
Egyptian history: a “golden age” which marked the peak of Egypt’s power. And all
we needed was a tiny piece of skin tissue, together with clever mathematics!

:::

Geologists, archaeologists and biologists can use the same method to determine
the age of fossils, the evolutionary ancestry between extinct animals, or when
certain layers of rock in our Earth's crust formed.
[Continue](btn:next)

---
> id: carbon-end-2

Carbon Dating was developed in the late 1940s at the University of Chicago, by
Willard Libby, who received the Nobel Prize in Chemistry for his work in 1960.
It can become an indispensable method in many areas of science, where we are
trying to understand the history of our world.

    figure: x-media(src="images/dinosaur.jpg" width=760, height=360)

Note that we have greatly simplified the process of Carbon Dating in this
chapter. There are many other things to consider, such as sample contamination,
or how the concentration of Carbon-14 in our atmosphere has changed over time.

---

## Exponential Growth and Decay

> section: growth-decay
> sectionStatus: dev

    img.text-wrap(src="images/fossil.jpg" style="shape-outside: url(images/fossil.png)" width=320 height=295)

In the previous section, we looked at the __exponential decay__ of radioactive
materials, and how it can help scientists determine the age of fossils and
mummies using carbon dating. But there are also some things that behave in
exactly the opposite way: they _grow_ exponentially. 

{.todo} TODO

---

## Comparing Models

> section: comparing-models
> sectionStatus: dev

Radioactive decay follows a _constant rate_: during equal time intervals, the
number of atoms changes by a __fixed proportion__{.red} (e.g. 50%). This gives
rise to an __exponential model__{.red}, either exponential growth or
exponential decay.

Exponential models are very different from __linear models__{.blue}, where the
value changes by a __fixed value__{.blue} during equal time intervals.

diagram {.todo}

Here are a few examples of processes in nature or everyday life. Try to decide
which ones are exponential or linear. (Note that some models are increasing, 
and others are decreasing.)

{.todo} cell division

{.todo} interest

{.todo} speed of computers, Moore's Law

---

## Compound Interest

> section: compound-interest
> sectionStatus: dev

TODO

---

## Population Dynamics

> section: population-dynamics
> sectionStatus: dev

TODO

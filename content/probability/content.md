# Probability

## Introduction

    // SOURCES
    // http://onlineroulette.org.uk/stories/karl-pearson/
    // http://www.eprisner.de/MAT109/FermatPascal.html
    // http://mathforum.org/isaac/problems/prob1.html
    // https://en.wikipedia.org/wiki/Penney%27s_game
    // https://en.wikipedia.org/wiki/Edward_O._Thorp
    // http://edwardothorp.com/id26.html

    mixin dice(n)
      svg(width=20, height=20)
        if n==1 || n==3 || n==5
          circle(r=2, cx=10, cy=10)
        if n==2 || n==3 || n==4 || n==5
          circle(r=2, cx=5, cy=5)
        if n==4 || n == 5
          circle(r=2, cx=5, cy=15)
        if n==4 || n == 5
          circle(r=2, cx=15, cy=5)
        if n==2 || n==3 || n==4 || n == 5
          circle(r=2, cx=15, cy=15)
        if n == 6
          circle(r=2, cx=5, cy=4)
          circle(r=2, cx=5, cy=10)
          circle(r=2, cx=5, cy=16)
          circle(r=2, cx=15, cy=4)
          circle(r=2, cx=15, cy=10)
          circle(r=2, cx=15, cy=16)

> id: intro
> section: introduction

Probabilities and likelihoods are everywhere around us, from weather forecasting
to games, insurance or election polls. However, in the history of mathematics,
probability is actually a very recent idea. While numbers and geometry were
studied by ancient Greek mathematicians more than 2500 years ago, the concepts
of probability only emerged in the 17th and 18th century.

::: column.grow
According to legend, two of the greatest mathematicians, [Blaise
Pascal](bio:pascal) and [Pierre de Fermat](bio:fermat), would regularly meet up
in a small cafe in Paris.

To distract from the difficult mathematical theories they were discussing, they
often played a simple game: they repeatedly tossed a coin – every _heads_ was a
point for Pascal and every _tails_ was a point for Fermat. Whoever had fewer
points after three coin tosses had to pay the bill.
::: column(width=360)

    img(src="images/paris.jpg" width=360 height=254)

:::

One day, however, they get interrupted after the first coin toss and Fermat has
to leave urgently. Later, they wonder who should pay the bill, or if there is a
fair way to split it. The first coin landed _heads_ (a point for Pascal), so
maybe Fermat should pay everything. However, there is a small chance that Fermat
could have still won if the [[two next tosses|next coin toss]] had been _tails_.

---
> id: intro-1

Pascal and Fermat decided to write down all possible ways the game could have
continued:

::: column.grow(width=120)

    img(src="images/coins-1.png" width=136 height=48 alt="HHH")

{.caption} Pascal wins
::: column.grow(width=120)

    img(src="images/coins-2.png" width=136 height=48 alt="HHT")

{.caption} Pascal wins
::: column.grow(width=120)

    img(src="images/coins-3.png" width=136 height=48 alt="HTH")

{.caption} Pascal wins
::: column.grow(width=120)

    img(src="images/coins-4.png" width=136 height=48 alt="HTT")

{.caption} Fermat wins
:::

All four possible outcomes are equally likely, and Pascal wins in
[[three|four|two]] of them. _{span.reveal(when="blank-0")}Thus they decided that
Fermat should pay 3/4 of the bill and Pascal should pay 1/4._

---
> id: intro-2

Pascal and Fermat had discovered the first important equation of probability: if
an experiment has multiple possible outcomes which are all equally likely, then

{.text-center} Probability of an event =
`"Number of ways the event could happen"/"Total number of possible outcomes"`.

In our example, the probability of Pascal winning the game is `3/4 = 0.75`, and
the probability of Fermat winning the game is `1/4 = 0.25`.

---

### What are Probabilities

> id: prob-line

A __probability__ is a number between 0 and 1 which describes the likelihood of
a certain __event__. A probability of 0 means that something is _impossible_; a
probability of 1 means that something is _certain_.

For example, it is [[impossible|certain]] that you will meet a real life dragon,
and it is [[certain|impossible]] that the sun will rise tomorrow. The
probability of a coin landing _heads_ is exactly [[in the middle|the same]].

{.reveal(when="blank-0 blank-1 blank-2")} The probability of rolling a 6 on a
die, or picking a particular suit from a deck of cards is [[less|more]] than 0.5
– which means unlikely. The probability of a good football team winning a match,
or of a train arriving on time is [[more|less]] than 0.5 – which means likely.

    .p-line.clearfix
      img.reveal(src="images/line-1.png" width=140 height=140 style="width: 18.42%" when="blank-0" animation="pop" alt="dragon")
      img.reveal(src="images/line-2.png" width=140 height=140 style="width: 10.53%" when="blank-3" animation="pop" alt="dice")
      img.reveal(src="images/line-3.png" width=140 height=140 style="width: 15.79%" when="blank-3" animation="pop" delay="300" alt="cards")
      img.reveal(src="images/line-4.png" width=140 height=140 style="width: 11.84%" when="blank-2" animation="pop" alt="coins")
      img.reveal(src="images/line-5.png" width=140 height=140 style="width: 11.84%" when="blank-4" animation="pop" alt="football")
      img.reveal(src="images/line-6.png" width=140 height=140 style="width: 17.11%" when="blank-4" animation="pop" delay="300" alt="train")
      img.reveal(src="images/line-7.png" width=140 height=140 style="width: 14.47%" when="blank-1" animation="pop" alt="sun")
      img(src="images/line-8.png" width=760 height=40 style="width: 100%")

---
> id: prob-line-1

Now drag the following events into the correct order, from likely to unlikely:

    x-sortable
      .item.md(data-index="3") You throw a die :game-die: and it lands on 6.
      .item.md(data-index="5") Penguins :penguin: live on the North Pole.
      .item.md(data-index="1") It’s going to rain :cloud-with-rain: in November.
      .item.md(data-index="0") A baby will be born in China today. :baby-bottle:
      .item.md(data-index="4") You buy a lottery ticket and win the Jackpot :party-popper:.
      .item.md(data-index="2") A newborn baby will be a girl :girl:.

We often use probabilities and likelihoods in everyday life, usually without
thinking about it. What is the chance of rain tomorrow? How likely is it that I
will miss the bus? What is the probability I will win this game?

---
> id: prob-line-2

Tossing a (fair) coin has two possible outcomes, _heads_ and _tails_, which are
both equally likely. According to the equation above, the probability of a coin
landing _heads_ must be `1/2` = 0.5, or 50%.

    // TODO However, the equation is not very helpful if the different outcomes
    // are not all equally likely, or if there are infinitely many possible outcomes.

Note that this probability is _in between_ 0 and 1, even though only one of the
outcomes can actually happen. But probabilities have very little to do with
actual results: if we toss a coin many times we know that
[[approximately half|exactly half|all|none]] of the results are heads – but we
have no way of predicting _exactly which_ tosses landed heads.

Even events with tiny probabilities (like winning the lottery :party-popper:) _can
still happen_ – and they _do happen_ all the time (but to a very small
proportion of the people who participate).

---
> id: prob-line-3

Probabilities also depend on how much each of us knows about the event. For
example, you might estimate that the chance of rain today is about 70%, while a
meteorologist with detailed weather data might say the chance of rain is 64.2%.

Or suppose that I toss a coin and cover it up with my hands – the probability of
tails is 50%. Now I peek at the result, but don’t tell you. I know for certain
what has happened, but for you the probability is [[still 50%|100%|not 50%]].

---
> id: prob-line-4

There are many different ways to think about probabilities, but in practice they
often give the same results:

::: column(width=230 parent="padded-thin")

    img(src="images/classical.png" width=240 height=75 alt="classical probability")

{.text-center} The __classical__ probability of landing heads is the proportion
of _possible outcomes_ that are heads.
::: column(width=230)

    img(src="images/frequentist.png" width=240 height=75 alt="frequentist probability")

{.text-center} The __frequentist__ probability is the proportion of heads we get
if we toss the coin _many times_.
::: column(width=230)

    img(src="images/subjectivist.png" width=240 height=75 alt="subjectivist probability")

{.text-center} The __subjectivist__ probability tells us how strongly we
_believe_ that the coin will land heads.
:::

    // TODO Notice that subjectivist probabilities may be different for
    // different people – often depending on how much they know.

Remember that while probabilities are great for _estimating and forecasting_, we
can never tell what _actually_ will happen.

---

### Predicting the Future

> id: future

If we roll a die, the result is a number between 1 and 6, and all outcomes are
equally likely. If we roll two dice at once and add up their scores we can get
results from [[2]] up to [[12]]. However, in this case they are not all equally
likely.

    p.md Some results can only happen one way (to get #[span.dice.outline 12] you have to roll #[span.dice #[+dice(6)]] + #[span.dice #[+dice(6)]]) while others can happen in multiple different ways (to get #[span.dice.outline 5] you could roll #[span.dice #[+dice(1)]] + #[span.dice #[+dice(4)]] or #[span.dice #[+dice(2)]] + #[span.dice #[+dice(3)]]).

---
> id: future-1

This table shows all possible outcomes:

    table.dice-table
      tr
        td #[.dice.outline 2]
        td #[.dice.outline 3]
        td #[.dice.outline 4]
        td #[.dice.outline 5]
        td #[.dice.outline 6]
        td #[.dice.outline 7]
        td #[.dice.outline 8]
        td #[.dice.outline 9]
        td #[.dice.outline 10]
        td #[.dice.outline 11]
        td #[.dice.outline 12]
      tr
        td #[.dice #[+dice(1)]] #[.dice #[+dice(1)]]
        td #[.dice #[+dice(1)]] #[.dice #[+dice(2)]]
        td #[.dice #[+dice(1)]] #[.dice #[+dice(3)]]
        td #[.dice #[+dice(1)]] #[.dice #[+dice(4)]]
        td #[.dice #[+dice(1)]] #[.dice #[+dice(5)]]
        td #[.dice #[+dice(1)]] #[.dice #[+dice(6)]]
        td #[.dice #[+dice(2)]] #[.dice #[+dice(6)]]
        td #[.dice #[+dice(3)]] #[.dice #[+dice(6)]]
        td #[.dice #[+dice(4)]] #[.dice #[+dice(6)]]
        td #[.dice #[+dice(5)]] #[.dice #[+dice(6)]]
        td #[.dice #[+dice(6)]] #[.dice #[+dice(6)]]
      tr
        td
        td #[.dice #[+dice(2)]] #[.dice #[+dice(1)]]
        td #[.dice #[+dice(2)]] #[.dice #[+dice(2)]]
        td #[.dice #[+dice(2)]] #[.dice #[+dice(3)]]
        td #[.dice #[+dice(2)]] #[.dice #[+dice(4)]]
        td #[.dice #[+dice(2)]] #[.dice #[+dice(5)]]
        td #[.dice #[+dice(3)]] #[.dice #[+dice(5)]]
        td #[.dice #[+dice(4)]] #[.dice #[+dice(5)]]
        td #[.dice #[+dice(5)]] #[.dice #[+dice(5)]]
        td #[.dice #[+dice(6)]] #[.dice #[+dice(5)]]
        td
      tr
        td(colspan=2)
        td #[.dice #[+dice(3)]] #[.dice #[+dice(1)]]
        td #[.dice #[+dice(3)]] #[.dice #[+dice(2)]]
        td #[.dice #[+dice(3)]] #[.dice #[+dice(3)]]
        td #[.dice #[+dice(3)]] #[.dice #[+dice(4)]]
        td #[.dice #[+dice(4)]] #[.dice #[+dice(4)]]
        td #[.dice #[+dice(5)]] #[.dice #[+dice(4)]]
        td #[.dice #[+dice(6)]] #[.dice #[+dice(4)]]
        td(colspan=2)
      tr
        td(colspan=3)
        td #[.dice #[+dice(4)]] #[.dice #[+dice(1)]]
        td #[.dice #[+dice(4)]] #[.dice #[+dice(2)]]
        td #[.dice #[+dice(4)]] #[.dice #[+dice(3)]]
        td #[.dice #[+dice(5)]] #[.dice #[+dice(3)]]
        td #[.dice #[+dice(6)]] #[.dice #[+dice(3)]]
        td(colspan=3)
      tr
        td(colspan=4)
        td #[.dice #[+dice(5)]] #[.dice #[+dice(1)]]
        td #[.dice #[+dice(5)]] #[.dice #[+dice(2)]]
        td #[.dice #[+dice(6)]] #[.dice #[+dice(2)]]
        td(colspan=4)
      tr
        td(colspan=5)
        td #[.dice #[+dice(6)]] #[.dice #[+dice(1)]]
        td(colspan=5)

The most likely result when rolling two dice is _{span.dice.outline}7_. There
are [[6]] outcomes where the sum is 7, and [[36]] outcomes in total,
_{span.reveal(when="blank-0 blank-1")}so the probability of getting a 7 is
`6/36 = 0.1666`._

---
> id: future-2

The least likely outcomes are _{span.dice.outline}2_ and _{span.dice.outline}12_,
each with a probability of `1/36 = 0.0277`.

It is impossible to forecast the outcome of a single coin toss or die roll.
However, using probability we can very accurately predict the outcome of _many_
dice.

If we throw a die 30 times, we know that we would get around `1/6 × 30 = 5`
sixes. If we roll it 300 times, there will be around `1/6 × 300 = 50` sixes.
These predictions get more and more accurate as we repeat the predictions more
and more often.

---
> id: dice-simulation
> goals: roll
> title: Rolling Dice

In this animation you can roll many “virtual” dice at once and see how the
results compare to the predicted probabilities:

::: .box.f-red

#### Rolling Dice

    .probTable.var(:html="probTable(d)")

We roll ${d}{d|2|1,6,1} dice at once and record the _{span.dice(style="width: auto; padding: 0 4px;")} SUM_
of their scores. The __{.m-green} green lines__ represent the probabilities of every possible
outcome predicted by probability theory and the __{.m-blue} blue bars__ show how often each outcome
happened in this computer generated experiment.

    p.btn-row.no-voice
      button.btn Roll once
      button.btn Roll 100 times
      button.btn Roll 1000 times

:::

{.reveal(when="roll")} Notice how, as we roll more and more dice, the observed
frequencies become closer and closer to the frequencies we predicted using
probability theory. This principle applies to all probability experiments and is
called the __law of large numbers__.

{.reveal(when="roll")} Similarly, as we increase the number of dice rolled at
once, you can also see that the probabilities change from a straight line (one
die) to a triangle (two dice) and then to a “bell-shaped” curve. This is known
as the __central limit theorem__, and the bell-shaped curve is called the
__normal distribution__.


---


## Probability Trees and Venn Diagrams

> section: trees
> sectionStatus: dev

{.todo} TODO


---

## Conditional Probability


> section: conditional
> sectionStatus: dev




---
> id: p0
> goals: press-all-buttons

::: column.grow
A team of researchers has made a new pill to try to treat a very painful ligament infection. However, before they can start mass production, they have to check that taking the pill is effective - and check whether it has nasty side-effects!

::: column(width=260)

    img(src="images/pillAndPatient.png" width=260)

:::

::: column(width=180)
    <!-- https://depositphotos.com/stock-photos/placebo-pill.html?filter=all&qview=85016586 -->
    img(src="images/placebo.jpg" width=180)

::: column.grow
When a hospital does an experiment to see if a treatment is helpful, it's called a *clinical trial*. You take a large group of patients with this ligament infection, then you give *some* of these patients are _{.pill.red}given the pill_, and others _{.pill.red}don't get the pill_(they might get a *placebo*: a pill that looks the same as the new pill, but doesn't do anything at all). Then you wait, and see which ones _{.pill.blue}get better_.
:::

Here's what happened to the people who participated in that clinical trial:

|         |  _{.pill.red}Not given pill_       |  _{.pill.red}Given pill_   |
|---------|---|---|
| After a week, _{.pill.blue}got better_    |34   |53   |
| After a week, _{.pill.blue}didn't get better_    |62   |89   |
{.grid}

Alright, there were a whole 89 people who _{.pill.red}were given the pill_ but _{.pill.blue}didn't get better_ - so apparently the pill doesn't work perfectly!

But what if the pill was working a *little* bit? What if a few of the people who _{.pill.red}were given the pill_ _{.pill.blue}did get better_ as a result? Even a pill that only works for some people can still be good! On the other hand, those pills take money and time to administer. So we want to be completely, *mathematically certain* about whether a person being _{.pill.red}given the pill_ does, or does not, make them more likely to _{.pill.blue}get better_.

::: column(width=250)
    <!-- depositphotos_109144654-stock-illustration-goalkeeper-catches-the-ball-football.jpg -->
    img(src="images/goalkeeper.jpg" width=250)

::: column.grow
In order to do this, we need to **statistically analyse** the data in that table, which is what this will teach you to do. You can apply statistics whenever you're trying to find a connection between two things, whether you're trying to estimate whether a goalkeeper is _{.pill.red}catching enough goals_ that you should _{.pill.blue}pay them more_, or you're checking whether _{.pill.red}advertizing your business_ lead to _{.pill.blue}getting more customers_ - or even whether _{.pill.red}changing your dating profile picture_ lead to _{.pill.blue}more good dates_.
:::

But to make it easy to learn about statistical analysis, we’re going to focus on data that’s easier to visualize: categorizing birds!

::: column(width=420)

    figure
      x-conditional-grid(only-one-column="true")
        svg.conditional(width=420 height=324)
          g.people
          g.buttons

:::

Try clicking those buttons - you'll find them useful for what's next!

---
> id: p1
> goals: press-all-buttons

::: column(width=180)

    img(src="images/bird.jpg" width=180)

::: column.grow

Some of the biggest breakthroughs in biology have come from looking at different kinds of bird. The drawings here were done by Darwin, who was using them to argue for evolution. Understanding bird variety is also very important in conservation. The *Eastern Whipbird* in the lower picture is an example of a bird that is _{.pill.red}dark-breasted_ and _{.pill.blue}short-tailed_, which means it's more likely to be found in colder regions. Because of this, it's currently believed that it will be more threatened by global warming. But, we might be wrong - _{.pill.blue}short tailed_ birds might end up more affected by global warming, so we'll see the number of them go down. As time goes on, in order to know where we should put our effort, we need to know what sorts of birds are being seen where.

:::

Suppose we've been out in the field for a while, and these are the birds we've observed...

::: column(width=420)

    figure
      x-conditional-grid(only-one-column="true")
        svg.conditional(width=420 height=324)
          g.people
          g.buttons

:::

Suppose I randomly choose a bird from this flock. What's the probability the bird is _{.pill.red}dark-breasted_? Clue: the _{.pill.yellow} total number of birds_ is 144, and there are 12 birds per column. [[1/4]]

How about the probability that a random bird in the flock is _{.pill.blue}short-tailed_? [[1/6]]

And the probability they have _{.pill.green}webbed feet_? [[1/3]]

---
> id: p2
> goals: press-second-column-buttons

### Conditionalizing

::: column.grow

That's just basic probability though - we need to understand **conditional probability**! Conditional probability is about statements like "What is Anna's probability of _{.pill.red}getting better_ **given that** Anna _{.pill.blue}took that pill_?". We call it that because the probabilities you talk about are still things like 30% or 90%, but they'll be *conditional* on something else being true.

::: column(width=120)

    img(src="images/conditionalPill.png" width=120)

:::

Here's the birds again. This time, you'll find you have the ability to **conditionalize**.

::: column(width=420)

    figure
      x-conditional-grid()
        svg.conditional(width=420 height=324)
          g.people
          g.buttons

:::

Again, all those buttons will be useful for what you're about to do!

---
> id: p3

Suppose I'm going to pick a bird at random again, but **I'm going to purposefully pick one of the _{.pill.red}dark-breasted_ birds**. For my random _{.pill.red}dark-breasted_ bird, what is the probability that it will have a _{.pill.purple}long beak_?  [[1]]

And of those birds who are _{.pill.blue}short-tailed_, what proportion of them have _{.pill.green}webbed feet_? [[0]]

If we know a bird is _{.pill.red}dark-breasted_, what’s the probability they have a _{.pill.blue}short-tailed_? [[1/6]]

---
> id: buckets
> goals: buckets

::: column.grow
Let’s try it without the applet (but you can draw it if you like!) Imagine a crowd of 100 people. 25 of those 100 people are _{.pill.yellow}wearing scarves_. Of those 25 people, 10 are _{.pill.yellow}wearing scarves_ AND they're _{.pill.green}wearing coats_. Of those NOT _{.pill.yellow}wearing scarves_, 20 are _{.pill.green}wearing coats_. What is the probability that someone who is _{.pill.green}wearing a coat_ will also be _{.pill.yellow}wearing a scarf_? [[1/3]]

::: column(width=120)

    img(src="images/autumn-cartoon-girl.jpg" width=180)

:::

### Independence

There's another important scientific word to know about, which is **independence**. Try pressing the buttons for this one: the probability that a bird is _{.pill.green}webbed feet_ if we know that they’re _{.pill.blue}short-tailed_ is [[1/4]]. The probability a bird is _{.pill.green}webbed feet_ if they are **not** _{.pill.blue}short-tailed_ is [[1/4]]. So, it’s the same probability - that means having _{.pill.green}webbed feet_ has nothing to do with whether a bird is _{.pill.blue}short-tailed_. This is called *independence* - we say _{.pill.green}webbed feet_ **is independent of** whether a bird is _{.pill.blue}short-tailed_.

_{.pill.yellow}Wearing a scarf_ **is** related to whether or not someone is _{.pill.green}wearing a coat_ - they are, in this technical sense, **dependent** on each other. It’s because [[these are both things you’ll do on a hot day | these are both things you do on tuesdays | they're both cheap items of clothing]]. The reason that this can be useful for helping cure diseases is because we wanted to know whether a person _{.pill.red}getting better_ is *related* to _{.pill.blue}them taking the pill_, i.e. is it **dependent** on whether they have taken the pill or not.

Which of these pairs of statements are **independent**?


    x-buckets.independent
      .inputs
        .input(bucket="1") Boarding a plane first <br><strong>and...</strong><br> finding a good seat
        .input(bucket="1") Getting rain in the morning <br><strong>and...</strong><br> getting rain in the afternoon
        .input(bucket="0") When flipping a coin, having it come up heads on a first throw <br><strong>and...</strong><br> having it come up heads on your second throw
        .input(bucket="1") Committing a crime <br><strong>and...</strong><br> getting arrested
        .input(bucket="1") Someone having a mohawk <br><strong>and...</strong><br> them being a fan of punk music
        .input(bucket="0") Getting a parking ticket <br><strong>and...</strong><br> winning the lottery
        .input(bucket="1") Being above average height <br><strong>and...</strong><br> being male
        .input(bucket="1") Being above average height <br><strong>and...</strong><br> being an adult
        .input(bucket="0") Your horoscope saying that you will make a new friend today <br><strong>and...</strong><br> actually making a new friend today
        .input(bucket="1") Brushing your teeth regularly <br><strong>and...</strong><br> having nice breath
        .input(bucket="0") Three siblings being the same gender <br><strong>and...</strong><br> the first one being female
      .buckets
        .bucket
          .title Independent
        .bucket
          .title Dependent

---
> id: afterBuckets

Sometimes it takes scientific studies to prove that two things are **independent** - for example, many studies have looked at whether _{.pill.red}getting vaccinated_ is related to whether a person will _{.pill.blue}become autistic_. They have established that **these two things have no relationship to each other** - they are **independent**. We know that there will be *some* children who _{.pill.red}get vaccinated_ and also _{.pill.blue}develop autism_ – but the probability is *exactly* the same as for children who _{.pill.red}didn't get vaccinated_!

::: column(width=420)

    figure
      x-conditional-grid()
        svg.conditional(width=420 height=324)
          g.people
          g.buttons

:::

If two things are **independent** , it means that in pictures like this, the rectangles are all lined up perfectly, they're not broken apart, like when you’re asking about things that depend on each other. When this happens (like if you click _{.pill.green}webbed feet_ and _{.pill.blue}short-tailed_), the area of the corner rectangle, which is the area where both statements are true, is equal to the probabilites of _{.pill.green}webbed feet_ and _{.pill.blue}short-tailed_. Which makes sense, because those probabilities are the side lengths of the rectangle - but only when the probabilities are independent!

### The Notation of Conditional Probability

<!-- Depositphotos.com "A rainy day" and "Woman takes a pill" -->
::: column(width=120)

    img(src="images/rain.png" width=120)

::: column.grow

When analysing statistics (like the pill-and-ligament-disease statistics, which we will get back to!), scientists have to talk about probabilities so often that instead of saying “the probability that _{.pill.red}it'll rain today_ ”, they just write "P( _{.pill.red}it'll rain today_ )".

:::

Another bit of terminology: whenever they're talking about the probability of two things being true instead of one, like _{.pill.blue}short-tailed_ **and** _{.pill.yellow} being threatened by climate change_, instead of **and**, scientists say **⋂**, as in "_{.pill.blue}short-tailed_" **⋂** _{.pill.yellow}threatened by climate change_". It's the same "⋂" you might have seen in set theory. Put those together and you get statements like “When it’s winter, P( _{.pill.green}people will buy coats_ ⋂ _{.pill.purple}people will buy scarves_ ) is increased”, which you might hear said at a clothes shop!

There’s another precise symbol here which saves a lot of time, which is **|**. It means “**given we know that...**”. For example:

|Plain language|Algebra|
|---------|---|
|The probability that someone is wearing a scarf given that we know that they are wearing a coat|P(_{.pill.yellow}Wearing scarf_**\|**_{.pill.green}wearing coat_)|
|The probability it'll rain in the afternoon, on a day when rained in the morning| P(_{.pill.red}rain in afternoon_**\|**_{.pill.blue}rain in morning_)|
|The probability I'll like Bo Burnham's new album given that I liked his last one| P(_{.pill.yellow}I'll like his new album_**\|**_{.pill.green}I liked his last one_) |
{.grid}

TODO the above should have a puzzle in one of the rows

### Notation into algebra

With formulas, you can ask questions about connections between things in a more precise way. Above, you answered the question “what proportion of the birds who were _{.pill.blue}short-tailed_ are also _{.pill.red}dark-breasted_?”. That's the same thing as calculating P(_{.pill.blue}short-tailed_|_{.pill.red}dark-breasted_).

The way you got this value involved looking at the number of birds who were _{.pill.blue}short-tailed_. How many were there? P(_{.pill.blue}short-tailed_) * _{.pill.yellow} total number of birds_, which is equal to [[0.5 * 144, -0.5*144]]

You also needed to get the number of birds that are _{.pill.blue}short-tailed_ and _{.pill.red}dark-breasted_. This was equal to _{.pill.yellow} total number of birds_ * P(_{.pill.blue}short-tailed_ ⋂ _{.pill.red}dark-breasted_), which is equal to [[0.5 * 144, -0.5*144,]]

To get P(_{.pill.red}dark-breasted_|_{.pill.blue}short-tailed_), you divided the second number by the first number. As in, you did:

{.text-center}`P(pill("short-tailed","blue")cap pill("dark-breasted","red")) * pill("total number of birds","yellow") / P(pill("dark-breasted","blue")) * pill("total number of birds","yellow")`

We can simplify that expression! It’s just the same as saying P(_{.pill.red}dark-breasted_|_{.pill.blue}short-tailed_) is equal to:

{.text-center}`P(pill("short-tailed", "blue")cap pill("dark-breasted", "red")) / P(pill("dark-breasted", "red"))`

Which is the ratio between the area of the rectangle containing the birds that were _{.pill.blue}short-tailed_ and _{.pill.red}dark-breasted_ and the area of the combined rectangle containing all the birds that were _{.pill.red}dark-breasted_. This makes sense because the more area a rectangle has, the more birds are in it!
  
In fact, this is true for any statement, not just what birds look like:

{.text-center}`P(pill("A", "red") | pill("B", "blue")) = P(pill("B", "blue")cap pill("A", "red")) / P(pill("A", "red"))`

These letters _{.pill.red}A_ and _{.pill.blue}B_ could be **any pair of sentences**! Usually they're somehow dependent on each other: _{.pill.red}this bread has a bit of mould on it_; _{.pill.blue}this bread will make me sick if I eat it_. They could also be totally unconnected sentences: _{.pill.red}The next world cup will be won by France_ and _{.pill.blue}human CO2 emissions are causing climate change_. No matter what they are, this equation will always apply to them!

::: column.grow
This equation tells us what conditional probability is. One of the first people to use it successfully was [Pierre-Simone Laplace](bio:laplace). In 1776, he applied it to some observations that had been made on the paths of comets, and was able to figure out their average behaviour. He later used his findings to work out whether the solar system will eventually break apart based on other people's observations of how comets move!

::: column(width=360)

    img(src="images/comet.jpg" width=360)

:::

We can also make a formula for **independence** too:

{.text-center}*If* `pill("A", "red")` and `pill("B", "blue")` are **independent**, *then* `P(pill("A", "red"))*P(pill("B", "blue")) = P(pill("A", "red")cap pill("B", "blue"))`

**Warning!!** P(_{.pill.red}dark-breasted_|_{.pill.blue}short-tailed_) is different from P(_{.pill.blue}short-tailed_|_{.pill.red}dark-breasted_). Think about it: the probability _{.pill.red}Ben is from Europe_ given that _{.pill.blue}Ben is from France_ is **certain**, but the probability _{.pill.blue}Ben is from France_ given _{.pill.red}Ben is from Europe_ isn't certain - he could be from Italy. You'll learn more about this if you study **Bayes' theorem**.

*Sometimes* P(_{.pill.red}A_|_{.pill.blue}B_) = P(_{.pill.blue}B_|_{.pill.red}A_) *is* true. Why only sometimes? Well, they'll only be the same if _{.pill.red}A_ and _{.pill.blue}B_ are **independent** - in fact, that's an equivalent way of figuring out that two things are independent. There are two ways of thinking about this - one involves using the formula we've given you and proving it from that. Another is to think about how, above, the probability of having _{.pill.green}webbed feet_ and being _{.pill.blue}short-tailed_ multiplied together gave the area of the rectangle - the area of the rectangle is P(_{.pill.green}webbed feet_ ⋂ _{.pill.blue}short-tailed_)!

### Medicine and Simpson's Paradox

Back to that ligament infection! Remember this table:

|         |_{.pill.blue}Not given pill_       |_{.pill.blue}Given pill_   |
|---------|---|---|
| After a week, _{.pill.red}got better_    |34   |53   |
| After a week, _{.pill.red}didn't get better_    |62   |89   |
{.grid}

::: column(width=300)
    <!-- https://depositphotos.com/stock-photos/hospital-bed.html?filter=all&qview=21643093 -->
    img(src="images/hospital.jpg" width=300 height=254)

::: column.grow

We wanted to help people suffering from the ligament disease. So we wanted to know if being _{.pill.blue}given the pill_ makes a person more likely to _{.pill.red}get better_.

So here we go! What is P(_{.pill.red}got better_|_{.pill.blue}given pill_)? [[53/142]] - and what is P(_{.pill.red}got better_|_{.pill.blue}they didn’t take the pill_)? [[34/96]] And this gives us our very important answer: [[the pill makes you more likely to get better | the pill makes you no more likely to get better]].

:::

Hundreds of new pills get discovered every year, and many of them don’t work - so knowing how to do this is very useful if we want to help people.

The same doctors did a study on another pill, pill 2. It had interesting results but they decided pill 2 didn't work.

They had data for _{.pill.green}young_ and _{.pill.green}old_ people. At first, the doctors added up those datasetspeople, to make it easier to look at:

|         |_{.pill.blue}Not given pill 2_       |_{.pill.blue}Given pill 2_   |
|---------|---|---|
| All people|273/350|289/350 |
{.grid}

That makes it look like pill 2 is pretty good! But wait... the doctors decided it *didn't* work! Why?

Well, they were a bit suspicious, so they checked how

|         |P(_{.pill.red}got better_\|_{.pill.blue}Not given pill 2_)       |P(_{.pill.red}got better_\|_{.pill.blue}Given pill 2_)   |
|---------|---|---|
|_{.pill.green}Young_ people|81/87|234/270|
|_{.pill.green}Old_ people|192/263|55/80|
{.grid}

Let's see those as probabilities:

|         |P(_{.pill.red}got better_\|_{.pill.blue}Not given pill 2_)       |P(_{.pill.red}got better_\|_{.pill.blue}Given pill 2_)   |
|---------|---|---|
|_{.pill.green}Young_ people|[[0.931]]|[[0.866]]|
|_{.pill.green}Old_ people|[[0.73]]|[[0.6875]]|
{.grid}

Crazy! The numbers in the left column are both bigger, so it turns out that pill 2 is actually a totally useless treatment, even though when we just looked at those numbers added together make it seem good!

::: column(width=240)
    
    img(src="images/childAndElder.jpg" width=360 height=254)

::: column.grow

Why did this happen? Well, notice how different numbers of young and old people were _{.pill.blue}given pill 2_. Basically, there were people who were _{.pill.blue}given pill 2_, and they were people who were likely to _{.pill.red}get better_ anyway. Checking P(_{.pill.red}got better_|_{.pill.green}young_) will tell you why - people who are _{.pill.green}young_ are much more likely to _{.pill.red}get better_ - whether they were _{.pill.blue}given pill 2_ or _{.pill.blue}not given pill 2_! That made it *look* as though being _{.pill.blue}given pill 2_ helped people!

:::

By accident, the doctors monitored too many _{.pill.green}young_ people who were _{.pill.blue}given pill 2_, i.e. they accidentally made it so that being _{.pill.green}young_ was **not independent** of being _{.pill.blue}given pill 2_. It's a good thing they realized their mistake. They should have been more careful earlier in this clinical trial - they should have _{.pill.blue}given pill 2_ equally to _{.pill.green}young_ and _{.pill.green}old_ people.

This is called **Simpson’s paradox**. It's a kind of *bias* that hides in data, and it’s important to be able to spot Simpson's paradox. You could save people's lives!

Now you know the terminology of conditional probability, try to look out for it - and you might start seeing it in what people say all the time.

---


## The Monty Hall Problem

> id: monty-hall
> sectionBackground: dark gameshow
> goals: game
> section: monty-hall

Welcome to the most spectacular game show on the planet! You now have a
once-in-a-lifetime chance of winning a fantastic sports car which is hidden
behind one of these three doors. Unfortunately, there are only goats behind the
other two doors. Select one to make your choice!

    .monty-hall.selectable
      .door-box: .door
      .door-box: .door
      .door-box: .door
      .floor

{.monty-reveal} Are you sure about that? You can still change your mind and
select a different door…

    p.text-center.monty-reveal: button.btn.sure I’m sure!
  
{.monty-reveal} A great choice, but let me make life a little easier for you.
I’ll open one of the other doors with a goat, so that there are only two doors
left for you to pick from. Do you want to stick with your choice, or do you want
to swap?

    p.text-center.monty-reveal
      button.btn.swap I want to stay!
      button.btn.swap I want to swap!

{.monty-reveal} Ok – let’s see how you did…

    p.text-center.monty-reveal: button.btn.show Open the doors…

{.monty-reveal} _{span.monty-option}Looks like you made the right choice.
Congratulations, you just won a beautiful new sports car!_
_{span.monty-option.hidden} Sorry – it seems like this time you only won a
goat. But don’t worry, you can play again!_

    p.text-center.monty-reveal: button.btn.reset Replay game

---
> id: monty-hall-1

If you play this game many times, you’ll notice that you’re more likely to win
if you [[swap|don’t swap]] after the first door is opened,
_{.reveal(when="blank-0")}rather than sticking with your initial choice._

{.reveal(when="blank-0")} But how can this be – surely the car is equally likely
to be behind each of the two remaining doors?

---
> id: monty-hall-2

The explanation is very subtle. When you pick the initial door, the probability
of being correct is `1/3` and the probability of being wrong is `2/3`.

    p.text-center: include svg/monty-1.svg

---
> id: monty-hall-3

After the game master opens one of the other doors, the probability of being
wrong is _still_ `2/3`, except now all this probability is on just one door.
This means that swapping doors [[doubles|triples|halves]] your chance of winning.

    p.text-center: include svg/monty-2.svg

---
> id: monty-hall-4

Even if this doesn’t seem very intuitive, we can prove that it is correct –
simply by listing all different possibilities:

    figure: img(src="images/monty.png" width=694 height=468)

Out of the 9 possibilities, there are [[6]] where you need you to switch doors, in order to win.
This gives a  chance of `6/9 = 2/3` like before.


---


## The Birthday Problem

> section: birthdays
> sectionStatus: dev

TODO


---


## True Randomness

> id: quantum
> section: randomness

::: column.grow
Most of this course relied on the fact that things like coins, or dice, or
roulette wheels are completely random. However, that is not really true – we
already learned that Edward Thorpe managed to predict the outcome of roulette.

Suppose we toss a coin: the chance of it landing heads is 0.5. If we knew which
way the coin was facing just before it left the hand, we might be able to make a
slightly better prediction, such as 0.58 or 0.41. If we also knew the weight and
size of the coin, and the angle, position and speed as it left the hand, we
could use the laws of physics – gravity, friction and air resistance – to model
the motion of the coin and to predict the outcome. Finally, if we knew the exact
position of every atom in the coin and of all the air molecules surrounding it,
we could create a computer simulation to accurately predict what will happen.
::: column(width=240)

    x-img(src="images/coins.jpg" alt="Flipping a Coin" width=240 height=343)

:::

---
> id: quantum1

One could argue that tossing a coin really isn’t random at all – it is
_chaotic_. That means that the underlying physical principles are so complex
that even tiny changes to the starting conditions (speed, angle) can have a
dramatic effect on the final outcome. We can use coins in games and gambling not
because they are random, but because it is so incredibly difficult (and for
practical purposes impossible) to predict the result.

The same principle applies to many other “random” events in life, including dice
and roulette wheels. They are not really _random_, we simply don’t have the
tools to do the mathematical calculations accurately enough to predict the
outcome.

---
> id: radioactive
> goals: decay

But _true randomness_ does exists – at the very foundations of matter. A block
of radioactive material consists of billions of atoms which decay over time:
they fall apart into smaller atoms while emitting dangerous radiation.

::: column.grow

Physicists can calculate the probability that a particular atom will decay in a
certain period of time, but it is impossible to work out _which one_ will decay
next – even if you know the exact properties of every atom.

The overall rate of decay, on the other hand, is so steady that it can be used
to calculate the age of fossils that died thousands of years ago on Earth. This
process is called __Carbon dating__.

::: column(width=300)

    p: svg.radioactive(width=300 height=200 viewBox="0 0 300 200")
    p.text-center.btn-row.no-voice: button.btn Start Decay

:::

    // TODO Possible probability distributions of the position of an electron in
    // a hydrogen atom. Lighter areas represent more likely locations of the electron.

---
> id: radioactive-1

[Radioactive decay](gloss:radioactive) of atoms is caused by forces which act at
much smaller scales within atoms, and which can be explained using [Quantum
mechanics](gloss:quantum). During the last century, physicists like [Max
Planck](bio:planck) and [Paul Dirac](bio:dirac) discovered that fundamental
particles have a mind-blowing property: they can be in multiple different places
_at the same time_. They don’t have a fixed position, but instead a probability
distribution (also called _wave function_) which tells us how likely it is that
we’ll find them at a particular position.

This incredible property is used by Quantum computers. Conventional computers
can only ever do one computation at a time. Quantum computers can use the
properties of subatomic particles to do many calculations at the same time – and
that makes them significantly faster.

    figure: x-img(lightbox src="images/quantum.jpg" alt="Quantum Mechanics" width=760 height=390)

---
> id: radioactive-2

We can’t really _understand_ or _explain_ quantum mechanics – we just have to
accept that it is what is predicted by mathematical theory and confirmed by
physical observations. The curious quantum effects have only ever been observed
on tiny scales of a few atoms, and it is not clear how they affect us in
everyday life. But it is the only known effect in nature that produces _true
randomness_.

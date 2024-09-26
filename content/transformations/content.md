# Transformations and Symmetry

## Introduction

> id: intro
> section: introduction
> description: Symmetry can be seen everywhere in nature – but it also underlies completely invisible laws of nature. Mathematics can explain why that is the case.
> color: "#2274E8"
> level: Intermediate
> next: triangles

Many geometric concepts like [lines](gloss:line) or [polygons](gloss:polygon)
were “invented” by mathematicians. Symmetry, on the other hand, is everywhere
around us. Almost all plants, animals, and even we humans are symmetric.

::: column(width=200)

    x-img(src="images/butterfly.jpg" width=200 height=200 lightbox alt="Butterfly")

::: column(width=200)

    x-img(src="images/lion.jpg" width=200 height=200 lightbox alt="Lion")

::: column(width=200)

    x-img(src="images/starfish.jpg" width=200 height=200 lightbox alt="Starfish")

:::

Over time, we’ve imitated nature’s symmetry in art, architecture, technology
and design. Symmetric shapes and patterns just seems to look _more beautiful_
than non-symmetric ones.

::: column(width=200)

    x-img(src="images/taj-mahal.jpg" credit="© Yann Forget / Wikimedia Commons" width=200 height=200 lightbox alt="Taj Mahal")

::: column(width=200)

    x-img(src="images/capitol.jpg" credit="© Martin Falbisoner" width=200 height=200 lightbox alt="US Capitol")

::: column(width=200)

    x-img(src="images/window.jpg" width=200 height=200 lightbox alt="Mosaic Church Window")

:::

But symmetry is much more important than simply _looking beautiful_. It lies at
the very foundations of our universe, and can even explain the most fundamental
laws of physics.

[Continue](btn:next)

---
> id: transformations
> goals: t1 t2 t3

While symmetry is a very intuitive concept, describing it mathematically is more
difficult than you might think. First, we have to learn about
[__transformations__](gloss:transformation), which are ways to convert one
geometric figure into another one. Here are a few examples:

::: column.r(width=200 parent="padded-thin")

    .animation
      include svg/transform-1.svg
      x-play-btn

::: column.r(width=200)

    .animation
      include svg/transform-2.svg
      x-play-btn

::: column.r(width=200)

    .animation
      include svg/transform-3.svg
      x-play-btn

:::

---
> id: transformations-1

The result of a transformation is called the [__image__](gloss:transformation-image). We often
denote the image of a shape `A` as `A'`, pronounced “A prime”. There are many different types of
transformation, which we’ll explore in more detail throughout this course.

---

## Rigid Transformations

> id: rigid
> section: rigid

A [__rigid transformation__](gloss:rigid-transformation) is a special kind of transformation that
doesn’t change the size or shape of a figure. We could imagine that it is made out of a solid material
like wood or metal: we can move it, turn it, or flip it over, but we can’t stretch, bend, or
otherwise deform it.

Which of these five transformations are rigid?

    x-picker.rigid
      .item: img(src="images/picker-1.svg" width=130 height=240)
      .item(data-error="not-rigid-1"): img(src="images/picker-2.svg" width=130 height=240)
      .item: img(src="images/picker-3.svg" width=130 height=240)
      .item(data-error="not-rigid-2"): img(src="images/picker-4.svg" width=130 height=240)
      .item: img(src="images/picker-5.svg" width=130 height=240)

---
> id: rigid-1
> goals: t1 t2 t3

It turns out that there are just three different types of rigid transformations:

::: column.r(width=200)

    .animation
      include svg/rigid-1.svg
      x-play-btn

{.text-center} A transformation that simply _moves_ a shape is called a
[__translation__](gloss:translation).

::: column.r(width=200)

    .animation
      include svg/rigid-2.svg
      x-play-btn

{.text-center} A transformation that _flips_ a shape over is called a
[__reflection__](gloss:reflection).

::: column.r(width=200)

    .animation
      include svg/rigid-3.svg
      x-play-btn

{.text-center} A transformation that _spins_ a shape is called a
[__rotation__](gloss:rotation).

:::

---
> id: rigid-2

We can also combine multiple types of transformation to create more complex
ones – for example, a translation followed by a rotation.

But first, let’s have a look at each of these types of transformations in more
detail.

---
> id: translations

### Translations

A [__translation__](gloss:translation) is a transformation that moves every
point of a figure by the same distance in the same direction.

In the coordinate plane, we can specify a translation by how far the shape is
moved along the _x_-axis and the _y_-axis. For example, a transformation by
(3, 5) moves a shape by 3 along the _x_-axis and by 5 along the _y_-axis.

::: column(width=220)

    x-geopad(width=220 height=140 grid=20 no-points): svg
      path.fill.orange.light(x="polygon(point(2,2),point(1,5),point(4,5),point(3,2))" name="s1" label="A" label-class="white")
      path.fill.orange(x="s1.shift(5,-1)" label="A'" label-class="white")
      path.reveal(x="segment(point(4,5),point(9,5))" mark="arrow" when="blank-0" animation="draw")
      path.reveal(x="segment(point(9,5),point(9,4))" mark="arrow" when="blank-1" animation="draw")

{.caption} Translated by ([[5]], [[1]])
::: column(width=220)

    x-geopad(width=220 height=140 grid=20 no-points): svg
      path.fill.red.light(x="circle(point(7,4),1.5)" name="s2" label="B" label-class="white")
      path.fill.red(x="s2.shift(-4,-2)" label="B'" label-class="white")
      path.reveal(x="segment(point(6,5),point(2,5))" mark="arrow" when="blank-2" animation="draw")
      path.reveal(x="segment(point(2,5),point(2,3))" mark="arrow" when="blank-3" animation="draw")

{.caption} Translated by ([[-4]], [[2]])
::: column(width=220)

    x-geopad(width=220 height=140 grid=20 no-points): svg
      path.fill.light.purple(x="polygon(point(2,0),point(5,0),point(5,2),point(4,2),point(4,1),point(3,1),point(3,4),point(2,4))" name="s3" label="C")
      path.fill.purple(x="s3.shift(4,2)" label="C'")
      path.reveal(x="segment(point(2,6),point(6,6))" mark="arrow" when="blank-4" animation="draw")
      path.reveal(x="segment(point(2,4),point(2,6))" mark="arrow" when="blank-5" animation="draw")

{.caption} Translated by ([[4]], [[-2]])
:::

---
> id: translations-1
> goals: drag-0 drag-1 drag-2

Now it’s your turn – translate the following shapes as shown:

::: column(width=220)

    svg(width=220 height=140)
      each i in [10,30,50,70,90,110,130,150,170,190,210]
        line(x1=i x2=i y1=0 y2=140 stroke="#e6e6e6" stroke-width=2)
      each i in [10,30,50,70,90,110,130]
        line(x1=0 x2=220 y1=i y2=i stroke="#e6e6e6" stroke-width=2)
      polygon(points="30,10 10,70 70,70 50,10" style="fill: #289782; opacity: .5;")
      polygon(points="30,10 10,70 70,70 50,10" style="fill: #289782; cursor: move")

{.caption} Translate by (3, 1) _{span.check(when="drag-0")}_
::: column(width=220)

    svg(width=220 height=140)
      each i in [10,30,50,70,90,110,130,150,170,190,210]
        line(x1=i x2=i y1=0 y2=140 stroke="#e6e6e6" stroke-width=2)
      each i in [10,30,50,70,90,110,130]
        line(x1=0 x2=220 y1=i y2=i stroke="#e6e6e6" stroke-width=2)
      polygon(points="50,10 90,50 50,90 10,50" style="fill: #2ba058; opacity: .5;")
      polygon(points="50,10 90,50 50,90 10,50" style="fill: #2ba058; cursor: move")

{.caption} Translate by (–4, –2) _{span.check(when="drag-1")}_
::: column(width=220)

    svg(width=220 height=140)
      each i in [10,30,50,70,90,110,130,150,170,190,210]
        line(x1=i x2=i y1=0 y2=140 stroke="#e6e6e6" stroke-width=2)
      each i in [10,30,50,70,90,110,130]
        line(x1=0 x2=220 y1=i y2=i stroke="#e6e6e6" stroke-width=2)
      polygon(points="10,10 30,10 30,50 50,50 50,10 70,10 70,70 10,70" style="fill: #2ea92e; opacity: .5;")
      polygon(points="10,10 30,10 30,50 50,50 50,10 70,10 70,70 10,70" style="fill: #2ea92e; cursor: move")

{.caption} Translate by (5, –1) _{span.check(when="drag-2")}_
:::

---
> id: reflections
> goals: r0 r1 r2

### Reflections

A [__reflection__](gloss:reflection) is a transformation that “flips” or
“mirrors” a shape across a line. This line is called the __line of reflection__.

Draw the line of reflection in each of these examples:

::: column(width=220)

    x-geopad.draw.reflection(width=220 height=180 grid=20 no-points): svg
      path(x="polygon(point(2,1),point(1,2),point(2,3),point(8,2))" style="stroke: #363644; stroke-width: 3px; fill: rgba(179,4,105,0.4)" name="from0")
      path(hidden name="line0" x="line(point(-1,4),point(11,4))")
      path(x="from0.reflect(line0)" style="stroke: #363644; stroke-width: 3px; fill: rgba(179,4,105,0.4)")

::: column(width=220)

    x-geopad.draw.reflection(width=220 height=180 grid=20 no-points): svg
      path(x="polygon(point(1,1),point(1,5),point(3,5),point(2,3),point(4,1))" style="stroke: #363644; stroke-width: 3px; fill: rgba(154,24,130,0.4)" name="from1")
      path(hidden name="line1" x="line(point(9,-1),point(-1,9))")
      path(x="from1.reflect(line1)" style="stroke: #363644; stroke-width: 3px; fill: rgba(154,24,130,0.4)")

::: column(width=220)

    x-geopad.draw.reflection(width=220 height=180 grid=20 no-points)
      x-img.background(src="images/rorschach.jpg" width=220 height=180 alt="Rorschach Test")
      svg
        path(hidden name="line2" x="line(point(5,-1),point(5,9))")

:::

---
> id: reflections-1
> goals: r0 r1 r2

Now it’s your turn – draw the reflection of each of these shapes:

::: column(width=220)

    x-geopad.draw(width=220 height=180 grid=20 no-points): svg
      path(x="polygon(point(1,2),point(3,1),point(4,3),point(4,5),point(2,6),point(1,4))" name="from0" style="fill: rgba(105,63,180,0.4)")
      path.red(x="line(point(5,0), point(5,1))" name="line0")
      path.finished(hidden x="from0.reflect(line0)" name="to0" style="fill: rgba(105,63,180,0.4)")

::: column(width=220)

    x-geopad.draw(width=220 height=180 grid=20 no-points): svg
      path(x="polygon(point(2,6),point(6,4),point(8,6),point(5,7))" name="from1" style="fill: rgba(80,83,205,0.4)")
      path.red(x="line(point(-1,4), point(11,4))" name="line1")
      path.finished(hidden x="from1.reflect(line1)" name="to1" style="fill: rgba(80,83,205,0.4)")

::: column(width=220)

    x-geopad.draw(width=220 height=180 grid=20 no-points): svg
      path(x="polygon(point(2,3),point(3,3),point(3,5),point(5,5),point(5,6),point(2,6))" name="from2" style="fill: rgba(56,102,230,0.4)")
      path.red(x="line(point(2,1), point(3,2))" name="line2")
      path.finished(hidden x="from2.reflect(line2)" name="to2" style="fill: rgba(56,102,230,0.4)")

:::

---
> id: reflections-2

Notice that if a point lies on the line of reflection, it [[doesn’t move|rotates|flips over]] when
being reflected: _{span.reveal(when="blank-0")} its image is the same point as the original._

---
> id: reflections-3

In all of the examples above, the line of reflection was horizontal, vertical,
or at a 45° angle – which made it easy to draw the reflections. If that is not
the case, the construction requires a bit more work:

::: column(width=300)

    x-geopad.sticky(width=300): svg
      circle.move.pulsate(name="l1" cx="180" cy="30" target="refl")
      circle.move.pulsate(name="l2" cx="120" cy="270" target="refl")
      path(name="refl" x="line(l1,l2)" target="refl")

      circle.reveal(name="a" x="point(60,50)" when="next-0" animation="pop" target="circ")
      circle(name="b" x="point(120,100)" hidden)
      circle(name="c" x="point(110,170)" hidden)
      circle(name="d" x="point(65,200)" hidden)
      circle(name="e" x="point(30,120)" hidden)

      circle.reveal(name="p" x="refl.project(a)" when="next-0" animation="pop" delay=1500)
      path.reveal.fill.light(x="angle(a,p,l1)" size=16 when="next-0" delay=1500)

      circle.reveal(name="a1" x="a.reflect(refl)" when="next-1" animation="pop" target="circ")
      circle(name="b1" x="b.reflect(refl)" hidden)
      circle(name="c1" x="c.reflect(refl)" hidden)
      circle(name="d1" x="d.reflect(refl)" hidden)
      circle(name="e1" x="e.reflect(refl)" hidden)

      path.fill.blue(x="polygon(a,b,c,d,e)")
      path.fill.reveal.blue1(x="polygon(a1,b1,c1,d1,e1)" when="next-3")

      path.reveal(x="line(a,a1)" when="next-0" animation="draw" delay=1000)
      path.reveal.thin.light(x="segment(b,b1)" when="next-2" animation="draw" delay=400)
      path.reveal.thin.light(x="segment(c,c1)" when="next-2" animation="draw" delay=500)
      path.reveal.thin.light(x="segment(d,d1)" when="next-2" animation="draw" delay=600)
      path.reveal.thin.light(x="segment(e,e1)" when="next-2" animation="draw" delay=700)

      circle.transparent(name="ax" x="refl.project(a)" target="circ")
      path.transparent(x="segment(a,ax)" target="d1 circ")
      path.transparent(x="segment(a1,ax)" target="d2 circ")
      path.transparent(x="circle(ax,distance(a,ax))" target="circ")

::: column.grow
{.r} To reflect this shape across the [line of reflection](target:refl), we have
to reflect every [vertex](gloss:polygon-vertex) individually and then connect
them again.
[Continue](btn:next)

{.r.reveal(when="next-0")} Let’s pick one of the vertices and draw the line
through this vertex that is perpendicular to the line of reflection.
[Continue](btn:next)

{.r.reveal(when="next-1")} Now we can measure the [distance](target:d1) from the
vertex to the line of the reflection, and make the point that has the [same
distance](target:d2) on the other side. _{span.lgrey}(We can either use a ruler
or a [compass](target:circ) to do this.)_
[Continue](btn:next)

{.r.reveal(when="next-2")} We can do the same for all the other vertices of our
shape.
[Continue](btn:next)

{.r.reveal(when="next-3")} Now we just have to connect the reflected vertices in
the correct order, and we’ve found the reflection!
:::

---
> id: rotations
> goals: r0 r1 r2

### Rotations

A [__rotation__](gloss:rotation) is a transformation that “turns” a shape by a
certain angle around a fixed point. That point is called the [__center of
rotation__](gloss:center-of-rotation). Rotations can be clockwise or
counterclockwise.

Try to rotate the shapes below around the red center of rotation:

::: column(width=220)

    x-geopad.draw(width=220 height=180 grid=20 no-points): svg
      path(x="polygon(point(2,2),point(2,5),point(5,5),point(5,2))" name="from0" style="fill: rgba(34,132,213,0.4)")
      circle.red(x="point(5,6)" name="c0")
      path.finished(hidden x="from0.rotate(pi/2,c0)" name="to0" style="fill: rgba(34,132,213,0.4)")

{.caption} Rotate by 90° clockwise.
::: column(width=220)

    x-geopad.draw(width=220 height=180 grid=20 no-points): svg
      path(x="polygon(point(3,2),point(8,1),point(9,4))" name="from1" style="fill: rgba(40,151,130,0.4)")
      circle.red(x="point(5,4)" name="c1")
      path.finished(hidden x="from1.rotate(pi,c1)" name="to1" style="fill: rgba(40,151,130,0.4)")

{.caption} Rotate by 180°.
::: column(width=220)

    x-geopad.draw(width=220 height=180 grid=20 no-points): svg
      path(x="polygon(point(3,0),point(8,0),point(8,4),point(1,4))" name="from2" style="fill: rgba(46,169,46,0.4)")
      circle.red(x="point(6,3)" name="c2")
      path.finished(hidden x="from2.rotate(-pi/2,c2)" name="to2" style="fill: rgba(46,169,46,0.4)")

{.caption} Rotate by 90° anti-clockwise.
:::

---
> id: rotations-1

::: column(width=300)

    x-geopad.sticky(width=300): svg
      circle.move.pulsate(name="rot" cx="150" cy="250" target="rot angle compass protractor")

      circle.reveal(name="a" x="point(270,190)" when="next-0" animation="pop" target="compass")
      circle(name="b" x="point(280,110)" hidden)
      circle(name="c" x="point(210,80)" hidden)
      circle(name="d" x="point(190,170)" hidden)
      circle(name="e" x="point(220,200)" hidden)

      circle.reveal(name="a1" x="a.rotate(-ang/18*pi,rot)" when="next-2" animation="pop" target="a1 compass")
      circle(name="b1" x="b.rotate(-ang/18*pi,rot)" hidden)
      circle(name="c1" x="c.rotate(-ang/18*pi,rot)" hidden)
      circle(name="d1" x="d.rotate(-ang/18*pi,rot)" hidden)
      circle(name="e1" x="e.rotate(-ang/18*pi,rot)" hidden)

      path.fill.green(x="polygon(a,b,c,d,e)")
      path.fill.reveal.green1(x="polygon(a1,b1,c1,d1,e1)" when="next-4")

      path.transparent.light.fill(x="arc(rot,a.rotate(pi,rot),pi)" target="protractor")
      path.reveal.light.fill(x="angle(a1,rot,a)" when="next-1" target="angle protractor")

      path.reveal(x="segment(a,rot)" when="next-0" animation="draw" delay=500 target="angle compass protractor")
      path.reveal.thin.light(x="segment(rot,b)" when="next-3" animation="draw" delay=400)
      path.reveal.thin.light(x="segment(rot,c)" when="next-3" animation="draw" delay=500)
      path.reveal.thin.light(x="segment(rot,d)" when="next-3" animation="draw" delay=600)
      path.reveal.thin.light(x="segment(rot,e)" when="next-3" animation="draw" delay=700)

      path.reveal(x="ray(rot,a1)" when="next-1" animation="draw" delay=500 target="angle l2")
      path.reveal.thin.light(x="segment(rot,b1)" when="next-3" animation="draw" delay=800)
      path.reveal.thin.light(x="segment(rot,c1)" when="next-3" animation="draw" delay=900 )
      path.reveal.thin.light(x="segment(rot,d1)" when="next-3" animation="draw" delay=1000)
      path.reveal.thin.light(x="segment(rot,e1)" when="next-3" animation="draw" delay=1100)

      path.transparent(x="segment(rot,a1)" target="compass protractor")
      path.transparent(x="circle(rot,distance(rot,a))" target="compass")


::: column.grow
It is more difficult to draw rotations that are not exactly 90° or 180°. Let's
try to rotate this shape by ${10*ang}{ang|6|-18,18,1}° around the [center of
rotation](target:rot).

{.r} Like for reflections, we have to rotate every point in a shape individually.
[Continue](btn:next)

{.r.reveal(when="next-0")} We start by picking one of the vertices and drawing a line to the center of
rotation.
[Continue](btn:next)

{.r.reveal(when="next-1")} Using a [protractor](target:protractor), we can
measure an [angle of ${ang*10}°](target:angle) around the center of rotation.
Let’s draw a [second line](target:l2) at that angle.
[Continue](btn:next)

{.r.reveal(when="next-2")} Using a [compass](target:compass) or ruler, we can
find a [point](target:a1) on this line that has the same distance from the
center of rotation as the original point.
[Continue](btn:next)

{.r.reveal(when="next-3")} Now we have to repeat these steps for all other vertices of our shape.
[Continue](btn:next)

{.reveal(when="next-4")} And finally, like before, we can connect the individual
vertices to get the rotated image of our original shape.
:::

---
> id: composition-1

Transformations are an important concept in many parts of mathematics, not just
geometry. For example, you can transform [_functions_](gloss:function) by
shifting or rotating their [graphs](gloss:function-graph). You can also use
transformations to determine whether two shapes are [congruent](gloss:congruent).

---

## Congruence

> section: congruence
> sectionStatus: dev

TODO

---

### Composition of Transformations

Of course, we can combine multiple translations, reflections and rotations to
create more complex transformations.

{.todo} TODO Example

However, as it turns out, it doesn’t matter how many different transformations
you combine: you can always find another transformation that does the same in
one go!

{.todo} TODO Transformation composition calculator

Combining two reflections is particularly interesting. There are two different
cases we need to consider:

::: column.grow
If the two lines of reflection are parallel, the result is a single translation.
The direction of the translation is perpendicular to the lines of reflection,
and the distance is twice the distance between the lines of reflection.

{.todo} TODO Animation
::: column.grow
If the two lines of reflection intersect, the result is a single rotation. The
center of rotation is the intersection between the lines of reflection, and the
angle is twice the angle between the lines of reflection.

{.todo} TODO Animation
:::

---

## Symmetry

> id: symmetry
> goals: play-0 play-1
> section: symmetry

[__Symmetry__](gloss:symmetry) is everywhere around us, and an intuitive
concept: different parts of an object look _the same_ in some way. But using
transformations, we can give a much more precise, mathematical definition of
what symmetry _really_ means:

{.definition} An object is _symmetric_ if it looks the same, even after applying
a certain transformation.

::: column.grow

    .symmetry
      img(src="images/symmetry-1.png" width=320 height=240)
      img(src="images/symmetry-1.png" width=320 height=240)
      x-play-btn

{.text-center} We can reflect this butterfly, and it looks the same afterwards.
We say that it has __reflectional symmetry__.

::: column.grow

    .symmetry
      img(src="images/symmetry-2.jpg" width=320 height=240)
      img(src="images/symmetry-2.jpg" width=320 height=240)
      x-play-btn

{.text-center} We can rotate this flower, and it looks the same afterwards. We
say that it has __rotational symmetry__.
:::

---
> id: reflectional-symmetry

### Reflectional Symmetry

A shape has [__reflectional symmetry__](gloss:reflectional-symmetry) if it looks
the same after being reflected. The line of reflection is called the [__axis of
symmetry__](gloss:axis-of-symmetry), and it splits the shape into two
[[congruent|equal|similar]] halves. Some figures can also have more than one
axis of symmetry.

---
> id: reflectional-symmetry-1
> goals: r0 r1 r2 r3 r4 r5

Draw all axes of symmetry in these six images and shapes:

::: column(width=220)

    x-geopad.draw.reflection(width=220 height=180 grid=20 no-points)
      x-img.background(src="images/lake.jpg" width=220 height=180 alt="Lake")
      svg
        path(hidden name="line0" x="line(point(-1,4),point(11,4))")

::: column(width=220)

    x-geopad.draw.reflection(width=220 height=180 grid=20 no-points)
      x-img.background(src="images/beijing.jpg" width=220 height=180 alt="Forbidden City in Beijing")
      svg
        path(hidden name="line1" x="line(point(5,-1),point(5,9))")

::: column(width=220)

    x-geopad.draw.reflection(width=220 height=180 grid=20 no-points)
      x-img.background(src="images/blue-butterfly.jpg" width=220 height=180 alt="Butterfly")
      svg
        path(hidden name="line2" x="line(point(1,-1),point(11,9))")

::: column(width=220)

    x-geopad.draw.reflection(width=220 height=180 grid=20 no-points): svg
      path(x="polygon(point(2,2),point(5,1),point(8,2),point(9,4),point(8,6),point(5,7),point(2,6),point(1,4))" style="stroke: #363644; stroke-width: 3px; fill: rgba(255,148,31,0.4)")
      path(hidden name="line3a" x="line(point(-1,4),point(11,4))")
      path(hidden name="line3b" x="line(point(5,-1),point(5,9))")

{.caption} This shape has [[2]] axes of symmetry.
::: column(width=220)

    x-geopad.draw.reflection(width=220 height=180 grid=20 no-points): svg
      path(x="polygon(point(3,2),point(7,2),point(7,6),point(3,6))" style="stroke: #363644; stroke-width: 3px; fill: rgba(242,124,43,0.4)")
      path(hidden name="line4a" x="line(point(-1,4),point(11,4))")
      path(hidden name="line4b" x="line(point(5,-1),point(5,9))")
      path(hidden name="line4c" x="line(point(0,-1),point(10,9))")
      path(hidden name="line4d" x="line(point(10,-1),point(0,9))")

{.caption} A square has [[4]] axes of symmetry.
::: column(width=220)

    x-geopad.draw.reflection(width=220 height=180 grid=20 no-points): svg
      path(x="polygon(point(3,1),point(9,3),point(8,6),point(2,4))" style="stroke: #363644; stroke-width: 3px; fill: rgba(230,100,56,0.4)")
      path(hidden name="line5a" x="line(point(-2,1),point(13,6))")
      path(hidden name="line5b" x="line(point(7,-1),point(3,11))")

{.caption} This shape has [[2]] axes of symmetry.
:::

---
> id: alphabet

Many letters in the alphabet have reflectional symmetry. Select all the ones
that do:

    x-picker.letters
      - let c = ['#D92120', '#E6642C', '#E68E34', '#D9AD3C', '#B5BD4C', '#7FB972', '#63AD99', '#55A1B1', '#488BC2', '#4065B1', '#413B93', '#781C81']
      for l, i in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
        if 'FGJKLNPQRSZ'.indexOf(l) < 0
          .item(style=`color: ${c[i%12]}`)= l
        else
          .item(data-error="letter-not-symmetric" style=`color: ${c[i%12]}`)= l

---
> id: reflectional-symmetry-2
> goals: r0 r1 r2

Here are some more shapes. Complete them so that they have reflectional
symmetry:

::: column(width=220)

    x-geopad.draw(width=220 height=180 grid=20 no-points): svg
      path.fill.finished(hidden x="polygon(point(8,5),point(9,3),point(9,2),point(8,1),point(6,1),point(5,2),point(4,1),point(2,1),point(1,2),point(1,3),point(2,5),point(5,7))" style="fill: rgba(179,4,105,0.4)")
      path(x="polyline(point(5,2),point(4,1),point(2,1),point(1,2),point(1,3),point(2,5),point(5,7))" name="from0")
      path.red(x="line(point(5,-1),point(5,9))" name="line0")
      path(hidden x="from0.reflect(line0)" name="to0")

::: column(width=220)

    x-geopad.draw(width=220 height=180 grid=20 no-points): svg
      path.fill.finished(hidden x="polygon(point(1,5),point(1,3),point(6,3),point(4,1),point(5,0),point(9,4),point(5,8),point(4,7),point(6,5))" style="fill: rgba(154,24,130,0.4)")
      path(x="polyline(point(1,4),point(1,3),point(6,3),point(4,1),point(5,0),point(9,4))" name="from1")
      path.red(x="line(point(-1,4),point(11,4))" name="line1")
      path(hidden x="from1.reflect(line1)" name="to1")

::: column(width=220)

    x-geopad.draw(width=220 height=180 grid=20 no-points): svg
      path.fill.finished(hidden x="polygon(point(2,1),point(8,1),point(9,2),point(9,6),point(8,7),point(2,7),point(1,6),point(1,2))" style="fill: rgba(130,43,155,0.4)")
      path(x="polyline(point(5,1),point(8,1),point(9,2),point(9,4))")
      path.red(x="line(point(5,-1),point(5,9))")
      path.red(x="line(point(-1,4),point(11,4))")
      path(hidden x="polyline(point(5,1),point(2,1),point(1,2),point(1,6),point(2,7),point(8,7),point(9,6),point(9,4))" name="to2")

:::

---
> id: palindromes
> goals: p0 p1 p2

Shapes, letters and images can have reflectional symmetry, but so can entire
numbers, words and sentences!

For example “25352” and “ANNA” both read the same from back to front. Numbers
or words like this are called [__Palindromes__](gloss:palindrome). Can you think
of any other palindromes?

    form.palindromes.text-center.form-field
      input(type="text")
      span.check(when="p0")
      input(type="text")
      span.check(when="p1")
      input(type="text")
      span.check(when="p2")

---
> id: palindromes-1

If we ignore spaces and punctuation, the short sentences below also have
reflectional symmetry. Can you come up with your own?

{.text-center} Never odd or even.<br>
A [[nut]] for a jar of tuna.<br>
Yo, banana [[boy]]!

{.reveal(when="blank-0 blank-1")} But Palindromes are not just fun, they
actually have practical importance. A few years ago, scientists discovered that
parts of our [DNA](gloss:dna) are palindromic. This makes them more resilient to
mutations or damage – because there is a second backup copy of every piece.

---
> id: rotational-symmetry

### Rotational Symmetry

::: column.grow
A shape has [__rotational symmetry__](gloss:rotational-symmetry) if it looks the
same after being rotated (by an amount not equal to 360°). The [center of
rotation](gloss:center-of-rotation) is usually just the middle of the shape.

The [__order of symmetry__](gloss:order-of-symmetry) is the number of distinct
orientations in which the shape looks the same. You can also think about it as
the _number of times we can rotate the shape_, before we get back to the start.
For example, this snowflake has order [[6]].

{.reveal(when="blank-0")} The angle of each rotation is `"360°"/"order"`. In the
snowflake, this is `"360°"/6 = input(60)°`.

::: column(width=240)

    include svg/snowflake.svg

:::

    // Maybe have another alphabeth to select all letters with rotational symmetry?

---
> id: rotational-symmetry-1

Find the order and the angle of rotation, for each of these shapes:

::: column(width=220)

    img(src="images/clover.jpg" width=200 height=200)

{.caption} Order [[4]], angle [[90]]°

::: column(width=220)

    img(src="images/playing-card.jpg" width=200 height=200)

{.caption} Order [[2]], angle [[180]]°

::: column(width=220)

    img(src="images/flower.jpg" width=200 height=200)

{.caption} Order [[8]], angle [[45]]°

:::

---
> id: rotational-symmetry-2
> goals: r0 r1 r2

Now complete these shapes, so that they have rotational symmetry:

::: column(width=220)

    x-geopad.draw(width=220 height=180 grid=20 no-points): svg
      circle.red(x="point(5,4)")
      path.fill.finished(hidden x="polygon(point(5,0),point(6,3),point(9,4),point(6,5),point(5,8),point(4,5),point(1,4),point(4,3))" style="fill: rgba(56,102,230,0.4)")
      path(x="polyline(point(5,0),point(6,3),point(9,4))")
      path.red(x="segment(point(5,-1),point(5,4))")
      path.red(x="segment(point(5,4),point(11,4))")
      path(hidden x="polyline(point(9,4),point(6,5),point(5,8),point(4,5),point(1,4),point(4,3),point(5,0))" name="to0")

{.caption} Order 4
::: column(width=220)

    x-geopad.draw(width=220 height=180 grid=20 no-points): svg
      circle.red(x="point(5,4)" name="c1")
      path.fill.finished(hidden x="polygon(point(6,2),point(1,2),point(1,4),point(4,6),point(9,6),point(9,4))" style="fill: rgba(40,151,130,0.4)")
      path(x="polyline(point(5,2),point(1,2),point(1,4),point(4,6),point(5,6))" name="from1")
      path.red(x="segment(point(5,-1),point(5,9))")
      path(hidden x="from1.rotate(pi,c1)" name="to1")

{.caption} Order 2
::: column(width=220)

    x-geopad.draw(width=220 height=180 grid=20 no-points): svg
      circle.red(x="point(5,4)")
      path.fill.finished(hidden x="polygon(point(4,4),point(2,6),point(3,7),point(5,5),point(7,7),point(8,6),point(6,4),point(8,2),point(7,1),point(5,3),point(3,1),point(2,2))" style="fill: rgba(83,174,9,0.4)")
      path(x="polyline(point(5,3),point(3,1),point(2,2),point(4,4))")
      path.red(x="segment(point(5,-1),point(5,4))")
      path.red(x="segment(point(5,4),point(-1,4))")
      path(hidden x="polyline(point(4,4),point(2,6),point(3,7),point(5,5),point(7,7),point(8,6),point(6,4),point(8,2),point(7,1),point(5,3))" name="to2")

{.caption} Order 4
:::

---

## Symmetry Groups and Wallpapers

> id: groups
> section: symmetry-groups

    // HINT: To recognise different configurations, we need to highlight the
    // four corners in different colours.

Some shapes have more than one symmetry – let’s have a look at the
[square](gloss:square) as a simple example.

::: column(width=400 parent="padded-thin")

    .cubes
      img.cube.reveal(src="images/cube-0.svg" width=80 height=80 when="blank-1 blank-2 blank-3" delay=1000 animation="pop")
      img.cube.reveal(src="images/cube-1.svg" width=80 height=80 when="blank-1" animation="pop")
      img.cube.reveal(src="images/cube-2.svg" width=80 height=80 when="blank-2" animation="pop")
      img.cube.reveal(src="images/cube-3.svg" width=80 height=80 when="blank-3" animation="pop")
      img.cube.reveal(src="images/cube-4.svg" width=80 height=80 when="blank-0" animation="pop")
      img.cube.reveal(src="images/cube-5.svg" width=80 height=80 when="blank-0" delay=200 animation="pop")
      img.cube.reveal(src="images/cube-6.svg" width=80 height=80 when="blank-0" delay=400 animation="pop")
      img.cube.reveal(src="images/cube-7.svg" width=80 height=80 when="blank-0" delay=600 animation="pop")

::: column.grow(width=200)
You have already shown above that a square has [[4]] axes of reflection.

{.reveal(when="blank-0")} It also has rotational symmetry by [[90]]°,
[[180]]° and [[270]]°.

{.reveal(when="blank-1 blank-2 blank-3")} And finally, we can think
about “doing nothing” as another special kind of symmetry – because the result
is (obviously) the same as before. This is sometimes called the __identity__.

{.reveal(when="blank-1 blank-2 blank-3" delay=1000)} In total, we have found [[8]]
different “symmetries of the square”.
:::

---
> id: add-symmetries
> goals: sum-0 sum-1

Now we can actually start doing some arithmetic with these symmetries. For
example, we can _add_ two symmetries to get new ones:

::: column(width=260)

    .text-center
      img.cube(src="images/cube-1.svg" width=54 height=54)
      mo +
      img.cube(src="images/cube-1.svg" width=54 height=54)
      mo =
      span.sym-sum.pending(tabindex=0): img.cube(src="images/cube-2.svg" width=54 height=54)
    x-gesture(target=".sym-sum")

::: column(width=260)

    .text-center
      img.cube(src="images/cube-2.svg" width=54 height=54)
      mo +
      img.cube(src="images/cube-6.svg" width=54 height=54)
      mo =
      span.sym-sum.pending(tabindex=0): img.cube.ani-sym(src="images/cube-4.svg" width=54 height=54)

:::

---
> id: calculator
> title: Symmetry Calculator
> goals: calculate

Whenever you add two symmetries of a square, you get a new one. Here is a
“symmetry calculator” where you can try it yourself:

    .calculator
      .display
        .operator +
        .operator =
        .clear ×
      .button(tabindex=0) + #[img.cube(src="images/cube-0.svg" width=40 height=40)]
      .button(tabindex=0) + #[img.cube(src="images/cube-1.svg" width=40 height=40)]
      .button(tabindex=0) + #[img.cube(src="images/cube-2.svg" width=40 height=40)]
      .button(tabindex=0) + #[img.cube(src="images/cube-3.svg" width=40 height=40)]
      .button(tabindex=0) + #[img.cube(src="images/cube-4.svg" width=40 height=40)]
      .button(tabindex=0) + #[img.cube(src="images/cube-5.svg" width=40 height=40)]
      .button(tabindex=0) + #[img.cube(src="images/cube-6.svg" width=40 height=40)]
      .button(tabindex=0) + #[img.cube(src="images/cube-7.svg" width=40 height=40)]

---
> id: symmetry-arithmetic

Spend some time playing around with the symmetry calculator, and try to find any
patterns. Can you complete these observations?

* Adding two rotations will always give [[a rotation|a reflection]] (or the identity).
* Adding two reflections will always give [[a rotation|a reflection]] (or the identity).
* Adding the same two symmetries in the opposite order
  [[sometimes gives a different|always gives a different|always gives the same]] result.
* Adding the identity [[doesn’t do anything|returns a reflection|returns the opposite]].

---
> id: group-axioms

You might have realised already that adding __{.m-orange}symmetries__ is actually
very similar to adding __{.m-green}integers__:

    ol.proof

      li.r
        | Adding two #[strong.m-orange symmetries]/#[strong.m-green integers] always gives another #[strong.m-orange symmetry]/#[strong.m-green integer]:
        .text-center.axiom
          img.cube(src="images/cube-2.svg" width=32 height=32)
          mo +
          img.cube(src="images/cube-6.svg" width=32 height=32)
          mo(value="=") =
          img.cube(src="images/cube-4.svg" width=32 height=32)
        .text-center.axiom
          mn 12
          mo +
          mn 7
          mo =
          mn 19
        .next-step Continue

      li.r.reveal(when="next-0")
        span.md Adding #[strong.m-orange symmetries]/#[strong.m-green integers] is [associative](gloss:associative):
        .text-center.axiom
          mfenced
            img.cube(src="images/cube-1.svg" width=32 height=32)
            mo +
            img.cube(src="images/cube-4.svg" width=32 height=32)
          mo +
          img.cube(src="images/cube-3.svg" width=32 height=32)
          mo(value="=") =
          img.cube(src="images/cube-1.svg" width=32 height=32)
          mo +
          mfenced
            img.cube(src="images/cube-4.svg" width=32 height=32)
            mo +
            img.cube(src="images/cube-3.svg" width=32 height=32)
        .text-center.axiom
          mfenced #[mn 4]#[mo +]#[mn 2]
          mo +
          mn 5
          mo =
          mn 4
          mo +
          mfenced #[mn 2]#[mo +]#[mn 5]
        .next-step Continue

      li.r.reveal(when="next-1")
        | Every #[strong.m-orange symmetry]/#[strong.m-green integer] has an #[strong inverse], another #[strong.m-orange symmetry]/#[strong.m-green integer] which, when added, gives the identity:
        .text-center.axiom
          img.cube(src="images/cube-1.svg" width=32 height=32)
          mo +
          img.cube(src="images/cube-3.svg" width=32 height=32)
          mo(value="=") =
          img.cube(src="images/cube-0.svg" width=32 height=32)
        .text-center.axiom
          mn 4
          mo +
          mn –4
          mo(value="=") =
          mn 0
        .next-step Continue

---
> id: groups-1

In mathematics, any collection that has these properties is called a
[__group__](gloss:group). Some groups (like the __{.m-orange}symmetries__ of a
square) only have a finite number of elements. Others (like the
__{.m-green}integers__) are infinite.

In this example, we started with the eight symmetries of the square. In fact,
every geometric shape has its own __symmetry group__. They all have different
elements, but they always satisfy the three rules above.

Groups appear everywhere in mathematics. The elements can be numbers or
symmetries, but also polynomials, permutations, matrices, functions … _anything_
that obeys the three rules. The key idea of _group theory_ is that we are not
interested in the individual elements, just in _how they interact with each
other_.

::: column.grow
For example, the symmetry groups of different molecules can help scientists
predict and explain the properties of the corresponding materials.

Groups can also be used to analyse the winning strategy in board games, the
behaviour of viruses in medicine, different harmonies in music, and many other
concepts…
::: column(width=340)

    img(src="images/molecule.jpg" width=160 height=160 style="margin-right: 20px")
    img(src="images/virus.jpg" width=160 height=160)

{.caption} The properties of the CCl<sub>4</sub> molecule (left) and the
Adenovirus (right) are determined by their symmetries.
:::

---

### Wallpaper Groups

> id: wallpaper-groups

In the [previous sections](/course/transformations/symmetry) we saw two
different kinds of symmetry corresponding to two different transformations:
rotations and reflections. But there is also a symmetry for the third kind of
rigid transformation: [[translations|spins|flips]].

---
> id: wallpaper-groups-1
> goals: play-0 play-1

[__Translational symmetry__](gloss:translational-symmetry) does not work for
isolated objects like flowers or butterflies, but it does for regular patterns
that extend into every direction:

::: column.grow

    .symmetry(style="width: 320px; height: 240px;")
      img(src="images/honeycomb.jpg" width=376 height=276 style="margin: 0 0 -36px -56px; max-width: none;")
      img(src="images/honeycomb.jpg" width=376 height=276 style="margin: 0 0 -36px -56px; max-width: none;")
      x-play-btn

{.caption} Hexagonal honyecomb
::: column.grow

    .symmetry(style="width: 320px; height: 240px;")
      img(src="images/tiling.jpg" width=376 height=240 style="margin-left: -56px; max-width: none;")
      img(src="images/tiling.jpg" width=376 height=240 style="margin-left: -56px; max-width: none;")
      x-play-btn

{.caption} Ceramic wall tiling
:::

---
> id: footsteps

In addition to reflectional, rotational and translational symmetry, there even
is a fourth kind: [__glide reflections__](gloss:glide-reflection). This is a
combination of a reflection and a translation in the same direction as the axis
of reflection.

    figure
      .footsteps
         img(src="images/footsteps.svg" width=650 height=120)
         img(src="images/footsteps.svg" width=650 height=120)
      x-slider(steps=100, style="max-width: 400px; margin: 24px auto")

---
> id: wallpaper-groups-2

A pattern can have more than one type of symmetry. And just like for squares,
we can find the [symmetry group](gloss:symmetry-group) of a pattern, which
contains all its different symmetries.

These groups don’t tell you much about how the pattern _looks_ like (e.g. its
colours and shapes), just how it is _repeated_. Multiple different patterns can
have the same symmetry group – as long are arranged and repeated in the same
way.

::: column.grow

    .text-center
      img(src="images/wallpaper-1.svg" width=150 height=150 style="margin: 0 10px")
      img(src="images/wallpaper-2.svg" width=150 height=150 style="margin: 0 10px")

{.caption} These two patterns have the same symmetries, even though they look
very different. But symmetries are not about colours, or superficial shapes.
::: column.grow

    .text-center
      img(src="images/wallpaper-3.svg" width=150 height=150 style="margin: 0 10px")
      img(src="images/wallpaper-4.svg" width=150 height=150 style="margin: 0 10px")

{.caption} These two patterns also have the same symmetries – even though they
look more similar to the corresponding patterns on the left, than to each other.
:::

---
> id: wallpaper-groups-3
> goals: gallery

It turns out that, while there are infinitely many possible patterns, they all
have one of just 17 different symmetry groups. These are called the __Wallpaper
Groups__. Every wallpaper group is defined by a combination of translations,
rotations, reflections and glide reflections. Can you see the [centers of
rotation](gloss:center-of-rotation) and the [axes of
reflection](gloss:axis-of-symmetry) in these examples?

    x-gallery(slide-width="320")
      div
        img(src="images/wallpapers/p1.svg" width=360, height=240)
        p.caption <strong>Group 1 – P1</strong><br>Only translations
      div
        img(src="images/wallpapers/p2.svg" width=360, height=240)
        p.caption <strong>Group 2 – P2</strong><br>Rotations of order 2, translations
      div
        img(src="images/wallpapers/p3.svg" width=360, height=240)
        p.caption <strong>Group 3 – P3</strong><br>Rotations of order 3 (120°), translations
      div
        img(src="images/wallpapers/p4.svg" width=360, height=240)
        p.caption <strong>Group 4 – P4</strong><br>Four rotations of order 2 (180°), translations
      div
        img(src="images/wallpapers/p6.svg" width=360, height=240)
        p.caption <strong>Group 5 – P6</strong><br>Rotations of order 2, 3 and 6 (60°), translations
      div
        img(src="images/wallpapers/pm.svg" width=360, height=240)
        p.caption <strong>Group 6 – PM</strong><br>Parallel axes of reflection, translations
      div
        img(src="images/wallpapers/pmm.svg" width=360, height=240)
        p.caption <strong>Group 7 – PMM</strong><br>Perpendicular reflections, rotations of order 2, translations
      div
        img(src="images/wallpapers/p4m.svg" width=360, height=240)
        p.caption <strong>Group 8 – P4M</strong><br>Rotations (ord 2 + 4), reflections, glide reflections, translations
      div
        img(src="images/wallpapers/p6m.svg" width=360, height=240)
        p.caption <strong>Group 9 – P6M</strong><br>Rotations (ord 2 + 6), reflections, glide reflections, translations
      div
        img(src="images/wallpapers/p3m1.svg" width=360, height=240)
        p.caption <strong>Group 10 – P3M1</strong><br>Rotations of order 3, reflections, glide reflections, translations
      div
        img(src="images/wallpapers/p31m.svg" width=360, height=240)
        p.caption <strong>Group 11 – P31M</strong><br>Rotations of order 3, reflections, glide reflections, translations
      div
        img(src="images/wallpapers/p4g.svg" width=360, height=240)
        p.caption <strong>Group 12 – P4G</strong><br>Rotations (ord 2 + 4), reflections, glide reflections, translations
      div
        img(src="images/wallpapers/cmm.svg" width=360, height=240)
        p.caption <strong>Group 13 – CMM</strong><br>Perpendicular reflections, rotations of order 2, translations
      div
        img(src="images/wallpapers/pmg.svg" width=360, height=240)
        p.caption <strong>Group 14 – PMG</strong><br>Reflections, glide reflections, rotations of order 2, translations
      div
        img(src="images/wallpapers/pg.svg" width=360, height=240)
        p.caption <strong>Group 15 – PG</strong><br>Parallel glide reflections, translations
      div
        img(src="images/wallpapers/cm.svg" width=360, height=240)
        p.caption <strong>Group 16 – CM</strong><br>Reflections, glide reflections, translations
      div
        img(src="images/wallpapers/pgg.svg" width=360, height=240)
        p.caption <strong>Group 17 – PGG</strong><br>Perpendicular glide reflections, rotations of order 2, translations

---
> id: drawing
> title: Drawing Wallpaper Symmetries
> goals: draw-1 draw-2 switch

Unfortunately there is no simple reason why there are _17_ of these groups, and proving it requires
more advanced mathematics. Instead, you can try drawing your own repeated patterns for each of the
17 wallpaper groups:

    figure: x-wallpaper
    .other-students.reveal(when="draw-1 switch")
      h4 Examples of other students’ drawings
      .row.padded-thin
        div(style="width: 224px"): img(src="images/user/wallpaper-1.png" width=240 height=160)
        div(style="width: 224px"): img(src="images/user/wallpaper-2.png" width=240 height=160)
        div(style="width: 224px"): img(src="images/user/wallpaper-3.png" width=240 height=160)

---
> id: crystallographic-groups

::: column.grow
The wallpaper groups were all about flat, two-dimensional patterns. We can do
something similar for three-dimensional patterns: these are called
crystallographic groups, and there are 219 of them!

In addition to translations, reflections, rotations, and glide reflections,
these groups include symmetries like __glide planes__ and __screw axes__ (think
about the motion when unscrewing a bottle).
::: column(width=300)

    img(src="images/crystal.jpg" width=300 height=240)

{.caption} Boron-Nitride has its molecules arranged in this crystal lattice,
which has a three-dimensional symmetry group.
:::

---

## Symmetry in Physics

> id: planets
> sectionBackground: dark stars
> section: physics

So far, all the symmetries we looked at were _visual_ in some sense: visible
shapes, images or patterns. In fact, symmetry can be a much wider concept:
_immunity to change_.

For example, if you like apple juice just as much as you like orange juice, then
your preference is “symmetric” under the transformation that swaps apples and
oranges.

In 1915, the German mathematician [Emmy Noether](bio:noether) observed that
something similar is true for the [laws of nature](gloss:laws-of-nature).

::: column.grow
For example, our experience tells us that the laws of Physics are the same
everywhere in the universe. It doesn’t matter if you conduct an experiment in
London, or in New York, or on Mars – the laws of Physics should always be the
same. In a way, they have [[translational symmetry|reflectional symmetry]].

{.reveal(when="blank-0")} Similarly, it shouldn’t matter if we conduct an
experiment while facing North, or South, or East or West: the laws of nature
have [[rotational symmetry|glide reflection symmetry]].

{.reveal(when="blank-1")} And finally, it shouldn’t matter if we conduct an
experiment today, or tomorrow, or in a year. The laws of nature are
“time-symmetric”.
::: column(width=300)

    include svg/planets.svg

:::

---
> id: planets-1

These “symmetries” might initially seem quite meaningless, but they can actually
tell us a lot about our universe. Emmy Noether managed to prove that every
symmetry corresponds to a certain physical quantity that is _conserved_.

For example, time-symmetry implies that __Energy__ must be conserved in our
universe: you can convert energy from one type to another (e.g. light to electricity), but you can never create or destroy energy. The total amount of energy in the universe will always stay constant.

    figure
      x-img(src="images/cern.jpg" width=760 height=400 credit="© CERN" alt="Large Hadron Collider in CERN")
      p.caption CERN is the world’s largest particle accelerator. Scientists smash together fundamental particles at enormous speeds, to learn more about their properties. Can you see the person at the bottom, for size comparison?

::: column(width=220)

    x-img(src="images/higgs.png" width=220 height=150 alt="Particle Fragments")
    p.caption The paths taken by particle fragments after a collision

::: column.grow
It turns out that, just by knowing about symmetry, physicists can derive most
laws of nature that govern our universe – without ever having to do an
experiment or observation.

Symmetry can even predict the existence of fundamental particles. One example is
the famous __Higgs Boson__: it was predicted in the 1960s by theoretical
physicists, but not observed in the real world until 2012.
:::

---

## Dilations

> id: dilations
> section: dilations

So far, we have just looked at [[rigid|congruent|visual]] transformations.
_{span.reveal(when="blank-0")} Now let’s think about one that is not: a
[__dilation__](gloss:dilation) changes a shape’s size by making it larger or
smaller._

---
> id: dilations-1

::: column.grow

All dilations have a [__center__](target:center) and a [__scale factor__](->.scale-target).
The center is the point of reference for the dilation and scale factor tells us
how much the figure stretches or shrinks.

If the [scale factor](gloss:scale-factor) is between 0 and 1, the image is
[[smaller|larger]] than the original. If the scale factor is larger than 1, the
image is [[larger|smaller]] than the original.

::: column(width=300)

    x-geopad(width=300 height=240): svg
      circle.move(name="C" cx=40 cy=35 target="center")

      circle(hidden name="a" x="point(140,55)")
      circle(hidden name="b" x="point(160,115)")
      circle(hidden name="c" x="point(60,130)")

      circle(hidden name="a1" x="a.subtract(C).scale(s).add(C)")
      circle(hidden name="b1" x="b.subtract(C).scale(s).add(C)")
      circle(hidden name="c1" x="c.subtract(C).scale(s).add(C)")

      path.fill.green(x="polygon(a,b,c)" label="A" label-class="white")
      path.fill.blue(x="polygon(a1,b1,c1)" label="A’" label-class="white")

      path.light.thin(x="segment(C,s<1?a:a1)")
      path.light.thin(x="segment(C,s<1?b:b1)")
      path.light.thin(x="segment(C,s<1?c:c1)")

{.text-center.scale-target} Scale factor: ${s}{s|2|0,3,0.1}
:::

{.todo} COMING SOON – More on Dilations

    // Here is how we can construct the dilation of a geometric shape:
    //
    // ::: column(width=300)
    // {.todo} COMING SOON – Animation
    // ::: column.grow
    // First we draw rays from the center of dilation to every point in the shape.
    //
    // Now let’s measure the distance of all these points from the center of dilation.
    // Then we can multiply the distance by the scale factor, and the measure the
    // image of the point along the same ray.
    //
    // All that’s left is to connect the transformed points in the image … all done!
    // :::

---

## Similarity

> section: similarity
> sectionStatus: dev
> id: similarity

::: column.grow
For rigid transformations, the image is always [[congruent|larger|smaller]] to
the original – but this is [[no longer|still]] true for dilations. Instead, we
say that two shapes are [__similar__](gloss:similar). They have the same overall
shape, but not necessarily the same size.

The symbol for similarity is `∼` (similar to the symbol for congruence, which
was `≅`). In this example, we would write `A ∼ A'`.

::: column(width=240)
{.todo} COMING SOON – Illustration
:::

---
> id: perspective

### Perspective Drawings

You might have noticed that these dilations with the connecting rays almost look
like __perspective drawings__. The center of dilation is called the __vanishing
point__, because it looks like this is where everything is “vanishing in the
distance”.

Find the vanishing point in the figure below:

{.todo} COMING SOON – Interactive

Now can you draw another house that matches the existing ones?

---
> id: similar-polygons

### Similar Polygons

Similarity can tell us a lot about shapes. For example, [circles](gloss:circle),
[squares](gloss:square) and [equilateral triangles](gloss:equilateral-triangle)
are [[always|sometimes|never]] similar. They might have different sizes, but
always the same general shape.

::: column.grow
The two quadrilaterals on the right are similar. Our first important observation
is that in similar polygons, all the matching pairs of angles are
[congruent](gloss:congruent-angles). This means that

{.text-center} [_{.m-red}∡ABC_ ≅ _{.m-red}∡A'B'C'_](target:a)_{.space}_
[_{.m-blue}∡BCD_ ≅ _{.m-blue}∡B'C'D'_](target:b)
[_{.m-green}∡CDE_ ≅ _{.m-green}∡C'D'E'_](target:c)_{.space}_
[_{.m-yellow}∡DEA_ ≅ _{.m-yellow}∡D'E'A'_](target:d)

The second important fact is that in similar polygons, all sides are scaled
__proportionally__ by the scale factor of the corresponding dilation. If the
scale factor is ${k}{k|1.5|0.5,2,0.1}, then

{.text-center} `abs(AB) ×` ${k} `= abs(A'B')`_{.space}_`abs(BC) ×` ${k} `= abs(B'C')`
`abs(CD) ×` ${k} `= abs(C'D')`_{.space}_`abs(DE) ×` ${k} `= abs(D'E')`

We can instead rearrange these equations and eliminate the scale factor
entirely:

{.text-center} `abs(AB)/abs(A'B') = abs(BC)/abs(B'C') = abs(AB)/abs(A'B') = abs(AB)/abs(A'B')`

    // This proportional relationship is true not just for the sides of the
    // polygon, but also for properties like diagonals.

We can use this to solve real life problems that involve similar polygons – for
example finding the length of missing sides, if we know some of the other sides.
In the following section you will see a few examples.
::: column(width=240)

    x-geopad.sticky(width=240 height=360): svg
      - var x = ['a', 'b', 'c', 'd']
      - var initial = {a:[50,70], b:[160,50], c:[200,110], d:[150,160]}
      - var next = {a:'b', b:'c', c:'d', d:'a'}
      - var prev = {a:'d', b:'a', c:'b', d:'c'}
      - var classes = {a:'red', b:'blue', c:'green', d:'yellow'}
      each l in x
        circle(name=l x=`point(${initial[l][0]},${initial[l][1]})` r=4 target=l)
        path(x=`angle(${prev[l]},${l},${next[l]})` target=l class=classes[l])
        path(x=`segment(${l},${next[l]})` target=`${l} ${next[l]}`)
        circle(name=l+'1' r=4 x=`${l}.subtract({x:120,y:90}).scale(k).rotate(3).add({x:120,y:270})` target=l)
        path(x=`angle(${prev[l]}1,${l}1,${next[l]}1)` target=l class=classes[l])
        path(x=`segment(${l}1,${next[l]}1)` target=`${l} ${next[l]}`)
:::

---
> id: similar-triangles

### Similar Triangles

The concept of similarity is particularly powerful with triangles. We already
know that the corresponding internal angles in similar polygons are equal.

For triangles, the opposite is also true: this means that if you have two
triangles with the same three angle sizes, then the triangles must be similar.

And it gets even better! We know that the internal angles in a triangle always
add up to [[180]]°. This means that if we know two angles in a triangle, we can
always work out the third one.

For similarity, this means that we also just need to check _two angles_ to
determine if triangles are similar. If two triangles have two angles of the same
size, then the third angle must also be the same in both.

This result is sometimes called the [__AA Similarity Condition__](gloss:triangle-aa)
for triangles. (The two _As_ stand for the two _angles_ we compare.)

::: .theorem
If two angles in one triangle are congruent to two angles in another triangle,
the two triangles are similar.
:::

---
> id: similar-triangles-1

Let’s have a look at a few examples where this is useful:

::: column(width=320)
{.todo} COMING SOON – Animation

::: column.grow
Here you can see the image of a large lighthouse. Together with a friend, you
want to measure the height of the lighthouse, but unfortunately we cannot climb
to the top.

It turns out that, very well hidden, the diagram contains two similar triangles:
one is formed by the lighthouse and its shadow, and one is formed by your friend
and her shadow.

Both triangles have one right angle at the bottom. The sun rays are parallel,
which means that the other two angles at the bottom are corresponding angles,
and also equal. By the AA condition for triangles, these two must be similar.

We can easily measure the length of the shadows, and we also know the height of
your friend. Now we can use the proportionality of sides in similar triangles
to find the height of the lighthouse:

{.todo} COMING SOON – Equation

Therefore the lighthouse is 1.5m tall.
:::

---
> id: similar-triangles-2

::: column(width=320)
{.todo} COMING SOON – Animation
::: column.grow
We can use the same technique to measure distances on the ground. Here we want
to find the width of a large river. There is a big tree on one side of the
river, and I’ve got a stick that is one meter long.

Try drawing another two similar triangles in this diagram.

You can mark the point along the side of the river, that lies directly on the
line of sight from the end of the stick to the tree. Then we can measure the
distances to the stick, and to the point directly opposite the tree.

Once again, these two triangles are similar because of the AA condition. They
both have a right angle, and on pair of opposite angles.

According to the proportionality rule, this means that

{.todo} COMING SOON – Equation

Therefore the width of the river is 45 meters.
:::

---

### Similarity on Rays

Theorem: If a ray bisects an angle of a triangle, then it divides the
opposite side into segments that are proportional to the lengths of the
other two sides.

We can extend this theorem to a situation outside of triangles where we
have multiple parallel lines cut by transverals.

Theorem: If three or more parallel lines are cut by two transversals, then they
divide the transversals proportionally.

Think about a midsegment of a triangle. A midsegment is parallel to one side of
a triangle and divides the other two sides into congruent halves. The midsegment
divides those two sides proportionally.

Triangle Proportionality Theorem: If a line parallel to one side of a triangle
intersects the other two sides, then it divides those sides proportionally.

Triangle Proportionality Theorem Converse: If a line divides two sides of a
triangle proportionally, then it is parallel to the third side.

---

### Self Similarity

There are some curious mathematical shapes that are similar to a smaller part
_of themselves_. An example is the __Sierpinksi Triangle__: the entire triangle
is similar to any one of the smaller triangles it consists on. You could zoom
in and infinitely many smaller and smaller triangles.

Shapes with this property are called __Fractals__. They have some surprising
and truly XXX properties, which you will learn about more in the future.

---

Triangles are not just useful for measuring distances. In the next course we
will learn a lot more about triangles and their properties.

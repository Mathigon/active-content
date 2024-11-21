# Teoría del caos

## Introducción

> sección: introducción id: péndulo objetivos: juego color: "# 009EA6" nivel: avanzado

A principios del siglo XVIII, físicos como [Isaac Newton](bio:newton) pensaban que el universo era una gigantesca máquina de relojería. Si tuviera información precisa sobre cada objeto en este momento, podría usar las leyes de la física para predecir lo que sucedería en el futuro.

::: columna (ancho = 320)

```
x-geopad.sticky.simulation(width=320 height=320)
  canvas(width=640 height=640)
  svg
    circle(x="point(160,160)" name="c")
    circle.move.red(name="p")
    path.thick.red(x="segment(c,p)")
  x-play-toggle
```

::: column.grow

Un gran ejemplo es el péndulo. Ya has visto cómo puedes usar ecuaciones diferenciales para encontrar una ecuación que calcule la posición del péndulo en cualquier momento en el futuro.

A menudo decimos que el movimiento del péndulo es **determinista** : sigue con precisión las leyes de la gravedad de Newton y no hay aleatoriedad ni probabilidad. ¡Observa cómo se balancea el péndulo y trata de predecir lo que hará a continuación!

:::

---

> id: goles de doble péndulo: play1 play2

::: columna (ancho = 320)

```
x-geopad.sticky.simulation(width=320 height=320)
  canvas(width=640 height=640)
  svg
    circle(x="point(160,160)" name="c")
    path.thick.yellow(x="polyline(c,a1,a2)" style="stroke-width: 7px; display: none")
    path.thick.green(x="polyline(c,b1,b2)" style="stroke-width: 6px; display: none")
    path.thick.blue(x="polyline(c,c1,c2)" style="stroke-width: 5px; display: none")
    circle.move.red(name="d1")
    circle.move.red(name="d2")
    path.thick.red(x="polyline(c,d1,d2)")
  x-play-toggle
```

::: column.grow

Ahora intentemos hacer las cosas un poco más interesantes colocando un segundo péndulo al primero; esto se llama **péndulo doble** .

Una vez más, observe su movimiento e intente predecir lo que hará a continuación. Incluso puedes cerrar los ojos durante unos segundos ... ¿fue correcta tu predicción?

{.reveal (when = "play1")} El péndulo doble todavía sigue las leyes deterministas de la gravedad de Newton, pero el movimiento parece [[ser completamente irregular | comportarse como si no hubiera gravedad | siempre repetirse]].

{.reveal (when = "blank-0")} Esto se vuelve cada vez más evidente si miramos varios péndulos. Agreguemos tres péndulos más detrás del primero, cada uno con un cambio diminuto e imperceptible en su ángulo inicial (menos de 0.1 °). ¡Presiona play de nuevo y mira lo que sucede!

{.reveal (when = "play2")} Al principio, los cuatro péndulos se mueven por el mismo camino, pero después de unos segundos se [[separan | se unen | alternan]] *{span.reveal (when = "blank-1 ")} y terminan tomando caminos completamente diferentes.*

:::

---

> id: doble-péndulo-1

Los matemáticos llaman [**caótico a**](gloss:chaos) este comportamiento: incluso si conoce las leyes físicas del sistema, es imposible predecir lo que podría suceder en el futuro. Los pequeños cambios en las condiciones iniciales se amplifican rápidamente y conducen a un movimiento completamente diferente.

Es importante darse cuenta de que el *caos* es muy diferente de la *aleatoriedad* . El péndulo doble no contiene ningún elemento de azar o probabilidad. Sigue las leyes precisas y deterministas de la gravedad y, sin embargo, se mueve de manera completamente impredecible.

{.r} El caos aparece en muchos lugares inesperados en la naturaleza y las matemáticas. En este curso, exploraremos algunos de estos ejemplos y descubriremos cómo las matemáticas pueden ayudarnos a comprenderlos. [Continuar](btn:next)

---

> id: mariposa

### El efecto mariposa

::: column.grow

En 1962, el matemático [Edward Lorenz](bio:lorenz) trabajaba en el MIT, donde estaba desarrollando simulaciones por computadora de la atmósfera para predecir el clima.

Lorenz había desarrollado un algoritmo que tomaba como entradas los datos meteorológicos actuales, como la temperatura, la humedad y la velocidad del viento. Luego calculó cómo estos valores cambiarían unos minutos en el futuro. Al repetir el proceso una y otra vez, pudo predecir los días climáticos, o incluso semanas en el futuro.

::: columna (ancho = 320)

```
x-img(src="images/lgp30.jpg" width=320 height=280 alt="Computer used by Edward Lorenz")
```

{.caption} Edward Lorenz usó una LGP-30, una de las primeras computadoras listas para usar.

:::

Un día, Lorenz decidió ejecutar partes de su simulación por segunda vez, con los mismos datos de entrada. Para su sorpresa, las predicciones meteorológicas creadas en ambos casos fueron completamente diferentes.

{.r} Al principio, Lorenz pensó que debía haber un error en el código, pero rápidamente se dio cuenta de lo que estaba pasando en realidad. Al ejecutar la simulación por segunda vez, había redondeado algunos de los valores de entrada a menos decimales (por ejemplo, 0,506 en lugar de 0,506127). Aunque la diferencia es pequeña, menos del 0,1%, parece haber sido suficiente para que la simulación hiciera pronósticos completamente diferentes. [Continuar](btn:next)

---

> id: butterfly-1 goles: flap

::: columna (ancho = 280)

```
.r
  x-water-canvas(width=280 height=380 src="images/america.jpg")
  .butterfly
  .tornado
x-gesture(target=".butterfly")
```

::: column.grow

Lorenz llamó a esto el **efecto mariposa** : incluso el batir de las alas de una mariposa en Brasil podría cambiar las condiciones climáticas lo suficiente como para desencadenar un tornado en Texas, en algún momento en el futuro.

Por lo general, esperaría que un pequeño cambio en los parámetros de entrada también conduzca a un pequeño cambio en la salida. Para los sistemas caóticos, como el clima o el péndulo doble, ocurre lo contrario. Incluso los cambios más pequeños pueden crecer rápidamente y dar lugar a grandes diferencias.

Es por eso que la predicción del tiempo solo funciona durante unos días en el futuro. Después de eso, los datos meteorológicos ligeramente inexactos pueden llevar a pronósticos completamente diferentes.

:::

---

> id: mariposa-2 goles: video

Existe una diferencia importante entre *conocer las leyes físicas* de un sistema y poder *predecir su comportamiento* . Las leyes de la gravedad de Newton nos dicen exactamente cómo debe moverse el péndulo doble. Las ecuaciones diferenciales de la dinámica de fluidos deberían, en principio, permitirnos calcular el clima en cualquier momento en el futuro.

Desafortunadamente, para que esto funcione en la práctica, tendríamos que medir el estado inicial del péndulo con precisión infinita, o conocer la posición exacta de cada partícula en la atmósfera, y eso es claramente imposible. Con el tiempo, pequeños errores de medición desecharán por completo nuestras predicciones. En otras palabras, ¡ *nunca* podremos tener una previsión meteorológica perfecta!

::: figura

```
x-video(src="https://static.mathigon.org/videos/weather.mp4" poster="images/weather.jpg" width=640 height=360 controls credit="© NASA")
// source: https://svs.gsfc.nasa.gov/12163
```

{.caption} La NASA utiliza satélites, aviones y miles de estaciones meteorológicas terrestres para tomar "instantáneas" de la atmósfera: midiendo indicadores importantes como la velocidad del viento, la lluvia, la humedad, la presión del aire y las corrientes oceánicas.

:::

```
//- TODO Ensemble forecasting, spagetti plots for weather
```

---

> id: dominó goles: video

Por supuesto, una mariposa en realidad no *causa* un tornado, pero podría cambiar las condiciones de la atmósfera lo suficiente como para que ocurra un tornado *ahora* y no en otro momento en el futuro.

Podrías pensar en ello como una serie de fichas de dominó de tamaño creciente. Una pequeña acción que derriba el primer dominó más tarde conduce a la caída del dominó más grande:

::: figura

```
x-video(src="images/dominoes.mp4" poster="images/dominoes.jpg" width=480 height=270 controls credit="© Gerrydomino, YouTube")
```

{.caption} La caída de dominó más grande del mundo.

:::

---

> id: aplicaciones objetivos: video

### Más aplicaciones

Ya has visto que el doble péndulo y el clima se comportan de manera caótica, pero hay innumerables otros ejemplos en la naturaleza y la tecnología:

::: columna (ancho = 200)

```
x-video(src="images/reaction.mp4" poster="images/reaction.jpg" width=200 height=200 credit="© Tim Kench, YouTube")
// source: https://www.youtube.com/watch?v=PpyKSRo8Iec
```

{.caption} La **reacción de Belousov-Zhabotinsky** ocurre cuando se mezcla *bromato* con un ácido. (Mostrado a 20x de velocidad, © Tim Kench)

::: columna (ancho = 200)

```
x-img(lightbox src="images/finance.jpg" width=200 height=200 alt="Stock Market Charts")
```

{.caption} Los **mercados de valores** , la inflación y otras partes de la economía son caóticos, lo que los hace muy difíciles de predecir.

::: columna (ancho = 200)

```
x-img(lightbox src="images/heart.jpg" width=200 height=200 alt="Heart")
```

{.caption} Los científicos esperan que explicar el origen de los **latidos cardíacos** caóticos ( *fibrilación ventricular* ) pueda conducir a una cura.

```
// Often life threatening abnomal heartbeat after a heart attack. Maybe
// chaos can predict this and help design better pacemakers.

// The main benefit to having a chaotic heart is that tiny variations in the
// way those millions of cells contract serves to distribute the load more
// evenly, reducing wear and tear on your heart and allowing it to pump
// decades longer than would otherwise be possible.
```

::: columna (ancho = 200)

```
x-img(lightbox src="images/city.jpg" width=200 height=200)
```

{.caption} **La dinámica de la población a** menudo es caótica, desde el número de seres humanos en una ciudad hasta las poblaciones de roedores, peces o insectos.

::: columna (ancho = 200)

```
x-img(lightbox src="images/stars.jpg" width=200 height=200 credit="Hubble/ESO")
```

{.caption} **Las estrellas variables** pulsan al alterar su brillo con el tiempo. Algunas de estas estrellas pulsan en un patrón caótico.

```
// https://en.wikipedia.org/wiki/Stellar_pulsation
```

::: columna (ancho = 200)

```
x-img(lightbox src="images/code.jpg" width=200 height=200)
```

{.caption} Las computadoras pueden usar sistemas caóticos para generar **números pseudoaleatorios** o para encriptar imágenes de manera segura.

:::

---

> id: applications-1

También se ha encontrado comportamiento caótico en circuitos electrónicos, biología evolutiva y grifos de agua que gotean, y los científicos de todo el mundo están investigando muchas otras aplicaciones.

```
// https://en.wikipedia.org/wiki/Chua%27s_circuit
// https://www.quantamagazine.org/can-scientists-predict-the-future-of-evolution-20140717/
```

Pero en todos estos ejemplos, la existencia del caos significa que existen límites fundamentales para lo bien que podemos predecir el futuro. Esto a menudo se denomina **horizonte de predicción** , más allá del cual es imposible realizar pronósticos precisos.

::: columna (ancho = 300)

```
x-img(src="images/forecast.jpg" width=300 height=280)
```

::: column.grow

Actualmente, el pronóstico del tiempo tiene un horizonte de predicción de aproximadamente una semana, e incluso con una tecnología mucho mejor en el futuro, es posible que nunca superemos las dos semanas de precisión.

{.r} En cambio, los científicos pueden usar la probabilidad para predecir *promedios* : por ejemplo, con qué frecuencia esperarían que ocurrieran ciertos eventos climáticos (como un tornado) en un año. Estos promedios pueden ser muy precisos, incluso si no sabemos *exactamente cuándo* podría ocurrir un tornado. [Continuar](btn:next)

:::

---

> id: definiciones

Resumamos las propiedades clave del *caos* que hemos descubierto hasta ahora:

::: .teorema

- Un **sistema caótico** sigue leyes precisas, [[deterministas | probabilísticas | impredecibles]], a menudo descritas por una o más ecuaciones diferenciales.
- {.reveal (when = "blank-0")} Los sistemas caóticos son muy **sensibles al cambio** . [[Pequeñas | Grandes]] diferencias iniciales se multiplican con el tiempo y pueden dar lugar a [[enormes | pequeñas | aleatorias]] diferencias en el resultado.
- {.reveal (when = "blank-1 blank-2")} El comportamiento es **impredecible** y no se repite. Incluso puede *parecer aleatorio* , pero solo porque depende de cambios imperceptibles o errores de medición.

:::

---

> id: definiciones-1

La teoría del caos nos dice que nunca podemos predecir el futuro o saber de antemano qué resultado podrían tener nuestras acciones. Esto puede ser preocupante si se considera cuánto depende en nuestro mundo de predicciones matemáticas: desde modelar el viento que fluye alrededor de aviones o rascacielos hasta evaluar el impacto del cambio climático.

---

> id: objetivos de la cultura pop: video

Por otro lado, la teoría del caos y el efecto mariposa eran ideas tan simples y poderosas, que pronto comenzaron a aparecer en libros, letras de música e incluso en películas:

::: figura

```
x-video(src="https://static.mathigon.org/videos/jurassic-park.mp4" poster="images/jurassic-park.jpg" width=480 height=270 audio controls)
```

{.caption} Extracto de la película *Jurassic Park* (© Universal Pictures, 1993)

:::

---

## Billar Matemático

> id: sección de la piscina: sección de billar Fondo: sección oscura del casino Estado: dev

Una de las propiedades más sorprendentes del caos es que puede aparecer en sistemas realmente simples. Ya has visto el péndulo doble en la sección anterior. Otro ejemplo fascinante son las mesas de billar.

- https://plus.maths.org/content/chaos-billiard-table
- https://en.wikipedia.org/wiki/Dynamical_billiards
- http://mathworld.wolfram.com/Billiards.html
- https://www.bristol.ac.uk/media-library/sites/pace/documents/corina-powerpoint%20standard.pdf
- http://mathcircle.wustl.edu/uploads/4/9/7/9/49791831/20160306-billiards-presentation.pdf
- http://people.maths.ox.ac.uk/tanner/Prospects2010/CUlcigraiTalk.pdf

{.fixme} Imagina que estás tratando de predecir el camino que tomará una bola en una mesa de billar en respuesta a un empujón. Las reglas en juego son simples: la aceleración de la pelota es igual a la fuerza aplicada dividida por su masa (esa es la segunda ley de movimiento de Newton) y cuando golpea un lado, el ángulo de reflexión es igual al ángulo de incidencia (estrictamente hablando, también es necesario incluir el efecto de la fricción, pero eso no es demasiado difícil de hacer).

{.fixme} El problema es que en el entorno de un pub promedio no se puede medir fácilmente la cantidad exacta de fuerza aplicada a la pelota, el ángulo exacto con el que golpea un costado, etc. A medida que realiza sus cálculos, esta pequeña incertidumbre inicial puede crecer como una bola de nieve, de modo que muy pronto su predicción puede volverse tan incierta que resultará inútil. Esa "sensibilidad a la ignorancia" es el sello distintivo del caos matemático.

```
figure.r
  svg(width=760 height=440 viewBox="0 0 760 440")
    rect.pool-table(x=15 y=15 width=730 height=410 rx=10 ry=10)
  x-play-toggle(style="position: absolute; top: 30px; left: 30px")
```

{.fixme} Dos mesas de billar una al lado de la otra, mueva una bola un poco

{.fixme} Aplicaciones de la vida real (semiconductores)

---

### Billar elíptico

Mueva la bola amarilla en el centro y vea dónde termina después de 100 colisiones:

```
figure: x-pool-table: svg(width=760 height=440 viewBox="0 0 760 440")
```

---

### Dispersión caótica

{.fixme} Sistema Gaspard-Rice

---

## El problema de los tres cuerpos

> sección: identificación de tres cuerpos: sección de tres cuerpos Estado: dev

Poincaré, etc.

```
figure: x-geopad.simulation.r(width=480 height=480)
  canvas(width=960 height=960)
  svg
    circle.large.move.red(name="a")
    circle.large.move.blue(name="b")
    circle.large.move.green(name="c")
    path.thin(x="segment(a, a.translate(va))" arrows="end")
    path.thin(x="segment(b, b.translate(vb))" arrows="end")
    path.thin(x="segment(c, c.translate(vc))" arrows="end")
  x-play-toggle
  button.icon-btn.restore: x-icon(name="restart")
```

{.fixme} Hay dos sistemas caóticos que nos afectan mucho. El primero es el clima. Aunque las ecuaciones meteorológicas se entienden bastante bien y las computadoras las resuelven todos los días, es imposible tener en cuenta todos los factores que influyen en el clima (recuerde la mariposa). Ningún conjunto de datos es perfecto, ni las computadoras son perfectas para resolver las ecuaciones. Los efectos de estos pequeños errores se acumulan con notable rapidez. Después de unos diez días, es esencialmente imposible pronosticar el tiempo con algún grado de precisión.

{.fixme} El caos también es clave para comprender el sistema solar. Si bien el movimiento de los planetas es muy predecible, el movimiento de muchos de los asteroides no lo es. Aunque los asteroides obedecen las leyes de Newton, es posible que tengan órbitas que se muevan erráticamente por el espacio. Se cree que un asteroide tan errático golpeó la Tierra hace 65 millones de años y acabó con los dinosaurios. Las consecuencias de un incidente similar que ocurre hoy son impensables; la naturaleza del movimiento caótico significa que tales eventos son virtualmente imposibles de predecir hasta que es demasiado tarde.

{.fixme} En 1887, el matemático francés Henri Poincaré demostró que, si bien la teoría de la gravedad de Newton podía predecir perfectamente cómo orbitarían dos cuerpos planetarios bajo su atracción mutua, agregar un tercer cuerpo a la mezcla hacía que las ecuaciones fueran insolubles. Lo mejor que podemos hacer para tres cuerpos es predecir sus movimientos momento a momento y alimentar esas predicciones en nuestras ecuaciones ... Aunque la danza de los planetas tiene un horizonte de predicción extenso, los efectos del caos no se pueden ignorar, por la intrincada interacción de los tirones gravitacionales entre los planetas tiene una gran influencia en las trayectorias de los asteroides. Mantener un ojo en los asteroides es difícil pero vale la pena, ya que estos efectos caóticos algún día pueden arrojarnos una sorpresa no deseada. Por otro lado, también pueden desviar las sorpresas externas, como alejar a los cometas de una posible colisión con la Tierra.

---

## Espacio de fase y atractores extraños

> sección: atractores sectionStatus: dev

Diagrama de fases para péndulo: https://youtu.be/MjPFHWul2J0?t=29

círculos =&gt; equilibrio

fricción espirales =&gt; atractor estable

Fox + conejo, sistemas dinámicos

Teorema de Poincaré-Bendixson (equilibrio, ciclo límite)

Campos vectoriales, equilibrio 2D =&gt; simple, determinista, 3D =&gt; ¡no!

---

Molino de agua

Medida / estadísticas / previsión de Sinaï-Ruelle-Bowen

- https://www.youtube.com/watch?v=xQ3mJxr2NAY
- https://bl.ocks.org/gcalmettes/c3363abb74fe219b283782f055b72386

{.fixme} Los matemáticos usan el concepto de un "espacio de fase" para describir los posibles comportamientos de un sistema geométricamente. El espacio de fase no es (siempre) como el espacio regular: cada ubicación en el espacio de fase corresponde a una configuración diferente del sistema. El comportamiento del sistema se puede observar colocando un punto en la ubicación que representa la configuración inicial y observando cómo ese punto se mueve a través del espacio de fase.

{.fixme} En el espacio de fase, un sistema estable se moverá predeciblemente hacia un atractor muy simple (que se verá como un solo punto en el espacio de fase si el sistema se estabiliza, o un bucle simple si el sistema alterna entre diferentes configuraciones repetidamente) . Un sistema caótico también se moverá predeciblemente hacia su atractor en el espacio de fase, pero en lugar de puntos o bucles simples, vemos aparecer "atractores extraños", formas complejas y hermosas (conocidas como fractales) que se retuercen y giran, intrincadamente detalladas en todas las escalas posibles. .

{.fixme} Otra característica de los sistemas caóticos es que pueden cambiar repentinamente de un comportamiento a otro, muy diferente, uno. Piense en cómo algunos tipos de deuda pueden convertirse repentinamente en un riesgo en lugar de un activo para los bancos. Un cambio tan repentino se conoce como transición de fase. Una forma de ver una transición de fase en acción es jugar con un toque. Enciéndalo muy lentamente y escuchará un goteo regular, goteo, goteo. Gírelo ligeramente y los goteos se volverán más frecuentes y no todos del mismo tamaño. Un poquito más, y los goteos se vuelven completamente irregulares e impredecibles: se instala el caos. Continúa, y el agua se asienta en una columna suave. Sin embargo, una vez que aumenta demasiado, el agua comienza a girar, a formar espuma y a girar en espiral: comienza la turbulencia. Al aumentar constantemente el flujo, vemos regularidad y caos, sin dejar el mundo del determinismo.

---

## El mapa logístico

> sección: sección de mapa logístico Estado: dev

- https://www.dwitter.net/d/12018
- https://geoffboeing.com/2015/03/chaos-theory-logistic-map/
- Constante de Feigenbaum
- https://www.youtube.com/watch?v=ovJcsL7vyrk
- https://www.thegreatcourses.com/courses/chaos.html

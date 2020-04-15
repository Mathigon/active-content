# Fraktallar

## Giriş

> section: introduction
> id: intro

Doğanın etrafına bakarken, aşağıdakiler gibi karmaşık bitkileri fark etmiş olabilirsiniz:

::: column.r(width=320)

    img(src="images/fern.jpg" width=320 height=240)
    img.fractal-overlay(src="images/fern-overlay.png" width=320 height=240)

{.caption} Bu __Eğreltiotu__, daha büyük olandan dallanan birçok küçük yapraktan oluşur.

::: column.r(width=320)

    img(src="images/romanesco.jpg" width=320 height=240)
    img.fractal-overlay(src="images/romanesco-overlay.png" width=320 height=240)

{.caption} Bu __Romanesco brokoli__, daha büyük olanın etrafında dönen küçük [[konilerden|cubes|spheres]] oluşur.

:::

{.reveal(when="blank-0")} Başlangıçta, bunlar son derece karmaşık şekiller gibi görünür - ancak daha yakından baktığınızda, her ikisinin de nispeten basit bir desen izlediğini fark edebilirsiniz: bitkilerin tüm [tekil kısımları](target:fractal) tamamen bitki, sadece daha küçük. Aynı desen daha küçük ölçeklerde tekrar tekrar tekrarlanır. [Devam](btn:next)

---

> id: fern

Matematikte, bu özelliğe __kendine benzerlik__ diyoruz ve buna sahip şekiller [__fraktallar__](gloss:fractal) olarak adlandırılıyor. Tüm matematiğin en güzel ve en tuhaf nesnelerinden bazıları.

Kendi fraktallarımızı oluşturmak için basit bir desenle başlamalı ve daha sonra daha küçük ölçeklerde tekrar tekrar tekrarlamalıyız.

::: column.grow

En basit örüntülerden biri [{.pill.red} çizgi segmenti](target:s1), [{.pill.blue} iki segment daha](target:s2) bir ucu dallanmış olabilir. Bu paterni tekrarlarsak, bu mavi segmentlerin her ikisinin de uçlarında iki dal daha olacaktır.

Tüm şubelerin uzunluğunu ve açısını değiştirmek için [mavi noktaları](target:dot) taşıyabilirsiniz. Ardından, aşağıdaki kaydırıcıyı](->#fern-slider) kullanarak {yin} yineleme sayısını artırın.

{.reveal(when="slider-0")} Dalların konumuna bağlı olarak, yukarıdaki [eğrelti otu](action:set(130,228,197,184)), [ağaç](action:set(160,186,200,186)) veya [iç içe beşgenler](action:set(113,235,232,238)) gibi görünen tamamen farklı desenler oluşturabilirsiniz. Başka ne bulabilirsin? [Devam](btn:next)

::: column(width=360)

    x-geopad(width=360 height=360 projections="no")
      canvas(width=720 height=720)
      svg
        circle(x="point(180,340)" name="a" hidden)
        circle(x="point(180,250)" name="b" hidden)
        circle.move.blue.pulsate(name="c1" cx=150 cy=175 target="s2 dot")
        circle.move.blue.pulsate(name="c2" cx=225 cy=220 target="s2 dot")
        path.thick.red(x="segment(a,b)" target="s1")
        path.thick.blue.rounded(x="polyline(c1,b,c2)" target="s2")
    x-slider#fern-slider(steps=8 :bind="steps")

:::

---

> id: triangle

::: column.grow(parent="right")

Bir başka ünlü fraktal [__Sierpinski üçgeni__](gloss:sierpinski-triangle). Bu durumda, büyük, eşkenar bir üçgenle başlıyoruz ve daha sonra kalan parçalardan tekrar tekrar küçük üçgenler kesiyoruz.

{.reveal(when="slider=0")} Nihai şeklin kendisinin üç özdeş kopyasından](target:x) nasıl oluştuğuna ve bunların her birinin tüm üçgenin daha da küçük kopyalarından oluştuğuna dikkat edin! Üçgene sonsuza dek yakınlaştırma yapmaya devam edebilirsiniz ve desenler ve şekiller her zaman tekrarlanmaya devam eder.

::: column(width=300)

    svg.sierpinski.var(width=300 height=265)
      path.red(:draw="triangle" :show="!steps")
      g.red.t1
        path(:draw="t1")
        path.white(:d="sierpinski(t1.points, steps-1)")
      g.red.t2
        path(:draw="t2")
        path.white(:d="sierpinski(t2.points, steps-1)")
      g.red.t3
        path(:draw="t3")
        path.white(:d="sierpinski(t3.points, steps-1)")
    x-slider(steps=8 :bind="steps")

:::

---

> id: real

Bu bölümün başındaki bitkiler _tıpkı fraktallar gibi_ 'a benziyorlar, ancak gerçek hayatta _gerçek_ fraktal oluşturmak kesinlikle mümkün değil. Aynı modeli tekrar tekrar, daha küçük ve daha küçük tekrarlarsak, sonunda bölünemeyecek olan hücrelere, moleküllere veya atomlara ulaşırdık.

Ancak, matematiği kullanarak gerçek fraktalların “sahip olacağı” özellikleri düşünebiliriz - ve bunlar çok şaşırtıcı… [Devam](btn:next)

---
> id: dimension

### Fraktal Boyutlar

::: column(width=240)

    img(src="images/line.png" width=240 height=20)

::: column.grow

İlk olarak, fraktalların boyutunu düşünelim. Bir satırın boyutu [[1]]. _{span.reveal(when="blank-0")} 2 kat ölçeklendirildiğinde uzunluğu `2^1 = 2` kat artar. Açıkçası!_

:::

---
> id: dimension-1

::: column(width=240)

    img(src="images/square.png" width=240 height=131)

::: column.grow

Bir kare [[2]] boyutuna sahiptir. _{span.reveal(when="blank-0")} 2 kat ölçeklendirildiğinde, alanı `2^2 =` [[4]] kat artmaktadır._

:::

---
> id: dimension-2

::: column(width=240)

    img(src="images/cube.png" width=240 height=157)

::: column.grow

Bir küpün [[3]] boyutu vardır. _{span.reveal(when="blank-0")} 2 kat ölçeklendirirken, hacmi `2^3 =` [[8]] kat artmaktadır._ _{span.reveal(when="blank-1")} Görüntüdeki büyük küpün daha küçük olanın 8 kopyasından oluşur!_

:::

---
> id: dimension-3

::: column(width=240)

    img(src="images/sierpinski.png" width=240 height=114 style="position:sticky;top:48px")

::: column.grow

Şimdi Sierpinski üçgenine bakalım. Bunu 2 katına çıkarırsak, "alan" ın [[3]] kat arttığını görebilirsiniz.

{.reveal(when="blank-0")} Diyelim ki _d_, Sierpinski üçgeninin boyutu. Yukarıdaki ile aynı modeli kullanarak `2^d = 3` elde ederiz. Başka bir deyişle, _d_ = [[`log_2(3)`|`log_3(2)`]] _{span.reveal(when="blank-1")} ≈ 1.585…_

:::

---
> id: dimension-4

Ama bekleyin… bir şeyin tamsayı olmayan bir boyutu nasıl olabilir? İmkansız görünüyor, ama bu fraktallerin garip özelliklerinden sadece biri. Aslında, fraktallara isimlerini veren budur: __kesirli bir boyutu__ var.

Her yinelemede, Sierpinski üçgeninin bazı alanlarını kaldırıyoruz. Bunu sonsuza kadar birçok kez yapabilseydik, aslında hiç bir alan kalmazdı: bu yüzden Sierpinski üçgeni 2 boyutlu bir alan ile 1 boyutlu bir çizgi arasında bir şey.

::: .theorem

Birçok fraktal _kendine benzer_ olmakla birlikte, daha iyi bir tanım __fraktalların__ __tamsayı olmayan bir boyuta__ sahip şekiller olduğudur.

:::

[Devam](btn:next)

---

> id: snowflake

### Koch Kar Tanesi

Doğada fraktallara benzeyen birçok şekil var. Bu bölümün başında zaten bazı bitkiler gördük. Diğer harika örnekler kar taneleri ve buz kristalleridir:

::: column(width=120 parent="padded-thin")

    x-media(src="images/snow-1.jpg" width=120 height=120)

::: column(width=120)

    x-media(src="images/snow-2.jpg" width=120 height=120)

::: column(width=120)

    x-media(src="images/snow-3.jpg" width=120 height=120)

::: column(width=120)

    x-media(src="images/snow-4.jpg" width=120 height=120)

::: column(width=120)

    x-media(src="images/snow-5.jpg" width=120 height=120)

:::

---

> id: koch

Kendi fraktal kar tanesi oluşturmak için, tekrar tekrar uygulayabileceğimiz basit bir prosedür bulmak zorundayız.

::: column.grow

Sierpinski üçgeni gibi, tek bir eşkenar üçgenle başlayalım. Bununla birlikte, her adımda _daha küçük üçgenleri _kaldırmak yerine, kenar boyunca_ daha küçük üçgenler ekliyoruz. Her üçgenin yan uzunluğu, önceki adımdaki üçgenlerin [[`1/3`|`1/4`|`1/2`]] 'dır.

{.reveal(when="blank-0")} Ortaya çıkan şekle, İsveçli matematikçi [Helge von Koch](bio:koch) adını taşıyan [__Koch kar tanesi__](gloss:koch-snowflake) denir. Bir kez daha, kar tanesinin kenarındaki [küçük bölümlerin](target:t2), [büyük bölümlerle](target:t1) tamamen aynı göründüğüne dikkat edin.

::: column(width=300)

    svg.var(width=300 height=300)
      path.blue(:draw="koch(steps)")
      rect.overlay(y=76 width=300 height=224 target="t1")
      polygon.overlay(points="300 0 90 0 107 76 0 76 0 300 300 300 300 0" target="t2")
    x-slider(steps=5 :bind="steps")

:::

---

> id: koch-dimension

::: column(width=380)

    img(src="images/koch.png" width=380 height=171)

::: column.grow

Koch Kar Tanesi'nin bir kenar segmentini 3 katına kadar ölçeklendirdiğimizde, uzunluğu [[dört kat|triples|doubles]].

{.reveal(when="blank-0")} Yukarıdaki boyutlar ve ölçek faktörleri arasında aynı ilişkiyi kullanarak [[`3^d=4`|`2^d=4`|`2^d=3`|`4^d=3`]] denklemini alıyoruz. _{span.reveal(when="blank-1")} Bu, Koch Kar Tanesi'nin boyutunun `§d = log_3(4) ≈ 1.262` olduğu anlamına gelir._

:::

---

> id: koch-size

::: tab

#### Alan _{span.check(when="blank-6")}_

Koch kar taneleri oluşturmak neredeyse [özyinelemeli bir dizi](gloss:sequence-recursive) gibidir: başlangıç şeklini (bir üçgen) biliyoruz ve bir terimden diğerine nasıl geçileceğini biliyoruz (her kenarda daha fazla üçgen ekleyerek):

::: column(width=140)

    img#koch-0(src="images/koch-0.svg" width=140 height=160)

::: column(width=140)

    img#koch-1(src="images/koch-1.svg" width=140 height=160)

{.text-center} [[3]] yeni üçgen

::: column(width=140)

    img(src="images/koch-2.svg" width=140 height=160)

{.text-center} [[12]] yeni üçgen

::: column(width=140)

    img(src="images/koch-3.svg" width=140 height=160)

{.text-center} [[48]] yeni üçgen

:::

{.reveal(when="blank-0 blank-1 blank-2")} İlk yinelemeden sonra, eklenen yeni üçgenlerin sayısı her adımda [[4]] kat artmaktadır. Aynı zamanda, bu yeni üçgenlerin alanı her adımda [[9]] faktör azalmaktadır.

{.reveal(when="blank-3 blank-4")} Diyelim ki [ilk üçgenin](->#koch-0) 1 alanı var. Sonra [sonraki üç üçgenin](->#koch-1) toplam alanı `3 × 1/9 = 1/3`. Aşağıdaki adımların tümü, ortak oranı [[`4/9`|`9/4`|`4/3`]] olan [[geometrik bir dizi|arithmetic series|quadratic series]], _{span.reveal(when="blank-5")} oluşturur._

{.reveal(when="blank-6")} Sonsuz [geometrik seri](gloss:geometric-series) toplamı için formülü kullanarak, Koch kar tanesinin toplam alanının

{.text-center.reveal(when="blank-6")} `A = 1 + 1/3 × 1/blank(1-4/9, 1+9/4, 9-1/4) reveal(= 8/5 = 1.6,"blank-7")`.

::: tab

#### Çevre _{span.check(when="blank-9")}_

::: column.grow

Koch kar tanesi çevresini de hesaplamaya çalışabiliriz. Daha önce gördüğümüz gibi, çevre uzunluğu her adımda [[`4/3`|`3/4`|`1/4`]] faktörü ile değişir.

{.reveal(when="blank-8")} Bu, bir kez daha geometrik bir serimiz olduğu anlamına gelir - ancak bu durumda [[>>>>,|converges to 0|doesn’t have a first term]] 'yi birbirine yakınlaştırmaz. _{span.reveal(when="blank-9")} Bu, Koch kar tanesi çevresinin aslında __sonsuz uzunluğunda olduğu anlamına gelir__!_

::: column(width=220)

    img(src="images/koch-edge.svg" width=220 height=250)

:::

{.reveal(when="blank-9")} _Bu mantıksız görünüyorsa, çevreyi her adımda `§4/3` ile çarptığımızı ve bunu sonsuza kadar defalarca yaptığımızı unutmayın._

:::

---

> id: frozen

::: column.grow

_sonlu_ alanı ve ayrıca _sonsuz_ çevresi olan bir şekle sahip olmanız neredeyse düşünülemez - ancak bu, fraktallerin beklenmedik birçok özelliğinden sadece biridir.

Kendi fraktallarınızı yaratmanın başka yollarını bulabilir misiniz? [Devam](btn:next)

::: column(width=352)

    x-video(src="images/frozen.mp4" poster="images/frozen.jpg" width=352 height=198 audio credit="© Disney")

{.caption} “Ruhum her yerdeki donmuş fraktallara yayılıyor…”

:::

---

> id: menger-sponge

### Menger Süngeri

Fraktalların yukarıdaki örneklerin çoğu gibi "düz" olmaları gerekmez. 3 boyutlu görünen en ünlü fraktallardan biri, ilk olarak 1926'da tanımlayan matematikçi [Karl Menger](bio:menger) 'nin adını taşıyan __Menger süngeri__' dir.

::: column(width=320 parent="right")

    x-menger-sponge.var(size=320 :steps="steps")
    x-slider(steps=3 :bind="steps")

::: column.grow

Sağlam bir küple başlıyoruz ve yanlarına tekrar tekrar daha küçük ve daha küçük delikler açıyoruz. Her yeni delik yinelemesi, önceki delik yinelemesinin genişliğine [[`1/3`|`1/2`|`1/4`]] sahiptir.

{.reveal(when="blank-0")} Bir küp (347}) 27 küçük küpten oluşuyor, ancak burada bunlardan bazılarını kaldırdık. Menger süngeri 3 kat daha küçük olan kendi [[20]] kopyasından oluşur.

{.reveal(when="blank-1")} Şimdi, yukarıdaki Koch kar tanesi için yaptığımız gibi Menger süngerinin _d_ boyutunu hesaplamaya çalışabiliriz. Bu durumda `3^d = 20` veya `§d = log_3(20) ≈ 2.727` alırız.

:::

{.reveal(when="blank-1")} Sonsuz kez daha fazla delik açmayı hayal ederseniz, gerçek hacim kalmaz. Bu yüzden küp “tam olarak” 3 boyutlu! [Devam](btn:next)

---

> id: coastlines

### Fraktal Sahil Şeritleri

Şimdiye kadar gördüğümüz tüm fraktalların temel özelliklerinden biri, sonsuza dek “yakınlaştırabilir” ve her zaman yeni desenler bulabilmenizdir. 1920 civarında, İngiliz matematikçi [Lewis Fry Richardson](bio:richardson), bunun birçok ülkenin sınırı veya sahil şeridi için geçerli olduğunu fark etti.

Ülkenin temel şekli ile başlıyorsunuz ve yakınlaştırdıkça nehir girişleri, koylar ve haliçleri, ardından bireysel uçurumları, kayaları, çakıl taşlarını vb.

::: column(width=120 parent="padded-thin")

    x-media(src="images/coast-1.jpg" width=120 height=180)

::: column(width=120)

    x-media(src="images/coast-2.jpg" width=120 height=180)

::: column(width=120)

    x-media(src="images/coast-3.jpg" width=120 height=180)

::: column(width=120)

    x-media(src="images/coast-4.jpg" width=120 height=180)

::: column(width=120)

    x-media(src="images/coast-5.jpg" width=120 height=180)

:::

[Devam](btn:next)

---

> id: coastlines-1

::: column.grow

Bir ülkenin sınırının uzunluğunu hesaplamaya çalışırken bu önemli bir sorundur - ne kadar yakınlaştıracağınıza ve hangi köşe ve çatlakları dahil edeceğinize nasıl karar veriyorsunuz?

Britanya'nın kıyı şeridinin uzunluğunu ölçmenin bir yolu, örneğin, uzun bir cetvel almak, plajlarında dolaşmak ve sonra tüm mesafeleri toplamaktır.

Cetvel ${rulers[index]}{index|0|0,8,1} km uzunluğundaysa, onu ${count} kez kullanmalıyız, bu yüzden toplam sahil şeridimiz ${count} × ${rulers[index]} = ${count * rulers[index]} km.

{.reveal(when="var-0")} Daha küçük ve daha küçük cetvellerle devam edebiliriz ve kıyı şeridinin uzunluğuna ilişkin sonuç her seferinde biraz daha uzun olur. Tıpkı daha önce Koch Snowflake gibi, İngiltere'nin sahil şeridinin sonsuza kadar uzun olduğu görülüyor! Buna genellikle __kıyı şeridi paradoksu__ denir. [Devam](btn:next)

::: column(width=280)

    .coastline: include svgs/britain.svg

:::

---

> id: coastline-grid

Birkaç on yıl sonra matematikçi [Benoit Mandelbrot](bio:mandelbrot), IBM’de çalışırken Richardson’ın atılan bir kütüphane kitabındaki çalışmalarına rastladı. Önemini ve ayrıca fraktallar ve boyutlar hakkında daha yeni araştırmalarla nasıl ilişkili olduğunu kabul etti.

::: column(width=340)

    include svgs/cells.svg
    x-slider(steps=10 continuous :bind="i")

::: column.grow

Britanya'nın kıyı şeridi kesinlikle fraktal "görünüyor", ancak daha önce gördüğümüz diğer fraktallar gibi _kendine benzer_ değil. Boyutunu bulmak için, bir ızgaraya çizebilir ve kesiştiği hücre sayısını sayabiliriz.

{.r.reveal(when="slider-0")} Başlangıçta __{.pill.yellow} 88__ kesişen hücre vardır. Kıyı şeridini 2 kat büyütürsek, __{.pill.yellow} 197__ kesişen hücre var - iki katından fazla! [Devam](btn:next)

{.r.reveal(when="next-0")} Kıyı şeridinin boyutu `§197/88` kat arttı. Daha önce olduğu gibi, bu sahil şeridinin boyutunun

{.text-center.reveal(when="next-0")} `§d = log_2(197/88) ≈ 1.16`

:::

---

> id: coastline-dimension-1

Bunu daha büyük ızgaralarla tekrarlarsak, İngiltere sahil şeridinin boyutunun aslında yaklaşık 1.21 olduğunu görürüz. Mandelbrot, bu fraktal boyutun aynı zamanda bir şeklin __pürüzlülüğünün__ bir ölçüsü olduğunu fark etti - yeni bir kavram, matematik ve bilimin diğer birçok alanında önemli uygulamalar buldu.

---

> id: nature

### Doğa ve Teknolojide Daha Fazla Fraktal

Gerçek fraktallar hiçbir zaman doğada görünmezken, fraktallara _neredeyse_ benzeyen birçok nesne vardır. Zaten bitkiler, kar taneleri ve sahil şeritleri gördük ve işte size birkaç örnek daha:

::: column(width=200)

    // https://visibleearth.nasa.gov/images/72291/the-hindu-kush
    x-media(src="images/nature/mountains.jpg" width=200 height=200 lightbox credit="NASA/GSFC")

{.caption} Orta Asya'daki dağ silsilesi

::: column(width=200)

    // https://de.wikipedia.org/wiki/Datei:Sundarbans.jpg
    x-media(src="images/nature/rivers.jpg" width=200 height=200 lightbox credit="NASA")

{.caption} Hindistan'da Ganj Nehri Deltası

::: column(width=200 parent="padded-thin")

    x-media(src="images/nature/lightning.jpg" width=200 height=200 lightbox)

{.caption} Yıldırım cıvataları

::: column(width=200)

    // https://commons.wikimedia.org/wiki/File:Fundus_photograph_of_normal_right_eye.jpg
    x-media(src="images/nature/retina.jpg" width=200 height=200 lightbox credit="Mikael Häggström, CC-BY-SA")

{.caption} Retinadaki kan damarları

::: column(width=200)

    // https://www.flickr.com/photos/usgeologicalsurvey/11188773133
    x-media(src="images/nature/canyons.jpg" width=200 height=200 lightbox credit="US Geological Survey")

{.caption} ABD'de Büyük Kanyon

::: column(width=200)

    x-media(src="images/nature/clouds.jpg" width=200 height=200 lightbox)

{.caption} Bulutlar

:::

Tüm bu nesneler tamamen rastgele görünebilir, ancak tıpkı fraktallar gibi, bunların nasıl oluştuğunu belirleyen altta yatan bir desen vardır. Matematik şekilleri daha iyi anlamamıza yardımcı olabilir ve fraktalların tıp, biyoloji, jeoloji ve meteoroloji gibi alanlarda uygulamaları vardır. [Devam](btn:next)

    // TODO https://en.wikipedia.org/wiki/Fractal_antenna
    // TODO Fractals in African Art

---

> id: technology

::: column(width=300)

    // https://commons.wikimedia.org/wiki/File:Fractal_terrain_texture.jpg
    x-media(src="images/terrain.jpg" width=360 height=270 lightbox)

{.caption} Bilgisayar tarafından oluşturulan fraktal arazi

::: column.grow

Fraktalları, örneğin video oyunlarında veya bilgisayar tarafından oluşturulan filmlerde kullanılan manzaralar ve dokular gibi gerçekçi doğa “kopyaları” oluşturmak için de kullanabiliriz. Bu görüntüdeki su, dağlar ve bulutlar tamamen bir bilgisayar tarafından, fraktalların yardımıyla yapılır!

Ve hatta dijital görüntüleri sıkıştırmak, dosya boyutlarını azaltmak için bu işlemi tersine çevirebiliriz. İlk algoritmalar 1980'lerde Michael Barnsley ve Alan Sloan tarafından geliştirildi ve bugün hala yeni algoritmalar araştırılıyor.

:::

---

## Sierpinski Üçgeni

> section: sierpinski
> id: sierpinski

::: column.grow

Önceki bölümde gördüğümüz fraktallardan biri, Polonyalı matematikçi [Wacław Sierpiński](bio:sierpinski) tarafından adlandırılan [__Sierpinski üçgeni__](gloss:sierpinski-triangle) idi. Bir büyük, eşkenar üçgenle başlayıp, daha sonra merkezden daha küçük üçgenleri tekrar tekrar keserek oluşturulabilir.

{.r.reveal(when="slider-0")} Wacław Sierpiński bu üçgenin özelliklerini düşünen ilk matematikçilerdi, ancak sanat, desen ve mozaiklerde yüzyıllar önce ortaya çıkmıştı.

::: column(width=300)

    svg.var.sierpinsk(width=300 height=265)
      path.red(:draw="triangle")
      path.white(:d="sierpinski(triangle.points, steps)")
    x-slider(steps=8 :bind="steps")

:::

---

> id: sierpinski-history

Roma'daki farklı kiliselerden gelen yer döşemelerinden bazı örnekler:

::: column(width=140 parent="padded-thin")

    // https://commons.wikimedia.org/wiki/File:Santa_Maria_in_Cosmedin_(Roma).jpg
    x-media(src="images/floor-1.jpg" width=140 height=140 credit="Wiki LIC, CC-BY-SA-4.0")

::: column(width=140)

    // Permission from Elisa Conversano
    x-media(src="images/floor-2a.jpg" width=140 height=140 credit="San Clemente, Carlini und Conversano, 2010")

::: column(width=140)

    // https://www.cattedraledianagni.it/
    x-media(src="images/floor-2.jpg" width=140 height=140 credit="© cattedraledianagni.it")

::: column(width=140)

    // http://matheuro.overblog.com/2014/05/sierpinski-s-triangle-the-nave-of-the-roman-basilica-of-santa-maria-in-comesdin.html
    x-media(src="images/floor-3.jpg" width=140 height=140 credit="© Lycée Baudelaire")

:::

Görünüşe göre, Sierpinski üçgeni matematiğin geniş bir yelpazesinde ortaya çıkıyor ve onu oluşturmak için birçok farklı yol var. Bu bölümde, bazılarını keşfedeceğiz! [Devam](btn:next)

---

> id: pascal
> goals: select

### Pascal’ın Üçgeni

Sierpinski üçgenini [__Pascal’ın üçgeni__](gloss:pascals-triangle) ile ilgili bölümümüzden zaten hatırlayabilirsiniz. Bu, her sayının yukarıdaki iki sayının toplamı olduğu bir sayı piramidi. Aşağıdaki üçgendeki tüm _çift_ sayılara hafifçe vurun, vurgulayın - ve bir kalıp fark edip etmediğinizi görün:

    - var fact = function(x) { return !x ? 1 : (x * fact(x-1)); };
    - var bin = function(a, b) { return Math.round(fact(a) / fact(b) / fact(a - b)); };
    figure: .overflow-wrap: .pascal-grid.small(style="width: 760px")
      - var i = 0;
      while i <= 18
        - var j = 0
        .r
          while j <= i
            - b = bin(i, j)
            .c= b
            - j += 1;
        - i += 1;

---

> id: pascal-1

Pascal’ın üçgeni sonsuza kadar aşağıya doğru devam edebilir ve Sierpinski modeli daha büyük ve daha büyük üçgenlerle devam eder. Daha büyük bir üçgenin başlangıcını, 16. satırdan başlayarak görebilirsiniz.

İki bitişik hücre 2 ile bölünebilirse, altındaki hücredeki toplamları da 2 ile bölünebilir olmalıdır - bu yüzden sadece renkli üçgenler (veya tek hücreler) alabiliriz. Elbette, 2_ dışındaki _sayılarına bölünebilen tüm hücreleri boyamayı da deneyebiliriz. Bu durumlarda ne olacağını düşünüyorsunuz? [Devam](btn:next)

---

> id: pascal-large

    .pascal-canvas
      canvas.pascal(width=960 height=840)
      .label Divisible by #[span.circled.var(style="background: ${gradient[n - 2]}") ${n}]:

Burada Pascal’ın üçgeninin ilk 128 sırasının küçük bir versiyonunu görebilirsiniz. ${n}{n|2|2,40,1} ile bölünebilen tüm hücreleri vurguladık - ne fark ettiniz?

{.reveal(when="var-0")} Her sayı için Sierpinski üçgenine benzeyen farklı bir üçgen deseniz. Bir [[asal sayı|triangle number|Fibonacci number]] seçersek, model özellikle düzenlidir. _{span.reveal(when="blank-0")} Sayının _birçok farklı_ asal faktörü varsa, desen daha rastgele görünür._

    x-gesture(target="#pascal-large x-var" slide="100,0")

---

> id: chaos-game
> goals: point play

### Kaos Oyunu

::: column(width=360 parent="right")

    x-geopad.sticky#chaos-geo(width=360)
      canvas(width=720 height=720)
      svg
        circle.red(name="x0" x="tri[0]")
        circle.green(name="x1" x="tri[1]")
        circle.yellow(name="x2" x="tri[2]")
    x-gesture(target="#chaos-geo")

::: column.grow

Burada eşkenar üçgenin üç köşesini görebilirsiniz. Dördüncü nokta oluşturmak için gri alanda herhangi bir yere dokunun.

{.r.reveal(when="point")} Basit bir oyun oynayalım: üçgenin köşelerinden birini rastgele seçiyoruz, noktamızla tepe noktası arasında bir çizgi parçası çiziyoruz ve sonra o parçanın [{.pill.red} orta noktasını](target:p1) buluyoruz. [Devam](btn:next)

{.r.reveal(when="next-0")} Şimdi işlemi tekrarlıyoruz: başka bir rastgele tepe noktası seçiyoruz, segmenti son noktamızdan çiziyoruz ve sonra [{.pill.green} orta noktayı](target:p2) buluyoruz. Bu yeni noktaları, seçtiğimiz üçgenin tepe noktasının rengine göre renklendirdiğimizi unutmayın. [Devam](btn:next)

{.reveal(when="next-1")} Şimdiye kadar şaşırtıcı bir şey olmadı - ama aynı işlemi daha fazla tekrarladığımız zaman izleyin:

{.text-center.reveal.var(when="next-1")} _{button.btn.btn-red(@click="play()")} 1000 adım ekleyin_

:::

---

> id: fractal-builder
> goals: s1 s2 shape play

Bu işleme __Kaos Oyunu__ adı verilir. Başlangıçta birkaç başıboş nokta olabilir, ancak aynı adımları birçok kez tekrarlarsanız, noktaların dağılımı tam olarak Sierpinski üçgeni gibi görünmeye başlar!

Bunun birçok versiyonu var - örneğin, bir kare veya beşgen ile başlayabiliriz, aynı köşeyi arka arkaya iki kez seçememek gibi ek kurallar ekleyebiliriz veya bir sonraki noktayı bir oranda seçebiliriz segment boyunca `§1/2` dışında. Bu vakaların bazılarında, rastgele rastgele bir dağılım elde edeceğiz, ancak diğer durumlarda daha fazla fraktal ortaya çıkarıyoruz:

    include components/chaos-game

{.reveal(when="s1 s2 play")} [Sierpinski halısını](action:carpet()) veya bu [beşgen kar tanesi](action:snowflake()) [__Altın oran__](gloss:golden-ratio) 'ı keşfettiniz mi?

---

> id: cellular
> goals: sierpinski

### Hücresel Otomata

Bir __hücresel otomatı__ birçok ayrı hücreden oluşan bir ızgaradır. Her hücre farklı "durumlarda" (örneğin farklı renklerde) olabilir ve her hücrenin durumu çevresindeki hücreler tarafından belirlenir.

Örneğimizde, her hücre siyah veya beyaz olabilir. Sadece tek bir siyah kare içeren bir satırla başlıyoruz. Takip eden her satırda, her hücrenin rengi hemen yukarıdaki üç hücre tarafından belirlenir. Renklerini çevirmek için aşağıdaki sekiz olası seçeneğe dokunun - Sierpinski üçgenine benzer bir desen oluşturan bir dizi kural bulabilir misiniz?

    figure: x-automaton(size=28)

{.reveal(when="sierpinski")} Sekiz seçeneğin her biri için iki seçenek vardır, yani toplamda `2^8 =` [[256]] olası kural vardır. [Kural 126](action:setRule('01111110')) gibi bazıları Sierpinski üçgenine benziyor. [Kural 30](action:setRule('01111000')) gibi diğerleri tamamen kaotik görünüyor. 1983 yılında [Stephen Wolfram](bio:wolfram) tarafından keşfedildi ve bilgisayarlar bunları rastgele sayılar üretmek için bile kullanabilir!

---

> id: cellular-1

::: column.grow

Hücresel otomatalar, tıpkı fraktallar gibi çok basit kurallarla nasıl oldukça karmaşık desenlerin oluşturulabileceğini gösterir. Doğada birçok süreç basit kuralları takip eder, ancak inanılmaz derecede karmaşık sistemler üretir.

Bazı durumlarda, bu, hücresel otomatlara benzeyen desenlerin ortaya çıkmasına, örneğin bu salyangozun kabuğundaki renklere yol açabilir.

::: column(width=320)

    x-media(src="images/shell.jpg" width=320 height=240 lightbox credit="Richard Ling, CC BY-SA 3.0")

{.caption} Conus tekstil, zehirli bir deniz salyangozu

:::

---

> id: tetrahedra

### Sierpinski Tetrahedra

Sierpinski üçgeninin birçok çeşidi ve benzer özelliklere ve yaratma süreçlerine sahip diğer fraktallar vardır. Bazıları, yukarıda gördüğünüz _Sierpinski Halı_ gibi 2 boyutlu görünüyor. Diğerleri bu örnekler gibi 3 boyutlu görünüyor:

::: column(width=320)

    x-sierpinski-tetrahedra(size=320 steps=5 style="display: block; margin-top: -20px")

{.caption} Sierpinski Tetrahedra

::: column(width=320)

    x-sierpinski-pyramid(size=320 steps=5 style="display: block; margin-top: -20px")

{.caption} Sierpinski Piramidi

:::

---

## Mandelbrot Seti

> section: mandelbrot
> id: iteration
> goals: move-1 move-2

Önceki bölümlerde gördüğümüz tüm fraktallar __yineleme__ işlemi kullanılarak oluşturuldu: belirli bir desenle başlıyorsunuz ve sonra tekrar tekrar tekrar ediyorsunuz.

::: column(width=112 parent="padded-thin")

    img(src="images/koch-0.svg" width=112 height=128)

::: column(width=112 parent="padded-thin")

    img(src="images/koch-1.svg" width=112 height=128)

::: column(width=112 parent="padded-thin")

    img(src="images/koch-2.svg" width=112 height=128)

::: column(width=112 parent="padded-thin")

    img(src="images/koch-3.svg" width=112 height=128)

:::

Bu, matematikte daha önce gördüğünüz başka bir konsepte benzer: [özyinelemeli sekanslarla](gloss:sequence-recursive), belirli bir sayıyla başlarsınız ve daha sonra, bir sonraki sayıyı almak için aynı özyinelemeli formülü tekrar tekrar uygularsınız. sıra.

Örnek olarak `§x_n = x_(n-1)^2` özyinelemeli formülü ele alalım ve terimlerini bir sayı satırına çizelim. `pill(x_0,"yellow","x0")` değerini değiştirebilirsiniz:

    figure: x-geopad.no-background(width=720 height=120 x-axis="-2.4,4.4,1" y-axis="-0.1,0.1" axes="yes,no" padding="40 20 0"): svg
      circle.yellow.move.pulsate(x="point(0,0)" name="x0" project="line(point(-3,0),point(3,0))" target="x0")
      path.blue.thick.reveal.light(x="segment(point(-1,0),point(1,0))" style="stroke-width: 20px" when="move-1 move-2" animation="draw" duration=1200)
      path.yellow(:d="drawArc(x0)")

---

> id: iteration-1

Sonuç dizisinin `x_0` başlangıç değerine bağlı olarak nasıl çok farklı davranabileceğine dikkat edin:

::: column.sequence-cell(width=180 parent="padded-thin")

`x_0 > 1` ise, [[dizisi|converges]] 'i saptırır: _{span.reveal(when="blank-0")} sonsuza kadar büyümeye devam eder._

::: column.sequence-cell(width=180)

`x_0` –1 ve 1 arasındaysa, [[dizisi|diverges]] 'i yakınsar.

::: column.sequence-cell(width=180)

`x_0 < -1` ise, [[dizisi|converges]] 'i birbirinden ayırır.

:::

---

> id: iteration-2

Şimdiye kadar yeni bir şey öğrenmedik. Ancak, yaklaşık bir asır önce, matematikçiler gerçek sayı çizgisinden ziyade [__karmaşık sayıları__](gloss:complex-numbers) kullanırsanız bu dizilere ne olduğunu keşfetmeye başladılar. Keşifleri tüm matematikteki en şaşırtıcı ve güzel sonuçlardan biriydi.

---

> id: julia
> goals: wipe-a wipe-b wipe-c wipe-d

### Julia Setleri

Öncekiyle aynı diziyi kullanalım, `§x_n = x_(n-1)^2`, ancak karmaşık düzlemde. Aşağıdaki koşullara ne olduğunu görmek için `pill(x_0,"yellow","x0")` konumunu hareket ettirebilirsiniz. Sekans birleşecek gibi görünüyorsa, düzlemdeki karşılık gelen noktayı _{span.pill.blue} mavi_ ile renklendirelim:

    figure: x-geopad(slot="stage" width=720 height=480 x-axis="-2.2,2.2,1" y-axis="-1.5,1.5,1" axes grid padding=8 projections="no" style="margin-bottom: 24px" label-positioning="no" label-suffix=",i" axis-names="Real, Imaginary")
      canvas(width=1440 height=960)
      canvas(width=1440 height=960 style="opacity: 1")
      svg
        circle.move.yellow.pulsate(name="x0" x="point(0,0)" target="x0")
        circle.yellow.transparent(name="x1" x="iterate(x0)" target="x1")
        circle.yellow.transparent(name="x2" x="iterate(x1)" target="x2")
        circle.yellow.transparent(name="x3" x="iterate(x2)" target="x3")
        path.yellow(x="spiral(x0)")
      .geo-legend
        .formula.md `pill(x_n,"yellow") = pill(x_(n-1),"yellow")^2`
        .sequence
          .md `pill(x_0,"yellow", "x0") = var("complex(x0)")`
          .md `pill(x_1,"yellow", "x1") = var("complex(x1)")`
          .md `pill(x_2,"yellow", "x2") = var("complex(x2)")`
          .md `pill(x_3,"yellow", "x3") = var("complex(x3)")`
          div
            span.vdots …
            strong.var.m-blue(:show="converges" data-display="inline") Converges!
            strong.var(:show="!converges" data-display="inline") Diverges!

{.reveal(when="wipe-a wipe-b wipe-c wipe-d")} Gördüğünüz gibi, dizi `pill(x_0,"yellow","x0")` birim daire| outside the unit square|above the _>>>>x<<<<_-axis]]| outside the unit square|above the _>>>>x<<<<_-axis]] _{span.reveal(when="blank-0")} (başlangıçta ortalanmış 1 yarıçapına sahip daire) içinde kaldığı sürece dizi yakınsar._

---

> id: julia-1

Şimdi işleri biraz daha zorlaştıralım. Önceki sayının karesini almak yerine, her seferinde sabit bir _{.pill.red} c_ ekliyoruz (bu herhangi bir karmaşık sayı olabilir). Başka bir deyişle, `§x_n = x_(n-1)^2 + c`. Sizce hala bir yakınsama döngüsü elde edeceğiz mi? Başka hangi şekilleri görebileceğimizi düşünüyorsunuz? [Devam](btn:next)

---

> id: julia-2

Bu şemada, `pill(x_0,"yellow","x0")` konumunu ve `pill(c,"red","c")` değerini taşıyabilirsiniz:

::: x-slideshow

    x-geopad(slot="stage" width=720 height=480 x-axis="-1.8,1.8,1" y-axis="-1.2,1.2,1" axes grid padding=8 projections="no" style="margin-bottom: 24px" label-suffix=",i" axis-names="Real, Imaginary")
      canvas(width=1440 height=960)
      svg
        circle.move.yellow(name="x0" x="point(0.5,0.5)" target="x0")
        circle.move.red(name="c" x="point(0,0)" target="c")
        circle.yellow.transparent(name="x1" x="iterate(x0,c)" target="x1")
        circle.yellow.transparent(name="x2" x="iterate(x1,c)" target="x2")
        circle.yellow.transparent(name="x3" x="iterate(x2,c)" target="x3")
        path.yellow(x="spiral(x0,c)")
      .geo-legend
        .formula.md `pill(x_n,"yellow") = pill(x_(n-1),"yellow")^2 + pill(var("complex(c)"),"red","c")`
        .sequence
          .md `pill(x_0,"yellow", "x0") = var("complex(x0)")`
          .md `pill(x_1,"yellow", "x1") = var("complex(x1)")`
          .md `pill(x_2,"yellow", "x2") = var("complex(x2)")`
          .md `pill(x_3,"yellow", "x3") = var("complex(x3)")`
          div
            span.vdots …
            strong.var.m-blue(:show="converges" data-display="inline") Bounded!
            strong.var(:show="!converges" data-display="inline") Diverges!

{div(slot="legend")} [`c = 0`](action:animate(0,0)) - yukarıdaki örnekle aynıysa ne olacağını zaten biliyoruz. `x_0` birim çemberin içinde olduğu sürece dizi yakınsaması.

{div(slot="legend")} _c_ 'nin değerini değiştirir değiştirmez harika bir şey olur. Daire oldukça karmaşık, fraktal bir şekle dönüşür.

{div(slot="legend")} [`c = –0.54 + 0.5i`](action:animate(-0.54,0.5)) olduğunda, şekil spiraller halinde düzenlenmiş sonsuz sayıda küçük elemana bölünür.

::: div(slot="legend")

Bazı durumlarda, dizi _tek bir noktaya_ yaklaşmaz - bunun yerine üçgen gibi birden çok noktadan oluşan bir döngüye ulaşır. Bu döngüler __yörüngeler__ olarak adlandırılmaktadır.

Mavi renkli noktalar, karşılık gelen dizinin yakınsadığı veya yörüngesine sahip olduğu anlamına gelir (bunun __sınırlı__ olduğunu söylüyoruz). Beyaz bırakılan noktalar, karşılık gelen __dizisinin__ saptığı anlamına gelir: sınırlandırılmaz ve sonunda sonsuza kadar patlar.

:::

{div(slot="legend")} Başka ne bulabilirsiniz? [`c = 0.4 + 0.21i`](action:animate(0.4,0.21)) veya [`c = 0.38 – 0.25i`](action:animate(0.38,-0.25)) olduğunda desenlere bir göz atın. _c_ 'un bazı değerleri de vardır; burada _her_ dizisi birbirinden ayrılır, böylece tüm karmaşık düzlük beyaz kalır.

:::

---

> id: julia-3

Sayılarda renklendirmeyle oluşan farklı şekillere [__Julia Sets__](gloss:julia-set) denir. 1918 civarında iki Fransız matematikçi [Gaston Julia](bio:julia) ve [Pierre Fatou](bio:fatou) tarafından bağımsız olarak keşfedildi.

O zaman, Julia'nın gerçekte neye benzediğini görselleştirmeye yardımcı olacak bilgisayar yoktu. Julia ve Fatou gibi matematikçiler onlar hakkında matematiksel olarak akıl yürütebildiler, ancak sadece nasıl göründüklerine dair kaba, elle çizilmiş eskizler gördüler.

Bugün bu sorunumuz yok - aşağıdaki resimlerin hepsi farklı Julia setleridir. Farklı renkler _bu noktadaki dizinin ne kadar çabuk_ saptığını gösterir:

::: column(width=220)

    x-media(src="images/julia-1.jpg" width=220 height=165 lightbox)

{.caption} `c = −0.70176 – 0.3842"i"`

::: column(width=220)

    x-media(src="images/julia-2.jpg" width=220 height=165 lightbox)

{.caption} `c = −0.4 + 0.6"i"`

::: column(width=220)

    x-media(src="images/julia-3.jpg" width=220 height=165 lightbox)

{.caption} `c = 0.285 + 0.01"i"`

:::

[Devam](btn:next)

---

> id: mandel-paint
> goals: wipe-a wipe-b wipe-c

### Mandelbrot Seti

Farklı Julia setlerini oluştururken, her dizinin ayrıştığı ve tüm karmaşık düzlemin beyaz kaldığı bazı _c_ değerleri olduğunu fark etmiş olabilirsiniz. Julia ve Fatou'dan birkaç on yıl sonra, yeni nesil matematikçiler bu alanların nasıl göründüğünü haritalamaya çalıştı.

Önceki örnekte, `pill(c,"red","c")` için sabit bir değer seçtik ve sonra düzlemi renklendirmek için `pill(x_0,"yellow","x0")` konumunu değiştirdik. Şimdi `pill(x_0 = 0,"yellow","x0")` değerini düzeltelim ve bunun yerine `pill(c,"red","c")` değerini değiştirelim.

Bir kez daha, dizilerin sınırlı kaldığı bölgeyi ortaya çıkarmak için karmaşık düzlem üzerinde boyayın. Hangi şekillerin görünmesini bekliyorsunuz?

    figure: x-geopad.no-background(width=720 height=480 x-axis="-2.1,1.1,1" y-axis="-1.1,1.1,1" axes grid padding=8 projections="no" label-suffix=",i" axis-names="Real, Imaginary")
      img(src="images/mandelbrot.png" data-bounds="1,0.5,-1,-1.5")
      canvas(width=1440 height=960 style="opacity: 1")
      svg
        circle.move.red.pulsate(name="c" cx=0 cy=0 target="c")
        circle.yellow.transparent(name="x0" x="point(0,0)" target="x0")
        circle.yellow.transparent(name="x1" x="iterate(x0,c)" target="x1")
        circle.yellow.transparent(name="x2" x="iterate(x1,c)" target="x2")
        circle.yellow.transparent(name="x3" x="iterate(x2,c)" target="x3")
        path.yellow(x="spiral(x0,c)")
      .geo-legend
        .formula.md `pill(x_n,"yellow") = pill(x_(n-1),"yellow")^2 + pill(var("complex(c)"),"red","c")`
        .sequence
          .md `pill(x_0,"yellow", "x0") = var("complex(x0)")`
          .md `pill(x_1,"yellow", "x1") = var("complex(x1)")`
          .md `pill(x_2,"yellow", "x2") = var("complex(x2)")`
          .md `pill(x_3,"yellow", "x3") = var("complex(x3)")`
          div
            span.vdots …
            strong.var.m-blue(:show="converges" data-display="inline") Bounded!
            strong.var(:show="!converges" data-display="inline") Diverges!

---

> id: mandel-history

Bu fraktal, [__Mandelbrot Seti__](gloss:mandelbrot-set) olarak adlandırılır ve 90 ° döndürüldüğünde, kafa, gövde ve iki kolu olan neredeyse bir kişiye benziyor. İlk kez 1978'de matematikçiler Robert Brooks ve Peter Matelski tarafından bir araştırma makalesinde tanımlanmış ve çizilmiştir:

    figure: x-media(src="images/mandelbrot.jpg" width=360 height=290 credit="© Princeton University Press")

Birkaç yıl sonra, [Benoit Mandelbrot](bio:mandelbrot), daha sonra onun adını alan fraktal hakkında çok daha ayrıntılı bir görselleştirme oluşturmak için IBM'deki güçlü bilgisayarları kullandı. İlk çıktılar beklediğinden farklı görünüyordu - yazıcılarda çalışan teknisyenlerin, toz parçacıklarından veya yazıcı hatalarından kaynaklandığını ve fraktalların tanımlayıcı bir özelliği olmadığını varsayarak, kenarındaki “bulanıklığı” temizlediğini anlayana kadar ! [Devam](btn:next)

---

> id: mandel-zoom

Tüm fraktallar gibi Mandelbrot setini sonsuza dek “yakınlaştırabiliriz” ve her ölçekte yeni desenler bulabiliriz. Burada Mandelbrot setinin __Denizatı vadisi__ olarak adlandırılan bir parçasını yakınlaştırabilirsiniz. Siyah noktalar, dizinin sınırlı olduğu Mandelbrot kümesinin_ içinde _yer almaktadır. Renkli noktalar, dizinin ayrıldığı [Mandelbrot kümesinin _dışındadır ve farklı renkler sonsuza kadar ne kadar hızlı büyüdüğünü _gösterir:

    .mandel-frame
      - i = 1;
      while i <= 27
        img(src="images/mandel/mandel-" + i + ".jpg" width=760 height=500)
        - i += 1;
      .scale.var Scale: ${pow(scale)}
    x-slider(steps=27 continuous speed=0.1 :bind="scale")

---

> id: mandel-zoom-1

Bu kaydırıcı, 14 katrilyonu aşan yakınlaştırma düzeyine veya `2^54` değerine kadar 27 ayrı resimden oluşur. Tamamen, modern bir dizüstü bilgisayarda render yapmak yaklaşık 45 dakika sürdü. Mandelbrot seti sadece tek bir basit denklemle oluşturulabilir `§x_n = x_(n-1)^2 + c`, ancak sonsuz karmaşık ve şaşırtıcı derecede güzeldir.

---

> id: mandel-orbits

::: column(width=360 parent="right")

    x-geopad.no-background(width=360 height="340" x-axis="-1.5,0.5,1" y-axis="-0.9,0.9,1" axes padding=8 labels="no")
      img(src="images/mandelbrot.png" data-bounds="1,0.5,-1,-1.5")
      svg
        circle.move.red.pulsate(name="c" x="point(-0.3,0.4)" target="c")
        path.blue.transparent.fill(x="cardioid" target="bulb0")
        path.blue.transparent.fill(x="circle(point(-0.125,0.745),0.094)" target="bulb1")
        path.blue.transparent.fill(x="circle(point(-0.5045,0.563),0.039)" target="bulb2")
        path.yellow.thin(x="spiral(point(0,0),c)")

::: column.grow

[{.pill.red} c](target:c) değerini Mandelbrot setinin etrafında hareket ettirdikçe, ilginç bir özellik fark edebilirsiniz:

* Mandelbrot setinin [[ana gövdesi](target:bulb0) içerisindeki tüm diziler [[<<<<|diverge|reach an orbit]] _{span.reveal(when="blank-0")} tek bir noktaya yaklaşmaktadır._
* {.reveal(when="blank-0")} [üstündeki [büyük ampul içindeki](target:bulb1) diziler, [[3]] noktadan oluşan|converge|diverge]] _{span.reveal(when="blank-1")} yörüngesine ulaştı._
* {.reveal(when="blank-2")} [içindeki bu küçük ampulün](target:bulb2) dizileri [[5]] uzunluğunda yörüngelere sahip.


:::

{.reveal(when="blank-3")} Her ampul farklı boyutta bir yörüngeye sahiptir, daha küçük ampuller yörüngelerinde daha fazla noktaya sahiptir. Bu yörüngelerin büyüklüğü, [Kaos teorisinde](/course/chaos) önemli bir kavram olan __Lojistik Harita__ ile yakından ilişkilidir.

    // TODO: Generic pan+zoom (see http://mandel.gart.nz)
    // TODO: Relationship between Julia and Mandelbrot sets
    // TODO: Fibonacci Numbers in the Mandelbrot sets

---

> id: mandel-outro

::: column.grow

Bernoit Mandelbrot hayatının çoğunu fraktalların yanı sıra _pürüzlülüğü_ ve _kendine benzerlik_ matematiğine adadı. Çalışmasının fizik, meteoroloji, nöroloji, ekonomi, jeoloji, mühendislik, bilgisayar bilimi ve diğer birçok alanda uygulamaları vardı.

1985 yılında Mandelbrot seti _Scientific American_ dergisinin kapağında yer aldı ve o zamandan beri dünyanın en tanınmış matematiksel şekillerinden biri haline geldi. Tişörtlerde, müzik videolarında ve ekran koruyucular olarak bulabilirsiniz ve birçok popüler kitap ve filmde referans alınmıştır.

::: column(width=220)

    x-media(src="images/magazine.jpg" width=220 height=316 credit="© Scientific American")

:::

---

## Alan Doldurma Eğrileri

> section: space-filling
> sectionStatus: dev

{.todo} Çok Yakında!




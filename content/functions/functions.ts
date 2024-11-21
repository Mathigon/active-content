// =============================================================================
// Functions
// (c) Mathigon
// =============================================================================


import {Slider, Step} from '@mathigon/studio';
import {Point} from '@mathigon/euclid';
import {$N, animate, ease, ElementView, pointerOver, SVGParentView, svgPointerPosn} from '@mathigon/boost';
import {last} from '@mathigon/core';
import {lerp} from '@mathigon/fermat';
import {shuffle} from '@mathigon/fermat/src/random';
import {CoordinateSystem, Geopad, GeoPoint} from '../shared/types';

import '../shared/components/burst';
import {Burst} from '../shared/components/burst';

import '../shared/components/relation/relation';
import {Relation} from '../shared/components/relation/relation';

import './components/card-graph/card-graph';
import {CardGraph} from './components/card-graph/card-graph';

import './components/draw-graph/draw-graph';
import {DrawGraph} from './components/draw-graph/draw-graph';

import './components/piecewise-endpoint-puzzle/piecewise-endpoint-puzzle';
import {PiecewiseEndpointPuzzle} from './components/piecewise-endpoint-puzzle/piecewise-endpoint-puzzle';

import './components/function-machine/function-machine';
import {FunctionMachine} from './components/function-machine/function-machine';

import {VideoGraph} from './components/video-graph/video-graph';

import './components/pong/pong';
import {Pong} from './components/pong/pong';

export function fnSketch($step: Step) {
  $step.$('.btn.clear')!.on('click', () => {
    ($step.$('x-coordinate-sketch') as any).clear();
  });
}

export function coordinatePlots($step: Step) {
  const $geopad = $step.$('x-geopad') as Geopad;
  $geopad.switchTool('point');

  const targets = [new Point(-5, 3), new Point(-2, -1), new Point(4, -3)];

  $geopad.on('add:point', (e) => {
    const point = (e.point || e.path) as GeoPoint;  // Messy, sorry!
    const index = targets.findIndex(p => point.value?.equals(p));

    let burstType: string;

    if (index < 0) {
      $step.addHint('incorrect');
      point.$el.addClass('red');
      point.lock();
      burstType = 'burst incorrect';

      animate((p) => {
        const q = Math.sqrt(ease('bounce-in', 1 - p));
        point.$el.css('transform', `scale(${q})`);
      }, 1000).promise.then(() => {
        point.delete();
      });
    } else {
      $step.score('p' + index);
      $step.addHint('correct');
      point.$el.addClass('green');
      point.lock();
      burstType = 'burst correct';
    }

    const burstElement = $N('g', {class: burstType}, $geopad.$svg);
    const burst = new Burst(burstElement as SVGParentView, 10);
    burst.play(1000, [point.$el.center.x, point.$el.center.y], [5, 25]).then(() => {
      burstElement.remove();
    });
  });

  $step.onScore('p0 p1 p2', () => {
    $geopad.switchTool('move');
  });
}

export function verticalLineTest($step: Step) {
  // Name/House Chart
  const $labels = $step.$$('x-geopad svg .labels text')!;

  // HACK: To get string axis labels I am simply replacing the contents of the axis label text elements.
  // TODO: Make names interactively update to reflect mappings assigned in earlier interactive

  const $xLabels = $labels.slice(0, 6);
  const $yLabels = $labels.slice(6, 11);

  const nameMappings: Record<string, string> = {
    '-1': '',
    0: '',
    1: 'Lynch',
    2: 'Switch',
    3: 'Derwent',
    4: 'Zabini',
    5: 'Clearwater'
  };

  const houseMappings: Record<string, string> = {
    0: '',
    1: 'Lionpaw',
    2: 'Eaglewing',
    3: 'Badgerclaw',
    4: 'Serpentfang'
  };

  $xLabels.forEach(label => {
    label.text = nameMappings[label.text.toString()];
  });

  $yLabels.forEach(label => {
    label.text = houseMappings[label.text.toString()];
  });

  // Vertical Line Test Interactives
  const $plots = $step.$$('.verticalLineTest');

  for (const $plot of $plots) {
    const $geopad = $plot as Geopad;
    const $svg = $geopad.$svg;

    $svg.css('overflow', 'visible');

    const $paths = $plot.$('svg .paths')!;
    const $verticalLine = $N('g', {class: 'verticalLine', transform: 'translate(50, 0)'}, $paths);
    $N('line', {x1: 0, x2: 0, y1: 0, y2: $plot.height}, $verticalLine);

    const $verticalLineLabel = $N('text', {x: 0, y: -2, 'text-anchor': 'middle'}, $verticalLine);
    $verticalLine.hide();

    // This odd selection is necessary because there are two SVG groups classed as "labels"
    const $labels = last($plot.$$('.labels'));

    type RelationValue = {
      coord: Point,
      $el: ElementView,
      $label: ElementView,
    }

    const relationValues: RelationValue[] = Array.from($geopad.points).map(point => {
      const coord = point.value!;
      const position = $geopad.toViewportCoords(coord);

      const $label = $N('text', {transform: `translate(${position.x + 10}, ${position.y + 10})`}, $labels);
      $label.text = `(${Math.round(coord.x * 10) / 10}, ${Math.round(coord.y * 10) / 10})`;
      $label.hide();

      return {
        coord,
        $el: point.$el,
        $label
      };
    });

    pointerOver($svg, {
      enter: () => $verticalLine.show(),
      move: (point) => {
        // Transform viewport-space point to geopad coordinate
        const pointerCoord = $geopad.toPlotCoords(point);

        // Sort relation values by proximity to pointer X, then grab all points with that X
        relationValues.sort((a, b) => Math.abs(a.coord.x - pointerCoord.x) - Math.abs(b.coord.x - pointerCoord.x));
        const closestPoints = relationValues.filter((value) => value.coord.x == relationValues[0].coord.x);

        // Hide all labels
        for (const value of relationValues) {
          value.$label.hide();
        }

        // Are we close enough to snap to the closest point(s)?
        let snapCoord = pointerCoord;
        if (Math.abs(closestPoints[0].coord.x - pointerCoord.x) < 0.5) {
          snapCoord = closestPoints[0].coord;

          // Show labels for snapped points
          for (const value of closestPoints) {
            value.$label.show();
          }
        }

        // Transform coordinate back to pixel space
        const snapPoint = $geopad.toViewportCoords(snapCoord);

        // Set position of our line and the text of our x-value label
        $verticalLine.setAttr('transform', `translate(${snapPoint.x}, 0)`);
        $verticalLineLabel.text = `x = ${Math.round(snapCoord.x * 10) / 10}`;
      },
      exit: () => {
        $verticalLine.hide();

        // Hide all labels, in case any are showing when pointer exits the SVG
        for (const value of relationValues) {
          value.$label.hide();
        }
      }
    });
  }
}

export function functionMachines($step: Step) {
  const hatMachine = $step.$('#hat-machine') as FunctionMachine;
  hatMachine.bindStep($step);
}

export function numberFunctions($step: Step) {
  const $hatMachine = $step.$('#plus-one-machine') as FunctionMachine;
  $hatMachine.bindStep($step);
}

export function numericalCoordinateFunctions($step: Step) {
  const $xSquaredMachine = $step.$('#x-squared-machine')! as FunctionMachine;
  const $xSquaredPlot = $step.$('#x-squared-plot')! as Geopad;

  $xSquaredPlot.locked = true;

  $xSquaredMachine.bindStep($step);
  $xSquaredMachine.bindCallback((inputString: string, outputString: string) => {
    const input = parseInt(inputString);
    const output = parseInt(outputString);

    const $point = $xSquaredPlot.drawPoint(new Point(input, output));

    const burstElement = $N('g', {class: 'burst'}, $xSquaredPlot.$svg);
    const burst = new Burst(burstElement as SVGParentView, 10);
    burst.play(1000, [$point.$el.center.x, $point.$el.center.y], [5, 25]).then(() => {
      burstElement.remove();
    });
  });
}

function clickPlotter($step: Step, $geopad: Geopad, plotFunction: (x: number) => number) {
  const $svg = $geopad.$svg;
  const $axes = $svg.$('.axes')!;

  const requiredCount = parseInt($geopad.attr('count') || '0');
  let pointCount = 0;

  $geopad.locked = true;
  const lineTop = $axes.positionTop - $svg.positionTop;

  const $paths = $svg.$('.paths')!;
  const $verticalLine = $N('g', {class: 'verticalLine', transform: `translate(50, ${lineTop})`}, $paths);
  $N('line', {x1: 0, x2: 0, y1: 0, y2: $axes.height}, $verticalLine);

  const $verticalLineLabel = $N('text', {x: 0, y: -8, 'text-anchor': 'middle'}, $verticalLine);
  $verticalLine.hide();

  $geopad.on('click', event => {
    const clickPoint = $geopad.toPlotCoords(svgPointerPosn(event, $svg));
    const point = new Point(clickPoint.x, plotFunction(clickPoint.x));
    const $point = $geopad.drawPoint(point);

    const burstElement = $N('g', {class: 'burst'}, $geopad.$svg);
    const burst = new Burst(burstElement as SVGParentView, 10);
    burst.play(1000, [$point.$el.center.x, $point.$el.center.y], [5, 25]).then(() => {
      burstElement.remove();
    });

    pointCount++;
    if (requiredCount > 0) {

      if (pointCount == requiredCount) {
        $step.score('plotPoints');
      } else if (pointCount < requiredCount) {
        $step.addHint('plot-points-more');
      }
    }
  });

  pointerOver($svg, {
    enter: () => $verticalLine.show(),
    move: (point) => {
      const pointerCoord = $geopad.toPlotCoords(point);

      $verticalLine.setAttr('transform', `translate(${point.x}, ${lineTop})`);
      $verticalLineLabel.text = `x = ${Math.round(pointerCoord.x * 10) / 10}`;
    },
    exit: () => $verticalLine.hide()
  });
}

export function numericalPlot($step: Step) {
  const $geopad = $step.$('x-geopad')! as Geopad;
  clickPlotter($step, $geopad, (x: number) => x * x);
}

export function findDomainRange1($step: Step) {
  const $geopad = $step.$('x-geopad')! as Geopad;
  clickPlotter($step, $geopad, (x: number) => -x * x + 3);
}

// Graphing and Interpreting Functions

// Ri Se-Gwang's vault functions
function vaultHeightDistance(x: number) {
  return (1 / (1 + Math.pow((8 * (x - 25.13)), 2))) + (8 - Math.pow(((x - 27) * 1.5), 2)) / (1 + Math.pow(((x - 27) / 1.88), 128));
}

function vaultDistanceTime(t: number) {
  // Pause before running begins
  const pause = 1.6;
  // Total duration of clip
  const duration = 9.1;

  if (t < pause) return 0;

  return (1 - Math.pow((1 + (Math.cos((t - pause) * Math.PI / (duration - pause)))) / 2, 2)) * 29.5;
}

export function vaultGraph($step: Step) {
  const $videoGraph = $step.$('x-video-graph')! as VideoGraph;

  $videoGraph.addPlot(vaultDistanceTime, vaultHeightDistance, '/content/functions/images/ri_face.png');
}

export function graphMatch($step: Step) {
  ($step.$('x-relation')! as Relation).bindStep($step);
}

export function timeHeightGraph($step: Step) {
  const $videoGraph = $step.$('x-video-graph')! as VideoGraph;

  $videoGraph.addPlot((t: number) => t, (t: number) => vaultHeightDistance(vaultDistanceTime(t)), '/content/functions/images/ri_face.png');
}

export function timeDistanceGraph($step: Step) {
  const $videoGraph = $step.$('x-video-graph')! as VideoGraph;

  $videoGraph.addPlot((t: number) => t, (t: number) => vaultDistanceTime(t), '/content/functions/images/ri_face.png');
}

export function swimGraph($step: Step) {
  const $videoGraph = $step.$('x-video-graph')! as VideoGraph;

  $videoGraph.addPlot((t: number) => t > 21.47 ? 21.47 : t, (t: number) => t > 21.47 ? 50 : 50 / 21.47 * t, '/content/functions/images/cielo_face.png');
}

export function measureSlope1($step: Step) {
  const lines = $step.$$('x-coordinate-system svg .axes line');
  lines.pop()!.setAttr('id', 'swim-y-axis');
  lines.pop()!.setAttr('id', 'swim-x-axis');
}

function evaluateSwimGraph(t: number) {
  return t * 50 / 21.47;
}

function drawSlopeMeasurements($graph: CoordinateSystem, x0: number, x1: number, showRiseRun = true) {
  const $svg = $graph.$svg as SVGParentView;
  const $overlay = $svg.$('.overlay')!;
  const $labels = $svg.$('.labels')!;

  $svg.css('overflow', 'visible');

  const point0 = new Point(x0, evaluateSwimGraph(x0));
  const point1 = new Point(x1, evaluateSwimGraph(x1));

  const point2 = new Point(point1.x, point0.y);

  const position0 = $graph.toViewportCoords(point0);
  const position1 = $graph.toViewportCoords(point1);
  const position2 = $graph.toViewportCoords(point2);

  const _$circle0 = $N('circle', {class: 'slope-measurement', id: 'circle-0', cx: position0.x, cy: position0.y, r: 4}, $overlay);
  const _$circle1 = $N('circle', {class: 'slope-measurement', id: 'circle-1', cx: position1.x, cy: position1.y, r: 4}, $overlay);
  const _$circle2 = $N('circle', {class: 'slope-measurement', id: 'circle-2', cx: position2.x, cy: position2.y, r: 4}, $overlay);

  const _$runLine = $N('line', {class: 'slope-measurement', id: 'run-line', x1: position0.x, x2: position2.x, y1: position0.y, y2: position2.y}, $overlay);
  const _$riseLine = $N('line', {class: 'slope-measurement', id: 'rise-line', x1: position1.x, x2: position2.x, y1: position1.y, y2: position2.y}, $overlay);

  if (showRiseRun) {
    const runText = $N('text', {class: 'slope-measurement', x: (position0.x + position2.x) / 2, y: (position0.y + position2.y) / 2 - 8, 'text-anchor': 'middle', 'alignment-baseline': 'bottom'}, $labels);
    runText.text = 'Run: ' + Math.round((point1.x - point0.x) * 10) / 10;

    const riseText = $N('text', {class: 'slope-measurement', x: (position1.x + position2.x) / 2 + 8, y: (position1.y + position2.y) / 2, 'text-anchor': 'start', 'alignment-baseline': 'middle'}, $labels);
    riseText.text = 'Rise: ' + Math.round((point1.y - point0.y) * 10) / 10;
  }
}

export function measureSlope2($step: Step) {
  const $graph = $step.$('x-coordinate-system')! as CoordinateSystem;

  drawSlopeMeasurements($graph, 0, 21.47);
}

export function measureSlope3($step: Step) {
  const $graph = $step.$('x-coordinate-system')! as CoordinateSystem;

  drawSlopeMeasurements($graph, 0, 1, false);
}

export function swimSystem($step: Step) {
  const $graph = $step.$('x-coordinate-system')! as CoordinateSystem;

  const origin = $graph.toViewportCoords(new Point(0, 0));
  const timeLine = $N('line', {id: 'time-line', x1: origin.x, x2: origin.x, y1: origin.y - 220, y2: origin.y}, $graph.$svg.$('.overlay'));

  const swimmers = [{
    name: 'cielo',
    speed: 2.33,
    $distance: $step.$('#cielo-distance .math mn')
  }, {
    name: 'leveaux',
    speed: 2.19,
    $distance: $step.$('#leveaux-distance .math mn')
  }, {
    name: 'bernard',
    speed: 2.15,
    $distance: $step.$('#bernard-distance .math mn')
  }, {
    name: 'callus',
    speed: 2.06,
    $distance: $step.$('#callus-distance .math mn')
  }
  ];

  $graph.setFunctions(...swimmers.map((swimmer) => {
    return (t: number) => swimmer.speed * t;
  }));

  const $slider = $step.$('x-slider')! as Slider;
  const $timeText = $step.$('#time-variable-text .sentence .math mn')!;

  $slider.on('move', (n: number) => {
    const s = 25 * n / 500;
    $timeText.text = (Math.round(s * 100) / 100).toString();

    const p = $graph.toViewportCoords(new Point(s, 0));
    timeLine.setAttr('x1', p.x);
    timeLine.setAttr('x2', p.x);

    for (const swimmer of swimmers) {
      const d = Math.round(s * swimmer.speed * 10) / 10;
      swimmer.$distance!.text = Math.min(50, d).toString();
    }
  });
}

function renDive(t: number) {
  return 1.4 * Math.pow(t, 3) - 7.6 * Math.pow(t, 2) + 4.5 * t + 10;
}

export function diveGraph($step: Step) {
  const $videoGraph = $step.$('x-video-graph')! as VideoGraph;

  $videoGraph.addPlot((t: number) => t, renDive, '/content/functions/images/ren_face.png');

  {
    const cards = [{
      description: 'Ren stands on the platform',
      imagePath: '/content/functions/images/dive_card_1.png',
      point: new Point(0, 10),
      hint: 'This is the y-intercept.'
    }, {
      description: 'Ren reaches her peak',
      imagePath: '/content/functions/images/dive_card_2.png',
      point: new Point(0.34, 10.7),
      hint: 'This is the maximal turning point.'
    }, {
      description: 'Ren hits the water',
      imagePath: '/content/functions/images/dive_card_4.png',
      point: new Point(1.98, 0),
      hint: 'This is the first x-intercept.'
    }, {
      description: 'Ren turns underwater',
      imagePath: '/content/functions/images/dive_card_5.png',
      point: new Point(3.3, -7.6),
      hint: 'This is the minimal turning point.'
    }, {
      description: 'Ren reaches the surface',
      imagePath: '/content/functions/images/dive_card_6.png',
      point: new Point(4.3, 0),
      hint: 'This is the second x-intercept.'
    }];

    const $cardGraph = $step.$('x-card-graph') as CardGraph;
    $cardGraph.bindStep($step);
    $cardGraph.setPlots([{function: renDive, color: 'red'}]);
    $cardGraph.setCards(cards);
  }
}

export function diveIntervals($step: Step) {
  const cards = [{
    description: 'f(t) is Increasing',
    label: '0<t<0.3',
    point: new Point(0, 8),
    domain: [0.01, 0.33]
  }, {
    description: 'f(t) is Decreasing',
    label: '0.3<t<3.3',
    point: new Point(0, -4),
    domain: [0.33, 3.3]
  }, {
    description: 'f(t) is Increasing',
    label: '3.3<t<4.3',
    point: new Point(0, 4),
    domain: [3.3, 4.3]
  }];

  const $cardGraph = $step.$('x-card-graph') as CardGraph;
  $cardGraph.bindStep($step);
  $cardGraph.setPlots([{function: renDive, color: 'red'}]);
  $cardGraph.setCards(cards);
}

export function poleVault($step: Step) {
  const $drawGraph = $step.$('x-draw-graph')! as DrawGraph;
  const $graph = $drawGraph.$('x-coordinate-system')! as CoordinateSystem;

  const pad1 = $graph.toViewportCoords(new Point(40, 0));
  const pad2 = $graph.toViewportCoords(new Point(45, 0.8));
  $N('rect', {id: 'hint-landing', x: pad1.x, y: pad2.y, width: pad2.x - pad1.x, height: pad1.y - pad2.y}, $drawGraph.$('.hints')!);

  const bar1 = $graph.toViewportCoords(new Point(40, 0));
  const bar2 = $graph.toViewportCoords(new Point(40, 4.5));
  $N('line', {id: 'hint-bar', x1: bar1.x, x2: bar2.x, y1: bar1.y, y2: bar2.y}, $drawGraph.$('.hints')!);

  $drawGraph.bindStep($step);
  $drawGraph.setSolutionFunction((x: number) => 0.8 - 0.8 / (1 + Math.pow(Math.E, (x - 38) * 1)) + 4.05 / (1 + Math.pow((x - 40), 8)));
  $drawGraph.setHintPoints([{
    x: 0.01,
    hint: 'Ekaterina starts at y=0m',
    drawCircle: true
  }, {
    x: 39.5,
    hint: 'The 4.85m crossbar ends the 40m runway',
    relevanceThresholdDistance: 5,
    id: 'hint-bar'
  }, {
    x: 38.2,
    hint: 'Ekaterina shoots upward at about 38m',
    drawCircle: true
  }, {
    x: 40.5,
    hint: 'Ekaterina arches over the 4.85m crossbar',
    drawCircle: true
  }, {
    x: 35,
    hint: 'The pole strikes just past 35m',
    drawLine: true
  }, {
    x: 41.5,
    hint: 'The landing pad is 0.8m high',
    id: 'hint-landing',
    drawLine: true
  }]);
}

export function runningGraph($step: Step) {
  const $videoGraph = $step.$('x-video-graph')! as VideoGraph;

  $videoGraph.addPlot((t: number) => Math.min(t + 88, 121), (t: number) => 6.58545 * t + 3.16101, '/content/functions/images/tracey_face.png');
  $videoGraph.addPlot((t: number) => Math.min(t + 88, 126), (t: number) => 5.71105 * t + 80.4071, '/content/functions/images/boufaarirane_face.png', 'green');
  $videoGraph.addPlot((t: number) => Math.min(t + 88, 120.2), (t: number) => 7.10179 * t - 53.6354, '/content/functions/images/rogers_face.png', 'blue');
}

export function runningCards($step: Step) {
  const cards = [{
    description: 'Boufaarirane is ahead of Rogers.',
    label: 'f(t) > u(t)',
    point: new Point(93, 650),
    domain: [90.5, 96.4]
  }, {
    description: 'Rogers is ahead of Boufaarirane.',
    label: 'f(t) < u(t)',
    point: new Point(110, 750),
    domain: [96.5, 126]
  }, {
    description: 'Tracey is ahead of Rogers.',
    label: 'u(t) < g(t)',
    point: new Point(100, 700),
    domain: [90.5, 110]
  }, {
    description: 'Tracey is ahead of Boufaarirane.',
    label: 'g(t) > f(t)',
    point: new Point(88, 675),
    domain: [90.5, 126]
  }, {
    description: 'Rogers is ahead of Tracey.',
    label: 'g(t) < u(t)',
    point: new Point(115, 790),
    domain: [110, 121]
  }];

  const $cardGraph = $step.$('x-card-graph') as CardGraph;
  $cardGraph.bindStep($step);
  $cardGraph.setPlots([
    {function: (t: number) => 6.58545 * t + 3.16101, color: 'red'},
    {function: (t: number) => 5.71105 * t + 80.4071, color: 'green'},
    {function: (t: number) => 7.10179 * t - 53.6354, color: 'blue'}
  ]);
  $cardGraph.setCards(cards);
}

export function piecewiseIntro($step: Step) {
  ($step.$('#graph1')! as CoordinateSystem).drawLinePlot([new Point(0, 0), new Point(20, 0.5), new Point(40, 3.5), new Point(60, 5)]);
  ($step.$('#graph2')! as CoordinateSystem).drawLinePlot([new Point(0, 0), new Point(5, 2), new Point(40, 3), new Point(60, 5)]);
  ($step.$('#graph3')! as CoordinateSystem).drawLinePlot([new Point(0, 0), new Point(10, 2), new Point(35, 4), new Point(60, 5)]);
  ($step.$('#graph4')! as CoordinateSystem).drawLinePlot([new Point(0, 0), new Point(30, 0.5), new Point(50, 2), new Point(60, 5)]);

  const picker = $step.$('x-picker')!;
  const children = shuffle(picker.children);
  picker.removeChildren();
  while (children.length) {
    picker.append(children.pop()!);
  }
}

export function piecewiseDefinition($step: Step) {
  const $graph = $step.$('x-coordinate-system')! as CoordinateSystem;
  const $plot = $step.$('.plot')!;

  const a = $graph.toViewportCoords(new Point(0, 0));
  const b = $graph.toViewportCoords(new Point(20, 0.5));
  const c = $graph.toViewportCoords(new Point(40, 3.5));
  const d = $graph.toViewportCoords(new Point(60, 5));

  const _$line1 = $N('line', {id: 'line1', target: 'line1', x1: a.x, x2: b.x, y1: a.y, y2: b.y}, $plot);
  const _$line2 = $N('line', {id: 'line2', target: 'line2', x1: b.x, x2: c.x, y1: b.y, y2: c.y}, $plot);
  const _$line3 = $N('line', {id: 'line3', target: 'line3', x1: c.x, x2: d.x, y1: c.y, y2: d.y}, $plot);
}

export function piecewiseEndpoints($step: Step) {
  const $graph = $step.$('x-coordinate-system') as CoordinateSystem;
  const $plot = $N('g', {class: 'plot'}, $graph.$overlay);

  {
    const a = $graph.toViewportCoords(new Point(0, 1 / 40));
    const b = $graph.toViewportCoords(new Point(20, 1 / 40));

    const $g = $N('g', {class: 'red', id: 'swim'}, $plot);
    $N('text', {x: (a.x + b.x) / 2, y: a.y - 10}, $g).text = 'Swim';
    $N('line', {x1: a.x + 4, x2: b.x - 4, y1: a.y, y2: b.y}, $g);
    $N('circle', {class: 'closed', target: 'closed', cx: a.x, cy: a.y, r: 4}, $g);
    $N('circle', {class: 'open', target: 'open', cx: b.x, cy: b.y, r: 4}, $g);
  }
  {
    const a = $graph.toViewportCoords(new Point(20, 6 / 40));
    const b = $graph.toViewportCoords(new Point(40, 6 / 40));

    const $g = $N('g', {class: 'blue', id: 'bike'}, $plot);
    $N('text', {x: (a.x + b.x) / 2, y: a.y - 10}, $g).text = 'Bike';
    $N('line', {x1: a.x + 4, x2: b.x - 4, y1: a.y, y2: b.y}, $g);
    $N('circle', {class: 'closed', target: 'closed', cx: a.x, cy: a.y, r: 4}, $g);
    $N('circle', {class: 'open', target: 'open', cx: b.x, cy: b.y, r: 4}, $g);
  }
  {
    const a = $graph.toViewportCoords(new Point(40, 3 / 40));
    const b = $graph.toViewportCoords(new Point(60, 3 / 40));

    const $g = $N('g', {class: 'green', id: 'run'}, $plot);
    $N('text', {x: (a.x + b.x) / 2, y: a.y - 10}, $g).text = 'Run';
    $N('line', {x1: a.x + 4, x2: b.x - 4, y1: a.y, y2: b.y}, $g);
    $N('circle', {class: 'closed', target: 'closed', cx: a.x, cy: a.y, r: 4}, $g);
    $N('circle', {class: 'closed', target: 'closed', cx: b.x, cy: b.y, r: 4}, $g);
  }

  return;
  // Disabling VLT for now

  const $verticalLine = $N('line', {class: 'vertical-line', x1: 0, x2: 0, y1: $graph.viewportBounds.yMin, y2: $graph.viewportBounds.yMax}, $graph.$overlay);
  $verticalLine.hide();

  pointerOver($graph.$svg, {
    enter: () => $verticalLine.show(),
    move: (p) => {
      $verticalLine.setAttr('x1', p.x);
      $verticalLine.setAttr('x2', p.x);
    },
    exit: () => $verticalLine.hide()
  });
}

export function endpoints1($step: Step) {
  const $puzzle = $step.$('x-piecewise-endpoint-puzzle')! as PiecewiseEndpointPuzzle;

  $puzzle.bindStep($step);

  $puzzle.setSegments([{
    point0: new Point(1, 3),
    point1: new Point(10, 3),
    include0: true,
    include1: false
  }]);
}

export function endpoints2($step: Step) {
  const $puzzle = $step.$('x-piecewise-endpoint-puzzle')! as PiecewiseEndpointPuzzle;

  $puzzle.bindStep($step);

  $puzzle.setSegments([{
    point0: new Point(1, 4),
    point1: new Point(6, 4),
    include0: false,
    include1: true
  }, {
    point0: new Point(6, 2),
    point1: new Point(10, 2),
    include0: false,
    include1: true
  }]);
}

export function endpoints3($step: Step) {
  const $puzzle = $step.$('x-piecewise-endpoint-puzzle')! as PiecewiseEndpointPuzzle;

  $puzzle.bindStep($step);

  $puzzle.setSegments([{
    point0: new Point(1, 2),
    point1: new Point(3, 2),
    include0: false,
    include1: true
  }, {
    point0: new Point(3, 5),
    point1: new Point(7, 5),
    include0: false,
    include1: false
  }, {
    point0: new Point(7, 3),
    point1: new Point(10, 3),
    include0: false,
    include1: true
  }]);
}

export function endpoints4($step: Step) {
  const $puzzle = $step.$('x-piecewise-endpoint-puzzle')! as PiecewiseEndpointPuzzle;

  $puzzle.bindStep($step);

  $puzzle.setSegments([{
    point0: new Point(1, 3),
    point1: new Point(3, 3)
  }, {
    point0: new Point(3, 1),
    point1: new Point(5, 1)
  }, {
    point0: new Point(5, 5),
    point1: new Point(8, 5)
  }, {
    point0: new Point(8, 4),
    point1: new Point(10, 4)
  }]);
}

export function piecewiseData($step: Step) {
  piecewiseEndpoints($step);
}

export function triathlonGraph($step: Step) {
  const $drawGraph = $step.$('x-draw-graph')! as DrawGraph;
  const $graph = $drawGraph.$('x-coordinate-system')! as CoordinateSystem;

  const bikeStart = $graph.toViewportCoords(new Point(0, 2));
  const runStart = $graph.toViewportCoords(new Point(125, 42));
  const raceEnd = $graph.toViewportCoords(new Point(125, 52));

  const $lines = $N('g', {});
  $graph.$('.grid')!.insertAfter($lines);

  $N('line', {class: 'transition-line', x1: bikeStart.x, x2: runStart.x, y1: bikeStart.y, y2: bikeStart.y}, $lines);
  $N('line', {class: 'transition-line', x1: bikeStart.x, x2: runStart.x, y1: runStart.y, y2: runStart.y}, $lines);
  $N('line', {class: 'transition-line', x1: bikeStart.x, x2: runStart.x, y1: raceEnd.y, y2: raceEnd.y}, $lines);

  $drawGraph.bindStep($step);

  $drawGraph.setSolutionFunction((x: number) => {
    if (x < 25) {
      return 2 / 25 * x;
    }
    if (x < 85) {
      const p = (x - 25) / (85 - 25);
      return lerp(2, 42, p);
    }
    if (x < 125) {
      const p = (x - 85) / (125 - 85);
      return lerp(42, 52, p);
    }
    return 52;
  });

  $drawGraph.setHintPoints([{
    x: 0.01,
    hint: 'The race begins at (0, 0)',
    relevanceThresholdDistance: 0,
    drawCircle: true
  }, {
    x: 25,
    hint: 'The transition to biking happens at t=25',
    relevanceThresholdDistance: 0,
    drawLine: true
  }, {
    x: 85,
    hint: 'The transition to running happens at t=85',
    drawLine: true
  }, {
    x: 125,
    hint: 'The race ends at t=125',
    drawLine: true
  }]);
}

export function absoluteValue($step: Step) {
  const $pong = $step.$('x-pong') as Pong;
  $pong.bindStep($step);
}

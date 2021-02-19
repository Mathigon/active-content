// =============================================================================
// Functions
// (c) Mathigon
// =============================================================================


import '../shared/components/relation';
import {Point} from '@mathigon/euclid';
import {Geopad, GeoPoint, Step} from '../shared/types';
import { $N, animate, ease, ElementView, pointerOver, SVGParentView, svgPointerPosn } from '@mathigon/boost';
import { Burst } from '../shared/components/burst';
import { last, stringDistance } from '@mathigon/core';
import '../shared/components/function-machine';
import { FunctionMachine } from '../shared/components/function-machine';

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

    var burstType: string;

    if (index < 0) {
      $step.addHint('incorrect');
      point.$el.addClass('red');
      point.lock();
      burstType = 'burst incorrect';

      animate((p) => {
        const q = Math.sqrt(ease('bounce-in', 1-p));
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
    })
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
    '0': '',
    '1': 'Lynch',
    '2': 'Switch',
    '3': 'Derwent',
    '4': 'Zabini',
    '5': 'Clearwater'
  }

  const houseMappings: Record<string, string> = {
    '0': '',
    '1': 'Lionpaw',
    '2': 'Eaglewing',
    '3': 'Badgerclaw',
    '4': 'Serpentfang'
  }

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
    const $verticalLineSegment = $N('line', {x1: 0, x2: 0, y1: 0, y2: $plot.height}, $verticalLine);
    const $verticalLineLabel = $N('text', {x: 0, y: -2, 'text-anchor': 'middle'}, $verticalLine);

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

      const $label = $N('text', {transform: `translate(${position.x+10}, ${position.y+10})`}, $labels);
      $label.text = `(${Math.round(coord.x*10)/10}, ${Math.round(coord.y*10)/10})`;
      $label.hide();

      return {
        coord,
        $el: point.$el,
        $label,
      }
    });

    $verticalLine.hide();

    pointerOver($svg, {
      enter: () => $verticalLine.show(),
      move: (point) => {
        console.log(point)
        // Transform viewport-space point to geopad coordinate
        const pointerCoord = $geopad.toPlotCoords(point);

        // Sort relation values by proximity to pointer X, then grab all points with that X
        relationValues.sort((a, b) => Math.abs(a.coord.x-pointerCoord.x)-Math.abs(b.coord.x-pointerCoord.x));
        const closestPoints = relationValues.filter((value) => value.coord.x == relationValues[0].coord.x);

        // Hide all labels
        for (const value of relationValues)
          value.$label.hide();

        // Are we close enough to snap to the closest point(s)?
        let snapCoord = pointerCoord;
        if (Math.abs(closestPoints[0].coord.x-pointerCoord.x) < 0.5) {
          snapCoord = closestPoints[0].coord;

          // Show labels for snapped points
          for (const value of closestPoints)
            value.$label.show();
        }

        // Transform coordinate back to pixel space
        const snapPoint = $geopad.toViewportCoords(snapCoord);

        // Set position of our line and the text of our x-value label
        $verticalLine.setAttr('transform', `translate(${snapPoint.x}, 0)`);
        $verticalLineLabel.text = `x = ${Math.round(snapCoord.x*10)/10}`;
      },
      exit: () => {
        $verticalLine.hide()

        // Hide all labels, in case any are showing when pointer exits the SVG
        for (const value of relationValues)
          value.$label.hide();
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
    
    const $svg = $xSquaredPlot.$svg;
    const $point = $xSquaredPlot.drawPoint(new Point(input, output));

    const burstElement = $N('g', {class: 'burst'}, $xSquaredPlot.$svg);
    const burst = new Burst(burstElement as SVGParentView, 10);
    burst.play(1000, [$point.$el.center.x, $point.$el.center.y], [5, 25]).then(() => {
      burstElement.remove();
    });
  });
}

function clickPlotter($step: Step, $geopad: Geopad, plotFunction: Function) {
  const $svg = $geopad.$svg;
  const $axes = $svg.$('.axes')!;

  const requiredCount = parseInt($geopad.attr('count') || '0');
  let pointCount = 0;

  $geopad.locked = true;
  const lineTop = $axes.positionTop-$svg.positionTop;

  const $paths = $svg.$('.paths')!;
  const $verticalLine = $N('g', {class: 'verticalLine', transform: `translate(50, ${lineTop})`}, $paths);
  const $verticalLineSegment = $N('line', {x1: 0, x2: 0, y1: 0, y2: $axes.height}, $verticalLine);
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

      if (pointCount == requiredCount)
        $step.score('plotPoints');
      else if (pointCount < requiredCount)
        $step.addHint('plot-points-more');  
    }
  });

  pointerOver($svg, {
    enter: () => $verticalLine.show(),
    move: (point) => {
      const pointerCoord = $geopad.toPlotCoords(point);

      $verticalLine.setAttr('transform', `translate(${point.x}, ${lineTop})`);
      $verticalLineLabel.text = `x = ${Math.round(pointerCoord.x*10)/10}`;
    },
    exit: () => $verticalLine.hide()
  });
}

export function numericalPlot($step: Step) {
  const $geopad = $step.$('x-geopad')! as Geopad;
  clickPlotter($step, $geopad, (x: number) => x*x);
}
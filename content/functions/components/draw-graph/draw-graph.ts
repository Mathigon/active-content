// =============================================================================
// Draw Graph Component
// (c) Mathigon
// =============================================================================

import {Step} from '@mathigon/studio';
import {$N, CustomElementView, ElementView, register, slide, SVGView} from '@mathigon/boost';
import {last} from '@mathigon/core';
import {Point} from '@mathigon/euclid';
import {clamp, lerp} from '@mathigon/fermat';
import {CoordinateSystem} from '../../../shared/types';

// TODO: Import d3 helpers for curvy paths
// import { path as d3path, line as d3line, curveMonotoneX } from 'd3';

type PlotPoint = {
    point: Point,
    position: Point,
    $el: SVGView,
}

type HintPoint = {
    x: number,
    hint: string,
    id?: string,
    relevanceThresholdDistance?: number,
    $el?: ElementView,
    $g?: ElementView,
    drawCircle?: boolean,
    drawLine?: boolean,
    revealed?: boolean,
}

function unlerp(a: number, b: number, t: number) {
  return (t - a) / (b - a);
}

@register('x-draw-graph')
export class DrawGraph extends CustomElementView {
    private $graph!: CoordinateSystem;
    private $hints!: ElementView;
    private $solution!: ElementView;
    private $plot!: ElementView;

    private points: PlotPoint[] = [];
    private hintPoints: HintPoint[] = [];
    private scored = false;
    private firstHint = true;

    private $step?: Step;
    private scoreThreshold = 0;
    private snap: Point = new Point(0, 0);

    private solutionFunction!: (x: number) => number;

    private $submitButton!: ElementView;

    private $scoreContainer!: ElementView;
    private $scores!: ElementView[];

    private $judgeText!: ElementView;

    ready() {
      // Parse attributes
      this.scoreThreshold = this.attr('score-threshold') ?
            Number.parseFloat(this.attr('score-threshold')) : 0.95;

      let snapString = this.attr('snap');
      if (snapString) {
        // Surely there is an existing method for parsing these strings to points?
        snapString = snapString.replace('(', '');
        snapString = snapString.replace(')', '');
        const snapNumbers = snapString.split(',');
        if (snapNumbers.length == 1) {
          const snapNumber = Number.parseFloat(snapNumbers[0].trim());
          this.snap = new Point(snapNumber, snapNumber);
        } else {
          const x = Number.parseFloat(snapNumbers[0].trim());
          const y = Number.parseFloat(snapNumbers[1].trim());
          this.snap = new Point(x, y);
        }
      }

      // Set up judge text
      this.$judgeText = this.$('.judge-text')!;
      const refreshJudgeText = () => {
        if (this.points.length < 2) {
          this.$judgeText.text = 'Add points to your graph.';
        } else if (!this.scored) {
          this.$judgeText.text = 'Judges are ready!';
        }
      };
      refreshJudgeText();

      // Set up score card container
      this.$scores = [];
      this.$scoreContainer = this.$('.scores')!;
      this.hideScoreCards();

      // Create score cards
      for (let i = 0; i < 3; i++) {
        const $score = $N('div', {style: `transition: ${0.2 * (i + 1)}s;`}, this.$scoreContainer);
        $N('div', {}, $score);
        this.$scores.push($score);
      }

      // Set up submit button
      this.$submitButton = this.$('button')!;
      this.$submitButton.on('click', this.submit.bind(this));
      this.refreshSubmitButton();

      // Set up graph
      this.$graph = this.$('x-coordinate-system') as CoordinateSystem;

      const $svg = this.$graph.$svg;
      const $overlay = this.$graph.$overlay;
      this.$plot = this.$('.plot')!;
      this.$solution = $N('g', {class: 'solution'});
        this.$('.grid')!.insertAfter(this.$solution);
        this.$hints = $N('g', {class: 'hints'}, $overlay);
        const _$plotPath = $N('path', {class: 'plot-path'}, $overlay);
        const $plotPoints = $N('g', {class: 'plot-points'}, $overlay);

        const redrawPath = () => {
          this.points.sort((a, b) => a.point.x - b.point.x);

          last(this.$plot.children)?.remove();

          this.$graph.drawLinePlot(this.points.map(p => p.point));

          // TODO: Curvy paths
          //            const plotPath = d3line().curve(curveMonotoneX);
          //            $plotPath.setAttr('d', plotPath(this.points.map(p => [p.position.x, p.position.y])));
        };

        let engagingPoint = false;
        let placingPoint: PlotPoint | null = null;

        const graphModified = () => {
          this.scored = false;
          this.hideSolution();
          this.hideScoreCards();
          this.refreshSubmitButton();
          refreshJudgeText();
          redrawPath();
        };

        slide($svg, {
          down: (p) => {
            if (engagingPoint) {
              return;
            }

            const clickPosition = this.bindViewportPoint(p);
            const clickPoint = this.$graph.toPlotCoords(clickPosition);

            const $point = $N('circle', {transform: `translate(${clickPosition.x}, ${clickPosition.y})`, r: 6, class: 'plot-point'}, $plotPoints) as SVGView;

            const plotPoint = {
              point: clickPoint,
              position: clickPosition,
              $el: $point
            };
            placingPoint = plotPoint;

            this.points.push(plotPoint);

            slide($point, {
              down: () => {
                engagingPoint = true;
              },
              move: (position) => {
                position = this.bindViewportPoint(position);
                let point = this.$graph.toPlotCoords(position);

                const x = this.snap.x <= 0 ? point.x : Math.round(point.x / this.snap.x) * this.snap.x;
                const y = this.snap.y <= 0 ? point.y : Math.round(point.y / this.snap.y) * this.snap.y;

                point = new Point(x, y);
                position = this.$graph.toViewportCoords(point);

                plotPoint.position = position;
                plotPoint.point = point;

                $point.setAttr('transform', `translate(${position.x}, ${position.y})`);

                graphModified();
              },
              up: () => {
                engagingPoint = false;
              },
              click: () => {
                const i = this.points.indexOf(plotPoint);
                this.points.splice(i, 1);
                $point.remove();

                graphModified();
              }
            });

            graphModified();
          },
          move: (position) => {
            if (placingPoint) {
              position = this.bindViewportPoint(position);
              let point = this.$graph.toPlotCoords(position);

              const x = this.snap.x <= 0 ? point.x : Math.round(point.x / this.snap.x) * this.snap.x;
              const y = this.snap.y <= 0 ? point.y : Math.round(point.y / this.snap.y) * this.snap.y;

              point = new Point(x, y);
              position = this.$graph.toViewportCoords(point);

              placingPoint.point = point;
              placingPoint.position = position;

              placingPoint.$el.setAttr('transform', `translate(${position.x}, ${position.y})`);

              redrawPath();
            }
          },
          up: () => {
            placingPoint = null;
          }
        });
    }

    bindStep($step: Step) {
      this.$step = $step;
    }

    setHintPoints(hintPoints: HintPoint[]) {
      this.hintPoints = hintPoints;
      for (const hintPoint of hintPoints) {
        hintPoint.$g = $N('g', {show: false}, this.$hints);

        if (hintPoint.id) {
          hintPoint.$el = this.$('#' + hintPoint.id);
        }

        if (hintPoint.drawLine) {
          const p1 = this.$graph.toViewportCoords(new Point(hintPoint.x, this.$graph.plotBounds.yMin));
          const p2 = this.$graph.toViewportCoords(new Point(hintPoint.x, this.$graph.plotBounds.yMax));
          $N('line', {class: 'hint-line', show: false, x1: p1.x, x2: p2.x, y1: p1.y, y2: p2.y}, hintPoint.$g);
        }
        if (hintPoint.drawCircle) {
          const c = this.$graph.toViewportCoords(new Point(hintPoint.x, this.solutionFunction(hintPoint.x)));
          $N('circle', {class: 'hint-circle', show: false, cx: c.x, cy: c.y, r: 6}, hintPoint.$g);
        }
      }
    }

    setSolutionFunction(solutionFunction: (x: number) => number) {
      this.solutionFunction = solutionFunction;
      this.$graph.setFunctions(solutionFunction);

      const $plot = this.$plot.children[0];

      this.$solution.append($plot);
      $plot.addClass('blue');
      this.$solution.setAttr('show', false);
      this.$solution.addClass('plot');
    }

    hideSolution() {
      this.$solution.setAttr('show', false);
    }

    showSolution() {
      this.$solution.setAttr('show', true);
    }

    hideScoreCards() {
      this.$scoreContainer.setAttr('show', false);
    }

    showScoreCards() {
      this.$scoreContainer.setAttr('show', true);
    }

    refreshSubmitButton() {
      if (this.points.length < 2 || this.scored) {
        this.$submitButton.setAttr('disabled', true);
      } else {
        this.$submitButton.removeAttr('disabled');
      }
    }

    // Constrain a point within plot bounds
    bindPlotPoint(point: Point) {
      const bounds = this.$graph.plotBounds;

      const x = clamp(point.x, bounds.xMin, bounds.xMax);
      const y = clamp(point.y, bounds.yMin, bounds.yMax);

      return new Point(x, y);
    }

    // Constrain a point within viewport bounds
    bindViewportPoint(point: Point) {
      const bounds = this.$graph.viewportBounds;

      const x = clamp(point.x, bounds.xMin, bounds.xMax);
      const y = clamp(point.y, bounds.yMin, bounds.yMax);

      return new Point(x, y);
    }

    // Sample user graph in plot space
    sampleUserGraph(x: number) {
      if (this.points.length == 0) {
        return 0;
      }

      // Grab points from beginning and end of user plot
      const firstPlotPoint = this.points[0];
      const lastPlotPoint = this.points[this.points.length - 1];

      // Create virtual "leading and trailing" points at beginning and end of graph
      let leadingPoint = this.bindPlotPoint(new Point(Number.NEGATIVE_INFINITY, firstPlotPoint.point.y));
      let trailingPoint = this.bindPlotPoint(new Point(Number.POSITIVE_INFINITY, lastPlotPoint.point.y));

      // Ensure leading/trailing points lie outside min/max possible input x values (prevents errors when plot points lie on viewport bounds)
      leadingPoint = new Point(leadingPoint.x - 1, leadingPoint.y);
      trailingPoint = new Point(trailingPoint.x + 1, trailingPoint.y);

      // Start off by feeding the leading point into the point pair
      let pointA: Point;
      let pointB: Point = leadingPoint;

      let pointsFound = false;

      // Loop over each consecutive pair of points to find A/B pair that bounds x
      for (let i = 0; i < this.points.length; i++) {
        // Shift to next point pair
        pointA = pointB;
        pointB = this.points[i].point;

        // If x is now less than point B, x is between A and B (so we can stop)
        if (x <= pointB.x) {
          pointsFound = true;
          break;
        }
      }

      // If above loop did not establish point pair, x must be between last point and trailing point
      if (!pointsFound) {
        pointA = lastPlotPoint.point;
        pointB = trailingPoint;
      }

      // Unlerp x from within A/B
      const p = unlerp(pointA!.x, pointB.x, x);

      // Lerp between A/B to get y value
      return lerp(pointA!.y, pointB.y, p);
    }

    computeError() {
      const height = this.$graph.viewportBounds.yMax;
      const width = this.$graph.viewportBounds.xMax;

      // Accumulate difference between user and solution functions, measured in pixels
      // (basically we are integrating here)
      let errorArea = 0;
      for (let i = 0; i < width; i++) {
        const x = this.$graph.toPlotCoords(new Point(i, 0)).x;

        const userY = this.sampleUserGraph(x);
        const solutionY = this.solutionFunction(x);

        const userPoint = new Point(x, userY);
        const solutionPoint = new Point(x, solutionY);

        const userPosition = this.$graph.toViewportCoords(userPoint);
        const solutionPosition = this.$graph.toViewportCoords(solutionPoint);

        const error = Math.abs(userPosition.y - solutionPosition.y);
        errorArea += error;
      }

      // Total viewport area in pixels
      const totalArea = width * height;

      // Return fraction of error area compared to total viewport area
      return errorArea / totalArea;
    }

    // Estimates closest point on the user graph to a given point
    computeClosestUserGraphPoint(point: Point) {
      const width = this.$graph.viewportBounds.xMax;

      let minimumDistance = Number.POSITIVE_INFINITY;
      let userGraphPosition: Point = new Point();

      for (let i = 0; i < width; i++) {
        const x = this.$graph.toPlotCoords(new Point(i, 0)).x;

        const y = this.sampleUserGraph(x);
        const p = new Point(x, y);

        const v = p.subtract(point);
        const d = v.length;

        if (d < minimumDistance) {
          minimumDistance = d;
          userGraphPosition = p;
        }
      }

      return userGraphPosition;
    }

    selectRelevantHint() {
      if (this.hintPoints.length == 0) {
        return null;
      }

      const hints = this.hintPoints.map((hintPoint) => {
        const point = new Point(hintPoint.x, this.solutionFunction(hintPoint.x));
        const userGraphPoint = this.computeClosestUserGraphPoint(point);

        const position = this.$graph.toViewportCoords(point);
        const userGraphPosition = this.$graph.toViewportCoords(userGraphPoint);

        const vector = userGraphPoint.subtract(point);
        const distance = vector.length;

        const viewportVector = userGraphPosition.subtract(position);
        const viewportDistance = viewportVector.length;

        return {
          hintPoint,
          relevanceThresholdDistance: hintPoint.relevanceThresholdDistance || 8,
          point,
          userGraphPoint,
          position,
          userGraphPosition,
          vector,
          distance,
          viewportVector,
          viewportDistance
        };
      });

      // Sort hints in descending order of pixel distance from user graph
      hints.sort((a, b) => b.viewportDistance - a.viewportDistance);

      // Remove any hints that are below their "relevance threshold distance" or already revealed
      const relevantHints = hints.filter((hint) => !hint.hintPoint.revealed && hint.relevanceThresholdDistance < hint.viewportDistance);

      if (relevantHints.length == 0) {
        return null;
      }

      return relevantHints[0].hintPoint;
    }

    submit() {
      this.scored = true;

      this.$judgeText.text = 'Judges say:';

      const error = this.computeError();
      const score = Math.pow(1 - error, 4);

      if (this.$step) {
        this.$step.score('submit');

        const hintPoint = this.selectRelevantHint();

        if (this.scoreThreshold < score) {
          this.$solution.setAttr('show', true);

          this.$step.addHint('correct');
          this.$step.score('submitCorrect');
        } else if (hintPoint) {
          this.$step.addHint(hintPoint.hint);

          if (this.firstHint) {
            this.$step.addHint('Try again!');
            this.firstHint = false;
          }

          hintPoint.revealed = true;
          hintPoint.$el?.setAttr('show', true);
          hintPoint.$g?.setAttr('show', true);
        } else {
          this.$solution.setAttr('show', true);

          this.$step.addHint('Close!');
        }
      }

      for (const $score of this.$scores) {
        const cardScore = Math.round(score * 100 - Math.random() * 10) / 10;
            $score.$('div')!.text = cardScore.toString();
      }

      this.refreshSubmitButton();
      this.showScoreCards();
    }
}

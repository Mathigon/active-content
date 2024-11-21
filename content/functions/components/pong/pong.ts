// =============================================================================
// Pong Component
// (c) Mathigon
// =============================================================================

import {Step} from '@mathigon/studio';
import {$N, animate, CustomElementView, ElementView, register, slide} from '@mathigon/boost';
import {Point} from '@mathigon/euclid';
import {CoordinateSystem} from '../../../shared/types';
import {clamp, lerp} from '@mathigon/fermat';
import {wait} from '@mathigon/core';

@register('x-pong')
export class Pong extends CustomElementView {
    private $graph!: CoordinateSystem;
    private $step?: Step;

    private $paddle!: ElementView;
    private $ball!: ElementView;
    private $ballArrow!: ElementView;
    private $bounceLineA!: ElementView;
    private $bounceLineB!: ElementView;

    private ballOriginPoint!: Point;
    private ballOriginPosition!: Point;

    private ballStrikePoint!: Point;
    private ballStrikePosition!: Point;

    private ballBouncePoint!: Point;
    private ballBouncePosition!: Point;

    private paddleMinPoint!: Point;
    private paddleMinPosition!: Point;

    private paddleMaxPoint!: Point;
    private paddleMaxPosition!: Point;

    ready() {
      const $graph = this.$('x-coordinate-system') as CoordinateSystem;
      this.$graph = $graph;

      const paddleOriginPoint = new Point($graph.plotBounds.xMax, ($graph.plotBounds.yMax + $graph.plotBounds.yMin) / 2);
      const paddleOriginPosition = $graph.toViewportCoords(paddleOriginPoint);

      const paddlePixelSize = $graph.viewportBounds.dy / 10;
      const paddlePixelRadius = paddlePixelSize / 2;

      const paddleMinPoint = new Point($graph.plotBounds.xMax, $graph.plotBounds.yMin);
      const paddleMinPosition = $graph.toViewportCoords(paddleMinPoint);
      this.paddleMinPoint = paddleMinPoint;
      this.paddleMinPosition = paddleMinPosition;

      const paddleMaxPoint = new Point($graph.plotBounds.xMax, $graph.plotBounds.yMax);
      const paddleMaxPosition = $graph.toViewportCoords(paddleMaxPoint);
      this.paddleMaxPoint = paddleMaxPoint;
      this.paddleMaxPosition = paddleMaxPosition;

      const $paddle = $N('g', {class: 'paddle', transform: `translate(${paddleOriginPosition.x},${paddleOriginPosition.y})`}, $graph.$overlay);
      this.$paddle = $paddle;

      const _$paddleLine = $N('line', {x1: 0, x2: 0, y1: -paddlePixelRadius, y2: paddlePixelRadius}, $paddle);

      const $ballArrow = $N('g', {class: 'arrow'}, $graph.$overlay);
      $N('line', {class: 'shaft', x1: 0, y1: 0, x2: 40, y2: 0}, $ballArrow);
      $N('line', {class: 'head', x1: 40, y1: 0, x2: 35, y2: 5}, $ballArrow);
      $N('line', {class: 'head', x1: 40, y1: 0, x2: 35, y2: -5}, $ballArrow);
      this.$ballArrow = $ballArrow;

      this.$bounceLineA = $N('line', {class: 'bounce'}, $graph.$overlay);
      this.$bounceLineB = $N('line', {class: 'bounce'}, $graph.$overlay);

      const $ball = $N('circle', {class: 'ball', r: 10}, $graph.$overlay);
      this.$ball = $ball;

      this.reset();

      slide($graph.$svg, {
        down: () => {
          // Begin sliding
        },
        move: (position) => {
          const y = clamp(position.y, paddleMinPosition.y + paddlePixelRadius, paddleMaxPosition.y - paddlePixelRadius);
          $paddle.setAttr('transform', `translate(${paddleOriginPosition.x},${y})`);
        },
        up: () => {
          this.launch();
        }
      });
    }

    reset() {
      const $graph = this.$graph;

      // Point where ball will strike the paddle-side wall
      const ballStrikePoint = new Point(this.paddleMaxPoint.x, lerp(this.paddleMinPoint.y, this.paddleMaxPoint.y, Math.random() * 0.8));

      // Point where ball will bounce on floor
      const ballBouncePoint = new Point(lerp($graph.plotBounds.xMin, $graph.plotBounds.xMax, Math.random() * 0.8 + 0.1), 0);
      const ballBouncePosition = $graph.toViewportCoords(ballBouncePoint);

      // Vector and slope for the line from the bounce point to the strike point
      const path1Vector = ballStrikePoint.subtract(ballBouncePoint);
      const path1Slope = path1Vector.y / path1Vector.x;

      // Slope for the line from the ball origin to the bounce point
      const path0Slope = -path1Slope;

      // Minimum possible ball origin point on the left-side wall
      const minOriginX = $graph.plotBounds.xMin;
      const minOriginVectorX = minOriginX - ballBouncePoint.x;
      const minOriginVectorY = minOriginVectorX * path0Slope;
      const minOriginVector = new Point(minOriginVectorX, minOriginVectorY);
      const minOriginPoint = ballBouncePoint.add(minOriginVector);

      // Minimum possible ball origin point factoring in the ceiling
      const cappedOriginY = Math.min($graph.plotBounds.yMin, minOriginPoint.y);
      const cappedOriginVectorY = cappedOriginY;
      const cappedOriginVectorX = cappedOriginVectorY / path0Slope;
      const cappedOriginVector = new Point(cappedOriginVectorX, cappedOriginVectorY);
      const cappedOriginPoint = ballBouncePoint.add(cappedOriginVector);
      const cappedOriginPosition = $graph.toViewportCoords(cappedOriginPoint);

      // Ball origin is selected as a random point between bounce point and capped origin point
      const lerpFactor = Math.random() * 0.8 + 0.2;
      const ballOriginPoint = new Point(lerp(ballBouncePoint.x, cappedOriginPoint.x, lerpFactor), lerp(ballBouncePoint.y, cappedOriginPoint.y, lerpFactor));
      const ballOriginPosition = $graph.toViewportCoords(ballOriginPoint);

      // Debugging markers
      // const $bouncePoint = $N('circle', {class: 'bounce', cx: ballBouncePosition.x, cy: ballBouncePosition.y, r: 10}, $graph.$overlay);
      // const $strikePoint = $N('circle', {class: 'strike', cx: ballStrikePosition.x, cy: ballStrikePosition.y, r: 10}, $graph.$overlay);
      // const $minPoint = $N('circle', {class: 'strike', cx: cappedOriginPosition.x, cy: cappedOriginPosition.y, r: 10}, $graph.$overlay);

      this.ballOriginPoint = ballOriginPoint;
      this.ballStrikePoint = ballStrikePoint;
      this.ballBouncePoint = ballBouncePoint;

      const ballDirection = cappedOriginVector.flip.unitVector;

      const arrowAngle = Math.atan2(ballDirection.x, -ballDirection.y) * 180 / Math.PI;
      this.$ballArrow.setAttr('transform', `translate(${ballOriginPosition.x}, ${ballOriginPosition.y}) rotate(${arrowAngle})`);

      this.$ball.setAttr('cx', ballOriginPosition.x);
      this.$ball.setAttr('cy', ballOriginPosition.y);

      this.$bounceLineA.setAttr('x1', cappedOriginPosition.x);
      this.$bounceLineA.setAttr('y1', cappedOriginPosition.y);

      this.$bounceLineA.setAttr('x2', ballOriginPosition.x);
      this.$bounceLineA.setAttr('y2', ballOriginPosition.y);

      this.$bounceLineB.setAttr('x1', ballBouncePosition.x);
      this.$bounceLineB.setAttr('y1', ballBouncePosition.y);

      this.$bounceLineB.addClass('hide');
    }

    async launch() {
      this.addClass('launched');

      const traverse = async (pointA: Point, pointB: Point, speed: number, $line: ElementView) => {
        const duration = pointA.subtract(pointB).length / speed;

        await animate((p) => {
          const point = new Point(lerp(pointA.x, pointB.x, p), lerp(pointA.y, pointB.y, p));
          const position = this.$graph.toViewportCoords(point);

          this.$ball.setAttr('cx', position.x);
          this.$ball.setAttr('cy', position.y);

          $line.setAttr('x2', position.x);
          $line.setAttr('y2', position.y);
        }, duration * 1000).promise;
      };

      this.$bounceLineB.addClass('hide');
      await traverse(this.ballOriginPoint, this.ballBouncePoint, 10, this.$bounceLineA);

      this.$bounceLineB.removeClass('hide');
      await traverse(this.ballBouncePoint, this.ballStrikePoint, 10, this.$bounceLineB);

      await wait(100);

      this.removeClass('launched');
      this.reset();
    }

    bindStep($step: Step) {
      this.$step = $step;
    }
}

// =============================================================================
// Piecewise Endpoint Puzzle Component
// (c) Mathigon
// =============================================================================

import {Step} from '@mathigon/studio';
import {$N, CustomElementView, ElementView, register, SVGParentView, SVGView} from '@mathigon/boost';
import {wait} from '@mathigon/core';
import {Point} from '@mathigon/euclid';
import {Burst} from '../../../shared/components/burst';
import {CoordinateSystem} from '../../../shared/types';

type Segment = {
    point0: Point,
    point1: Point,
    include0?: boolean,
    include1?: boolean,
    $line?: SVGView,
    $text?: SVGView,
    end0?: Endpoint,
    end1?: Endpoint,
    label?: string,
}

type Endpoint = {
    point: Point,
    $point: SVGView,
    closed: boolean,
    correctValue: number,
    sibling?: Endpoint,
}

@register('x-piecewise-endpoint-puzzle')
export class PiecewiseEndpointPuzzle extends CustomElementView {
    private $graph!: CoordinateSystem;
    private $prompt!: ElementView;
    private $submit!: ElementView;
    private $step!: Step;

    private shuffling = false;

    private segments!: Segment[];
    private endpoints: Endpoint[] = [];

    ready() {
      this.$graph = this.$('x-coordinate-system')! as CoordinateSystem;

      this.$prompt = this.$('.prompt-text')!;
      this.$prompt.text = 'Tap points to flip them.';

      this.$submit = this.$('button')!;
      this.$submit.on('click', () => {
        this.submit();
      });
    }

    bindStep($step: Step) {
      this.$step = $step;
    }

    async submit() {
      this.$prompt.text = 'Σ(-᷅_-᷄๑) Hmmm…';
      this.$submit.setAttr('disabled', true);
      await wait(2000);

      const success = this.checkSuccess();

      if (success) {
        this.$prompt.text = '(☞ ﾟヮ ﾟ)☞';
        this.$step.addHint('correct');
        this.$step.score(this.attr('score') || 'endpoint-puzzle');
      } else {
        this.$step.addHint('incorrect');
        this.$prompt.text = '╰( ﾟｰﾟ╰) Shuffling…';
        await this.reshuffle();
        this.$prompt.text = 'Try again! (⊃ᵔ‿ᵔ)b';
        this.$submit.removeAttr('disabled');
      }
    }

    async flipPoint(endpoint: Endpoint, animate = true) {
      if (endpoint.closed) {
        endpoint.closed = false;
        endpoint.$point.removeClass('closed');
      } else {
        endpoint.closed = true;
        endpoint.$point.addClass('closed');
      }

      if (!animate) {
        return;
      }

      const position = this.$graph.toViewportCoords(endpoint.point);
      const burstElement = $N('g', {class: 'burst'}, this.$graph.$overlay);
      const burst = new Burst(burstElement as SVGParentView, 10);
      burst.play(500, [position.x, position.y], [5, 15]).then(() => {
        burstElement.remove();
      });
      await wait(1);
      burstElement.addClass('fade');
    }

    checkSuccess() {
      let success = true;

      for (const endpoint of this.endpoints) {
        if (endpoint.correctValue != -1) {
          if (endpoint.closed != (endpoint.correctValue == 1)) {
            success = false;
          }
        } else if (endpoint.sibling) {
          if (endpoint.closed && endpoint.sibling.closed) {
            success = false;
          } else if (!endpoint.closed && !endpoint.sibling.closed) {
            success = false;
          }
        } else if (!endpoint.closed) {
          success = false;
        }
      }

      return success;
    }

    async reshuffle() {
      this.shuffling = true;

      let i = 0;
      while (i++ < 7) {
        this.randomize();
        await wait(100 * i);
      }

      while (this.checkSuccess()) {
        this.randomize(false);
      }

      this.shuffling = false;
    }

    randomize(animate = true) {
      let flipped = false;
      do {
        for (const e of this.endpoints) {
          if (Math.random() > 0.5) {
            this.flipPoint(e, animate);
            flipped = true;
          }
        }
      } while (!flipped);
    }

    setSegments(segments: Segment[]) {
      this.segments = segments;

      const $segments = $N('g', {class: 'segments'}, this.$graph.$overlay);
      const $endpoints = $N('g', {class: 'endpoints'}, this.$graph.$overlay);
      const $labels = $N('g', {class: 'strings'}, this.$graph.$overlay);

      const addPoint = (point: Point, closed: boolean, specified: boolean) => {
        for (const endpoint of this.endpoints) {
          if (endpoint.point.equals(point)) {
            return endpoint;
          }
        }

        const position = this.$graph.toViewportCoords(point);
        const $point = $N('circle', {class: 'endpoint', r: 6, cx: position.x, cy: position.y}, $endpoints) as SVGView;

        const e: Endpoint = {
          point,
          $point,
          closed,
          correctValue: specified ? closed ? 1 : 0 : -1
        };

        if (closed) {
          $point.addClass('closed');
        }

        $point.on('click', () => {
          if (!this.shuffling) {
            this.flipPoint(e);
          }
        });

        for (const endpoint of this.endpoints) {
          if (endpoint.point.x == point.x) {
            e.sibling = endpoint;
            endpoint.sibling = e;
            return e;
          }
        }

        return e;
      };

      for (const segment of segments) {
        segment.end0 = addPoint(segment.point0, segment.include0 as boolean, segment.include0 !== undefined);
        segment.end1 = addPoint(segment.point1, segment.include1 as boolean, segment.include1 !== undefined);
        this.endpoints.push(segment.end0);
        this.endpoints.push(segment.end1);

        let position0 = this.$graph.toViewportCoords(segment.point0);
        let position1 = this.$graph.toViewportCoords(segment.point1);

        const direction = position1.subtract(position0).unitVector;

        position0 = position0.add(new Point(direction.x * 5, direction.y * 5));
        position1 = position1.subtract(new Point(direction.x * 5, direction.y * 5));

        segment.$line = $N('line', {x1: position0.x, y1: position0.y, x2: position1.x, y2: position1.y}, $segments) as SVGView;
        segment.$text = $N('text', {x: (position0.x + position1.x) / 2, y: (position0.y + position1.y) / 2 - 8}, $labels) as SVGView;

        if (segment.label === undefined && !(segment.include0 === undefined || segment.include1 === undefined)) {
          let label = segment.point0.x.toString();
          label += segment.include0 ? ' ≤ ' : ' < ';
          label += 'x';
          label += segment.include1 ? ' ≤ ' : ' < ';
          label += segment.point1.x.toString();
          segment.$text.text = label;
        } else if (segment.label) {
          segment.$text.text = segment.label;
        }
      }

      let i = 0;
      do {
        this.randomize(false);
        if (i++ > 1000) {
          console.error('No unsuccessful condition found for this puzzle', this.segments);
          break;
        }
      } while (this.checkSuccess());
    }
}

// =============================================================================
// Card Graph Component
// (c) Mathigon
// =============================================================================

import {Step} from '@mathigon/studio';
import {$N, animate, CustomElementView, Draggable, ease, ElementView, hover, register, SVGView} from '@mathigon/boost';
import {Point} from '@mathigon/euclid';
import {lerp} from '@mathigon/fermat';
import {shuffle} from '@mathigon/fermat/src/random';
import {CoordinateSystem} from '../../../shared/types';

type Plot = {
    color: string,
    function: (x: number) => number,
}

type Card = {
    description?: string,
    imagePath?: string,
    label?: string,
    hint?: string,
    point: Point,
    domain?: number[],
    invertDomainLines?: boolean,
}

@register('x-card-graph')
export class CardGraph extends CustomElementView {
    private $graph!: CoordinateSystem;
    private $overlay!: ElementView;
    private $instructionText!: ElementView;
    private $descriptionText!: ElementView;
    private graphWidth!: number;
    private graphHeight!: number;
    private $step?: Step;

    ready() {
      this.$graph = this.$('x-coordinate-system')! as CoordinateSystem;
      this.$overlay = this.$graph.$svg.$('.overlay')!;

      this.graphWidth = parseInt(this.$graph.attr('width'));
      this.graphHeight = parseInt(this.$graph.attr('height'));

      this.$graph.$svg.setAttr('height', this.graphHeight + 100);
      this.$graph.$svg.setAttr('viewBox', `0 0 ${this.graphWidth} ${this.graphHeight - 50}`);

      this.$instructionText = $N('text', {class: 'card-instruction', 'alignment-baseline': 'middle', 'text-anchor': 'middle', transform: `translate(${this.graphWidth / 2}, ${this.graphHeight + 20})`}, this.$overlay);
      this.$descriptionText = $N('text', {class: 'card-description', 'alignment-baseline': 'middle', 'text-anchor': 'middle', transform: `translate(${this.graphWidth / 2}, ${this.graphHeight + 20})`}, this.$overlay);

      this.$instructionText.text = 'Drag each card onto its corresponding point';
    }

    bindStep($step: Step) {
      this.$step = $step;
    }

    setPlots(plots: Plot[]) {
      this.$graph.setFunctions(...plots.map((plot) => plot.function));

      for (let i = 0; i < plots.length; i++) {
this.$graph.$('.plot')!.$$('g')[i].$('path')!.setAttr('class', plots[i].color);
      }
    }

    setCards(cards: Card[]) {
      cards = shuffle(cards);

      const $rangeGroup = $N('g', {class: 'ranges'}, this.$overlay);
      const $dotGroup = $N('g', {class: 'dots'}, this.$overlay);
      const $cardGroup = $N('g', {class: 'cards'}, this.$overlay);

      let $hoverDot: ElementView|null = null;
      let $dragCard: ElementView|null = null;

      const _$cards = cards.map((card, i) => {
        const origin = new Point(this.graphWidth * (i + 1 / 2) / cards.length, -30);

        const _$outline = $N('circle', {cx: origin.x, cy: origin.y, r: 30, class: 'card-outline'}, $cardGroup);

        const $g = $N('g', {transform: `translate(${origin.x}, ${origin.y})`}, $cardGroup) as SVGView;

        const $content = $N('g', {class: 'card-content'}, $g);

        if (card.imagePath) {
          $N('image', {href: card.imagePath, x: -30, y: -30, width: 60, height: 60}, $content);
        } else {
          $N('circle', {r: 30, class: 'card-fill'}, $content);
          $N('text', {'alignment-baseline': 'middle', 'text-anchor': 'middle'}, $content).text = card.label!;
        }

        const _$circle = $N('circle', {cx: 0, cy: 0, r: 30, class: 'card-circle'}, $content);

        const dotPosition = this.$graph.toViewportCoords(card.domain ? new Point((card.domain[0] + card.domain[1]) / 2, card.point.y) : card.point);
        const $dot = $N('circle', {class: 'dot', transform: `translate(${dotPosition.x}, ${dotPosition.y})`, r: 15}, $dotGroup);

        const $rangeLines = $N('g', {class: 'range-lines'}, $rangeGroup);

        if (card.domain) {
          const rangeStartPoint = new Point(card.domain[0]!, card.point.y);
          const rangeEndPoint = new Point(card.domain[1]!, card.point.y);

          const rangeStartPosition = this.$graph.toViewportCoords(rangeStartPoint);
          const rangeEndPosition = this.$graph.toViewportCoords(rangeEndPoint);

          const axisHeight = this.$graph.$yAxis!.height;
          const yOffset = (this.graphHeight - axisHeight) / 2;

          const _$rangeSpan = $N('line', {x1: rangeStartPosition.x, x2: rangeEndPosition.x, y1: rangeStartPosition.y, y2: rangeEndPosition.y}, $rangeLines);

          const _$rangeStartLine = $N('line', {class: 'range-line', x1: rangeStartPosition.x, x2: rangeStartPosition.x, y1: yOffset, y2: axisHeight + yOffset}, $rangeLines);
          const _$rangeEndLine = $N('line', {class: 'range-line', x1: rangeEndPosition.x, x2: rangeEndPosition.x, y1: yOffset, y2: axisHeight + yOffset}, $rangeLines);

          const _$rangeStartTick = $N('line', {class: 'range-tick', x1: rangeStartPosition.x, x2: rangeStartPosition.x, y1: rangeStartPosition.y - 10, y2: rangeStartPosition.y + 10}, $rangeLines);
          const _$rangeEndTick = $N('line', {class: 'range-tick', x1: rangeEndPosition.x, x2: rangeEndPosition.x, y1: rangeStartPosition.y - 10, y2: rangeStartPosition.y + 10}, $rangeLines);
        }

        hover($g, {
          enter: () => {
            if (!$dragCard && card.description) {
              this.$descriptionText.text = card.description;
              this.$descriptionText.css('opacity', 1);
              this.$instructionText.css('opacity', 0);
            }
          },
          exit: () => {
            if (!$dragCard && card.description) {
              this.$descriptionText.css('opacity', 0);
              this.$instructionText.css('opacity', 1);
            }
          }
        });

        hover($dot, {
          enter: () => {
            $hoverDot = $dot;

            $rangeGroup.addClass('hover');
            $rangeLines.addClass('hover');

            if ($dragCard) {
$dragCard.$('.card-content')!.setAttr('transform', `scale(${1 / 2})`);
            }
          },
          exit: () => {
            $hoverDot = null;

            $rangeGroup.removeClass('hover');
            $rangeLines.removeClass('hover');

            if ($dragCard) {
$dragCard.$('.card-content')!.setAttr('transform', `scale(1)`);
            }
          }
        });

        const drag = new Draggable($g, this.$graph.$svg, {useTransform: true, margin: -60});

        drag.setPosition(origin.x, origin.y);

        drag.on('start', () => {
          $dragCard = $g;

          $g.css('pointer-events', 'none');
        });

        drag.on('end', () => {
          $dragCard = null;

          const dropPosition = drag.position;
          let restPosition: Point;

          if ($hoverDot == $dot) {
            if (this.$step) {
              this.$step.addHint('correct');

              if (card.hint) {
                this.$step.addHint(card.hint);
              }

              this.$step.score('card' + i);
            }

            restPosition = dotPosition;

            this.$descriptionText.css('opacity', 0);
            this.$instructionText.css('opacity', 1);
          } else if ($hoverDot) {
            if (this.$step) {
              this.$step.addHint('incorrect');
            }

            restPosition = origin;

            $content.setAttr('transform', 'scale(1)');
            $g.css('pointer-events', 'all');
          } else {
            restPosition = origin;

            $g.css('pointer-events', 'all');
          }

          animate((p) => {
            const q = ease('sine', p);
            drag.setPosition(lerp(dropPosition.x, restPosition.x, q), lerp(dropPosition.y, restPosition.y, q));
          }, 500);
        });

        return $g;
      });
    }
}

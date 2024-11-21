// =============================================================================
// Relation Component
// (c) Mathigon
// =============================================================================


import {Step} from '@mathigon/studio';
import {$N, CustomElementView, ElementView, hover, register, slide, SVGParentView, SVGView} from '@mathigon/boost';
import {Point} from '@mathigon/euclid';
import template from './relation.pug';


type Match = {
  name: string
  matched: boolean
}

type Connection = {
  input: number
  output: number
  line: SVGView
}

@register('x-relation', {template})
export class Relation extends CustomElementView {
  private $inputs!: ElementView[];
  private $outputs!: ElementView[];
  private $lines!: SVGView[];
  private $step?: Step;

  private requireMatch = false;
  private lastWidth = 0;
  private inputTargets: Point[] = [];
  private outputTargets: Point[] = [];
  private matches: Match[] = [];
  private connections: Connection[] = [];

  ready() {
    const $svg = this.$('svg.connections') as SVGParentView;
    this.$inputs = this.$$('.domain .item');
    this.$outputs = this.$$('.range .item');

    this.requireMatch = this.attr('requireMatch') == 'true';

    function selectRandomElement(elements: ElementView[]) {
      return elements[Math.floor(Math.random() * elements.length)];
    }

    if (this.attr('randomize') == 'true') {
      for (const $input of this.$inputs) {
        $input.insertAfter(selectRandomElement(this.$inputs));
      }
      for (const $output of this.$outputs) {
        $output.insertAfter(selectRandomElement(this.$outputs));
      }
    }

    this.resize();

    let $currentLine: SVGView|undefined = undefined;
    let activeTarget = -1;

    for (const [i, $el] of this.$inputs.entries()) {

      const name = $el.attr('match');
      this.matches.push({name, matched: false});
      $el.removeAttr('match');

      let comment = $el.attr('comment');
      if (comment == 'comment') {
        comment = name;
      } else {
        comment = 'correct';
      }

      slide($el, {
        start: () => $currentLine = $N('line', {}, $svg) as SVGView,
        move: (p: Point) => {
          $currentLine!.setLine(this.inputTargets[i], this.outputTargets[activeTarget] || p);
        },
        end: () => {

          if (activeTarget >= 0) {

            const $target = this.$outputs[activeTarget];
            $target.removeClass('active');

            const extantConnection = this.connections.find(connection => connection.input == i && connection.output == activeTarget);

            if (extantConnection) {
              this.connections.splice(this.connections.indexOf(extantConnection), 1);
              extantConnection.line.remove();
              $currentLine!.remove();

              if ($target.attr('name') == this.matches[i].name) {
                this.matches[i].matched = false;
              }

              if (this.matches.every(m => m.matched == true)) {
                if (this.$step) {
                  this.$step.complete();
                }
              }
            } else {
              const connection = {
                input: i,
                output: activeTarget,
                line: $currentLine!
              };

              if ($target.attr('name') == this.matches[i].name) {
                if (this.$step) {
                  this.$step.addHint('correct');
                }

                this.matches[i].matched = true;

                if (this.matches.every(m => m.matched == true)) {
                  if (this.$step) {
                    this.$step.complete();
                  }
                }

                this.connections.push(connection);
              } else if (this.requireMatch) {
                if (this.$step) {
                  this.$step.addHint('incorrect');
                }

                $currentLine!.exit('draw', 300, 0, true);
              } else {
                if (this.$step) {
                  this.$step.addHint('incorrect');
                }

                this.connections.push(connection);
              }
            }
          } else {
            $currentLine!.exit('draw', 300, 0, true);
          }
          activeTarget = -1;
          $currentLine = undefined;
        },
        $box: $svg
      });
    }

    for (const [i, $el] of this.$outputs.entries()) {

      hover($el, {
        enter: () => {
          if (!$currentLine || i === activeTarget) return;
          activeTarget = i;
          $el.addClass('active');
        },
        exit: () => {
          if (!$currentLine) return;
          activeTarget = -1;
          $el.removeClass('active');
        }
      });
    }
  }

  resize() {
    const box = this.bounds;

    if (box.width === this.lastWidth) return;
    this.lastWidth = box.width;

    this.inputTargets = this.$inputs.map($i => {
      const inputBox = $i.bounds;
      return new Point(inputBox.left + inputBox.width - box.left,
          inputBox.top + inputBox.height / 2 - box.top);
    });

    this.outputTargets = this.$outputs.map($o => {
      const outputBox = $o.bounds;
      return new Point(outputBox.left - box.left,
          outputBox.top + outputBox.height / 2 - box.top);
    });

    // TODO Update existing connections
  }

  bindStep($step: Step) {
    this.$step = $step;
  }
}

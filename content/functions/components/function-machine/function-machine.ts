// =============================================================================
// Function Machine Component
// (c) Mathigon
// =============================================================================

import {Step} from '@mathigon/studio';
import {$N, animate, CustomElementView, Draggable, ease, register, SVGParentView, SVGView} from '@mathigon/boost';
import {clamp, lerp} from '@mathigon/fermat';

type Mapping = {
  inputY: number,
  $input: SVGView,
  $output: SVGView,
  consumed: boolean,
}

function unlerp(a: number, b: number, t: number) {
  return (t - a) / (b - a);
}

const itemHeight = 60;

@register('x-function-machine')
export class FunctionMachine extends CustomElementView {
  private $inputs!: SVGView[];
  private $operation!: SVGView;
  private $outputs!: SVGView[];
  private $outputInstances!: SVGView[];
  private mappings!: Mapping[];
  private $svg!: SVGParentView;
  private $step?: Step;
  private callbacks: ((inputString: string, outputString: string) => void)[] = [];

  private svgWidth = 0;
  private svgHeight = 0;

  private leftColumnX = 0;
  private rightColumnX = 0;

  private topY = 0;
  private bottomY = 0;

  ready() {
    this.$svg = this.$('svg') as SVGParentView;
    this.$inputs = this.$$('.input') as SVGView[];
    this.$operation = this.$('.operation') as SVGView;
    this.$outputs = this.$$('.output') as SVGView[];

    this.mappings = this.$inputs.map(($input) => {
      return {
        inputY: 0,
        $input,
        $output: this.$outputs.find($output => $output.attr('name') == $input.attr('output'))!,
        consumed: false
      };
    });

    this.resize();

    // I assume there is a better way to do this with templates?
    for (const $el of this.$$('g') as SVGView[]) {
      $el.children[0]!.insertBefore($N('rect', {
        x: -itemHeight / 2,
        y: -itemHeight / 2,
        width: itemHeight,
        height: itemHeight,
        rx: 4,
        ry: 4
      }));

      $el.$('text')!.setAttr('y', 9);
    }

    for (const [_i, $input] of this.$inputs.entries()) {
      const mapping = this.mappings.find((mapping) => mapping.$input == $input)!;
      const drag = new Draggable($input, this.$svg, {useTransform: true});

      drag.setPosition(this.leftColumnX, mapping.inputY);

      drag.on('move', (posn) => {
        const dragProgress = clamp(unlerp(this.leftColumnX, this.rightColumnX, posn.x), 0, 1);
        const y = lerp(mapping.inputY, this.topY, dragProgress);
        drag.setPosition(clamp(drag.position.x, this.leftColumnX, this.rightColumnX), y);
      });

      drag.on('end', async () => {
        const posn = drag.position;

        if (posn.x < this.rightColumnX) {
          await animate((p) => {
            const x = lerp(posn.x, this.leftColumnX, p);
            const y = lerp(posn.y, mapping.inputY, p);
            drag.setPosition(x, y);
          }, 500);
        } else {
          $input.hide();

          const $output = mapping.$output.copy(true, false);
          this.$operation.insertBefore($output);
          $output.show();

          if (this.$step) {
            this.$step.score($input.attr('name'));
            this.$step.addHint($input.attr('hint') || 'correct');
          }

          for (const cb of this.callbacks) {
            cb($input.attr('value'), $output.attr('value'));
          }

          await animate((p) => {
            const q = ease('bounce-out', p);
            $output.setAttr('transform', `translate(${this.rightColumnX}, ${lerp(this.topY, this.bottomY, q)})`);
          }, 500);
        }
      });
    }

    for (const $output of this.$outputs) {
      $output.hide();
    }
  }

  resize() {
    this.svgWidth = parseInt(this.attr('width'));
    this.svgHeight = parseInt(this.attr('height'));

    this.$svg.setAttr('width', this.svgWidth);
    this.$svg.setAttr('height', this.svgHeight);

    this.leftColumnX = 50;
    this.rightColumnX = this.svgWidth - 50;

    this.topY = (this.svgHeight / (this.$inputs.length)) / 2;
    this.bottomY = this.svgHeight - this.topY;

    const inputSpacing = this.svgHeight / this.$inputs.length;

    for (const [i, $input] of this.$inputs.entries()) {
      const mapping = this.mappings.find(mapping => mapping.$input == $input)!;
      mapping.inputY = inputSpacing * (i + 0.5);
      $input.setAttr('transform', `translate(${this.leftColumnX}, ${mapping.inputY})`);
    }

    this.$operation.setAttr('transform', `translate(${this.rightColumnX}, ${this.topY})`);
  }

  // Seems like there should be a better way to do this, but it will work for now
  bindStep($step: Step) {
    this.$step = $step;
  }

  bindCallback(cb: (inputString: string, outputString: string) => void) {
    this.callbacks.push(cb);
  }
}

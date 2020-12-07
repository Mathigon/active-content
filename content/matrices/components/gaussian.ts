import {$N, CustomElementView, ElementView, register, SVGParentView, SVGView} from '@mathigon/boost';
import template from './gaussian.pug';

// for setting
const FRAME_WIDTH = 600;
const FRAME_HEIGHT = 200;

@register('x-gaussian', {template, attributes: ['dimension', 'matrix']})
export class Gaussian extends CustomElementView {

  private originalValues: number[][];
  private $frame!: SVGParentView;
  private $matrices!: SVGParentView[];

  private $leftMatrix!: SVGView;
  private $rightMatrix!: SVGView;

  private numVars!: number;
  private numRows!: number;
  private vars!: string[];

  private A!: number[][];
  private c!: number[];
  private rows!: number[][];

  private $rows!: SVGView[];

  private stepNumber = 0;
  private steps: (() => void)[];

  ready() {
    console.log('This is the Gaussian');
    // this.originalValues = this.attr('matrix');
    // this.originalValues = [[-1, 1, 4], [-2, 1, 2]];

    this.$frame = $N('svg', {viewBox: `0 0 ${FRAME_WIDTH} ${FRAME_HEIGHT}`}, this) as SVGParentView;
    // this.$matrices = [];

    this.parseMatrix();
    this.$('.matrix')?.hide();

    this.displayRows();
  }

  setNextSteps(stepList: (() => void)[]) {
    this.steps = stepList;
  }

  nextStep() {
    console.log(`On Step ${this.stepNumber}`);
    this.steps[this.stepNumber]();
    this.stepNumber++; // = this.stepNumber + 1;
  }

  backStep() {
    // TODO:
  }

  private parseMatrix() {
    const matrices = this.$('.matrix')?.$$('x-math') as ElementView[];
    if (matrices.length != 3) throw new Error('Three matrices expected');

    const stripParens = (str: string) => str.replace(/\(|\)|\s/g, '');
    const replaceMinus = (str: string) => str.replace(/−/g, '-');

    // Matrix 1: A
    const numbers1 = matrices[0].$('desc')?.text.split(',')
        .map(stripParens)
        .map(replaceMinus) // different minus sign?
        .map(str => parseInt(str)) as number[];

    // Matrix 2: var names
    const vars2 = matrices[1].$('desc')?.text.split(',')
        .map(stripParens) as string[];
    this.numVars = vars2.length;
    this.vars = vars2.map(v => v);

    // Matrix 3: solution
    const numbers3 = matrices[2].$('desc')?.text.split(',')
        .map(stripParens)
        .map(replaceMinus) // different minus sign?
        .map(str => parseInt(str)) as number[];

    this.A = [];
    this.rows = [];
    this.c = numbers3;
    this.numRows = this.c?.length;
    for (let r = 0; r < this.numRows!; r++) {
      const Arow = numbers1.slice(r * this.numVars!, r * this.numVars! + this.numVars!);
      this.A.push(Arow);
      this.rows.push(Arow.concat(this.c[r]));
    }

    console.log(this.A);
    console.log(this.c);
    console.log(this.rows);
  }

  private displayRow($row: SVGView, rowNumber: number) {

    const allTextAttr = {
      class: 'row-text',
      'text-anchor': 'middle',
      'dominant-baseline': 'central',
      fill: 'white'
    };

    const y = 14 + rowNumber * 50;
    const fillAttr = {
      class: 'row-fill', x: 13, y, width: this.numVars === 2 ? 160 : 240, height: 37, rx: 4
    };

    const divX = this.numVars === 2 ? 129 : 175;
    const dividerAttr = {
      x1: divX, x2: divX,
      class: 'divider'
    };

    const _rowFill = $N('rect', Object.assign({y}, fillAttr), $row) as SVGView;
    const textAttr = Object.assign({y: y + 37 / 2}, allTextAttr);
    const _divider = $N('line', Object.assign({y1: y, y2: y + 37}, dividerAttr), $row);


    const _text1 = $N('text', Object.assign({x: 20, text: this.rows[rowNumber][0]}, textAttr), $row) as SVGView;
    const _text2 = $N('text', Object.assign({x: 74, text: this.rows[rowNumber][1]}, textAttr), $row) as SVGView;

    if (this.numVars === 2) {
      const _text3 = $N('text', Object.assign({x: 134, text: this.rows[rowNumber][2]}, textAttr), $row) as SVGView;
    } else if (this.numVars === 3) {
      const _text3 = $N('text', Object.assign({x: (74 + 74 - 20), text: this.rows[rowNumber][2]}, textAttr), $row) as SVGView;
      const _text4 = $N('text', Object.assign({x: (74 + 74 - 20 + 134 - 74), text: this.rows[rowNumber][3]}, textAttr), $row) as SVGView;
    }
  }

  private displayRows() {
    this.$rows = [];
    this.$leftMatrix = $N('g', {x: 30, y: 25}, this.$frame) as SVGView;

    // FIXME: size should be dependent on numbers of rows (numRows) and columns (numVars)
    const matrixHeight = this.numRows * 37 + (this.numRows + 1) * 13;
    const fillAttr = {
      class: 'matrix', x: 0, y: 0, width: 186, height: matrixHeight, rx: 0
    };

    const _fill = $N('rect', fillAttr, this.$leftMatrix) as SVGView;

    const rowAttr = {class: 'row-container', x: 13};
    for (let row = 0; row < this.numRows; row++) {
      const y = 14 + row * 50;
      const $row = $N('g', Object.assign({y}, rowAttr), this.$leftMatrix) as SVGView;
      this.displayRow($row, row);
      this.$rows.push($row);
    }
  }

  createBlankRightMatrix() {
    console.log('createBlankRightMatrix');
    this.$rightMatrix = $N('g', {x: 400, y: 25}, this.$frame) as SVGView;
    console.log(this.$rightMatrix);
    const matrixHeight = this.numRows * 37 + (this.numRows + 1) * 13;
    const fillAttr = {
      class: 'matrix-right', x: 400, y: 0, width: 186, height: matrixHeight, rx: 0
    };
    const _fill = $N('rect', fillAttr, this.$rightMatrix) as SVGView;
  }

  drawArrow(rowNumber: number) {
    // TODO: check fibonacci for how arrow/paths are drawn
    const y = 14 + rowNumber * 50 + 37 / 2;
    const $arrow1 = $N('line', {class: 'arrow', x1: 186 - 13, x2: 400 + 13, y1: y, y2: y});
    // for ordering
    // FIXME: what's the right way to order these??? Ideally over the matrix but behind the rows.
    this.$leftMatrix.insertBefore($arrow1);
    $arrow1.hide();
    // FIXME: draw arrow head when it finishes (or draw it with?)
    $arrow1.enter('draw', 200);
  }

  hideArrows() {
    this.$frame.$$('.arrow').forEach(a => a.remove());
    this.$frame.$$('.multiplier').forEach(a => a.remove());
  }

  copyRow(rowNumber: number) {
    const newRow = this.$rows[rowNumber].copy(true, false);
    this.$rightMatrix.append(newRow);
    newRow.animate({transform: [
      `translate(0px, 0px)`,
      `translate(400px, 0px)`
    ]}, 800);
  }

  multiplyRow(rowNumber: number, multiplier: number) {
    // TODO: draw arrow with a multiplier circle
    this.drawArrow(rowNumber);
    const cx = (186 + (400 - 186) / 2);
    const cy = 14 + rowNumber * 50 + 37 / 2;
    const r = 15;
    const _$circle = $N('circle', {class: 'multiplier', cx, cy, r, fill: 'red'}, this.$frame);
    const _$label = $N('text', {class: 'multiplier', x: cx, y: cy, fill: 'white', 'text-anchor': 'middle', 'dominant-baseline': 'central', text: `x${multiplier}`}, this.$frame);

    const $text = this.$rows[rowNumber].$$('text');
    const numbers = this.rows[rowNumber];
    const newNumbers = numbers.map(n => Math.round(n * multiplier * 100) / 100);
    newNumbers.forEach((n, i) => {
      $text[i].textStr = n;
      this.rows[rowNumber][i] = n;
    });

  }

  comboRow(_rowSrc1: number, _rowSrc2: number, _rowDest: number, _m1: number, _m2: number) {
    // TODO: draw multiple arrows into one

    const src1 = this.rows[_rowSrc1].map(s1 => Math.round(s1 * _m1 * 100) / 100);
    const src2 = this.rows[_rowSrc2].map(s2 => Math.round(s2 * _m2 * 100) / 100);
    const newNumbers = src1.map((s1, i) => s1 + src2[i]);

    const $text = this.$rows[_rowDest].$$('text');
    newNumbers.forEach((n, i) => {
      $text[i].textStr = n;
      this.rows[_rowDest][i] = n;
    });
  }

  moveRightMatrixToLeft() {
    // remove old Left.
    this.$leftMatrix.remove();
    // copy and append to frame
    this.$leftMatrix = this.$rightMatrix.copy(true, false) as SVGView;
    this.$frame.append(this.$leftMatrix);
    // change fill to indicate it's our current matrix
    const fill = this.$leftMatrix.$('.matrix-right');
    fill?.setClass('matrix-right', false);
    fill?.setClass('matrix', true);
    // remove the right matrix
    this.$rightMatrix.remove();
    // animate it to the left
    this.$leftMatrix.animate({
      transform: [
        `translate(0px, 0px)`,
        `translate(-400px, 0px)`
      ]
    }, 800, 0);
  }

}
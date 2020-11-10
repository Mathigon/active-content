// =============================================================================
// Extra Testing Functions
// (c) Mathigon
// =============================================================================

/// <reference types="THREE"/>

import * as u from './utils/utils3d';
import {DoubleSide} from 'three';
import {Step} from '../../shared/types';
import {Matrix} from '@mathigon/fermat';
import {Solid} from '../../shared/components/solid';
import {ElementView} from '@mathigon/boost';

export function threeVector($step: Step) {
  const $solids = $step.$$('x-solid') as Solid[];

  const basic3d = $solids[0];
  basic3d.addMesh((scene) => {
    // $solids[1].addWireframe(new THREE.Line)

    // DRAW PLANES
    const PLANE_SIZE = 4;
    const zPlaneMaterial = Solid.translucentMaterial(0xcd0e66, 0.3);
    const zPlane = new THREE.Mesh(new THREE.PlaneGeometry(PLANE_SIZE, PLANE_SIZE, 10, 10), zPlaneMaterial);
    zPlane.rotateX(Math.PI / 2);
    basic3d.addArrow([0, 0, 0], [0, 0, 1], 0xcd0e66);

    const yPlaneMaterial = Solid.translucentMaterial(0x0f82f2, 0.3);
    const yPlane = new THREE.Mesh(new THREE.PlaneGeometry(PLANE_SIZE, PLANE_SIZE, 10, 10), yPlaneMaterial);
    yPlane.rotateY(Math.PI / 2);
    basic3d.addArrow([0, 0, 0], [0, 1, 0], 0x0f82f2);

    const xPlaneMaterial = Solid.translucentMaterial(0x22ab24, 0.3);
    const xPlane = new THREE.Mesh(new THREE.PlaneGeometry(PLANE_SIZE, PLANE_SIZE, 10, 10), xPlaneMaterial);
    xPlane.rotateZ(Math.PI / 2);
    basic3d.addArrow([0, 0, 0], [1, 0, 0], 0x22ab24);

    const vectorArrow = basic3d.addArrow([0, 0, 0], [$step.model.x, $step.model.y, $step.model.z], 0x000000);

    $step.model.watch((state: any) => {
      // A-HA! This doesn't work, and there's even a TODO to go with it
      // "TODO Support changing the height of the arrow."
      vectorArrow.updateEnds!([0, 0, 0], [state.x, state.y, state.z]);
      scene.draw();
    });

    return [xPlane, yPlane, zPlane];
  });
}

/**
 * Add intersection lines to a solid.
 * TODO: should use a new function in Fermat.js to calculate intersection lines.
 *
 * @param solid
 */
function addIntersectionLinesToSolid(solid: Solid) {

  // intersection b/t Yellow and Cyan planes
  // x + y + z = 1
  // y = 1
  solid.addLine([0, 1, 0], [-1, 1, 1], 0x00ff00);

  // intersection b/t Magenta and Cyan planes
  // z = 1, y = 1
  solid.addLine([2, 1, 1], [-1, 1, 1], 0x0000ff);

  // intersection b/t magenta and yellow planes
  // x + y + z = 1
  // z = 1
  solid.addLine([0, 0, 1], [-1, 1, 1], 0xff0000);
}

export function threeSoeq($step: Step) {

  const $solids = $step.$$('x-solid') as Solid[];
  const soq = $solids[0];

  soq.addMesh((scene) => {

    u.addUnitVectorsToSolid(soq);

    // Plane for 1*x + 1*y + 1*z = 1
    const planeYellow = u.planeFromNormal(
        new THREE.Vector3(1, 1, 1),
        new THREE.Vector3(1, 0, 0),
        0xffff00
    );
    soq.object.add(planeYellow);

    // Plane for 0*x + 1*y + 0*z = 1
    // a.k.a. y=1
    const planeCyan = u.planeFromNormal(
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(0, 1, 0),
        0x00ffff
    );
    soq.object.add(planeCyan);

    // Plane for 0*x + 0*y + 1*z = 1
    // a.k.a. z=1
    const planeMagenta: THREE.Mesh = u.planeFromNormal(
        new THREE.Vector3(0, 0, 1),
        new THREE.Vector3(0, 0, 1),
        0xff00ff
    );
    soq.object.add(planeMagenta);

    addIntersectionLinesToSolid(soq);

    // TODO: try this method
    /* const px: THREE.Mesh = u.planeFromCoplanarPoints(
        new Vector3(1, 0, 0),
        new Vector3(0, 1, 0),
        new Vector3(0, 0, 1),
        0xff00ff
    );
    soq.object.add(px); */

    $step.model.watch((state: any) => {

      // this moves the plane at z=1 to z=zi
      const newPlane = u.planeFromNormal(
          new THREE.Vector3(0, 0, state.zi),
          new THREE.Vector3(0, 0, state.zi),
          0xff0ff
      );
      planeMagenta.geometry.dispose();
      planeMagenta.geometry = newPlane.geometry;
      scene.draw();

      // not quite right...
      /* const plane2 = u.planeFromNormal(
          new THREE.Vector3(state.xi, state.yi, state.zi),
          new THREE.Vector3(state.xi, state.yi, state.zi),
          0xffff00
      );
      planeCyan.geometry.dispose();
      planeCyan.geometry = plane2.geometry; */
    });
  });
}

import _WEBSHIP from '../obj/webship';
import _ARWING from '../obj/arwing';
import KOOPA from '../obj/koopa';

// Octohedron
const _OCTOHEDRON = {
  vertices: [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
    [-1, 0, 0],
    [0, -1, 0],
    [0, 0, -1]
  ],
  // whoa... half are one way, half the other
  faces: [
    [0, 1, 2],
    [0, 5, 1],
    [0, 4, 2],
    [0, 5, 4],
    [3, 2, 1],
    [3, 1, 5],
    [3, 2, 4],
    [3, 4, 5]
  ],
  index: 0
};

/**
 * Normalize shape to be no larger than [-1, 1]
 * @param shape
 */
function normalizeShape(shape: number[][]): number[][] {
  let max = 0;
  shape.forEach(vertex => vertex.forEach(point => {
    if (Math.abs(point) > max) max = Math.abs(point);
  }));

  return shape.map(vertex => vertex.map(point => point / max));
}

export function threeTransform($step: Step) {
  const $solid = $step.$('x-solid') as Solid;

  const $buttons = $step.$$('.button') as ElementView[];

  $solid.addMesh((scene) => {
    // do nothing

    const meshes: THREE.Mesh[] = [];

    const SHAPE = KOOPA;
    const VERTICES = normalizeShape(SHAPE.vertices);

    SHAPE.faces.forEach((f: number[]) => {
      const offset = SHAPE.index;
      const geom = new THREE.Geometry();
      f.forEach(vi => {
        const v = VERTICES[vi - offset];
        geom.vertices.push(new THREE.Vector3(v[0], v[1], v[2]));
      });
      geom.faces.push(new THREE.Face3(0, 1, 2));
      geom.computeFaceNormals();
      // gotta make it double sided, otherwise unwanted (but very cool) behavior
      const mesh = new THREE.Mesh(geom, new THREE.MeshNormalMaterial({side: DoubleSide}));
      meshes.push(mesh);
      $solid.object.add(mesh);
    });


    $step.model.watch((state: any) => {
      const newMatrix = [
        [state.xa, state.xb, state.xc],
        [state.ya, state.yb, state.yc],
        [state.za, state.zb, state.zc]
      ];

      // FIXME: refactor redundant code
      SHAPE.faces.forEach((f: number[], i: number) => {
        const offset = SHAPE.index;
        const geom = new THREE.Geometry();
        f.forEach(vi => {
          const v = VERTICES[vi - offset];
          const vTransform = Matrix.product(
              newMatrix, [[v[0]], [v[1]], [v[2]]]
          );
          geom.vertices.push(new THREE.Vector3(
              vTransform[0][0], vTransform[1][0], vTransform[2][0]));
        });
        geom.faces.push(new THREE.Face3(0, 1, 2));
        geom.computeFaceNormals();
        // gotta make it double sided, otherwise unwanted (but very cool) behavior
        const mesh = new THREE.Mesh(geom, new THREE.MeshNormalMaterial({side: DoubleSide}));
        meshes[i].geometry.dispose();
        meshes[i].geometry = mesh.geometry;
      });

      scene.draw();
    });
    // return meshes;
  });

  $buttons[0].on('click', _e => {
    // DO SOMETHING
  });
}

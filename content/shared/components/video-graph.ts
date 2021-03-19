// =============================================================================
// Video Graph Component
// (c) Mathigon
// =============================================================================


import {$N, CustomElementView, ElementView, register, SVGParentView, SVGView, Draggable, animate, ease} from '@mathigon/boost';
import { Point } from '@mathigon/euclid';
import {lerp, clamp} from '@mathigon/fermat';
import { CoordinateSystem, Step, Video } from '../types';

const avatarSize = 32;

@register('x-video-graph')
export class VideoGraph extends CustomElementView {
    private $video: Video;
    private $videoEl: Node;
    private $graph: CoordinateSystem;
    private functions: ((t:number)=>number)[] = [];
    private colors: string[] = [];

    ready() {
        this.$video = this.$('x-video')! as Video;
        this.$videoEl = this.$video.$('video')?._el! as Node;
        this.$graph = this.$('x-coordinate-system')! as CoordinateSystem;
    }

    addPlot(xFunction: (t: number) => number, yFunction: (t: number) => number, avatarPath: string, color: string) {
        this.functions.push(yFunction);
        this.$graph.setFunctions.apply(this.$graph, this.functions);

        if (color)
            this.colors.push(color);
        else
            this.colors.push('red');

        for (let i = 0; i < this.colors.length; i++)
            this.$graph.$('.plot')!.$$('g')[i].$('path')!.setAttr('class', this.colors[i]);
        
            
        const $avatar = $N('g', {}, this.$graph.$svg.$('.overlay')!) as SVGView;
            
        if (avatarPath)
            $N('image', {href: avatarPath, transform: `translate(${-avatarSize/2}, ${-avatarSize/2})`, width: avatarSize, height: avatarSize}, $avatar);
        else
            $N('circle', {r: 4}, $avatar);

        const setAvatarPosition = (t: number) => {
            const x = xFunction(t);
            const y = yFunction(x);
            const athletePoint = this.$graph.toViewportCoords(new Point(x, y));

            $avatar.setAttr('transform', `translate(${athletePoint.x}, ${athletePoint.y})`);
        }

        this.$video.on('timeupdate', () => {
            const t: number = this.$videoEl.currentTime;
            setAvatarPosition(t);
        });

        setAvatarPosition(0);
    }
}

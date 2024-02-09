import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(400, 225, 'background');

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(400, 225, 380, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(400-183, 225, 9, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress: number) => {

            //  Update the progress bar (our bar is 375px wide, so 100% = 375px)
            bar.width = 5 + (370 * progress);

        });
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets/');
        this.load.image('logo', 'logo.png');
        this.load.image('sky', 'bg/Sky.png')
		this.load.image('mountains', 'bg/Mountains.png')
		this.load.image('middle', 'bg/Middle.png')
		this.load.image('foreground', 'bg/Foreground.png')
		this.load.image('ground1', 'bg/Ground_01.png')
		this.load.image('ground2', 'bg/Ground_02.png')
        this.load.image('snowman', 'player/Snowman.png')
		this.load.image('snow-particle', 'particles/snow.png')
    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.time.delayedCall(1000, () => {
			this.scene.start('MainMenu');
		})
    }
}

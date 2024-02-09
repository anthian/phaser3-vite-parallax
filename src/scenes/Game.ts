import { Scene } from 'phaser';

export class Game extends Scene
{
    private camera: Phaser.Cameras.Scene2D.Camera;
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys
    private backgrounds: { ratioX: number, sprite: Phaser.GameObjects.TileSprite }[] = []
    private player: Phaser.GameObjects.Image
    private velocityX = 10

    constructor ()
    {
        super('Game');
    }

	init() {
		if(this.input.keyboard)
			this.cursors = this.input.keyboard.createCursorKeys()
		else
			throw Error("Unable to find keyboard input.")
	}

    create ()
    {
        const { width, height } = this.scale

        this.add.image(0, 0, 'sky')
        .setOrigin(0, 0)
        .setScrollFactor(0)

        // this.add.image(0, 0, 'mountains').setOrigin(0, 0)
		this.backgrounds.push({
			ratioX: 0.01,
			sprite: this.add.tileSprite(0, 0, width, height, 'mountains')
				.setOrigin(0, 0)
				.setScrollFactor(0, 0)
		})

        // this.add.image(0, 0, 'middle').setOrigin(0, 0)
		this.backgrounds.push({
			ratioX: 0.1,
			sprite: this.add.tileSprite(0, 0, width, height, 'middle')
				.setOrigin(0, 0)
				.setScrollFactor(0, 0)
		})

        // this.add.image(0, 0, 'foreground').setOrigin(0, 0)
		this.backgrounds.push({
			ratioX: 0.3,
			sprite: this.add.tileSprite(0, 0, width, height, 'foreground')
				.setOrigin(0, 0)
				.setScrollFactor(0, 0)
		})

        // this.add.image(0, 0, 'ground1').setOrigin(0, 0)
		this.backgrounds.push({
			ratioX: 0.7,
			sprite: this.add.tileSprite(0, 0, width, height, 'ground1')
				.setOrigin(0, 0)
				.setScrollFactor(0, 0)
		})

		// this.add.image(0, 0, 'ground2').setOrigin(0, 0)
		this.backgrounds.push({
			ratioX: 1,
			sprite: this.add.tileSprite(0, 0, width, height, 'ground2')
				.setOrigin(0, 0)
				.setScrollFactor(0, 0)
		})

        this.player = this.add.image(width * 0.5, height * 0.5, 'snowman')
            .setOrigin(0.5, 1)
            .setScale(2)

        this.camera = this.cameras.main;
        this.camera.startFollow(this.player)
		this.camera.setFollowOffset(0, 145)

        this.add.particles(0, 0, 'snow-particle', {
			// emitZone
			emitZone: {
				source: new Phaser.Geom.Rectangle(-width * 3, 0, width * 7, 100),
				type: 'random',
				quantity: 70
			},
			speedY: { min: 50, max: 70, int: true },
			speedX: { min: -20, max: 20, int: true },
			accelerationY: { random: [10, 15] },
			// lifespan
			lifespan: { min: 8000, max: 10000 },
			scale: { start: 0.25, end: 0.75, random: true },
			alpha: { start: 0.1, end: 0.8, random: true },
			gravityY: 10,
			frequency: 10,
			blendMode: 'ADD',
			// follow the player at an offset
			follow: this.player, 
			followOffset: { x: -width * 0.5, y: -height - 10 }
		})

        this.input.once('pointerdown', () => {
            this.scene.start('GameOver');
        });
    }

    update() {
        if (this.cursors.left.isDown) {
            this.velocityX = -10
        }
        else if (this.cursors.right.isDown) {
            this.velocityX = 10
        }
        else {
            this.velocityX = 0
        }

        this.player.x += this.velocityX

        for (let i = 0; i < this.backgrounds.length; ++i) {
            const bg = this.backgrounds[i]

            bg.sprite.tilePositionX = this.cameras.main.scrollX * bg.ratioX
        }
    }
}

const scaleToCanvas = (x, length, padding, offset = false) => {
	const lengthPixels = (x * length)
	const paddingDilation = (length - padding) / length;
	const dilatedPixels = lengthPixels * paddingDilation;
	return offset
		? lengthPixels + padding / 2
		: lengthPixels;
};

const drawCircle = (ctx, { x = 0, y = 0 }, width = 1, fill = false, colour = 'black') => {
	ctx.fillStyle = colour;
	ctx.translate(x, y);
	ctx.beginPath();
	ctx.arc(0, 0, width, 0, Math.PI*2, true);
	fill ? ctx.fill() : ctx.stroke();
	ctx.closePath();
};

const createCanvas = id => (res) => {
	const { nodes } = res;
	const canvas = document.getElementById(id);
	const ctx = canvas.getContext('2d');
	const width = 400;
	const height = 400;

	ctx.clearRect(0, 0, width, height);

	nodes.forEach((node) => {
		const padding = 40;
		const coords = {
			x: scaleToCanvas(node.normalized.rooms, width, padding, true),
			y: height - scaleToCanvas(node.normalized.area, height, padding, true),
		};
		
		ctx.save();
		drawCircle(ctx, coords, 5, true, node.isKnown ? node.colour : 'grey');
		if (!node.isKnown) {
			const circleOfInfluence = scaleToCanvas(node.neighbours[2].distance, width, padding);
			drawCircle(ctx, coords, circleOfInfluence, false, node.colour);
		}
		ctx.restore();
	});
};

console.log('IN!');

window.onload = () => {
	console.log('got em!');
	fetch('http://localhost:3000/nodes')
		.then(res => res.json().then(createCanvas('canvas')));
};

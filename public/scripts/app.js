const createCanvas = id => (res) => {
	const { nodes } = res;
	const canvas = document.getElementById(id);
	const ctx = canvas.getContext('2d');
	const width = 400;
	const height = 400;

	ctx.clearRect(0, 0, width, height);

	nodes.forEach((node) => {
		ctx.save();
		ctx.fillStyle = node.colour;

		const padding = 40;
		const offset = {
			x: padding * width,
		};
		const x = node.normalized.rooms * width;
		const y = height - (node.normalized.area * height);

		ctx.translate(x, y);
		ctx.beginPath();
		ctx.arc(0, 0, 5, 0, Math.PI*2, true);
		ctx.fill();
		ctx.closePath();
		ctx.restore();
	});
};

console.log('IN!');

window.onload = () => {
	console.log('got em!');
	fetch('http://localhost:3000/nodes')
		.then(res => res.json().then(createCanvas('app')));
};

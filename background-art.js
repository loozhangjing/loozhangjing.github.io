const heroSection = document.getElementById("hero-section");

const heroSectionStyles = getComputedStyle(heroSection);

const heroSectionHorizontalPadding = parseFloat(heroSectionStyles.paddingLeft, 10);
const heroSectionVerticalPadding = parseFloat(heroSectionStyles.paddingTop, 10);

const width = heroSection.clientWidth - 2 * heroSectionHorizontalPadding;
const height = heroSection.clientHeight - 2 * heroSectionVerticalPadding;

const canvas = document.getElementById("background-art");

canvas.width = width;
canvas.height = height;

const ctx = canvas.getContext("2d");

ctx.strokeStyle = "black";
ctx.lineWidth = 1;

function updateCanvas(event) {
	const mouseX = event.clientX - heroSectionHorizontalPadding;
	const mouseY = event.clientY - heroSectionVerticalPadding;

	ctx.clearRect(0, 0, width, height);

	ctx.beginPath();

	const centerHeight = height / 4;

	for (let y = 0; y <= height; y += height / 11) {
		const drawToYPosition = (y / height) * centerHeight;
		ctx.moveTo(0, y);
		ctx.lineTo(mouseX, mouseY + drawToYPosition);

		ctx.moveTo(width, y);
		ctx.lineTo(mouseX, mouseY + drawToYPosition);
	}

	for (let x = 0; x <= mouseX; x += mouseX / 15) {
		const startY = mouseY * (x / mouseX);
		const endY = startY + (height - centerHeight) * (1 - (x / mouseX)) + centerHeight;

		ctx.moveTo(x, startY);
		ctx.lineTo(x, endY);
	}

	for (let x = mouseX; x <= width; x += (width - mouseX) / 15) {
		const startY = mouseY * ((width - x) / (width - mouseX));
		const endY = startY + (height - centerHeight) * ((x - mouseX) / (width - mouseX)) + centerHeight;

		ctx.moveTo(x, startY);
		ctx.lineTo(x, endY);
	}

	ctx.stroke();
}
document.body.addEventListener("mousemove", (event) => {
	// only update as fast as the screen's frame rate
	requestAnimationFrame(() => updateCanvas(event));
});

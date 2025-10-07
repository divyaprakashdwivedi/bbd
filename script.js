let highestZ = 1;

class Paper {
  holdingPaper = false;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    // 🖱️ Mouse Events
    paper.addEventListener('mousedown', (e) => this.startDrag(e, paper));
    document.addEventListener('mousemove', (e) => this.onDrag(e, paper));
    window.addEventListener('mouseup', () => this.endDrag());

    // 📱 Touch Events
    paper.addEventListener('touchstart', (e) => this.startDrag(e.touches[0], paper));
    document.addEventListener('touchmove', (e) => {
      e.preventDefault(); // prevent scrolling
      this.onDrag(e.touches[0], paper);
    });
    window.addEventListener('touchend', () => this.endDrag());
  }

  startDrag(e, paper) {
    this.holdingPaper = true;
    paper.style.zIndex = highestZ++;
    this.prevMouseX = e.clientX;
    this.prevMouseY = e.clientY;
  }

  onDrag(e, paper) {
    if (!this.holdingPaper) return;
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;

    this.velX = this.mouseX - this.prevMouseX;
    this.velY = this.mouseY - this.prevMouseY;

    this.currentPaperX += this.velX;
    this.currentPaperY += this.velY;

    this.prevMouseX = this.mouseX;
    this.prevMouseY = this.mouseY;

    paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
  }

  endDrag() {
    this.holdingPaper = false;
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});

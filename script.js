document.addEventListener("DOMContentLoaded", function () {
    const img = document.querySelector(".opera-immagine img");
    const zoomButton = document.querySelector(".zoom");
    let zoomed = false;
    
    // Creazione overlay
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    overlay.style.display = "none";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.overflow = "hidden";
    overlay.style.cursor = "default";
    
    const zoomedImg = document.createElement("img");
    zoomedImg.src = img.src;
    zoomedImg.style.width = "min(100vw, 800px)";  // Massimo 1200px o l'intera larghezza dello schermo
    zoomedImg.style.height = "auto";               // Mantiene proporzioni

    zoomedImg.style.position = "absolute";
    zoomedImg.style.transformOrigin = "center center";
    zoomedImg.style.transition = "transform 0.3s ease";
    
    overlay.appendChild(zoomedImg);
    document.body.appendChild(overlay);
    
    let isDragging = false;
    let startX, startY, currentX = 0, currentY = 0;
    let scale = 2;
    
    zoomButton.addEventListener("click", function () {
        zoomed = !zoomed;
        if (zoomed) {
            overlay.style.display = "flex";
            zoomedImg.style.transform = `scale(${scale})`;
        } else {
            overlay.style.display = "none";
        }
    });
    
    overlay.addEventListener("mousedown", function (event) {
        isDragging = !isDragging;
        if (isDragging) {
            startX = event.clientX - currentX;
            startY = event.clientY - currentY;
            overlay.style.cursor = "grabbing";
        } else {
            overlay.style.cursor = "default";
        }
    });
    
    overlay.addEventListener("mousemove", function (event) {
        if (!isDragging) return;
        currentX = event.clientX - startX;
        currentY = event.clientY - startY;
        zoomedImg.style.transform = `scale(${scale}) translate(${currentX}px, ${currentY}px)`;
    });
    
    overlay.addEventListener("dblclick", function () {
        overlay.style.display = "none";
        zoomed = false;
        isDragging = false;
        overlay.style.cursor = "default";
    });
});

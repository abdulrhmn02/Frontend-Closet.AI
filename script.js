// // script.js
// window.addEventListener('load', () => {
//     const images = document.querySelectorAll('.background-images img');
//     images.forEach(img => {
//         img.style.animationDelay = `${Math.random() * 5}s`;
//     });
// });


function generateOutfits() {
    const shirts = document.getElementById("uploadShirts").files;
    const pants = document.getElementById("uploadPants").files;
    const outfitsContainer = document.getElementById("outfits-container");
    outfitsContainer.innerHTML = ""; // Clear previous results

    if (shirts.length === 0 || pants.length === 0) {
        alert("Please upload both shirts and pants!");
        return;
    }

    // Display the loader
    outfitsContainer.innerHTML =
        '<l-trefoil size="100" stroke="5.5" stroke-length="0.15" bg-opacity="0.1" speed="1.4" color="darkblue"></l-trefoil>';

    // Simulate outfit generation
    setTimeout(() => {
        outfitsContainer.innerHTML = ""; // Clear loader
        for (let i = 0; i < shirts.length; i++) {
            for (let j = 0; j < pants.length; j++) {
                const outfitDiv = document.createElement("div");
                outfitDiv.classList.add("outfit");

                const shirtImg = document.createElement("img");
                shirtImg.src = URL.createObjectURL(shirts[i]);
                shirtImg.alt = "Shirt " + (i + 1);
                shirtImg.classList.add("outfit-image"); // Add class for consistent styling

                const pantsImg = document.createElement("img");
                pantsImg.src = URL.createObjectURL(pants[j]);
                pantsImg.alt = "Pants " + (j + 1);
                pantsImg.classList.add("outfit-image"); // Add class for consistent styling

                outfitDiv.appendChild(shirtImg);
                outfitDiv.appendChild(pantsImg);

                // Replace the download button with the Semantic UI vertical animated button
                const downloadBtn = document.createElement("div");
                downloadBtn.classList.add(
                    "ui",
                    "vertical",
                    "animated",
                    "button",
                );
                downloadBtn.setAttribute("tabindex", "0");

                const hiddenContent = document.createElement("div");
                hiddenContent.classList.add("hidden", "content");
                hiddenContent.innerHTML = '<i class="download icon"></i>';

                const visibleContent = document.createElement("div");
                visibleContent.classList.add("visible", "content");
                visibleContent.textContent = "Download Outfit";

                downloadBtn.appendChild(hiddenContent);
                downloadBtn.appendChild(visibleContent);

                // Attach click event to download the outfit
                downloadBtn.addEventListener("click", function () {
                    downloadOutfit(shirtImg.src, pantsImg.src, i + 1, j + 1);
                });

                outfitDiv.appendChild(downloadBtn);
                outfitsContainer.appendChild(outfitDiv);
            }
        }
    }, 2000); // Simulate a delay for loading
}

function downloadOutfit(shirtSrc, pantsSrc, shirtIndex, pantsIndex) {
    // Create a canvas to combine the images
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const imgSize = 200; // Set size for both images
    canvas.width = imgSize;
    canvas.height = imgSize * 2; // Double the height for two images

    const shirtImg = new Image();
    const pantsImg = new Image();

    shirtImg.crossOrigin = "anonymous";
    pantsImg.crossOrigin = "anonymous";

    shirtImg.src = shirtSrc;
    pantsImg.src = pantsSrc;

    shirtImg.onload = () => {
        ctx.drawImage(shirtImg, 0, 0, imgSize, imgSize);
        pantsImg.onload = () => {
            ctx.drawImage(pantsImg, 0, imgSize, imgSize, imgSize);

            // Convert canvas to an image and download
            canvas.toBlob(function (blob) {
                const link = document.createElement("a");
                link.download = `outfit_shirt${shirtIndex}_pants${pantsIndex}.png`;
                link.href = URL.createObjectURL(blob);
                link.click();
                URL.revokeObjectURL(link.href); // Clean up URL object
            }, "image/png");
        };
    };
}

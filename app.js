const upload = document.querySelector(".card-top");
const uploadInp = document.getElementById("upload-inp");
const widthInp = document.getElementById("width");
const heightInp = document.getElementById("height");
const img = document.querySelector("img");
const ratio = document.getElementById("ratio");
const qualityInp = document.getElementById("quality");
const downloadBtn = document.querySelector(".btn-download");

let aspectRatio;

const asToWidth = (ratio, height) => {
  return Math.floor(ratio * height);
};

const asToheight = (ratio, widht) => {
  return Math.floor(widht / ratio);
};

const loadImg = (event) => {
  img.src = URL.createObjectURL(event.target.files[0]);
  img.addEventListener("load", () => {
    img.style.width = "100%";
    img.style.height = "100%";
    document.querySelector("p").style.display = "none";
    widthInp.value = img.naturalWidth;
    heightInp.value = img.naturalHeight;
    aspectRatio = img.naturalWidth / img.naturalHeight;
  });
};

heightInp.addEventListener("keyup", () => {
  ratio.checked
    ? (widthInp.value = asToWidth(aspectRatio, heightInp.value))
    : widthInp.value;
});

widthInp.addEventListener("keyup", () => {
  ratio.checked
    ? (heightInp.value = asToheight(aspectRatio, widthInp.value))
    : heightInp.value;
});
heightInp.addEventListener("change", () => {
  ratio.checked
    ? (widthInp.value = asToWidth(aspectRatio, heightInp.value))
    : widthInp.value;
});

widthInp.addEventListener("change", () => {
  ratio.checked
    ? (heightInp.value = asToheight(aspectRatio, widthInp.value))
    : heightInp.value;
});

uploadInp.addEventListener("change", loadImg);
upload.addEventListener("click", () => {
  uploadInp.click();
});

downloadBtn.addEventListener("click", () => {
  const createCanvas = document.createElement("canvas");
  const ctx = createCanvas.getContext("2d");
  const quality = qualityInp.checked? 0.3 : 1.0;
  (createCanvas.width = widthInp.value),
    (createCanvas.height = heightInp.value),
    ctx.drawImage(img, 0, 0, createCanvas.width, createCanvas.height);
  const createLink = document.createElement("a");
  createLink.href = createCanvas.toDataURL("image/png", quality);
  createLink.download = new Date().getTime();
  createLink.click();
});

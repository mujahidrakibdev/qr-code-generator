const data = document.querySelector(".data-input")
const image = document.querySelector(".image-input")
const bgColor = document.querySelector(".bg-color-input")
const margin = document.querySelector(".margin-input")
const height = document.querySelector(".height-input")
const width = document.querySelector(".width-input")
const dotOptions = document.querySelector(".dot-options")
const dotColor = document.querySelector(".dot-color")
const squareOptions = document.querySelector(".square-options")
const squareColor = document.querySelector(".square-color")
const cornerDotOptions = document.querySelector(".corner-dot-options")
const cornerDotColor = document.querySelector(".corner-dot-color")
const generateBtn = document.querySelector(".generate-qr")
const qrContainer = document.querySelector(".qr-container")
const imageInput = document.querySelector(".image-input")
const downloadBtn = document.querySelector(".download-btn")

let qrCode;
let uploadedImageURL = ""

generateBtn.addEventListener("click", generateQrCode)
// downloadBtn.addEventListener("click", downloadQrCode)


function generateQrCode() {
    qrContainer.innerHTML = ""

    qrCode = new QRCodeStyling({
        width: parseInt(width.value),

        height: parseInt(height.value),

        data: data.value,

        dotsOptions: {
            color: dotColor.value,
            type: dotOptions.value,
        },

        backgroundOptions: {
            color: bgColor.value,
        },

        margin: parseInt(margin.value),

        cornersSquareOptions: {
            color: squareColor.value,
            type: squareOptions.value,
        },

        cornersDotOptions: {
            color: cornerDotColor.value,
            type: cornerDotOptions.value,
        },
        image: uploadedImageURL || null,
        imageOptions: {
            imageSize: 0.3,
            margin: 5
        }
    });

    qrCode.append(qrContainer)

    downloadBtn.style.display = "block"

}



imageInput.addEventListener("change", function (e) {
    const file = e.target.files[0]

    if (!file) {
        return
    }

    const reader = new FileReader()
    reader.readAsDataURL(file) 

    

    reader.onload = function () {
        uploadedImageURL = reader.result
        
        
    }


})


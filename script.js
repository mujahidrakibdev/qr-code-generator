const container = document.querySelector(".container")
const data = document.querySelector(".data-input")
const image = document.querySelector(".image-input")
const bgColor = document.querySelector(".bg-color-input")
const marginInput = document.querySelector(".margin-input")
const heightInput = document.querySelector(".height-input")
const widthInput = document.querySelector(".width-input")
const dotOptions = document.querySelector(".dot-options")
const dotColor = document.querySelector(".dot-color")
const squareOptions = document.querySelector(".square-options")
const squareColor = document.querySelector(".square-color")
const cornerDotOptions = document.querySelector(".corner-dot-options")
const cornerDotColor = document.querySelector(".corner-dot-color")
const generateBtn = document.querySelector(".generate-qr")
const qrContainer = document.querySelector(".qr-container")
const imageInput = document.querySelector(".image-input")
const errorMessage = document.querySelector(".error-message")
const uploadMessage = document.querySelector(".upload-message")
const downloadBtn = document.querySelector(".download-btn")




let qrCode; 
let uploadedImageURL = ""

generateBtn.addEventListener("click", generateQrCode)


function generateQrCode() {
    qrContainer.innerHTML = ""
    hideError()

    if (!data.value.trim()) {
        shake()
        showError("QR data cannot be empty.")
        return 
    }

    const width = parseInt(widthInput.value)
    const height = parseInt(heightInput.value)
    const margin = parseInt(marginInput.value)

    
    if (isNaN(height) || height <= 0 || height > 1000) {
        shake()
        showError("Height must be a number between 1 to 1000")
        return 
    }
    
    if (isNaN(width) || width <= 0 || width > 1000) {
        shake()
        showError("Width must be a number between 1 to 1000")
        return 
    }

    if (isNaN(margin) || margin <= 0 || margin > 1000) {
        shake()
        showError("Margin must be a number between 1 to 100")
        return 
    }



    qrCode = new QRCodeStyling({
        width: width,

        height: height,

        data: data.value,

        dotsOptions: {
            color: dotColor.value,
            type: dotOptions.value,
        },

        backgroundOptions: {
            color: bgColor.value,
        },

        margin: margin,

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

    if (!file.type.startsWith("image/")) {
        shake()
        showError("Invalid image file. Please upload a valid image.")
        imageInput.value = ""
    } else {
        showUpload()
    }

    const reader = new FileReader()
    reader.readAsDataURL(file) 

    

    reader.onload = function () {
        uploadedImageURL = reader.result

    }


})



function showError(msg) {
    errorMessage.style.opacity = 1
    errorMessage.innerText = msg
}

function hideError() {
    errorMessage.style.opacity = 0
}


function showUpload() {
    uploadMessage.style.opacity = 1
        setTimeout(() => {
            uploadMessage.style.opacity = 0

        }, 3000);
}




function shake() {
    container.classList.add("shake")
    setTimeout(() => {
        container.classList.remove("shake")
    }, 1000);
}


    
downloadBtn.addEventListener("click", function () {
    if (!qrCode) {
        return
    }
    qrCode.download({ name: "qr-code-by-MujahidRakib", extension: "png" })
})
import { decodeJwtData } from "./jwtAuth";

const shareTicket = (qrCodeUrl) => {
    if ('share' in navigator) {
        const newFile = imageDataUrlToFIle(qrCodeUrl);

        navigator.share({ title: "Train Ticket", files: [newFile] })
    } else {
        console.log("Sharing is not possible")
    }
}

function imageDataUrlToFIle(imageDataUrl) {

    // Convert data URL to Blob
    const byteString = atob(imageDataUrl.split(',')[1]);
    const mimeString = imageDataUrl.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ab], { type: mimeString });

    // Create a File object
    const file = new File([blob], "image.png", { type: mimeString });

    // Now 'file' contains your image as a File object
    return file;
}

function downloadTicket({ qrCodeUrl }) {
    const ticket = decodeJwtData(qrCodeUrl);

    const a = document.createElement('a');
    a.href = qrCodeUrl;
    a.download = `ticket-${ticket.exp}.png`;
    a.click();
}

export { shareTicket, downloadTicket }
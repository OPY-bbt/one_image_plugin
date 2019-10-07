var $video = document.body.querySelector("video");
downloadImage($video);

function downloadImage(video) {
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");

  var link = document.createElement("a");

  var w = video.videoWidth;
  var h = video.videoHeight;
  canvas.width = w;
  canvas.height = h;

  ctx.drawImage(video, 0, 0, w, h);

  function convertBase64UrlToBlob(urlData) {
    // base64 由于 2^{6}=64，所以每6个比特为一个单元
    const bytes = window.atob(urlData.split(",")[1]); // 去掉url的头，并转换为byte

    // 处理异常,将ascii码小于0的转换为大于0
    const ab = new ArrayBuffer(bytes.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < bytes.length; i += 1) {
      ia[i] = bytes.charCodeAt(i);
    }

    return new Blob([ab], { type: "image/jpeg" });
  }

  var blob = convertBase64UrlToBlob(canvas.toDataURL("image/jpeg"));

  var evt = document.createEvent("MouseEvents");
  evt.initEvent("click", false, false); //initEvent 不加后两个参数在FF下会报错
  link.download = Date.now() + ".jpeg";
  link.href = URL.createObjectURL(blob);

  link.dispatchEvent(evt);
}

export const exportToSVG = (svgContent, fileName) => {
  const link = document.createElement('a');
  link.href = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgContent)));
  link.download = `${fileName}.svg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


export const exportToPNG = (svgContent, fileName) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const img = new Image();
  img.onload = () => {
    canvas.width = 1920;
    canvas.height = 1080;
    ctx.drawImage(img, 0, 0);

    canvas.toBlob((blob) => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${fileName}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 'image/png', 1.0);
  };
  img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgContent)));
};


export const exportToTxt = (textContent, fileName) => {
  const blob = new Blob([textContent], { type: 'text/plain' });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${fileName}.txt`;

  document.body.appendChild(link);

  link.click();
  document.body.removeChild(link);
};


export const exportToJSON = async (jsonString, fileName) => {
  try {
    // Convertir el objeto JSON a una cadena de texto con formato legible

    const x = await fetch(`${import.meta.env.VITE_BACKEND_URL}diagrama-to-json`, {
      method: 'POST',
      body: JSON.stringify({ diagrama: jsonString }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await x.json();
    console.log(data);
    const parse = JSON.parse(data.content);

    const formattedJsonString = JSON.stringify(parse, null, 2);

    // Crear un objeto Blob con la cadena de texto JSON
    const blob = new Blob([formattedJsonString], { type: 'application/json' });

    // Crear un enlace de descarga
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.json`;

    // Agregar el enlace al cuerpo del documento
    document.body.appendChild(link);

    // Simular un clic en el enlace para iniciar la descarga
    link.click();

    // Eliminar el enlace del cuerpo del documento
    document.body.removeChild(link);
  } catch (error) {
    // Manejar errores en caso de que haya problemas al convertir a JSON o al exportar
    console.error('Error al exportar a JSON:', error);
  }
};


export const exportToXML = async (text, fileName) => {
  try {

    const x = await fetch(`${import.meta.env.VITE_BACKEND_URL}diagrama-to-xml`, {
      method: 'POST',
      body: JSON.stringify({ diagrama: text }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await x.json();
    console.log(data);


    const blob = new Blob([data.content], { type: 'application/xml' });

    // Crear un enlace de descarga
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.xml`;

    // Agregar el enlace al cuerpo del documento
    document.body.appendChild(link);

    // Simular un clic en el enlace para iniciar la descarga
    link.click();

    // Eliminar el enlace del cuerpo del documento
    document.body.removeChild(link);
  } catch (error) {
    // Manejar errores en caso de que haya problemas al convertir a XML o al exportar
    console.error('Error al exportar a XML:', error);
  }
};




export function generarRandom(num) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let result = "";
  for (let i = 0; i < num; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}


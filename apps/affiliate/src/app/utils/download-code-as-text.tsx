const downloadTxtToFile = (downloadCodeAsText: string | undefined, filename: string) => {
  const element = document.createElement('a');
  const file = new Blob([`${downloadCodeAsText}`], {
    type: 'text/plain',
  });
  element.href = URL.createObjectURL(file);
  element.download = `${filename}.txt`;
  document.body.appendChild(element);
  element.click();
};

export default downloadTxtToFile;

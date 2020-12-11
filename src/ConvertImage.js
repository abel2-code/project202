import React, { useState, useEffect } from "react";
import { googleTranslate } from "./utils/googleTranslate";
import { createWorker } from "tesseract.js";
import TranslateImage from "./TranslateImage";

function ConvertImage({ language }) {
  const [uploads, handleUploads] = useState([]);
  const [ocr, setOcr] = useState([]);
  const [convertImage, handleConvertImage] = useState("Convert Image");
  const [uploadDocuments, handleUploadDocuments] = useState(
    "Click here to upload documents"
  );
  const [generate, handleGenerate] = useState("Generate");

  useEffect(() => {
    let transState;
    googleTranslate.translate("Convert Image", language, (err, translation) => {
      transState = translation.translatedText;
      translating(transState);
    });

    const translating = (transState) => {
      handleConvertImage(transState);
    };
  }, [language]);

  useEffect(() => {
    let transState;
    googleTranslate.translate(
      "Click here to upload documents",
      language,
      (err, translation) => {
        transState = translation.translatedText;
        translating(transState);
      }
    );

    const translating = (transState) => {
      handleUploadDocuments(transState);
    };
  }, [language]);

  useEffect(() => {
    let transState;
    googleTranslate.translate(
      "Generate",
      language,
      function (err, translation) {
        transState = translation.translatedText;
        translating(transState);
      }
    );

    const translating = (transState) => {
      handleGenerate(transState);
    };
  }, [language]);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      let myUploads = [];
      for (let key in e.target.files) {
        if (!e.target.files.hasOwnProperty(key)) continue;
        let upload = e.target.files[key];
        myUploads.push(URL.createObjectURL(upload));
      }
      handleUploads([...uploads, myUploads]);
    }
  };

  const generateText = async () => {
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    let textArray = [];
    for (let i = 0; i < uploads.length; i++) {
      const {
        data: { text },
      } = await worker.recognize(uploads[i][0]);
      textArray.push(text);
    }
    setOcr(textArray);
  };

  const worker = createWorker({
    logger: (m) => console.log(m),
  });
  return (
    <div className="convertImage">
      <header className="header">
        <h1>{convertImage}</h1>
      </header>

      <section className="hero">
        <label className="fileUploaderContainer">
          {uploadDocuments}
          <input
            type="file"
            id="fileUploader"
            onChange={(e) => handleChange(e)}
            multiple
          />
        </label>

        <div>
          {uploads.map((value, index) => {
            return (
              <img
                key={index}
                src={value}
                width="200px"
                alt={`${index} to be converted`}
              />
            );
          })}
        </div>

        <button className="button" onClick={() => generateText()}>
          {generate}
        </button>
      </section>

      <ul>
        {ocr.map((text, index) => (
          <TranslateImage text={text} index={index} language={language} />
        ))}
      </ul>
    </div>
  );
}

export default ConvertImage;

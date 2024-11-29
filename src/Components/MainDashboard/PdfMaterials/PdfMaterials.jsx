import React, { useState } from "react";
import "./PdfMaterials.css";
import { useNavigate } from "react-router-dom";
import { pdfMaterials } from "../../../utils/PDFMaterials";

const PdfMaterials = () => {
  const [facultyDropdown, setFacultyDropdown] = useState(pdfMaterials[0]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="allquiz-wrapper">
      <div className="allquiz-inner">
        <h1>Useful PDF Materials</h1>

        <div className="flex-pdf">
          <p className="started">
            Diverse Materials that encompass all aspect of learning for
            different fields of study.
          </p>
        </div>

        {facultyDropdown && (
          <div className="quiz-container pdf-materials">
            <h2>Get Started</h2>
            {facultyDropdown.content.map((linkItem) => (
              <div key={linkItem.id} className="quiz-content">
                <p>{linkItem.course}</p>
                <a
                  download={
                    linkItem.download ? linkItem.doc.split("/").pop() : ""
                  }
                  href={linkItem.doc}
                  className="take-quiz"
                >
                  Download PDF
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      {loading && (
        <div className="load-overlay">
          <div className="load-slide">
            <div className="load-bar"></div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PdfMaterials;

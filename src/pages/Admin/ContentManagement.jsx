import { useRef, useState } from "react";

const ContentManagement = () => {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    AnhBanner: "",
  });
  const [onChangeImage, setonChangeImage] = useState(false);

  const handleImageUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        [e.target.name]: file,
      });
      setonChangeImage(true);
    }
  };
  return (
    <div className="user-profile-card add-listing">
      <div className="user-profile-card-header"></div>
      <div className="col-lg-12">
        <div className="add-listing-form">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="form-group">
                <label>Ảnh giấy phép kinh doanh</label>
                <div className="listing-upload-wrapper">
                  <div
                    className="listing-img-upload"
                    onClick={handleImageUploadClick}
                  >
                    <span>
                      {onChangeImage && (
                        <img
                          src={URL.createObjectURL(formData.AnhBanner ?? "")}
                          alt="Preview"
                          style={{
                            width: "100px",
                            height: "100px",
                            marginTop: "10px",
                          }}
                        />
                      )}
                      {formData.AnhBanner && !onChangeImage ? (
                        <div className="image-preview">
                          <img
                            src={formData.AnhBanner}
                            alt="Preview"
                            style={{
                              width: "100px",
                              height: "100px",
                              marginTop: "10px",
                            }}
                          />
                        </div>
                      ) : (
                        <>
                          <i className="far fa-images"></i> Upload listing
                          Images
                        </>
                      )}
                    </span>
                  </div>
                  <input
                    type="file"
                    className="listing-img-file"
                    id="gallery-photo-add1"
                    ref={fileInputRef}
                    name="AnhBanner"
                    onChange={handleFileChange}
                    multiple
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentManagement;
